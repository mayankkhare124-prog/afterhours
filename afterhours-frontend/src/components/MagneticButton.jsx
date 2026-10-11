import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  href,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  const Tag = href ? motion.a : motion.button;
  const props = href
    ? { href, ...rest }
    : { type, onClick, ...rest };

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      {...props}
    >
      {children}
    </Tag>
  );
}
