import React, { lazy, Suspense, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, ShieldCheck, X } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import MagneticButton from './MagneticButton.jsx';
import { event } from '../data/event.js';
import { tracks } from '../data/tracks.js';

const AccentScene = lazy(() => import('./AccentScene.jsx'));

function RegistrationModal({ open, onClose }) {
  const titleId = useId();
  const [form, setForm] = useState({
    teamName: '',
    leader: '',
    email: '',
    members: '2',
    track: tracks[0]?.id || '',
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form'); // form | review | saved
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep('form');
      setErrors({});
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const update = (e) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.teamName.trim()) e.teamName = 'Enter a team name.';
    if (!form.leader.trim()) e.leader = 'Enter the team lead name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    const n = Number(form.members);
    if (n < event.teamMin || n > event.teamMax) {
      e.members = `Choose ${event.teamMin}–${event.teamMax} members.`;
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const saveLocalDemo = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const ref = `AH-DEMO-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    // Only non-sensitive demo fields. Not a real registration.
    const entry = {
      teamName: form.teamName.trim(),
      track: form.track,
      members: form.members,
      reference: ref,
      createdAt: new Date().toISOString(),
      demo: true,
    };
    try {
      const old = JSON.parse(localStorage.getItem('afterhours-demo-registrations') || '[]');
      localStorage.setItem('afterhours-demo-registrations', JSON.stringify([...old, entry]));
    } catch {
      /* ignore quota errors */
    }
    setReference(ref);
    setLoading(false);
    setStep('saved');
  };

  const selectedTrack = tracks.find((t) => t.id === form.track)?.title;
  const hasOfficial = Boolean(event.registrationUrl && !event.registrationUrlPending);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="registration-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="modal-top">
              <div>
                <span className="micro-label">Registration</span>
                <h2 id={titleId}>
                  {step === 'saved'
                    ? 'Local demo saved'
                    : step === 'review'
                      ? 'Review demo entry'
                      : 'Join AFTERHOURS'}
                </h2>
              </div>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {hasOfficial ? (
              <div className="register-official">
                <p>
                  Official registration is handled externally. You will leave this site to complete
                  the organizer form.
                </p>
                <a
                  className="btn btn--primary"
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open official registration <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            ) : (
              <>
                <p className="config-banner">
                  Official registration link pending. The form below is a <strong>local UI demo</strong>{' '}
                  only — it does not register you with organizers.
                </p>

                {step === 'saved' ? (
                  <div className="success-state">
                    <span className="micro-label">Demo only · browser localStorage</span>
                    <h3>Prototype entry recorded locally</h3>
                    <p>
                      Reference <b>{reference}</b> was saved in this browser. No email was sent.
                      No shared database was updated. This is not real registration.
                    </p>
                    <button type="button" className="btn btn--primary" onClick={onClose}>
                      Back to AFTERHOURS
                    </button>
                  </div>
                ) : step === 'review' ? (
                  <div className="review-state">
                    <dl>
                      <div>
                        <dt>Team</dt>
                        <dd>{form.teamName}</dd>
                      </div>
                      <div>
                        <dt>Lead</dt>
                        <dd>{form.leader}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{form.email}</dd>
                      </div>
                      <div>
                        <dt>Size</dt>
                        <dd>{form.members}</dd>
                      </div>
                      <div>
                        <dt>Track</dt>
                        <dd>{selectedTrack}</dd>
                      </div>
                    </dl>
                    <form onSubmit={saveLocalDemo}>
                      <div className="modal-actions">
                        <button type="button" className="btn btn--ghost" onClick={() => setStep('form')}>
                          Edit
                        </button>
                        <button type="submit" className="btn btn--primary" disabled={loading}>
                          {loading ? 'Saving…' : 'Save local demo'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <form
                    className="registration-form"
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (validate()) setStep('review');
                    }}
                  >
                    <label>
                      Team name
                      <input
                        name="teamName"
                        value={form.teamName}
                        onChange={update}
                        aria-invalid={!!errors.teamName}
                      />
                      {errors.teamName && <small className="field-error">{errors.teamName}</small>}
                    </label>
                    <label>
                      Team lead
                      <input
                        name="leader"
                        value={form.leader}
                        onChange={update}
                        aria-invalid={!!errors.leader}
                      />
                      {errors.leader && <small className="field-error">{errors.leader}</small>}
                    </label>
                    <label>
                      Contact email
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={update}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <small className="field-error">{errors.email}</small>}
                    </label>
                    <div className="form-row">
                      <label>
                        Team size
                        <select name="members" value={form.members} onChange={update}>
                          {Array.from(
                            { length: event.teamMax - event.teamMin + 1 },
                            (_, i) => event.teamMin + i,
                          ).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                        {errors.members && <small className="field-error">{errors.members}</small>}
                      </label>
                      <label>
                        Preferred track
                        <select name="track" value={form.track} onChange={update}>
                          {tracks.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="demo-disclaimer">
                      <ShieldCheck size={16} aria-hidden="true" />
                      <span>
                        Demo only. Email is used for UI validation in this prototype and is not
                        transmitted. Local save stores team name, size, track, and a demo reference —
                        not a password or payment data.
                      </span>
                    </div>
                    <button type="submit" className="btn btn--primary modal-submit">
                      Review demo entry <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function RegisterSection({ onOpenModal }) {
  const hasOfficial = Boolean(event.registrationUrl && !event.registrationUrlPending);
  const deadline = event.registrationDeadline
    ? new Date(event.registrationDeadline).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'TBA';

  return (
    <section className="section register" id="register" aria-labelledby="register-title">
      <div className="register__art">
        <Suspense fallback={<div className="accent-scene accent-scene--css" aria-hidden="true" />}>
          <AccentScene variant="register" />
        </Suspense>
      </div>
      <div className="register__copy">
        <SectionLabel number="07">Candidate Entry</SectionLabel>
        <Reveal variant="blur">
          <h2 id="register-title">
            Secure your place
            <br />
            <em className="editorial-em">before the roster locks.</em>
          </h2>
          <p>
            Participation is selective and cohort capacity is finite. Ensure your team composition ({event.teamMin}–{event.teamMax} builders) meets eligibility criteria before enrolling.
          </p>
          <ul className="register__facts">
            <li>
              <b>Cohort</b>
              <span>
                Standard technical team size: {event.teamMin}–{event.teamMax} members. Individual entrants allowed per official regulations.
              </span>
            </li>
            <li>
              <b>Deadline</b>
              <span>{deadline}</span>
            </li>
            <li>
              <b>Access</b>
              <span>
                {hasOfficial
                  ? 'Official organizer entry form (external link)'
                  : 'Official portal link pending publication — test local verification walkthrough below'}
              </span>
            </li>
          </ul>
          {hasOfficial ? (
            <MagneticButton
              className="btn btn--primary"
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Official Registration <ExternalLink size={16} aria-hidden="true" />
            </MagneticButton>
          ) : (
            <MagneticButton className="btn btn--primary" onClick={onOpenModal}>
              Launch Entry Verification Demo <ArrowUpRight size={16} aria-hidden="true" />
            </MagneticButton>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default RegistrationModal;
