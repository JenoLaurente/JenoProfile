import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    User,
    MessageSquare,
    Tag,
    Github,
    Linkedin,
    Facebook,
    CheckCircle,
    AlertCircle,
    Loader
} from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { sendEmail } from '../../utils/emailService';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await sendEmail(formData);
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Sorry, there was an error sending your message. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const contactCards = [
        {
            icon: Mail,
            title: 'Email Me',
            info: profileData.email,
            link: `mailto:${profileData.email}`
        },
        {
            icon: Phone,
            title: 'Call Me',
            info: profileData.phone,
            link: `tel:${profileData.phone.replace(/\s/g, '')}`
        },
        {
            icon: MapPin,
            title: 'Location',
            info: profileData.location,
            link: null
        }
    ];

    const socialLinks = [
        { icon: Github, url: profileData.socialLinks.github, label: 'GitHub' },
        { icon: Linkedin, url: profileData.socialLinks.linkedin, label: 'LinkedIn' },
        { icon: Facebook, url: profileData.socialLinks.facebook, label: 'Facebook' },
        { icon: Send, url: profileData.socialLinks.telegram, label: 'Telegram' }
    ];

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">
                        <Mail size={14} />
                        Get in Touch
                    </span>
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">
                        Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
                    </p>
                </motion.div>

                {/* Contact Grid */}
                <motion.div
                    className="contact-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Contact Info */}
                    <motion.div className="contact-info" variants={itemVariants}>
                        <h3>Let's Work Together</h3>
                        <p>
                            I'm always excited to collaborate on new projects and ideas.
                            Whether you have a question or just want to say hello, feel free to reach out!
                        </p>

                        {/* Contact Cards */}
                        <div className="contact-cards">
                            {contactCards.map((card, index) => (
                                <motion.div
                                    key={card.title}
                                    className="contact-card"
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="contact-card-icon">
                                        <card.icon size={22} />
                                    </div>
                                    <div className="contact-card-content">
                                        <h4>{card.title}</h4>
                                        {card.link ? (
                                            <a href={card.link}>{card.info}</a>
                                        ) : (
                                            <p>{card.info}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div className="contact-form-container" variants={itemVariants}>
                        <div className="contact-form-header">
                            <h3>Send me a message</h3>
                            <p>Fill out the form below and I'll get back to you as soon as possible.</p>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <User size={16} />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                        minLength={2}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <Mail size={16} />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">
                                    <Tag size={16} />
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    required
                                    minLength={3}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">
                                    <MessageSquare size={16} />
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    required
                                    minLength={10}
                                    rows={5}
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader size={18} className="spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Status Message */}
                        {submitStatus && (
                            <motion.div
                                className={`form-message ${submitStatus.type}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {submitStatus.type === 'success' ? (
                                    <CheckCircle size={20} />
                                ) : (
                                    <AlertCircle size={20} />
                                )}
                                <span>{submitStatus.message}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
