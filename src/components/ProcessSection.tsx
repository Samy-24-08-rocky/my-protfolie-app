"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Terminal, ShieldCheck, Rocket } from "lucide-react";
import styles from "./ProcessSection.module.css";

const steps = [
    {
        num: "01",
        icon: Search,
        title: "Discovery Call",
        desc: "We discuss your business challenges, document system parameters, and define scope goals for your software solution."
    },
    {
        num: "02",
        icon: PenTool,
        title: "Planning & Design",
        desc: "We outline specifications, create responsive UI/UX prototypes, and construct complete database schema wireframes."
    },
    {
        num: "03",
        icon: Terminal,
        title: "Development",
        desc: "Our engineering team writes high-quality code in agile sprints, integrating modular features and unit tests."
    },
    {
        num: "04",
        icon: ShieldCheck,
        title: "Testing & QA",
        desc: "We conduct stress testing, end-to-end integration audits, and performance sweeps to guarantee a bug-free launch."
    },
    {
        num: "05",
        icon: Rocket,
        title: "Launch & Support",
        desc: "We deploy systems to production cloud networks (AWS/Azure) and provide ongoing maintenance SLA services."
    }
];

const ProcessSection = () => {
    return (
        <section id="process" className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Workflow</span>
                <h2 className={styles.title}>Our Development Process</h2>
                <p className={styles.subtitle}>
                    A streamlined, transparent methodology focused on delivering secure software products.
                </p>
            </div>

            <div className={styles.timeline}>
                {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                        <motion.div
                            key={step.title}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.numBox}>
                                <span className={styles.number}>{step.num}</span>
                                <div className={styles.circle}>
                                    <IconComponent size={20} className={styles.icon} />
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
                <div className={styles.line}></div>
            </div>
        </section>
    );
};

export default ProcessSection;
