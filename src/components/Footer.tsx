"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Code2,
    ArrowUpRight,
    Mail,
    Phone,
    MessageCircle,
    ArrowRight,
    Facebook
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.glow} />

            <div className={styles.container}>
                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.ctaTitle}
                    >
                        Ready to build something <span className="text-gradient">extraordinary?</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="#contact" className={styles.ctaBtn}>
                            Let's Talk <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>

                {/* Main Footer Content */}
                <div className={styles.mainGrid}>
                    <div className={styles.brandCol}>
                        <h3>
                            <div className={styles.brandIcon}>
                                <Code2 size={20} color="white" />
                            </div>
                            <span>SUMIT GILL</span>
                        </h3>
                        <p className={styles.brandDesc}>
                            A dedicated software developer crafting high-performance,
                            user-centric digital solutions with modern technologies.
                        </p>
                    </div>

                    <div className={styles.navCol}>
                        <h4>Navigation</h4>
                        <ul className={styles.navLinks}>
                            <li><Link href="#home" className={styles.navLink}>Home</Link></li>
                            <li><Link href="#about" className={styles.navLink}>About Me</Link></li>
                            <li><Link href="#skills" className={styles.navLink}>Expertise</Link></li>
                            <li><Link href="#projects" className={styles.navLink}>Selected Works</Link></li>
                        </ul>
                    </div>

                    <div className={styles.navCol}>
                        <h4>Contact Info</h4>
                        <ul className={styles.navLinks}>
                            <li>
                                <a href="mailto:sumitgill375@gmail.com" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                                    <Mail size={16} /> sumitgill375@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+918264888290" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                                    <Phone size={16} /> +91 82648 88290
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/918264888290" target="_blank" rel="noreferrer" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                                    <MessageCircle size={16} /> WhatsApp
                                </a>
                            </li>
                            <li className={styles.navLink}>
                                Bathinda, Punjab, India
                            </li>
                        </ul>
                    </div>

                    <div className={styles.navCol}>
                        <h4>Socials</h4>
                        <div className={styles.socialGrid}>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><Github size={20} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><Linkedin size={20} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><Twitter size={20} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><Instagram size={20} /></a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialIcon}><Facebook size={20} /></a>
                            <a href="mailto:sumitgill375@gmail.com" className={styles.socialIcon}><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={styles.bottom}>
                    <p>© {currentYear} Sumit Gill. Crafted with passion.</p>
                    <div className={styles.legalLinks}>
                        <Link href="/admin" className={styles.legalLink}>Admin Panel</Link>
                        <a href="#" className={styles.legalLink} onClick={(e) => { e.preventDefault(); alert("Privacy Policy coming soon."); }}>Privacy Policy</a>
                        <a href="#" className={styles.legalLink} onClick={(e) => { e.preventDefault(); alert("Terms of Service coming soon."); }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
