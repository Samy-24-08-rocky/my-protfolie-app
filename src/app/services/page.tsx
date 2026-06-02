"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import styles from "./ServicesHub.module.css";

export default function ServicesPage() {
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
                        <span className="section-label">Offerings</span>
                        <h1 className={styles.title}>Our Technical Services</h1>
                        <p className={styles.subtitle}>
                            We build bespoke software systems, mobile applications, and artificial intelligence configurations designed to scale your operations.
                        </p>
                    </motion.div>
                </div>
            </section>

            <ServicesSection />
            <WhyChooseUs />
            <FAQSection />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
