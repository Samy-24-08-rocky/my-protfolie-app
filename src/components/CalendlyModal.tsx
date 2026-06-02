"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./CalendlyModal.module.css";

interface CalendlyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
    // Replace with actual Calendly username
    const calendlyUrl = "https://calendly.com/sumit-gill/free-consultation?hide_landing_page_details=1&hide_gdpr_banner=1";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div 
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div 
                        className={styles.modal}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    >
                        <button className={styles.closeBtn} onClick={onClose} aria-label="Close scheduling modal">
                            <X size={20} />
                        </button>
                        <div className={styles.iframeWrapper}>
                            <iframe
                                src={calendlyUrl}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Select a Date & Time"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CalendlyModal;
