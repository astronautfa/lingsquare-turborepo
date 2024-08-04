import { h as isUndefined, j as isNumber } from './vidstack-CBNXqr3M.js';

class RAFLoop {
  constructor(_callback) {
    this.La = _callback;
  }
  Xa() {
    if (!isUndefined(this.ya))
      return;
    this.fg();
  }
  $() {
    if (isNumber(this.ya))
      window.cancelAnimationFrame(this.ya);
    this.ya = void 0;
  }
  fg() {
    this.ya = window.requestAnimationFrame(() => {
      if (isUndefined(this.ya))
        return;
      this.La();
      this.fg();
    });
  }
}

export { RAFLoop as R };