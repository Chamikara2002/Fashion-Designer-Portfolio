import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { TiltCard } from '../TiltCard/TiltCard';
import styles from './Experience.module.css';

export function Experience() {
  const experiences = [
    {
      year: '2021 - PRESENT',
      role: 'Lead 3D Fashion Architect',
      company: 'MAISON VIRTUELLE',
      description: 'Spearheaded the integration of parametric 3D modeling into traditional haute couture workflows. Developed a proprietary digital draping pipeline used in major Paris Fashion Week virtual presentations.',
      achievements: [
        'Orchestrated digital twin creation for 200+ archival garments.',
        'Reduced physical prototyping waste by 64% across 4 luxury lines.',
        'Directed real-time Metahuman avatar runway presentations in Unreal Engine 5.'
      ]
    },
    {
      year: '2018 - 2021',
      role: 'Senior Pattern Drafter & 3D Specialist',
      company: 'ATELIER NOIR',
      description: 'Bridged the gap between avant-garde concept sketches and structural digital reality. Specialized in complex geometric silhouettes and unconventional fabric manipulation techniques.',
      achievements: [
        'Lead pattern drafter for the award-winning "Monolith" Fall/Winter collection.',
        'Implemented rigorous 3D quality control standards for bespoke orders.'
      ]
    },
    {
      year: '2015 - 2018',
      role: 'Technical Garment Designer',
      company: 'SYNDICATE FORM',
      description: 'Translated conceptual designs into highly detailed production tech packs. Focused on high-performance outerwear, combining high-fashion aesthetics with extreme weather functionality.',
      achievements: [
        'Authored 100+ production tech packs with DXF pattern integration.',
        'Optimized fabric marker yield by 14% using algorithmic nesting.'
      ]
    }
  ];

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 04. Career History & Chronicle
          </span>
          <h2 className="section-title">Selected Experience</h2>
          <p className="section-subtitle">
            A definitive record of structural design, 3D modeling, and editorial fashion execution.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`${styles.timelineItem} ${!isEven ? styles.timelineItemRight : ''}`}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={styles.timelineNode} />

                <TiltCard className={styles.timelineCard}>
                  <div className={styles.timelineYear}>
                    <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    {exp.year}
                  </div>
                  <h3 className={styles.timelineRole}>{exp.role}</h3>
                  <div className={styles.timelineCompany}>{exp.company}</div>
                  <p className={styles.timelineDesc}>{exp.description}</p>

                  <ul className={styles.achievementList}>
                    {exp.achievements.map((item, i) => (
                      <li key={i} className={styles.achievementItem}>
                        <span className={styles.bulletDot} /> {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
