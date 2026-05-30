"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Tag } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import styles from "./Projects.module.css";
import { Reveal } from "./Reveal";
import { useState, useEffect } from "react";

const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov') || url.includes('/video/upload/') || url.includes('.mp4?');
};

interface Project {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    github?: string;
    link?: string;
}

const DEFAULT_PROJECTS: Project[] = [
    {
        title: "EcoTrack Mobile App",
        description: "A comprehensive Flutter application for tracking personal carbon footprint and promoting sustainable habits with real-time analytics and gamification.",
        image: "/projects/ecotrack_preview.png",
        tags: ["Flutter", "Firebase", "Dart", "Charts"],
        github: "#",
        link: "#",
    },
    {
        title: "Nexus Admin Dashboard",
        description: "A sleek React SaaS dashboard for project management featuring dark mode, glassmorphism UI, drag-and-drop kanban, and real-time collaboration.",
        image: "/projects/nexus_preview.png",
        tags: ["React", "Next.js", "TypeScript", "Framer Motion"],
        github: "#",
        link: "#",
    },
    {
        title: "Gill Tech Portfolio",
        description: "This very portfolio — built with Next.js, TypeScript, Framer Motion and MongoDB. Features an admin dashboard for content management.",
        image: "/projects/gilltech_preview.png",
        tags: ["Next.js", "MongoDB", "Cloudinary", "TypeScript"],
        github: "#",
        link: "#",
    },
];

const COLORS = ["#ff4d00", "#7c3aed", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899"];

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState<string>("All");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = res.ok ? await res.json() : [];
                setProjects(data.length > 0 ? data : DEFAULT_PROJECTS);
            } catch {
                setProjects(DEFAULT_PROJECTS);
            }
        };
        fetchProjects();
    }, []);

    const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags || [])))];
    const filtered = filter === "All" ? projects : projects.filter(p => p.tags?.includes(filter));

    const fmtUrl = (url?: string) => {
        if (!url || url === "#") return "#";
        return url.startsWith("http") ? url : `https://${url}`;
    };

    return (
        <section id="projects" className={styles.projectsSection}>
            <div className={styles.header}>
                <span className="section-label">Selected Work</span>
                <Reveal width="100%">
                    <h2 className={styles.heading}>
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.subheading}>A curated selection of my real-world builds.</p>
                </Reveal>

                {/* Tag filter */}
                {allTags.length > 1 && (
                    <div className={styles.filterRow}>
                        {allTags.slice(0, 8).map(tag => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className={`${styles.filterBtn} ${filter === tag ? styles.filterBtnActive : ""}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.grid}>
                <AnimatePresence mode="popLayout">
                    {filtered.map((p, i) => {
                        const accentColor = COLORS[i % COLORS.length];
                        return (
                            <motion.article
                                key={p._id || p.id || i}
                                layout
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ delay: i * 0.08 }}
                                className={`glass-card ${styles.card}`}
                                style={{ "--accent": accentColor } as React.CSSProperties}
                            >
                                {/* Image */}
                                <div className={styles.imageWrap}>
                                    {p.image ? (
                                        isVideoUrl(p.image) ? (
                                            <video src={p.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : p.image.includes('res.cloudinary.com') ? (
                                            <CldImage src={p.image} alt={p.title} width={800} height={480} crop="fill" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )
                                    ) : (
                                        <div className={styles.noImage}>
                                            <Tag size={32} style={{ opacity: 0.3 }} />
                                            <span>No preview yet</span>
                                        </div>
                                    )}
                                    <div className={styles.imageOverlay} />
                                </div>

                                {/* Content */}
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{p.title}</h3>
                                    <p className={styles.desc}>{p.description}</p>

                                    <div className={styles.footer}>
                                        <div className={styles.tags}>
                                            {p.tags?.slice(0, 3).map(t => (
                                                <span key={t} className={styles.tag}>{t}</span>
                                            ))}
                                        </div>
                                        <div className={styles.links}>
                                            {p.github && (
                                                <a href={fmtUrl(p.github)} target="_blank" rel="noreferrer" className={styles.iconLink} title="GitHub">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            <a
                                                href={fmtUrl(p.link)}
                                                target={p.link && p.link !== "#" ? "_blank" : "_self"}
                                                rel="noreferrer"
                                                className={styles.iconLink}
                                                title="Live Link"
                                                onClick={(e) => { if (!p.link || p.link === "#") { e.preventDefault(); } }}
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
