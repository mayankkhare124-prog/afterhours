import React, { lazy, Suspense } from 'react';
import { ArrowUpRight, Layers, ShieldCheck, Zap } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { event } from '../data/event.js';

const AccentScene = lazy(() => import('./AccentScene.jsx'));

const pillars = [
  {
    icon: Zap,
    title: 'Leave with something that runs',
    text: 'Skip the perfect pitch. In 36 hours you can prove the idea works — even if the edges are rough.',
  },
  {
    icon: Layers,
    title: 'Skip the safe answer',
    text: 'Theme: build beyond the obvious. If your first idea feels familiar, dig once more.',
  },
  {
    icon: ShieldCheck,
    title: 'Explain your choices',
    text: 'Judges care what you built and why. Trade-offs beat buzzwords.',
  },
];

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="about__visual">
        <div className="about__arch-frame">
          <img
            src="/editorial-lab.jpg"
            alt="Technical prototyping workshop with oscilloscope, circuitry blueprints, and mechanical keyboard under warm desk lamp"
            className="about__arch-img"
            loading="lazy"
          />
          <div className="about__arch-overlay" />
          <div className="about__arch-badge">
            <span>FIELD NOTE / 01</span>
            <b>TACTILE EXECUTION OVER THEORY</b>
          </div>
        </div>
        <div className="about__accent-container">
          <Suspense
            fallback={
              <div className="accent-scene accent-scene--css" aria-hidden="true">
                <div className="accent-scene__crystal" />
              </div>
            }
          >
            <AccentScene variant="about" />
          </Suspense>
        </div>
        <span className="about__coord" aria-hidden="true">
          FIG.01 · PROTOTYPE BENCH
        </span>
        <span className="about__index" aria-hidden="true">
          36H SPRINT · {event.year}
        </span>
      </div>

      <div className="about__copy">
        <Reveal variant="blur">
          <SectionLabel number="01">The Premise</SectionLabel>
          <h2 id="about-title">
            Ideas are cheap.
            <br />
            <em className="editorial-em">Building is different.</em>
          </h2>
          <p className="about__lead">
            Most hackathons devolve into storytelling contests with polished slides and phantom
            back-ends. AFTERHOURS is engineered as the counterweight: an uncompromised 36-hour sprint
            where only functioning software survives.
          </p>
          <p>
            You select a problem with genuine friction, assemble your crew, strip away feature bloat,
            and fight the clock until your build works end-to-end. No fabricated metrics. No hand-waving
            demos. Just raw capability proven in runtime.
          </p>
          <p>
            When time expires, you don’t leave with speculative pitch decks — you walk out with a demonstrable
            system, hardened instincts under real constraints, and teammates forged through 3 a.m. breakthroughs.
          </p>
        </Reveal>

        <ul className="about__pillars">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.05 * i} as="li">
              <span className="about__pillar-icon">
                <Icon size={16} aria-hidden="true" />
              </span>
              <span>
                <b>{title}</b>
                <small>{text}</small>
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.15}>
          <a className="text-link" href="#challenges">
            Explore the challenge tracks <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
