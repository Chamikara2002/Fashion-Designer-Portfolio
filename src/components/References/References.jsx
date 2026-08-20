import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { TiltCard } from '../TiltCard/TiltCard';
import styles from './References.module.css';

export function References() {
  const testimonials = [
    {
      initials: 'NR',
      quote: 'Nirmali revolutionized our digital twin workflow. Her mastery over CLO 3D cloth physics and procedural shader authoring allowed us to launch our virtual runway in record time.',
      name: 'Nicolas V. Rose',
      role: 'Creative Director @ Maison Virtuelle Paris'
    },
    {
      initials: 'SL',
      quote: 'The level of detail in Nirmali’s 3D zero-gravity draping and production-ready tech packs is unmatched. She bridges avant-garde high fashion with flawless spatial engineering.',
      name: 'Sophia Laurent',
      role: 'Head of Digital Apparel @ Atelier Noir'
    },
    {
      initials: 'MK',
      quote: 'Working with Nirmali on our MetaHuman Unreal Engine 5 runway presentation was seamless. Her understanding of Lumen lighting and real-time cloth simulation is world-class.',
      name: 'Marcus Vance',
      role: 'Lead Spatial Architect @ Syndicate Form Studios'
    }
  ];

  return (
    <section id="references" className={styles.referencesSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 06. Industry Endorsements & References
          </span>
          <h2 className="section-title">Professional References</h2>
          <p className="section-subtitle">
            What creative directors, spatial architects, and luxury digital fashion houses say about collaborating with Nirmali.
          </p>
        </motion.div>

        {/* Grid */}
        <div className={styles.referencesGrid}>
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TiltCard className={styles.refCard}>
                <div className={styles.quoteMark}>“</div>
                <p className={styles.quoteText}>{item.quote}</p>

                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--accent-lime)" color="var(--accent-lime)" />
                  ))}
                </div>

                <div className={styles.authorBox}>
                  <div className={styles.authorAvatar}>{item.initials}</div>
                  <div>
                    <div className={styles.authorName}>{item.name}</div>
                    <div className={styles.authorRole}>{item.role}</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
