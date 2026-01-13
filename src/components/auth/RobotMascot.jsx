import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RobotMascot({ focusedInput, hasError, layout = "horizontal" }) {
    const [blink, setBlink] = useState(false);

    // Blinking Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 200);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Determine State
    let currentState = "idle";
    if (hasError) currentState = "error";
    else if (focusedInput === "password") currentState = "password";
    else if (focusedInput) currentState = "focused";

    // Dynamic values based on layout
    const isHorizontal = layout === "horizontal";
    const lookX = isHorizontal ? 12 : 0;
    const lookY = isHorizontal ? 0 : 8;
    const rotateHead = isHorizontal ? 5 : 0;

    // Animation Variants
    const headVariants = {
        idle: { y: 0, x: 0, rotate: 0 },
        focused: { y: lookY / 2, x: lookX / 2, rotate: rotateHead, transition: { type: "spring", stiffness: 100 } },
        password: { y: 2, rotate: isHorizontal ? -5 : 0, x: 0 },
        error: {
            x: [0, -8, 8, -8, 8, 0],
            rotate: [0, -2, 2, -2, 2, 0],
            transition: { duration: 0.5 }
        }
    };

    const eyesVariants = {
        idle: { x: 0, y: 0 },
        focused: { x: lookX, y: lookY },
        password: { x: 0, y: 0 },
        error: { x: 0, y: 0 }
    };

    const handLeftVariants = {
        idle: { y: 0, x: 0 },
        focused: { y: 0, x: 0 },
        password: { y: -50, x: 25, rotate: -15 }, // Move up to cover face
        error: { y: 0 }
    };

    const handRightVariants = {
        idle: { y: 0, x: 0 },
        focused: { y: 0, x: 0 },
        password: { y: -50, x: -25, rotate: 15 }, // Move up to cover face
        error: { y: 0 }
    };

    // Body floating animation (slight hover)
    const bodyFloat = {
        animate: { y: [0, -3, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-background dark:from-indigo-900/40 dark:to-black md:rounded-l-2xl overflow-hidden relative min-h-[200px] md:min-h-full">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="relative w-64 h-64">
                <motion.svg
                    viewBox="0 0 200 220"
                    className="w-full h-full drop-shadow-2xl"
                    initial="idle"
                    animate={currentState}
                >
                    <defs>
                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="50%" stopColor="#F3F4F6" />
                            <stop offset="100%" stopColor="#D1D5DB" />
                        </linearGradient>

                        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1E3A8A" />
                            <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>

                        <linearGradient id="chestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* --- FLOAT GROUP (Entire Body) --- */}
                    <motion.g animate={bodyFloat.animate}>

                        {/* --- TORSO --- */}
                        <g transform="translate(60, 110)">
                            {/* Main Body Shape */}
                            <path
                                d="M 10 0 Q 40 5 70 0 L 75 20 Q 80 60 40 80 Q 0 60 5 20 Z"
                                fill="url(#bodyGrad)"
                                stroke="#E5E7EB"
                                strokeWidth="1"
                            />
                            {/* Chest Plate / Light */}
                            <path
                                d="M 25 25 Q 40 30 55 25 Q 50 45 30 45 Q 30 35 25 25"
                                fill="#F9FAFB"
                                opacity="0.5"
                            />
                            <circle cx="40" cy="35" r="5" fill="url(#chestGrad)" filter="url(#glow)" opacity="0.8">
                                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                            </circle>
                        </g>

                        {/* --- HEAD GROUP --- */}
                        <motion.g variants={headVariants}>
                            {/* Neck Shadow */}
                            <ellipse cx="100" cy="112" rx="20" ry="5" fill="#000" opacity="0.2" />

                            {/* Head Shell */}
                            <rect x="40" y="30" width="120" height="80" rx="35" fill="url(#bodyGrad)" />

                            {/* Face Inset (Screen) */}
                            <rect x="50" y="40" width="100" height="60" rx="25" fill="url(#screenGrad)" stroke="#172554" strokeWidth="2" />

                            {/* Gloss */}
                            <path d="M 55 35 Q 100 35 145 35" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                            <path d="M 55 32 Q 80 32 90 34" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                            {/* Eyes Container */}
                            <motion.g variants={eyesVariants}>
                                {/* Left Eye */}
                                <motion.ellipse
                                    cx="80" cy="70" rx="10" ry="12"
                                    fill="#60A5FA"
                                    filter="url(#glow)"
                                    animate={{
                                        scaleY: blink || currentState === "password" ? 0.1 : 1,
                                        opacity: currentState === "password" ? 0.5 : 1
                                    }}
                                />

                                {/* Right Eye */}
                                <motion.ellipse
                                    cx="120" cy="70" rx="10" ry="12"
                                    fill="#60A5FA"
                                    filter="url(#glow)"
                                    animate={{
                                        scaleY: blink || currentState === "password" ? 0.1 : 1,
                                        opacity: currentState === "password" ? 0.5 : 1
                                    }}
                                />
                            </motion.g>

                            {/* Mouth */}
                            <motion.path
                                d="M 95 90 Q 100 93 105 90"
                                stroke="#60A5FA"
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity="0.6"
                                animate={hasError ? { d: "M 95 93 Q 100 87 105 93" } : { d: "M 95 90 Q 100 93 105 90" }}
                            />
                        </motion.g>

                        {/* --- ARMS --- */}
                        {/* Left Arm/Hand */}
                        <motion.g transform="translate(30, 115)" variants={handLeftVariants}>
                            <path d="M 10 0 Q 0 20 5 40" stroke="#D1D5DB" strokeWidth="8" strokeLinecap="round" fill="none" />
                            <ellipse cx="5" cy="45" rx="12" ry="16" fill="url(#bodyGrad)" stroke="#D1D5DB" />
                        </motion.g>

                        {/* Right Arm/Hand */}
                        <motion.g transform="translate(150, 115)" variants={handRightVariants}>
                            <path d="M 10 0 Q 20 20 15 40" stroke="#D1D5DB" strokeWidth="8" strokeLinecap="round" fill="none" />
                            <ellipse cx="15" cy="45" rx="12" ry="16" fill="url(#bodyGrad)" stroke="#D1D5DB" />
                        </motion.g>

                    </motion.g> {/* End Float Group */}

                </motion.svg>
            </div>

            {/* Instruction Tooltip */}
            <div className="absolute bottom-4 text-blue-800/50 dark:text-blue-200/50 text-xs font-mono">
                {hasError ? "ERROR: AUTH_FAILED" : currentState === "password" ? "STATUS: PRIVACY_MODE" : currentState === "focused" ? "STATUS: OBSERVING" : "STATUS: ONLINE"}
            </div>
        </div>
    );
}
