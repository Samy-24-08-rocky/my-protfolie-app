"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Smartphone, Globe, Award } from "lucide-react";
import styles from "./About.module.css";
import { Reveal } from "./Reveal";

const stats = [
    { icon: <Award size={24} />, value: 3, suffix: "+", label: "Years Experience" },
    { icon: <Globe size={24} />, value: 20, suffix: "+", label: "Projects Delivered" },
    { icon: <Code2 size={24} />, value: 15, suffix: "+", label: "Technologies" },
    { icon: <Smartphone size={24} />, value: 5, suffix: "+", label: "Mobile Apps" },
];

function StatCard({ icon, value, suffix, label, index, enabled }: {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    index: number;
    enabled: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!enabled) return;
        let start = 0;
        const duration = 1800;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [enabled, value]);

    return (
        <motion.div
            className={styles.statCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
        >
            <div className={styles.statIcon}>{icon}</div>
            <div className={styles.statNumber}>{count}{suffix}</div>
            <div className={styles.statLabel}>{label}</div>
        </motion.div>
    );
}

const About = () => {
    const statsRef = useRef(null);
    const inView = useInView(statsRef, { once: true, margin: "-80px" });

    return (
        <section id="about">
            <div className={styles.aboutContainer}>
                <div className={styles.aboutContent}>
                    <Reveal width="100%">
                        <h2 className={styles.title}>
                            About <span className="text-gradient">Me</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%">
                        <p className={styles.description}>
                            I am a passionate Software Developer with a strong foundation in
                            both Web and Mobile ecosystems. With expertise in React and
                            Next.js for the web, and Java, Android, and Flutter for mobile, I
                            build seamless digital experiences that bridge the gap between
                            functionality and aesthetics. I specialize in creating robust,
                            scalable, and user-friendly applications that solve real-world problems.
                        </p>
                    </Reveal>

                    <Reveal width="100%">
                        <div className={styles.techStack}>
                            {["React", "Next.js", "TypeScript", "Flutter", "Node.js", "MongoDB", "Firebase", "Java"].map((tech) => (
                                <span key={tech} className={styles.techBadge}>{tech}</span>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Animated Stats */}
                <div className={styles.statsGrid} ref={statsRef}>
                    {stats.map((stat, i) => (
                        <StatCard
                            key={i}
                            index={i}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            enabled={inView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
