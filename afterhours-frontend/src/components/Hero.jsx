import React, { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { event } from '../data/event.js';
import Countdown from './Countdown.jsx';
import MagneticButton from './MagneticButton.jsx';
import SceneFallback from './SceneFallback.jsx';

const Scene3D = lazy(() => import('./Scene3D.jsx'));

function formatDate(iso) {
  if (!iso) return 'TBA';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const line = {
  hidden: { opacity: 0, y: 35 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero({ onExplore, onSchedule }) {
  const reduce = useReducedMotion();
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__atmosphere" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__wash" />
        <div className="hero__noise" />
      </div>

      {/* Left Column: Oversized Editorial Typography & Concise Narrative */}
      <div className="hero__copy">
        <motion.p
          className="hero__eyebrow"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <span className="hero__pulse" />
          <span>[</span> {event.organizer.toUpperCase()} · FIELD SPEC 2026 <span>]</span>
        </motion.p>

        <motion.p
          className="hero__brand"
          initial={reduce ? false : { opacity: 0, y: 24, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          AFTERHOURS
        </motion.p>

        <h1 id="hero-title" className="hero__title">
          <motion.span
            custom={0}
            variants={line}
            initial={reduce ? false : 'hidden'}
            animate="show"
          >
            36 HOURS.
          </motion.span>
          <br />
          <motion.span
            custom={1}
            variants={line}
            initial={reduce ? false : 'hidden'}
            animate="show"
          >
            ONE DEADLINE.
          </motion.span>
          <br />
          <motion.span
            className="editorial-em"
            custom={2}
            variants={line}
            initial={reduce ? false : 'hidden'}
            animate="show"
          >
            Something real.
          </motion.span>
        </h1>

        <motion.p
          className="hero__desc"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          Thirty-six hours to turn a difficult problem into something that actually works.
          Find your crew, build under pressure, and ship a demonstrable solution.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <MagneticButton className="btn btn--primary" onClick={onExplore}>
            Explore Challenges <ArrowUpRight size={17} aria-hidden="true" />
          </MagneticButton>
          <MagneticButton className="btn btn--ghost" onClick={onSchedule}>
            View Schedule <ArrowDownRight size={17} aria-hidden="true" />
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero__meta"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <div className="hero__meta-item">
            <CalendarDays size={18} aria-hidden="true" />
            <span>
              <b>
                {event.datesConfirmed
                  ? `${formatDate(event.startDate)} — ${formatDate(event.endDate)}`
                  : 'Dates pending announcement'}
              </b>
              <small>
                {event.location} · {event.format}
              </small>
            </span>
          </div>
          <div className="hero__meta-item">
            <Clock3 size={18} aria-hidden="true" />
            <span>
              <b>{event.durationHours} hours unbroken</b>
              <small>Brief: {event.theme}</small>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Interactive 3D AFTERHOURS Core Monolith */}
      <motion.div
        className="hero__monolith-stage"
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero__3d-container">
          <Suspense fallback={<SceneFallback rich />}>
            <Scene3D onInteractionChange={setIsInteracting} />
          </Suspense>
        </div>

        {/* Minimal Monospace Technical Spec Annotations */}
        <div className="hero__stage-spec hero__stage-spec--top">
          <span className="spec-indicator" data-active={isInteracting} />
          <span>CORE // SCULPTURAL MONOLITH</span>
        </div>

        <div className="hero__stage-spec hero__stage-spec--bottom">
          <span>SIGNAL ORBITAL // ACTIVE</span>
          <span className="spec-coords">36.00H RUNTIME</span>
        </div>
      </motion.div>

      {/* Bottom Bar: Stats, Scroll Cue, Countdown */}
      <div className="hero__bottom">
        <div className="hero__stats">
          {[
            ['36', 'Hours Continuous'],
            ['05', 'Problem Arenas'],
            ['1–4', 'Builders Per Team'],
          ].map(([n, l], i) => (
            <motion.div
              key={l}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.08 }}
            >
              <strong>{n}</strong>
              <span>{l}</span>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          className="scroll-cue"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to premise section"
        >
          <span aria-hidden="true">
            <ArrowDown size={16} />
          </span>
          Scroll
        </button>

        <div className="hero__countdown">
          <span className="micro-label">Status indicator</span>
          <Countdown />
        </div>
      </div>
    </section>
  );
}
