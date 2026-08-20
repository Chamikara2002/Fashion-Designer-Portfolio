import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Box, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { TiltCard } from '../About/TiltCard';
import styles from './Services.module.css';

export function Services() {
  const servicesList = [
    {
      num: '01',
      title: '3D Digital Couture Creation',
      icon: <Layers size={26} />,
      description: 'End-to-end 3D garment sculpting, high-poly cloth draping, and hyper-realistic rendering for haute couture digital fashion houses and Paris fashion week virtual runways.'
    },
    {
      num: '02',
      title: 'Spatial Runways in Unreal Engine 5',
      icon: <Box size={26} />,
      description: 'Real-time spatial 3D runway environments powered by Lumen lighting and MetaHuman Animator, optimized for Apple Vision Pro, Meta Quest, and browser Web3 portals.'
    },
    {
      num: '03',
      title: 'Procedural Shader Authoring',
      icon: <Cpu size={26} />,
      description: 'Inventing impossible physical textiles—liquid metallic weaves, bioluminescent thread matrices, and refractive glass fibers using Substance 3D and Houdini.'
    },
    {
      num: '04',
      title: 'Production Tech Packs & Pattern Grading',
      icon: <ShieldCheck size={26} />,
      description: 'Seamlessly bridging virtual 3D garment concepts to physical manufacturing. Providing DXF pattern grading, seam allowances, and 100% accurate measurement specs.'
    }
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 04. Core Capabilities & Services
          </span>
          <h2 className="section-title">Specialized Services</h2>
          <p className="section-subtitle">
            Explore my digital fashion portfolio for bespoke 3D design solutions catering to luxury brands, spatial game studios, and metaverse fashion week producers.
          </p>
        </motion.div>

        {/* Services 3D Grid */}
        <div className={styles.servicesGrid}>
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TiltCard className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <div className={styles.serviceNumber}>SERVICE // {service.num}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>

                <a
                  href={`https://wa.me/94740721152?text=${encodeURIComponent(`Hi Nirmali, I want to inquire about Service: ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inquireBtn}
                >
                  Inquire Service <ArrowRight size={16} />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
