"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Star, Check, Send, RefreshCcw } from "lucide-react";
import Link from "next/link";
import styles from "./RatePage.module.css";

export default function RatePage() {
    const [stars, setStars] = useState(5);
    const [hoveredStars, setHoveredStars] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        author: "",
        role: "",
        company: "",
        quote: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.author || !formData.quote) {
            alert("Author Name and Testimonial text are required fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    stars,
                    approved: false // Starts as pending for safety
                })
            });

            if (res.ok) {
                setSuccess(true);
                setFormData({ author: "", role: "", company: "", quote: "" });
                setStars(5);
            } else {
                alert("Failed to submit review. Please try again later.");
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("Failed to submit review due to a connection error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.wrapper}>
            <Navbar />

            <div className={styles.mainContent}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className="section-label">Feedback</span>
                        <h1 className={styles.title}>Submit Your Review</h1>
                        <p className={styles.subtitle}>
                            We value your feedback. Let us know about your experience working with Gill Tech Solutions India.
                        </p>
                    </div>

                    <div className={styles.card}>
                        {success ? (
                            <div className={styles.successBox}>
                                <div className={styles.successIcon}>
                                    <Check size={40} />
                                </div>
                                <h2 className={styles.successTitle}>Review Submitted!</h2>
                                <p className={styles.successText}>
                                    Thank you for sharing your experience! Your rating and testimonial have been recorded successfully. To maintain site quality, reviews are screened and will display live as soon as they are approved by our administrator.
                                </p>
                                <Link href="/" className={styles.homeBtn}>
                                    Return to Homepage
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Your Rating *</label>
                                    <div className={styles.starsContainer}>
                                        {[1, 2, 3, 4, 5].map((num) => {
                                            const isFilled = hoveredStars !== null ? num <= hoveredStars : num <= stars;
                                            return (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    className={`${styles.starBtn} ${isFilled ? styles.starActive : ""}`}
                                                    onClick={() => setStars(num)}
                                                    onMouseEnter={() => setHoveredStars(num)}
                                                    onMouseLeave={() => setHoveredStars(null)}
                                                    title={`Rate ${num} Star${num > 1 ? "s" : ""}`}
                                                >
                                                    <Star
                                                        size={32}
                                                        fill={isFilled ? "currentColor" : "none"}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Full Name *</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="e.g. Gurpreet Singh"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Your Job Title / Role</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="e.g. Managing Director"
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Company Name</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="e.g. Gill Cafes"
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Your Review / Testimonial Text *</label>
                                    <textarea
                                        className={styles.textarea}
                                        placeholder="Write details about the project we completed for you, our communication quality, and results delivered..."
                                        value={formData.quote}
                                        onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <RefreshCcw size={18} style={{ animation: "spin 1s linear infinite" }} />
                                            Submitting Review...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Submit Testimonial
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
