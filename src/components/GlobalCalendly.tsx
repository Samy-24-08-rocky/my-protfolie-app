"use client";

import { useState, useEffect } from "react";
import CalendlyModal from "./CalendlyModal";

export const openCalendly = () => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("open-calendly"));
    }
};

const GlobalCalendly = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-calendly", handleOpen);
        return () => window.removeEventListener("open-calendly", handleOpen);
    }, []);

    return <CalendlyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default GlobalCalendly;
