"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Facebook } from "lucide-react";
import styles from "./Contact.module.css";
import { Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

const Contact = () => {
    return (
        <section id="contact">
            <div className={styles.contactContainer}>
                <div className={styles.contactInfo}>
                    <Reveal>
                        <h2>
                            Let's <span className="text-gradient">Connect</span>
                        </h2>
                    </Reveal>
                    <Reveal>
                        <p>
                            Have a project in mind or just want to say hello? I'm always open
                            to discussing new opportunities and creative ideas.
                        </p>
                    </Reveal>

                    <div className={styles.contactList}>
                        {[
                            { icon: <Mail size={20} />, label: "Email Me", value: "sumitgill375@gmail.com", href: "mailto:sumitgill375@gmail.com" },
                            { icon: <Facebook size={20} />, label: "Facebook", value: "Sumit Gill", href: "https://facebook.com" },
                            { icon: <Phone size={20} />, label: "Call Me", value: "+91 82648 88290", href: "tel:+918264888290" },
                            { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "+91 82648 88290", href: "https://wa.me/918264888290" },
                            { icon: <MapPin size={20} />, label: "Location", value: "Bathinda, Punjab, India" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {item.href ? (
                                    <a href={item.href} className={styles.contactItem} style={{ textDecoration: "none", color: "inherit" }}>
                                        <div className={styles.iconBox}>{item.icon}</div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: "0.8rem" }}>{item.label}</p>
                                            <p style={{ margin: 0, fontWeight: "bold" }}>{item.value}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className={styles.contactItem}>
                                        <div className={styles.iconBox}>{item.icon}</div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: "0.8rem" }}>{item.label}</p>
                                            <p style={{ margin: 0, fontWeight: "bold" }}>{item.value}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`glass-card ${styles.formCard}`}
                >
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const target = e.target as HTMLFormElement;
                        const formData = new FormData(target);
                        const data = Object.fromEntries(formData.entries());
                        const submitBtn = target.querySelector('button[type="submit"]') as HTMLButtonElement;
                        const originalText = submitBtn.innerHTML;

                        try {
                            submitBtn.innerHTML = 'Sending...';
                            submitBtn.disabled = true;

                            const res = await fetch('/api/messages', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data)
                            });

                            if (res.ok) {
                                alert("Thank you! Your message has been sent successfully.");
                                target.reset();
                            } else {
                                alert("Failed to send message. Please try again.");
                            }
                        } catch (error) {
                            console.error("Message send error:", error);
                            alert("Something went wrong. Please check your connection.");
                        } finally {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }
                    }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input name="name" type="text" className={styles.input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input name="email" type="email" className={styles.input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Mobile Number</label>
                            <input name="mobile" type="tel" className={styles.input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Subject</label>
                            <input name="subject" type="text" className={styles.input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Message</label>
                            <textarea name="message" className={styles.textarea} rows={5} required></textarea>
                        </div>

                        <Magnetic>
                            <button type="submit" className={styles.submitBtn}>
                                Send Message <Send size={18} style={{ marginLeft: 8, display: "inline" }} />
                            </button>
                        </Magnetic>
                    </form>
                </motion.div>
            </div>
        </section >
    );
};

export default Contact;
