import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const ROLES = [
  '3D Digital Fashion Architect',
  'Pattern Designer',
  'Fashion Designer',
  'Spatial Garment Architect',
  '3D Apparel Sculptor'
];

export function TypewriterSubtitle() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 110);
      } else {
        // Pause at end of word for 2000ms before backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 55);
      } else {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className={styles.typewriterContainer}>
      <span className={styles.prefixText}>I'm a </span>
      <span className={styles.typedTextWrapper}>
        <span className={styles.typedText}>{displayText}</span>
        <span className={styles.cursor}>|</span>
        <span className={styles.animatedUnderline} />
      </span>
    </div>
  );
}

export default TypewriterSubtitle;
