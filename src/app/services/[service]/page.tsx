"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadFormSection from "@/components/LeadFormSection";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Cpu, Shield, Zap } from "lucide-react";
import styles from "./ServiceDetailPage.module.css";

const serviceContent = {
    "website-development": {
        title: "Enterprise Web & Portal Development",
        subtitle: "We engineer fast, SEO-compliant business websites, SaaS portals, and web applications using React and Next.js.",
        tagline: "Speed, SEO, and Scalability Combined",
        features: [
            "Server-Side Rendering (SSR) & Static Site Generation (SSG) for sub-second load times.",
            "Fully responsive, mobile-first design system architecture using custom CSS tokens.",
            "Secure user authentication (OAuth2 / JWT) and authorization controls.",
            "Integrated headless CMS interfaces (Sanity/Strapi) for easy text management."
        ],
        details: [
            "In today's digital economy, your website is the virtual headquarters of your business. A slow, unresponsive, or poorly designed site directly translates to lost leads, high bounce rates, and weakened trust. At Gill Tech Solutions India, we don't just build simple landing pages; we engineer robust, high-performance web applications that convert search traffic into recurring revenue.",
            "Our core technology stack features React and Next.js, the gold standards of modern frontend engineering. By implementing Next.js Server-Side Rendering (SSR) and static generation methods, we ensure your website loads instantly on any mobile device or low-bandwidth connection. Speed is not just a user experience requirement; it is a critical ranking factor for Google Search algorithms.",
            "Every project begins with a comprehensive planning cycle where we map user flows and design intuitive layout blueprints. We write clean, semantic HTML conforming to accessibility guidelines (WCAG) and automate testing cycles to catch rendering bugs early. Our custom CSS module systems offer the visual styling of premium themes without the styling bloat of third-party templates."
        ]
    },
    "mobile-app-development": {
        title: "Custom Mobile App Development",
        subtitle: "Native-quality cross-platform applications built with Flutter and React Native for Android and iOS devices.",
        tagline: "Build Once, Deploy Everywhere with Native Performance",
        features: [
            "Single codebase compile for both Apple iOS and Android platforms.",
            "Hardware sensor access, push notification pipelines, and bluetooth pairings.",
            "Smooth 120Hz rendering animations using modern layout engines.",
            "Local SQLite data caching and secure key-chain session storages."
        ],
        details: [
            "Developing separate native applications for iOS and Android can quickly double your budget and stretch timelines. Our cross-platform engineering capabilities allow you to launch beautiful, native-performance applications in half the time by utilizing frameworks like Flutter and React Native.",
            "Flutter, powered by Dart and Google's Impeller graphics engine, allows us to draw pixel-perfect interfaces directly to the screen. It is the premier choice for complex user interfaces, logistics telemetry maps, and hospitality POS terminals. React Native, conversely, integrates smoothly with existing web structures and bridges directly to native OS components for quick feature rollouts.",
            "We guide you through the submission process for the Apple App Store and Google Play Console, handling review parameters and setting up analytics dashboards. From local offline storage synchronization to real-time notification alerts, we ensure your mobile solution provides a premium customer experience."
        ]
    },
    "flutter-development": {
        title: "Premium Flutter App Engineering",
        subtitle: "Elite Flutter compilation services for pixel-perfect animations and maximum operating efficiency.",
        tagline: "Pixel-Perfect Native UI at Scale",
        features: [
            "Impeller GPU-accelerated graphics with zero frame drops.",
            "State management configurations using Provider, Bloc, or Riverpod.",
            "Clean architecture guidelines splitting business logic from visual layers.",
            "Integrated automated widget, unit, and integration testing pipelines."
        ],
        details: [
            "Flutter has revolutionized mobile application development by compiling directly to ARM machine code. This delivers the snappy startup times, fluid scroll animations, and hardware accelerations of native Swift or Kotlin, while maintaining a single, clean Dart codebase.",
            "Our developers are experts in Flutter state management models, enabling us to construct highly responsive apps that handle hundreds of user actions per second without memory leaks. Whether you are building a custom cafe point-of-sale terminal, a telehealth system, or a vehicle fleet tracker, Flutter provides a cohesive platform.",
            "By targeting native rendering interfaces directly, Flutter bypasses the JavaScript bridge entirely. This ensures that charts, complex animations, and camera inputs render smoothly at 60 to 120 frames per second."
        ]
    },
    "software-development": {
        title: "Custom Enterprise Software & ERPs",
        subtitle: "Bespoke business portals, CRM pipelines, and warehouse inventory managers built for operational efficiency.",
        tagline: "Automate manual workflows and manage data centrally",
        features: [
            "Custom-built ERP and CRM systems mapped to your exact business rules.",
            "Relational database schemas (PostgreSQL / MySQL) with transaction tracking.",
            "API integrations connecting legacy inventory sheets and logistics nodes.",
            "Detailed role-based access controls (RBAC) protecting sensitive folders."
        ],
        details: [
            "Generic off-the-shelf software solutions often force you to change your business operations to fit their templates. Custom software development allows you to code a system that mirrors your exact workflows, saving hours of manual data copying and reducing administrative overhead.",
            "We construct robust backend architectures utilizing .NET and Node.js microservices. These systems are connected to PostgreSQL database structures configured for transactional speed and data integrity. Every module we compile is backed by extensive automated test coverage, preventing regressions as your business grows.",
            "Whether you need to sync retail items across multiple physical store POS terminals, coordinate courier routes, or secure document shares inside a healthcare clinic, we build systems designed for reliability and scale."
        ]
    },
    "ai-solutions": {
        title: "Generative AI & LLM Integrations",
        subtitle: "Next-gen LLM support chatbots, semantic search indexers, and operational workflows.",
        tagline: "Leverage artificial intelligence to automate support and index data",
        features: [
            "Custom retrieval-augmented generation (RAG) indexing company manuals.",
            "Fine-tuned LLM agents automating support queues and intake fields.",
            "Semantic vector search algorithms facilitating immediate database retrieval.",
            "Secure VPC setups protecting proprietary system instructions."
        ],
        details: [
            "Artificial intelligence has moved beyond general knowledge prompts. Today, businesses are deploying generative models directly inside their proprietary networks to automate customer support, index documents, and summarize technical files.",
            "We integrate APIs from OpenAI, Anthropic, and open-source models (like Llama) to construct intelligent agents. By implementing vector databases and embedding search layers, these models retrieve facts from your business documentation, eliminating hallucinations and ensuring accurate customer communication.",
            "We prioritize security above all. All data is processed using private APIs, ensuring your business credentials, client chats, and proprietary procedures are never leaked or used to train public models."
        ]
    },
    "digital-marketing": {
        title: "Digital Marketing & SEO Solutions",
        subtitle: "Maximize your online presence, drive organic traffic, and acquire customers through targeted campaigns.",
        tagline: "Engage Your Target Audience and Drive Conversions",
        features: [
            "Advanced SEO audits, keyword research, and on-page optimization.",
            "Social Media Marketing (SMM) and content generation strategies.",
            "High-ROI PPC ad campaigns on Google Search, Meta, and LinkedIn.",
            "Comprehensive analytics dashboards and conversion tracking pipelines."
        ],
        details: [
            "Building high-performance software systems is just the first step. To generate revenue, your products need to be discoverable. At Gill Tech Solutions, we combine software engineering expertise with data-driven marketing strategies to help your brand rank higher on Google Search and acquire new users.",
            "Our team structures optimization campaigns around your target audience. We optimize metadata, improve loading speed, write semantic schema structures, and implement high-authority backlinks. As a result, search engine crawlers rank your web applications higher, driving organic traffic directly to your portals.",
            "We also design, configure, and manage paid ad funnels. We focus on search intent, lower acquisition costs, and run continuous conversion experiments (A/B tests). This ensures every dollar you spend on advertising delivers transparent, measurable returns."
        ]
    }
};

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const serviceName = params?.service as string;

    const data = serviceContent[serviceName as keyof typeof serviceContent];

    if (!data) {
        return (
            <main style={{ position: "relative" }}>
                <Navbar />
                <section className={styles.notFound}>
                    <div className={styles.container}>
                        <h2>Service Page Not Found</h2>
                        <button onClick={() => router.push("/services")} className={styles.backBtn}>
                            <ArrowLeft size={16} /> Back to Services
                        </button>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main style={{ position: "relative" }}>
            <Navbar />
            
            <section className={styles.hero}>
                <div className={styles.container}>
                    <button onClick={() => router.push("/services")} className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Services
                    </button>
                    
                    <span className="section-label">Service Specialization</span>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={styles.subtitle}>{data.subtitle}</p>
                </div>
            </section>

            {/* Main content grid */}
            <section className={styles.detailsSection}>
                <div className={styles.detailsGrid}>
                    <div className={styles.copyCol}>
                        <h2 className={styles.tagline}>{data.tagline}</h2>
                        {data.details.map((para, i) => (
                            <p key={i} className={styles.detailPara}>{para}</p>
                        ))}
                    </div>

                    <div className={styles.featuresCol}>
                        <div className={styles.featuresCard}>
                            <h3 className={styles.featuresTitle}>Core Deliverables</h3>
                            <div className={styles.featuresList}>
                                {data.features.map((feat, i) => (
                                    <div key={i} className={styles.featureItem}>
                                        <CheckCircle2 className={styles.featureIcon} size={18} />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.adCard}>
                            <Cpu className={styles.adIcon} size={28} />
                            <h4>Need a tailored consultation?</h4>
                            <p>Get a detailed estimate and workflow proposal for your engineering project.</p>
                            <button onClick={() => router.push("/contact")} className={styles.adCta}>
                                Request A Quote
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection />
            <LeadFormSection />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
