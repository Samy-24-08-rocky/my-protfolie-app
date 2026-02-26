"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Layout, Database } from "lucide-react";
import styles from "./Skills.module.css";
import { Reveal } from "./Reveal";

const skillsData = [
    {
        icon: <Layout size={32} />,
        title: "Web Development",
        description: "Building modern, responsive web applications with cutting-edge frameworks including Next.js and React.",
        tags: ["React", "Next.js", "TypeScript", "Tailwind"]
    },
    {
        icon: <Smartphone size={32} />,
        title: "Mobile App Development",
        description: "Creating high-performance native and cross-platform mobile apps for iOS and Android.",
        tags: ["Flutter", "Java", "Android SDK"]
    },
    {
        icon: <Code2 size={32} />,
        title: "Backend Engineering",
        description: "Designing scalable server-side systems, microservices, and robust RESTful APIs.",
        tags: ["Java", "Node.js", ".NET", "Firebase"]
    },
    {
        icon: <Database size={32} />,
        title: "Data Management",
        description: "Architecting database schemas and ensuring data integrity with SQL and NoSQL solutions.",
        tags: ["PostgreSQL", "MongoDB", "MySQL"]
    }
];

const Skills = () => {
    return (
        <section id="skills">
            <div className={styles.sectionHeader}>
                <Reveal width="100%">
                    <h2 className={styles.sectionTitle}>
                        My <span className="text-gradient">Expertise</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.sectionSubtitle}>
                        A deep dive into the technologies I use to bring ideas to life.
                    </p>
                </Reveal>
            </div>

            <div className={styles.skillsList}>
                {skillsData.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={styles.skillRow}
                    >
                        <div className={styles.iconWrapper}>
                            {skill.icon}
                        </div>

                        <div className={styles.contentWrapper}>
                            <h3 className={styles.skillTitle}>{skill.title}</h3>
                            <p className={styles.skillDescription}>{skill.description}</p>
                        </div>

                        <div className={styles.tagWrapper}>
                            {skill.tags.map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
