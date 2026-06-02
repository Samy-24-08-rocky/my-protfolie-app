"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/admin/check");
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                setIsChecking(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogin = (status: boolean) => {
        setIsAuthenticated(status);
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout failed:", err);
        }
        setIsAuthenticated(false);
        router.push("/");
    };

    if (isChecking) return null;

    return (
        <main>
            {isAuthenticated ? (
                <AdminDashboard onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </main>
    );
}

