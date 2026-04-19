const DEFAULT_CONTACT_ENDPOINT = '/api/contact';

const CONTACT_ENDPOINT =
    (import.meta.env.VITE_CONTACT_API_URL || DEFAULT_CONTACT_ENDPOINT).trim();

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateContactPayload = ({ name, email, subject, message }) => {
    if (!name || name.trim().length < 2) {
        throw new Error('Please enter a valid name (at least 2 characters).');
    }

    if (!email || !isValidEmail(email.trim())) {
        throw new Error('Please enter a valid email address.');
    }

    if (!subject || subject.trim().length < 3) {
        throw new Error('Please enter a subject (at least 3 characters).');
    }

    if (!message || message.trim().length < 10) {
        throw new Error('Please enter a message (at least 10 characters).');
    }
};

export const sendEmail = async (formData) => {
    const payload = {
        name: formData.name?.trim() || '',
        email: formData.email?.trim() || '',
        subject: formData.subject?.trim() || '',
        message: formData.message?.trim() || '',
    };

    validateContactPayload(payload);

    let response;

    try {
        response = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch {
        throw new Error('Unable to connect to the email server. Please try again in a moment.');
    }

    let responseData = null;

    try {
        responseData = await response.json();
    } catch {
        responseData = null;
    }

    if (!response.ok) {
        const errorMessage = responseData?.message || 'Failed to send message. Please try again later.';
        throw new Error(errorMessage);
    }

    return responseData;
};
