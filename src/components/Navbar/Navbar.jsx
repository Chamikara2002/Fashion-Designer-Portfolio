import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText, Download } from 'lucide-react';
import { handleDownloadCV } from '../../utils/cvHandler';
import styles from './Navbar.module.css';

export function Navbar({ activeSection, scrollToSection, onOpenCvModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'portfolio', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Chronicle' },
    { id: 'references', label: 'References' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  const handleViewCvClick = () => {
    onOpenCvModal();
    setMobileOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <div className={styles.brand} onClick={() => handleNavClick('home')}>
          <span className={styles.logoText}>NIRMALI</span>
          <div className={styles.logoDot} />
        </div>

        {/* Desktop Links */}
        <ul className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ''}`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
          
          {/* CV Action Buttons */}
          <li className={styles.cvBtnGroup}>
            <button
              className={styles.viewCvBtn}
              onClick={handleViewCvClick}
              title="View CV inside site"
            >
              <FileText size={14} /> View CV
            </button>
            <button
              className={styles.downloadCvBtn}
              onClick={handleDownloadCV}
              title="Direct Download PDF CV"
            >
              <Download size={14} /> Download CV
            </button>
          </li>

          <li>
            <button className={styles.hireButton} onClick={() => handleNavClick('contact')}>
              Hire Me <ArrowUpRight size={16} />
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
