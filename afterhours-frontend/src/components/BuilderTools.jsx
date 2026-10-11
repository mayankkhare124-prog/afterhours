import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus, Send, X } from 'lucide-react';
import SectionLabel from './SectionLabel.jsx';
import { submissionChecklist } from '../data/event.js';
import { tracks } from '../data/tracks.js';

function Readiness() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  return (
    <div className="tool-panel">
      <button type="button" className="tool-panel__toggle" onClick={() => setOpen((v) => !v)}>
        <span>
          <span className="micro-label">Local checklist · session only</span>
          <b>
            Submission readiness{' '}
            <i>
              {checked.length}/{submissionChecklist.length}
            </i>
          </b>
        </span>
        <span className="tool-panel__bar" aria-hidden="true">
          <span style={{ width: `${(checked.length / submissionChecklist.length) * 100}%` }} />
        </span>
        {open ? <X size={17} /> : <Plus size={17} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="tool-panel__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {submissionChecklist.map((item, i) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={checked.includes(i)}
                  onChange={(e) =>
                    setChecked((old) =>
                      e.target.checked ? [...old, i] : old.filter((n) => n !== i),
                    )
                  }
                />
                <span>{item}</span>
              </label>
            ))}
            <p>Progress is not persisted across reloads. Demo UI only.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmissionDemo() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    project: '',
    track: tracks[0]?.id || '',
    repo: '',
    demo: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!data.project.trim() || !/^https?:\/\//i.test(data.repo) || !/^https?:\/\//i.test(data.demo)) {
      setError('Add a project name and valid http(s) repository and demo links.');
      return;
    }
    try {
      const old = JSON.parse(localStorage.getItem('afterhours-demo-submissions') || '[]');
      localStorage.setItem(
        'afterhours-demo-submissions',
        JSON.stringify([
          ...old,
          {
            project: data.project.trim(),
            track: data.track,
            repo: data.repo.trim(),
            demo: data.demo.trim(),
            createdAt: new Date().toISOString(),
            demoFlag: true,
          },
        ]),
      );
    } catch {
      setError('Could not write to localStorage in this browser.');
      return;
    }
    setMessage('Demo submission saved in this browser only. Not sent to organizers.');
  };

  return (
    <div className="tool-panel">
      <button type="button" className="tool-panel__toggle" onClick={() => setOpen((v) => !v)}>
        <span>
          <span className="micro-label">Optional MVP · local demo</span>
          <b>Preview submission flow</b>
        </span>
        {open ? <X size={18} /> : <ArrowUpRight size={18} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.form
            className="submission-form"
            onSubmit={submit}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <label>
              Project name
              <input
                value={data.project}
                onChange={(e) => setData({ ...data, project: e.target.value })}
              />
            </label>
            <label>
              Track
              <select
                value={data.track}
                onChange={(e) => setData({ ...data, track: e.target.value })}
              >
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Repository URL
              <input
                value={data.repo}
                onChange={(e) => setData({ ...data, repo: e.target.value })}
                placeholder="https://"
              />
            </label>
            <label>
              Demo URL
              <input
                value={data.demo}
                onChange={(e) => setData({ ...data, demo: e.target.value })}
                placeholder="https://"
              />
            </label>
            <button type="submit" className="btn btn--primary">
              Save local demo <Send size={15} aria-hidden="true" />
            </button>
            {error && (
              <p className="submission-message submission-message--error" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="submission-message" role="status">
                {message}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BuilderTools() {
  return (
    <section className="section extras" aria-labelledby="extras-title">
      <div className="extras__head">
        <SectionLabel number="08">Builder Pre-Flight Tools</SectionLabel>
        <h2 id="extras-title">
          Pre-flight verification
          <br />
          <em className="editorial-em">before the freeze.</em>
        </h2>
      </div>
      <div className="extras__grid">
        <Readiness />
        <SubmissionDemo />
      </div>
    </section>
  );
}
