"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Laptop, HeartHandshake } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const features = [
    {
        icon: Zap,
        title: "Fast Development",
        desc: "We leverage rapid prototyping, clean component architecture, and agile sprints to launch your product efficiently."
    },
    {
        icon: Shield,
        title: "Secure & Scalable Solutions",
        desc: "Built with bank-grade encryption, secure session handshakes, and high-performance serverless cloud architecture."
    },
    {
        icon: Laptop,
        title: "Modern Technologies",
        desc: "We stay ahead of the curve by building apps with Next.js 15, Flutter, .NET, Node.js, and cloud-native databases."
    },
    {
        icon: HeartHandshake,
        title: "Dedicated Support",
        desc: "Get ongoing maintenance, prompt security patching, and live technical debugging assistance whenever you need it."
    }
];

const WhyChooseUs = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.textSide}>
                    <span className="section-label">Why Partner With Us</span>
                    <h2 className={styles.title}>Why Businesses Choose Us</h2>
                    <p className={styles.desc}>
                        Gill Tech Solutions combines engineering excellence with a customer-first approach to turn concepts into highly efficient software products.
                    </p>
                </div>
                <div className={styles.cardsSide}>
                    {features.map((feat, index) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={feat.title}
                                className={styles.card}
                                initial={{ opacity: 0, x: 25 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={styles.iconBox}>
                                    <Icon size={24} />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{feat.title}</h3>
                                    <p className={styles.cardDesc}>{feat.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
