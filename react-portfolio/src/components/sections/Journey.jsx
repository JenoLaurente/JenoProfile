import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Rocket,
    Smartphone,
    Server,
    Code,
    Monitor,
    BookOpen,
    CheckCircle,
    Target,
    Trophy,
    GraduationCap,
    Briefcase,
    Circle
} from 'lucide-react';
import { journeyData } from '../../data/portfolioData';

const iconMap = {
    rocket: Rocket,
    mobile: Smartphone,
    server: Server,
    code: Code,
    desktop: Monitor,
    book: BookOpen
};

const typeIcons = {
    milestone: Trophy,
    skill: BookOpen,
    project: Briefcase,
    education: GraduationCap
};

const Journey = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    // Scroll progress for the timeline line
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    // Transform scroll progress to line height
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Calculate completion
    const totalMilestones = journeyData.length;
    const completedMilestones = journeyData.filter(item =>
        item.type === 'milestone' || parseInt(item.year) < 2026
    ).length;
    const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);

    return (
        <section id="journey" className="journey" ref={containerRef}>
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
                        <Target size={14} />
                        Career Progress
                    </span>
                    <h2 className="section-title">Roadmap & Achievements</h2>
                    <p className="section-subtitle">
                        A timeline of my growth, learning milestones, and key accomplishments in tech
                    </p>
                </motion.div>

                {/* Progress Stats Bar */}
                <motion.div
                    className="journey-stats-bar"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="journey-stat-item">
                        <span className="journey-stat-value">{totalMilestones}</span>
                        <span className="journey-stat-label">Milestones</span>
                    </div>
                    <div className="journey-progress-bar-wrapper">
                        <div className="journey-progress-bar">
                            <motion.div
                                className="journey-progress-fill"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progressPercentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </div>
                        <span className="journey-progress-text">{progressPercentage}% Complete</span>
                    </div>
                    <div className="journey-stat-item">
                        <span className="journey-stat-value">{completedMilestones}</span>
                        <span className="journey-stat-label">Achieved</span>
                    </div>
                </motion.div>

                {/* Timeline with Center Line */}
                <div className="journey-timeline" ref={timelineRef}>
                    {/* Center Line with Scroll Progress */}
                    <div className="timeline-line">
                        <motion.div
                            className="timeline-line-progress"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Timeline Items - Alternating Left/Right */}
                    {journeyData.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || Rocket;
                        const TypeIcon = typeIcons[item.type] || Trophy;
                        const isCompleted = item.type === 'milestone' || parseInt(item.year) <= 2025;
                        const isLeft = index % 2 === 0; // Even = left, Odd = right

                        return (
                            <motion.div
                                key={index}
                                className={`timeline-item ${isLeft ? 'left' : 'right'} ${isCompleted ? 'completed' : ''}`}
                                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {/* Timeline Dot */}
                                <div className="timeline-dot">
                                    <motion.div
                                        className="timeline-dot-inner"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle size={16} />
                                        ) : (
                                            <Circle size={16} />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Card */}
                                <motion.div
                                    className="timeline-card"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* Card Header */}
                                    <div className="timeline-card-header">
                                        <div className="timeline-card-icon">
                                            <IconComponent size={22} />
                                        </div>
                                        <div className="timeline-card-meta">
                                            <span className="timeline-year">{item.year}</span>
                                            <span className="timeline-type">
                                                <TypeIcon size={12} />
                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </span>
                                        </div>
                                        {isCompleted && (
                                            <div className="timeline-check">
                                                <CheckCircle size={18} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-desc">{item.description}</p>

                                    {/* Progress Bar */}
                                    <div className="timeline-progress">
                                        <div className="timeline-progress-track">
                                            <motion.div
                                                className="timeline-progress-bar"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: isCompleted ? '100%' : '60%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                            />
                                        </div>
                                        <span className="timeline-progress-label">
                                            {isCompleted ? 'Completed' : 'In Progress'}
                                        </span>
                                    </div>

                                    {/* Achievements */}
                                    <ul className="timeline-achievements">
                                        {item.achievements.map((achievement, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.5 + i * 0.1 }}
                                            >
                                                <CheckCircle size={14} />
                                                <span>{achievement}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Journey;
