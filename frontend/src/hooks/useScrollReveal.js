import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a ref element.
 * When it enters the viewport, adds the `is-visible` CSS class.
 * Use CSS to define the transition from hidden → visible state.
 *
 * @param {IntersectionObserverInit} options
 * @returns {{ ref }} - Attach `ref` to the root element of the section
 */
const useScrollReveal = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el); // Only animate once
                }
            },
            { threshold: 0.12, ...options }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref };
};

export default useScrollReveal;
