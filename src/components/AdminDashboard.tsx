"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Settings,
    Briefcase,
    Image as ImageIcon,
    Code2,
    Plus,
    Trash2,
    Save,
    Home,
    LogOut,
    CheckCircle2,
    Edit2,
    X,
    Mail,
    ShieldCheck,
    Database,
    RefreshCcw,
    AlertTriangle
} from "lucide-react";
import styles from "./AdminDashboard.module.css";
import Link from "next/link";

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState("overview");
    const [saveStatus, setSaveStatus] = useState(false);

    const navItems = [
        { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
        { id: "branding", label: "Branding", icon: <Settings size={20} /> },
        { id: "projects", label: "Projects", icon: <Briefcase size={20} /> },
        { id: "gallery", label: "Gallery", icon: <ImageIcon size={20} /> },
        { id: "skills", label: "Expertise", icon: <Code2 size={20} /> },
        { id: "messages", label: "Messages", icon: <Mail size={20} /> },
        { id: "maintenance", label: "Maintenance", icon: <ShieldCheck size={20} /> },
    ];

    const showSaveSuccess = () => {
        setSaveStatus(true);
        setTimeout(() => setSaveStatus(false), 3000);
    };

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}><Code2 size={20} /></div>
                    <span>ADMIN PANEL</span>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.navItem} ${activeTab === item.id ? styles.activeNavItem : ""}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}
                            {item.label}
                        </div>
                    ))}
                    <Link href="/" className={styles.navItem} style={{ marginTop: 'auto' }}>
                        <Home size={20} />
                        View Site
                    </Link>
                    <div className={styles.navItem} onClick={onLogout}>
                        <LogOut size={20} />
                        Logout
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                <div className={styles.header}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h1 className={styles.title}>
                                {navItems.find(i => i.id === activeTab)?.label}
                            </h1>
                            <p className={styles.subtitle}>Manage your portfolio content and settings.</p>
                        </div>
                        {saveStatus && (
                            <div style={{ color: '#00f2ff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <CheckCircle2 size={16} /> System Updated (MongoDB)
                            </div>
                        )}
                    </div>
                </div>

                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "branding" && <BrandingTab onSuccess={showSaveSuccess} />}
                {activeTab === "projects" && <ProjectsTab onSuccess={showSaveSuccess} />}
                {activeTab === "gallery" && <GalleryTab onSuccess={showSaveSuccess} />}
                {activeTab === "skills" && <SkillsTab onSuccess={showSaveSuccess} />}
                {activeTab === "messages" && <MessagesTab onSuccess={showSaveSuccess} />}
                {activeTab === "maintenance" && <MaintenanceTab onSuccess={showSaveSuccess} />}
            </main>
        </div>
    );
};

const OverviewTab = () => {
    const [stats, setStats] = useState({ projects: 0, gallery: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const pRes = await fetch('/api/projects');
                const gRes = await fetch('/api/gallery');
                const projects = pRes.ok ? await pRes.json() : [];
                const gallery = gRes.ok ? await gRes.json() : [];
                setStats({ projects: projects.length || 0, gallery: gallery.length || 0 });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className={styles.grid}>
            <div className={styles.card}>
                <h3>Total Projects</h3>
                <p style={{ fontSize: '3.5rem', color: 'var(--primary)', fontWeight: 800 }}>{stats.projects}</p>
            </div>
            <div className={styles.card}>
                <h3>Gallery Items</h3>
                <p style={{ fontSize: '3.5rem', color: 'var(--primary)', fontWeight: 800 }}>{stats.gallery}</p>
            </div>
            <div className={styles.card}>
                <h3>Database Connect</h3>
                <p style={{ color: '#00ff00', fontSize: '1.2rem', fontWeight: 600 }}>CONNECTED (LOCAL JSON)</p>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '12px' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
                </div>
            </div>
        </div>
    );
};

const BrandingTab = ({ onSuccess }: { onSuccess: () => void }) => {
    const [branding, setBranding] = useState({
        name: "SUMIT GILL",
        title: "Crafting Modern \n Digital Experiences",
        desc: "I'm a Full-Stack Developer specializing in React, Next.js, and Mobile apps. Transforming complex problems into elegant, user-centric solutions."
    });

    useEffect(() => {
        const fetchBranding = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.branding) setBranding(data.branding);
                }
            } catch (error) {
                console.error("Failed to fetch branding:", error);
            }
        };
        fetchBranding();
    }, []);

    const handleSave = async () => {
        await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({ key: 'branding', value: branding })
        });
        onSuccess();
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}><Settings size={20} /> Website Branding</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>Full Name / Logo Text</label>
                <input
                    className={styles.input}
                    value={branding.name}
                    onChange={e => setBranding({ ...branding, name: e.target.value })}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Hero Title</label>
                <input
                    className={styles.input}
                    value={branding.title}
                    onChange={e => setBranding({ ...branding, title: e.target.value })}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Hero Description</label>
                <textarea
                    className={styles.textarea}
                    value={branding.desc}
                    onChange={e => setBranding({ ...branding, desc: e.target.value })}
                />
            </div>
            <button className={styles.saveBtn} onClick={handleSave}>
                <Save size={18} style={{ marginRight: 8 }} /> Save Branding
            </button>
        </div>
    );
};

const ProjectsTab = ({ onSuccess }: { onSuccess: () => void }) => {
    const [projects, setProjects] = useState<any[]>([]);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadRes.json();

            if (uploadData.secure_url) {
                const newProject = {
                    title: "New Project",
                    description: "Detailed description here...",
                    image: uploadData.secure_url,
                    tags: ["React", "UI/UX"]
                };

                await fetch('/api/projects', {
                    method: 'POST',
                    body: JSON.stringify(newProject)
                });
                fetchProjects();
                onSuccess();
            } else {
                console.error("Upload server error:", uploadData);
                alert("Failed to upload image. Please check if your API Secret is filled out in .env.local");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image.");
        }
    };

    const deleteProject = async (id: string) => {
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
        fetchProjects();
        onSuccess();
    };

    return (
        <div>
            <div className={styles.grid}>
                {projects.map((p) => (
                    <div key={p._id} className={styles.miniCard}>
                        <div className={styles.miniCardActions}>
                            <button className={styles.iconBtn} onClick={() => deleteProject(p._id)}><Trash2 size={16} /></button>
                        </div>
                        <h4 style={{ marginBottom: 8 }}>{p.title}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.description?.substring(0, 40)}...</p>
                    </div>
                ))}
                <label className={styles.addBtn} style={{ cursor: 'pointer' }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                    <Plus size={32} />
                    <span>Add New Project</span>
                </label>
            </div>
        </div>
    );
};

const GalleryTab = ({ onSuccess }: { onSuccess: () => void }) => {
    const [items, setItems] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/gallery');
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadRes.json();

            if (uploadData.secure_url) {
                const newItem = {
                    title: file.name.split('.')[0] || "New Gallery Item",
                    type: uploadData.resource_type === 'video' ? "video" : "image",
                    src: uploadData.secure_url,
                    category: "Design"
                };

                await fetch('/api/gallery', {
                    method: 'POST',
                    body: JSON.stringify(newItem)
                });
                fetchItems();
                onSuccess();
            } else {
                console.error("Upload server error:", uploadData);
                alert("Failed to upload media. Please check if your API Secret is filled out in .env.local");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload media.");
        }
    };

    const deleteItem = async (id: string) => {
        await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
        fetchItems();
        onSuccess();
    };

    const startEdit = (item: any) => {
        setEditingId(item._id);
        setEditData({ ...item });
    };

    const saveEdit = async () => {
        await fetch('/api/gallery', {
            method: 'PUT',
            body: JSON.stringify(editData)
        });
        setEditingId(null);
        fetchItems();
        onSuccess();
    };

    return (
        <div>
            <div className={styles.grid}>
                {items.map((i) => (
                    <div key={i._id} className={styles.miniCard}>
                        <div className={styles.miniCardActions}>
                            {editingId === i._id ? (
                                <button className={styles.iconBtn} onClick={() => setEditingId(null)}><X size={16} /></button>
                            ) : (
                                <button className={styles.iconBtn} onClick={() => startEdit(i)}><Edit2 size={16} /></button>
                            )}
                            <button className={styles.iconBtn} onClick={() => deleteItem(i._id)}><Trash2 size={16} /></button>
                        </div>
                        <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', borderRadius: 8, marginBottom: 12, backgroundImage: i.type === 'image' ? `url(${i.src})` : 'none', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {i.type === 'video' && <span style={{ color: 'var(--primary)' }}>[Video File]</span>}
                        </div>

                        {editingId === i._id ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <input
                                    className={styles.input}
                                    style={{ padding: '4px 8px', fontSize: '0.9rem' }}
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                />
                                <input
                                    className={styles.input}
                                    style={{ padding: '4px 8px', fontSize: '0.9rem' }}
                                    value={editData.category}
                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                />
                                <button className={styles.saveBtn} style={{ padding: '4px 8px', fontSize: '0.8rem', marginTop: '4px' }} onClick={saveEdit}>Save</button>
                            </div>
                        ) : (
                            <>
                                <h4 style={{ marginBottom: 4 }}>{i.title}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{i.category}</span>
                            </>
                        )}
                    </div>
                ))}
                <label className={styles.addBtn} style={{ cursor: 'pointer' }}>
                    <input type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleMediaUpload} />
                    <Plus size={32} />
                    <span>Upload Media</span>
                </label>
            </div>
        </div>
    );
};

const SkillsTab = ({ onSuccess }: { onSuccess: () => void }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><Code2 size={20} /> Manage Expertise</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Edit the list of skills displayed in the Expertise section. (Currently systematic listing mode active)</p>
        <button className={styles.saveBtn} onClick={onSuccess}>Sync Skills List</button>
    </div>
);

const MessagesTab = ({ onSuccess }: { onSuccess: () => void }) => {
    const [messages, setMessages] = useState<any[]>([]);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const deleteMessage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
        fetchMessages();
        onSuccess();
    };

    return (
        <div>
            {messages.length === 0 ? (
                <div className={styles.card} style={{ textAlign: 'center', padding: '40px' }}>
                    <Mail size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                    <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {messages.map((m) => (
                        <div key={m._id} className={styles.card} style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                                <button className={styles.iconBtn} onClick={() => deleteMessage(m._id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{m.subject}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    From: <strong>{m.name}</strong> ({m.email}{m.mobile ? ` / ${m.mobile}` : ''}) • {new Date(m.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                                <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{m.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const MaintenanceTab = ({ onSuccess }: { onSuccess: () => void }) => {
    const [duplicates, setDuplicates] = useState<{ projects: any[], gallery: any[] } | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleClearCache = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/maintenance', {
                method: 'POST',
                body: JSON.stringify({ action: 'clear-cache' })
            });
            const data = await res.json();
            setMessage(data.message || data.error);
            onSuccess();
        } catch (error) {
            setMessage("Failed to clear cache");
        }
        setLoading(false);
    };

    const handleFindDuplicates = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/maintenance', {
                method: 'POST',
                body: JSON.stringify({ action: 'find-duplicates' })
            });
            const data = await res.json();
            setDuplicates(data.duplicates);
            setMessage("");
        } catch (error) {
            setMessage("Failed to scan duplicates");
        }
        setLoading(false);
    };

    const handleDeleteDuplicates = async () => {
        if (!confirm("Are you sure you want to delete all identified duplicates? This action is permanent.")) return;
        setLoading(true);
        try {
            const res = await fetch('/api/maintenance', {
                method: 'POST',
                body: JSON.stringify({ action: 'delete-duplicates' })
            });
            const data = await res.json();
            setMessage(`Cleanup complete! Removed ${data.removedProjects} projects and ${data.removedGallery} gallery items.`);
            setDuplicates(null);
            onSuccess();
        } catch (error) {
            setMessage("Failed to delete duplicates");
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}><RefreshCcw size={20} /> System Cache</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Force revalidation of static pages and data. Use this if you've made changes that aren't appearing on the live site.
                </p>
                <button
                    className={styles.saveBtn}
                    onClick={handleClearCache}
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Processing..." : "Clear Website Cache"}
                </button>
            </div>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}><Database size={20} /> Duplicate Content Finder</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Scan your database for items with duplicate titles or media links to keep your portfolio lean and clean.
                </p>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <button
                        className={styles.saveBtn}
                        onClick={handleFindDuplicates}
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        {loading ? "Scanning..." : "Scan for Duplicates"}
                    </button>

                    {duplicates && (duplicates.projects.length > 0 || duplicates.gallery.length > 0) && (
                        <button
                            className={styles.saveBtn}
                            onClick={handleDeleteDuplicates}
                            disabled={loading}
                            style={{ background: '#ff4444', color: '#fff' }}
                        >
                            Delete Found Duplicates
                        </button>
                    )}
                </div>

                {message && (
                    <div style={{ padding: '12px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 242, 255, 0.2)', marginBottom: '20px', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        {message}
                    </div>
                )}

                {duplicates && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {duplicates.projects.length === 0 && duplicates.gallery.length === 0 ? (
                            <p style={{ color: '#00ff00', fontSize: '0.9rem' }}>No duplicates found. Your database is clean!</p>
                        ) : (
                            <>
                                <p style={{ color: '#ffcc00', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertTriangle size={16} />
                                    Found {duplicates.projects.length} project duplicates and {duplicates.gallery.length} gallery duplicates.
                                </p>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxHeight: '200px', overflowY: 'auto', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
                                    {duplicates.projects.map((p, idx) => (
                                        <div key={`p-${idx}`}>Project: {p.title}</div>
                                    ))}
                                    {duplicates.gallery.map((g, idx) => (
                                        <div key={`g-${idx}`}>Gallery: {g.title}</div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
