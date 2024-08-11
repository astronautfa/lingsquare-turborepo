import { motion } from "framer-motion";
import Image from "next/image";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";

import France from "@/public/France.png"
import Germany from "@/public/Germany.jpg"
import Spain from "@/public/Spain.png"
import Italy from "@/public/Italy.png"

const variants = {
    initial: {
        x: 0,
    },
    animate: {
        x: 10,
        rotate: 5,
        transition: {
            duration: 0.2,
        },
    },
};
const variantsSecond = {
    initial: {
        x: 0,
    },
    animate: {
        x: -10,
        rotate: -5,
        transition: {
            duration: 0.2,
        },
    },
};

export const FeaturesBentoOne = ({ title, description, icon }: BentoGridInfoType) => {

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
        >
            <motion.div
                variants={variants}
                className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1  items-center space-x-2 bg-white"
            >
                <Image
                    src={Germany}
                    height={50}
                    width={50}
                    alt="flag"
                    className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
                />
                <div className="w-full bg-gray-100 h-4 rounded-full " />
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-2 w-3/4 ml-auto bg-white"
            >
                <Image
                    src={France}
                    height={50}
                    width={50}
                    alt="flag"
                    className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
                />
                <div className="w-full bg-gray-100 h-4 rounded-full " />
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-2 bg-white"
            >
                <Image
                    src={Italy}
                    height={50}
                    width={50}
                    alt="flag"
                    className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
                />
                <div className="w-full bg-gray-100 h-4 rounded-full " />
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-1 items-center space-x-2 w-3/4 ml-auto bg-white"
            >
                <Image
                    src={Spain}
                    height={50}
                    width={50}
                    alt="flag"
                    className="h-6 w-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
                />
                <div className="w-full bg-gray-100 h-4 rounded-full " />
            </motion.div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};