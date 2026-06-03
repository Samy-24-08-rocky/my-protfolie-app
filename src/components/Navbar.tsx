"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import { openCalendly } from "./GlobalCalendly";

const NAV_LINKS = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [active, setActive] = useState("home");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section via intersection
    useEffect(() => {
        const sections = NAV_LINKS.map(l => {
            const hashIndex = l.href.indexOf("#");
            if (hashIndex !== -1) {
                return document.getElementById(l.href.slice(hashIndex + 1));
            }
            return null;
        }).filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
        );
        sections.forEach(s => s && observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMobileMenuOpen(false);
        if (typeof window !== "undefined" && window.location.pathname === "/") {
            const hashIndex = href.indexOf("#");
            if (hashIndex !== -1) {
                const id = href.slice(hashIndex + 1);
                const el = document.getElementById(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth" });
                    setActive(id);
                }
            }
        }
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        >
            <div className={styles.inner}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <Logo size={32} />
                    <span className={styles.logoText}>Gill Tech</span>
                </Link>

                {/* Desktop Links */}
                <ul className={styles.links}>
                    {NAV_LINKS.map(link => {
                        const hashIndex = link.href.indexOf("#");
                        const linkId = hashIndex !== -1 ? link.href.slice(hashIndex + 1) : "";
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`${styles.link} ${active === linkId ? styles.linkActive : ""}`}
                                >
                                    {link.name}
                                    {active === linkId && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className={styles.activePill}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right actions */}
                <div className={styles.actions}>
                    <button 
                        onClick={openCalendly} 
                        className={styles.hireBtn}
                    >
                        Get Free Consultation
                    </button>
                    <button
                        id="mobile-menu-toggle"
                        className={styles.mobileToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.mobileMenu}
                    >
                        {NAV_LINKS.map((link, i) => {
                            const hashIndex = link.href.indexOf("#");
                            const linkId = hashIndex !== -1 ? link.href.slice(hashIndex + 1) : "";
                            return (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`${styles.mobileLink} ${active === linkId ? styles.mobileLinkActive : ""}`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.36 }}
                            style={{ padding: "16px 24px 24px" }}
                        >
                            <button 
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    openCalendly();
                                }} 
                                className={styles.hireBtn} 
                                style={{ display: "block", textAlign: "center", width: "100%" }}
                            >
                                Get Free Consultation
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

