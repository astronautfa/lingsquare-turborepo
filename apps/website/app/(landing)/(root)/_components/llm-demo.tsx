"use client";

import {
  useMotionValue,
  useTransform,
  animate,
  motion,
  useAnimation,
  useScroll,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1,
      delay: 0.8,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      delay: 1,
    },
  },
};

const highlightVariants = {
  hidden: {
    // opacity: 0,
    backgroundColor: "rgb(255 255 255)",
    "--tw-text-opacity": 1,
    color: "rgb(75 85 99 / var(--tw-text-opacity))",
    backgroundPosition: "0%",
  },
  visible: {
    // opacity: 1,
    y: 0,
    transition: {
      duration: 0.02,
      ease: "easeOut",
      delay: 0.6,
    },
    backgroundColor: "rgb(253 224 71 / 0.7)",
    backgroundPosition: "110%",
    color: "black",
  },
};


export default function LLMAnimation() {

  const [highlightState, setHighlightState] = useState({ "--highlighted": 0 })
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setHighlightState({ "--highlighted": 1 })
    } else {
      controls.start("hidden");
      setHighlightState({ "--highlighted": 0 })
    }
  }, [controls, inView]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32 pt-8 rounded-xl backdrop-blur-sm">
      <div className="mx-auto max-w-2xl lg:text-center py-14">
        <h2 className="text-base font-semibold leading-7 text-sky-600"></h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Leveraging the latest technology
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          By using the latest large language models, we help you comprehend the
          meaning of words inside of their context.
        </p>
      </div>
      <div className="flex w-full select-none items-center justify-center py-2">
        <div
          className="mx-auto max-w-7xl px-6 sm:px-10 text-md sm:text-lg relative text-slate-500 z-0"
          style={highlightState as React.CSSProperties}
        >
          Tout le monde veut améliorer sa vie. Une façon est à travers les
          habitudes. Une habitude est quelque chose que vous faites
          régulièrement sans penser. Les petites habitudes peuvent conduire à de
          grands changements. Imaginez essayer de vous améliorer de 1% chaque
          jour. Au début, cela peut ne pas sembler beaucoup. Mais si vous
          continuez à le faire, après un an, vous serez 37 fois meilleur!
          C&apos;est le pouvoir des petites habitudes. Si vous faites de petits
          changements positifs, avec le temps, ils deviendront de grandes
          <span
            className="text-slate-700"
            ref={ref}
            style={{
              "padding": '5px',
              "borderRadius": "5px",
              "background": "linear-gradient(120deg, #B4DCF2 50%, transparent 50%) 110% 0 / 200% 100% no-repeat",
              "backgroundPosition": 'calc((1 - var(--highlighted)) * 110%) 0',
              "transition": "background-position 1s",
            }}
          >
            améliorations
          </span>
          . L&apos;endroit où vous vous trouvez peut aider ou nuire à vos
          habitudes. Si vous êtes dans un endroit qui soutient vos bonnes
          habitudes, il est plus facile de les faire. Mais si vous êtes dans un
          endroit avec beaucoup de distractions, c&apos;est difficile. Par
          exemple, si vous voulez manger sainement, gardez des aliments sains
          dans votre cuisine. Mais si vous gardez de la malbouffe, vous la
          mangerez. Qui vous pensez être joue un grand rôle dans vos habitudes.
          Si vous croyez que vous êtes une personne en bonne santé, vous ferez
          des choses saines. Mais si vous pensez que vous êtes paresseux, vous
          ne ferez pas d&apos;exercice. Changez la façon dont vous vous voyez.
          Au lieu de dire &apos;Je veux lire&apos;, dites &apos;Je suis un
          lecteur&apos;. Cela vous fait y croire et le faire. Les habitudes sont
          puissantes. Les petites habitudes peuvent conduire à de grands
          changements dans votre vie. N&apos;oubliez pas de rendre les bonnes
          habitudes évidentes, attrayantes, faciles et satisfaisantes. Et rendez
          les mauvaises habitudes invisibles, inattrayantes, difficiles et
          insatisfaisantes. Avec le temps, vous verrez les bénéfices.
          <div className="text-slate-800 mt-4" >
            Habitude Atomique, James Clear
          </div>
        </div>
        {inView && (
          <motion.div
            variants={containerVariants}
            animate={controls}
            initial="hidden"
            className="flex md:aspect-[1/1.38] aspect-[1/1.20] h-[350px] md:h-[450px] flex-col rounded-xl bg-white p-2 justify-center border items-center z-10 absolute bg-[url('/landing-noise.webp')]"
          >
            <motion.span
              variants={itemVariants}
              className="inline h-full w-full p-4 sm:p-6 text-slate-900  rounded-lg"
            >
              <AnimText delay={1} inView={inView} />
            </motion.span>
          </motion.div>
        )}
      </div>
      <div ref={ref} className="hidden lg:flex"></div>
    </div>
  );
}

export interface IAnimTextProps {
  delay: number;
  inView: boolean;
}

export function AnimText({ delay, inView }: IAnimTextProps) {
  const baseText =
    "The French word améliorations means improvements in English. In general, it refers to the act or process of making something better or more satisfactory. In this context, the word specifically refers to the positive changes mentioned earlier that, over time, will lead to significant improvements. All in all, the cumulation of small steps could cause big changes.";
  let count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.split(" ").slice(0, latest).join(" ")
  );

  useEffect(() => {
    if (inView) {
      let controls = animate(count, baseText.split(" ").length, {
        type: "tween",
        delay: delay,
        duration: 4,
        ease: "easeInOut",
      });
      controls.play;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {inView && (
        <span className="text-sm sm:text-md md:text-lg">
          <motion.span>{displayText}</motion.span>
        </span>
      )}
    </>
  );
}
