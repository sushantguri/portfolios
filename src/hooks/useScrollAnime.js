/**
 * useScrollAnime — Triggers an anime.js animation when an element enters the viewport.
 * Uses IntersectionObserver for scroll detection (no framer-motion dependency).
 */
import { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';

/**
 * @param {Function} animationFn  - Called with (element) when it enters viewport.
 *   Should return an anime.js animation instance.
 * @param {object}   options
 * @param {number}   options.threshold   - IO threshold (default 0.15)
 * @param {boolean}  options.once        - Only fire once (default true)
 * @param {string}   options.rootMargin  - IO rootMargin (default '-60px')
 * @returns {React.RefObject}
 */
export function useScrollAnime(animationFn, { threshold = 0.15, once = true, rootMargin = '-60px' } = {}) {
  const ref = useRef(null);
  const firedRef = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && firedRef.current) return;
            firedRef.current = true;
            if (animRef.current) animRef.current.pause();
            animRef.current = animationFn(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animRef.current) {
        animRef.current.pause();
        animRef.current = null;
      }
    };
  }, [animationFn, threshold, once, rootMargin]);

  return ref;
}

/**
 * useStaggerReveal — Convenience hook: stagger-reveals all children of the ref element.
 *
 * @param {object} options
 * @param {number} options.delay         - Stagger delay between items (default 80ms)
 * @param {number} options.duration      - Per-item duration (default 700ms)
 * @param {string} options.ease          - Easing string (default 'outExpo')
 * @param {number} options.translateY    - Start Y offset in px (default 30)
 * @param {string} options.childSelector - CSS selector for children (default ':scope > *')
 * @param {string} options.rootMargin    - IO rootMargin
 * @returns {React.RefObject}
 */
export function useStaggerReveal({
  delay = 80,
  duration = 700,
  ease = 'outExpo',
  translateY = 30,
  childSelector = ':scope > *',
  rootMargin = '-60px',
} = {}) {
  const ref = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    const children = el.querySelectorAll(childSelector);
    children.forEach((child) => {
      child.style.opacity = '0';
      child.style.transform = `translateY(${translateY}px)`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            animate(children, {
              opacity: [0, 1],
              translateY: [translateY, 0],
              duration,
              ease,
              delay: stagger(delay),
            });
          }
        });
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, ease, translateY, childSelector, rootMargin]);

  return ref;
}
