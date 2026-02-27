"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import styles from "./Projects.module.css";
import { Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

import { useState, useEffect } from "react";

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

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = res.ok ? await res.json() : [];

                if (data && data.length > 0) {
                    setProjects(data);
                } else {
                    setProjects(getDefaultProjects());
                }
            } catch (error) {
                console.error("Failed to load projects", error);
                setProjects(getDefaultProjects());
            }
        };

        const getDefaultProjects = () => [
            {
                title: "EcoTrack Mobile App",
                description: "A comprehensive Flutter application for tracking personal carbon footprint and promoting sustainable habits with real-time analytics.",
                image: "/projects/mobile-app.png",
                tags: ["Flutter", "Firebase", "Dart"],
                github: "#",
                link: "#"
            },
            {
                title: "Nexus Dashboard",
                description: "A sleek React-based SaaS dashboard for project management featuring dark mode, glassmorphism.",
                image: "/projects/web-app.png",
                tags: ["React", "Next.js", "Framer Motion"],
                github: "#",
                link: "#"
            }
        ];

        fetchProjectsData();
    }, []);

    const formatUrl = (url?: string) => {
        if (!url || url === "#") return "#";
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return `https://${url}`;
        }
        return url;
    };

    return (
        <section id="projects" className={styles.projectsSection}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <Reveal width="100%">
                    <h2 style={{ fontSize: "3rem" }}>
                        Selected <span className="text-gradient">Projects</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p style={{ color: "var(--text-muted)" }}>
                        A glimpse into some of my favorite works.
                    </p>
                </Reveal>
            </div>

            <div className={styles.projectsGrid}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id || project.id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass-card ${styles.projectCard}`}
                    >
                        <a href={formatUrl(project.link)} target={project.link && project.link !== "#" ? "_blank" : "_self"} rel="noreferrer" className={styles.imageWrapper} style={{ display: "block" }} onClick={(e) => { if (!project.link || project.link === "#") { e.preventDefault(); alert("Live link not available for this project yet."); } }}>
                            {project.image ? (
                                project.image.includes('res.cloudinary.com') ? (
                                    <CldImage
                                        src={project.image}
                                        alt={project.title}
                                        width={800}
                                        height={500}
                                        crop="fill"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </>
                                )
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'var(--placeholder-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No Image Available
                                </div>
                            )}
                            <div className={styles.overlay}>
                                <div className={styles.overlayContent}>
                                    <p>View Details</p>
                                </div>
                            </div>
                        </a>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectDescription}>{project.description}</p>

                            <div className={styles.projectFooter}>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {project.tags?.slice(0, 3).map((tag: string) => (
                                        <span
                                            key={tag}
                                            style={{
                                                fontSize: "0.7rem",
                                                padding: "4px 8px",
                                                background: "rgba(255,255,255,0.05)",
                                                borderRadius: "4px",
                                                color: "var(--primary)",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.linkGroup}>
                                    <Magnetic>
                                        <a href={formatUrl(project.github)} target={project.github && project.github !== "#" ? "_blank" : "_self"} rel="noreferrer" className={styles.iconLink} onClick={(e) => { if (!project.github || project.github === "#") { e.preventDefault(); alert("GitHub link not available for this project yet."); } }}>
                                            <Github size={20} />
                                        </a>
                                    </Magnetic>
                                    <Magnetic>
                                        <a href={formatUrl(project.link)} target={project.link && project.link !== "#" ? "_blank" : "_self"} rel="noreferrer" className={styles.iconLink} onClick={(e) => { if (!project.link || project.link === "#") { e.preventDefault(); alert("Live link not available for this project yet."); } }}>
                                            <ExternalLink size={20} />
                                        </a>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
