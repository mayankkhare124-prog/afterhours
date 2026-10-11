export const ruleGroups = [
  {
    id: 'eligibility',
    title: 'Eligibility',
    essential: true,
    items: [
      'Follow the official eligibility list published by GDG on Campus MITS.',
      'Team size is drafted as 1–4 participants — confirm before registering.',
      'Individuals may participate solo if allowed by the final rules.',
    ],
  },
  {
    id: 'originality',
    title: 'Originality & intellectual property',
    essential: true,
    items: [
      'Submit original work created during the event window, except for permitted libraries and clearly disclosed pre-existing assets.',
      'Credit open-source dependencies, APIs, datasets, and significant AI assistance.',
      'You retain rights to your project unless the official policy states otherwise.',
    ],
  },
  {
    id: 'tech',
    title: 'Permitted technologies',
    essential: false,
    items: [
      'Use any stack allowed by the organizers (web, mobile, AI tools, hardware integrations as applicable).',
      'Third-party services are fine when disclosed and within event policy.',
      'Do not ship secrets, scraped private data, or unsafe deployments.',
    ],
  },
  {
    id: 'submission',
    title: 'Submission format',
    essential: true,
    items: [
      'Provide a working demo path judges can follow.',
      'Include a repository, README, and concise problem/solution explanation.',
      'Meet the submission deadline — late policy TBA.',
    ],
  },
  {
    id: 'demo',
    title: 'Demo & presentation',
    essential: true,
    items: [
      'Be ready to demonstrate the core flow live or via a reliable recorded demo.',
      'Explain the problem, your approach, and what still needs work.',
      'Honesty beats theatre — show what actually runs.',
    ],
  },
  {
    id: 'conduct',
    title: 'Code of conduct & disqualification',
    essential: true,
    items: [
      'Treat mentors, organizers, and fellow participants with respect.',
      'Harassment, plagiarism, or sabotage can lead to disqualification under official policy.',
      'Organizers’ decisions on eligibility and conduct are final once published.',
    ],
  },
];
