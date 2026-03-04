"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const ROLES = ["Full‑Stack Developer", "Mobile App Builder", "UI/UX Enthusiast", "Backend Engineer"];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIdx, setCharIdx] = useState(0);
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Typewriter
    useEffect(() => {
        const current = ROLES[roleIndex];
        const speed = isDeleting ? 40 : 90;
        const timer = setTimeout(() => {
            if (!isDeleting && charIdx < current.length) {
                setDisplayed(current.slice(0, charIdx + 1));
                setCharIdx(c => c + 1);
            } else if (isDeleting && charIdx > 0) {
                setDisplayed(current.slice(0, charIdx - 1));
                setCharIdx(c => c - 1);
            } else if (!isDeleting && charIdx === current.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && charIdx === 0) {
                setIsDeleting(false);
                setRoleIndex(r => (r + 1) % ROLES.length);
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [charIdx, isDeleting, roleIndex]);

    const stats = [
        { value: "3+", label: "Years Exp." },
        { value: "20+", label: "Projects" },
        { value: "100%", label: "Client Satisfaction" },
    ];

    return (
        <section id="home" className={styles.hero} ref={containerRef}>
            {/* Decorative Blobs */}
            <div className={styles.blobOrange} />
            <div className={styles.blobViolet} />
            <div className={styles.grid} aria-hidden="true" />

            <motion.div className={styles.content} style={{ y, opacity }}>
                {/* Status badge */}
                <motion.div
                    className={styles.badge}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={styles.badgeDot} />
                    <span>Available for Freelance & Full‑time</span>
                    <Sparkles size={13} />
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Hi, I'm{" "}
                    <span className="text-gradient">Sumit Gill</span>
                    <br />
                    a <span className={styles.typeWrapper}>
                        {displayed}
                        <span className={styles.caret} />
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                >
                    I craft high‑performance web & mobile applications that combine clean
                    code with stunning design — turning your ideas into impactful digital products.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className={styles.ctas}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <Link href="#projects" className={styles.primaryBtn} id="hero-view-work-btn">
                        View My Work <ArrowRight size={18} />
                    </Link>
                    <Link href="#contact" className={styles.secondaryBtn} id="hero-contact-btn">
                        Let's Talk
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className={styles.stats}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    {stats.map((s, i) => (
                        <div key={i} className={styles.statItem}>
                            <span className={styles.statValue}>{s.value}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <motion.span
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                >
                    <ArrowDown size={20} />
                </motion.span>
                <span>Scroll</span>
            </motion.a>
        </section>
    );
};

export default Hero;
