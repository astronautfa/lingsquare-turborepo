import {
  isNumber,
  isUndefined
} from "./vidstack-3R7QJDRC.js";

// ../vidstack/src/foundation/observers/raf-loop.ts
var RAFLoop = class {
  #id;
  #callback;
  constructor(callback) {
    this.#callback = callback;
  }
  start() {
    if (!isUndefined(this.#id)) return;
    this.#loop();
  }
  stop() {
    if (isNumber(this.#id)) window.cancelAnimationFrame(this.#id);
    this.#id = void 0;
  }
  #loop() {
    this.#id = window.requestAnimationFrame(() => {
      if (isUndefined(this.#id)) return;
      this.#callback();
      this.#loop();
    });
  }
};

export {
  RAFLoop
};
