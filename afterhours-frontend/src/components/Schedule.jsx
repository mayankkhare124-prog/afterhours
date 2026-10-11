import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Plus, X } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { event } from '../data/event.js';
import { schedule, schedulePhases } from '../data/schedule.js';

function toIcsStamp(iso) {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

export default function Schedule() {
  const [phase, setPhase] = useState('all');
  const [expanded, setExpanded] = useState(0);

  const list = schedule.filter((item) => phase === 'all' || item.phase === phase);
  const calendarReady = event.datesConfirmed && event.startDate && event.endDate;

  const addCalendar = () => {
    if (!calendarReady) return;
    const start = toIcsStamp(event.startDate);
    const end = toIcsStamp(event.endDate);
    const stamp = toIcsStamp(new Date().toISOString());
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AFTERHOURS//Hackathon//EN',
      'BEGIN:VEVENT',
      `UID:afterhours-${start}@gdg-mits`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'SUMMARY:AFTERHOURS — 36-hour hackathon',
      `DESCRIPTION:36-hour hackathon by ${event.organizer}.`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'afterhours-event.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="section schedule" id="schedule" aria-labelledby="schedule-title">
      <div className="schedule__heading">
        <div>
          <SectionLabel number="03">The 36-Hour Cadence</SectionLabel>
          <Reveal>
            <h2 id="schedule-title">
              Every milestone
              <br />
              <em className="editorial-em">under the clock.</em>
            </h2>
          </Reveal>
          <p>
            Relative elapsed markers (H+XX) reflecting the build curve. Absolute clock hours will be locked upon final schedule announcement.
          </p>
        </div>
        <div className="schedule__aside">
          <span className="micro-label">Sprint Rhythm</span>
          <p>
            Arrive → Align → Frame → Deep Build → Checkpoints → Freeze → Public Demos. Zero dead air, no unstructured drift.
          </p>
          <button
            type="button"
            className="btn btn--outline"
            onClick={addCalendar}
            disabled={!calendarReady}
            title={calendarReady ? 'Download .ics' : 'Available when event dates are confirmed'}
          >
            <CalendarDays size={16} aria-hidden="true" />
            {calendarReady ? 'Add to calendar' : 'Calendar · dates pending'}
          </button>
        </div>
      </div>

      <div className="schedule__toolbar">
        <div className="phase-tabs" role="group" aria-label="Filter schedule by phase">
          {schedulePhases.map((p) => (
            <button
              key={p.id}
              type="button"
              className={phase === p.id ? 'is-active' : ''}
              onClick={() => {
                setPhase(p.id);
                setExpanded(0);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <span className="micro-label">Draft timeline · confirm official times</span>
      </div>

      <ol className="timeline">
        {list.map((item, i) => {
          const isOpen = expanded === i;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`timeline__item ${isOpen ? 'is-open' : ''}`}
                onClick={() => setExpanded(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <div className="timeline__axis" aria-hidden="true">
                  <span className="timeline__dot" />
                  <span className="timeline__stem" />
                </div>
                <div className="timeline__content">
                  <div className="timeline__meta">
                    <span>
                      {item.elapsed} <b>/ {item.phaseLabel}</b>
                    </span>
                    <time dateTime={item.elapsed}>{item.elapsed}</time>
                  </div>
                  <div className="timeline__main">
                    <h3>{item.title}</h3>
                    <span className="timeline__toggle" aria-hidden="true">
                      {isOpen ? <X size={15} /> : <Plus size={15} />}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        className="timeline__detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {item.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
