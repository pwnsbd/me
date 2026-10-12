import { PROFILE } from './profile';
import type { Resume } from './types';

/* Everything the résumé page shows lives here. */
export const RESUME: Resume = {
  name: PROFILE.name,
  role: PROFILE.role,
  summary:
    'Product creator and hands-on software engineer, taking ideas from concept to shipped software across games, AR/VR, and local AI tools (Rasa, Words, Lingo, and RayForge, my Texas A&M MS Visualization thesis direction). Backed by nearly three years as a software engineer at Hewlett Packard Enterprise building automation, diagnostics, and internal tools.',
  contact: {
    github: PROFILE.github,
    linkedin: PROFILE.linkedin,
    email: PROFILE.email,
    phone: PROFILE.phone,
  },
  experience: [
    {
      title: 'Teaching Assistant',
      org: 'Texas A&M',
      place: 'College Station, TX',
      period: 'Aug 2025 — Present',
      bullets: [
        'Lead weekly Unreal Engine labs for ~60 students, taking them from introductory Blueprints to working gameplay systems and playable prototypes.',
        'Help students debug actors, components, events, and movement, and reason through implementation tradeoffs as they assemble complete features.',
        'Evaluate projects against functional requirements, with feedback on code quality, gameplay behavior, and completion (VIST 272, VIST 172).',
      ],
    },
    {
      title: 'System Software Engineer',
      org: 'Hewlett Packard Enterprise',
      place: 'San Jose, CA',
      period: 'Jul 2022 — Apr 2025',
      bullets: [
        'Built reusable Python/PyTest utilities adopted by 15 engineers, cutting repetitive test code by ~40%.',
        'Turned manually found defects into automated regression tests and wired them into Jenkins CI with structured logs and clearer assertions.',
        'Co-developed a consistency checker and diagnostic tools that turned raw machine output into readable data and metrics for faster troubleshooting.',
      ],
    },
    {
      title: 'Software Engineering Intern / Co-op',
      org: 'Hewlett Packard Enterprise',
      place: 'San Jose, CA',
      period: 'May 2021 — May 2022',
      bullets: [
        'Built a web interface replacing a manual command-line job-submission workflow, with Python, Django, Elasticsearch, MongoDB, and Celery.',
        'Adopted by 15–20 engineers, cutting job-submission time by ~40%; extended it to workload dispatch for test machines.',
        'Turned manual QA procedures into modular automation, shrinking a full day of verification to a few hours for a five-person team.',
      ],
    },
    {
      title: 'Software Engineer',
      org: 'Neighbor Marketing',
      place: 'Remote · New York',
      period: 'Apr 2020 — Jun 2020',
      bullets: [
        'Led front-end development of a Zillow-style rental marketplace prototype in React and JavaScript.',
        'Integrated Google Maps search and autocomplete, Firebase Authentication, and Mailchimp automated emails.',
        'Prototype was used in stakeholder and investor demos for a market of 250,000+ renters.',
      ],
    },
  ],
  projects: [
    {
      title: 'RayForge — VR Optics Laboratory',
      org: 'Unreal Engine · C++ · OpenXR · Meta Quest 3 · Thesis direction',
      period: '2026 — Present',
      bullets: [
        'Architected a reusable optics engine linking simulation, prescription-driven lens geometry, beam visualization, and per-eye see-through rendering.',
        'Implemented Snell’s law, Fresnel reflection/transmission, total internal reflection, and wavelength-dependent dispersion.',
        'Cut a measured Quest 3 see-through update from 7.6 ms to 2.9 ms (62%), backed by 100+ automated checks.',
      ],
    },
    {
      title: 'Rasa — Local-First AI Style Transfer',
      org: 'Electron · React · Python · PyTorch · SDXL · Released v0.2.0',
      period: 'Aug — Oct 2026',
      bullets: [
        'Windows app that transfers a reference image’s style onto a photo while preserving its structure, fully on local hardware.',
        'Integrated SDXL, IP-Adapter/InstantStyle, and ControlNet with segmentation and depth guidance to protect subjects and composition.',
        'Cut single-pass processing from 64 s to 15 s with GPU-memory-aware execution and caching; shipped a Windows installer.',
      ],
    },
    {
      title: 'Words — Private AI Journal',
      org: 'Electron · React · TypeScript · llama.cpp · Qwen · Released v0.2.0',
      period: '2026',
      bullets: [
        'Local-first journaling app that resurfaces related earlier passages and recurring patterns, with no cloud.',
        'Selected Qwen3.5-9B after comparing models; evaluated semantic matching on 78 labeled entries and tuned thresholds for reliable matches.',
        'Cut a feelings-extraction feature after it failed latency and reliability checks; shipped with an installer and public repo.',
      ],
    },
    {
      title: 'Dead’s Rights — Lead Engineer',
      org: 'Unreal Engine · C++ · Team of 4 engineers + artists',
      period: 'Spring 2026',
      bullets: [
        'Pitched a maze-on-a-sphere game and built its core gameplay loop and player mechanics in Unreal C++.',
        'Coordinated four engineers across UI, AI, abilities, and systems; contributed ~36% of commits.',
        'Playtested with ~40 students and cut abilities from five to four to ship within 13 weeks.',
      ],
    },
    {
      title: 'Lingo — VS Code Extension',
      org: 'TypeScript · Node.js · SQLite · MCP · VS Code Marketplace',
      period: 'Aug — Sep 2026',
      bullets: [
        'Extension that keeps a local glossary of the components, endpoints, and modules AI coding agents create.',
        'Connected an MCP server so agents record concepts; built glossary, hierarchy, and page-map views with rename history.',
        'Resolved SQLite runtime compatibility between the extension host and Node; released to the Marketplace.',
      ],
    },
    {
      title: 'AR Games — ScavengAR Hunt, Animal vs. Human, AR Frogger',
      org: 'Unity · Vuforia · AR Foundation',
      period: 'Fall 2025',
      bullets: [
        'Built three AR games: an object-scan scavenger hunt with a boss fight, card-tracked strategy battles, and marker-placed platforming.',
        'Implemented object and image tracking, spawning, proximity combat, progression, and camera-aimed jumping.',
        'Refined tracking, controls, and interaction clarity through classroom playtests.',
      ],
    },
    {
      title: 'Hackathons and Ventures',
      org: 'Team Lead',
      period: '2018 — 2022',
      bullets: [
        'Health Memo (Sanford Health Hack): voice-based iOS symptom logger — 2nd place and People’s Choice of ~20 teams, $9,000 in prizes.',
        'Pill Buddy (Sanford Health Hack): drug-interaction checker for 5,000+ elderly patients — 2nd of 12 teams.',
        'Yetu (Hult Prize): won Augustana’s university round and advanced to the 2019 Regional Summit in San Francisco.',
      ],
    },
  ],
  leadership: [
    {
      title: 'Officer',
      org: 'Visualization Graduate Student Association',
      place: 'Texas A&M',
      period: '2025 — Present',
      bullets: [
        'Support industry and alumni relations for the Visualization graduate community.',
      ],
    },
    {
      title: 'Conference Volunteer',
      org: 'ACM SIGGRAPH 2024',
      place: 'Denver, CO',
      period: 'Jul — Aug 2024',
      bullets: [
        'Supported conference operations, attendee guidance, and sessions and exhibits.',
        'Worked with organizers and volunteers to keep activities on schedule.',
        'Followed current work in graphics, interactive systems, games, and visualization.',
      ],
    },
    {
      title: 'Communication Director',
      org: 'Augustana Student Association',
      place: 'Sioux Falls, SD',
      period: 'Aug 2019 — May 2020',
      bullets: [
        'Led a six-person communications team for student government.',
        'Improved visibility and communication for 100+ student clubs and maintained the association website.',
        'Helped organize the 2019 student senate election.',
      ],
    },
  ],
  skills: [
    { label: 'Languages', items: 'Python, C++, TypeScript, JavaScript, Java, Swift' },
    { label: 'XR and games', items: 'Unreal Engine 5, Blueprints, Unity, OpenXR, Meta Quest, Vuforia, AR Foundation' },
    { label: 'Graphics and AI', items: 'Three.js, WebGL, shaders, PyTorch, OpenCV, SDXL, ControlNet, local LLMs and embeddings' },
    { label: 'Web and infra', items: 'React, Electron, Node.js, Django, FastAPI, SQLite, MongoDB, Elasticsearch, Docker, Jenkins, Git' },
  ],
  education: [
    {
      school: 'Texas A&M University',
      degree: 'MS, Visualization',
      place: 'College Station, TX',
      period: 'Expected May 2027',
    },
    {
      school: 'Augustana University',
      degree: 'BA, Computer Science & Data Science · Minor in Math',
      place: 'Sioux Falls, SD',
      period: 'May 2022',
      note: 'GPA 3.52 / 4.00',
    },
  ],
  certificates: [
    'DeepLearning.AI — Deep Learning Specialization: 5 courses incl. Convolutional Neural Networks and Sequence Models (2022–2023).',
    'CodePath — iOS Application Development (2020).',
    'Broadway — HTML, CSS, JavaScript (2016).',
  ],
};
