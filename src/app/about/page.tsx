"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechStackSection from "@/components/TechStackSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Award } from "lucide-react";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
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
                        <span className="section-label">Our Story</span>
                        <h1 className={styles.title}>About Gill Tech Solutions India</h1>
                        <p className={styles.subtitle}>
                            We are an elite software engineering agency dedicated to transforming complex challenges into clean, secure, and scalable digital solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story & Vision */}
            <section className={styles.storySection}>
                <div className={styles.storyGrid}>
                    <div className={styles.storyCard}>
                        <h2 className={styles.secTitle}>Company History</h2>
                        <p className={styles.secText}>
                            Founded in Bathinda, Punjab, Gill Tech Solutions India started with a simple vision: to bridge the gap between high-level enterprise technology and growing businesses. Over the years, we have scaled our expertise across mobile applications (Flutter), enterprise web portals (React/Next.js), cloud solutions, and generative AI.
                        </p>
                        <p className={styles.secText}>
                            Today, we serve a global clientele, building custom software architecture that automates manual workflows and powers business scale.
                        </p>
                    </div>

                    <div className={styles.visionCard}>
                        <div className={styles.valueRow}>
                            <div className={styles.iconBox}><Target size={20} /></div>
                            <div>
                                <h3 className={styles.valueTitle}>Our Mission</h3>
                                <p className={styles.valueText}>To deliver secure, reliable, and scalable software products that empower businesses to automate operations and unlock exponential growth.</p>
                            </div>
                        </div>

                        <div className={styles.valueRow}>
                            <div className={styles.iconBox}><Eye size={20} /></div>
                            <div>
                                <h3 className={styles.valueTitle}>Our Vision</h3>
                                <p className={styles.valueText}>To become India's leading custom tech partner, recognized for exceptional code design, AI innovations, and transparent agile delivery.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team milestones */}
            <section className={styles.teamSection}>
                <div className={styles.container}>
                    <div className={styles.centerText}>
                        <span className="section-label">Leadership</span>
                        <h2 className={styles.title}>Our Team</h2>
                        <p className={styles.subtitle}>Our leaders combine deep engineering experience with product strategy.</p>
                    </div>

                    <div className={styles.teamGrid}>
                        <div className={styles.teamCard}>
                            <div className={styles.avatar}>SG</div>
                            <h3 className={styles.memberName}>Sumit Gill</h3>
                            <span className={styles.memberRole}>Founder & Lead Architect</span>
                            <p className={styles.memberDesc}>Specialist in Flutter app compilation, .NET core APIs, and secure database clustering.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications / Badges */}
            <section className={styles.certSection}>
                <div className={styles.container}>
                    <div className={styles.centerText}>
                        <span className="section-label">Standards</span>
                        <h2 className={styles.title}>Certifications & Compliance</h2>
                        <p className={styles.subtitle}>We build secure applications adhering to global industry standards.</p>
                    </div>

                    <div className={styles.certGrid}>
                        <div className={styles.certCard}>
                            <ShieldCheck className={styles.certIcon} size={32} />
                            <h4>HIPAA Compliant</h4>
                            <p>Architectures configured for secure healthcare databases and encrypted patient consultations.</p>
                        </div>
                        <div className={styles.certCard}>
                            <Award className={styles.certIcon} size={32} />
                            <h4>AWS & Azure Certified</h4>
                            <p>Deployment nodes configured by certified DevOps professionals for high availability.</p>
                        </div>
                    </div>
                </div>
            </section>

            <WhyChooseUs />
            <TechStackSection />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
