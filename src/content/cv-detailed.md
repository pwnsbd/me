# Pawan Subedi

**Product Creator · Software Engineer · XR Developer**

[Portfolio](https://pwnsbd.me) · [GitHub](https://github.com/pwnsbd) · [LinkedIn](https://linkedin.com/in/pawan-subedi-6620b4128) · justpawan7@gmail.com

College Station, Texas, USA

## About Me

I'm a product creator who is also a software engineer, and a graduate student in Visualization at Texas A&M University.

My work sits at the intersection of product design, software engineering, spatial computing, and artificial intelligence. I enjoy taking an idea that is difficult to explain, breaking it into something tangible, and building a system that people can actually interact with.

Before graduate school, I spent nearly three years at Hewlett Packard Enterprise developing automation, diagnostics, and internal engineering tools. That experience shaped how I think about building reliable and maintainable systems.

Today, I work primarily on independent products and immersive experiences. Some explore how small AI models can make personal software more useful without relying on the cloud. Others explore how virtual reality can turn abstract concepts into experiences people can manipulate and understand.

Across both, I'm interested in the same question: **how can thoughtful engineering make complex technology feel simple, useful, and human?**

---

## Professional Experience

### Texas A&M University — Teaching Assistant

*College Station, Texas | August 2025 – Present*

Teach visual computing and game development concepts through hands-on programming labs.

- Lead weekly Unreal Engine labs for approximately **60 students**, guiding them from introductory Blueprints to functional gameplay systems and playable prototypes.
- Teach gameplay programming through actors, components, events, character movement, interactions, and reusable logic.
- Help students debug technical problems, understand implementation tradeoffs, and progressively assemble complete game features.
- Evaluate coursework and projects against functional requirements, providing feedback on code quality, gameplay behavior, and completion.
- Independently deliver lab instruction while adapting the teaching approach to make technical concepts accessible.

**Courses**

- **VIST 272 — Visual Computing:** Unreal Engine, Blueprint scripting, and interactive game development.
- **VIST 172 — Visual Computing:** Introductory creative programming using Python and Processing.

### Hewlett Packard Enterprise — System Software Engineer

*San Jose, California | July 2022 – April 2025*

Worked on storage-system testing, automation, diagnostics, and developer tooling, with a focus on reducing repetitive engineering work and improving system reliability.

- Developed reusable **Python/PyTest utilities adopted by 15 engineers**, reducing repetitive test code by approximately **40%**.
- Converted manually discovered software defects into automated regression tests, helping prevent recurring issues as the system evolved.
- Integrated testing workflows into Jenkins CI with structured logs and clearer assertions to simplify failure investigation.
- Co-developed a consistency-checking tool that surfaced operational data inconsistencies within an internal storage indexing system.
- Built diagnostic utilities that transformed raw machine output into structured, readable information for faster troubleshooting.
- Extended internal tooling into operational metrics extraction and visualization, helping senior engineers inspect previously difficult-to-observe system behavior.
- Developed simulation-based tests to investigate defects, exercise failure conditions, and explore system limits.

**Core technologies:** Python, PyTest, Jenkins, Git, system simulation, diagnostics, CI automation.

### Hewlett Packard Enterprise — Software Engineering Intern / Co-op

*San Jose, California | May 2021 – May 2022*

Joined the QA engineering organization as a summer intern and continued as a part-time co-op during senior year.

**Internal Job Submission Platform**

- Designed and developed a web interface that replaced a manual, form-based command-line job-submission workflow.
- Built with Python, Django, Elasticsearch, MongoDB, and Celery.
- Adopted by approximately **15–20 engineers**, reducing the time required to submit jobs by roughly **40%**.
- Extended the tooling into related workload-dispatch workflows for test machines.

**Regression Automation**

- Transformed manual QA procedures into modular, reusable automation.
- Helped reduce a full day of manual verification to a few hours for a team of approximately five engineers.
- Enabled repeated checks against new hardware builds without requiring engineers to execute each procedure manually.

### Neighbor Marketing — Software Engineer

*Remote, New York | April 2020 – June 2020*

Worked on an early-stage rental property listing and reviews platform intended for customers in New York and Rhode Island.

- Led front-end development for a Zillow-style rental marketplace prototype.
- Built interfaces using React and JavaScript.
- Integrated Google Maps for location search and address autocomplete, Firebase Authentication for user accounts, and Mailchimp for automated emails.
- Collaborated on a prototype used in stakeholder and investor demonstrations.
- The platform targeted a potential market of over 250,000 renters; development moved in-house before public launch.

### Engrave — Freelance Web Developer

*Independent Client Project*

- Designed and developed a portfolio and product-showcase website for a small engraving business.
- Scoped the solution around product discovery and customer inquiries rather than unnecessary e-commerce complexity.
- Delivered a functional website within a small-business budget.

---

## Independent Products

These are products I conceived, designed, and developed independently, often using structured AI-assisted development workflows. My responsibilities span product vision, requirements, architecture, interaction design, technical evaluation, quality review, and release decisions.

### RayForge — Interactive VR Optics Laboratory

*2026 – Present | In Development · Master's Thesis Direction*

**Unreal Engine · C++ · Blueprints · OpenXR · Meta Quest 3 · Geometric Optics**

RayForge is a modular virtual reality laboratory where learners create optical experiments and directly observe how light behaves.

The central idea is to make optics something that can be learned through experimentation rather than exclusively through equations or diagrams.

Users can manipulate lenses, mirrors, and light sources, arrange equipment on an optical bench, and observe how light reflects, refracts, focuses, or spreads. They can also look through lenses to experience how optical arrangements change their view.

**Engineering and development**

- Architected a reusable optics engine connecting simulation, lens geometry, beam visualization, and see-through rendering through shared optical definitions.
- Implemented geometric optics behavior including Snell's law, Fresnel reflection and transmission, total internal reflection, and wavelength-dependent dispersion.
- Developed prescription-driven lenses whose curvature, thickness, aperture, and material properties determine both optical behavior and procedural geometry.
- Created reusable interactions for grabbing, positioning, resizing, and mounting laboratory equipment in VR.
- Developed stereoscopic lens visualization with separate per-eye rendering behavior.
- Optimized a measured Quest 3 see-through update from **7.6 ms to 2.9 ms**, a **62% reduction** in that operation's cost.
- Expanded automated validation as the project evolved, with over 100 checks at documented development milestones covering optical behavior, geometry, and edge cases.
- Validated selected lens calculations against manufacturer reference values.

**Product and design decisions**

- Structured experiments around reusable optical components so new equipment and learning activities can build upon existing systems.
- Explored guided learning stations before narrowing the prototype to a focused laboratory environment.
- Compared multiple see-through rendering approaches using visual quality, responsiveness, and performance measurements.
- Deferred nonessential features to prioritize interaction quality, simulation consistency, and standalone-headset constraints.

**Vision:** Create an extensible learning environment where abstract light behavior becomes directly observable through physical experimentation in VR.

### Memory Room — Spatial Photo Gallery for VR

*2026 – Present | Active Development*

**Unreal Engine · Blueprints · C++ · Meta Quest · Spatial Interaction**

Memory Room explores a different way of experiencing personal photographs.

Instead of placing a conventional photo gallery inside a floating VR window, it surrounds the user with memories arranged in a spatial helix.

**Experience and interaction**

- Designed a gallery where users browse photographs by rotating the surrounding arrangement through controller-twist interactions.
- Developed six-degree-of-freedom photo manipulation, allowing users to pull photographs closer, move them, rotate them, and inspect them in space.
- Built reusable environmental themes to give the same photo collection different atmospheres.
- Introduced time-of-day states including dawn, sunset, and nighttime environments.
- Added spatial audio that responds to movement through the gallery.
- Designed the experience around the compute and interaction limitations of standalone Meta Quest hardware.

**Vision:** Explore how spatial interaction, movement, atmosphere, and sound can make browsing photographs feel more personal than navigating a flat gallery.

### Rasa — Local-First AI Style Transfer

*August – October 2026 | Released v0.2.0*

[GitHub](https://github.com/pwnsbd/rasa) · [Project Showcase](https://pwnsbd.github.io/rasa)

**Electron · React · TypeScript · Python · PyTorch · SDXL · Computer Vision**

Rasa is a Windows creative application that transfers the visual style and texture of a reference image onto a user's photograph while preserving its recognizable structure.

Rather than asking users to describe a style through complicated prompts, Rasa lets them communicate visually.

A reference image becomes a reusable asset called an **Essence**. Users can collect Essences and apply or combine them to explore different artistic treatments.

**Product and experience design**

- Designed an alchemy-inspired workflow built around extracting, collecting, and applying reusable visual styles.
- Created distinct application spaces for style extraction, image transformation, saved creations, and configuration.
- Used recognizable visual metaphors such as bottles, shelves, distillation, and pouring to make complex AI operations feel tangible.
- Supported diffusion-based restyling, material-like texture overlays, and reusable style blending.
- Designed the application to operate locally on consumer hardware without requiring cloud image processing.

**Engineering and optimization**

- Integrated SDXL, IP-Adapter/InstantStyle, and ControlNet with segmentation, depth estimation, and classical image-processing methods.
- Added structural guidance to reduce unwanted changes to subjects and composition.
- Used masks, depth information, color-space processing, and texture analysis to offer different transformation approaches.
- Reduced single-pass image processing from **64 seconds to 15 seconds** on documented development hardware through GPU-memory-aware execution and caching.
- Packaged the application into a Windows installer with local model setup, download feedback, and reliability checks.

**Product judgment**

- Changed the original planned model architecture after evaluating available model capabilities and compatibility.
- Rejected visual effects that passed technical checks but did not produce convincing results.
- Prioritized installation clarity, performance, and usable defaults before release.
- Verified the image-extraction-to-export workflow through a fresh Windows account test.

**Vision:** Make expressive, image-driven creation possible with local computing resources rather than relying on cloud services or complex prompt engineering.

### Words — Private AI Journaling Application

*2026 | Released v0.2.0*

[GitHub](https://github.com/pwnsbd/Words)

**Electron · React · TypeScript · llama.cpp · Qwen · Local AI**

Words is a private Windows journaling application that helps people reconnect with recurring thoughts in their own writing.

Instead of acting like an AI assistant that gives advice, Words is designed to be a quiet reflection of what the writer has already expressed.

All journal entries and AI inference remain local after the initial model setup.

**Product design**

- Defined a set of guiding principles: peaceful, patient, non-imposing, and reflective rather than judgmental.
- Designed three writing modes: Pencil, Quill, and Ink, each changing how corrections and deletion work.
- Built a reflection experience that responds to saved writing without interrupting the writing process.
- Introduced semantic memory that resurfaces related passages from earlier entries.
- Designed recurring-pattern discovery using dated, source-linked passages.
- Enabled users to dismiss incorrect AI associations rather than accepting the model's interpretation.
- Added retrospective letters covering weeks, months, and years.

**AI evaluation and engineering**

- Integrated locally running generative and embedding models for reflection, semantic matching, and recurring-pattern analysis.
- Selected Qwen3.5-9B for generative reflection after comparing alternative models.
- Evaluated semantic matching on **78 labeled synthetic entries**, including difficult negative examples.
- Tuned retrieval thresholds to prioritize reliable matches over aggressive recommendations.
- Coordinated model execution within local GPU-memory constraints.
- Improved draft recovery, saving reliability, interrupted downloads, and failure handling.

**Product decisions**

- Narrowed the original feature scope around meaningful reflection rather than engagement features.
- Removed an experimental feelings-extraction approach after evaluation showed unacceptable latency and reliability.
- Replaced planned AI-generated wax-seal artwork with procedural visuals to reduce download and compute requirements.
- Released the application with a Windows installer, demonstration materials, and a public repository.

**Vision:** Build personal software that becomes more meaningful over time without collecting personal data in the cloud or telling users what to think.

### Lingo — Developer Vocabulary for AI-Assisted Codebases

*August – September 2026 | Released to VS Code Marketplace*

**VS Code · TypeScript · Node.js · SQLite · MCP**

Lingo is a Visual Studio Code extension that helps developers understand and navigate codebases created or modified with AI coding agents.

The idea came from a recurring problem: when agents generated components, endpoints, and modules, it became increasingly difficult to remember the names and responsibilities of everything they created.

**Highlights**

- Designed a locally stored glossary of components, endpoints, commands, and modules.
- Connected an MCP server to record meaningful concepts reported by coding agents.
- Developed glossary, hierarchy, and visual page-map views for navigating the recorded concepts.
- Added project-type detection and initialization tools for existing repositories.
- Preserved rename history so developers could follow how parts of a project evolved.
- Resolved SQLite runtime compatibility issues between the extension environment and the Node process.
- Released the extension to the VS Code Marketplace and began collecting initial usage evidence.

**Vision:** Give developers and AI agents a shared vocabulary so software remains understandable as AI-assisted development becomes more common.

### Spotlight — Browser Highlighting and Reading Room

*August 2026 | Shipped MVP*

[Project Website](https://spotlight.pwnsbd.me)

**Browser Extension · JavaScript · Web Development · Local Storage**

Spotlight helps preserve useful fragments discovered while browsing the web.

The product began with a simple observation: quotes, technical explanations, and interesting passages are easy to highlight but often difficult to find again.

**Highlights**

- Developed the Spotlight Marker browser extension to capture selected text directly from websites.
- Created a companion reading-room website to display collected highlights.
- Designed the workflow around capturing information without disrupting browsing habits.
- Built and released the initial MVP in approximately **15 days**.
- Reached roughly **four early active users** among family and friends.
- Explored future capabilities including shared collections and AI-assisted understanding.

**Vision:** Give the small pieces of information encountered every day a useful place to live.

### DepthFrame — Interactive 2.5D Photography

*2026 | Experimental Project*

**WebGL · JavaScript · Depth Estimation · Computer Vision**

DepthFrame explores how ordinary photographs can be turned into interactive scenes using estimated depth.

- Developed a browser-based concept for producing parallax movement from flat images.
- Explored Depth Anything V2 for depth estimation and Metric3D for surface information.
- Used fragment shaders to create movement, lighting, and depth-based visual effects.
- Explored depth of field, haze, and animated image export.

**Vision:** Explore the space between photography and interactive 3D, making static images responsive to motion and light.

### Nakshatra — Interactive Solar System Visualization

*2026 | Independent Project*

**React · TypeScript · Three.js · Astronomy Engine · GSAP**

A visualization concept for exploring planetary positions through time.

- Designed an interactive experience in which users enter a date, time, and location to explore a corresponding arrangement of planetary bodies.
- Used astronomical calculations to connect user input with visual representations.
- Combined web-based 3D rendering and animation to make astronomical information explorable.

**Vision:** Turn abstract astronomical calculations into an accessible visual experience.

---

## Game Development and AR Projects

### Dead's Rights — Lead Engineer

*Spring 2026 | Shipped*

[Play on itch.io](https://foxico.itch.io/deads-rights)

**Unreal Engine · C++ · Gameplay Systems · Team Leadership**

A team-developed game built around navigating a maze on a sphere, combining unusual movement with abilities and interactive challenges.

**Contributions**

- Pitched the original sphere-maze game concept and helped refine it into a feasible team project.
- Led technical coordination among four engineers while collaborating with artists.
- Designed and implemented the core gameplay loop and player mechanics in Unreal Engine C++.
- Organized work across interfaces, artificial intelligence, player abilities, and supporting game systems.
- Resolved integration issues between independently developed systems.
- Contributed approximately **36% of repository commits**.
- Gathered feedback through playtesting with approximately **40 students**.
- Reduced the planned ability count from five to four to protect the delivery schedule.
- Shipped the game within a **13-week development timeline**.

**What I learned:** Turning an ambitious game idea into a completed team project requires technical execution, communication, prioritization, and a willingness to reduce scope.

### ScavengAR Hunt — Augmented Reality Scavenger Game

*Fall 2025 | Completed Coursework Project*

**Unity · Vuforia · AR Tracking**

An AR game where players interact with scanned real-world objects to unlock abilities.

- Designed a two-stage gameplay experience connecting real-world object discovery to virtual combat.
- Used object tracking and 3D scans to recognize physical objects.
- Built a progression system where discovered objects unlock abilities needed for a boss encounter.
- Explored real-world occlusion and spatial interaction.
- Refined interactions through classroom playtesting.

### Animal vs. Human — Augmented Reality Strategy Game

*Fall 2025 | Completed Coursework Project*

**Unity · Vuforia · Image Tracking**

A marker-based AR strategy game where physical cards become units inside a virtual battlefield.

- Used image tracking to detect playing cards and spawn corresponding virtual units.
- Implemented proximity-based combat behavior.
- Built game-state progression and spawning logic.
- Connected physical card placement with virtual gameplay behavior.

### AR Frogger — Augmented Reality Platform Game

*Fall 2025 | Completed Coursework Project*

**Unity · AR Foundation · Interactive Gameplay**

An augmented reality take on platform-based movement challenges.

- Designed a marker-based system for placing platforms in the physical environment.
- Implemented camera-aimed jumping and interactive movement.
- Tested and refined tracking, controls, and interaction clarity.

---

## Machine Learning and Research Exploration

### Generative Adversarial Networks — Research Reproductions

*October 2023 – August 2025*

**PyTorch · OpenCV · Deep Learning**

Studied and reproduced generative adversarial network architectures to better understand image generation and transformation.

- Explored CycleGAN, StyleGAN, DCGAN, and SRGAN.
- Reproduced and experimented with published architectures.
- Investigated image-to-image transformation and structure-preserving generation.
- Explored whether learned models could produce edge-detection-like results comparable to classical techniques such as Canny edge detection.

### VR Learning and Optics — Master's Thesis Direction

*2026 – Present*

My graduate research direction explores how immersive interaction can help learners understand light and geometric optics.

The motivating question is:

**Can the mechanics of a VR game teach a concept through the act of playing, rather than relying primarily on instruction?**

RayForge serves as the technical and interactive foundation for this exploration.

Current areas of investigation include optical simulation, physical manipulation, visual feedback, reusable experimental equipment, standalone VR performance, and the design of meaningful learning interactions.

---

## Hackathons, Competitions, and Early Ventures

### Sanford Health Hackathon — Health Memo

*Team Lead / iOS Developer | 2nd Place and People's Choice Award*

An iOS health-logging concept designed to make communication between patients and healthcare providers easier.

- Led a three-person team through product definition, prototyping, and presentation.
- Built an application allowing patients to record symptoms through voice.
- Integrated Google's speech recognition and speech synthesis technologies.
- Designed a workflow for turning daily logs into summaries that could support medical appointments.
- Developed the product pitch, business concept, and demonstration video.
- Awarded **2nd place and People's Choice** among approximately 20 teams, with **$9,000 in reported prizes**.

### Sanford Health Hackathon — Pill Buddy

*September – October 2019 | Team Lead | 2nd Place*

A medication-safety application concept focused on helping older adults identify potentially dangerous drug interactions.

- Led a four-person team's problem framing, research, and product pitch.
- Designed a user-friendly medication interaction checker.
- Developed the system concept and demonstration prototype.
- Positioned the product around the needs of an intended population of over **5,000 elderly patients**.
- Awarded **2nd place among 12 teams**, with a reported **$7,000 prize pool**.

### Hult Prize — Yetu

*September 2018 – April 2019 | Team Lead / Technical Lead*

A digital marketplace concept aimed at helping entrepreneurs in developing markets establish online businesses without relying on physical storefronts.

- Co-developed a long-term business proposal with two co-founders.
- Designed a virtual marketplace concept with seller analytics, inventory management, and guided storefront setup.
- Created product prototypes, interface animations, and a functional website.
- Participated in business-owner interviews and product validation discussions.
- Produced promotional video materials and contributed to the investor-style pitch.
- **Won the university-level Hult Prize competition** at Augustana University.
- Advanced to the **2019 Hult Prize Regional Summit in San Francisco**.

### Augie Tumble — Campus Laundry Availability App

*Augustana University | Student Venture*

An early product concept created to solve a familiar campus problem: students walking to shared laundry rooms without knowing whether machines were available.

- Designed a QR-based availability system for campus laundry machines.
- Developed the concept and presented it to the Augustana Student Association.
- Secured support and funding for testing and development.
- Built an initial prototype.
- Development ended after the student team disbanded.

### Twitter Clone — iOS Application

*October 2020 | CodePath Project*

**Swift · iOS · Storyboard**

- Developed an iOS social-feed application inspired by Twitter.
- Implemented authentication, persistent login, timelines, retweeting, and favorites.
- Built infinite scrolling and interactive feed functionality.

---

## Leadership and Community

### Visualization Graduate Student Association — Officer

*Texas A&M University*

Support industry and alumni relations within the Visualization graduate student community.

### ACM SIGGRAPH 2024 — Conference Volunteer

*Denver, Colorado | July – August 2024*

- Assisted with conference operations, attendee guidance, and session or exhibit support.
- Collaborated with organizers and volunteers to keep conference activities running smoothly.
- Engaged with developments in computer graphics, interactive systems, games, and visualization research.

### Augustana Student Association — Communication Director

*Sioux Falls, South Dakota | August 2019 – May 2020*

- Led a six-person communications team supporting student-government activities.
- Helped improve visibility and communication for more than **100 student clubs**.
- Managed media, communications, design, and updates to the student association website.
- Helped organize the 2019 student senate election.

### Asian Student Organization — Communication Coordinator

*April 2019 – January 2020*

- Managed visual communications, event promotion, social media, and graphic design.
- Designed promotional materials and branding assets.
- Contributed to a reported **70% increase in event participation**.

---

## Education

### Texas A&M University

*College Station, Texas | August 2025 – May 2027 (Expected)*

**Master of Science in Visualization**

Focus areas include:

- Virtual and augmented reality
- Unreal Engine and interactive game development
- Computer graphics and visual computing
- Spatial interaction and immersive design
- Educational VR and optics simulation

**Thesis direction:** Designing interactive VR experiences that help learners explore geometric optics through manipulation and experimentation.

### Augustana University

*Sioux Falls, South Dakota | Graduated May 2022*

**Bachelor of Arts in Computer Science and Data Science**

**Minor:** Mathematics  
**GPA:** 3.52 / 4.00

Relevant academic areas:

- Artificial Intelligence and Robotics
- Advanced Data Structures
- Computer Organization and Architecture
- Data Science
- Python and C++ Programming

**Recognition**

- Athlete of the Year
- Global Leader Scholarship

---

## Technical Skills

| Area | Technologies and Methods |
|---|---|
| **Programming** | Python, C++, TypeScript, JavaScript, Java, Swift, HTML, CSS |
| **XR and Game Development** | Unreal Engine 5, Blueprints, Unity, OpenXR, Meta Quest, Vuforia, AR Foundation |
| **Graphics and Visualization** | Three.js, WebGL, shader programming, procedural geometry, ray tracing, spatial interaction |
| **AI and Machine Learning** | PyTorch, Keras, OpenCV, SDXL, ControlNet, IP-Adapter, CLIP, depth estimation, local language models, embedding models |
| **Desktop and Web** | Electron, React, Node.js, Django, FastAPI, Vite, Tailwind |
| **Data and Infrastructure** | SQLite, MongoDB, Elasticsearch, Docker, Jenkins CI, Git, PyTest |
| **Product Development** | Product discovery, problem framing, requirements, MVP definition, prototyping, prioritization, evaluation, release planning |
| **Engineering Practices** | Automated testing, system architecture, performance profiling, CI workflows, technical documentation, AI-assisted development |

---

## Certifications and Additional Training

**DeepLearning.AI — Deep Learning Specialization**

- Neural Networks and Deep Learning — September 2022
- Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization — October 2022
- Structuring Machine Learning Projects — January 2023
- Convolutional Neural Networks — February 2023
- Sequence Models — March 2023

**CodePath**

- iOS Application Development — 2020

**Broadway**

- HTML, CSS, and JavaScript — 2016
