import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollProgress = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* Progress Bar */}
            <div className="scroll-progress">
                <motion.div
                    className="scroll-progress-bar"
                    style={{ scaleX }}
                />
            </div>

            {/* Scroll to Top Button */}
            <button
                className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </>
    );
};

export default ScrollProgress;
