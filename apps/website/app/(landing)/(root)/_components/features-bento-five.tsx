import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";

export const FeaturesBentoFive = ({ title, description, icon }: BentoGridInfoType) => {
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

    const isBigScreen = useMediaQuery({ query: "(min-width: 700px)" });

    return (
        <motion.div initial="initial" whileHover="animate">
            <motion.div className="h-1/3 mb-2">
                {isBigScreen ? (
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
                ) : (
                    <motion.svg
                        width="full"
                        height="full"
                        viewBox="110 100 250 280"
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
                )}
            </motion.div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};
