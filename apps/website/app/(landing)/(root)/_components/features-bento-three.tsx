import { motion } from "framer-motion";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";


export const FeaturesBentoThree = ({ title, description, icon }: BentoGridInfoType) => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    return (
        <motion.div initial="initial" animate="animate" whileHover="hover">
            <div className="flex flex-1 w-full h-5/6 mb-3 min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2">
                <motion.div
                    variants={first}
                    className="h-full w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center"
                >
                    <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Fixez-vous un objectif précis, réaliste et{" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            mesurable
                        </span>
                    </p>
                    <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                        New
                    </p>
                </motion.div>
                <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center">
                    <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Le succès de chaque contrat{" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            repose
                        </span>{" "}
                        sur une autorité fiable
                    </p>
                    <p className="border border-orange-500 bg-orange-100 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                        Learning
                    </p>
                </motion.div>
                <motion.div
                    variants={second}
                    className="h-full w-1/3 rounded-2xl bg-white p-4  border border-neutral-200 flex flex-col items-center justify-center"
                >
                    <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Une pénalité{" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            dissuasive
                        </span>
                    </p>
                    <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                        Mastered
                    </p>
                </motion.div>
            </div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};