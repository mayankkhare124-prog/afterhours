import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { faqs } from '../data/faq.js';
import { event } from '../data/event.js';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="faq__intro">
        <SectionLabel number="06">Inquiries & Clarifications</SectionLabel>
        <Reveal>
          <h2 id="faq-title">
            Essential facts.
            <br />
            <em className="editorial-em">Before you commit.</em>
          </h2>
        </Reveal>
        <p>
          Verified details only. Unannounced logistical policies are explicitly tagged pending announcement so you know what is confirmed versus evolving.
        </p>
        {event.email ? (
          <a className="text-link" href={`mailto:${event.email}`}>
            Email organizers
          </a>
        ) : (
          <p className="faq__pending">Official contact email pending configuration.</p>
        )}
      </div>

      <div className="faq__list">
        {faqs.map((faq, i) => {
          const panelId = `${baseId}-panel-${i}`;
          const btnId = `${baseId}-btn-${i}`;
          const isOpen = open === i;
          return (
            <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={faq.q}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>
                    <i aria-hidden="true">{String(i + 1).padStart(2, '0')}</i>
                    {faq.q}
                  </span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? <X size={15} /> : <Plus size={15} />}
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="faq__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
