"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Shield, Lock, FileText, UserCheck, Scale } from "lucide-react";
import styles from "./LegalPage.module.css";

export default function PrivacyPolicyPage() {
    const lastUpdated = "June 3, 2026";
    
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
                        <span className="section-label">Compliance</span>
                        <h1 className={styles.title}>Privacy Policy</h1>
                        <p className={styles.subtitle}>
                            Last Updated: {lastUpdated} · Compliant with the IT Act, 2000 & Digital Personal Data Protection (DPDP) Act, 2023 of India.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className={styles.contentSection}>
                <motion.div 
                    className={styles.card}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {/* Introduction */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>1. Introduction</h2>
                        <p className={styles.secText}>
                            Welcome to <strong>Gill Tech Solutions India</strong> (referred to as "we", "us", "our", or "Company"). We operate under the proprietorship of <strong>Sumit Gill</strong> in Bathinda, Punjab, India. We are committed to protecting the privacy and personal data of our website visitors and clients (referred to as "Data Principal" or "you").
                        </p>
                        <p className={styles.secText}>
                            This Privacy Policy explains how we collect, store, process, and safeguard your personal data in accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, Section 43A of the <strong>Information Technology Act, 2000 (IT Act)</strong>, and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (IT Rules)</strong>.
                        </p>
                    </div>

                    {/* Consent */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>2. Consent and Legal Basis</h2>
                        <p className={styles.secText}>
                            By visiting our website and voluntarily providing your information through our contact or consultation intake forms, you give your free, specific, informed, unconditional, and unambiguous consent to the collection, storage, and processing of your personal data as described in this policy.
                        </p>
                        <p className={styles.secText}>
                            You have the right to withdraw your consent at any time by contacting our Grievance Officer. However, withdrawal of consent will not affect the lawfulness of any data processing carried out before such withdrawal.
                        </p>
                    </div>

                    {/* Data Collection */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>3. Personal Data We Collect</h2>
                        <p className={styles.secText}>
                            We collect personal data that you voluntarily provide to us when you request a consultation, message us on WhatsApp, or send an email. This includes:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><strong>Identity Data:</strong> Full Name.</li>
                            <li className={styles.listItem}><strong>Contact Data:</strong> Email Address and Mobile/Phone Number.</li>
                            <li className={styles.listItem}><strong>Professional Data:</strong> Company Name and associated business details.</li>
                            <li className={styles.listItem}><strong>Project Specifications:</strong> Descriptions of your project requirements, timelines, budget, and system constraints.</li>
                            <li className={styles.listItem}><strong>Technical Metadata:</strong> IP address, browser type, and basic analytics gathered via cookies.</li>
                        </ul>
                    </div>

                    {/* Purpose of Collection */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>4. Purpose of Data Processing</h2>
                        <p className={styles.secText}>
                            In compliance with the DPDP Act, 2023, we collect and process your personal data solely for specified, lawful purposes, including:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Providing free consultation estimates and engineering feedback.</li>
                            <li className={styles.listItem}>Responding to your inquiries and technical requests submitted through contact forms.</li>
                            <li className={styles.listItem}>Connecting with you on communication channels (such as WhatsApp, phone, or email) to discuss project specifications.</li>
                            <li className={styles.listItem}>Improving our website navigation, features, and service offerings.</li>
                            <li className={styles.listItem}>Fulfilling legal obligations under applicable Indian regulations.</li>
                        </ul>
                    </div>

                    {/* Security Measures */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>5. Security Practices and Data Retention</h2>
                        <p className={styles.secText}>
                            We adhere to reasonable security practices and procedures in compliance with Rule 8 of the Indian IT Rules, 2011. Your personal data is stored on secure cloud environments and database nodes protected by transport layer security (HTTPS) and encryption protocols. 
                        </p>
                        <p className={styles.secText}>
                            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required under Indian law. Once the purpose is satisfied or consent is withdrawn, we take reasonable steps to delete or anonymize your data.
                        </p>
                    </div>

                    {/* Data Sharing */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>6. Disclosure of Personal Data</h2>
                        <p className={styles.secText}>
                            We do not sell, rent, or trade your personal data to third parties. We may disclose your information:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>To trusted external cloud providers or tools assisting us in processing data (subject to strict data protection agreements).</li>
                            <li className={styles.listItem}>If required to do so under any applicable Indian law, court order, or by government agencies authorized under law to obtain information.</li>
                        </ul>
                    </div>

                    {/* Rights of Data Principal */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>7. Your Rights (Data Principal Rights)</h2>
                        <p className={styles.secText}>
                            Under the DPDP Act, 2023, you hold the following rights:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><strong>Right to Information:</strong> Access summaries of personal data being processed.</li>
                            <li className={styles.listItem}><strong>Right to Correction & Erasure:</strong> Correct inaccuracies or request erasure of your data when it is no longer required.</li>
                            <li className={styles.listItem}><strong>Right to Withdraw Consent:</strong> Withdraw your consent at any point in time.</li>
                            <li className={styles.listItem}><strong>Right of Grievance Redressal:</strong> Register grievances with our Grievance Officer and subsequently with the Data Protection Board of India if unresolved.</li>
                        </ul>
                    </div>

                    {/* Grievance Officer */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>8. Grievance Officer Details</h2>
                        <p className={styles.secText}>
                            In compliance with Section 5(9) of the Information Technology Rules, 2011 and the guidelines under the DPDP Act, 2023, the details of our Grievance Officer are provided below:
                        </p>
                        <div className={styles.officerCard}>
                            <div className={styles.officerTitle}>Grievance Officer: Sumit Gill</div>
                            <div className={styles.officerText}><strong>Designation:</strong> Founder & Lead Architect</div>
                            <div className={styles.officerText}><strong>Entity Name:</strong> Gill Tech Solutions India</div>
                            <div className={styles.officerText}><strong>Email:</strong> contact@gilltechsolutionsindia.info</div>
                            <div className={styles.officerText}><strong>Address:</strong> Bathinda, Punjab, India</div>
                        </div>
                    </div>

                    {/* Governing Law */}
                    <div className={styles.block}>
                        <h2 className={styles.secTitle}>9. Governing Law and Jurisdiction</h2>
                        <p className={styles.secText}>
                            This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising under or in relation to this policy shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Bathinda, Punjab, India</strong>.
                        </p>
                    </div>
                </motion.div>
            </section>
            
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
