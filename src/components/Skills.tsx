"use client";

import { motion } from "framer-motion";
import { Layout, Smartphone, Server, Database, Globe, Layers } from "lucide-react";
import styles from "./Skills.module.css";
import { Reveal } from "./Reveal";

const SKILLS = [
    {
        icon: <Layout size={28} />,
        title: "Frontend & Web",
        desc: "Building pixel-perfect, responsive interfaces with React, Next.js, TypeScript and modern CSS.",
        tags: ["React", "Next.js", "TypeScript", "CSS Modules", "Framer Motion"],
        color: "#ff4d00",
    },
    {
        icon: <Smartphone size={28} />,
        title: "Mobile Development",
        desc: "Cross-platform iOS & Android apps with Flutter, plus native Android using Java & Kotlin.",
        tags: ["Flutter", "Dart", "Java", "Android SDK", "Firebase"],
        color: "#7c3aed",
    },
    {
        icon: <Server size={28} />,
        title: "Backend Engineering",
        desc: "Scalable REST APIs, microservices, and server-side solutions using Node.js, Java, and .NET.",
        tags: ["Node.js", "Express", "Java Spring", ".NET Core", "REST APIs"],
        color: "#0ea5e9",
    },
    {
        icon: <Database size={28} />,
        title: "Databases",
        desc: "Designing and managing SQL & NoSQL databases with a focus on performance and data integrity.",
        tags: ["MongoDB", "PostgreSQL", "MySQL", "Firebase Firestore"],
        color: "#10b981",
    },
    {
        icon: <Globe size={28} />,
        title: "DevOps & Cloud",
        desc: "Deploying and monitoring applications using cloud platforms, CI/CD pipelines and containers.",
        tags: ["Vercel", "Cloudinary", "Git", "Docker (Basic)", "CI/CD"],
        color: "#f59e0b",
    },
    {
        icon: <Layers size={28} />,
        title: "UI/UX Design",
        desc: "Translating ideas into visually compelling experiences through prototyping and modern design principles.",
        tags: ["Figma", "Glassmorphism", "Micro-animations", "Accessibility"],
        color: "#ec4899",
    },
];

const Skills = () => {
    return (
        <section id="skills">
            {/* Header */}
            <div className={styles.header}>
                <span className="section-label">What I Do</span>
                <Reveal width="100%">
                    <h2 className={styles.heading}>
                        My <span className="text-gradient">Expertise</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.subheading}>
                        A wide-ranging skill set built over years of real-world projects.
                    </p>
                </Reveal>
            </div>

            {/* Cards grid */}
            <div className={styles.grid}>
                {SKILLS.map((skill, i) => (
                    <motion.div
                        key={i}
                        className={`glass-card ${styles.card}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.09, duration: 0.5 }}
                        style={{ "--accent-color": skill.color } as React.CSSProperties}
                    >
                        <div className={styles.iconBox}>
                            {skill.icon}
                        </div>
                        <h3 className={styles.cardTitle}>{skill.title}</h3>
                        <p className={styles.cardDesc}>{skill.desc}</p>
                        <div className={styles.tags}>
                            {skill.tags.map(t => (
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
