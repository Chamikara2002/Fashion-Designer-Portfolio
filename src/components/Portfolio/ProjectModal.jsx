import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, MessageCircle, CheckCircle2, Cpu, Box } from 'lucide-react';
import styles from './Portfolio.module.css';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className={styles.modalBackdrop} onClick={onClose}>
        <motion.div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          <div className={styles.modalGrid}>
            <div className={styles.modalMediaCol}>
              <picture>
                <source srcSet={project.image} type="image/webp" />
                <img
                  src={project.fallbackImage || project.image}
                  alt={project.title}
                  width={project.width}
                  height={project.height}
                  className={styles.modalImg}
                />
              </picture>
            </div>

            <div className={styles.modalInfoCol}>
              <div className={styles.modalTag}>{project.category}</div>
              <h2 className={styles.modalTitle}>{project.title}</h2>
              <p className={styles.modalDesc}>{project.fullDescription}</p>

              <div className={styles.specsBox}>
                <h4 className={styles.specsTitle}>Technical Specifications</h4>
                <ul className={styles.specsList}>
                  {project.specs.map((spec, i) => (
                    <li key={i} className={styles.specItem}>
                      <CheckCircle2 size={16} color="var(--accent-lime)" /> {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.toolsUsed}>
                {project.tools.map((tool, i) => (
                  <span key={i} className={styles.toolPill}>{tool}</span>
                ))}
              </div>

              <div className={styles.modalActions}>
                <a
                  href={`https://wa.me/94740721152?text=${encodeURIComponent(`Hi Nirmali, I am interested in inquiring about your project: ${project.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalWhatsappBtn}
                >
                  <MessageCircle size={18} /> Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
