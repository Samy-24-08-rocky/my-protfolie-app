"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Facebook, Clock } from "lucide-react";
import styles from "./Contact.module.css";
import { Reveal } from "./Reveal";
import { useToast } from "./Toast";
import { useState } from "react";

const CONTACT_ITEMS = [
    { icon: <Mail size={20} />, label: "Email", value: "contact@gilltechsolutionsindia.info", href: "mailto:contact@gilltechsolutionsindia.info" },
    { icon: <Phone size={20} />, label: "Phone", value: "+91 82648 88290", href: "tel:+918264888290" },
    { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "+91 82648 88290", href: "https://wa.me/918264888290" },
    { icon: <Facebook size={20} />, label: "Facebook", value: "Sumit Gill", href: "https://facebook.com" },
    { icon: <MapPin size={20} />, label: "Location", value: "Bathinda, Punjab, India", href: "https://www.google.com/maps/search/Bathinda,+Punjab,+India" },
    { icon: <Clock size={20} />, label: "Timezone", value: "IST (UTC +5:30)" },
];

const Contact = () => {
    const { showToast } = useToast();
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        setSending(true);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                showToast("Message sent! I'll get back to you soon. ✉️", "success");
                form.reset();
            } else {
                showToast("Failed to send. Please try again.", "error");
            }
        } catch {
            showToast("Network error. Check your connection.", "error");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className={styles.contactSection}>
            {/* Header */}
            <div className={styles.header}>
                <span className="section-label">Say Hello</span>
                <Reveal width="100%">
                    <h2 className={styles.heading}>
                        Let's <span className="text-gradient">Work Together</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.subheading}>
                        Have a project in mind? I'd love to hear about it. Send me a message and let's build something great.
                    </p>
                </Reveal>
            </div>

            <div className={styles.grid}>
                {/* Contact info cards */}
                <div className={styles.infoCol}>
                    <div className={styles.infoGrid}>
                        {CONTACT_ITEMS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                {item.href ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`glass-card ${styles.infoCard}`}>
                                        <div className={styles.infoIcon}>{item.icon}</div>
                                        <div>
                                            <p className={styles.infoLabel}>{item.label}</p>
                                            <p className={styles.infoValue}>{item.value}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className={`glass-card ${styles.infoCard}`}>
                                        <div className={styles.infoIcon}>{item.icon}</div>
                                        <div>
                                            <p className={styles.infoLabel}>{item.label}</p>
                                            <p className={styles.infoValue}>{item.value}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Availability note */}
                    <motion.div
                        className={styles.availability}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className={styles.availDot} />
                        <span>Currently available for new projects</span>
                    </motion.div>
                </div>

                {/* Form */}
                <motion.div
                    className={`glass-card ${styles.formCard}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className={styles.formTitle}>Send a Message</h3>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Full Name *</label>
                                <input id="contact-name" name="name" type="text" className={styles.input} placeholder="Sumit Gill" required />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Email *</label>
                                <input id="contact-email" name="email" type="email" className={styles.input} placeholder="" required />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Mobile</label>
                                <input id="contact-mobile" name="mobile" type="tel" className={styles.input} placeholder="+91" />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Subject *</label>
                                <input id="contact-subject" name="subject" type="text" className={styles.input} placeholder="Project Inquiry" required />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Message *</label>
                            <textarea id="contact-message" name="message" className={styles.textarea} rows={5} placeholder="Tell me about your project..." required />
                        </div>
                        <button id="contact-submit" type="submit" className={styles.submitBtn} disabled={sending}>
                            {sending ? "Sending…" : <>Send Message <Send size={16} /></>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
