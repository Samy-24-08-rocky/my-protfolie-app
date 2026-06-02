"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import styles from "./ArticlePage.module.css";

const articleData = {
    "flutter-vs-react-native-2026": {
        title: "Flutter vs React Native in 2026: The Ultimate Agency Guide",
        category: "Mobile Development",
        date: "May 28, 2026",
        readTime: "8 min read",
        author: "Sumit Gill",
        color: "#2563EB",
        content: [
            "In 2026, mobile applications continue to dominate user touchpoints across all industries. For startups, SMEs, and even enterprise teams, deciding on a mobile technology stack is a critical budget and operations decision.",
            "Cross-platform compilation frameworks have evolved. The two giants, Flutter (backed by Google) and React Native (backed by Meta), remain the leading choices for developers wishing to target iOS and Android from a single codebase.",
            "Flutter utilizes the Impeller graphics rendering framework which bypasses platform graphics interfaces entirely. This provides smooth animations at 120Hz, ensuring that POS systems, retail apps, and games run with zero frame dropping.",
            "React Native, on the other hand, utilizes the Hermes engine and native OS components. It offers rapid over-the-air (OTA) updates and binds directly to web developer capabilities, making it ideal for teams with heavy JavaScript/React investments.",
            "For most business cases, Flutter delivers faster startup latencies and more consistent layouts. Our team recommends Flutter for high-performance apps, and React Native for database-heavy web dashboard ports."
        ]
    },
    "cost-of-custom-software-development": {
        title: "The True Cost of Custom Software and Mobile App Development",
        category: "Business Strategy",
        date: "May 15, 2026",
        readTime: "12 min read",
        author: "Sumit Gill",
        color: "#10B981",
        content: [
            "How much does a custom CRM cost? What is the budget for a mobile ordering app? These are the first questions clients ask during consultation sessions.",
            "While basic landing page websites are quick to build, custom enterprise software systems and complex database apps are estimated by developmental hours and third-party integrations.",
            "First, scoping parameters must map existing data hierarchies and workflow logic. Coding simple dashboards is quick, but adding security features like HIPAA medical guidelines or multi-gateway billing logic requires auditing cycles.",
            "A standard CRM or logistics dispatcher dashboard averages between 6 to 12 weeks of engineering sprints. Teams should budget for post-launch cloud costs, monthly security patches, and database indexing support.",
            "Gill Tech Solutions provides flat estimation breakdowns and milestone-based invoicing to ensure absolute billing clarity for our clients."
        ]
    },
    "ai-trends-for-smes-automation": {
        title: "Artificial Intelligence Trends: How LLMs Drive Operational Efficiency",
        category: "AI & Innovation",
        date: "April 30, 2026",
        readTime: "10 min read",
        author: "Sumit Gill",
        color: "#F97316",
        content: [
            "Generative AI has shifted from simple conversational prompts to agentic systems. In 2026, SMEs are deploying custom LLMs to automate high-frequency manual operations.",
            "Instead of paying full-time teams to sort intake support tickets, smart vector search indices (RAG) look up internal documentation and formulate correct answers instantly.",
            "Adding a customer support chatbot is only the first step. By connecting OpenAI or Claude APIs directly to custom business databases, the system can write queries, lookup shipping schedules, or log customer tickets without human intervention.",
            "Security is crucial. Training models on proprietary business code requires private virtual private clouds (VPCs) to ensure client data is never leaked or used in public training corpuses.",
            "Gill Tech Solutions helps businesses audit operations, select correct embedding frameworks, and deploy secure AI solutions that scale."
        ]
    }
};

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const article = articleData[slug as keyof typeof articleData];

    if (!article) {
        return (
            <main style={{ position: "relative" }}>
                <Navbar />
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <h2>Article Not Found</h2>
                        <Link href="/blog" className={styles.backBtn}><ArrowLeft size={16} /> Back to Blog</Link>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main style={{ position: "relative" }}>
            <Navbar />
            
            <section className={styles.hero} style={{ background: `radial-gradient(circle at top right, ${article.color}05, transparent 40%)` }}>
                <div className={styles.container}>
                    <button onClick={() => router.back()} className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Insights
                    </button>
                    
                    <span className={styles.category} style={{ color: article.color, background: `${article.color}10` }}>
                        {article.category}
                    </span>
                    
                    <h1 className={styles.title}>{article.title}</h1>
                    
                    <div className={styles.metaRow}>
                        <div className={styles.metaItem}>
                            <User size={14} /> <span>{article.author}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Calendar size={14} /> <span>{article.date}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Clock size={14} /> <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.contentSection}>
                <div className={styles.contentContainer}>
                    <div className={styles.articleBody}>
                        {article.content.map((para, i) => (
                            <p key={i} className={styles.paragraph}>{para}</p>
                        ))}
                    </div>
                    
                    {/* Sidebar CTA */}
                    <div className={styles.sidebar}>
                        <div className={styles.ctaBox}>
                            <h4>Need a Custom Tech Solution?</h4>
                            <p>Speak directly to our lead engineering architect about your project requirements.</p>
                            <Link href="/contact" className={styles.ctaBtn}>
                                Book Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
