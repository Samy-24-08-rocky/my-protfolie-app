"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useState, useEffect, useRef } from "react";

const TYPING_PHRASES = [
    "Modern Web Apps",
    "Mobile Experiences",
    "Scalable Backends",
    "Stunning UI/UX",
];

const Hero = () => {
    const [mounted, setMounted] = useState(false);
    const [branding, setBranding] = useState({
        title: "Crafting Modern \n Digital Experiences",
        desc: "I'm a Full-Stack Developer specializing in React, Next.js, and Mobile apps. Transforming complex problems into elegant, user-centric solutions."
    });
    const [typedText, setTypedText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const container = useRef(null);

    useEffect(() => {
        setMounted(true);
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.branding) setBranding(data.branding);
                }
            } catch (error) {
                console.error("Failed to load hero settings", error);
            }
        };
        fetchSettings();
    }, []);

    // Typing effect
    useEffect(() => {
        const currentPhrase = TYPING_PHRASES[phraseIndex];
        const speed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentPhrase.length) {
                setTypedText(currentPhrase.slice(0, charIndex + 1));
                setCharIndex(c => c + 1);
            } else if (isDeleting && charIndex > 0) {
                setTypedText(currentPhrase.slice(0, charIndex - 1));
                setCharIndex(c => c - 1);
            } else if (!isDeleting && charIndex === currentPhrase.length) {
                setTimeout(() => setIsDeleting(true), 1800);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setPhraseIndex(p => (p + 1) % TYPING_PHRASES.length);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, phraseIndex]);

    return (
        <section id="home" className={styles.hero} ref={container}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.badge}
            >
                <span className={styles.badgeDot} />
                <span>Available for Freelance Projects</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={styles.title}
            >
                I Build{" "}
                <span className="text-gradient">
                    {typedText}
                    <span className={styles.cursor}>|</span>
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={styles.subtitle}
            >
                {branding.desc}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={styles.ctaGroup}
            >
                <Magnetic>
                    <Link href="#projects" className={styles.primaryBtn}>
                        View My Work{" "}
                        <ArrowRight size={20} style={{ marginLeft: 8, display: "inline" }} />
                    </Link>
                </Magnetic>
                <Magnetic>
                    <Link href="#contact" className={styles.secondaryBtn}>
                        Get in Touch
                    </Link>
                </Magnetic>
            </motion.div>

            {/* Floating stat chips */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className={styles.statsRow}
            >
                {[
                    { value: "3+", label: "Years Exp." },
                    { value: "20+", label: "Projects" },
                    { value: "100%", label: "Satisfaction" },
                ].map((s, i) => (
                    <div key={i} className={styles.statChip}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </motion.div>

            <div className={styles.backgroundShapes}>
                <div className={styles.shape1} />
                <div className={styles.shape2} />
                <div className={styles.shape3} />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className={styles.scrollDown}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
