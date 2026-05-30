"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const ROLES = ["Digital Architect", "Full‑Stack Developer", "Software Craftsman", "Mobile Innovator"];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIdx, setCharIdx] = useState(0);
    const containerRef = useRef<HTMLElement>(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 80]);
    const opacity = useTransform(scrollY, [0, 350], [1, 0]);

    // Typewriter
    useEffect(() => {
        const current = ROLES[roleIndex];
        const speed = isDeleting ? 30 : 70;
        const timer = setTimeout(() => {
            if (!isDeleting && charIdx < current.length) {
                setDisplayed(current.slice(0, charIdx + 1));
                setCharIdx(c => c + 1);
            } else if (isDeleting && charIdx > 0) {
                setDisplayed(current.slice(0, charIdx - 1));
                setCharIdx(c => c - 1);
            } else if (!isDeleting && charIdx === current.length) {
                setTimeout(() => setIsDeleting(true), 2500);
            } else if (isDeleting && charIdx === 0) {
                setIsDeleting(false);
                setRoleIndex(r => (r + 1) % ROLES.length);
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [charIdx, isDeleting, roleIndex]);

    const stats = [
        { value: "3+", label: "Years Exp." },
        { value: "20+", label: "Builds" },
        { value: "100%", label: "Satisfaction" },
    ];

    return (
        <section id="home" className={styles.hero} ref={containerRef}>
            {/* Decorative Blobs */}
            <div className={styles.blobGold} />
            <div className={styles.blobCopper} />
            <div className={styles.gridLines} aria-hidden="true" />
            <div className={styles.horizontalLine} aria-hidden="true" />

            <motion.div className={styles.content} style={{ y, opacity }}>
                {/* Left Side: Editorial Typography & Actions */}
                <div className={styles.leftCol}>
                    {/* Status badge */}
                    <motion.div
                        className={styles.badge}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={styles.badgeDot} />
                        <span>Available for Crafting Projects</span>
                        <Sparkles size={11} className={styles.badgeSparkle} />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        Sumit Gill
                        <span className={styles.subTitleSpan}>
                            Engineering <em>thoughtful</em> digital products &amp;{" "}
                            <span className={styles.typeWrapper}>
                                <em>{displayed}</em>
                                <span className={styles.caret} />
                            </span>
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        I craft high‑performance web &amp; mobile solutions that balance pristine, maintainable code with breathtaking editorial design — turning abstract concepts into premium interactive digital standards.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        className={styles.ctas}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45 }}
                    >
                        <Link href="#projects" className={styles.primaryBtn} id="hero-view-work-btn">
                            Explore Works <ArrowRight size={15} />
                        </Link>
                        <Link href="#contact" className={styles.secondaryBtn} id="hero-contact-btn">
                            Initiate Talk
                        </Link>
                    </motion.div>
                </div>

                {/* Right Side: Editorial Framing & Stats */}
                <div className={styles.rightCol}>
                    <motion.div 
                        className={styles.geometricFrame}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className={styles.frameCorner} />
                        <div className={styles.frameCorner} />
                        <div className={styles.frameCorner} />
                        <div className={styles.frameCorner} />
                        
                        <div className={styles.frameInner}>
                            <span className={styles.frameLabel}>Philosophy</span>
                            <div className={styles.frameImageWrap}>
                                <img src="/software_architecture_abstract.png" alt="Digital Craftsmanship" className={styles.frameImage} />
                            </div>
                            <blockquote className={styles.frameQuote}>
                                "Simplicity is the ultimate sophistication. Great software is felt, not just used."
                            </blockquote>
                            <div className={styles.frameLine} />
                            
                            {/* Stats */}
                            <div className={styles.stats}>
                                {stats.map((s, i) => (
                                    <div key={i} className={styles.statItem}>
                                        <span className={styles.statValue}>{s.value}</span>
                                        <span className={styles.statLabel}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span>Scroll Down</span>
                <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                    <ArrowDown size={14} />
                </motion.span>
            </motion.a>
        </section>
    );
};

export default Hero;
