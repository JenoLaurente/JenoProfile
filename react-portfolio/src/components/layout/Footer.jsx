import { Github, Linkedin, Facebook, Send } from 'lucide-react';
import { profileData } from '../../data/portfolioData';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">{profileData.initials}</div>
                        <p>Crafting digital experiences</p>
                    </div>

                    {/* Links */}
                    <div className="footer-links">
                        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
                        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
                        <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
                        <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
                        <a href="#journey" onClick={(e) => handleNavClick(e, '#journey')}>Journey</a>
                        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
                    </div>

                    {/* Social Links */}
                    <div className="footer-social">
                        <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={18} />
                        </a>
                        <a href={profileData.socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                            <Send size={18} />
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} {profileData.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
