"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./PortfolioPage.module.css";

const categories = ["All", "Web App", "Mobile App", "AI & Custom Software"];

const caseStudies = [
    {
        title: "Cafe Management System",
        category: "Mobile App",
        industry: "Food & Hospitality",
        desc: "A multi-chain terminal pos and guest order QR code application designed to coordinate ordering lists directly with kitchen terminals.",
        challenge: "Manual order transmission caused 18% table delay margins and order inventory errors in peak operations.",
        solution: "We engineered a Flutter mobile app integrated with a fast .NET Core API and a clustered PostgreSQL database server, allowing guests to order directly via table QR tags.",
        tech: ["Flutter", ".NET Core API", "PostgreSQL", "Docker"],
        result: "Reduced manual operations by 70% and accelerated table turnaround times by 24 minutes.",
        color: "#2563EB"
    },
    {
        title: "CareHub Telehealth Portal",
        category: "Web App",
        industry: "Healthcare",
        desc: "A secure, HIPAA-compliant patient dashboard scheduling telemedicine consultations and cataloging EHR files.",
        challenge: "Outdated legacy software could not scale concurrently to meet video call traffic spikes or support clean security audits.",
        solution: "We designed a Next.js web application utilizing Node.js microservices and WebRTC streaming hosted on secure AWS EC2 nodes, saving audit reports directly to encrypted MongoDB files.",
        tech: ["Next.js", "Node.js API", "MongoDB", "WebRTC", "AWS"],
        result: "Scaled concurrent telemedicine visits by 350% with zero latency degradation.",
        color: "#10B981"
    },
    {
        title: "Smart Logistics Engine",
        category: "AI & Custom Software",
        industry: "Logistics & Supply Chain",
        desc: "Telemetry router optimizer allocating fleets and scheduling fuel paths dynamically using AI predictive models.",
        challenge: "Static route scheduling caused heavy delays and unnecessary fuel waste across 80 active logistics hubs.",
        solution: "We built a customized Python AI routing service hosted on Azure, connected to a Next.js dispatcher console panel.",
        tech: ["Next.js", "Python AI", "PostgreSQL", "Azure DevOps"],
        result: "22% reduction in fuel consumption and 99.4% on-time delivery rates.",
        color: "#F97316"
    }
];

export default function PortfolioPage() {
    const [activeTab, setActiveTab] = useState("All");
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
        category: p.category || (idx % 2 === 0 ? "Web App" : "Mobile App"),
        industry: p.industry || "Custom Software",
        desc: p.description,
        challenge: p.challenge || "Needed to automate legacy processing systems to support expanding user demands.",
        solution: p.solution || "We constructed a secure Next.js web application integrated with database queues and deployed to production cloud nodes.",
        tech: p.tags || [],
        result: p.result || "Operational performance boosted and workloads optimized.",
        color: p.color || (idx % 3 === 0 ? "#2563EB" : idx % 3 === 1 ? "#10B981" : "#F97316")
    })) : caseStudies;

    const filteredProjects = projectsToRender.filter(item => {
        if (activeTab === "All") return true;
        return item.category === activeTab;
    });

    return (
        <main style={{ position: "relative" }}>
            <Navbar />
            
            <section className={styles.hero}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.centerText}
                    >
                        <span className="section-label">Case Studies</span>
                        <h1 className={styles.title}>Our Featured Work</h1>
                        <p className={styles.subtitle}>
                            We deliver secure software systems. Discover the challenges we solved, the technology stacks we implemented, and the operational results we achieved.
                        </p>
                    </motion.div>
                </div>
            </section>

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

            {/* Case Studies List */}
            <section className={styles.projectsSection}>
                <div className={styles.projectsList}>
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className={styles.projectItem}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className={styles.itemMeta} style={{ borderLeftColor: project.color }}>
                                <span className={styles.industry}>{project.industry}</span>
                                <h2 className={styles.projectTitle}>{project.title}</h2>
                                <p className={styles.projectDesc}>{project.desc}</p>
                                
                                <div className={styles.techRow}>
                                    {project.tech.map((t: string) => (
                                        <span key={t} className={styles.techTag}>{t}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.caseGrid}>
                                <div className={styles.caseBox}>
                                    <h5>The Challenge</h5>
                                    <p>{project.challenge}</p>
                                </div>
                                <div className={styles.caseBox}>
                                    <h5>Our Solution</h5>
                                    <p>{project.solution}</p>
                                </div>
                                <div className={styles.caseBox} style={{ background: `${project.color}08`, borderLeft: `2.5px solid ${project.color}` }}>
                                    <h5 style={{ color: project.color }}>The Result</h5>
                                    <p style={{ fontWeight: 600, color: "var(--secondary)" }}>{project.result}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
