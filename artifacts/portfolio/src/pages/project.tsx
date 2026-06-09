import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectBySlug } from "@/data/projects";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const [showStickyTitle, setShowStickyTitle] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky title after scrolling past the hero (~40vh)
      setShowStickyTitle(window.scrollY > window.innerHeight * 0.35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-gray-500 font-sans tracking-widest uppercase text-sm">
        Project not found.{" "}
        <Link href="/" className="ml-4 text-primary underline">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="film-grain" />

      {/* Fixed nav bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/5">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="font-sans text-xs tracking-widest uppercase cursor-pointer text-gray-400 hover:text-white transition-colors">
              &larr; Gabriel Brosius
            </span>
          </Link>
          <span className="font-sans text-xs tracking-widest uppercase text-gray-600">
            {project.category === "music-video" ? "Music Video" : "Film"}
          </span>
        </div>

        {/* Sticky title — slides in below the nav row */}
        <AnimatePresence>
          {showStickyTitle && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="px-6 py-3 flex items-baseline gap-4">
                <h2 className="font-serif text-lg text-white uppercase tracking-tight leading-none">
                  {project.title}
                </h2>
                <span className="text-xs font-sans text-gray-600 uppercase tracking-widest hidden sm:block">
                  {project.year} — {project.role}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero image — shorter */}
      <motion.div
        className="w-full h-[42vh] overflow-hidden relative pt-[57px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/55 z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-16 pb-8 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="text-xs font-sans tracking-[0.3em] uppercase text-primary mb-3">
              {project.year} — {project.detail}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tighter leading-none mb-3">
              {project.title}
            </h1>
            <div className="text-xs font-sans tracking-widest text-gray-400 uppercase">
              {project.role}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20">

        {/* Logline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="font-serif text-2xl md:text-4xl text-gray-200 leading-snug mb-8">
            {project.logline}
          </p>
          {project.note && (
            <p className="text-sm font-sans text-primary tracking-wide italic mb-6">
              {project.note}
            </p>
          )}
          {project.externalLink && (
            <a
              href={project.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-sans uppercase tracking-widest border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-black transition-all duration-300"
            >
              {project.externalLink.label} &rarr;
            </a>
          )}
        </motion.div>

        {/* Video — only shown when a URL exists */}
        {project.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-primary mb-8">
              Video
            </h2>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={project.videoUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Gallery — only shown when real photos exist */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-primary mb-8">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`${project.title} still ${i + 1}`}
                  className="w-full object-cover"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <footer className="py-8 text-center text-xs tracking-widest uppercase text-gray-700 border-t border-border bg-black">
        <Link href="/">
          <span className="hover:text-primary transition-colors cursor-pointer">
            &larr; Back to portfolio
          </span>
        </Link>
      </footer>
    </div>
  );
}
