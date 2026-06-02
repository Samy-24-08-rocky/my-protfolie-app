"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Smartphone, Settings, Bot, ShoppingBag, Palette, ArrowRight } from "lucide-react";
import styles from "./ServicesSection.module.css";

const services = [
    {
        icon: Globe,
        title: "Website Development",
        desc: "High-performance business websites, customer portals, and dynamic web applications built with React/Next.js.",
        href: "/services/website-development"
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        desc: "Native-quality cross-platform apps using Flutter and React Native for beautiful iOS and Android experiences.",
        href: "/services/mobile-app-development"
    },
    {
        icon: Settings,
        title: "Custom Software",
        desc: "Bespoke ERP, CRM, and workflow automation solutions tailored to streamline your unique business operations.",
        href: "/services/software-development"
    },
    {
        icon: Bot,
        title: "AI Solutions",
        desc: "Next-gen intelligent chatbots, predictive analytics, prompt engineering, and custom API integrations.",
        href: "/services/ai-solutions"
    },
    {
        icon: ShoppingBag,
        title: "eCommerce Development",
        desc: "Robust online stores with secure multi-gateway payments, inventory synchronization, and custom checkout flows.",
        href: "/services/website-development" // Fallback or route to eCommerce
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        desc: "Stunning user research, wireframes, visual prototypes, and layouts designed to engage and convert.",
        href: "/services/website-development" // Fallback/route to UI/UX
    }
];

const ServicesSection = () => {
    return (
        <section id="services" className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Our Expertise</span>
                <h2 className={styles.title}>Services We Deliver</h2>
                <p className={styles.subtitle}>
                    We craft end-to-end digital experiences utilizing cutting-edge tech to solve business challenges.
                </p>
            </div>
            
            <div className={styles.grid}>
                {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                        <motion.div
                            key={service.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <div className={styles.iconWrapper}>
                                <IconComponent className={styles.icon} size={28} />
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.desc}</p>
                            <Link href={service.href} className={styles.learnMore}>
                                Learn More <ArrowRight size={14} className={styles.arrow} />
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesSection;
