"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
    const [mounted, setMounted] = useState(false);
    const [branding, setBranding] = useState({
        title: "Crafting Modern \n Digital Experiences",
        desc: "I'm a Full-Stack Developer specializing in React, Next.js, and Mobile apps. Transforming complex problems into elegant, user-centric solutions."
    });
    const container = useRef(null);

    useEffect(() => {
        setMounted(true);
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.branding) {
                        setBranding(data.branding);
                    }
                }
            } catch (error) {
                console.error("Failed to load hero settings", error);
            }
        };
        fetchSettings();
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section id="home" className={styles.hero} ref={container}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.badge}
            >
                <span>Available for Freelance Projects</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={styles.title}
                style={{ y: mounted ? y1 : 0 }}
            >
                {branding.title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={styles.subtitle}
                style={{ y: mounted ? y1 : 0 }}
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
                        <ArrowRight
                            size={20}
                            style={{ marginLeft: 8, display: "inline" }}
                        />
                    </Link>
                </Magnetic>
                <Magnetic>
                    <Link href="#contact" className={styles.secondaryBtn}>
                        Get in Touch
                    </Link>
                </Magnetic>
            </motion.div>

            <div className={styles.backgroundShapes}>
                <motion.div style={{ y: mounted ? y2 : 0 }} className={styles.shape1} />
                <motion.div style={{ y: mounted ? y1 : 0 }} className={styles.shape2} />
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
