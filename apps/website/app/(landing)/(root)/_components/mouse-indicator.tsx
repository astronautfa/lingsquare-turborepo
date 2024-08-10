'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const MouseIndicator = () => {
    const { scrollYProgress } = useScroll();

    // State to track visibility
    const [isVisible, setIsVisible] = useState(true);
    let scrollTimeout: NodeJS.Timeout;

    useEffect(() => {
        const handleScroll = () => {
            // Hide the component on scroll
            scrollTimeout = setTimeout(() => {
                setIsVisible(false);
            }, 500);

            return () => {
                clearTimeout(scrollTimeout);
            }

        };
        // Set a timeout to show the component after 2 seconds of no scroll
        scrollTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);


    return (
        <div className="h-[40px]">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}       // Initial hidden state
                        animate={{ opacity: 1 }} // On present state
                        exit={{ opacity: 0 }}          // Exit state
                    >
                        <div className="rounded-xl border-2 w-[26px] h-[38px] transition-opacity border-sky-800/60 animate-pulse duration-800">
                            <div className="h-[7px] w-[2px] bg-sky-800/60 rounded-full mx-auto mt-[10px] animate-bounce"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MouseIndicator