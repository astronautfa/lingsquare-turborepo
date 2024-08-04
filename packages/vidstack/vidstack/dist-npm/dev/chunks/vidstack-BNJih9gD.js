import { w as isArray, h as isUndefined, j as isNumber, z as isDOMNode, A as isFunction, s as setAttribute, g as effect, l as listenEvent, B as isKeyboardClick, E as isTouchEvent, F as getScope, e as scoped, r as onDispose, a as setStyle, G as autoUpdate, I as computePosition, J as flip, K as shift, L as toggleClass, f as signal, M as animationFrameThrottle, q as computed } from './vidstack-ND4uzLKO.js';

class TimeRange {
  get length() {
    return this._ranges.length;
  }
  constructor(start, end) {
    if (isArray(start)) {
      this._ranges = start;
    } else if (!isUndefined(start) && !isUndefined(end)) {
      this._ranges = [[start, end]];
    } else {
      this._ranges = [];
    }
  }
  start(index) {
    throwIfEmpty(this._ranges.length);
    throwIfOutOfRange("start", index, this._ranges.length - 1);
    return this._ranges[index][0] ?? Infinity;
  }
  end(index) {
    throwIfEmpty(this._ranges.length);
    throwIfOutOfRange("end", index, this._ranges.length - 1);
    return this._ranges[index][1] ?? Infinity;
  }
}
function getTimeRangesStart(range) {
  if (!range.length)
    return null;
  let min = range.start(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.start(i);
    if (value < min)
      min = value;
  }
  return min;
}
function getTimeRangesEnd(range) {
  if (!range.length)
    return null;
  let max = range.end(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.end(i);
    if (value > max)
      max = value;
  }
  return max;
}
function throwIfEmpty(length) {
  if (!length)
    throw new Error("`TimeRanges` object is empty." );
}
function throwIfOutOfRange(fnName, index, end) {
  if (!isNumber(index) || index < 0 || index > end) {
    throw new Error(
      `Failed to execute '${fnName}' on 'TimeRanges': The index provided (${index}) is non-numeric or out of bounds (0-${end}).`
    );
  }
}

function listen(target, type, handler) {
  if (!target)
    return;
  return listenEvent(target, type, handler);
}
function isEventInside(el, event) {
  return isDOMNode(event.target) && el.contains(event.target);
}
const rafJobs = /* @__PURE__ */ new Set();
{
  let processJobs = function() {
    for (const job of rafJobs) {
      try {
        job();
      } catch (e) {
        console.error(`[vidstack] failed job:

${e}`);
      }
    }
    window.requestAnimationFrame(processJobs);
  };
  processJobs();
}
function scheduleRafJob(job) {
  rafJobs.add(job);
  return () => rafJobs.delete(job);
}
function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name))
    target.setAttribute(name, value);
}
function setARIALabel(target, $label) {
  if (target.hasAttribute("aria-label") || target.hasAttribute("data-no-label"))
    return;
  if (!isFunction($label)) {
    setAttribute(target, "aria-label", $label);
    return;
  }
  function updateAriaDescription() {
    setAttribute(target, "aria-label", $label());
  }
  effect(updateAriaDescription);
}
function isElementVisible(el) {
  const style = getComputedStyle(el);
  return style.display !== "none" && parseInt(style.opacity) > 0;
}
function checkVisibility(el) {
  return !!el && ("checkVisibility" in el ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) : isElementVisible(el));
}
function observeVisibility(el, callback) {
  return scheduleRafJob(() => callback(checkVisibility(el)));
}
function isElementParent(owner, node, test) {
  while (node) {
    if (node === owner) {
      return true;
    } else if (test?.(node)) {
      break;
    } else {
      node = node.parentElement;
    }
  }
  return false;
}
function onPress(target, handler) {
  listenEvent(target, "pointerup", (event) => {
    if (event.button === 0 && !event.defaultPrevented)
      handler(event);
  });
  listenEvent(target, "keydown", (event) => {
    if (isKeyboardClick(event))
      handler(event);
  });
}
function isTouchPinchEvent(event) {
  return isTouchEvent(event) && (event.touches.length > 1 || event.changedTouches.length > 1);
}
function requestScopedAnimationFrame(callback) {
  let scope = getScope(), id = window.requestAnimationFrame(() => {
    scoped(callback, scope);
    id = -1;
  });
  return () => void window.cancelAnimationFrame(id);
}
function cloneTemplate(template, length, onCreate) {
  let current, prev = template, parent = template.parentElement, content = template.content.firstElementChild, elements = [];
  if (!content && template.firstElementChild) {
    template.innerHTML = template.firstElementChild.outerHTML;
    template.firstElementChild.remove();
    content = template.content.firstElementChild;
  }
  if (content?.nodeType !== 1) {
    throw Error("[vidstack] template must contain root element");
  }
  for (let i = 0; i < length; i++) {
    current = document.importNode(content, true);
    onCreate?.(current, i);
    parent.insertBefore(current, prev.nextSibling);
    elements.push(current);
    prev = current;
  }
  onDispose(() => {
    for (let i = 0; i < elements.length; i++)
      elements[i].remove();
  });
  return elements;
}
function createTemplate(content) {
  const template = document.createElement("template");
  template.innerHTML = content;
  return template.content;
}
function cloneTemplateContent(content) {
  const fragment = content.cloneNode(true);
  return fragment.firstElementChild;
}
function autoPlacement(el, trigger, placement, {
  offsetVarName,
  xOffset,
  yOffset,
  ...options
}) {
  if (!el)
    return;
  const floatingPlacement = placement.replace(" ", "-").replace("-center", "");
  setStyle(el, "visibility", !trigger ? "hidden" : null);
  if (!trigger)
    return;
  let isTop = placement.includes("top");
  const negateX = (x) => placement.includes("left") ? `calc(-1 * ${x})` : x, negateY = (y) => isTop ? `calc(-1 * ${y})` : y;
  return autoUpdate(trigger, el, () => {
    computePosition(trigger, el, {
      placement: floatingPlacement,
      middleware: [
        ...options.middleware ?? [],
        flip({ fallbackAxisSideDirection: "start", crossAxis: false }),
        shift()
      ],
      ...options
    }).then(({ x, y, middlewareData }) => {
      const hasFlipped = !!middlewareData.flip?.index;
      isTop = placement.includes(hasFlipped ? "bottom" : "top");
      el.setAttribute(
        "data-placement",
        hasFlipped ? placement.startsWith("top") ? placement.replace("top", "bottom") : placement.replace("bottom", "top") : placement
      );
      Object.assign(el.style, {
        top: `calc(${y + "px"} + ${negateY(
          yOffset ? yOffset + "px" : `var(--${offsetVarName}-y-offset, 0px)`
        )})`,
        left: `calc(${x + "px"} + ${negateX(
          xOffset ? xOffset + "px" : `var(--${offsetVarName}-x-offset, 0px)`
        )})`
      });
    });
  });
}
function hasAnimation(el) {
  const styles = getComputedStyle(el);
  return styles.animationName !== "none";
}
function createSlot(name) {
  const slot = document.createElement("slot");
  slot.name = name;
  return slot;
}
function useTransitionActive($el) {
  const $active = signal(false);
  effect(() => {
    const el = $el();
    if (!el)
      return;
    listenEvent(el, "transitionstart", () => $active.set(true));
    listenEvent(el, "transitionend", () => $active.set(false));
  });
  return $active;
}
function useResizeObserver($el, onResize) {
  function onElementChange() {
    const el = $el();
    if (!el)
      return;
    onResize();
    const observer = new ResizeObserver(animationFrameThrottle(onResize));
    observer.observe(el);
    return () => observer.disconnect();
  }
  effect(onElementChange);
}
function useActive($el) {
  const $isMouseEnter = useMouseEnter($el), $isFocusedIn = useFocusIn($el);
  let prevMouseEnter = false;
  return computed(() => {
    const isMouseEnter = $isMouseEnter();
    if (prevMouseEnter && !isMouseEnter)
      return false;
    prevMouseEnter = isMouseEnter;
    return isMouseEnter || $isFocusedIn();
  });
}
function useMouseEnter($el) {
  const $isMouseEnter = signal(false);
  effect(() => {
    const el = $el();
    if (!el) {
      $isMouseEnter.set(false);
      return;
    }
    listenEvent(el, "mouseenter", () => $isMouseEnter.set(true));
    listenEvent(el, "mouseleave", () => $isMouseEnter.set(false));
  });
  return $isMouseEnter;
}
function useFocusIn($el) {
  const $isFocusIn = signal(false);
  effect(() => {
    const el = $el();
    if (!el) {
      $isFocusIn.set(false);
      return;
    }
    listenEvent(el, "focusin", () => $isFocusIn.set(true));
    listenEvent(el, "focusout", () => $isFocusIn.set(false));
  });
  return $isFocusIn;
}
function isHTMLElement(el) {
  return el instanceof HTMLElement;
}
function useColorSchemePreference() {
  const colorScheme = signal("dark");
  const media = window.matchMedia("(prefers-color-scheme: light)");
  function onChange() {
    colorScheme.set(media.matches ? "light" : "dark");
  }
  onChange();
  listenEvent(media, "change", onChange);
  return colorScheme;
}
function watchColorScheme(el, colorScheme) {
  effect(() => {
    const scheme = colorScheme();
    if (scheme === "system") {
      const preference = useColorSchemePreference();
      effect(() => updateColorScheme(preference()));
      return;
    }
    updateColorScheme(scheme);
  });
  function updateColorScheme(scheme) {
    toggleClass(el, "light", scheme === "light");
    toggleClass(el, "dark", scheme === "dark");
  }
}

export { TimeRange as T, createTemplate as a, getTimeRangesEnd as b, cloneTemplateContent as c, useResizeObserver as d, createSlot as e, cloneTemplate as f, getTimeRangesStart as g, useActive as h, isHTMLElement as i, isTouchPinchEvent as j, hasAnimation as k, listen as l, autoPlacement as m, setARIALabel as n, onPress as o, observeVisibility as p, isElementParent as q, requestScopedAnimationFrame as r, setAttributeIfEmpty as s, isEventInside as t, useTransitionActive as u, isElementVisible as v, watchColorScheme as w };