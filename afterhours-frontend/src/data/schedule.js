/**
 * Full 36-hour timeline using relative elapsed markers (H+XX).
 * Replace with absolute clock times only after organizers confirm them.
 */

export const schedulePhases = [
  { id: 'all', label: 'Full 36h' },
  { id: 'open', label: 'Opening' },
  { id: 'build', label: 'Build' },
  { id: 'ship', label: 'Ship & close' },
];

export const schedule = [
  {
    id: 'check-in',
    elapsed: 'H+00',
    phase: 'open',
    phaseLabel: 'ARRIVE',
    title: 'Doors open & orientation',
    detail: 'Show up, grab a spot, say hi. Get the packet before you open your laptop.',
  },
  {
    id: 'opening',
    elapsed: 'H+01',
    phase: 'open',
    phaseLabel: 'ALIGN',
    title: 'Opening & rules briefing',
    detail: 'Theme, tracks, rules, judging — so you’re not guessing what “done” means.',
  },
  {
    id: 'teams',
    elapsed: 'H+02',
    phase: 'open',
    phaseLabel: 'FORM',
    title: 'Team formation & problem framing',
    detail: 'Find people, pick a track, write the problem in one sentence you all agree on.',
  },
  {
    id: 'explore',
    elapsed: 'H+03',
    phase: 'build',
    phaseLabel: 'EXPLORE',
    title: 'Problem exploration',
    detail:
      'Interview assumptions, sketch the user journey, and define the smallest version that still proves the idea.',
  },
  {
    id: 'build-start',
    elapsed: 'H+05',
    phase: 'build',
    phaseLabel: 'BUILD',
    title: 'Deep build window',
    detail:
      'Prototype the core loop. Prefer a working path over a wide feature list. Mentoring availability TBA.',
  },
  {
    id: 'checkpoint-1',
    elapsed: 'H+12',
    phase: 'build',
    phaseLabel: 'CHECK',
    title: 'Progress checkpoint',
    detail:
      'Reality check: what works, what is blocked, and what to cut so the demo still lands.',
  },
  {
    id: 'midnight',
    elapsed: 'H+18',
    phase: 'build',
    phaseLabel: 'ITERATE',
    title: 'Mid-event review',
    detail:
      'Stabilize the architecture, tighten scope, and lock the story you will tell judges.',
  },
  {
    id: 'polish',
    elapsed: 'H+28',
    phase: 'build',
    phaseLabel: 'REFINE',
    title: 'Polish & demo prep',
    detail:
      'Harden the happy path, write the README, rehearse the narrative, and verify the project runs cleanly.',
  },
  {
    id: 'submit',
    elapsed: 'H+33',
    phase: 'ship',
    phaseLabel: 'SHIP',
    title: 'Submission deadline',
    detail:
      'Final links, repository, and materials must be submitted. Late submissions follow official policy (TBA).',
  },
  {
    id: 'demos',
    elapsed: 'H+34',
    phase: 'ship',
    phaseLabel: 'SHOW',
    title: 'Project demonstrations',
    detail:
      'Present the problem, the decisions, and the working prototype. Keep it clear and honest.',
  },
  {
    id: 'judging',
    elapsed: 'H+35',
    phase: 'ship',
    phaseLabel: 'JUDGE',
    title: 'Judging',
    detail:
      'Projects are evaluated against the published criteria. Format and panel details TBA.',
  },
  {
    id: 'closing',
    elapsed: 'H+36',
    phase: 'ship',
    phaseLabel: 'CLOSE',
    title: 'Awards & closing',
    detail:
      'Results, recognition, and closing remarks. Celebrate what got built under pressure.',
  },
];
