import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '../TiltCard/TiltCard';
import styles from './Education.module.css';

export function Education() {
  const educationData = [
    {
      year: '2019 - 2021',
      school: 'Central Saint Martins',
      location: 'London, UK',
      degree: 'BA (Hons) Fashion Design & Digital Textiles',
      description: 'A rigorous exploration of form, silhouette, and materiality. Focused deeply on integrating 3D digital workflows with traditional draping techniques.',
      highlights: [
        'First Class Honors Distinction',
        'Specialization in Parametric Pattern Drafting',
        'Senior Thesis: Zero-Gravity Cloth Dynamics'
      ]
    },
    {
      year: '2021 - 2023',
      school: 'Parsons School of Design',
      location: 'New York, USA',
      degree: 'MFA Textiles & Spatial Apparel',
      description: 'Advanced research bridging virtual reality sculpting, algorithmic pattern generation, and physical high-fashion execution.',
      highlights: [
        'Digital Textile Design & Generative Shading',
        '3D Apparel Construction via CLO 3D & Unreal Engine',
        'Sustainable Smart Fabrics & 3D Printed Corsetry'
      ]
    },
    {
      year: '2023 - PRESENT',
      school: 'Advanced Couture Studio',
      location: 'Paris / Remote',
      degree: 'Certified Master 3D Specialist',
      description: 'Continuous independent research bridging virtual reality sculpting, algorithmic pattern generation, and physical high-fashion execution.',
      highlights: [
        'Certified Marvelous Designer & CLO 3D Master',
        'Substance 3D PBR Material Authoring Certification',
        'Unreal Engine 5 Real-Time Rendering Accreditation'
      ]
    }
  ];

  return (
    <section id="education" className={styles.educationSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 02. Academic & Technical Pedigree
          </span>
          <h2 className="section-title">Education & Credentials</h2>
          <p className="section-subtitle">
            The foundation of avant-garde minimalist design, academic research, and certified digital fashion expertise.
          </p>
        </motion.div>

        {/* Education Grid */}
        <div className={styles.educationGrid}>
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TiltCard className={styles.eduCard}>
                <div className={styles.yearTag}>{edu.year} // {edu.location}</div>
                <h3 className={styles.schoolName}>{edu.school}</h3>
                <div className={styles.degreeTitle}>{edu.degree}</div>
                <p className={styles.eduDesc}>{edu.description}</p>

                <ul className={styles.courseList}>
                  {edu.highlights.map((h, i) => (
                    <li key={i} className={styles.courseItem}>
                      <CheckCircle2 size={16} color="var(--accent-lime)" /> {h}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
