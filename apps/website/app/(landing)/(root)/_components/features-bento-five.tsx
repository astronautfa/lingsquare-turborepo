import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";

const variants = {
    initial: {
        pathLength: 0,
        pathOffset: 0,
    },
    animate: {
        pathLength: 1,
        pathOffset: 0,
    },
};

const variants2 = {
    initial: {
        pathLength: 1,
        pathOffset: 0,
    },
    animate: {
        pathLength: 1,
        pathOffset: 1,
    },
};

const variants3 = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        opacity: 0
    }
};

const variants4 = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 2
        }
    },
    exit: {
        opacity: 0
    }
};

const variants5 = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 2,
            duration: 2
        }
    },
    exit: {
        opacity: 0
    }
};

export const FeaturesBentoFive = ({ title, description, icon }: BentoGridInfoType) => {

    const isBigScreen = useMediaQuery({ query: "(min-width: 700px)" });

    return (
        <motion.div initial="initial" whileHover="animate" className="relative">
            <div className="h-1/3 mb-10 ">
                <motion.svg
                    width="full"
                    height="full"
                    viewBox="140 170 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-gradient-to-b from-white to-muted/100 rounded-xl shadow-sm hover:shadow-md"
                >
                    <motion.path
                        d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
                        stroke="#c8c8c8"
                        strokeWidth="2"
                        strokeLinecap="square"
                        transition={{ duration: 4 }}
                        variants={variants2}
                        className="animate-pulse"
                    />
                    <motion.path
                        d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
                        stroke="#0364a1"
                        strokeWidth="2.8"
                        strokeLinecap="square"
                        transition={{ duration: 4 }}
                        variants={variants}
                    />
                    <motion.path
                        d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
                        stroke="#006cbe"
                        strokeWidth="2.8"
                        strokeLinecap="square"
                        transition={{ duration: 3 }}
                        variants={variants}
                    />
                    <motion.path
                        d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
                        stroke="#d8e8e8"
                        strokeWidth="2"
                        strokeLinecap="square"
                        transition={{ duration: 3 }}
                        variants={variants2}
                        className="animate-pulse"
                    />
                </motion.svg>

                <motion.span variants={variants3} className=" absolute top-[60px] left-[65px] border border-red-500 bg-red-100 dark:bg-red-400/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4 ">
                    New
                </motion.span>

                <motion.span variants={variants4} className=" absolute top-10 left-[100px] border border-orange-500 bg-orange-100 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Learning
                </motion.span>

                <motion.span variants={variants5} className=" absolute top-6 right-5 border border-green-500 bg-green-100 dark:bg-green-500/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4 ">
                    Mastered
                </motion.span>

                <motion.svg
                    width="full"
                    height="full"
                    viewBox="110 100 250 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-gradient-to-b from-white to-muted/100 rounded-xl shadow-sm hover:shadow-md hidden lg:visible"
                >
                    <motion.path
                        d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
                        stroke="#c8c8c8"
                        strokeWidth="2"
                        strokeLinecap="square"
                        transition={{ duration: 4 }}
                        variants={variants2}
                        className="animate-pulse"
                    />
                    <motion.path
                        d="M 123.172 322.272 C 111.509 160.953 313.658 198.598 348.144 190.101"
                        stroke="#0364a1"
                        strokeWidth="2.8"
                        strokeLinecap="square"
                        transition={{ duration: 4 }}
                        variants={variants}
                    />
                    <motion.path
                        d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
                        stroke="#006cbe"
                        strokeWidth="2.8"
                        strokeLinecap="square"
                        transition={{ duration: 3 }}
                        variants={variants}
                    />
                    <motion.path
                        d="M 122.047 182.227 L 127.672 270.529 L 128.234 182.227 C 133.05 231.607 140.608 261.39 138.358 238.47 L 136.67 182.79 C 140.153 205.277 158.824 232.094 158.043 223.285 L 158.605 183.914 C 162.934 199.614 196.668 208.369 200.787 203.037 L 200.225 185.039 L 347.582 190.101"
                        stroke="#d8e8e8"
                        strokeWidth="2"
                        strokeLinecap="square"
                        transition={{ duration: 3 }}
                        variants={variants2}
                        className="animate-pulse"
                    />
                </motion.svg>
            </div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};
