"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./FeaturedProjects.module.css";

const projects = [
    {
        title: "Cafe Management System",
        industry: "Food & Hospitality",
        desc: "Custom POS, kitchen display system, and table QR-code ordering interface designed for multi-location cafe chains.",
        tech: ["Flutter", ".NET API", "PostgreSQL"],
        result: "Reduced manual operations by 70%",
        color: "#2563EB",
        mockup: "cafe"
    },
    {
        title: "CareHub Telehealth Portal",
        industry: "Healthcare",
        desc: "HIPAA-compliant online consultation portal, patient booking management, and integrated video conferencing dashboard.",
        tech: ["React", "Node.js", "AWS", "MongoDB"],
        result: "Scaled patient check-ins by 350%",
        color: "#10B981",
        mockup: "health"
    },
    {
        title: "Smart Logistics Engine",
        industry: "Logistics & Supply Chain",
        desc: "Real-time fleet tracker, route optimization scheduler, and fuel telemetry dashboard utilizing machine learning models.",
        tech: ["Next.js", "Python AI", "Azure", "PostgreSQL"],
        result: "22% reduction in fleet fuel consumption",
        color: "#F97316",
        mockup: "logistics"
    }
];

const FeaturedProjects = () => {
    const [dbProjects, setDbProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setDbProjects(data);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };
        fetchProjects();
    }, []);

    const projectsToRender = dbProjects.length > 0 ? dbProjects.map((p, idx) => ({
        title: p.title,
        desc: p.description,
        tech: p.tags || [],
        industry: p.industry || "Custom Software",
        result: p.result || "Operational efficiency boosted",
        color: p.color || (idx % 3 === 0 ? "#2563EB" : idx % 3 === 1 ? "#10B981" : "#F97316"),
        mockup: p.mockup || (idx % 3 === 0 ? "cafe" : idx % 3 === 1 ? "health" : "logistics")
    })) : projects;

    return (
        <section id="portfolio" className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Case Studies</span>
                <h2 className={styles.title}>Featured Projects</h2>
                <p className={styles.subtitle}>
                    Explore how we build custom solutions that deliver measurable business impact.
                </p>
            </div>

            <div className={styles.grid}>
                {projectsToRender.map((project, index) => (
                    <motion.div
                        key={project.title}
                        className={styles.card}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.12 }}
                    >
                        {/* Interactive UI Mockup Visual */}
                        <div className={styles.visualWrapper} style={{ background: `${project.color}10` }}>
                            {project.mockup === "cafe" && (
                                <div className={styles.cafeMockup}>
                                    <div className={styles.posHeader}>
                                        <span>POS Terminal</span>
                                        <span className={styles.activeLed}></span>
                                    </div>
                                    <div className={styles.posGrid}>
                                        <div className={styles.posItem}>
                                            <div className={styles.posImg}>☕</div>
                                            <span>Espresso</span>
                                            <span>$3.50</span>
                                        </div>
                                        <div className={styles.posItem}>
                                            <div className={styles.posImg}>🥐</div>
                                            <span>Croissant</span>
                                            <span>$4.00</span>
                                        </div>
                                    </div>
                                    <div className={styles.posReceipt}>
                                        <div className={styles.receiptLine}></div>
                                        <div className={styles.receiptLine} style={{ width: "60%" }}></div>
                                        <div className={styles.receiptLine} style={{ width: "40%" }}></div>
                                    </div>
                                </div>
                            )}

                            {project.mockup === "health" && (
                                <div className={styles.healthMockup}>
                                    <div className={styles.healthHeader}>
                                        <span>Patient Portal</span>
                                        <span className={styles.healthPulse}></span>
                                    </div>
                                    <div className={styles.healthGraph}>
                                        <svg viewBox="0 0 150 60" className={styles.sparkSvg}>
                                            <path d="M0 40 L30 40 L45 10 L60 50 L75 35 L90 40 L105 15 L120 40 L150 40" fill="none" stroke="#10B981" strokeWidth="2.5" />
                                        </svg>
                                    </div>
                                    <div className={styles.healthInfo}>
                                        <span>BPM: 74</span>
                                        <span>Status: Normal</span>
                                    </div>
                                </div>
                            )}

                            {project.mockup === "logistics" && (
                                <div className={styles.logisticsMockup}>
                                    <div className={styles.mapGrid}>
                                        <div className={styles.mapPin} style={{ top: "20%", left: "30%" }}>📍</div>
                                        <div className={styles.mapPin} style={{ top: "60%", left: "70%" }}>📍</div>
                                        <svg className={styles.mapRoute} viewBox="0 0 150 100">
                                            <path d="M45 35 C70 40, 80 80, 105 70" fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray="4 3" />
                                        </svg>
                                    </div>
                                    <div className={styles.logisticsConsole}>
                                        <span>Route Optimized</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Details */}
                        <div className={styles.details}>
                            <div className={styles.metaRow}>
                                <span className={styles.industry}>{project.industry}</span>
                                <span className={styles.badge} style={{ color: project.color, background: `${project.color}15` }}>
                                    {project.result}
                                </span>
                            </div>
                            
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectDesc}>{project.desc}</p>
                            
                            <div className={styles.techRow}>
                                {project.tech.map((t: string) => (
                                    <span key={t} className={styles.techTag}>{t}</span>
                                ))}
                            </div>

                            <Link href="/portfolio" className={styles.projectLink}>
                                Read Case Study <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className={styles.footerCta}>
                <Link href="/portfolio" className={styles.viewAllBtn}>
                    View All Case Studies
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProjects;
