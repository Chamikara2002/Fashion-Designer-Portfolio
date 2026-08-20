import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer({ scrollToSection }) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className="section-container" style={{ paddingBottom: 0, paddingTop: 0 }}>
        <div className={styles.footerGrid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.footerLogo}>NIRMALI</div>
            <div className={styles.footerSubname}>Nirmali L.P.R.N. Ranawaka</div>
            <p className={styles.brandDesc}>
              Sculpting digital garments in the negative space. Bridging the gap between high-fashion editorial aesthetics, parametric cloth simulation, and spatial Web3 environments.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><button className={styles.footerLink} onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button className={styles.footerLink} onClick={() => scrollToSection('about')}>About Studio</button></li>
              <li><button className={styles.footerLink} onClick={() => scrollToSection('portfolio')}>Selected Works</button></li>
              <li><button className={styles.footerLink} onClick={() => scrollToSection('skills')}>Technical Capacity</button></li>
              <li><button className={styles.footerLink} onClick={() => scrollToSection('experience')}>Career Chronicle</button></li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linkList}>
              <li className={styles.footerLink}>3D Digital Couture</li>
              <li className={styles.footerLink}>Spatial UE5 Virtual Runways</li>
              <li className={styles.footerLink}>Procedural Fabric Shading</li>
              <li className={styles.footerLink}>Metahuman Asset Rigging</li>
              <li className={styles.footerLink}>2D/3D Tech Pack Drafting</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <ul className={styles.linkList}>
              <li className={styles.contactInfoItem}>
                <Phone size={16} color="var(--accent-lime)" /> +94 74 072 1152
              </li>
              <li className={styles.contactInfoItem}>
                <Mail size={16} color="var(--accent-lime)" /> rajininirmali99@gmail.com
              </li>
              <li className={styles.contactInfoItem}>
                <MapPin size={16} color="var(--accent-lime)" /> No 33, Galle Road, Colombo
              </li>
              <li style={{ marginTop: '8px' }}>
                <a
                  href="https://wa.me/94740721152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.backToTopBtn}
                >
                  <MessageCircle size={14} /> WhatsApp Direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            © 2026 Nirmali L.P.R.N. Ranawaka. All Rights Reserved. Designed with spatial precision.
          </div>

          <button className={styles.backToTopBtn} onClick={handleScrollTop}>
            Back To Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
