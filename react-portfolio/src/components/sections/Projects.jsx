import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, Clock, Folder, ArrowRight } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredProject, setHoveredProject] = useState(null);

    // Animation variants for scroll reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="projects" className="projects" ref={ref}>
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
                        <Folder size={14} />
                        Portfolio
                    </span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        Showcasing my latest work and creative solutions
                    </p>
                </motion.div>

                {/* Projects List with scroll animations */}
                <motion.div
                    className="projects-list"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`project-item ${hoveredProject === project.id ? 'active' : ''}`}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Project Image */}
                            <div className="project-image-container">
                                <motion.div
                                    className="project-image-inner"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-img"
                                    />
                                </motion.div>
                            </div>

                            {/* Project Info */}
                            <div className="project-info">
                                <div className="project-meta">
                                    <span className="project-type">{project.type}</span>
                                    <span className={`project-status ${project.status}`}>
                                        {project.status === 'deployed' ? 'Live' : 'In Progress'}
                                    </span>
                                </div>

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>

                                {/* Tech Stack */}
                                <div className="project-tech-stack">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="tech-pill">{tech}</span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="project-links">
                                    {project.github && (
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Github size={18} />
                                            <span>Source</span>
                                        </motion.a>
                                    )}
                                    {project.liveUrl ? (
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link primary"
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ExternalLink size={18} />
                                            <span>Live Demo</span>
                                            <ArrowRight size={16} />
                                        </motion.a>
                                    ) : (
                                        <span className="project-link disabled">
                                            <Clock size={18} />
                                            <span>Coming Soon</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Decorative Number */}
                            <span className="project-number">0{index + 1}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA with animation */}
                <motion.div
                    className="projects-cta"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p>Want to see more?</p>
                    <motion.a
                        href="https://github.com/JenoPro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Github size={18} />
                        View All on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
