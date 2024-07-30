import { h as isUndefined, j as isNumber } from './vidstack-ND4uzLKO.js';

class RAFLoop {
  constructor(_callback) {
    this._callback = _callback;
  }
  _start() {
    if (!isUndefined(this._id))
      return;
    this._loop();
  }
  _stop() {
    if (isNumber(this._id))
      window.cancelAnimationFrame(this._id);
    this._id = void 0;
  }
  _loop() {
    this._id = window.requestAnimationFrame(() => {
      if (isUndefined(this._id))
        return;
      this._callback();
      this._loop();
    });
  }
}

export { RAFLoop as R };
