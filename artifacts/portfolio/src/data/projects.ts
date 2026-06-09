export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  detail: string;
  logline: string;
  note?: string;
  image: string;
  category: "film" | "music-video";
  videoUrl?: string;
  externalLink?: { label: string; url: string };
  gallery?: string[];
};

export const filmProjects: Project[] = [
  {
    slug: "the-straightening",
    title: "The Straightening",
    year: "2025",
    role: "Writer | Director | Editor",
    detail: "6.5 min",
    logline:
      "When the queer population starts turning straight, a hopeless romantic races to find a cure.",
    note: "Winner, Best Comedy Short — Corto Colonna Festival 2025 · Finalist — East Village Film Festival 2024 · Official Selection — Bahia Independent Cinema Festival · Official Selection — Duemila30",
    image: "/images/film-1.png",
    category: "film",
    videoUrl: "https://www.youtube.com/embed/P_PCT1A9BCI",
  },
  {
    slug: "before-we-go",
    title: "Before We Go",
    year: "In Post-Production",
    role: "Writer | Lead Actor",
    detail: "8 min",
    logline:
      "A gay couple completes the items on their Couple's Bucket List before they break up.",
    image: "/images/before-we-go.jpg",
    category: "film",
  },
  {
    slug: "my-father-my-captain-and-me",
    title: "My Father, My Captain, and Me",
    year: "2023",
    role: "Writer | Director | Editor",
    detail: "5 min",
    logline:
      "Abandoned by his father, a boy looks for guidance from the surreal talking portraits of his ancestors.",
    image: "/images/mfmc-1.png",
    category: "film",
    gallery: [
      "/images/mfmc-1.png",
      "/images/mfmc-2.png",
      "/images/mfmc-3.png",
      "/images/mfmc-4.png",
    ],
  },
  {
    slug: "8-pills-and-counting",
    title: "8 Pills and Counting",
    year: "2020",
    role: "Writer | Director | Editor",
    detail: "45 min — Minnesota Fringe Festival",
    logline: "Interview-based play about queer men with schizophrenia.",
    image: "/images/8pills-1.png",
    category: "film",
    videoUrl: "https://www.youtube.com/embed/WOlJZSWM7D4",
    gallery: [
      "/images/8pills-1.png",
      "/images/8pills-2.png",
      "/images/8pills-3.png",
      "/images/8pills-4.png",
    ],
  },
  {
    slug: "the-flying-doctor",
    title: "The Flying Doctor",
    year: "2020",
    role: "Director | Adaptor | Editor",
    detail: "46 min — Equality Productions",
    logline:
      "Reimagined production exploring technology, queerness, and deception using original music.",
    image: "/images/flying-doctor-1.png",
    category: "film",
    videoUrl: "https://www.youtube.com/embed/plzLFWziyP4",
    gallery: [
      "/images/flying-doctor-1.png",
      "/images/flying-doctor-2.png",
      "/images/flying-doctor-3.png",
      "/images/flying-doctor-4.png",
    ],
  },
];

export const musicVideoProjects: Project[] = [
  {
    slug: "drink-me",
    title: "Drink Me",
    year: "2025",
    role: "Writer | Director | Editor",
    detail: "Music Video / Interactive Video Game",
    logline:
      "An interactive choose-your-own-adventure about falling in love with a mannequin-esque lover(s).",
    image: "/images/drink-me-1.jpg",
    category: "music-video",
    videoUrl: "https://www.youtube.com/embed/MkDfEF2_liI",
    gallery: [
      "/images/drink-me-5.jpg",
      "/images/drink-me-1.jpg",
      "/images/drink-me-2.jpg",
      "/images/drink-me-3.jpg",
      "/images/drink-me-4.jpg",
    ],
    externalLink: {
      label: "Play the Game",
      url: "https://sundaymanistosaari.itch.io/drink-me",
    },
  },
  {
    slug: "drink-me-tiny-desk-live",
    title: "Drink Me — Tiny Desk Live",
    year: "2025",
    role: "Director / Writer",
    detail: "Live Performance",
    logline: "A live Tiny Desk-style performance of Drink Me.",
    image: "/images/film-3.png",
    category: "music-video",
    videoUrl: "https://www.youtube.com/embed/gDo8MP2vQNI",
  },
];

export const allProjects: Project[] = [...filmProjects, ...musicVideoProjects];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
