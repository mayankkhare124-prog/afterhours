import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { event, navItems } from '../data/event.js';

function SocialLink({ href, label }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label} <ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}

export default function Footer({ onRegister }) {
  const socialEntries = [
    ['Instagram', event.social.instagram],
    ['GitHub', event.social.github],
    ['LinkedIn', event.social.linkedin],
    ['Discord', event.social.discord],
  ].filter(([, href]) => Boolean(href));

  const hasOfficial = Boolean(event.registrationUrl && !event.registrationUrlPending);

  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <div className="footer__brand">
          <a className="wordmark" href="#home">
            <span className="wordmark__after">AFTER</span>
            <span className="wordmark__hours">HOURS</span>
            <span className="wordmark__mark">36</span>
          </a>
          <h2>
            36 hours. One deadline.
            <br />
            <em className="editorial-em">Something real.</em>
          </h2>
          {hasOfficial ? (
            <a className="btn btn--primary" href={event.registrationUrl} target="_blank" rel="noreferrer">
              Official registration <ExternalLink size={16} aria-hidden="true" />
            </a>
          ) : (
            <button type="button" className="btn btn--primary" onClick={onRegister}>
              Launch Entry Demo <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="footer__links">
          <div>
            <span className="micro-label">Explore</span>
            {navItems.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
            <a href="#rules">Rules</a>
            <a href="#register">Register</a>
          </div>
          <div>
            <span className="micro-label">Contact</span>
            {event.email ? (
              <a href={`mailto:${event.email}`}>
                {event.email} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : (
              <span className="footer__pending">Official email pending configuration</span>
            )}
            <span className="footer__pending">{event.location}</span>
            <span className="footer__pending">{event.format}</span>
            {socialEntries.length > 0 ? (
              socialEntries.map(([label, href]) => (
                <SocialLink key={label} href={href} label={label} />
              ))
            ) : (
              <span className="footer__pending">
                Social links omitted until official accounts are provided.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {event.year} AFTERHOURS · {event.organizer}</span>
        <span>Concept site for recruitment walkthrough</span>
        <a href="#home">Back to top</a>
      </div>
      <p className="footer__disclaimer">
        Concept website for GDG on Campus MITS. Dates, prizes, eligibility, schedule clock times,
        registration URL, and contact channels are configurable placeholders until organizers confirm them.
      </p>
    </footer>
  );
}
