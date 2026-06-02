"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Smartphone, Server, Database, Globe, Layers } from "lucide-react";
import styles from "./Skills.module.css";
import { Reveal } from "./Reveal";

const SKILLS = [
    {
        icon: <Layout size={24} />,
        title: "Frontend & Web",
        desc: "Building pixel-perfect, responsive interfaces with React, Next.js, TypeScript and modern CSS.",
        tags: ["React", "Next.js", "TypeScript", "CSS Modules", "Framer Motion"],
        color: "#2563EB", // Blue
    },
    {
        icon: <Smartphone size={24} />,
        title: "Mobile Development",
        desc: "Cross-platform iOS & Android apps with Flutter, plus native Android using Java & Kotlin.",
        tags: ["Flutter", "Dart", "Java", "Android SDK", "Firebase"],
        color: "#F97316", // Orange
    },
    {
        icon: <Server size={24} />,
        title: "Backend Engineering",
        desc: "Scalable REST APIs, microservices, and server-side solutions using Node.js, Java, and .NET.",
        tags: ["Node.js", "Express", "Java Spring", ".NET Core", "REST APIs"],
        color: "#10B981", // Green
    },
    {
        icon: <Database size={24} />,
        title: "Databases",
        desc: "Designing and managing SQL & NoSQL databases with a focus on performance and data integrity.",
        tags: ["MongoDB", "PostgreSQL", "MySQL", "Firebase Firestore"],
        color: "#6366F1", // Indigo
    },
    {
        icon: <Globe size={24} />,
        title: "DevOps & Cloud",
        desc: "Deploying and monitoring applications using cloud platforms, CI/CD pipelines and containers.",
        tags: ["Vercel", "Cloudinary", "Git", "Docker (Basic)", "CI/CD"],
        color: "#8B5CF6", // Purple
    },
    {
        icon: <Layers size={24} />,
        title: "UI/UX Design",
        desc: "Translating ideas into visually compelling experiences through prototyping and modern design principles.",
        tags: ["Figma", "Glassmorphism", "Micro-animations", "Accessibility"],
        color: "#EC4899", // Pink
    },
];

const Skills = () => {
    return (
        <section id="skills" className={styles.skillsSection}>
            {/* Header */}
            <div className={styles.header}>
                <span className="section-label">Expertise</span>
                <Reveal width="100%">
                    <h2 className={styles.heading}>
                        My <span className="text-gradient">Capabilities</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.subheading}>
                        A detailed catalog of technical specializations cultivated over years of professional development.
                    </p>
                </Reveal>
            </div>

            {/* Cards grid */}
            <div className={styles.grid}>
                {SKILLS.map((skill, i) => (
                    <motion.div
                        key={i}
                        className={`glass-card ${styles.card}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                        style={{ "--accent-color": skill.color } as React.CSSProperties}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.iconBox}>
                                {skill.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{skill.title}</h3>
                        </div>
                        <p className={styles.cardDesc}>{skill.desc}</p>
                        <div className={styles.tags}>
                            {skill.tags.map((t: string) => (
                                <span key={t} className={styles.tag}>{t}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
