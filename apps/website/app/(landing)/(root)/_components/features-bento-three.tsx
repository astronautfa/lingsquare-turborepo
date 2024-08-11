import { motion } from "framer-motion";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";


const zero = {
    initial: {
        rotate: 15,
    },
    hover: {
        rotate: 0,
        rotateY: 180,
        transition: {
            duration: 0.5,
        }
    },
};

const first = {
    initial: {
        x: 20,
        rotate: -5,
    },
    hover: {
        x: 0,
        rotate: 0,
        rotateY: 180,
        transition: {
            duration: 0.5,
        }
    },
};
const second = {
    initial: {
        x: -10,
        rotate: 5,
    },
    hover: {
        x: 0,
        rotate: 0,
        rotateY: 180,
        transition: {
            duration: 0.5,
        }
    },
};

const third = {
    initial: {
        opacity: 0
    },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.9,
        }
    },
};

const fourth = {
    initial: {
        opacity: 1
    },
    hover: {
        opacity: 0
    },
};


export const FeaturesBentoThree = ({ title, description, icon }: BentoGridInfoType) => {
    return (
        <motion.div initial="initial" animate="animate" whileHover="hover">
            <div className="flex flex-1 justify-center items-center w-full h-3/4 mb-3 min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2">
                <motion.div
                    variants={first}
                    className="relative h-full w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex flex-col items-center justify-center"
                >
                    <motion.p variants={fourth} className="absolute sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Fixez-vous un objectif précis, réaliste et{" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            mesurable
                        </span>
                    </motion.p>
                    <motion.p variants={third} className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4 scale-x-[-1] ">
                        Set yourself a specific, realistic and measurable {" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            mesurable
                        </span>
                        goal
                    </motion.p>
                    <motion.p variants={third} className="border border-red-500 bg-red-100 dark:bg-red-400/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4 scale-x-[-1] ">
                        New
                    </motion.p>
                </motion.div>
                <motion.div variants={zero} className="hidden lg:flex relative h-full z-20 w-1/3 rounded-2xl bg-white p-4 border border-neutral-200 flex-col items-center justify-center">
                    <motion.p variants={fourth} className="absolute sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Le succès de chaque contrat{" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            repose
                        </span>{" "}
                        sur une autorité fiable
                    </motion.p>
                    <motion.p variants={third} className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4 scale-x-[-1] ">
                        The success of every contract {" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            relies
                        </span>{" "}
                        on a reliable authority
                    </motion.p>
                    <motion.p variants={third} className="border border-orange-500 bg-orange-100 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4  scale-x-[-1]">
                        Learning
                    </motion.p>
                </motion.div>
                <motion.div
                    variants={second}
                    className="relative h-full w-1/3 rounded-2xl bg-white p-4  border border-neutral-200 flex flex-col items-center justify-center"
                >
                    <motion.p variants={fourth} className="absolute sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Une {" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            pénalité
                        </span>
                        {" "}dissuasive
                    </motion.p>
                    <motion.p variants={third} className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4 scale-x-[-1] ">
                        A dissuasive {" "}
                        <span className=" bg-yellow-300/50 text-black p-0.5 rounded">
                            penalty
                        </span>
                    </motion.p>
                    <motion.p variants={third} className="border border-green-500 bg-green-100 dark:bg-green-500/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4  scale-x-[-1]">
                        Mastered
                    </motion.p>
                </motion.div>
            </div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};