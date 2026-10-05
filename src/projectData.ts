import type { ProjectInfo } from './ProjectModal';
import type { SketchKind } from './ProjectSketches';

/* which shelf a project sits on */
export type ProjectGroup = 'now' | 'proud' | 'more';

export interface Project extends ProjectInfo {
  group: ProjectGroup;
  sketch: SketchKind;
  /** faint word stamped across the window */
  stamp: string;
}

export const GROUPS: { id: ProjectGroup; label: string; note: string }[] = [
  { id: 'now',   label: 'on the desk',   note: 'what i’m building right now' },
  { id: 'proud', label: 'finished',      note: 'shipped & proud of' },
  { id: 'more',  label: 'odds & ends',   note: 'smaller builds & class work' },
];

/* `github` is only set for public repos — private ones stay unlinked */
export const PROJECTS: Project[] = [
  /* ── on the desk ── */
  {
    group: 'now', sketch: 'journal', stamp: 'in progress',
    title: 'Words',
    url: '~/words · desktop',
    tag: 'journal · desktop app',
    description:
      'A private, local-first journal that remembers what you wrote. After each entry it quietly surfaces earlier passages that echo the same thought — even years apart, even in different words — so you notice when you’re thinking it again. Weekly, monthly and yearly letters gather what you wrote into something you can reread.',
    problem:
      'Journals are write-only. You pour months of thinking into them and never look back, so the same worries and ideas loop without you noticing. AI writing tools that could help are generic assistants bolted onto a doc — and they ship your most private writing to a server.',
    vision:
      'A mirror, not a coach. Peaceful rather than engaging: no streaks, no badges, no cloud. Words should feel like someone who has read your journal for years and gently says “you wrote something like this in March.” Everything — writing, models, memory — stays on your machine.',
    stack: 'Electron · React · TypeScript · llama.cpp · Llama 3.1 8B · Qwen3 embeddings',
    status: 'Preparing v0.2.0 release',
  },
  {
    group: 'now', sketch: 'palette', stamp: 'in progress',
    title: 'Rasa',
    url: '~/rasa · desktop',
    tag: 'image style · desktop app',
    description:
      'Pull the visual style out of a reference image — its light, palette, texture and mood, saved as an “Essence” — and reapply it to your own photos. Everything runs locally on your GPU through a Python sidecar; nothing leaves 127.0.0.1.',
    problem:
      'Getting a photo to “feel like that one” means either hours of manual grading or uploading your pictures to a cloud filter that flattens everything into the same look. Presets copy numbers, not mood.',
    vision:
      'A personal library of Essences you collect the way you collect reference images, applied in one click and fully offline. The current push is a Windows release that a non-developer can install and use end-to-end: extract, apply, export.',
    stack: 'Electron · React · Vite · TypeScript · FastAPI · PyTorch (CUDA)',
    status: 'Windows release candidate',
    github: 'https://github.com/pwnsbd/rasa',
  },
  {
    group: 'now', sketch: 'lens', stamp: 'in progress',
    title: 'RayForge',
    url: 'unreal 5.8 · VR',
    tag: 'optics · VR sim',
    description:
      'A VR optics bench in Unreal Engine. Pick up lenses, mirrors and lights and watch real rays bend, focus and disperse around you. Every lens is data — a prescription and a glass catalog — traced by a single tested C++ optics core.',
    problem:
      'Optics is taught with flat diagrams and idealised thin lenses, and most 3D “optics” demos fake the physics in shaders. Once the visuals and the maths drift apart you can’t trust what you see.',
    vision:
      'Each optical law written exactly once, validated against analytic or catalog values before it appears in a scene, and everything you see in the headset driven by that one core. A lab bench you can step into, where the picture is never lying to you.',
    stack: 'Unreal Engine 5.8 · C++ · HLSL · Python editor scripting',
    status: 'Active — 86/86 headless optics tests green',
  },
  {
    group: 'now', sketch: 'graph', stamp: 'in progress',
    title: 'Buddhi',
    url: '~/buddhi · MCP',
    tag: 'AI tooling · local server',
    description:
      'A persistent layer between Claude and my computer, as one local MCP server. It reads and drives apps through the OS accessibility tree instead of screenshots, keeps a living index of the filesystem, and adds meaning-based search over it with local embeddings.',
    problem:
      'AI agents see a computer as pixels. They click by guessing coordinates on screenshots, re-walk the whole disk for every question, and can’t find “the drone footage from Nepal” unless you remember the folder name.',
    vision:
      'An agent that knows the machine it lives on — exact controls, a current map of every folder, and search by meaning — without any file content leaving the computer. Retrieval, not training.',
    stack: 'Python · MCP · Windows UI Automation · SQLite · sentence embeddings',
    status: 'Active development',
  },
  {
    group: 'now', sketch: 'gallery', stamp: 'in progress',
    title: 'MemoryRoom',
    url: 'quest · VR',
    tag: 'photos · VR app',
    description:
      'A quiet VR meadow for your photos. Pull pictures from your phone’s library, hang them in the space around you, and step inside full 360° panoramas with a trigger press. Placements are saved so the room is still arranged the next time you come back.',
    problem:
      'Our photo libraries hold thousands of memories that we only ever see as a scroll of thumbnails. Panoramas especially lose everything when they’re squashed onto a flat screen.',
    vision:
      'A place you visit, not a feed you scroll — a calm room of memories you arrange yourself, with themes and spaces that suit the photos inside them.',
    stack: 'Unreal Engine · C++ · Android / Meta Quest',
    status: 'Active development',
    github: 'https://github.com/pwnsbd/MemoryRoom',
  },

  /* ── finished ── */
  {
    group: 'proud', sketch: 'book', stamp: 'shipped',
    title: 'Spotlight',
    url: 'spotlight.pwnsbd.me',
    tag: 'reading · chrome ext + web',
    description:
      'A highlighter for the web and a reading room for what you highlight. The Spotlight Marker Chrome extension saves passages locally; the Spotlight site lights up a random one on an open book page and lets you file the rest into folders. Optional sign-in backs highlights up.',
    problem:
      'Highlights you make while reading online disappear into tabs you closed and services you forgot about. Saving is easy; coming back to what struck you is not.',
    vision:
      'Your highlights resurfacing gently, one at a time, like opening a well-read book to a random page. Fully usable with no account and no server — the extension’s local storage is the source of truth.',
    stack: 'Chrome Extensions API · vanilla JS · Supabase (optional sync) · Vercel',
    status: 'Live',
    link: 'https://spotlight.pwnsbd.me',
  },
  {
    group: 'proud', sketch: 'dictionary', stamp: 'shipped',
    title: 'Lingo',
    url: 'vs code · extension',
    tag: 'dev tools · VS Code ext',
    description:
      'A shared dictionary between you and your coding agent. As Claude Code creates and renames things, it records each named piece of the project through an MCP server, and Lingo shows that record in a VS Code sidebar so you can ask for changes using the exact names.',
    problem:
      'As a project grows you forget what everything is called, so you describe it vaguely — “that box on the left” — and the agent guesses. Both sides are guessing, and every miss costs a round trip.',
    vision:
      'Precise pointing in plain words. Lingo adapts its vocabulary to the project — website, backend, game, CLI — and never scans or edits code; it only remembers what the agent tells it.',
    stack: 'TypeScript · VS Code Extension API · MCP',
    status: 'v0.2.0',
    github: 'https://github.com/All3glory/lingo',
  },
  {
    group: 'proud', sketch: 'orbits', stamp: 'shipped',
    title: 'Nakshatra',
    url: 'nakshatra · web',
    tag: '3D · web app',
    description:
      'A cinematic 2.5D celestial birth atlas. It opens on the live solar system, then rewinds through time to the exact sky at your birth date, time and place, and pauses there for you to explore.',
    problem:
      'Birth charts are flat tables and wheels of symbols. The real thing they describe — where the planets actually were — is never shown as a place.',
    vision:
      'An observatory, not a horoscope: accurate astronomy rendered as a scene you move through, from now back to the moment you arrived.',
    stack: 'React · TypeScript · Three.js · GSAP · Zustand · astronomy-engine',
    status: 'Complete',
    github: 'https://github.com/pwnsbd/Nakshatra',
  },
  {
    group: 'proud', sketch: 'frog', stamp: 'shipped',
    title: 'FroggerAR',
    url: 'android · AR',
    tag: 'AR · game',
    description:
      'Frogger reimagined in augmented reality. Place platforms on real surfaces and in mid-air, then guide a frog across them by charging and timing jumps along a predicted arc. Reached platforms turn green; fall and you lose a heart.',
    problem:
      'Most AR games are a 3D model sitting on a table. The player rarely gets to shape the level in the room they’re standing in.',
    vision:
      'A complete AR loop — build the course in your own space, then play it — with readable feedback for lives, progress, win and lose.',
    stack: 'Unity 6 · C# · AR Foundation · ARCore · Vuforia · URP',
    status: 'Complete — APK + gameplay video',
    github: 'https://github.com/pwnsbd/FroggerAR',
  },

  /* ── odds & ends ── */
  {
    group: 'more', sketch: 'chart', stamp: 'done',
    title: 'Odyssey',
    url: 'localhost:3000',
    tag: 'finance · dashboard',
    description:
      'An interactive dashboard over SEC Form 13F institutional holdings from 2011 to 2025. Click any holding to see its price history centred on the filing quarter, fetched and cached locally.',
    problem:
      '13F filings are raw XML spread across hundreds of quarters.',
    vision:
      'Fourteen years of institutional moves you can browse in seconds.',
    stack: 'React · Express · Python (stdlib) data pipeline',
    status: 'Complete',
  },
  {
    group: 'more', sketch: 'towers', stamp: 'done',
    title: 'Tower War',
    url: 'android · AR',
    tag: 'strategy · AR game',
    description:
      'A tower-control strategy game for an AR games class. Link towers, expand your influence and out-time your opponent to dominate the map.',
    problem: '',
    vision: '',
    stack: 'Unity · C# · Vuforia',
    status: 'Class project — complete',
    github: 'https://github.com/pwnsbd/TowerWar',
  },
  {
    group: 'more', sketch: 'swatches', stamp: 'done',
    title: 'Color Picker',
    url: 'colorpicker · web',
    tag: 'learning · web game',
    description:
      'A quick-fire game that teaches colour relationships. See a base colour, slide to its complement, and build the longest streak you can. Progress is saved in the browser.',
    problem: '',
    vision: '',
    stack: 'React · Vite · localStorage',
    status: 'Complete',
    github: 'https://github.com/pwnsbd/ColorPicker',
  },
  {
    group: 'more', sketch: 'mic', stamp: 'done',
    title: 'VoiceSentis',
    url: 'unity · package',
    tag: 'speech · Unity prefab',
    description:
      'A drop-in Unity prefab for offline speech-to-text. Record, run a Whisper ONNX model on-device with Unity Sentis, and get the text back through an event — no API costs.',
    problem: '',
    vision: '',
    stack: 'Unity · C# · Unity Sentis · Whisper ONNX',
    status: 'Complete',
  },
  {
    group: 'more', sketch: 'histogram', stamp: 'done',
    title: 'ImageViewer',
    url: 'qt · desktop',
    tag: 'imaging · desktop app',
    description:
      'A native image viewer with a live histogram and basic image-processing tools, written in C++ with Qt.',
    problem: '',
    vision: '',
    stack: 'C++ · Qt · CMake',
    status: 'Complete',
    github: 'https://github.com/pwnsbd/ImageViewer',
  },
];
