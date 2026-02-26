"use client";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
            {children}
        </div>
    );
}
