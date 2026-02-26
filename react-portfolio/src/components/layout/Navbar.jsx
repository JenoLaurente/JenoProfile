import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Mail, Menu, X, Download, ChevronDown } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { CVOptions, openCVInNewTab } from '../../utils/cvService';

const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Contact', href: '#contact', icon: Mail },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isCVDropdownOpen, setIsCVDropdownOpen] = useState(false);
    const cvDropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Update active section based on scroll position
            const sections = navItems.map(item => item.href.substring(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close CV dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cvDropdownRef.current && !cvDropdownRef.current.contains(event.target)) {
                setIsCVDropdownOpen(false);
            }
        };

        if (isCVDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCVDropdownOpen]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleCVSelect = (cvType) => {
        openCVInNewTab(cvType);
        setIsCVDropdownOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="navbar-container">
                    {/* Logo */}
                    <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
                        <div className="logo-icon">{profileData.initials}</div>
                        <div className="logo-text">
                            <div className="logo-name">{profileData.nickname}</div>
                            <div className="logo-title">Full Stack Dev</div>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="navbar-links">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={activeSection === item.href.substring(1) ? 'active' : ''}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                >
                                    <item.icon size={18} />
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Download CV Dropdown */}
                    <div className="cv-dropdown" ref={cvDropdownRef}>
                        <button 
                            className="cv-download-btn"
                            onClick={() => setIsCVDropdownOpen(!isCVDropdownOpen)}
                        >
                            <Download size={18} />
                            <span>Download CV</span>
                            <ChevronDown size={16} className={`dropdown-icon ${isCVDropdownOpen ? 'open' : ''}`} />
                        </button>

                        {isCVDropdownOpen && (
                            <motion.div 
                                className="cv-dropdown-menu"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <button 
                                    className="cv-dropdown-item"
                                    onClick={() => handleCVSelect('TECHNICAL')}
                                >
                                    <span>Technical CV</span>
                                </button>
                                <button 
                                    className="cv-dropdown-item"
                                    onClick={() => handleCVSelect('GENERAL')}
                                >
                                    <span>General CV</span>
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="mobile-menu-links">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                                <item.icon size={24} />
                                {item.name}
                            </a>
                        </motion.li>
                    ))}
                    {/* Mobile Download CV Dropdown */}
                    <motion.li
                        initial={{ opacity: 0, y: 20 }}
                        animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: navItems.length * 0.1 }}
                    >
                        <div className="mobile-cv-menu">
                            <button 
                                className="mobile-cv-btn"
                                onClick={() => setIsCVDropdownOpen(!isCVDropdownOpen)}
                            >
                                <Download size={24} />
                                Download CV
                                <ChevronDown size={18} className={`dropdown-icon ${isCVDropdownOpen ? 'open' : ''}`} />
                            </button>
                            {isCVDropdownOpen && (
                                <motion.div 
                                    className="mobile-cv-dropdown-menu"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <button 
                                        className="mobile-cv-dropdown-item"
                                        onClick={() => handleCVSelect('TECHNICAL')}
                                    >
                                        <span>Technical CV</span>
                                        <span className="cv-description">For Tech Roles</span>
                                    </button>
                                    <button 
                                        className="mobile-cv-dropdown-item"
                                        onClick={() => handleCVSelect('GENERAL')}
                                    >
                                        <span>General CV</span>
                                        <span className="cv-description">For Call Center / Teaching</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
