import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Zap, Layout, Server, Database, Wrench, Globe } from 'lucide-react';

// Skills organized by category
const skillCategories = {
    all: { label: 'All Skills', icon: Zap },
    frontend: { label: 'Frontend', icon: Layout },
    backend: { label: 'Backend', icon: Server },
    database: { label: 'Database', icon: Database },
    tools: { label: 'Tools', icon: Wrench },
    languages: { label: 'Languages', icon: Globe }
};

const allSkills = [
    // Frontend
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
    { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'frontend' },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'frontend' },
    { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
    { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'frontend' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'frontend' },
    { name: 'Sass', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', category: 'frontend' },

    // Backend
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend' },
    { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'backend' },
    { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', category: 'backend' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'backend' },
    { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', category: 'backend' },

    // Database
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database' },

    // Languages
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'languages' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'languages' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'languages' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'languages' },
    { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', category: 'languages' },

    // Tools
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'tools' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'tools' },
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'tools' },
    { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'tools' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'tools' },
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeCategory, setActiveCategory] = useState('all');

    // Filter skills based on active category
    const filteredSkills = activeCategory === 'all'
        ? allSkills
        : allSkills.filter(skill => skill.category === activeCategory);

    // Duplicate for seamless scroll
    const duplicatedSkills = [...filteredSkills, ...filteredSkills];

    return (
        <section id="skills" className="skills" ref={ref}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">
                        <Zap size={14} />
                        Technical Skills
                    </span>
                    <h2 className="section-title">Tech Stack & Expertise</h2>
                    <p className="section-subtitle">
                        Modern technologies and tools I use to build exceptional digital products
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    className="skills-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {Object.entries(skillCategories).map(([key, { label, icon: Icon }]) => (
                        <button
                            key={key}
                            className={`skills-tab ${activeCategory === key ? 'active' : ''}`}
                            onClick={() => setActiveCategory(key)}
                        >
                            <Icon size={16} />
                            <span>{label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Skills Carousel */}
                <motion.div
                    className="skills-carousel-wrapper"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    key={activeCategory} // Re-render on category change
                >
                    {/* Single Row Carousel */}
                    <div className="skills-carousel">
                        <div className="skills-track track-left">
                            {duplicatedSkills.map((skill, index) => (
                                <div key={`skill-${index}`} className="skill-logo-item">
                                    <img
                                        src={skill.logo}
                                        alt={skill.name}
                                        className="skill-logo-img"
                                        loading="lazy"
                                    />
                                    <span className="skill-logo-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Row - Reverse Direction */}
                    <div className="skills-carousel">
                        <div className="skills-track track-right">
                            {[...duplicatedSkills].reverse().map((skill, index) => (
                                <div key={`skill-rev-${index}`} className="skill-logo-item">
                                    <img
                                        src={skill.logo}
                                        alt={skill.name}
                                        className="skill-logo-img"
                                        loading="lazy"
                                    />
                                    <span className="skill-logo-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Skills Count */}
                <motion.p
                    className="skills-count"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    {filteredSkills.length} technologies in {activeCategory === 'all' ? 'total' : activeCategory}
                </motion.p>
            </div>
        </section>
    );
};

export default Skills;
