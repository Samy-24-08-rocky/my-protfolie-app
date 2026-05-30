"use client";

import { useState } from "react";
import { Code2, Lock, User, Eye, EyeOff } from "lucide-react";
import styles from "./AdminLogin.module.css";

interface AdminLoginProps {
    onLogin: (status: boolean) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            
            const data = await res.json();
            
            if (res.ok && data.success) {
                onLogin(true);
            } else {
                setError(data.error || "Invalid credentials. Access denied.");
            }
        } catch (err) {
            setError("Authentication system offline. Please check connection.");
        } finally {
            setIsLoading(false);
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
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className={styles.label}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                            <input
                                type={showPassword ? "text" : "password"}
                                className={styles.input}
                                style={{ paddingLeft: 44, paddingRight: 44 }}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: 14,
                                    top: 14,
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0
                                }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? "AUTHENTICATING..." : "AUTHENTICATE SYSTEM"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
