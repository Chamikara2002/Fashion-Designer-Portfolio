import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { use3DTilt } from '../../hooks/use3DTilt';
import styles from './TiltCard.module.css';

export function TiltCard({ children, className = '', options = {}, onClick }) {
  const {
    cardRef,
    rotateX,
    rotateY,
    scale,
    glareX,
    glareY,
    glareOpacity,
    handleMouseMove,
    handleMouseLeave
  } = use3DTilt(options);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.tiltCard} ${className}`}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={styles.cardInner}>{children}</div>
      <motion.div
        className={styles.cardGlare}
        style={{
          background: glareBackground,
          opacity: glareOpacity,
        }}
      />
    </motion.div>
  );
}

export default TiltCard;
