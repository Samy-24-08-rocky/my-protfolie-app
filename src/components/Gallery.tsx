"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import styles from "./Gallery.module.css";
import { Reveal } from "./Reveal";
import { useState, useEffect, useCallback } from "react";

const Gallery = () => {
    const [items, setItems] = useState<any[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = res.ok ? await res.json() : [];
                setItems(data.length > 0 ? data : getDefaults());
            } catch {
                setItems(getDefaults());
            }
        };
        const getDefaults = () => [
            { id: 1, type: "image", src: "/projects/ecommerce_dashboard.png", title: "E-Commerce Dashboard", category: "Web Apps" },
            { id: 2, type: "image", src: "/projects/fitness_tracker.png", title: "Fitness Tracker Mobile", category: "Mobile Apps" },
            { id: 3, type: "image", src: "/projects/ecotrack_preview.png", title: "EcoTrack Environmental App", category: "Web Apps" },
            { id: 4, type: "image", src: "/projects/nexus_preview.png", title: "Nexus Enterprise Portal", category: "Enterprise" },
            { id: 5, type: "image", src: "/projects/gilltech_preview.png", title: "Gill Tech Agency Console", category: "Enterprise" },
            { id: 6, type: "image", src: "/projects/mobile-app.png", title: "Hospitality Ordering App", category: "Mobile Apps" },
            { id: 7, type: "image", src: "/projects/web-app.png", title: "Supply Chain Dispatcher Hub", category: "Web Apps" }
        ];
        fetchGallery();
    }, []);

    const cats = ["All", ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))];
    const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

    const openLightbox = (idx: number) => setLightboxIndex(idx);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prev = useCallback(() => setLightboxIndex(i => (i! > 0 ? i! - 1 : filtered.length - 1)), [filtered.length]);
    const next = useCallback(() => setLightboxIndex(i => (i! < filtered.length - 1 ? i! + 1 : 0)), [filtered.length]);

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [lightboxIndex, closeLightbox, prev, next]);

    return (
        <section id="gallery" className={styles.gallerySection}>
            {/* Header */}
            <div className={styles.header}>
                <span className="section-label">Gallery</span>
                <Reveal width="100%">
                    <h2 className={styles.heading}>
                        Visual <span className="text-gradient">Showcase</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.subheading}>
                        A visual journey through my design process and projects.
                    </p>
                </Reveal>

                {/* Filters */}
                {cats.length > 1 && (
                    <div className={styles.filters}>
                        {cats.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${filter === cat ? styles.filterBtnActive : ""}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grid */}
            <motion.div className={styles.grid} layout>
                <AnimatePresence mode="popLayout">
                    {filtered.map((item, idx) => (
                        <motion.div
                            key={item._id || item.id || idx}
                            layout
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.88 }}
                            transition={{ delay: idx * 0.06, duration: 0.4 }}
                            className={`glass-card ${styles.item}`}
                            onClick={() => openLightbox(idx)}
                        >
                            {/* Video badge */}
                            {item.type === "video" && (
                                <div className={styles.videoBadge}>
                                    <Play size={14} fill="currentColor" />
                                </div>
                            )}

                            {/* Media */}
                            <div className={styles.media}>
                                {item.src ? (
                                    item.type === "video" ? (
                                        <video src={item.src} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )
                                ) : (
                                    <div className={styles.noMedia}>No Media</div>
                                )}
                            </div>

                            {/* Hover overlay */}
                            <div className={styles.overlay}>
                                <ZoomIn size={24} />
                                <span>{item.title}</span>
                            </div>

                            {/* Meta */}
                            <div className={styles.meta}>
                                <span className={styles.metaTitle}>{item.title}</span>
                                {item.category && <span className={styles.metaCat}>{item.category}</span>}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className={styles.lightboxInner}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 280, damping: 26 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={styles.lbClose} onClick={closeLightbox}><X size={20} /></button>
                            <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={prev}><ChevronLeft size={26} /></button>
                            <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={next}><ChevronRight size={26} /></button>

                            <div className={styles.lbMedia}>
                                {filtered[lightboxIndex]?.type === "video" ? (
                                    <video src={filtered[lightboxIndex].src} controls autoPlay style={{ maxWidth: '100%', maxHeight: '72vh', borderRadius: '12px' }} />
                                ) : (
                                    <img src={filtered[lightboxIndex]?.src} alt={filtered[lightboxIndex]?.title} style={{ maxWidth: '100%', maxHeight: '72vh', borderRadius: '12px', objectFit: 'contain' }} />
                                )}
                            </div>

                            <div className={styles.lbInfo}>
                                <strong>{filtered[lightboxIndex]?.title}</strong>
                                {filtered[lightboxIndex]?.category && <span className={styles.metaCat}>{filtered[lightboxIndex].category}</span>}
                                <span className={styles.lbCount}>{lightboxIndex + 1} / {filtered.length}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
