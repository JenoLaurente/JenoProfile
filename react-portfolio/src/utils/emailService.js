import emailjs from '@emailjs/browser';
import { emailConfig } from '../data/portfolioData';

// Initialize EmailJS with error handling
let isInitialized = false;

const initEmailJS = () => {
    if (!isInitialized && emailConfig.publicKey) {
        try {
            emailjs.init({
                publicKey: emailConfig.publicKey,
                // Optional: Limit rate to prevent abuse
                limitRate: {
                    throttle: 10000, // 10 seconds between requests
                }
            });
            isInitialized = true;
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('EmailJS initialization failed:', error);
        }
    }
};

// Initialize on module load
initEmailJS();

// Rate limiting check
export const canSendMessage = (email) => {
    const lastSentKey = `last_sent_${email}`;
    const lastSentTime = localStorage.getItem(lastSentKey);

    if (!lastSentTime) return true;

    const now = new Date().getTime();
    const timeDiff = now - parseInt(lastSentTime);
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    return hoursDiff >= 24;
};

// Record message sent
export const recordMessageSent = (email) => {
    const lastSentKey = `last_sent_${email}`;
    const now = new Date().getTime();
    localStorage.setItem(lastSentKey, now.toString());
};

// Get time remaining
export const getTimeUntilNextMessage = (email) => {
    const lastSentKey = `last_sent_${email}`;
    const lastSentTime = localStorage.getItem(lastSentKey);

    if (!lastSentTime) return null;

    const now = new Date().getTime();
    const timeDiff = now - parseInt(lastSentTime);
    const hoursRemaining = 24 - (timeDiff / (1000 * 60 * 60));

    if (hoursRemaining <= 0) return null;

    const hours = Math.floor(hoursRemaining);
    const minutes = Math.floor((hoursRemaining - hours) * 60);

    return `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Send email
export const sendEmail = async (formData) => {
    const { name, email, subject, message } = formData;

    // Ensure EmailJS is initialized
    initEmailJS();

    // Validate inputs
    if (!name || name.length < 2) {
        throw new Error('Please enter a valid name (at least 2 characters).');
    }

    if (!email || !isValidEmail(email)) {
        throw new Error('Please enter a valid email address.');
    }

    if (!subject || subject.length < 3) {
        throw new Error('Please enter a subject (at least 3 characters).');
    }

    if (!message || message.length < 10) {
        throw new Error('Please enter a message (at least 10 characters).');
    }

    // Check rate limiting
    if (!canSendMessage(email)) {
        const timeRemaining = getTimeUntilNextMessage(email);
        throw new Error(`You can send another message in ${timeRemaining}. Please wait before sending another message.`);
    }

    // Get current date formatted
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Prepare template params for notification email (to you)
    // Variable names MUST match your EmailJS template: {{name}}, {{email}}, {{title}}, {{message}}
    const notificationParams = {
        // Primary variables (matching your EmailJS template)
        name: name,           // {{name}} - Client's name
        email: email,         // {{email}} - Client's email (for Reply To)
        title: subject,       // {{title}} - Message subject
        message: message,     // {{message}} - Message content

        // Additional variables for flexibility
        from_name: name,
        from_email: email,
        subject: subject,
        to_email: 'jenoaldrei.official@gmail.com',
        reply_to: email,
        date: currentDate,
    };

    // Prepare template params for auto-reply email (to sender)
    const autoReplyParams = {
        // Primary variables for auto-reply template
        name: name,           // {{name}} - Client's name
        email: email,         // {{email}} - Client's email
        title: subject,       // {{title}} - Subject
        message: message,     // {{message}} - Original message

        // Alternative names
        to_name: name,
        to_email: email,
        from_name: 'Jeno Aldrei Laurente',
        from_email: 'jenoaldrei.official@gmail.com',
        subject: subject,
        original_message: message,
        date: currentDate,
        reply_to: 'jenoaldrei.official@gmail.com',
    };

    try {
        // Send notification email to you
        const notificationResponse = await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            notificationParams
        );
        console.log('Notification email sent:', notificationResponse);

        // Send auto-reply to sender (optional - only if template exists)
        if (emailConfig.autoReplyTemplateId && emailConfig.autoReplyTemplateId !== "template_autoreply") {
            try {
                const autoReplyResponse = await emailjs.send(
                    emailConfig.serviceId,
                    emailConfig.autoReplyTemplateId,
                    autoReplyParams
                );
                console.log('Auto-reply sent:', autoReplyResponse);
            } catch (autoReplyError) {
                // Don't fail the whole operation if auto-reply fails
                console.warn('Auto-reply failed (non-critical):', autoReplyError);
            }
        }

        // Record successful send
        recordMessageSent(email);

        return notificationResponse;
    } catch (error) {
        console.error('EmailJS Error:', error);

        // Provide more specific error messages
        if (error.status === 400) {
            throw new Error('Invalid request. Please check that all fields are filled correctly.');
        } else if (error.status === 401 || error.status === 403) {
            throw new Error('EmailJS authentication failed. Please contact the site administrator.');
        } else if (error.status === 404) {
            throw new Error('Email service not found. Please contact the site administrator.');
        } else if (error.status === 429) {
            throw new Error('Too many requests. Please wait a moment and try again.');
        } else if (error.text) {
            throw new Error(`Failed to send: ${error.text}`);
        } else {
            throw new Error('Failed to send message. Please try again later.');
        }
    }
};
