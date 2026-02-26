"use client";

import { useState } from "react";
import { Code2, Lock, User } from "lucide-react";
import styles from "./AdminLogin.module.css";

interface AdminLoginProps {
    onLogin: (status: boolean) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded check as requested for the baseline panel
        if (username === "admin" && password === "sumit123") {
            onLogin(true);
        } else {
            setError("Invalid credentials. Access denied.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Code2 size={24} />
                    </div>
                    <h1 className={styles.title}>SUMIT <span className="text-gradient">GILL</span></h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.label}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className={styles.input}
                                style={{ paddingLeft: 44 }}
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className={styles.input}
                                style={{ paddingLeft: 44 }}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.loginBtn}>
                        AUTHENTICATE SYSTEM
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
