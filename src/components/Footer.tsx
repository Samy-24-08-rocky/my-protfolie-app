"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MessageCircle, Instagram, Facebook, ArrowUpRight, MapPin } from "lucide-react";
import styles from "./Footer.module.css";
import Logo from "./Logo";

const NAV_LINKS = [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const SOCIALS = [
    { icon: <Instagram size={18} />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Facebook size={18} />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Mail size={18} />, href: "mailto:contact@gilltechsolutionsindia.info", label: "Email" },
];

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            {/* Big CTA strip */}
            <div className={styles.cta}>
                <div className={styles.ctaInner}>
                    <motion.h2
                        className={styles.ctaTitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Got a project idea?<br />
                        <span className="text-gradient">Let's make it real.</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="#contact" className={styles.ctaBtn}>
                            Start a Conversation <ArrowUpRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Main footer */}
            <div className={styles.main}>
                <div className={styles.brand}>
                    <Logo size={40} />
                    <div>
                        <div className={styles.brandName}>Gill Tech Solutions India</div>
                        <p className={styles.brandDesc}>
                            Crafting high-performance digital products with modern technologies and thoughtful design.
                        </p>
                        <div className={styles.socials}>
                            {SOCIALS.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Navigation</h4>
                    <ul className={styles.colList}>
                        {NAV_LINKS.map(l => (
                            <li key={l.label}>
                                <Link href={l.href} className={styles.colLink}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Contact</h4>
                    <ul className={styles.colList}>
                        <li>
                            <a href="mailto:contact@gilltechsolutionsindia.info" className={styles.colLink}>
                                <Mail size={14} />contact@gilltechsolutionsindia.info
                            </a>
                        </li>
                        <li>
                            <a href="tel:+918264888290" className={styles.colLink}>
                                <Phone size={14} />+91 82648 88290
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/918264888290" target="_blank" rel="noopener noreferrer" className={styles.colLink}>
                                <MessageCircle size={14} />WhatsApp
                            </a>
                        </li>
                        <li>
                            <a href="https://www.google.com/maps/search/Bathinda,+Punjab,+India" target="_blank" rel="noopener noreferrer" className={styles.colLink}>
                                <MapPin size={14} />Bathinda, Punjab, India
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottom}>
                <p>© {year} Sumit Gill · Gill Tech Solutions India. All rights reserved.</p>
                <div className={styles.bottomLinks}>
                    <Link href="/admin" className={styles.bottomLink}>Admin Panel</Link>
                    <a href="#" className={styles.bottomLink} onClick={e => { e.preventDefault(); alert("Privacy Policy coming soon."); }}>Privacy</a>
                    <a href="#" className={styles.bottomLink} onClick={e => { e.preventDefault(); alert("Terms coming soon."); }}>Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
