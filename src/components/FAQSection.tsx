"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FAQSection.module.css";

const faqs = [
    {
        q: "How much does a website cost?",
        a: "Our website development projects are custom quoted. The final budget is based on page count, structural layout, database requirements, and third-party API configurations."
    },
    {
        q: "How much does a mobile app cost?",
        a: "Mobile app pricing depends on feature complexity, platform targeting (native iOS/Android or cross-platform Flutter/React Native), and API infrastructure. We provide a flat-rate estimate after our initial Discovery Call."
    },
    {
        q: "Do you provide post-launch support and maintenance?",
        a: "Yes, we offer monthly SLA support agreements that cover prompt security patching, database optimization, cloud hosting audits, and code modifications to keep systems running smoothly."
    },
    {
        q: "Which tech stack is best for my business?",
        a: "We recommend Next.js/React for fast-loading, SEO-optimized business websites, and Flutter/React Native for mobile apps to build single-codebase apps and reduce client costs. Backend integrations are built using Node.js or .NET."
    },
    {
        q: "How long does it take to build a custom CRM or ERP system?",
        a: "A custom business portal, CRM, or ERP dashboard typically takes between 6 to 12 weeks to design, develop, test, and securely launch to production."
    },
    {
        q: "Will my website look great on mobile phones?",
        a: "Yes. Every website we design is coded mobile-first. This guarantees that layout scales, typography, and interactive components render perfectly across all phones, tablets, and wide monitors."
    },
    {
        q: "Can you integrate AI features and chatbots into our current apps?",
        a: "Yes, we specialize in AI integrations. We build custom OpenAI/Claude chatbot agents, automated lead qualifiers, semantic search configurations, and prompt management layers."
    },
    {
        q: "Do you sign Non-Disclosure Agreements (NDAs)?",
        a: "Yes, we respect your intellectual property. We routinely sign binding NDAs before discussing any technical logic or business parameters."
    },
    {
        q: "What is your project payment structure?",
        a: "We divide billing into milestone intervals: typically 30% project kickoff, 40% mid-development review, and 30% final verification audit prior to server launch."
    },
    {
        q: "Can you build solutions that integrate with our existing APIs?",
        a: "Yes, we can. We are experienced in auditing legacy databases, writing robust middle-tier APIs (.NET/Node.js), and creating secure database handshakes."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Questions</span>
                <h2 className={styles.title}>Frequently Asked Questions</h2>
                <p className={styles.subtitle}>
                    Find quick answers to common questions about our technical capabilities and billing processes.
                </p>
            </div>

            <div className={styles.list}>
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={index} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                            <button className={styles.trigger} onClick={() => toggleOpen(index)}>
                                <span className={styles.question}>{faq.q}</span>
                                <span className={styles.iconBox}>
                                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </span>
                            </button>
                            
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className={styles.contentWrapper}
                                    >
                                        <div className={styles.contentBody}>
                                            <p className={styles.answer}>{faq.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQSection;
