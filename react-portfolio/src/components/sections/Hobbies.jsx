import { motion } from 'framer-motion';
import { Gamepad2, Crown, Music, Mountain, BookOpen, Film } from 'lucide-react';
import { hobbiesData } from '../../data/portfolioData';

const iconMap = {
    gamepad: Gamepad2,
    crown: Crown,
    music: Music,
    mountain: Mountain,
    book: BookOpen,
    film: Film
};

const Hobbies = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <section id="hobbies" className="hobbies">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">Beyond the Keyboard</span>
                    <h2 className="section-title">Interests & Hobbies</h2>
                    <p className="section-subtitle">
                        When I'm not coding, here's what keeps me inspired
                    </p>
                </motion.div>

                <motion.div
                    className="hobbies-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {hobbiesData.map((hobby, index) => {
                        const IconComponent = iconMap[hobby.icon];
                        return (
                            <motion.div
                                key={index}
                                className="hobby-card"
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="hobby-icon">
                                    {IconComponent && <IconComponent size={28} />}
                                </div>
                                <div className="hobby-content">
                                    <h3>{hobby.title}</h3>
                                    <p>{hobby.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Hobbies;
