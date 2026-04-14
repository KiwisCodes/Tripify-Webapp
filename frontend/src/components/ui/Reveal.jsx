import React, { useEffect, useRef, useState } from 'react';

/**
 * A centralized IntersectionObserver to avoid creating multiple observers.
 * This significantly improves scroll performance.
 */
let sharedObserver = null;
const observerCallbacks = new Map();

const getSharedObserver = () => {
  if (typeof window === 'undefined') return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          const callback = observerCallbacks.get(entry.target);
          if (callback) {
            callback();
            // Once revealed, we stop watching this element
            sharedObserver.unobserve(entry.target);
            observerCallbacks.delete(entry.target);
          }
        }
      });
    },
    { 
      threshold: [0, 0.1], 
      rootMargin: '50px 0px 50px 0px' // Increased margin for smoother entrance
    }
  );

  return sharedObserver;
};

const Reveal = ({ 
  children, 
  animation = 'reveal', // reveal, reveal-left, reveal-right, reveal-scale
  delay = 0, 
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: If it's not revealed in 2 seconds, show it anyway
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const observer = getSharedObserver();
    if (observer) {
      observerCallbacks.set(el, () => {
        setIsVisible(true);
        clearTimeout(fallbackTimer);
      });
      observer.observe(el);
    } else {
      setIsVisible(true);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (el && observer) {
        observer.unobserve(el);
        observerCallbacks.delete(el);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
