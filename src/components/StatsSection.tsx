"use client";

import { motion } from "framer-motion";
import styles from "./StatsSection.module.css";

const stats = [
    { value: "100+", label: "Projects Completed", desc: "Delivered on time & budget" },
    { value: "50+", label: "Happy Clients", desc: "Startups, SMEs & Enterprises" },
    { value: "5+", label: "Years Experience", desc: "Expert technical developers" },
    { value: "98%", label: "Client Satisfaction", desc: "Highly rated on review sites" },
];

const StatsSection = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.grid}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className={styles.value}>{stat.value}</h3>
                        <h4 className={styles.label}>{stat.label}</h4>
                        <p className={styles.desc}>{stat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
