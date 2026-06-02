"use client";

import { motion } from "framer-motion";
import styles from "./WhatsAppButton.module.css";

const WhatsAppButton = () => {
    // Replace with Gill Tech Solutions India number
    const phoneNumber = "918264888290"; 
    const message = "Hello Gill Tech Solutions, I would like to inquire about your services.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.floatBtn}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Chat with Us on WhatsApp"
        >
            <svg 
                className={styles.icon}
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M12 2C6.477 2 2 6.477 2 12c0 1.886.52 3.652 1.428 5.168L2.05 21.942l4.908-1.288A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.727 13.918c-.244-.122-1.442-.712-1.666-.793-.223-.081-.386-.122-.549.122-.163.244-.63.793-.772.955-.143.163-.285.183-.529.061-.244-.122-1.03-.379-1.962-1.211-.725-.647-1.215-1.447-1.357-1.691-.142-.244-.015-.376.107-.497.11-.11.244-.285.366-.427.122-.142.163-.244.244-.407.082-.162.041-.305-.02-.427-.061-.122-.549-1.32-.752-1.81-.198-.477-.399-.412-.549-.42-.142-.007-.305-.008-.468-.008a.9.9 0 00-.65.305c-.224.244-.854.834-.854 2.033 0 1.199.874 2.358.996 2.52.122.163 1.72 2.627 4.167 3.684.582.251 1.037.401 1.391.513.585.186 1.118.16 1.539.097.47-.07 1.442-.589 1.646-1.159.203-.57.203-1.057.142-1.159-.061-.101-.223-.162-.467-.284z" 
                    fill="currentColor"
                />
            </svg>
            <span className={styles.tooltip}>Chat with Us</span>
        </motion.a>
    );
};

export default WhatsAppButton;
