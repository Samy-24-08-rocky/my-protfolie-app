"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadFormSection from "@/components/LeadFormSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import styles from "./ContactPage.module.css";

const CONTACT_INFO = [
    { icon: Mail, label: "Email Support", val: "contact@gilltechsolutionsindia.info", href: "mailto:contact@gilltechsolutionsindia.info" },
    { icon: Phone, label: "Phone & Mobile", val: "+91 82648 88290", href: "tel:+918264888290" },
    { icon: MessageSquare, label: "WhatsApp Chat", val: "+91 82648 88290", href: "https://wa.me/918264888290" },
    { icon: MapPin, label: "Headquarters", val: "Bathinda, Punjab, India", href: "https://www.google.com/maps/search/Bathinda,+Punjab,+India" },
    { icon: Clock, label: "Working Hours", val: "Mon - Sat: 9:00 AM - 6:00 PM IST" }
];

export default function ContactPage() {
    return (
        <main style={{ position: "relative" }}>
            <Navbar />
            
            <section className={styles.hero}>
                <div className={styles.container}>
                    <span className="section-label">Reach Out</span>
                    <h1 className={styles.title}>Contact Our Sales & Support</h1>
                    <p className={styles.subtitle}>
                        Have questions about a feature scope or need custom software estimations? Get in touch with our team.
                    </p>
                </div>
            </section>

            <section className={styles.infoSection}>
                <div className={styles.infoGrid}>
                    <div className={styles.detailsBox}>
                        <h2 className={styles.secTitle}>Our Coordinates</h2>
                        <p className={styles.secText}>
                            Feel free to write us an email, give us a phone call, or message us on WhatsApp. Our customer support desk monitors lines continuously.
                        </p>
                        
                        <div className={styles.coordsList}>
                            {CONTACT_INFO.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div key={i} className={styles.coordItem}>
                                        <div className={styles.iconBox}><Icon size={18} /></div>
                                        <div>
                                            <span className={styles.coordLabel}>{item.label}</span>
                                            {item.href ? (
                                                <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.coordValLink}>
                                                    {item.val}
                                                </a>
                                            ) : (
                                                <span className={styles.coordVal}>{item.val}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Google Map Mockup */}
                    <div className={styles.mapCard}>
                        <div className={styles.mapTitle}>Our Location Mapping</div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55123.774436577884!2d74.91979927641042!3d30.21096752766322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917329cafab3ab9%3A0x280e72251a37c050!2sBathinda%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Gill Tech Solutions India Location"
                        />
                    </div>
                </div>
            </section>

            <LeadFormSection />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
