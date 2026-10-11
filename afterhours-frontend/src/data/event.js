/**
 * Central event configuration.
 * Update dates, contact, registration URL, and venue here — nowhere else.
 *
 * Set `datesConfirmed: true` only after organizers finalize start/end times.
 * Set `registrationUrl` to the official form; leave empty while pending.
 */

export const event = {
  name: 'AFTERHOURS',
  organizer: 'GDG on Campus MITS',
  theme: 'Build beyond the obvious.',
  tagline: '36 HOURS. ONE DEADLINE. SOMETHING REAL.',
  description:
    'Thirty-six continuous hours of disciplined engineering and design at MITS. No pitch theatre, no slide decks without software. Arrive with raw capability, leave with a working product.',
  durationHours: 36,

  // Illustrative until organizers confirm. Keep datesConfirmed false until then.
  datesConfirmed: false,
  startDate: '2026-11-20T09:00:00+05:30',
  endDate: '2026-11-21T21:00:00+05:30',
  registrationDeadline: null,

  location: 'MITS, Gwalior',
  format: 'In-person sprint · Venue & schedule to be announced',
  email: '', // Set official email when available, e.g. 'gdg@mitsgwalior.in'
  teamMin: 1,
  teamMax: 4,

  // Official registration destination. Empty = pending / local demo only.
  registrationUrl: '',
  registrationUrlPending: true,

  social: {
    // Only include verified URLs. Omit or leave empty — do not use "#".
    instagram: '',
    github: '',
    linkedin: '',
    discord: '',
  },

  year: 2026,
};

export const navItems = [
  { label: 'Overview', id: 'about' },
  { label: 'Challenges', id: 'challenges' },
  { label: 'Schedule', id: 'schedule' },
  { label: 'Prizes', id: 'prizes' },
  { label: 'FAQ', id: 'faq' },
];

export const judgingCriteria = [
  {
    id: 'relevance',
    number: '01',
    title: 'Does it matter?',
    detail: 'Is the problem real, and does your build actually touch it?',
  },
  {
    id: 'technical',
    number: '02',
    title: 'Does it run?',
    detail: 'Working prototype beats vaporware. Show the core path live.',
  },
  {
    id: 'originality',
    number: '03',
    title: 'Is it yours?',
    detail: 'Fresh angle over a copy of last year’s winning idea.',
  },
  {
    id: 'usability',
    number: '04',
    title: 'Can someone use it?',
    detail: 'If a stranger needs a 10-minute tour, simplify.',
  },
  {
    id: 'presentation',
    number: '05',
    title: 'Can you explain it?',
    detail: 'Problem → choices → demo. Keep it honest and short.',
  },
];

export const submissionChecklist = [
  'Working demo of the core flow',
  'README with setup and run instructions',
  'Public repository link',
  'Short explanation of problem and solution',
  'Demo or presentation ready for judging',
];
