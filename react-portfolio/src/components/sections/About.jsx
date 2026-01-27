import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Code, Server, Smartphone, Palette, User } from 'lucide-react';
import { profileData, expertiseData } from '../../data/portfolioData';

const iconMap = {
    code: Code,
    server: Server,
    smartphone: Smartphone,
    palette: Palette
};

const About = () => {
    const ref = useRef(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section id="about" className="about" ref={ref}>
            <div className="container">
                {/* Section Header with scroll animation */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">
                        <User size={14} />
                        About Me
                    </span>
                    <h2 className="section-title">Know Who I Am</h2>
                    <p className="section-subtitle">
                        Passionate developer with expertise in creating innovative digital solutions
                    </p>
                </motion.div>

                {/* About Content with scroll animation */}
                <motion.div
                    className="about-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Left Column - Intro */}
                    <motion.div className="about-intro" variants={itemVariants}>
                        <h3>Building the Future, One Line of Code at a Time</h3>
                        <p>
                            I'm a passionate Full Stack Developer and UI/UX Designer with over{' '}
                            {profileData.stats.yearsExperience} years of experience creating innovative digital
                            solutions. My journey in technology started with a curiosity about how things work,
                            and it has evolved into a deep passion for crafting exceptional user experiences.
                        </p>
                        <p>
                            I believe in the power of clean code, thoughtful design, and user-centered development.
                            Every project is an opportunity to push boundaries and create something remarkable that
                            makes a real impact.
                        </p>

                        {/* Stats */}
                        <div className="about-stats">
                            <motion.div
                                className="about-stat-item"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="about-stat-number">{profileData.stats.projectsCompleted}+</div>
                                <p className="about-stat-label">Projects Completed</p>
                            </motion.div>
                            <motion.div
                                className="about-stat-item"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="about-stat-number">{profileData.stats.yearsExperience}+</div>
                                <p className="about-stat-label">Years Experience</p>
                            </motion.div>
                            <motion.div
                                className="about-stat-item"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="about-stat-number">{profileData.stats.technologies}+</div>
                                <p className="about-stat-label">Technologies</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Top 2 Expertise Cards */}
                    <div className="about-cards">
                        {expertiseData.slice(0, 2).map((item, index) => {
                            const IconComponent = iconMap[item.icon];
                            return (
                                <motion.div
                                    key={item.title}
                                    className="about-card"
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="about-card-header">
                                        <div className="about-card-icon">
                                            <IconComponent size={24} />
                                        </div>
                                        <h4>{item.title}</h4>
                                    </div>
                                    <p>{item.description}</p>
                                    <div className="tech-tags">
                                        {item.technologies.map((tech) => (
                                            <span key={tech} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Bottom - Remaining Expertise Cards (Mobile & UI/UX) */}
                <div className="about-bottom-grid">
                    {expertiseData.slice(2).map((item, index) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <motion.div
                                key={item.title}
                                className="about-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="about-card-header">
                                    <div className="about-card-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <h4>{item.title}</h4>
                                </div>
                                <p>{item.description}</p>
                                <div className="tech-tags">
                                    {item.technologies.map((tech) => (
                                        <span key={tech} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
