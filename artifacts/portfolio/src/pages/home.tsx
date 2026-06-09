import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { filmProjects, musicVideoProjects } from "@/data/projects";

const NAV_LINKS = [
  { label: "Bio", href: "#bio" },
  { label: "Film", href: "#film" },
  { label: "Music Videos", href: "#music-videos" },
  { label: "Television", href: "#television" },
  { label: "Theater", href: "#theater" },
  { label: "Awards", href: "#awards" },
  { label: "Education", href: "#education" },
  { label: "Administrative", href: "#administrative" },
  { label: "Contact", href: "#contact" },
];

const adminExperience = [
  {
    org: "The Atlantic Magazine",
    role: "Event Technology & Streaming Coordinator",
    year: "",
    description:
      "Handle platform setup, content management, onsite execution, and live stream coordination, then write copy for YouTube and other digital platforms.",
  },
  {
    org: "The Daily Show",
    role: "Intern",
    year: "2025",
    description:
      "Assisting with audience management and collaborating with the art, costume, and editing departments to keep production running smoothly.",
  },
  {
    org: "Disneyland Resort",
    role: "Entertainment Consultant",
    year: "2022",
    description:
      "Assessed and advised on guest-facing theatrical performances at California Disney Parks.",
  },
  {
    org: "Atlantic Theater Company",
    role: "Literary Intern",
    year: "2018",
    description:
      "Wrote coverage of scripts and productions for Annie MacRae and Abigail Katz while producing a six-day MixFest Festival and Atlantic social events.",
  },
];

const tvProjects = [
  {
    title: "Take The Hit",
    year: "2025",
    format: "60 min, Serialized",
    logline: "Desperate to save more patients, a transplant surgeon sources organs from an assassin.",
  },
  {
    title: "Humor Me",
    year: "2025",
    format: "30 min, Serialized",
    logline: "A suburbanite drops everything and goes to Italy for clown school in the hopes to win back her ex.",
  },
  {
    title: "HomeBody",
    year: "2024",
    format: "30 min, Serialized",
    logline: "An agoraphobe lucid dreams to explore the outside world.",
    note: "Quarterfinalist, ScreenCraft Animation and Family 2024",
  },
];

const theaterProjects = [
  {
    title: "I and You",
    role: "Director",
    venue: "Wesleyan University's Second Stage",
    year: "2018",
    logline: "Collaborated with playwright Lauren Gunderson to direct a queer retelling.",
  },
  {
    title: "Saboteur",
    role: "Co-Director",
    venue: "STAG Nights Festival",
    year: "2019",
    logline: "An original production based on the BBC show Trapped!",
  },
  {
    title: "The Love of Three Oranges",
    role: "Assistant Director",
    venue: "Oddfellows Playhouse",
    year: "2020",
    logline: "Assisted Dic Wheeler in an inventive commedia dell'arte.",
  },
];

const awards = [
  { title: "Best Comedy Short", festival: "Corto Colonna Festival", year: "2025", project: "The Straightening" },
  { title: "Finalist", festival: "East Village Film Festival", year: "2025", project: "The Straightening" },
  { title: "Official Selection", festival: "Bahia Independent Cinema Festival", year: "2025", project: "The Straightening" },
  { title: "Official Selection", festival: "Duemila30", year: "2026", project: "The Straightening" },
  { title: "Quarterfinalist", festival: "ScreenCraft Animation and Family", year: "2024", project: "HomeBody" },
];

const education = [
  { degree: "MFA in Television Writing", school: "Stony Brook University / Killer Films" },
  { degree: "BA in Neuroscience and Theater", school: "Wesleyan University" },
  { degree: "'Le Jeu' / 'Game' Course", school: "Ecole Philippe Gaulier" },
  { degree: "Semester Abroad", school: "Glasgow University" },
  { degree: "Improv", school: "Upright Citizens Brigade" },
  { degree: "Sketch Writing", school: "Brooklyn Comedy Collective" },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof filmProjects)[number];
  index: number;
}) {
  return (
    <motion.div
      className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 lg:gap-24 items-center`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <div className="w-full md:w-3/5 overflow-hidden">
        <Link href={`/project/${project.slug}`}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="cursor-pointer relative group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
              <span className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans">
                View Project
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
      <div className="w-full md:w-2/5 flex flex-col justify-center">
        <div className="text-xs font-sans tracking-[0.2em] text-gray-500 mb-2 uppercase">
          {project.year} — {project.detail}
        </div>
        <Link href={`/project/${project.slug}`}>
          <h3 className="text-3xl md:text-4xl font-serif mb-3 text-white hover:text-primary transition-colors cursor-pointer">
            {project.title}
          </h3>
        </Link>
        <div className="text-xs font-sans tracking-widest text-primary uppercase mb-4">
          {project.role}
        </div>
        <p className="text-base text-gray-400 font-sans leading-relaxed max-w-md mb-4">
          {project.logline}
        </p>
        {project.note && (
          <p className="text-xs text-gray-600 font-sans italic">{project.note}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden selection:bg-primary selection:text-white">
      <div className="film-grain"></div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-sm border-b border-white/5" : "bg-transparent border-b border-transparent"}`}>
        <div className="px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-serif text-base tracking-widest uppercase text-white">
            Gabriel Brosius
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-sans uppercase tracking-widest transition-colors pb-0.5 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-primary" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 group"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/5 bg-black/95 lg:hidden"
            >
              <div className="flex flex-col px-6 py-4">
                {NAV_LINKS.map((link) => {
                  const id = link.href.slice(1);
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`py-3 text-sm font-sans uppercase tracking-widest transition-colors border-b border-white/5 last:border-0 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 mb-0.5" />}
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src="/images/drink-me-1.jpg" alt="Gabriel Brosius" className="w-full h-full object-cover scale-[1.12] object-[center_30%]" />
        </motion.div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white uppercase tracking-tighter leading-none mb-6">
              Gabriel Brosius
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1 }}>
            <p className="text-lg md:text-xl font-sans tracking-[0.2em] text-gray-300 uppercase">
              Writer &nbsp;/&nbsp; Director
            </p>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-xs tracking-widest uppercase text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Scroll
        </motion.div>
      </section>

      {/* Bio */}
      <section id="bio" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-background relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-8">Director's Statement</h2>
            <div className="font-serif text-2xl md:text-4xl lg:text-5xl leading-tight md:leading-snug text-gray-200">
              <p className="mb-8">
                Passionate about creating innovative queer cinema and theater that explore identity, love, and transformation through both experimental and narrative approaches.
              </p>
              <p className="text-gray-500">Based in New York City.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Film */}
      <section id="film" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-black relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Selected Film Experience
          </motion.h2>
          <div className="space-y-16">
            {filmProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Music Videos */}
      <section id="music-videos" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-background relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Music Videos
          </motion.h2>
          <div className="space-y-16">
            {musicVideoProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Television */}
      <section id="television" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-black relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Selected Television Writing Experience
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
            {tvProjects.map((project, i) => (
              <motion.div
                key={i}
                className="bg-black p-8 md:p-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="text-xs font-sans tracking-[0.2em] text-gray-500 mb-3 uppercase">
                  {project.year} — {project.format}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">{project.title}</h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed mb-3">{project.logline}</p>
                {project.note && (
                  <p className="text-xs text-primary font-sans italic tracking-wide">{project.note}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Theater */}
      <section id="theater" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-background relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Selected Theater Experience
          </motion.h2>
          <div className="space-y-0 divide-y divide-gray-800">
            {theaterProjects.map((project, i) => (
              <motion.div
                key={i}
                className="py-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-16"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="md:w-48 shrink-0">
                  <div className="text-xs font-sans tracking-widest text-gray-600 uppercase mb-1">{project.year}</div>
                  <div className="text-xs font-sans tracking-widest text-primary uppercase">{project.role}</div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{project.title}</h3>
                  <div className="text-xs font-sans tracking-widest text-gray-600 uppercase mb-4">{project.venue}</div>
                  <p className="text-base text-gray-400 font-sans leading-relaxed">{project.logline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section id="awards" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-black relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Recognition
          </motion.h2>
          <div className="space-y-0 divide-y divide-gray-800">
            {awards.map((item, i) => (
              <motion.div
                key={i}
                className="py-6 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="md:w-16 text-xs font-sans text-gray-600 tracking-widest">{item.year}</div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">{item.title}</h3>
                  <div className="text-sm font-sans text-gray-500 tracking-widest uppercase">
                    {item.festival} <span className="text-gray-700 mx-2">—</span> {item.project}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-background relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {education.map((item, i) => (
              <motion.div
                key={i}
                className="border-l border-primary/40 pl-5"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <div className="font-serif text-lg text-white mb-1 leading-snug">{item.degree}</div>
                <div className="text-xs font-sans text-gray-600 tracking-widest uppercase">{item.school}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Administrative */}
      <section id="administrative" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-black relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            className="text-sm font-sans tracking-[0.3em] uppercase text-primary mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Administrative Experience
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
            {adminExperience.map((item, i) => (
              <motion.div
                key={i}
                className="bg-black p-10 md:p-14"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="text-xs font-sans tracking-[0.2em] text-gray-600 mb-3 uppercase">
                  {item.year || "Current"}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{item.org}</h3>
                <div className="text-xs font-sans tracking-widest text-primary uppercase mb-4">{item.role}</div>
                <p className="text-base text-gray-400 font-sans leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-background relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-20">
          {/* Photo — left */}
          <motion.div
            className="w-full md:w-64 lg:w-72 shrink-0 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/gabriel-portrait.jpg"
              alt="Gabriel Brosius"
              className="w-full object-cover grayscale-[0.15]"
              style={{ aspectRatio: "2/3", objectPosition: "left 15%" }}
            />
          </motion.div>

          {/* Text + form — right */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 uppercase tracking-tighter">
              Let's Make <br /> Something
            </h2>
            <p className="text-sm font-sans text-gray-500 tracking-widest uppercase mb-8">
              Looking for a Director, Writer, Editor, or ______?
            </p>

            {formStatus === "success" ? (
              <p className="text-primary font-sans tracking-widest text-sm uppercase mb-8">
                Message sent — talk soon.
              </p>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus("sending");
                  try {
                    const res = await fetch("https://formsubmit.co/ajax/gmbrosius@gmail.com", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Accept: "application/json" },
                      body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        message: form.message,
                        _subject: "New message from portfolio",
                        _captcha: "false",
                      }),
                    });
                    const data = await res.json();
                    if (data.success === "true" || data.success === true) {
                      setFormStatus("success");
                      setForm({ name: "", email: "", message: "" });
                    } else {
                      setFormStatus("error");
                    }
                  } catch {
                    setFormStatus("error");
                  }
                }}
                className="space-y-4 mb-8"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="flex-1 bg-transparent border border-gray-700 text-white text-sm font-sans px-4 py-3 placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="flex-1 bg-transparent border border-gray-700 text-white text-sm font-sans px-4 py-3 placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-transparent border border-gray-700 text-white text-sm font-sans px-4 py-3 placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors resize-none"
                />
                {formStatus === "error" && (
                  <p className="text-red-500 text-xs font-sans tracking-widest uppercase">
                    Something went wrong — try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="text-xs font-sans tracking-[0.3em] uppercase text-black bg-primary px-8 py-3 hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {formStatus === "sending" ? "Sending…" : "Send"}
                </button>
              </form>
            )}

            <div className="flex gap-8 text-sm font-sans tracking-[0.2em] uppercase">
              <a href="https://www.instagram.com/gabrielbrosius/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="http://www.linkedin.com/in/gabriel-brosius-554b2713b" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="https://drive.google.com/file/d/1KNRBNcNuUq5sTUbq93CrTZx769xwCQNU/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs tracking-widest uppercase text-gray-700 border-t border-border bg-black relative z-20">
        &copy; {new Date().getFullYear()} Gabriel Brosius. All rights reserved.
      </footer>
    </div>
  );
}
