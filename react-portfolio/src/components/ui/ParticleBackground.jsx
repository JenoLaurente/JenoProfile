import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particleCount = 60;

        // Create particles with varying sizes and opacity
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random animation timing
            particle.style.animationDelay = `${Math.random() * 25}s`;
            particle.style.animationDuration = `${20 + Math.random() * 20}s`;

            // Varying sizes for depth effect
            const size = 1 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Pure white/gray particles - monochrome theme
            const opacity = 0.03 + Math.random() * 0.12;
            particle.style.background = `rgba(255, 255, 255, ${opacity})`;

            // Add subtle glow to some particles
            if (Math.random() > 0.7) {
                particle.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`;
            }

            container.appendChild(particle);
        }

        // Create floating orbs (larger soft glows)
        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            orb.style.left = `${Math.random() * 100}%`;
            orb.style.top = `${Math.random() * 100}%`;
            orb.style.animationDelay = `${Math.random() * 15}s`;
            container.appendChild(orb);
        }

        // Cleanup
        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <>
            <div ref={containerRef} className="particles-container" />
            <style>{`
                .particles-container {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: -1;
                    overflow: hidden;
                }
                
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    animation: particle-float 25s infinite ease-in-out;
                }
                
                .floating-orb {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
                    animation: orb-drift 30s infinite ease-in-out;
                    pointer-events: none;
                }
                
                @keyframes particle-float {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(50px, -200px) scale(1.2);
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(100px, -400px) scale(0.5);
                        opacity: 0;
                    }
                }
                
                @keyframes orb-drift {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(100px, -50px) scale(1.1);
                    }
                    50% {
                        transform: translate(-50px, -100px) scale(0.9);
                    }
                    75% {
                        transform: translate(50px, 50px) scale(1.05);
                    }
                }
            `}</style>
        </>
    );
};

export default ParticleBackground;
