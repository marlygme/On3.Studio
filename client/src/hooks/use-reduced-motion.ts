import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Motion variants that respect user preferences
export const createMotionVariants = (prefersReducedMotion: boolean) => ({
  // Fade in animations
  fadeIn: {
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0.01 : 0.8, ease: "easeOut" }
  },
  
  // Stagger animations
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  },
  
  // Hover effects
  hover: prefersReducedMotion ? {} : {
    scale: 1.02,
    y: -8,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  
  // Button interactions
  buttonHover: prefersReducedMotion ? {} : { scale: 1.05 },
  buttonTap: prefersReducedMotion ? {} : { scale: 0.95 }
});