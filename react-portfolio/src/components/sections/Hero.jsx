import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Github, Palette, Code, Server } from 'lucide-react';
import { profileData } from '../../data/portfolioData';

// Counter component - defined outside Hero to maintain stable reference
const Counter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return; // Don't re-animate once completed

        let startTime;
        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setHasAnimated(true); // Mark as completed
            }
        };

        const timer = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, 500);

        return () => {
            clearTimeout(timer);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [target, duration, hasAnimated]);

    return count;
};

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

                    {/* Hero Profile - New Design with Project Showcase */}
                    <motion.div
                        className="hero-profile"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {/* Project Screenshots Background - Clickable */}
                        <div className="project-showcase">
                            <motion.a
                                href="http://digi-stall.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-screenshot project-1"
                                initial={{ opacity: 0, x: 50, rotate: 5 }}
                                animate={{ opacity: 1, x: 0, rotate: 8 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                title="View Digistall Live Demo"
                            >
                                <img src="/images/Digistall.png" alt="Digistall Project" />
                            </motion.a>
                            <motion.a
                                href="https://tcw-final-project.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-screenshot project-2"
                                initial={{ opacity: 0, x: 80, rotate: -5 }}
                                animate={{ opacity: 1, x: 0, rotate: -5 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                title="View Dubai Cultural Journey Live Demo"
                            >
                                <img src="/images/Dubai.png" alt="Dubai Project" />
                            </motion.a>
                        </div>

                        {/* Transparent Profile Image */}
                        <motion.div
                            className="profile-transparent-wrapper"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <img
                                src="/images/profile-transparent.png"
                                alt={profileData.name}
                                className="profile-transparent"
                            />
                        </motion.div>

                        {/* Name Badge */}
                        <motion.div
                            className="profile-name-badge"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <h3>{profileData.nickname}</h3>
                            <p>{profileData.title}</p>
                        </motion.div>

                        {/* Floating Cards */}
                        <div className="floating-cards">
                            {floatingCards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    className="floating-card"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.3 + index * 0.2, duration: 0.5 }}
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
