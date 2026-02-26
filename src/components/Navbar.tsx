"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Code2, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "./Navbar.module.css";
import Magnetic from "./Magnetic";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [brandName, setBrandName] = useState("SUMIT GILL");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const fetchBranding = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.branding?.name) {
                        setBrandName(data.branding.name);
                    }
                }
            } catch (error) {
                console.error("Failed to load branding:", error);
            }
        };
        fetchBranding();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Gallery", href: "#gallery" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        >
            <div className={styles.container}>
                <Magnetic>
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <Code2 size={24} color="white" />
                        </div>
                        <span>{brandName}</span>
                    </Link>
                </Magnetic>

                {/* Desktop Links */}
                <div className={styles.links}>
                    {navLinks.map((link) => (
                        <Magnetic key={link.name}>
                            <Link href={link.href} className={styles.link}>
                                {link.name}
                            </Link>
                        </Magnetic>
                    ))}
                    <Magnetic>
                        <Link href="#contact" className={styles.hireBtn}>
                            Hire Me
                        </Link>
                    </Magnetic>
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
                        >
                            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.mobileMenu}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={styles.mobileLink}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.hireBtn}
                            style={{ textAlign: "center" }}
                        >
                            Hire Me
                        </Link>
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
                            >
                                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                                <span>Toggle Theme</span>
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
