import React from 'react';
import useCountdown from '../hooks/useCountdown.js';
import { event } from '../data/event.js';

export default function Countdown() {
  const timer = useCountdown(event.startDate, event.datesConfirmed);

  if (timer.inactive) {
    return (
      <div className="countdown countdown--pending" aria-label="Countdown pending confirmation">
        <span className="countdown__pending">Dates awaiting confirmation</span>
      </div>
    );
  }

  if (timer.ended) {
    return (
      <div className="countdown" aria-label="Event countdown">
        <div className="countdown__live">
          <span className="countdown__dot" /> Event window open
        </div>
      </div>
    );
  }

  const units = [
    ['DAYS', timer.days],
    ['HRS', timer.hours],
    ['MIN', timer.minutes],
    ['SEC', timer.seconds],
  ];

  return (
    <div className="countdown" aria-label="Countdown to event start" aria-live="polite">
      {units.map(([label, value]) => (
        <div className="countdown__unit" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
