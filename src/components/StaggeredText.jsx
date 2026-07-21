import { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';

export function StaggeredText({ text, accentIndex, autoPlay = false }) {
  const lettersRef = useRef(null);

  const triggerStagger = () => {
    const el = lettersRef.current;
    if (!el) return;
    const letters = el.querySelectorAll('.stagger-char');
    animate(letters, {
      translateY: [0, -12, 0],
      scale: [1, 1.25, 1],
      color: [
        { value: 'var(--accent)', duration: 200 },
        { value: 'var(--text)', duration: 600 }
      ],
      delay: stagger(35),
      duration: 800,
      ease: 'easeOutElastic(1, .6)'
    });
  };

  useEffect(() => {
    if (!autoPlay) return;

    let intervalId;
    // Initial delay so loading animations complete first, then trigger every 5s
    const timeoutId = setTimeout(() => {
      triggerStagger();
      intervalId = setInterval(triggerStagger, 5000);
    }, 2800);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoPlay]);

  return (
    <span 
      ref={lettersRef} 
      onMouseEnter={triggerStagger} 
      style={{ display: 'inline-flex', cursor: 'default' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="stagger-char"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            color: i === accentIndex ? 'var(--accent)' : 'inherit',
            transition: 'color 0.25s',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
export default StaggeredText;
