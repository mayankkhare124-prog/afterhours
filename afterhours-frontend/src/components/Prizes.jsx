import React from 'react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { judgingCriteria } from '../data/event.js';
import { prizes, prizesConfirmed, specialAwards } from '../data/prizes.js';

export default function Prizes() {
  return (
    <section className="section prizes" id="prizes" aria-labelledby="prizes-title">
      <div className="prizes__heading">
        <div>
          <SectionLabel number="04">Recognition & Evaluation</SectionLabel>
          <Reveal variant="blur">
            <h2 id="prizes-title">
              Prove the build.
              <br />
              <em className="editorial-em">Earn the distinction.</em>
            </h2>
          </Reveal>
          <p>
            Evaluation rewards working software, architectural discipline, and lucid execution. Cash pool figures remain provisional pending organizer sign-off.
          </p>
        </div>
        <div className="prizes__seal" aria-hidden="true">
          <div className="prizes__seal-ring" />
          <div className="prizes__seal-ring prizes__seal-ring--2" />
          <div className="prizes__seal-core">AH</div>
          <span>CODE → DEMO</span>
        </div>
      </div>

      {!prizesConfirmed && (
        <p className="config-banner" role="status">
          Prize pool configuration placeholder — amounts marked TBA are not published facts.
        </p>
      )}

      <div className="prize-grid">
        {prizes.map((p, i) => (
          <Reveal key={p.place} delay={i * 0.07}>
            <article className={`prize-card prize-card--${i + 1}`}>
              <div className="prize-card__top">
                <span>{p.place}</span>
                <span>{p.label}</span>
              </div>
              <div className="prize-card__mark" aria-hidden="true">
                <div className="prize-card__crystal" />
              </div>
              <h3>{p.title}</h3>
              <strong>{p.reward}</strong>
              <p>{p.note}</p>
              <small>{p.eligibility}</small>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="special-awards">
        {specialAwards.map((a) => (
          <div key={a.id}>
            <h4>{a.title}</h4>
            <p>{a.detail}</p>
          </div>
        ))}
      </div>

      <div className="judging">
        <span className="micro-label">Judging criteria · subject to approval</span>
        <div className="judging__grid">
          {judgingCriteria.map((c) => (
            <div key={c.id}>
              <span>{c.number}</span>
              <b>{c.title}</b>
              <p>{c.detail}</p>
            </div>
          ))}
        </div>
        <p className="judging__strong">
          Strong look: name the problem, show the running core, admit what you cut, and let
          someone else click through without you narrating every step.
        </p>
      </div>
    </section>
  );
}
