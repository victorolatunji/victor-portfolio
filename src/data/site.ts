// Edit everything about the site's content here.
// Lines marked TODO need your real info.

export type WorkItem = {
  title: string;
  role: string;
  summary: string;
  stack: string[];
  href?: string;
};

export type Player = {
  name: string;
  number: number;
  line: "GK" | "DEF" | "MID" | "FWD";
};

export const site = {
  brand: "VAO",
  domain: "vao.works", // TODO: change once you buy the domain
  fullName: "Victor Ayodeji Olatunji",
  cardName: "Victor Olatunji",
  greeting: "Sak pase. I'm Victor.",
  headline: "I build software that actually works.",
  taglines: [
    "Backend-focused developer",
    "Learning by building",
    "Software over hype",
    "Clean code enjoyer",
  ],
  intro:
    "Programming student at Durham College and founder of VAO. I bring backend thinking to every build: clean data, solid logic, and code that keeps working after launch.",
  // Header status: what you're shipping right now
  status: { text: "Now shipping for M&S Hosting Solutions", href: "https://mshostingsolutions.ca/" },
  email: "you@example.com", // TODO
  photo: "/victor.jpg",
  links: {
    github: "https://github.com/victorolatunji",
    linkedin: "https://www.linkedin.com/in/victor-a-olatunji-900805397",
    instagram: "https://www.instagram.com/pradameself/",
    x: "https://x.com/pradameself",
    resume: "/resume.pdf", // drop your PDF into /public/resume.pdf
  },

  // Back of the player card in the hero
  card: {
    position: "Backend-focused developer",
    stats: [
      { label: "From", value: "Nigeria, West Africa" },
      { label: "Based in", value: "📍 Greater Toronto Area" },
      { label: "Club", value: "Durham College, Computer Programming & Analysis" },
      { label: "Main moves", value: "PHP, Java, Python, C#" },
      { label: "Off the clock", value: "Soccer, games, music, nature, swag" },
    ],
    sideQuest: {
      label: "Side quest",
      name: "NOKEMONO",
      text: "A streetwear label I run on the side.",
      href: "https://nokemono.com",
    },
  },

  work: [
    {
      title: "M&S Hosting Solutions",
      role: "Freelance client",
      summary:
        "Marketing site for a GTA short-term rental company, built around their real properties and brand.",
      stack: ["Next.js", "Supabase", "Tailwind", "Resend", "Vercel"],
      href: "https://mshostingsolutions.ca/",
    },
    {
      title: "JobBoard",
      role: "Personal project",
      summary: "A job listing app built in React.", // TODO: describe features
      stack: ["React"],
    },
    {
      title: "Keyboard Warriors",
      role: "Personal project",
      summary: "A game built in Godot.", // TODO: describe gameplay
      stack: ["Godot"],
    },
    {
      title: "Multi-tier AWS architecture",
      role: "Coursework",
      summary: "Designed and deployed a VPC with EC2 and Aurora across public and private tiers.",
      stack: ["AWS", "VPC", "EC2", "Aurora"],
    },
    {
      title: "Claims processing on z/OS",
      role: "Coursework",
      summary: "Insurance claims processing programs in COBOL, run with JCL through Zowe Explorer.",
      stack: ["COBOL", "JCL", "z/OS"],
    },
  ] as WorkItem[],

  // Contact section
  contact: {
    heading: "Let's build something that holds up.",
    text: "I bring backend depth, kitchen-tested discipline and follow-through to every team I join. If that's what your team needs, let's talk.",
  },

  // Starting XI in a 4-3-3. Order within each line = left to right on the pitch.
  // No. 11 is drawn in red.
  lineup: [
    { name: "HTML & CSS", number: 7, line: "FWD" },
    { name: "React", number: 9, line: "FWD" },
    { name: "Next.js", number: 11, line: "FWD" },
    { name: "Python", number: 8, line: "MID" },
    { name: "JavaScript", number: 6, line: "MID" },
    { name: "TypeScript", number: 10, line: "MID" },
    { name: "PHP", number: 3, line: "DEF" },
    { name: "MySQL", number: 4, line: "DEF" },
    { name: "Java", number: 5, line: "DEF" },
    { name: "C#", number: 2, line: "DEF" },
    { name: "Linux", number: 1, line: "GK" },
  ] as Player[],
  bench: ["COBOL", "JCL", "AWS", "Selenium", "Tailwind", "Supabase"],

  about: [
    "I learn by building. Most of my time goes into backend work: PHP, Java, Python and C#, databases, and lately mainframe COBOL and AWS.",
    "Before code, I worked in kitchens. It taught me to move fast under pressure, keep a clean station and finish every ticket. VAO is where I bring that same discipline to client work.",
  ],
  motto: "The underdog story is the realest story there is.",
};