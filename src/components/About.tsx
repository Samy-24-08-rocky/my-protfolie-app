"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Globe, Code2, Smartphone } from "lucide-react";
import styles from "./About.module.css";
import { Reveal } from "./Reveal";

const TECH = ["React", "Next.js", "TypeScript", "Node.js", "Flutter", "Java", "MongoDB", "Firebase", "Android", "PostgreSQL"];

const stats = [
    { icon: <Award size={20} />, value: 3, suffix: "+", label: "Years Experience" },
    { icon: <Globe size={20} />, value: 20, suffix: "+", label: "Projects Delivered" },
    { icon: <Code2 size={20} />, value: 15, suffix: "+", label: "Technologies" },
    { icon: <Smartphone size={20} />, value: 5, suffix: "+", label: "Mobile Apps" },
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
        <section id="about">
            <div className={styles.container}>
                {/* Left — text */}
                <div className={styles.textCol}>
                    <span className="section-label">About Me</span>
                    <Reveal width="100%">
                        <h2 className={styles.heading}>
                            Passionate Developer,<br />
                            <span className="text-gradient">Problem Solver</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%">
                        <p className={styles.desc}>
                            I'm a full-stack software developer from <strong>Bathinda, Punjab, India</strong> with
                            a passion for building seamless, user-centric digital experiences.
                            My expertise spans modern web technologies like <strong>React &amp; Next.js</strong>,
                            mobile development with <strong>Flutter &amp; Android</strong>, and robust back‑ends
                            using <strong>Node.js, Java, and .NET</strong>.
                        </p>
                        <p className={styles.desc} style={{ marginTop: "16px" }}>
                            I believe great software is not just functional — it should feel
                            effortless and delightful for every end user.
                        </p>
                    </Reveal>

                    {/* Tech stack */}
                    <Reveal width="100%">
                        <div className={styles.techRow}>
                            {TECH.map(t => (
                                <span key={t} className={styles.techBadge}>{t}</span>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Right — stats grid */}
                <div className={styles.statsGrid} ref={statsRef}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            className={`glass-card ${styles.statCard}`}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
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
