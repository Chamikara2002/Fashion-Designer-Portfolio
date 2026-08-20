import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '../TiltCard/TiltCard';
import styles from './Skills.module.css';

export function Skills() {
  const skillSet = [
    {
      title: 'CLO 3D & Marvelous Designer',
      category: 'CORE DISCIPLINE',
      level: 98,
      details: ['Pattern Drafting', 'Fluid Dynamics', 'Texture Mapping', 'Avatar Rigging']
    },
    {
      title: 'Unreal Engine 5',
      category: 'ENVIRONMENT & LIGHTING',
      level: 92,
      details: ['Lumen Lighting', 'Nanite Geometry', 'MetaHuman Animator', 'Control Rig']
    },
    {
      title: 'Substance 3D Designer',
      category: 'PROCEDURAL SHADERS',
      level: 88,
      details: ['PBR Material Authoring', 'Normal Maps', 'Roughness Maps', 'Displacement']
    },
    {
      title: 'Houdini & Vellum',
      category: 'KINETIC SIMULATION',
      level: 82,
      details: ['Vellum Cloth Physics', 'Zero-Gravity Drape', 'Strand Dynamics', 'Procedural Folds']
    },
    {
      title: 'Blender Geometry Nodes',
      category: 'PROCEDURAL MODELING',
      level: 86,
      details: ['Lattice Sculpting', 'Custom Modifiers', 'UV Unwrapping', 'Cycles Rendering']
    },
    {
      title: 'Digital Tech Packs & Grading',
      category: 'PRODUCTION READY',
      level: 95,
      details: ['DXF Pattern Export', 'Measurement Specs', 'Seam Allowances', 'Costing Charts']
    }
  ];

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 03. Technical Matrix & Capacity
          </span>
          <h2 className="section-title">Technical Proficiency</h2>
          <p className="section-subtitle">
            Quantifying expertise across digital garment creation, spatial engine design, and procedural fabric generation.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {skillSet.map((skill, index) => (
            <TiltCard
              key={index}
              className={styles.skillCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div>
                  <div className="section-tag">{skill.category}</div>
                  <h3 className={styles.skillName}>{skill.title}</h3>
                </div>
                <span className={styles.skillBadge}>{skill.level}%</span>
              </div>

              <div className={styles.progressContainer}>
                <motion.div
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                />
              </div>

              <ul className={styles.skillDetails}>
                {skill.details.map((detail, i) => (
                  <li key={i} className={styles.detailItem}>
                    <CheckCircle2 size={14} className={styles.checkIcon} /> {detail}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
