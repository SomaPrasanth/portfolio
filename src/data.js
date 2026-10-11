export const profile = {
  name: 'Soma Prasanth R',
  firstName: 'Soma',
  role: 'Software Engineer',
  tagline:
    'Software engineer building full-stack web applications, cross-platform mobile apps and AI-powered tools.',
  location: 'Tirupur, Tamil Nadu, India',
  email: 'somaprasanthr@gmail.com',
  phone: '+91 90424 49326',
  phoneHref: 'tel:+919042449326',
  resume: '/Soma_Prasanth_R_Resume.pdf',
  links: {
    github: 'https://github.com/SomaPrasanth',
    linkedin: 'https://www.linkedin.com/in/somaprasanthr/',
    gfg: 'https://www.geeksforgeeks.org/user/somapra54cm/',
  },
}

export const stats = [
  { value: 8.67, decimals: 2, label: 'CGPA at PSG Tech' },
  { value: 600, suffix: '+', label: 'DSA problems solved on GFG' },
  { value: 5, label: 'projects built' },
  { value: 97, suffix: '%', label: 'in Class 12' },
]

export const dossier = [
  ['Name', 'Soma Prasanth R'],
  ['Location', 'Tirupur, Tamil Nadu, India'],
  ['Education', 'B.Tech IT · PSG College of Technology · 2023 – 2027'],
  ['Experience', 'Former Software Engineering Intern · PayPal'],
  ['Focus areas', 'Full-stack · Mobile · AI agents'],
  ['Languages', 'Java · Kotlin · Python · TypeScript'],
]

export const experience = [
  {
    company: 'PayPal',
    role: 'Software Engineering Intern',
    product: 'Insightly — PayPal’s internal user-behaviour analytics platform',
    points: [
      'Built a real-time streaming layer that shows an AI agent’s reasoning in the UI as it happens, working through latency and buffering constraints across React/TypeScript, Spring Boot and Python (Google ADK) layers — while keeping response times comparable to non-streaming mode.',
      'Designed and built an agent and MCP tool layer that lets LIA auto-generate personalised dashboards from users’ top events and tags across product spaces, laying the foundation for a scalable, tool-extensible insights system.',
    ],
    stack: ['React', 'TypeScript', 'Spring Boot', 'Python', 'Google ADK', 'MCP'],
  },
]

export const projects = [
  {
    id: 'stayeasy',
    name: 'StayEasy',
    kind: 'Android + iOS app',
    featured: true,
    summary:
      'An Android and iOS app for PSG Tech hostel students that reminds you to book tomorrow’s food tokens, books them in a couple of taps, shows your mess QR and handles hostel leave — without opening the portal in a browser. Built as a single Kotlin Multiplatform codebase on top of the portal’s undocumented endpoints.',
    stack: ['Kotlin', 'Compose Multiplatform', 'Ktor', 'Ksoup', 'WorkManager', 'GitHub Actions'],
    links: [
      { label: 'Source', href: 'https://github.com/SomaPrasanth/Book-your-token', icon: 'github' },
      {
        label: 'Download APK',
        href: 'https://github.com/SomaPrasanth/Book-your-token-release/releases/latest',
        icon: 'download',
      },
    ],
    screenshots: [
      { src: '/projects/stayeasy-tokens.jpg', alt: 'StayEasy: tomorrow’s tokens screen' },
      { src: '/projects/stayeasy-select.jpg', alt: 'StayEasy: selecting an item to book' },
      { src: '/projects/stayeasy-confirm.jpg', alt: 'StayEasy: confirming a booking' },
    ],
  },
  {
    id: 'command-gateway',
    name: 'Command Gateway',
    kind: 'Hackathon · Unbound',
    summary:
      'A policy-enforced gateway for running shell commands, built for the Unbound hackathon. Every command is checked against admin-defined regex rules and is executed, blocked or held for admin approval, with hashed API keys, usage credits and a full audit log.',
    stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'React', 'Vite'],
    links: [
      { label: 'Live demo', href: 'https://command-gateway-frontend.vercel.app', icon: 'external' },
      { label: 'Frontend', href: 'https://github.com/SomaPrasanth/command-gateway-frontend', icon: 'github' },
      { label: 'Backend', href: 'https://github.com/SomaPrasanth/command-gateway-backend', icon: 'github' },
    ],
  },
  {
    id: 'meeting-assistant',
    name: 'Smart Meeting Assistant',
    kind: 'AI · Full-stack',
    summary:
      'Records a meeting from a browser tab or takes an uploaded audio file, then uses Whisper and Gemini to produce a transcript, a summary, action items and decisions — with a custom-prompt option to ask questions about the meeting.',
    stack: ['React', 'Python', 'Flask', 'Whisper', 'Gemini API'],
    links: [{ label: 'Source', href: 'https://github.com/SomaPrasanth/Meeting-Summariser', icon: 'github' }],
  },
  {
    id: 'email-organiser',
    name: 'Email Organiser',
    kind: 'Full-stack · ML',
    summary:
      'A Gmail cleanup tool with Google sign-in that flags spam using a fine-tuned BERT model and lets you bulk-delete, filter, search by sender and mark mail as read.',
    stack: ['React', 'Node.js', 'Express', 'Gmail API', 'FastAPI', 'Transformers'],
    links: [{ label: 'Source', href: 'https://github.com/SomaPrasanth/Email-Organiser', icon: 'github' }],
  },
  {
    id: 'event-management',
    name: 'Event Management Web App',
    kind: 'Full-stack',
    summary:
      'A web app with separate portals for organisers and students: organisers publish events and track registrations, while students sign up, register and unregister. Backed by an Express and PostgreSQL REST API.',
    stack: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    links: [{ label: 'Source', href: 'https://github.com/SomaPrasanth/Event-Management-Web-App', icon: 'github' }],
  },
]

export const skills = [
  { name: 'Languages', items: ['Java', 'Kotlin', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'] },
  { name: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'Flask', 'Spring Boot'] },
  { name: 'AI', items: ['Gemini API', 'Whisper', 'Google ADK', 'MCP', 'Hugging Face Transformers'] },
  { name: 'Data', items: ['PostgreSQL', 'SQLAlchemy', 'SQLite'] },
  { name: 'Tools', items: ['Git', 'GitHub Actions', 'Vercel', 'Android Studio', 'VS Code'] },
  { name: 'Fundamentals', items: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'OOP'] },
]

export const education = [
  {
    school: 'PSG College of Technology',
    degree: 'B.Tech — Information Technology',
    years: '2023 – 2027',
    score: 'CGPA 8.67',
  },
  {
    school: 'Literacy Mission Matric Higher Secondary School',
    degree: 'Higher Secondary Education',
    years: '2021 – 2023',
    score: '97%',
  },
]

export const certifications = ['Full Stack Web Development — Udemy', 'Problem Solving — HackerRank']

export const achievements = [
  'Won a ₹3,000 cash prize at a college-level technical event run by the department association.',
  'Took part in Smart India Hackathon, solving a real-world problem as a team under time pressure.',
  'Solved 600+ problems on GeeksforGeeks.',
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
