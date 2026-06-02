"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
    onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroSectionProps) => {
    return (
        <section id="home" className={styles.heroWrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">Innovative Tech Partners</span>
                        <h1 className={styles.headline}>
                            Custom Software, Mobile Apps & <span className="text-gradient">AI Solutions</span> for Growing Businesses
                        </h1>
                        <p className={styles.subheadline}>
                            We help startups, SMEs, and enterprises build modern websites, mobile apps, and AI-powered solutions that drive growth and improve efficiency.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.ctaGroup}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <button onClick={onBookClick} className={styles.primaryCta}>
                            Get Free Consultation
                        </button>
                        <Link href="/portfolio" className={styles.secondaryCta}>
                            View Our Work
                        </Link>
                    </motion.div>

                    <motion.div 
                        className={styles.trusted}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p className={styles.trustedText}>Trusted by innovators at:</p>
                        <div className={styles.logoRow}>
                            <span>NextGen Retail</span>
                            <span>CareHub</span>
                            <span>AILogics</span>
                            <span>AppScale</span>
                        </div>
                    </motion.div>
                </div>

                <div className={styles.mockupWrapper}>
                    <motion.div
                        className={styles.mockupContainer}
                        initial={{ opacity: 0, scale: 0.95, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    >
                        {/* Custom Animated Dashboard SVG */}
                        <div className={styles.dashboardCard}>
                            <div className={styles.dashboardHeader}>
                                <div className={styles.windowDots}>
                                    <span style={{ background: "#FF5F56" }}></span>
                                    <span style={{ background: "#FFBD2E" }}></span>
                                    <span style={{ background: "#27C93F" }}></span>
                                </div>
                                <span className={styles.dashboardTitle}>Gill Tech AI Console</span>
                            </div>
                            <div className={styles.dashboardBody}>
                                <div className={styles.dashboardGrid}>
                                    <div className={styles.dbStatCard}>
                                        <span className={styles.statLabel}>Active AI Nodes</span>
                                        <span className={styles.statValue}>1,248</span>
                                        <span className={styles.statTrend} style={{ color: "#27C93F" }}>+12.4%</span>
                                    </div>
                                    <div className={styles.dbStatCard}>
                                        <span className={styles.statLabel}>API Success</span>
                                        <span className={styles.statValue}>99.98%</span>
                                        <span className={styles.statTrend} style={{ color: "#2563EB" }}>Stable</span>
                                    </div>
                                </div>
                                
                                <div className={styles.chartWrapper}>
                                    <svg className={styles.chartSvg} viewBox="0 0 400 150">
                                        <defs>
                                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Grid lines */}
                                        <line x1="0" y1="30" x2="400" y2="30" stroke="var(--surface-border)" strokeWidth="1" />
                                        <line x1="0" y1="70" x2="400" y2="70" stroke="var(--surface-border)" strokeWidth="1" />
                                        <line x1="0" y1="110" x2="400" y2="110" stroke="var(--surface-border)" strokeWidth="1" />
                                        
                                        {/* Filled area */}
                                        <path
                                            d="M 0 120 C 50 110, 80 50, 130 60 C 180 70, 220 20, 270 30 C 320 40, 350 90, 400 50 L 400 150 L 0 150 Z"
                                            fill="url(#chartGrad)"
                                        />
                                        {/* Main Chart line */}
                                        <motion.path
                                            d="M 0 120 C 50 110, 80 50, 130 60 C 180 70, 220 20, 270 30 C 320 40, 350 90, 400 50"
                                            fill="none"
                                            stroke="#2563EB"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />
                                        
                                        {/* Interactive pulsers */}
                                        <circle cx="270" cy="30" r="5" fill="#2563EB" />
                                        <motion.circle 
                                            cx="270" cy="30" r="12" 
                                            fill="none" stroke="#2563EB" strokeWidth="1.5"
                                            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
