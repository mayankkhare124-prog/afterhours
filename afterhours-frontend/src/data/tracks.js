/**
 * Proposed challenge tracks — swap for organizer-approved statements anytime.
 */

export const trackCategories = [
  { id: 'all', label: 'All tracks' },
  { id: 'ai', label: 'AI systems' },
  { id: 'devtools', label: 'Dev tools' },
  { id: 'access', label: 'Accessibility' },
  { id: 'planet', label: 'Sustainability' },
  { id: 'campus', label: 'Campus' },
];

export const tracks = [
  {
    id: 'ai-systems',
    category: 'ai',
    number: '01',
    title: 'Intelligent Systems',
    short: 'Useful beats flashy.',
    problem:
      'Students drown in tabs, notices, and half-answers. Smart tools often impress in demos and flop in real use.',
    statement:
      'Build an AI-assisted tool that helps someone find, learn, or decide faster — with a clear user and a clear win.',
    success:
      'A demo someone can try in under two minutes and feel the difference versus doing it by hand.',
    suggestions: [
      'Campus FAQ bot grounded in real notices',
      'Study helper that drills weak topics',
      'Meeting notes → action items in one click',
    ],
    constraints: [
      'Say what models/APIs you used in the README',
      'Don’t collect private data you don’t need',
    ],
    tags: ['AI / ML', 'Product'],
    accent: 'cyan',
    shape: 'orb',
  },
  {
    id: 'dev-tools',
    category: 'devtools',
    number: '02',
    title: 'Builder Tools',
    short: 'Kill the friction.',
    problem:
      'Setup hell, opaque errors, and broken handoffs burn hours before you even write features.',
    statement:
      'Ship a tool, library, or workflow that makes building, debugging, or collaborating noticeably less painful.',
    success:
      'A before/after story judges can feel in the demo — fewer steps, clearer feedback, faster start.',
    suggestions: [
      'Local API mock that matches your OpenAPI',
      'One-command project bootstrap for a common stack',
      'Error explainer for a library everyone fights',
    ],
    constraints: [
      'Must run in the demo environment',
      'Setup guide under five minutes',
    ],
    tags: ['DX', 'Open source'],
    accent: 'steel',
    shape: 'cube',
  },
  {
    id: 'access-design',
    category: 'access',
    number: '03',
    title: 'Digital Access',
    short: 'If they can’t use it, it isn’t done.',
    problem:
      'Too many campus apps assume one kind of device, vision, or bandwidth — everyone else gets locked out.',
    statement:
      'Prototype something that makes a real interface easier for people who usually get left behind.',
    success:
      'Show a specific barrier (keyboard, contrast, language, offline) and how your build shrinks it.',
    suggestions: [
      'Readable mode for dense PDFs / syllabi',
      'Keyboard-first campus navigator',
      'Captions / transcripts for club videos',
    ],
    constraints: [
      'Test keyboard-only where it applies',
      'Note your access choices in the write-up',
    ],
    tags: ['A11y', 'Inclusive'],
    accent: 'ice',
    shape: 'ring',
  },
  {
    id: 'sustainability',
    category: 'planet',
    number: '04',
    title: 'Sustainable Systems',
    short: 'Measure it. Then cut waste.',
    problem:
      'Hostels and labs waste energy and materials because nobody sees the pattern until it’s too late.',
    statement:
      'Build a tool that helps a campus group track, reduce, or share resources — waste, power, water, or gear.',
    success:
      'A clear action loop: see the problem → do something → see the change (even with sample data).',
    suggestions: [
      'Hostel waste sorter with local rules',
      'Lab equipment booking to cut idle machines',
      'Commute impact board with better options',
    ],
    constraints: [
      'Label mock data clearly',
      'No greenwashing without evidence',
    ],
    tags: ['Climate', 'Campus'],
    accent: 'teal',
    shape: 'hex',
  },
  {
    id: 'campus-community',
    category: 'campus',
    number: '05',
    title: 'Campus & Community',
    short: 'Fix a friction you live with.',
    problem:
      'Lost items, silent clubs, confusing forms — small campus gaps that eat time every week.',
    statement:
      'Build something that makes student life, clubs, or campus services less annoying for a real group of people.',
    success:
      'A first-year could complete the main flow without a walkthrough from you.',
    suggestions: [
      'Peer skill swap with simple trust cues',
      'Lost-and-found that people would actually use',
      'Event feed that surfaces what matters tonight',
    ],
    constraints: [
      'One sharp problem — not a mega-app',
      'First use should feel light',
    ],
    tags: ['Campus', 'Community'],
    accent: 'silver',
    shape: 'shard',
  },
];
