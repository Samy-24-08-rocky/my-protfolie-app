"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./BlogPage.module.css";

const articles = [
    {
        slug: "flutter-vs-react-native-2026",
        title: "Flutter vs React Native in 2026: The Ultimate Agency Guide",
        category: "Mobile Development",
        excerpt: "An in-depth analysis of app compile performance, startup latencies, rendering engines, and development budgets for startups.",
        date: "May 28, 2026",
        readTime: "8 min read",
        color: "#2563EB"
    },
    {
        slug: "cost-of-custom-software-development",
        title: "The True Cost of Custom Software and Mobile App Development",
        category: "Business Strategy",
        excerpt: "A transparent breakdown of cost variables including feature scope, QA audits, cloud hosting, and SLA retainers for SMEs.",
        date: "May 15, 2026",
        readTime: "12 min read",
        color: "#10B981"
    },
    {
        slug: "ai-trends-for-smes-automation",
        title: "Artificial Intelligence Trends: How LLMs Drive Operational Efficiency",
        category: "AI & Innovation",
        excerpt: "Learn how training custom support chatbots and semantic indexing search layers can automate customer queues by 60%.",
        date: "April 30, 2026",
        readTime: "10 min read",
        color: "#F97316"
    }
];

export default function BlogPage() {
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
                        <span className="section-label">Insights</span>
                        <h1 className={styles.title}>Gill Tech Blog</h1>
                        <p className={styles.subtitle}>
                            Read expert engineering articles, UI/UX breakdowns, development budgets, and generative AI research reviews.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className={styles.blogSection}>
                <div className={styles.grid}>
                    {articles.map((art, index) => (
                        <motion.article
                            key={art.slug}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.metaRow}>
                                <span className={styles.category} style={{ color: art.color }}>{art.category}</span>
                                <span className={styles.date}>{art.date}</span>
                            </div>
                            
                            <h2 className={styles.artTitle}>
                                <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                            </h2>
                            <p className={styles.excerpt}>{art.excerpt}</p>
                            
                            <div className={styles.cardFooter}>
                                <span className={styles.readTime}>{art.readTime}</span>
                                <Link href={`/blog/${art.slug}`} className={styles.readLink} style={{ color: art.color }}>
                                    Read Article →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
