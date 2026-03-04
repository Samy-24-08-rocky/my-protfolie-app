"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState("home");

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section via intersection
    useEffect(() => {
        const sections = NAV_LINKS.map(l => document.querySelector(l.href));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { threshold: 0.35 }
        );
        sections.forEach(s => s && observer.observe(s));
        return () => observer.disconnect();
    }, []);

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
                    <span className={styles.logoMark}>SG</span>
                    <span className={styles.logoText}>Gill Tech</span>
                </Link>

                {/* Desktop Links */}
                <ul className={styles.links}>
                    {NAV_LINKS.map(link => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`${styles.link} ${active === link.href.slice(1) ? styles.linkActive : ""}`}
                            >
                                {link.name}
                                {active === link.href.slice(1) && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className={styles.activePill}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right actions */}
                <div className={styles.actions}>
                    {mounted && (
                        <button
                            id="theme-toggle"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className={styles.themeBtn}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}
                    <Link href="#contact" className={styles.hireBtn}>
                        Hire Me
                    </Link>
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
                        {NAV_LINKS.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`${styles.mobileLink} ${active === link.href.slice(1) ? styles.mobileLinkActive : ""}`}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.36 }}
                            style={{ display: "flex", gap: "12px", padding: "16px 24px 24px" }}
                        >
                            <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className={styles.hireBtn} style={{ flex: 1, textAlign: "center" }}>
                                Hire Me
                            </Link>
                            {mounted && (
                                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={styles.themeBtn} aria-label="Toggle theme">
                                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
