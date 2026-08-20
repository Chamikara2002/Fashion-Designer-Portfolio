import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, FileText, Download } from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas';
import { TypewriterSubtitle } from './TypewriterSubtitle';
import { handleDownloadCV } from '../../utils/cvHandler';
import styles from './Hero.module.css';

export function Hero({ scrollToSection, onOpenCvModal }) {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Dynamic 3D Particle Constellation Backdrop */}
      <div className={styles.canvasContainer}>
        <ParticleCanvas />
      </div>

      <div className={`section-container ${styles.heroContent}`}>
        {/* Availability Badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.statusDot} />
          Available for Spatial & 3D Fashion Commissions
        </motion.div>

        {/* Main Title */}
        <motion.div
          className={styles.nameTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1>L.P.R.N. RANAWAKA</h1>
        </motion.div>

        {/* Subtitle Role with Dynamic Typewriter Effect */}
        <motion.div
          className={styles.roleSubtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TypewriterSubtitle />
        </motion.div>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sculpting digital garments in the negative space. Bridging the gap between high-fashion editorial aesthetics, parametric cloth physics, and spatial Web3 depth.
        </motion.p>

        {/* Ultra-Modern High-Converting Hero CTA Buttons */}
        <motion.div
          className={styles.ctaGrid}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Primary Action */}
          <button
            className={styles.primaryCtaBtn}
            onClick={() => scrollToSection('portfolio')}
          >
            <span>EXPLORE WORK</span>
            <div className={styles.iconBadge}><ArrowRight size={16} /></div>
          </button>

          {/* In-Site View CV Action */}
          <button
            className={styles.viewCvBtn}
            onClick={onOpenCvModal}
          >
            <div className={styles.iconBadgeLime}><FileText size={16} /></div>
            <span>VIEW CV</span>
          </button>

          {/* Direct Download CV Action */}
          <button
            className={styles.downloadCvBtn}
            onClick={handleDownloadCV}
          >
            <div className={styles.iconBadgeDark}><Download size={16} /></div>
            <span>DOWNLOAD CV</span>
          </button>

          {/* Direct WhatsApp Action */}
          <a
            href="https://wa.me/94740721152"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCtaBtn}
          >
            <div className={styles.iconBadgeEmerald}><MessageCircle size={16} /></div>
            <span>WHATSAPP DIRECT</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>
    </section>
  );
}
