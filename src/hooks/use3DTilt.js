import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom 3D Tilt Hook powered by Framer Motion spring physics
 * @param {Object} options Configuration for tilt sensitivity and spring damping
 */
export function use3DTilt(options = {}) {
  const { maxTilt = 10, scale = 1.025, springConfig = { stiffness: 280, damping: 22 } } = options;
  const cardRef = useRef(null);

  // Raw target values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);
  const rawGlareX = useMotionValue(50);
  const rawGlareY = useMotionValue(50);
  const rawGlareOpacity = useMotionValue(0);

  // Spring-smoothed animated values
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scaleVal = useSpring(rawScale, springConfig);
  const glareX = useSpring(rawGlareX, springConfig);
  const glareY = useSpring(rawGlareY, springConfig);
  const glareOpacity = useSpring(rawGlareOpacity, springConfig);

  const rectRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    if (!rectRef.current) {
      rectRef.current = card.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tX = ((y - centerY) / centerY) * -maxTilt;
    const tY = ((x - centerX) / centerX) * maxTilt;

    rawRotateX.set(tX);
    rawRotateY.set(tY);
    rawScale.set(scale);

    rawGlareX.set((x / rect.width) * 100);
    rawGlareY.set((y / rect.height) * 100);
    rawGlareOpacity.set(1);
  }, [maxTilt, scale, rawRotateX, rawRotateY, rawScale, rawGlareX, rawGlareY, rawGlareOpacity]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
    rawGlareX.set(50);
    rawGlareY.set(50);
    rawGlareOpacity.set(0);
  }, [rawRotateX, rawRotateY, rawScale, rawGlareX, rawGlareY, rawGlareOpacity]);

  return {
    cardRef,
    rotateX,
    rotateY,
    scale: scaleVal,
    glareX,
    glareY,
    glareOpacity,
    handleMouseMove,
    handleMouseLeave
  };
}
