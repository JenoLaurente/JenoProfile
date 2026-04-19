import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load environment variables from the project root .env file.
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();

const PORT = Number(process.env.CONTACT_SERVER_PORT || 3001);
const isProduction = process.env.NODE_ENV === 'production';
const RATE_LIMIT_WINDOW_MS = Math.max(0, Number(process.env.RATE_LIMIT_MS || 60000));
const RATE_LIMIT_ENABLED = String(
    process.env.RATE_LIMIT_ENABLED ?? (isProduction ? 'true' : 'false')
).toLowerCase() === 'true';
const NOTIFICATION_FROM_CLIENT = String(process.env.NOTIFICATION_FROM_CLIENT || 'true').toLowerCase() === 'true';
const REQUIRED_SMTP_ENV_KEYS = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const senderTracker = new Map();
let cachedTransporter = null;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const clean = (value) => String(value ?? '').trim();
const sanitizeHeaderText = (value) => clean(value).replace(/[\r\n"]/g, ' ').trim();
const formatMailbox = (displayName, address) => {
    const safeName = sanitizeHeaderText(displayName);
    return safeName ? `"${safeName}" <${address}>` : address;
};
const shouldFallbackToOwnedSender = (error) => {
    const errorText = `${error?.message || ''}\n${error?.response || ''}`.toLowerCase();

    return (
        error?.code === 'EENVELOPE' ||
        errorText.includes('from address') ||
        errorText.includes('sender address') ||
        errorText.includes('not owned by user') ||
        errorText.includes('not allowed') ||
        errorText.includes('rejected')
    );
};

const getMissingSmtpConfig = () =>
    REQUIRED_SMTP_ENV_KEYS.filter((key) => !clean(process.env[key]));

const getTransporter = async () => {
    if (cachedTransporter) {
        return cachedTransporter;
    }

    const missingConfig = getMissingSmtpConfig();

    if (missingConfig.length > 0) {
        throw new Error(
            `SMTP settings are incomplete. Missing: ${missingConfig.join(', ')}. Set them in .env and restart the server.`
        );
    }

    const host = clean(process.env.SMTP_HOST);
    const user = clean(process.env.SMTP_USER);
    const pass = clean(process.env.SMTP_PASS);

    const port = Number(process.env.SMTP_PORT || 587);
    const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });

    await transporter.verify();
    cachedTransporter = transporter;
    return transporter;
};

const getRateLimitState = (key) => {
    if (!RATE_LIMIT_ENABLED || RATE_LIMIT_WINDOW_MS <= 0) {
        return { limited: false, retryAfterSeconds: 0 };
    }

    const now = Date.now();
    const previous = senderTracker.get(key);

    if (previous && now - previous < RATE_LIMIT_WINDOW_MS) {
        const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - previous);
        const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
        return { limited: true, retryAfterSeconds };
    }

    senderTracker.set(key, now);
    return { limited: false, retryAfterSeconds: 0 };
};

if (RATE_LIMIT_ENABLED && RATE_LIMIT_WINDOW_MS > 0) {
    setInterval(() => {
        const now = Date.now();

        for (const [key, timestamp] of senderTracker.entries()) {
            if (now - timestamp > RATE_LIMIT_WINDOW_MS * 2) {
                senderTracker.delete(key);
            }
        }
    }, Math.max(RATE_LIMIT_WINDOW_MS, 60000)).unref();
}

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error('Origin not allowed by CORS'));
        },
    })
);

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
    res.status(200).json({
        ok: true,
        smtpConfigured: getMissingSmtpConfig().length === 0,
    });
});

app.post('/api/contact', async (req, res) => {
    const name = clean(req.body?.name);
    const email = clean(req.body?.email).toLowerCase();
    const subject = clean(req.body?.subject);
    const message = clean(req.body?.message);

    if (name.length < 2) {
        res.status(400).json({ message: 'Please enter a valid name (at least 2 characters).' });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({ message: 'Please enter a valid email address.' });
        return;
    }

    if (subject.length < 3) {
        res.status(400).json({ message: 'Please enter a subject (at least 3 characters).' });
        return;
    }

    if (message.length < 10) {
        res.status(400).json({ message: 'Please enter a message (at least 10 characters).' });
        return;
    }

    const rateLimitKey = `${req.ip || 'unknown'}:${email}`;
    const rateLimitState = getRateLimitState(rateLimitKey);

    if (rateLimitState.limited) {
        res.status(429).json({
            message: `Please wait ${rateLimitState.retryAfterSeconds} second(s) before sending another message.`,
            retryAfterSeconds: rateLimitState.retryAfterSeconds,
        });
        return;
    }

    try {
        const transporter = await getTransporter();
        const ownerEmail = clean(process.env.MAIL_TO || process.env.SMTP_USER);
        const fromEmail = clean(process.env.MAIL_FROM || process.env.SMTP_USER);
        const autoReplyEnabled = String(process.env.AUTO_REPLY_ENABLED || 'true').toLowerCase() === 'true';
        const clientMailbox = formatMailbox(name, email);
        const notificationFromMailbox = formatMailbox(`${name} via Portfolio Contact`, fromEmail);
        const portfolioMailbox = formatMailbox('Portfolio Contact', fromEmail);
        const timestamp = new Date().toLocaleString('en-PH', {
            dateStyle: 'full',
            timeStyle: 'short',
        });

        const notificationMessage = {
            to: ownerEmail,
            subject: `[Portfolio Contact] ${subject} | ${name}`,
            replyTo: clientMailbox,
            headers: {
                'X-Contact-Email': email,
                'X-Contact-Name': sanitizeHeaderText(name),
            },
            text: [
                'New message from your portfolio contact form:',
                '',
                `Name: ${name}`,
                `Email: ${email}`,
                `Subject: ${subject}`,
                `Date: ${timestamp}`,
                '',
                'Message:',
                message,
            ].join('\n'),
            html: `
                <h2>New Portfolio Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Date:</strong> ${timestamp}</p>
                <hr />
                <p style="white-space: pre-wrap;">${message}</p>
            `,
        };

        if (NOTIFICATION_FROM_CLIENT) {
            try {
                await transporter.sendMail({
                    ...notificationMessage,
                    from: clientMailbox,
                    sender: portfolioMailbox,
                });
            } catch (clientFromError) {
                if (!shouldFallbackToOwnedSender(clientFromError)) {
                    throw clientFromError;
                }

                await transporter.sendMail({
                    ...notificationMessage,
                    from: notificationFromMailbox,
                    sender: portfolioMailbox,
                });
            }
        } else {
            await transporter.sendMail({
                ...notificationMessage,
                from: notificationFromMailbox,
                sender: portfolioMailbox,
            });
        }

        if (autoReplyEnabled) {
            await transporter.sendMail({
                from: portfolioMailbox,
                to: email,
                replyTo: ownerEmail,
                subject: 'Thanks for reaching out',
                text: [
                    `Hi ${name},`,
                    '',
                    'Thanks for reaching out. I received your message and will get back to you soon.',
                    '',
                    'Your message summary:',
                    `Subject: ${subject}`,
                    `Message: ${message}`,
                ].join('\n'),
                html: `
                    <p>Hi ${name},</p>
                    <p>Thanks for reaching out. I received your message and will get back to you soon.</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                `,
            });
        }

        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Contact form email error:', error);

        if (error.message?.startsWith('SMTP settings are incomplete')) {
            res.status(503).json({
                message: 'Email server is not configured yet. Add SMTP settings to .env and restart the server.',
            });
            return;
        }

        if (error.code === 'EAUTH') {
            res.status(500).json({
                message: 'SMTP authentication failed. Check SMTP_USER and SMTP_PASS. For Gmail, use an App Password.',
            });
            return;
        }

        if (error.code === 'ECONNECTION' || error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
            res.status(500).json({
                message: 'Could not connect to SMTP server. Verify SMTP_HOST, SMTP_PORT, and SMTP_SECURE.',
            });
            return;
        }

        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
});

const startupMissingConfig = getMissingSmtpConfig();

if (startupMissingConfig.length > 0) {
    console.warn(
        `Email server not fully configured. Missing: ${startupMissingConfig.join(', ')}. Update .env to enable sending.`
    );
}

app.listen(PORT, () => {
    console.log(`Contact mail server running on http://localhost:${PORT}`);
});
