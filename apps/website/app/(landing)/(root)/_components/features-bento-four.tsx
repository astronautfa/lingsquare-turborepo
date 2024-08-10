import { motion } from "framer-motion";
import { BentoGridInfo, BentoGridInfoType } from "./bento-grid-info";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import { GiSoundWaves } from "react-icons/gi";

export const FeaturesBentoFour = ({ title, description, icon }: BentoGridInfoType) => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: -30,
            rotate: -8,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-8 group"
        >
            <motion.div className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white">
                <p className="text-xs text-neutral-500">
                    Le contraire de la dépendance n’est pas la sobriété. Le contraire de
                    la dépendance est la connexion.
                </p>
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row group-hover:shadow-sm rounded-full border border-neutral-100 dark:border-white/[0.2] p-1 items-center justify-start space-x-2 w-3/4 ml-auto bg-white"
            >
                <div className="h-6 w-6 rounded-full bg-slate-200 flex-shrink-0 flex justify-center items-center">
                    <PlayCircleIcon className="h-5 w-5 fill-sky-100 text-sky-700/90 group-hover:hidden" />
                    <PauseCircleIcon className="h-5 w-5 fill-sky-100 text-red-700/80 hidden group-hover:block" />
                </div>
                <p className="text-xs group-hover:text-neutral-700 text-neutral-400 group-hover:animate-pulse flex">
                    <GiSoundWaves className="w-8 h-8 rotate-180" />
                    <GiSoundWaves className="w-8 h-8" />
                    <GiSoundWaves className="w-8 h-8 rotate-180" />
                    <GiSoundWaves className="w-8 h-8" />
                </p>
            </motion.div>
            <BentoGridInfo title={title} description={description} />
        </motion.div>
    );
};