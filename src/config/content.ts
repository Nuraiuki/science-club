// Тексты и данные секций. Картинки кладём в /public/images и указываем путь в поле `image`.

export const HERO_PILLS = [
  { label: 'Workshops', left: '-3.4%', top: '9.6%', rotate: -5 },
  { label: 'Projects', left: '77.7%', top: '23.6%', rotate: 8 },
  { label: 'Events', left: '43.6%', top: '50%', rotate: -3 },
  { label: 'Content', left: '60%', top: '67%', rotate: 10, leftMobile: '42%', topMobile: '66%' },
  { label: 'Hackathons', left: '83%', top: '70.4%', rotate: -6 },
  { label: 'Startups', left: '7%', top: '80%', rotate: 6 },
] as const

export const ROLES = [
  'SMM Specialist',
  'PR & Communications',
  'Event Organizer',
  'Speaker',
  'Project Manager',
  'Partnership Lead',
  'Idea Owner',
  'Developer',
  'Designer',
]

export const PRINCIPLES = [
  { n: '01', tag: 'Learn', title: 'Knowledge', text: 'Learn from peers and industry experts through hands-on practice.' },
  { n: '02', tag: 'Build', title: 'Execution', text: 'Work on real-world projects that solve actual problems.' },
  { n: '03', tag: 'Create', title: 'Innovation', text: 'Bring your wildest ideas to life with a team of like-minded builders.' },
  { n: '04', tag: 'Connect', title: 'Network', text: 'Meet your future co-founders, mentors, and professional opportunities.' },
]

export type Activity = {
  n: string
  tag: string
  title: string
  text: string
  flow?: string[]
  flowSep?: string
  flowGap?: number
  button?: { label: string; href: string }
  accent?: boolean
  /** Фото, которое проявляется при наведении: '/images/activities/workshops.jpg' */
  image?: string
}

export const ACTIVITIES: Activity[] = [
  {
    n: '01',
    tag: 'Workshops',
    title: 'Peer-to-Peer\nWorkshops',
    text: 'Learn Git, Case Studies, Web Dev. Students sharing knowledge with students.',
    image: '',
    flow: ['Student', 'Workshop', 'Community'],
    flowSep: '→',
  },
  {
    n: '02',
    tag: 'Meetups',
    title: 'Expert\nMeetups',
    text: 'Meet founders, engineers, and entrepreneurs building the future.',
    image: '',
    flow: ['Talk', 'Q&A', 'Networking'],
    flowSep: '→',
  },
  {
    n: '03',
    tag: 'Process',
    title: 'From Idea\nto Sales',
    text: "Don't stop at an idea. Research, build MVP, test, pitch and sell.",
    image: '',
    flow: ['Idea', 'MVP', 'Pitch', 'Sales'],
    flowSep: '•',
    flowGap: 7,
  },
  {
    n: '04',
    tag: 'Projects',
    title: 'Creative\nProjects',
    text: 'Interactive websites, QR quests, and digital experiences for campus.',
    image: '',
    button: { label: 'View Projects', href: '#projects' },
  },
  {
    n: '05',
    tag: 'Competition',
    title: 'Internal\nHackathons',
    text: 'Build. Compete. Solve. Transform ideas into prototypes in 48 hours.',
    image: '',
    flow: ['Team', 'Idea', 'Build', 'Pitch'],
    flowSep: '→',
  },
  {
    n: '06',
    tag: 'Communication',
    title: 'Public\nSpeaking',
    text: 'A great idea is only useful if you can communicate it. Pitch like a pro.',
    image: '',
    flow: ['Storytelling', 'Pitching', 'Audit'],
    flowSep: '—',
    flowGap: 8,
  },
  {
    n: '07',
    tag: 'Careers',
    title: 'Startup\nInternships',
    text: 'Get experience beyond the classroom. Work directly with partner startups.',
    image: '',
    accent: true,
  },
]

export const AMPLIFY_ITEMS = [
  { label: 'Content', tile: 'Content Squad' },
  { label: 'Social Media', tile: 'Social Squad' },
  { label: 'PR & Promotion', tile: 'PR Squad' },
  { label: 'Storytelling', tile: 'Story Squad' },
]

export const AMPLIFY_TAGS = ['Design', 'Content', 'Events', 'Partnerships']

export const JOURNEY = [
  { n: '01', title: 'Join', text: 'Join the community through our application form.' },
  { n: '02', title: 'Learn', text: 'Attend workshops and meetups with professionals.' },
  { n: '03', title: 'Build', text: 'Join project teams and start building solutions.' },
  { n: '04', title: 'Create', text: 'Ship creative experiences for the campus community.' },
  { n: '05', title: 'Grow', text: 'Build your portfolio and scale your own startup.' },
]

export const PROJECTS = [
  {
    name: 'EnergyDronesAI',
    category: 'AI / Hardware',
    text: 'AI-powered solar panel inspection using drone imagery for local energy plants.',
    team: 4,
    href: '#',
    image: '',
  },
  {
    name: 'Campus Quest',
    category: 'Web / Experience',
    text: 'Interactive QR-based game played by 200+ students during Orientation week.',
    team: 6,
    href: '#',
    image: '',
  },
  {
    name: 'Smart Registrar',
    category: 'Soft / Tools',
    text: 'Automation tool for managing student club attendance and reward points.',
    team: 2,
    href: '#',
    image: '',
  },
]

export const COMMUNITY_TILES = [
  { label: 'Main Event Space', bg: '#282a2e', text: '#5f6066', image: '' },
  { label: 'Late Night Build', bg: '#414248', text: '#9a9aa2', image: '' },
  { label: 'Pitch Practice', bg: '#53545d', text: '#a8a9b0', image: '' },
  { label: 'Workshop Log', bg: '#72737b', text: '#b9bac1', image: '' },
  { label: 'Social Mixer', bg: '#a0a1aa', text: '#7b7c85', image: '' },
]

/** wide: ячейка на всю ширину строки (для 7-го элемента). */
export const ACHIEVEMENTS: { name: string; value: string; caption: string; wide?: boolean }[] = [
  { name: 'HackNU', value: '3rd', caption: 'Place' },
  { name: 'ShAI Pro', value: 'TOP', caption: 'Finalists' },
  { name: 'ICPC', value: 'Q-FINALS', caption: 'Regional' },
  { name: 'WomenHack', value: '7', caption: 'Teams' },
  { name: 'InnovateX', value: '3', caption: 'Teams' },
  { name: 'AI Sana Leaders', value: 'BEST', caption: 'AI Project' },
  { name: 'Peer-to-Peer', value: '6', caption: 'Workshops', wide: true },
]

export const WHY_JOIN = [
  { title: 'Learn', text: 'Develop practical skills in tech, design and business.' },
  { title: 'Build', text: 'Work on real projects that solve actual problems.' },
  { title: 'Create', text: 'Design and launch creative experiences for campus.' },
  { title: 'Compete', text: 'Join national hackathons with a supportive team.' },
  { title: 'Speak', text: 'Develop public speaking and professional pitching skills.' },
  { title: 'Connect', text: 'Meet professionals and find like-minded students.' },
  { title: 'Experience', text: 'Gain real-world startup internship experience.' },
  { title: 'Lead', text: 'Take ownership of your own ideas and lead teams.' },
]
