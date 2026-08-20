import { useState, useEffect } from 'react';

/**
 * Custom ScrollSpy hook that observes section IDs and highlights active nav link
 * @param {Array<string>} sectionIds - List of section DOM element IDs to spy on
 * @param {number} offset - Scroll threshold offset in pixels
 */
export function useScrollSpy(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    let sectionPositions = [];

    const updatePositions = () => {
      sectionPositions = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const top = el.offsetTop;
          const height = el.offsetHeight;
          return { id, top, bottom: top + height };
        })
        .filter(Boolean);
    };

    updatePositions();

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionPositions.length - 1; i >= 0; i--) {
        const { id, top, bottom } = sectionPositions[i];
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection((prev) => (prev !== id ? id : prev));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePositions, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePositions);
    };
  }, [sectionIds, offset]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = Math.max(0, elementPosition - 80);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { activeSection, scrollToSection };
}
