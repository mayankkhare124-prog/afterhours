import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { ruleGroups } from '../data/rules.js';

export default function Rules() {
  const [openExtra, setOpenExtra] = useState(null);

  return (
    <section className="section rules" id="rules" aria-labelledby="rules-title">
      <div className="rules__intro">
        <SectionLabel number="05">Operating Constraints & Conduct</SectionLabel>
        <Reveal>
          <h2 id="rules-title">
            Rigorous parameters.
            <br />
            <em className="editorial-em">Uncompromised craft.</em>
          </h2>
        </Reveal>
        <p>
          Essential operational protocols remain visible at all times. Expand specific categories for granular guidance. Organizer-ratified governance applies at check-in.
        </p>
        <div className="rules__stamp">
          <ShieldCheck size={22} aria-hidden="true" />
          <span>
            RESPECT THE WORK.
            <br />
            RESPECT THE PEOPLE.
          </span>
        </div>
      </div>

      <div className="rules__list">
        {ruleGroups.map((group) => {
          const alwaysOpen = group.essential;
          const expanded = alwaysOpen || openExtra === group.id;
          return (
            <Reveal key={group.id}>
              <article className={`rule-block ${group.essential ? 'rule-block--essential' : ''}`}>
                {alwaysOpen ? (
                  <div className="rule-block__head">
                    <div>
                      <span className="rule-block__badge">Essential</span>
                      <h3>{group.title}</h3>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="rule-block__head"
                    aria-expanded={expanded}
                    onClick={() => setOpenExtra(expanded ? null : group.id)}
                  >
                    <div>
                      <h3>{group.title}</h3>
                    </div>
                    <ChevronDown
                      size={18}
                      className={expanded ? 'is-open' : ''}
                      aria-hidden="true"
                    />
                  </button>
                )}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.ul
                      className="rule-block__items"
                      initial={alwaysOpen ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </article>
            </Reveal>
          );
        })}
        <p className="rules__disclaimer">
          Draft guidelines only. Organizer-approved eligibility, IP, AI-tool, safety, and
          submission rules must replace this copy before publishing.
        </p>
      </div>
    </section>
  );
}
