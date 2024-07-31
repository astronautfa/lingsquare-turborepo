import {
  ViewController,
  effect,
  listenEvent,
  setAttribute,
  signal
} from "./vidstack-LVHOI4SR.js";

// ../../../node_modules/.pnpm/just-throttle@4.2.0/node_modules/just-throttle/index.mjs
var functionThrottle = throttle;
function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = options && options.leading;
  var trailing = options && options.trailing;
  if (leading == null) {
    leading = true;
  }
  if (trailing == null) {
    trailing = !leading;
  }
  if (leading == true) {
    trailing = false;
  }
  var cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  var flush = function() {
    var call = throttledFn;
    cancel();
    if (call) {
      call();
    }
  };
  var throttleWrapper = function() {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;
    throttledFn = function() {
      return fn.apply(context, args);
    };
    if (!timeoutId) {
      timeoutId = setTimeout(function() {
        timeoutId = null;
        if (trailing) {
          return throttledFn();
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return throttledFn();
    }
  };
  throttleWrapper.cancel = cancel;
  throttleWrapper.flush = flush;
  return throttleWrapper;
}

// src/foundation/observers/focus-visible.ts
var $keyboard = signal(false);
if (true) {
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e) => {
    if (e.metaKey || e.altKey || e.ctrlKey) return;
    $keyboard.set(true);
  });
}
var FocusVisibleController = class extends ViewController {
  #focused = signal(false);
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this.#focused.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this.#onPointerEnter.bind(this));
        this.listen("pointerleave", this.#onPointerLeave.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this.#focused.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this.#onFocus.bind(this));
      this.listen("blur", this.#onBlur.bind(this));
    });
  }
  focused() {
    return this.#focused();
  }
  #onFocus() {
    this.#focused.set(true);
    updateFocusAttr(this.el, true);
  }
  #onBlur() {
    this.#focused.set(false);
    updateFocusAttr(this.el, false);
  }
  #onPointerEnter() {
    updateHoverAttr(this.el, true);
  }
  #onPointerLeave() {
    updateHoverAttr(this.el, false);
  }
};
function updateFocusAttr(el, isFocused) {
  setAttribute(el, "data-focus", isFocused);
  setAttribute(el, "data-hocus", isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, "data-hocus", isHovering);
  setAttribute(el, "data-hover", isHovering);
}

export {
  functionThrottle,
  $keyboard,
  FocusVisibleController
};
