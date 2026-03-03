"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import styles from "./Gallery.module.css";
import { Reveal } from "./Reveal";
import { useState, useEffect, useCallback } from "react";

const Gallery = () => {
    const [items, setItems] = useState<any[]>([]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = res.ok ? await res.json() : [];
                if (data && data.length > 0) {
                    setItems(data);
                } else {
                    setItems(getDefaultItems());
                }
            } catch {
                setItems(getDefaultItems());
            }
        };

        const getDefaultItems = () => [
            { id: 1, type: "image", src: "/projects/web-app.png", title: "E-Commerce Dashboard", category: "Web App" },
            { id: 2, type: "video", src: "/projects/mobile-app.png", title: "Fitness Tracker Demo", category: "Mobile UI" },
        ];

        fetchGalleryData();
    }, []);

    const categories = ["All", ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))];
    const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prev = useCallback(() => setLightboxIndex(i => (i! > 0 ? i! - 1 : filtered.length - 1)), [filtered.length]);
    const next = useCallback(() => setLightboxIndex(i => (i! < filtered.length - 1 ? i! + 1 : 0)), [filtered.length]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxIndex, closeLightbox, prev, next]);

    return (
        <section id="gallery" className={styles.gallery}>
            <div className={styles.sectionHeader}>
                <Reveal width="100%">
                    <h2 className={styles.sectionTitle}>
                        Media <span className="text-gradient">Gallery</span>
                    </h2>
                </Reveal>
                <Reveal width="100%">
                    <p className={styles.sectionSubtitle}>
                        A visual journey through my design process and software demonstrations.
                    </p>
                </Reveal>
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
                <div className={styles.filterRow}>
                    {categories.map(cat => (
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

            <div className={styles.grid}>
                {filtered.map((item, index) => (
                    <motion.div
                        key={item._id || item.id || index}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className={styles.item}
                        onClick={() => openLightbox(index)}
                    >
                        {item.type === "video" && (
                            <div className={styles.videoIcon}>
                                <Play size={20} fill="currentColor" />
                            </div>
                        )}
                        <div className={styles.hoverOverlay}>
                            <Maximize2 size={22} />
                            <span>{item.title}</span>
                        </div>

                        <div className={styles.mediaWrapper}>
                            {item.src ? (
                                item.type === "video" ? (
                                    <video
                                        src={item.src}
                                        muted
                                        playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                                    />
                                ) : (
                                    item.src.includes('res.cloudinary.com') ? (
                                        <CldImage
                                            src={item.src}
                                            alt={item.title}
                                            width={800}
                                            height={600}
                                            crop="fill"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )
                                )
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'var(--placeholder-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No Media
                                </div>
                            )}
                        </div>

                        <div className={styles.itemMeta}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            {item.category && <span className={styles.itemCat}>{item.category}</span>}
                        </div>
                    </motion.div>
                ))}
            </div>

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
                            className={styles.lightboxContent}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={styles.lightboxClose} onClick={closeLightbox}><X size={20} /></button>
                            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={prev}><ChevronLeft size={28} /></button>
                            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={next}><ChevronRight size={28} /></button>

                            <div className={styles.lightboxMedia}>
                                {filtered[lightboxIndex]?.type === "video" ? (
                                    <video
                                        src={filtered[lightboxIndex].src}
                                        controls
                                        autoPlay
                                        style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '12px' }}
                                    />
                                ) : (
                                    <img
                                        src={filtered[lightboxIndex]?.src}
                                        alt={filtered[lightboxIndex]?.title}
                                        style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '12px', objectFit: 'contain' }}
                                    />
                                )}
                            </div>
                            <div className={styles.lightboxInfo}>
                                <strong>{filtered[lightboxIndex]?.title}</strong>
                                {filtered[lightboxIndex]?.category && (
                                    <span className={styles.itemCat}>{filtered[lightboxIndex].category}</span>
                                )}
                                <span className={styles.lightboxCount}>{lightboxIndex + 1} / {filtered.length}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
