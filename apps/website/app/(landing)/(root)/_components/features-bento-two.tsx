import { motion } from "framer-motion";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";


export const FeaturesBentoTwo = ({ title, description, icon }: BentoGridInfoType) => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2,
            },
        },
    };
    const arr = new Array(6).fill(0);
    return (
        <motion.div initial="initial" animate="animate" whileHover="hover">
            <div className="flex flex-1 w-full mb-4 min-h-[6rem] bg-white p-2 rounded-xl flex-col space-y-2 shadow-sm hover:shadow-md transition-shadow">
                {arr.map((_, i) => (
                    <motion.div
                        key={"skelenton-two" + i}
                        variants={variants}
                        style={{
                            maxWidth: Math.random() * (100 - 40) + 40 + "%",
                        }}
                        className="flex flex-row rounded-full border border-neutral-100 p-2 items-center space-x-2 animate-pulse bg-neutral-200 w-full h-4"
                    />
                ))}
            </div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};