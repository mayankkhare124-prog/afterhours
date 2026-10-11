import React, { useEffect, useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { event, navItems } from '../data/event.js';
import useActiveSection from '../hooks/useActiveSection.js';

const SECTION_IDS = ['home', ...navItems.map((n) => n.id), 'register', 'contact'];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
  if (history.replaceState) {
    history.replaceState(null, '', `#${id}`);
  }
}

export default function Header({ onRegister }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const sectionIds = useMemo(() => SECTION_IDS, []);
  const active = useActiveSection(sectionIds, 110);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => scrollToId(hash.startsWith('challenge-') ? 'challenges' : hash));
    }
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="wordmark" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} aria-label="AFTERHOURS home">
        <span className="wordmark__after">AFTER</span>
        <span className="wordmark__hours">HOURS</span>
        <span className="wordmark__mark">36</span>
      </a>

      <span className="header__divider" aria-hidden="true" />
      <span className="header__org">{event.organizer}</span>

      <nav className="desktop-nav" aria-label="Main">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={active === item.id ? 'is-active' : ''}
            onClick={() => go(item.id)}
            aria-current={active === item.id ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button type="button" className="header-cta" onClick={onRegister}>
        Register <ArrowUpRight size={15} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => go(item.id)}>
                {item.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            ))}
            <button
              type="button"
              className="mobile-nav__cta"
              onClick={() => {
                setOpen(false);
                onRegister();
              }}
            >
              Register <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
