"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => { } });

export const useToast = () => useContext(ToastContext);

const icons = {
    success: <CheckCircle2 size={18} />,
    error: <XCircle size={18} />,
    warning: <AlertTriangle size={18} />,
    info: <Info size={18} />,
};

const colors = {
    success: { bg: "rgba(0, 200, 100, 0.12)", border: "rgba(0, 200, 100, 0.4)", color: "#00c864" },
    error: { bg: "rgba(255, 60, 60, 0.12)", border: "rgba(255, 60, 60, 0.4)", color: "#ff3c3c" },
    warning: { bg: "rgba(255, 180, 0, 0.12)", border: "rgba(255, 180, 0, 0.4)", color: "#ffb400" },
    info: { bg: "rgba(0, 180, 255, 0.12)", border: "rgba(0, 180, 255, 0.4)", color: "#00b4ff" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                zIndex: 9999,
                maxWidth: "360px",
                width: "calc(100vw - 48px)",
            }}>
                {toasts.map(toast => {
                    const c = colors[toast.type];
                    return (
                        <div
                            key={toast.id}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "12px",
                                padding: "14px 16px",
                                background: c.bg,
                                border: `1px solid ${c.border}`,
                                borderRadius: "14px",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                                animation: "toastSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                                color: "var(--text-main)",
                            }}
                        >
                            <span style={{ color: c.color, flexShrink: 0, marginTop: "1px" }}>{icons[toast.type]}</span>
                            <span style={{ flex: 1, fontSize: "0.9rem", lineHeight: "1.5", fontWeight: 500 }}>{toast.message}</span>
                            <button
                                onClick={() => dismiss(toast.id)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", flexShrink: 0, padding: "2px", display: "flex" }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes toastSlideIn {
                    from { opacity: 0; transform: translateX(40px) scale(0.9); }
                    to   { opacity: 1; transform: translateX(0) scale(1); }
                }
            `}</style>
        </ToastContext.Provider>
    );
}
