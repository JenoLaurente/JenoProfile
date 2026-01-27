import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Github, Palette, Code, Server } from 'lucide-react';
import { profileData } from '../../data/portfolioData';

const Hero = () => {
    const [currentRole, setCurrentRole] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing effect
    useEffect(() => {
        const roles = profileData.roles;
        const currentFullRole = roles[roleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentRole(currentFullRole.substring(0, currentRole.length + 1));
                if (currentRole === currentFullRole) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentRole(currentFullRole.substring(0, currentRole.length - 1));
                if (currentRole === '') {
                    setIsDeleting(false);
                    setRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentRole, isDeleting, roleIndex]);

    // Counter animation hook
    const Counter = ({ target, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                setCount(Math.floor(progress * target));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            const timer = setTimeout(() => requestAnimationFrame(animate), 500);
            return () => clearTimeout(timer);
        }, [target, duration]);

        return count;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    const floatingCards = [
        { icon: Palette, title: 'UI/UX', desc: 'Design' },
        { icon: Code, title: 'Frontend', desc: 'Development' },
        { icon: Server, title: 'Backend', desc: 'Architecture' }
    ];

    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-container">
                    {/* Hero Content */}
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div className="hero-badge" variants={itemVariants}>
                            <div className="badge-dot" />
                            <span>{profileData.tagline}</span>
                        </motion.div>

                        {/* Name */}
                        <motion.p className="hero-greeting" variants={itemVariants}>
                            Hi, I'm
                        </motion.p>
                        <motion.h1 className="hero-name" variants={itemVariants}>
                            {profileData.name}
                        </motion.h1>

                        {/* Title with Typing Effect */}
                        <motion.div className="hero-title-wrapper" variants={itemVariants}>
                            <span className="hero-title">{currentRole}</span>
                            <span className="cursor-blink" />
                        </motion.div>

                        {/* Description */}
                        <motion.p className="hero-description" variants={itemVariants}>
                            {profileData.bio}
                        </motion.p>

                        {/* Buttons */}
                        <motion.div className="hero-buttons" variants={itemVariants}>
                            <a href="#projects" className="btn btn-primary">
                                <Rocket size={18} />
                                View My Work
                            </a>
                            <a href="#contact" className="btn btn-secondary">
                                <Mail size={18} />
                                Get In Touch
                            </a>
                            <a
                                href={profileData.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost"
                            >
                                <Github size={18} />
                                GitHub
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div className="hero-stats" variants={itemVariants}>
                            <div className="stat-item">
                                <div className="stat-number">
                                    <Counter target={profileData.stats.yearsExperience} />
                                    <span className="stat-plus">+</span>
                                </div>
                                <p className="stat-label">Years Experience</p>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">
                                    <Counter target={profileData.stats.projectsCompleted} />
                                    <span className="stat-plus">+</span>
                                </div>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">
                                    <Counter target={profileData.stats.deployedProjects} />
                                </div>
                                <p className="stat-label">Deployed Project</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Profile */}
                    <motion.div
                        className="hero-profile"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {/* Profile Card */}
                        <div className="profile-card">
                            <div className="profile-image-wrapper">
                                <img
                                    src="/images/Jeno.jpg"
                                    alt={profileData.name}
                                    className="profile-image"
                                />
                            </div>
                            <div className="profile-info">
                                <h3>{profileData.nickname}</h3>
                                <p>{profileData.title}</p>
                                <div className="profile-status">
                                    <div className="status-dot" />
                                    <span>Open to work</span>
                                </div>
                            </div>

                            {/* Floating Cards - INSIDE profile card for better positioning */}
                            <div className="floating-cards">
                                {floatingCards.map((card, index) => (
                                    <motion.div
                                        key={index}
                                        className="floating-card"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                                    >
                                        <div className="floating-card-icon">
                                            <card.icon size={18} />
                                        </div>
                                        <div className="floating-card-text">
                                            <h4>{card.title}</h4>
                                            <p>{card.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
