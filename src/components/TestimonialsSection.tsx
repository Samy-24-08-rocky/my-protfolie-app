"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./TestimonialsSection.module.css";

interface Review {
    _id?: string;
    id?: string;
    stars: number;
    quote: string;
    author: string;
    role: string;
    company: string;
}

const defaultReviews: Review[] = [
    {
        stars: 5,
        quote: "Gill Tech Solutions delivered our Cafe POS app on time and exceeded expectations. Manual ordering operations were cut by 70% in the first two months.",
        author: "Gurpreet S. Gill",
        role: "Managing Director",
        company: "Gill Cafes & Hospitality"
    },
    {
        stars: 5,
        quote: "Their team was extremely professional in handling our healthcare portal rewrite. The HIPAA-compliant system is secure, lightning fast, and patients love the video check-ins.",
        author: "Dr. Amrit Pal Singh",
        role: "Director of Care",
        company: "CareHub Clinical Network"
    },
    {
        stars: 5,
        quote: "The ML-powered logistics telemetry system they built reduced our fleet's fuel consumption by 22%. Outstanding communication, agile delivery, and dedicated post-launch support.",
        author: "Rajesh Sharma",
        role: "Chief Technology Officer",
        company: "Sharma TransLogistics Ltd."
    },
    {
        stars: 5,
        quote: "Incredible design aesthetics! They rebuilt our eCommerce storefront, integrated multiple payment gateways, and optimized our checkout flow. Sales conversions are up 45%.",
        author: "Meera Iyer",
        role: "E-Commerce Head",
        company: "Aura Artisan Retail"
    }
];

const TestimonialsSection = () => {
    const [dbReviews, setDbReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('/api/testimonials', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setDbReviews(data || []);
                }
            } catch (err) {
                console.error("Failed to fetch testimonials:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (loading) return null;
    if (dbReviews.length === 0) return null;

    const reviewsToRender = dbReviews;

    return (
        <section id="testimonials" className={styles.wrapper}>
            <div className={styles.header}>
                <span className="section-label">Reviews</span>
                <h2 className={styles.title}>Client Testimonials</h2>
                <p className={styles.subtitle}>
                    Hear what business leaders say about working with Gill Tech Solutions.
                </p>
            </div>

            <div className={styles.grid}>
                {reviewsToRender.map((rev: Review, index: number) => (
                    <motion.div
                        key={rev.author + index}
                        className={styles.card}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className={styles.starRow}>
                            {[...Array(rev.stars)].map((_, i: number) => (
                                <Star key={i} size={16} className={styles.star} fill="currentColor" />
                            ))}
                        </div>
                        <p className={styles.quote}>"{rev.quote}"</p>
                        <div className={styles.authorMeta}>
                            <div className={styles.avatar}>
                                {rev.author ? rev.author.charAt(0) : "C"}
                            </div>
                            <div>
                                <h4 className={styles.authorName}>{rev.author}</h4>
                                <p className={styles.authorDesc}>{rev.role}, {rev.company}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
