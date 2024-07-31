import {
  useMediaPlayer
} from "./vidstack-3JZFNLQ7.js";
import {
  animationFrameThrottle,
  createDisposalBin,
  effect,
  listenEvent
} from "./vidstack-3R7QJDRC.js";

// src/hooks/use-dom.ts
import * as React from "react";
function useClassName(el, className) {
  React.useEffect(() => {
    if (!el || !className) return;
    const tokens = className.split(" ");
    for (const token of tokens) el.classList.add(token);
    return () => {
      for (const token of tokens) el.classList.remove(token);
    };
  }, [el, className]);
}
function useResizeObserver(el, callback) {
  React.useEffect(() => {
    if (!el) return;
    callback();
    const observer = new ResizeObserver(animationFrameThrottle(callback));
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, callback]);
}
function useTransitionActive(el) {
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    if (!el) return;
    const disposal = createDisposalBin();
    disposal.add(
      listenEvent(el, "transitionstart", () => setIsActive(true)),
      listenEvent(el, "transitionend", () => setIsActive(false))
    );
    return () => disposal.empty();
  }, [el]);
  return isActive;
}
function useMouseEnter(el) {
  const [isMouseEnter, setIsMouseEnter] = React.useState(false);
  React.useEffect(() => {
    if (!el) return;
    const disposal = createDisposalBin();
    disposal.add(
      listenEvent(el, "mouseenter", () => setIsMouseEnter(true)),
      listenEvent(el, "mouseleave", () => setIsMouseEnter(false))
    );
    return () => disposal.empty();
  }, [el]);
  return isMouseEnter;
}
function useFocusIn(el) {
  const [isFocusIn, setIsFocusIn] = React.useState(false);
  React.useEffect(() => {
    if (!el) return;
    const disposal = createDisposalBin();
    disposal.add(
      listenEvent(el, "focusin", () => setIsFocusIn(true)),
      listenEvent(el, "focusout", () => setIsFocusIn(false))
    );
    return () => disposal.empty();
  }, [el]);
  return isFocusIn;
}
function useActive(el) {
  const isMouseEnter = useMouseEnter(el), isFocusIn = useFocusIn(el), prevMouseEnter = React.useRef(false);
  if (prevMouseEnter.current && !isMouseEnter) return false;
  prevMouseEnter.current = isMouseEnter;
  return isMouseEnter || isFocusIn;
}
function useColorSchemePreference() {
  const [colorScheme, setColorScheme] = React.useState("dark");
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    function onChange() {
      setColorScheme(media.matches ? "light" : "dark");
    }
    onChange();
    return listenEvent(media, "change", onChange);
  }, []);
  return colorScheme;
}

// src/components/layouts/utils.ts
import * as React2 from "react";
function useLayoutName(name) {
  const player = useMediaPlayer();
  React2.useEffect(() => {
    if (!player) return;
    return effect(() => {
      const el = player.$el;
      el?.setAttribute("data-layout", name);
      return () => el?.removeAttribute("data-layout");
    });
  }, [player]);
}

export {
  useClassName,
  useResizeObserver,
  useTransitionActive,
  useActive,
  useColorSchemePreference,
  useLayoutName
};
