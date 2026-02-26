"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import styles from "./Gallery.module.css";
import { Reveal } from "./Reveal";

import { useState, useEffect } from "react";

const Gallery = () => {
    const [items, setItems] = useState<any[]>([]);

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
            } catch (error) {
                console.error("Failed to load gallery items", error);
                setItems(getDefaultItems());
            }
        };

        const getDefaultItems = () => [
            {
                id: 1,
                type: "image",
                src: "/projects/web-app.png",
                title: "E-Commerce Dashboard",
                category: "Web App"
            },
            {
                id: 2,
                type: "video",
                src: "/projects/mobile-app.png",
                title: "Fitness Tracker Demo",
                category: "Mobile UI"
            }
        ];

        fetchGalleryData();
    }, []);
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

            <div className={styles.grid}>
                {items.map((item, index) => (
                    <motion.div
                        key={item._id || item.id || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={styles.item}
                    >
                        {item.type === "video" && (
                            <div className={styles.videoIcon}>
                                <Play size={20} fill="currentColor" />
                            </div>
                        )}

                        <div className={styles.mediaWrapper}>
                            {item.src ? (
                                item.type === "video" ? (
                                    <video
                                        src={item.src}
                                        controls
                                        loop
                                        muted
                                        playsInline
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'black' }}
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
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    )
                                )
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'var(--placeholder-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No Media
                                </div>
                            )}
                        </div>

                        <div className={styles.overlay}>
                            <p className={styles.itemCategory}>{item.category}</p>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
