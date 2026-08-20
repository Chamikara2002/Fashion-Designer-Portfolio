import React, { useEffect, useRef } from 'react';
import styles from './ParticleCanvas.module.css';

export function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking state
    const mouse = {
      x: null,
      y: null,
      radius: 170, // Connection radius around cursor
    };

    // Particles array
    let particles = [];

    // Particle class definition
    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.baseRadius = Math.random() * 1.5 + 1.2;
        this.radius = this.baseRadius;
        this.baseAlpha = Math.random() * 0.4 + 0.4;
        this.alpha = this.baseAlpha;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges smoothly
        if (this.x < 0) {
          this.x = 0;
          this.vx *= -1;
        } else if (this.x > w) {
          this.x = w;
          this.vx *= -1;
        }

        if (this.y < 0) {
          this.y = 0;
          this.vy *= -1;
        } else if (this.y > h) {
          this.y = h;
          this.vy *= -1;
        }

        // Mouse repulsion & hover effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
            this.radius = this.baseRadius + force * 1.5;
          } else {
            this.radius = this.baseRadius;
          }
        } else {
          this.radius = this.baseRadius;
        }
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(204, 255, 0, ${this.alpha})`;
        context.shadowColor = '#ccff00';
        context.shadowBlur = 6;
        context.fill();
        context.shadowBlur = 0; // Reset shadow for line performance
      }
    }

    const initParticles = (w, h) => {
      // Density based on screen area: ~1 particle per 15,000 sq px, capped between 35 and 90
      const area = w * h;
      const count = Math.min(Math.max(Math.floor(area / 15000), 35), 90);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    let cachedCanvasRect = null;

    const updateCanvasRect = () => {
      if (canvas) {
        cachedCanvasRect = canvas.getBoundingClientRect();
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cachedCanvasRect = rect;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      initParticles(width, height);
    };

    const handleMouseMove = (e) => {
      if (!cachedCanvasRect) {
        const parent = canvas.parentElement;
        if (parent) cachedCanvasRect = parent.getBoundingClientRect();
      }
      if (cachedCanvasRect) {
        mouse.x = e.clientX - cachedCanvasRect.left;
        mouse.y = e.clientY - cachedCanvasRect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleScroll = () => {
      cachedCanvasRect = null;
    };

    // Attach listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup
    handleResize();

    const connectionMaxDist = 135;

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(width, height);
        p1.draw(ctx);

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionMaxDist) {
            const alpha = (1 - dist / connectionMaxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw cursor connection lines if mouse is active
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          if (mdist < mouse.radius) {
            const mAlpha = (1 - mdist / mouse.radius) * 0.55;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${mAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.canvasWrapper}>
      <canvas ref={canvasRef} className={styles.particleCanvas} />
    </div>
  );
}

export default ParticleCanvas;
