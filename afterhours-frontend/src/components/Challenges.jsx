import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Copy, Search, X } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionLabel from './SectionLabel.jsx';
import { trackCategories, tracks } from '../data/tracks.js';

function TrackShape({ shape }) {
  return (
    <div className={`track-shape track-shape--${shape}`} aria-hidden="true">
      <span />
      <i />
      <b />
    </div>
  );
}

function challengeHash(id) {
  return `challenge-${id}`;
}

export default function Challenges() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  const selected = tracks.find((t) => t.id === selectedId) || null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tracks.filter((t) => {
      const catOk = category === 'all' || t.category === category;
      if (!catOk) return false;
      if (!q) return true;
      const hay = [t.title, t.short, t.problem, t.statement, t.tags.join(' ')].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('challenge-')) {
        const id = hash.replace('challenge-', '');
        if (tracks.some((t) => t.id === id)) {
          setSelectedId(id);
          document.getElementById('challenges')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const openDetail = (track) => {
    setSelectedId(track.id);
    history.replaceState(null, '', `#${challengeHash(track.id)}`);
  };

  const closeDetail = () => {
    setSelectedId(null);
    if (window.location.hash.startsWith('#challenge-')) {
      history.replaceState(null, '', '#challenges');
    }
  };

  const share = async (track) => {
    const url = `${window.location.origin}${window.location.pathname}#${challengeHash(track.id)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy challenge link:', url);
    }
    history.replaceState(null, '', `#${challengeHash(track.id)}`);
  };

  const resetFilters = () => {
    setCategory('all');
    setQuery('');
  };

  return (
    <section className="section challenges" id="challenges" aria-labelledby="challenges-title">
      <div className="section-head">
        <div>
          <SectionLabel number="02">Problem Territories</SectionLabel>
          <Reveal variant="blur">
            <h2 id="challenges-title">
              Five arenas.
              <br />
              <em className="editorial-em">Zero trivial briefs.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal className="section-head__intro">
          <p>
            Curated challenge tracks designed to test system design, execution speed, and practical
            utility. Choose an arena, interrogate the constraints, and ship software that matters.
          </p>
        </Reveal>
      </div>

      <div className="challenge-toolbar">
        <div className="challenge-search">
          <Search size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="challenge-search">
            Search challenges
          </label>
          <input
            id="challenge-search"
            type="search"
            placeholder="Search titles, problems, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="challenge-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="challenge-filters" role="group" aria-label="Filter by category">
          {trackCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={category === c.id ? 'is-active' : ''}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="challenge-empty" role="status">
          <p>No challenges match that search.</p>
          <button type="button" className="btn btn--ghost" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className={`challenge-grid challenge-grid--${Math.min(filtered.length, 3)}`}>
          {filtered.map((track, index) => (
            <Reveal key={track.id} delay={index * 0.05}>
              <article
                className={`challenge-card challenge-card--${track.accent} challenge-card--layout-${index % 3}`}
                id={challengeHash(track.id)}
              >
                <button
                  type="button"
                  className="challenge-card__hit"
                  onClick={() => openDetail(track)}
                  aria-label={`Open ${track.title} details`}
                >
                  <div className="challenge-card__visual">
                    <TrackShape shape={track.shape} />
                    <span className="challenge-card__num">{track.number}</span>
                    <span className="challenge-card__open">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="challenge-card__body">
                    <div className="challenge-card__tags">
                      {track.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <h3>{track.title}</h3>
                    <p>{track.short}</p>
                    <span className="challenge-card__cta">
                      Open brief <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <p className="challenge-note">
        Suggested directions inside each brief are examples only — not required solutions.
      </p>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="challenge-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeDetail();
            }}
          >
            <motion.div
              ref={dialogRef}
              className="challenge-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="challenge-dialog-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="challenge-dialog__top">
                <span className="micro-label">Track {selected.number} · Proposed</span>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="icon-btn"
                  onClick={closeDetail}
                  aria-label="Close challenge details"
                >
                  <X size={18} />
                </button>
              </div>
              <h3 id="challenge-dialog-title">{selected.title}</h3>
              <p className="challenge-dialog__short">{selected.short}</p>

              <div className="challenge-dialog__grid">
                <div>
                  <h4>Real-world problem</h4>
                  <p>{selected.problem}</p>
                </div>
                <div>
                  <h4>Challenge statement</h4>
                  <p>{selected.statement}</p>
                </div>
                <div>
                  <h4>Success looks like</h4>
                  <p>{selected.success}</p>
                </div>
                <div>
                  <h4>Suggested directions</h4>
                  <ul>
                    {selected.suggestions.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {selected.constraints?.length > 0 && (
                <div className="challenge-dialog__constraints">
                  <h4>Constraints</h4>
                  <ul>
                    {selected.constraints.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="challenge-dialog__actions">
                <button type="button" className="btn btn--ghost" onClick={() => share(selected)}>
                  <Copy size={15} aria-hidden="true" />
                  {copied ? 'Link copied' : 'Copy challenge link'}
                </button>
                <button type="button" className="btn btn--primary" onClick={closeDetail}>
                  Back to tracks
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
