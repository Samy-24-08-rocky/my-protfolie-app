"use client";

import { motion } from "framer-motion";
import { Activity, GraduationCap, Store, Utensils, Truck, Building, Zap } from "lucide-react";
import styles from "./IndustriesSection.module.css";

const industries = [
    { name: "Healthcare", icon: Activity, desc: "HIPAA-compliant medical portals, patient check-in scheduling, and remote telemetry dashboards." },
    { name: "Education", icon: GraduationCap, desc: "Modern LMS applications, interactive student portals, and virtual classroom setups." },
    { name: "Retail & eCommerce", icon: Store, desc: "Secure custom storefronts, warehouse inventory sync, and multi-gateway checkout systems." },
    { name: "Restaurants", icon: Utensils, desc: "Interactive QR table order systems, integrated POS dashboards, and kitchen display terminals." },
    { name: "Logistics", icon: Truck, desc: "Real-time telemetry trackers, route optimization schedules, and cargo management grids." },
    { name: "Real Estate", icon: Building, desc: "Virtual mapping directories, custom MLS listing connections, and broker CRM systems." },
    { name: "Startups", icon: Zap, desc: "High-velocity MVP architectures, quick visual proofs of concept, and API integrations." }
];

const IndustriesSection = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Markets</span>
                <h2 className={styles.title}>Industries We Serve</h2>
                <p className={styles.subtitle}>
                    Bespoke technical solutions tailored to meet the operational demands of diverse sectors.
                </p>
            </div>

            <div className={styles.grid}>
                {industries.map((ind, index) => {
                    const IconComponent = ind.icon;
                    return (
                        <motion.div
                            key={ind.name}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <div className={styles.iconBox}>
                                <IconComponent size={22} />
                            </div>
                            <h3 className={styles.cardTitle}>{ind.name}</h3>
                            <p className={styles.cardDesc}>{ind.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default IndustriesSection;
