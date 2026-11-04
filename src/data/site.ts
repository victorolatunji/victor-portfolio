// Edit everything about the site's content here.
// Lines marked TODO need your real info.
// House rule for copy: no em dashes. Use a colon or a bullet ( · ) instead.
//
// PHOTOS: any piece, shoe or accessory can use a real photo instead of the drawing.
// Drop the file in /public/closet/ and add  image: "/closet/your-file.png"
// Best results: transparent PNG (background removed), item centred, roughly
//   rail pieces 800 x 1000 · shoes 900 x 520 · accessories 400 x 400.
// No image = the built-in drawing is used.

export type Kind =
  | "coat"
  | "hoodie"
  | "jacket"
  | "jeans"
  | "sweatpants"
  | "jorts"
  | "shirt";

export type Piece = {
  slug: string; // used for "most worn" stats; keep it stable once live
  title: string;
  kind: Kind;
  color: string; // main fabric colour
  type: "project" | "brand" | "commission";
  role?: string;
  year?: string;
  status?: string; // e.g. "In production"
  summary: string;
  points?: string[];
  stack?: string[];
  link?: { label: string; href: string };
  image?: string; // optional photo, e.g. "/closet/coat.png"
};

export type Shoe = {
  name: string;
  kind: "workboot" | "hightop" | "runner" | "clog";
  label: string; // what it opens
  href: string;
  image?: string; // optional photo
};

export type Accessory = {
  skill: string;
  item: string; // the accessory it's "worn" as
  icon: Icon;
  image?: string; // optional photo
};

export type Icon =
  | "chain" | "ring" | "cufflinks" | "tieclip" | "lighter"
  | "watch" | "bracelet" | "studs" | "pendant"
  | "glasses" | "carkey" | "pen" | "cardholder" | "scarf" | "pocketsquare"
  | "trucker" | "headphones"
  | "keyring" | "belt" | "gloves" | "perfume" | "beanie" | "pocketwatch";

export type Job = { role: string; company: string; dates: string; summary: string };

export const site = {
  brand: "VAO",
  fullName: "Victor Ayodeji Olatunji",
  shortName: "Victor Olatunji",
  role: "Full-stack developer",
  location: "Greater Toronto Area",
  email: "victorayodejiolatunji@gmail.com",
  links: {
    github: "https://github.com/victorolatunji",
    linkedin: "https://www.linkedin.com/in/victor-a-olatunji-900805397",
    instagram: "https://www.instagram.com/pradameself/",
    x: "https://x.com/pradameself",
    resume: "/resume.pdf",
  },

  hero: {
    kicker: "The private collection of",
    title: "Victor Olatunji",
    line: "Full-stack developer, front end to back end. A private collection of software: every piece designed, built and delivered in-house.",
    primary: "View the collection",
    secondary: "Request a viewing",
  },

  // ---------- The rail ----------
  // Drag to rearrange is built in; order here is the default order.
  rail: [
    {
      slug: "ms-hosting",
      title: "M&S Hosting Solutions",
      kind: "coat",
      color: "#111214",
      type: "project",
      role: "Freelance full-stack developer",
      year: "2026",
      summary:
        "Live marketing site for a GTA short-term rental company, designed around their real properties and brand.",
      points: [
        "Took the project from homepage mockup with the client's real property data through build and deployment.",
        "Integrated Supabase for data and Resend for email, deployed on Vercel.",
      ],
      stack: ["Next.js", "Supabase", "Tailwind", "Resend", "Vercel"],
      link: { label: "Visit the live site", href: "https://mshostingsolutions.ca/" },
    },
    {
      slug: "keys-militia",
      title: "Keys Militia",
      kind: "hoodie",
      color: "#b3261e",
      type: "project",
      role: "Founder and game developer, VAO",
      year: "2026",
      status: "In production",
      summary:
        "VAO's first original game: a fast, multiplayer-style web shooter where you fight by typing.",
      points: [
        "Built on the ideas behind my Keyboard Warriors capstone, rebuilt for the browser.",
        "Designed to run cheaply in any browser, no install needed.",
      ],
      stack: ["Phaser", "TypeScript"],
      // link: { label: "Play Keys Militia", href: "" }, TODO: add once there's a playable build
    },
    {
      slug: "lakeridge-db",
      title: "Lakeridge Hospital Database",
      kind: "jeans",
      color: "#3c4a5c",
      type: "project",
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
      slug: "couldit-be-this-swag",
      title: "CouldItBeThisSWAG",
      kind: "shirt",
      color: "#f4f5f6",
      type: "project",
      role: "Founder and developer",
      year: "2026",
      status: "In production",
      summary:
        "Personal shopping and sourcing service. Clients build a wishlist, connect with a shopper or stylist, and get pieces from designers, luxury brands and artists delivered.",
      stack: ["Next.js", "Sourcing platform"],
      // link: { label: "Visit CouldItBeThisSWAG", href: "" }, TODO: add once live
    },
    {
      slug: "nokemono",
      title: "NOKEMONO",
      kind: "sweatpants",
      color: "#8d939b",
      type: "brand",
      role: "Founder",
      year: "2026",
      summary:
        "My streetwear label, rooted in Japanese outsider culture and code. Consider this a taste: Drop 1 is a three-piece polo capsule.",
      link: { label: "Step into NOKEMONO", href: "https://nokemono.com" },
    },
    {
      slug: "your-commission",
      title: "Your piece",
      kind: "jorts",
      color: "#d9dce0",
      type: "commission",
      summary:
        "This hanger is reserved. Bring an idea for an app, a website or a game, and it could be the next piece in the collection.",
      link: { label: "Commission a piece", href: "#contact" },
    },
  ] as Piece[],

  // ---------- Shoe shelf (quick links) ----------
  shoes: [
    { name: "Work boot", kind: "workboot", label: "GitHub", href: "https://github.com/victorolatunji" },
    { name: "Chunky high-top", kind: "hightop", label: "LinkedIn", href: "https://www.linkedin.com/in/victor-a-olatunji-900805397" },
    { name: "Olive runner", kind: "runner", label: "Résumé", href: "/resume.pdf" },
    { name: "Suede clog", kind: "clog", label: "Instagram", href: "https://www.instagram.com/pradameself/" },
  ] as Shoe[],

  // ---------- The carry-on (skills as accessories, none repeated) ----------
  carryOn: [
    {
      label: "Backend",
      items: [
        { skill: "Java", item: "Cuban link chain", icon: "chain" },
        { skill: "Python", item: "Signet ring", icon: "ring" },
        { skill: "C#", item: "Cufflinks", icon: "cufflinks" },
        { skill: "PHP", item: "Tie clip", icon: "tieclip" },
        { skill: "Node.js", item: "Lighter", icon: "lighter" },
      ],
    },
    {
      label: "Data",
      items: [
        { skill: "SQL Server", item: "Gold watch", icon: "watch" },
        { skill: "MySQL", item: "Tennis bracelet", icon: "bracelet" },
        { skill: "Supabase", item: "Diamond studs", icon: "studs" },
        { skill: "ERD & 3NF", item: "Iced Jesus piece", icon: "pendant" },
      ],
    },
    {
      label: "Frontend",
      items: [
        { skill: "React", item: "Rimless glasses", icon: "glasses" },
        { skill: "Next.js", item: "Car key", icon: "carkey" },
        { skill: "TypeScript", item: "Fountain pen", icon: "pen" },
        { skill: "JavaScript", item: "Card holder", icon: "cardholder" },
        { skill: "HTML & CSS", item: "Silk scarf", icon: "scarf" },
        { skill: "Tailwind", item: "Pocket square", icon: "pocketsquare" },
      ],
    },
    {
      label: "Games",
      items: [
        { skill: "Godot", item: "Trucker cap", icon: "trucker" },
        { skill: "Phaser", item: "Headphones", icon: "headphones" },
      ],
    },
    {
      label: "Tools & cloud",
      items: [
        { skill: "Git", item: "Key ring", icon: "keyring" },
        { skill: "Linux", item: "Leather belt", icon: "belt" },
        { skill: "AWS", item: "Leather gloves", icon: "gloves" },
        { skill: "Vercel", item: "Fragrance", icon: "perfume" },
        { skill: "Selenium", item: "Beanie", icon: "beanie" },
        { skill: "COBOL", item: "Pocket watch", icon: "pocketwatch" },
      ],
    },
  ] as { label: string; items: Accessory[] }[],

  // ---------- The mirror ----------
  about: [
    "I build across the whole stack: interfaces people enjoy using, and the backend logic, data and infrastructure that keep them standing. PHP, Java, Python and C# on the server, React and Next.js on the front, and more recently mainframe COBOL and AWS cloud architecture.",
    "Off the clock you'll find me on the soccer pitch, deep in a playlist, outdoors, or working on NOKEMONO, my streetwear label.",
  ],
  motto: "The underdog story is the realest story there is.",

  // Written on the chalkboard: what's happening right now.
  now: {
    heading: "Right now",
    items: [
      "Building Keys Militia, VAO's first game",
      "Counting down to graduation",
      "Prepping NOKEMONO's first drop",
      "Assembling the CouldItBeThisSWAG team",
      "Hiring through VAO: contract roles open",
    ],
  },
  facts: [
    { label: "From", value: "Nigeria" },
    { label: "Based in", value: "Greater Toronto Area" },
    { label: "Studying", value: "Computer Programming & Analysis, Durham College" },
    { label: "GPA", value: "4.79 / 5" },
  ],

  // ---------- Care labels ----------
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
      summary:
        "Design, build and deploy full-stack client websites end to end, from mockup to launch. Clients include M&S Hosting Solutions.",
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

  guestList: {
    heading: "Sign the guest list.",
    text: "Say a word on your way out.",
  },

  contact: {
    heading: "Request a private viewing.",
    text: "Have a piece in mind, or want a seat at the table? Commission an app, a website or a game, or join the VAO team and help build the next collection.",
    options: ["Commission a piece", "Join the VAO team", "Just say hello"],
  },

  footerLabel: {
    text: "From the same atelier",
    name: "NOKEMONO",
    href: "https://nokemono.com",
  },
};
