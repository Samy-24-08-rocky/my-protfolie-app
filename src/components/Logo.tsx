import React from "react";

interface LogoProps {
    size?: number;
    className?: string;
}

const Logo = ({ size = 32, className = "" }: LogoProps) => {
    // Brand Gold color from the user's uploaded image
    const brandGold = "#B4905A";

    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Right-side crescent wrap-around swoosh */}
            <path 
                d="M50 8C70.5 8 88 23.5 90 48C92 70.5 76.5 89 54 92" 
                stroke={brandGold} 
                strokeWidth="4.5" 
                strokeLinecap="round" 
            />
            
            {/* The main circular G loop */}
            <path 
                d="M62 25C44 21 28 35 28 54C28 71 42.5 83 60 79C69 77 75.5 70 77 61H55" 
                stroke={brandGold} 
                strokeWidth="8.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            
            {/* Slanted T shape inside the monogram */}
            {/* T crossbar */}
            <path 
                d="M44 38H76" 
                stroke={brandGold} 
                strokeWidth="8" 
                strokeLinecap="round" 
            />
            {/* T stem slanted to match the circular flow */}
            <path 
                d="M61 38L53 76" 
                stroke={brandGold} 
                strokeWidth="8.5" 
                strokeLinecap="round" 
            />

            {/* Staggered PCB circuit paths on the left */}
            {/* Top PCB Trace */}
            <path 
                d="M34 40H26L20 35H18" 
                stroke={brandGold} 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <circle cx="14" cy="35" r="3" fill="none" stroke={brandGold} strokeWidth="2.5" />

            {/* Middle PCB Trace */}
            <path 
                d="M30 49H22L17 44H15" 
                stroke={brandGold} 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <circle cx="11" cy="44" r="3" fill="none" stroke={brandGold} strokeWidth="2.5" />

            {/* Bottom PCB Trace */}
            <path 
                d="M34 58H26L20 63H18" 
                stroke={brandGold} 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <circle cx="14" cy="63" r="3" fill="none" stroke={brandGold} strokeWidth="2.5" />
        </svg>
    );
};

export default Logo;
