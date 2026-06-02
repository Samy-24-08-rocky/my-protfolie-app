"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useToast } from "./Toast";
import styles from "./LeadFormSection.module.css";


const LeadFormSection = () => {
    const { showToast } = useToast();
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitType, setSubmitType] = useState<"email" | "whatsapp">("email");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.subject = `New Lead Inquiry - ${data.company || "No Company"}`;
        data.message = `Phone: ${data.mobile || "N/A"}. Details: ${data.details || "N/A"}`;

        setSending(true);
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                showToast("Consultation requested successfully! 🚀", "success");
                
                if (submitType === "whatsapp") {
                    const waMessage = `*New Lead Inquiry - Ask for Price*\n\n` +
                                      `*Name:* ${data.name}\n` +
                                      `*Email:* ${data.email}\n` +
                                      `*Phone:* ${data.mobile}\n` +
                                      `*Company:* ${data.company || "N/A"}\n\n` +
                                      `*Project Details:*\n${data.details}`;
                    const waUrl = `https://wa.me/918264888290?text=${encodeURIComponent(waMessage)}`;
                    window.open(waUrl, "_blank");
                }

                setSubmitted(true);
                form.reset();
            } else {
                showToast("Request failed. Please try again.", "error");
            }
        } catch {
            showToast("Network error. Please check your connection.", "error");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.textSide}>
                    <span className="section-label">Get in Touch</span>
                    <h2 className={styles.title}>Let's Build Something Great Together</h2>
                    <p className={styles.desc}>
                        Fill out the form to request a free engineering consultation. Our solutions architect will review your project and get back to you within 24 hours.
                    </p>
                    
                    <div className={styles.benefits}>
                        <div className={styles.benefitItem}>
                            <CheckCircle2 className={styles.benefitIcon} size={18} />
                            <span>100% Free Discovery Session</span>
                        </div>
                        <div className={styles.benefitItem}>
                            <CheckCircle2 className={styles.benefitIcon} size={18} />
                            <span>NDA Signed Prior to Architecture Planning</span>
                        </div>
                        <div className={styles.benefitItem}>
                            <CheckCircle2 className={styles.benefitIcon} size={18} />
                            <span>Detailed Project Estimate & Timeline Proposal</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formSide}>
                    <motion.div 
                        className={styles.formCard}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {submitted ? (
                            <div className={styles.successState}>
                                <div className={styles.successIcon}>🎉</div>
                                <h3 className={styles.successTitle}>Request Submitted!</h3>
                                <p className={styles.successDesc}>
                                    Thank you for reaching out. We have received your project details and will email or call you shortly to schedule our discovery session.
                                </p>
                                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Name *</label>
                                        <input name="name" type="text" className={styles.input} placeholder="Sumit Gill" required />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Email *</label>
                                        <input name="email" type="email" className={styles.input} placeholder="name@company.com" required />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Phone *</label>
                                        <input name="mobile" type="tel" className={styles.input} placeholder="+91 XXXXX XXXXX" required />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Company Name</label>
                                        <input name="company" type="text" className={styles.input} placeholder="e.g. Gill Tech Solutions" />
                                    </div>
                                </div>


                                <div className={styles.field}>
                                    <label className={styles.label}>Project Details *</label>
                                    <textarea 
                                        name="details" 
                                        className={styles.textarea} 
                                        rows={4} 
                                        placeholder="Describe your project, app, target features, timelines, or constraints..." 
                                        required 
                                    />
                                </div>

                                <div className={styles.buttonGroup}>
                                    <button 
                                        type="submit" 
                                        className={styles.submitBtn} 
                                        disabled={sending}
                                        onClick={() => setSubmitType("email")}
                                    >
                                        {sending ? "Submitting Inquiry..." : <>Request Consultation <Send size={16} /></>}
                                    </button>
                                    <button 
                                        type="submit" 
                                        className={styles.whatsappSubmitBtn} 
                                        disabled={sending}
                                        onClick={() => setSubmitType("whatsapp")}
                                    >
                                        Ask for Price (WhatsApp) 💬
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LeadFormSection;
