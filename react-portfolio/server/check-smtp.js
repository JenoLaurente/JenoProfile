import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const clean = (value) => String(value ?? '').trim();
const requiredKeys = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missingKeys = requiredKeys.filter((key) => !clean(process.env[key]));

if (missingKeys.length > 0) {
    console.error(`Missing SMTP config in .env: ${missingKeys.join(', ')}`);
    process.exit(1);
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
    auth: { user, pass },
});

try {
    await transporter.verify();
    console.log('SMTP check passed. Email server credentials are valid.');
    process.exit(0);
} catch (error) {
    if (error.code === 'EAUTH') {
        console.error('SMTP check failed: authentication error (EAUTH).');
        console.error('If using Gmail: enable 2FA and use a 16-character App Password as SMTP_PASS.');
    } else if (error.code === 'ECONNECTION' || error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
        console.error('SMTP check failed: connection error. Verify SMTP_HOST, SMTP_PORT, SMTP_SECURE, and internet access.');
    } else {
        console.error('SMTP check failed:', error.message || error);
    }

    process.exit(1);
}
