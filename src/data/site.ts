// Edit everything about the site's content here.
// Lines marked TODO need your real info.

export type WorkItem = {
  title: string;
  role: string;
  year: string;
  summary: string;
  points?: string[];
  stack: string[];
  href?: string;
  status?: string;
};

export type Job = {
  role: string;
  company: string;
  dates: string;
  summary: string;
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
  role: "Backend-focused developer",
  greeting: "Meet Him: Victor Olatunji.",
  headline: "Most people see the interface. I build what holds it up.",
  taglines: [
    "Backend development",
    "Software Development",
    "Game development",
    "Full-stack web applications",
    "Database design",
    "Clean, maintainable code",
  ],
  intro:
    "A Computer Programming & Analysis student at Durham College and the founder of VAO, Victor designs full-stack applications around clean data, sound backend logic and code that stays dependable long after launch.",
  status: { text: "Now shipping for M&S Hosting Solutions", href: "https://mshostingsolutions.ca/" },
  email: "victorayodejiolatunji@gmail.com",
  photo: "/victor-2.jpg",
  links: {
    github: "https://github.com/victorolatunji",
    linkedin: "https://www.linkedin.com/in/victor-a-olatunji-900805397",
    instagram: "https://www.instagram.com/pradameself/",
    x: "https://x.com/pradameself",
    resume: "/resume.pdf", // put your PDF at /public/resume.pdf
  },

  // Back of the player card in the hero
  card: {
    stats: [
      { label: "From", value: "Nigeria, West Africa" },
      { label: "Based in", value: "Greater Toronto Area" },
      { label: "Main moves", value: ["PHP", "Java", "Python", "C#"] },
      { label: "Off the clock", value: ["Soccer", "Games", "Music", "Nature", "Swag"] },
    ],
    sideQuest: {
      label: "Side quest",
      name: "NOKEMONO",
      text: "A streetwear brand I run on the side.",
      href: "https://nokemono.com",
    },
  },

  work: [
    {
      title: "M&S Hosting Solutions",
      role: "Freelance full-stack developer",
      year: "2026",
      summary:
        "Live marketing site for a GTA short-term rental company, designed around their real properties and brand.",
      points: [
        "Took the project from homepage mockup with the client's real property data through build and deployment.",
        "Integrated Supabase for data and Resend for email, deployed on Vercel.",
      ],
      stack: ["Next.js", "Supabase", "Tailwind", "Resend", "Vercel"],
      href: "https://mshostingsolutions.ca/",
    },
    {
      title: "Keyboard Warriors",
      role: "Game developer, capstone project",
      year: "2025",
      status: "Private capstone project",
      summary:
        "PC typing game that helps middle school students build typing skills by defeating waves of approaching enemies, one word at a time.",
      points: [
        "Live input matching with on-screen highlights, and waves that scale word difficulty.",
        "Power bar that clears the battlefield every 6 kills, plus a 3-life animated health system.",
        "Full UI flow: main menu, HUD, pause menu, wave announcements and game over screen.",
      ],
      stack: ["Godot 4", "C#", "Git"],
    },
    {
      title: "JobBoard",
      role: "Full-stack developer",
      year: "2025",
      summary: "Single-page app for posting, browsing, filtering and managing job listings.",
      points: [
        "Search by title or company, with filters for job type and salary.",
        "Custom useItems hook centralizes data logic and localStorage persistence, shared through the Context API.",
        "Detail, edit and create views with React Router v6, deployed to Netlify.",
      ],
      stack: ["React", "React Router v6", "Context API", "Bootstrap 5", "Vite", "Netlify"],
      // href: "", TODO: live link or GitHub repo
    },
    {
      title: "Lakeridge Community Hospital Database",
      role: "Database designer",
      year: "2025",
      summary: "Relational database covering patients, bookings, billing, staff and activity tracking.",
      points: [
        "Fully normalized to 3NF, with integrity enforced through PK and FK constraints.",
        "SQL queries for reporting, revenue analysis and auditing.",
      ],
      stack: ["SQL Server", "SSMS", "ERD", "3NF"],
    },
    {
      title: "CouldItBeThisSWAG",
      role: "Founder and developer",
      year: "2026",
      status: "In progress",
      summary:
        "Personal shopping and sourcing service. Clients build a wishlist, connect with a shopper/stylist, and get pieces from designers, luxury brands and artists delivered.",
      stack: ["Web app", "Sourcing platform"],
    },
  ] as WorkItem[],

  experience: [
    {
      role: "AI Data Annotator (Remote)",
      company: "Handshake AI",
      dates: "Jun 2026 → Present",
      summary: "Annotate and evaluate data used to train and improve AI models.",
    },
    {
      role: "AI Trainer (Remote)",
      company: "Outlier AI",
      dates: "Apr 2026 → Aug 2026",
      summary: "Wrote, reviewed and rated model responses for accuracy and quality.",
    },
    {
      role: "Freelance Full-Stack Developer",
      company: "Self-employed",
      dates: "", // TODO: add start date, e.g. "Jan 2026 → Present"
      summary: "Design, build and deploy full-stack client websites end to end, from mockup to launch. Clients include M&S Hosting Solutions.",
    },
    {
      role: "Tech Support and Maintenance",
      company: "Skyfarm Food Mart",
      dates: "May 2025 → Jan 2026",
      summary: "Kept store systems and equipment running through troubleshooting, repairs and routine maintenance.",
    },
  ] as Job[],

  education: {
    program: "Computer Programming & Analysis",
    school: "Durham College",
    dates: "Expected Apr 2027",
    detail: "GPA 4.79 / 5",
  },

  vao: {
    heading: "Technology built to last, and built to grow.",
    text: "VAO is a technology company building apps, websites and games. We're growing our network of developers, designers and artists, with roles offered on base pay or commission. If you have an idea worth building, we'd like to hear it.",
    offers: ["App development", "Web development", "Game development"],
    cta: "Partner with VAO",
  },

  // Starting XI in a 4-3-3. Order within each line = left to right on the pitch.
  lineup: [
    { name: "HTML & CSS", number: 7, line: "FWD" },
    { name: "React", number: 9, line: "FWD" },
    { name: "Next.js", number: 11, line: "FWD" },
    { name: "Python", number: 8, line: "MID" },
    { name: "JavaScript", number: 6, line: "MID" },
    { name: "TypeScript", number: 10, line: "MID" },
    { name: "PHP", number: 3, line: "DEF" },
    { name: "SQL Server", number: 4, line: "DEF" },
    { name: "Java", number: 5, line: "DEF" },
    { name: "C#", number: 2, line: "DEF" },
    { name: "Linux", number: 1, line: "GK" },
  ] as Player[],
  bench: ["MySQL", "Godot", "COBOL", "JCL", "AWS", "Selenium", "Tailwind", "Supabase", "Git"],

  about: [
        "I learn by building. Most of my work lives on the backend: PHP, Java, Python and C#, relational databases, and more recently mainframe COBOL and AWS cloud architecture.",
    "Off the clock, you'll find me on the soccer pitch, deep in a playlist or outdoors. The same things that make a good teammate shape how I work: consistency, clear communication and following through until the job is done right.",],
  motto: "The underdog story is the realest story there is.",

  contact: {
    heading: "Let's build something that holds up.",
    text: "I bring backend depth, kitchen-tested discipline and follow-through to every team I join. If that's what your team needs, let's talk.",
  },
};