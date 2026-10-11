import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  up: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  once = true,
  as = 'div',
  variant = 'up',
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const v = variants[variant] || variants.up;

  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={v}
      transition={{ duration: reduce ? 0 : 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
