"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./TechStackSection.module.css";

const categories = ["All", "Frontend", "Backend & Database", "Cloud & DevOps"];

const techItems = [
    { name: "Flutter", category: "Frontend", desc: "Cross-platform mobile apps" },
    { name: "React", category: "Frontend", desc: "Interactive user interfaces" },
    { name: "Next.js", category: "Frontend", desc: "High-performance SSR websites" },
    { name: "Node.js", category: "Backend & Database", desc: "Scalable runtime APIs" },
    { name: ".NET", category: "Backend & Database", desc: "Enterprise robust backend APIs" },
    { name: "PostgreSQL", category: "Backend & Database", desc: "Relational database engines" },
    { name: "MySQL", category: "Backend & Database", desc: "Structured data storage" },
    { name: "Firebase", category: "Backend & Database", desc: "Serverless backend & database" },
    { name: "SQLite", category: "Backend & Database", desc: "Lightweight embedded database" },
    { name: "Neon", category: "Backend & Database", desc: "Serverless Postgres database" },
    { name: "Java", category: "Backend & Database", desc: "Enterprise backend development" },
    { name: "MongoDB", category: "Backend & Database", desc: "Document-based NoSQL database" },
    { name: "MERN Stack", category: "Backend & Database", desc: "Full-stack JavaScript apps" },
    { name: "AWS", category: "Cloud & DevOps", desc: "Flexible cloud infrastructure" },
    { name: "Azure", category: "Cloud & DevOps", desc: "Enterprise cloud integrations" }
];

const TechStackSection = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredTech = techItems.filter(item => {
        if (activeTab === "All") return true;
        return item.category === activeTab;
    });

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Our Stack</span>
                <h2 className={styles.title}>Technologies We Use</h2>
                <p className={styles.subtitle}>
                    We select modern, battle-tested tools to build robust applications.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className={styles.tabRow}>
                {categories.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div 
                className={styles.grid}
                layout
                transition={{ duration: 0.3 }}
            >
                {filteredTech.map(item => (
                    <motion.div
                        key={item.name}
                        className={styles.card}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.logoMark}>{item.name.charAt(0)}</div>
                        <div>
                            <h3 className={styles.cardTitle}>{item.name}</h3>
                            <span className={styles.cardDesc}>{item.desc}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default TechStackSection;
