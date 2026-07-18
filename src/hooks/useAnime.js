/**
 * useAnime — lightweight wrapper around anime.js animate() and createTimeline()
 * Automatically cleans up animations when the component unmounts.
 */
import { useRef, useEffect, useCallback } from 'react';
import { animate, createTimeline } from 'animejs';

/**
 * Returns a stable `play` function that fires an anime.js animation
 * tied to a DOM ref. The animation is paused & removed on unmount.
 *
 * @param {object} animeParams  - Standard anime.js animate() params (target NOT included here)
 * @returns {{ ref, play }}
 */
export function useAnime(animeParams = {}) {
  const ref = useRef(null);
  const animRef = useRef(null);

  const play = useCallback((overrides = {}) => {
    if (!ref.current) return;
    if (animRef.current) {
      animRef.current.pause();
    }
    animRef.current = animate(ref.current, { ...animeParams, ...overrides });
    return animRef.current;
  }, [animeParams]);

  useEffect(() => {
    return () => {
      if (animRef.current) {
        animRef.current.pause();
        animRef.current = null;
      }
    };
  }, []);

  return { ref, play, animRef };
}

/**
 * Returns a stable `buildTimeline` function that creates an anime.js timeline.
 * Pauses on unmount.
 *
 * @returns {{ buildTimeline, timelineRef }}
 */
export function useTimeline() {
  const timelineRef = useRef(null);

  const buildTimeline = useCallback((params = {}) => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
    timelineRef.current = createTimeline(params);
    return timelineRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
        timelineRef.current = null;
      }
    };
  }, []);

  return { buildTimeline, timelineRef };
}
