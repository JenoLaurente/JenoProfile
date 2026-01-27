import emailjs from '@emailjs/browser';
import { emailConfig } from '../data/portfolioData';

// Initialize EmailJS
emailjs.init(emailConfig.publicKey);

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

    // Prepare template params
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'laurentejeno73@gmail.com'
    };

    // Send email via EmailJS
    const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
    );

    // Record successful send
    recordMessageSent(email);

    return response;
};
