export declare function useClassName(el: HTMLElement | null, className?: string): void;
export declare function useResizeObserver(el: Element | null | undefined, callback: () => void): void;
export declare function useTransitionActive(el: Element | null): boolean;
export declare function useMouseEnter(el: Element | null): boolean;
export declare function useFocusIn(el: Element | null): boolean;
export declare function useActive(el: Element | null): boolean;
export declare function useRectCSSVars(root: Element | null, el: Element | null, prefix: string): void;
export declare function setRectCSSVars(root: Element, el: Element, prefix: string): void;
export declare function useColorSchemePreference(): "light" | "dark";
