import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Box, Sparkles, Feather, Award } from 'lucide-react';
import { TiltCard } from './TiltCard';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> 01. About me.
          </span>
          <h2 className="section-title">ABOUT</h2>
          <p className="section-subtitle">
            As a leading 3D fashion designer Sri Lanka, exploring digital garments as architectural forms in virtual spaces—unconstrained by physical gravity or raw material yield.
          </p>
        </motion.div>

        {/* Top Grid: Hero Card + Manifesto Card */}
        <div className={styles.gridTop}>
          {/* Redesigned Profile Card */}
          <TiltCard className={styles.heroImgCard}>
            <div className={styles.imgFrame}>
              <picture>
                <source srcSet="/assets/designer-interactive-3d-architect.webp" type="image/webp" />
                <img
                  src="/assets/designer-interactive-3d-architect.webp"
                  alt="Nirmali L.P.R.N. Ranawaka - 3D Digital Fashion Architect"
                  width="600"
                  height="800"
                  fetchPriority="high"
                  decoding="async"
                  className={styles.heroImg}
                />
              </picture>
              {/* Floating Bottom Glass Overlay Pill */}
              <div className={styles.imgOverlayPill}>
                <h3 className={styles.pillName}>L.P.R.N. Ranawaka</h3>
                <div className={styles.pillRole}>3D Digital Fashion Architect</div>
              </div>
            </div>
          </TiltCard>

          {/* Manifesto Card */}
          <TiltCard>
            <div className={styles.manifestoNumber}>01</div>
            <div className={styles.cardIcon}>
              <Feather size={24} />
            </div>
            <div className={styles.cardTag}>02 / Manifesto</div>
            <h3 className={styles.cardTitle}>Manifesto 01.</h3>
            <p className={styles.cardBody}>
              As an experienced CLO 3D freelance designer, the physical realm is a starting point, not a constraint. We are no longer bound by gravity, supply chain costs, or organic threads—3D fashion is pure liberation.
            </p>

            <h4 className={styles.cardTag} style={{ marginTop: '24px' }}>Foundation & Pedigree</h4>
            <ul className={styles.pedigreeList}>
              <li className={styles.pedigreeItem}>
                <span className={styles.bullet} /> Central Saint Martins (London)
              </li>
              <li className={styles.pedigreeItem}>
                <span className={styles.bullet} /> Parsons School of Design (New York)
              </li>
              <li className={styles.pedigreeItem}>
                <span className={styles.bullet} /> Certified CLO 3D & Marvelous Specialist
              </li>
            </ul>
          </TiltCard>
        </div>

        {/* Bottom Grid: 3 Cards */}
        <div className={styles.gridBottom}>
          <TiltCard>
            <div className={styles.cardIcon}>
              <Cpu size={24} />
            </div>
            <div className={styles.cardTag}>03 / Physics</div>
            <h3 className={styles.cardTitle}>Parametric Drape</h3>
            <p className={styles.cardBody}>
              Simulating complex zero-gravity silk physics, stress maps, and fluid collision dynamics for real-time virtual runways.
            </p>
            <picture>
              <source srcSet="/assets/parametric-silk-drape-clo3d.webp" type="image/webp" />
              <img
                src="/assets/parametric-silk-drape-clo3d.jpg"
                alt="Parametric Silk Drape"
                width="800"
                height="446"
                loading="lazy"
                decoding="async"
                className={styles.sampleMedia}
              />
            </picture>
          </TiltCard>

          <TiltCard>
            <div className={styles.cardIcon}>
              <Box size={24} />
            </div>
            <div className={styles.cardTag}>04 / Shading</div>
            <h3 className={styles.cardTitle}>Material Genesis</h3>
            <p className={styles.cardBody}>
              Authoring custom PBR shaders—liquid titanium, iridescent glass weaves, and bioluminescent smart fabrics in Substance & Houdini.
            </p>
            <picture>
              <source srcSet="/assets/architectural-couture-corset.webp" type="image/webp" />
              <img
                src="/assets/architectural-couture-corset.jpg"
                alt="Couture Corset Render"
                width="600"
                height="803"
                loading="lazy"
                decoding="async"
                className={styles.sampleMedia}
              />
            </picture>
          </TiltCard>

          <TiltCard>
            <div className={styles.cardIcon}>
              <Award size={24} />
            </div>
            <div className={styles.cardTag}>05 / Web3 & Spatial</div>
            <h3 className={styles.cardTitle}>Spatial Apparel</h3>
            <p className={styles.cardBody}>
              Engineering optimized Metahuman AR/VR assets, ready for Unreal Engine 5 real-time rendering, Apple Vision Pro, and metaverse fashion shows.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <div className={styles.pedigreeItem}>
                <ShieldCheck size={18} color="var(--accent-lime)" /> 100% Industry Standard Tech Packs
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
