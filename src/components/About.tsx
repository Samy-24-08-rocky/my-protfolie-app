"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Globe, Code2, Smartphone, Signature } from "lucide-react";
import styles from "./About.module.css";
import { Reveal } from "./Reveal";

const TECH = ["React", "Next.js", "TypeScript", "Node.js", "Flutter", "Java", "MongoDB", "MERN Stack", "Firebase", "Supabase", "SQLite", "Neon", "Android", "PostgreSQL"];

const stats = [
    { icon: <Award size={18} />, value: 3, suffix: "+", label: "Years Experience" },
    { icon: <Globe size={18} />, value: 20, suffix: "+", label: "Projects Delivered" },
    { icon: <Code2 size={18} />, value: 15, suffix: "+", label: "Technologies" },
    { icon: <Smartphone size={18} />, value: 5, suffix: "+", label: "Mobile Apps" },
];

function AnimatedCount({ value, enabled }: { value: number; enabled: boolean }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!enabled) return;
        let start = 0;
        const inc = value / (1600 / 16);
        const t = setInterval(() => {
            start += inc;
            if (start >= value) { setCount(value); clearInterval(t); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(t);
    }, [enabled, value]);
    return <>{count}</>;
}

const About = () => {
    const statsRef = useRef(null);
    const inView = useInView(statsRef, { once: true, margin: "-80px" });

    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.container}>
                {/* Left — text */}
                <div className={styles.textCol}>
                    <span className="section-label">Biography</span>
                    <Reveal width="100%">
                        <h2 className={styles.heading}>
                            Digital Craftsman &amp;<br />
                            <span className="text-gradient">Problem Solver</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%">
                        <p className={styles.desc}>
                            I am a dedicated software developer based in <strong className={styles.highlight}>Bathinda, Punjab, India</strong>, with a passion for designing cohesive, user-centric digital experiences. My expertise spans building sleek web interfaces using <strong className={styles.highlight}>React &amp; Next.js</strong>, crafting rich cross-platform mobile environments using <strong className={styles.highlight}>Flutter &amp; Android</strong>, and managing robust, scalable server architectures with <strong className={styles.highlight}>Node.js, Java, and .NET</strong>.
                        </p>
                        <p className={styles.desc} style={{ marginTop: "16px" }}>
                            I hold a deep conviction that great software goes beyond simple functional execution; it should possess a classic, intuitive flow that feels completely natural and satisfying for the user.
                        </p>
                    </Reveal>

                    {/* Tech stack */}
                    <Reveal width="100%">
                        <div className={styles.techSection}>
                            <h4 className={styles.techTitle}>Core Technologies</h4>
                            <div className={styles.techRow}>
                                {TECH.map((t: string) => (
                                    <span key={t} className={styles.techBadge}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Editorial signature */}
                    <motion.div 
                        className={styles.signatureBlock}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className={styles.sigLabel}>Handcrafted By</span>
                        <span className={styles.sigText}>Sumit Gill</span>
                    </motion.div>
                </div>

                {/* Right — stats grid */}
                <div className={styles.statsGrid} ref={statsRef}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            className={`glass-card ${styles.statCard}`}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <div className={styles.statIcon}>{s.icon}</div>
                            <div className={styles.statNum}>
                                <AnimatedCount value={s.value} enabled={inView} />{s.suffix}
                            </div>
                            <div className={styles.statLabel}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
