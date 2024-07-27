const SCOPE = Symbol(0);

let scheduledEffects = false, runningEffects = false, currentScope = null, currentObserver = null, currentObservers = null, currentObserversIndex = 0, effects = [], defaultContext = {};
const NOOP = () => {
}, STATE_CLEAN = 0, STATE_CHECK = 1, STATE_DIRTY = 2, STATE_DISPOSED = 3;
function flushEffects() {
  scheduledEffects = true;
  queueMicrotask(runEffects);
}
function runEffects() {
  if (!effects.length) {
    scheduledEffects = false;
    return;
  }
  runningEffects = true;
  for (let i = 0; i < effects.length; i++) {
    if (effects[i].$st !== STATE_CLEAN)
      runTop(effects[i]);
  }
  effects = [];
  scheduledEffects = false;
  runningEffects = false;
}
function runTop(node) {
  let ancestors = [node];
  while (node = node[SCOPE]) {
    if (node.$e && node.$st !== STATE_CLEAN)
      ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    updateCheck(ancestors[i]);
  }
}
function peek(fn) {
  return compute(currentScope, fn, null);
}
function untrack(fn) {
  return compute(null, fn, null);
}
function tick() {
  if (!runningEffects)
    runEffects();
}
function getScope() {
  return currentScope;
}
function scoped(run, scope) {
  try {
    return compute(scope, run, null);
  } catch (error) {
    handleError(scope, error);
    return;
  }
}
function getContext(key, scope = currentScope) {
  return scope?.$cx[key];
}
function setContext(key, value, scope = currentScope) {
  if (scope)
    scope.$cx = { ...scope.$cx, [key]: value };
}
function onDispose(disposable) {
  if (!disposable || !currentScope)
    return disposable || NOOP;
  const node = currentScope;
  if (!node.$d) {
    node.$d = disposable;
  } else if (Array.isArray(node.$d)) {
    node.$d.push(disposable);
  } else {
    node.$d = [node.$d, disposable];
  }
  return function removeDispose() {
    if (node.$st === STATE_DISPOSED)
      return;
    disposable.call(null);
    if (isFunction$1(node.$d)) {
      node.$d = null;
    } else if (Array.isArray(node.$d)) {
      node.$d.splice(node.$d.indexOf(disposable), 1);
    }
  };
}
function dispose(self = true) {
  if (this.$st === STATE_DISPOSED)
    return;
  if (this.$h) {
    if (Array.isArray(this.$h)) {
      for (let i = this.$h.length - 1; i >= 0; i--) {
        dispose.call(this.$h[i]);
      }
    } else {
      dispose.call(this.$h);
    }
  }
  if (self) {
    const parent = this[SCOPE];
    if (parent) {
      if (Array.isArray(parent.$h)) {
        parent.$h.splice(parent.$h.indexOf(this), 1);
      } else {
        parent.$h = null;
      }
    }
    disposeNode(this);
  }
}
function disposeNode(node) {
  node.$st = STATE_DISPOSED;
  if (node.$d)
    emptyDisposal(node);
  if (node.$s)
    removeSourceObservers(node, 0);
  node[SCOPE] = null;
  node.$s = null;
  node.$o = null;
  node.$h = null;
  node.$cx = defaultContext;
  node.$eh = null;
}
function emptyDisposal(scope) {
  try {
    if (Array.isArray(scope.$d)) {
      for (let i = scope.$d.length - 1; i >= 0; i--) {
        const callable = scope.$d[i];
        callable.call(callable);
      }
    } else {
      scope.$d.call(scope.$d);
    }
    scope.$d = null;
  } catch (error) {
    handleError(scope, error);
  }
}
function compute(scope, compute2, observer) {
  const prevScope = currentScope, prevObserver = currentObserver;
  currentScope = scope;
  currentObserver = observer;
  try {
    return compute2.call(scope);
  } finally {
    currentScope = prevScope;
    currentObserver = prevObserver;
  }
}
function handleError(scope, error) {
  if (!scope || !scope.$eh)
    throw error;
  let i = 0, len = scope.$eh.length, currentError = error;
  for (i = 0; i < len; i++) {
    try {
      scope.$eh[i](currentError);
      break;
    } catch (error2) {
      currentError = error2;
    }
  }
  if (i === len)
    throw currentError;
}
function read() {
  if (this.$st === STATE_DISPOSED)
    return this.$v;
  if (currentObserver && !this.$e) {
    if (!currentObservers && currentObserver.$s && currentObserver.$s[currentObserversIndex] == this) {
      currentObserversIndex++;
    } else if (!currentObservers)
      currentObservers = [this];
    else
      currentObservers.push(this);
  }
  if (this.$c)
    updateCheck(this);
  return this.$v;
}
function write(newValue) {
  const value = isFunction$1(newValue) ? newValue(this.$v) : newValue;
  if (this.$ch(this.$v, value)) {
    this.$v = value;
    if (this.$o) {
      for (let i = 0; i < this.$o.length; i++) {
        notify(this.$o[i], STATE_DIRTY);
      }
    }
  }
  return this.$v;
}
const ScopeNode = function Scope() {
  this[SCOPE] = null;
  this.$h = null;
  if (currentScope)
    currentScope.append(this);
};
const ScopeProto = ScopeNode.prototype;
ScopeProto.$cx = defaultContext;
ScopeProto.$eh = null;
ScopeProto.$c = null;
ScopeProto.$d = null;
ScopeProto.append = function(child) {
  child[SCOPE] = this;
  if (!this.$h) {
    this.$h = child;
  } else if (Array.isArray(this.$h)) {
    this.$h.push(child);
  } else {
    this.$h = [this.$h, child];
  }
  child.$cx = child.$cx === defaultContext ? this.$cx : { ...this.$cx, ...child.$cx };
  if (this.$eh) {
    child.$eh = !child.$eh ? this.$eh : [...child.$eh, ...this.$eh];
  }
};
ScopeProto.dispose = function() {
  dispose.call(this);
};
function createScope() {
  return new ScopeNode();
}
const ComputeNode = function Computation(initialValue, compute2, options) {
  ScopeNode.call(this);
  this.$st = compute2 ? STATE_DIRTY : STATE_CLEAN;
  this.$i = false;
  this.$e = false;
  this.$s = null;
  this.$o = null;
  this.$v = initialValue;
  if (compute2)
    this.$c = compute2;
  if (options && options.dirty)
    this.$ch = options.dirty;
};
const ComputeProto = ComputeNode.prototype;
Object.setPrototypeOf(ComputeProto, ScopeProto);
ComputeProto.$ch = isNotEqual;
ComputeProto.call = read;
function createComputation(initialValue, compute2, options) {
  return new ComputeNode(initialValue, compute2, options);
}
function isNotEqual(a, b) {
  return a !== b;
}
function isFunction$1(value) {
  return typeof value === "function";
}
function updateCheck(node) {
  if (node.$st === STATE_CHECK) {
    for (let i = 0; i < node.$s.length; i++) {
      updateCheck(node.$s[i]);
      if (node.$st === STATE_DIRTY) {
        break;
      }
    }
  }
  if (node.$st === STATE_DIRTY)
    update(node);
  else
    node.$st = STATE_CLEAN;
}
function cleanup(node) {
  if (node.$h)
    dispose.call(node, false);
  if (node.$d)
    emptyDisposal(node);
  node.$eh = node[SCOPE] ? node[SCOPE].$eh : null;
}
function update(node) {
  let prevObservers = currentObservers, prevObserversIndex = currentObserversIndex;
  currentObservers = null;
  currentObserversIndex = 0;
  try {
    cleanup(node);
    const result = compute(node, node.$c, node);
    updateObservers(node);
    if (!node.$e && node.$i) {
      write.call(node, result);
    } else {
      node.$v = result;
      node.$i = true;
    }
  } catch (error) {
    updateObservers(node);
    handleError(node, error);
  } finally {
    currentObservers = prevObservers;
    currentObserversIndex = prevObserversIndex;
    node.$st = STATE_CLEAN;
  }
}
function updateObservers(node) {
  if (currentObservers) {
    if (node.$s)
      removeSourceObservers(node, currentObserversIndex);
    if (node.$s && currentObserversIndex > 0) {
      node.$s.length = currentObserversIndex + currentObservers.length;
      for (let i = 0; i < currentObservers.length; i++) {
        node.$s[currentObserversIndex + i] = currentObservers[i];
      }
    } else {
      node.$s = currentObservers;
    }
    let source;
    for (let i = currentObserversIndex; i < node.$s.length; i++) {
      source = node.$s[i];
      if (!source.$o)
        source.$o = [node];
      else
        source.$o.push(node);
    }
  } else if (node.$s && currentObserversIndex < node.$s.length) {
    removeSourceObservers(node, currentObserversIndex);
    node.$s.length = currentObserversIndex;
  }
}
function notify(node, state) {
  if (node.$st >= state)
    return;
  if (node.$e && node.$st === STATE_CLEAN) {
    effects.push(node);
    if (!scheduledEffects)
      flushEffects();
  }
  node.$st = state;
  if (node.$o) {
    for (let i = 0; i < node.$o.length; i++) {
      notify(node.$o[i], STATE_CHECK);
    }
  }
}
function removeSourceObservers(node, index) {
  let source, swap;
  for (let i = index; i < node.$s.length; i++) {
    source = node.$s[i];
    if (source.$o) {
      swap = source.$o.indexOf(node);
      source.$o[swap] = source.$o[source.$o.length - 1];
      source.$o.pop();
    }
  }
}

function noop(...args) {
}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isObject(value) {
  return value?.constructor === Object;
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isArray(value) {
  return Array.isArray(value);
}

var _a;
const EVENT = class Event2 {
} , DOM_EVENT = Symbol("DOM_EVENT");
class DOMEvent extends EVENT {
  constructor(type, ...init) {
    super(type, init[0]);
    this[_a] = true;
    /**
     * The event trigger chain.
     */
    this.triggers = new EventTriggers();
    this.detail = init[0]?.detail;
    const trigger = init[0]?.trigger;
    if (trigger)
      this.triggers.add(trigger);
  }
  static {
    _a = DOM_EVENT;
  }
  /**
   * The preceding event that was responsible for this event being fired.
   */
  get trigger() {
    return this.triggers.source;
  }
  /**
   * The origin event that lead to this event being fired.
   */
  get originEvent() {
    return this.triggers.origin;
  }
  /**
   * Whether the origin event was triggered by the user.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted}
   */
  get isOriginTrusted() {
    return this.triggers.origin?.isTrusted ?? false;
  }
}
class EventTriggers {
  constructor() {
    this.chain = [];
  }
  get source() {
    return this.chain[0];
  }
  get origin() {
    return this.chain[this.chain.length - 1];
  }
  /**
   * Appends the event to the end of the chain.
   */
  add(event) {
    this.chain.push(event);
    if (isDOMEvent(event)) {
      this.chain.push(...event.triggers);
    }
  }
  /**
   * Removes the event from the chain and returns it (if found).
   */
  remove(event) {
    return this.chain.splice(this.chain.indexOf(event), 1)[0];
  }
  /**
   * Returns whether the chain contains the given `event`.
   */
  has(event) {
    return this.chain.some((e) => e === event);
  }
  /**
   * Returns whether the chain contains the given event type.
   */
  hasType(type) {
    return !!this.findType(type);
  }
  /**
   * Returns the first event with the given `type` found in the chain.
   */
  findType(type) {
    return this.chain.find((e) => e.type === type);
  }
  /**
   * Walks an event chain on a given `event`, and invokes the given `callback` for each trigger event.
   */
  walk(callback) {
    for (const event of this.chain) {
      const returnValue = callback(event);
      if (returnValue)
        return [event, returnValue];
    }
  }
  [Symbol.iterator]() {
    return this.chain.values();
  }
}
function isDOMEvent(event) {
  return !!event?.[DOM_EVENT];
}
function walkTriggerEventChain(event, callback) {
  if (!isDOMEvent(event))
    return;
  return event.triggers.walk(callback);
}
function findTriggerEvent(event, type) {
  return isDOMEvent(event) ? event.triggers.findType(type) : void 0;
}
function hasTriggerEvent(event, type) {
  return !!findTriggerEvent(event, type);
}
function appendTriggerEvent(event, trigger) {
  if (trigger)
    event.triggers.add(trigger);
}
class EventsTarget extends EventTarget {
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    return super.removeEventListener(type, callback, options);
  }
}
function listenEvent(target, type, handler, options) {
  return noop;
}
function isPointerEvent(event) {
  return !!event?.type.startsWith("pointer");
}
function isTouchEvent(event) {
  return !!event?.type.startsWith("touch");
}
function isMouseEvent(event) {
  return /^(click|mouse)/.test(event?.type ?? "");
}
function isKeyboardEvent(event) {
  return !!event?.type.startsWith("key");
}
function wasEnterKeyPressed(event) {
  return isKeyboardEvent(event) && event.key === "Enter";
}
function isKeyboardClick(event) {
  return isKeyboardEvent(event) && (event.key === "Enter" || event.key === " ");
}

function isDOMNode(node) {
  return node instanceof Node;
}
function setAttribute(host, name, value) {
  if (!host)
    return;
  else if (!value && value !== "" && value !== 0) {
    host.removeAttribute(name);
  } else {
    const attrValue = value === true ? "" : value + "";
    if (host.getAttribute(name) !== attrValue) {
      host.setAttribute(name, attrValue);
    }
  }
}
function setStyle(host, property, value) {
  if (!host)
    return;
  else if (!value && value !== 0) {
    host.style.removeProperty(property);
  } else {
    host.style.setProperty(property, value + "");
  }
}

function signal(initialValue, options) {
  const node = createComputation(initialValue, null, options), signal2 = read.bind(node);
  signal2[SCOPE] = true;
  signal2.set = write.bind(node);
  return signal2;
}
function isReadSignal(fn) {
  return isFunction$1(fn) && SCOPE in fn;
}
function computed(compute, options) {
  const node = createComputation(
    options?.initial,
    compute,
    options
  ), signal2 = read.bind(node);
  signal2[SCOPE] = true;
  return signal2;
}
function effect$1(effect2, options) {
  const signal2 = createComputation(
    null,
    function runEffect() {
      let effectResult = effect2();
      isFunction$1(effectResult) && onDispose(effectResult);
      return null;
    },
    void 0
  );
  signal2.$e = true;
  update(signal2);
  return dispose.bind(signal2, true);
}
function isWriteSignal(fn) {
  return isReadSignal(fn) && "set" in fn;
}

function createContext(provide) {
  return { id: Symbol(), provide };
}
function provideContext(context, value, scope = getScope()) {
  const hasProvidedValue = !isUndefined(value);
  setContext(context.id, hasProvidedValue ? value : context.provide?.(), scope);
}
function useContext(context) {
  const value = getContext(context.id);
  return value;
}
function hasProvidedContext(context) {
  return !isUndefined(getContext(context.id));
}

const PROPS = /* @__PURE__ */ Symbol(0);
const METHODS = /* @__PURE__ */ Symbol(0);
class ViewController extends EventTarget {
  constructor() {
    super();
  }
  get el() {
    return this.$$.a;
  }
  get $el() {
    return this.$$.$el();
  }
  get scope() {
    return this.$$.d;
  }
  get attachScope() {
    return this.$$.f;
  }
  get connectScope() {
    return this.$$.g;
  }
  /** @internal */
  get $props() {
    return this.$$.i;
  }
  /** @internal */
  get $state() {
    return this.$$.h;
  }
  get state() {
    return this.$$.k;
  }
  attach({ $$ }) {
    this.$$ = $$;
    $$.t(this);
    return this;
  }
  addEventListener(type, callback, options) {
    this.listen(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    this.el?.removeEventListener(type, callback, options);
  }
  /**
   * This method can be used to specify attributes that should be set on the host element. Any
   * attributes that are assigned to a function will be considered a signal and updated accordingly.
   */
  setAttributes(attributes) {
    if (!this.$$.b)
      this.$$.b = {};
    Object.assign(this.$$.b, attributes);
  }
  /**
   * This method can be used to specify styles that should set be set on the host element. Any
   * styles that are assigned to a function will be considered a signal and updated accordingly.
   */
  setStyles(styles) {
    if (!this.$$.c)
      this.$$.c = {};
    Object.assign(this.$$.c, styles);
  }
  /**
   * This method is used to satisfy the CSS variables contract specified on the current
   * component. Other CSS variables can be set via the `setStyles` method.
   */
  setCSSVars(vars) {
    this.setStyles(vars);
  }
  /**
   * Type-safe utility for creating component DOM events.
   */
  createEvent(type, ...init) {
    return new DOMEvent(type, init[0]);
  }
  /**
   * Creates a `DOMEvent` and dispatches it from the host element. This method is typed to
   * match all component events.
   */
  dispatch(type, ...init) {
    return false;
  }
  dispatchEvent(event) {
    return this.dispatch(event);
  }
  /**
   * Adds an event listener for the given `type` and returns a function which can be invoked to
   * remove the event listener.
   *
   * - The listener is removed if the current scope is disposed.
   * - This method is safe to use on the server (noop).
   */
  listen(type, handler, options) {
    return noop;
  }
}

const effect = serverEffect ;
function serverEffect(effect2, options) {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "test") {
    return effect$1(effect2);
  }
  return noop;
}

class Component extends ViewController {
  subscribe(callback) {
    return scoped(() => effect(() => callback(this.state)), this.$$.d);
  }
  destroy() {
    this.$$.p();
  }
}

function prop(target, propertyKey, descriptor) {
  if (!target[PROPS])
    target[PROPS] = /* @__PURE__ */ new Set();
  target[PROPS].add(propertyKey);
}
function method(target, propertyKey, descriptor) {
  if (!target[METHODS])
    target[METHODS] = /* @__PURE__ */ new Set();
  target[METHODS].add(propertyKey);
}

class State {
  constructor(record) {
    this.id = Symbol(0);
    this.record = record;
    this.A = Object.getOwnPropertyDescriptors(record);
  }
  create() {
    const store = {}, state = new Proxy(store, { get: (_, prop) => store[prop]() });
    for (const name of Object.keys(this.record)) {
      const getter = this.A[name].get;
      store[name] = getter ? computed(getter.bind(state)) : signal(this.record[name]);
    }
    return store;
  }
  reset(record, filter) {
    for (const name of Object.keys(record)) {
      if (!this.A[name].get && (!filter || filter(name))) {
        record[name].set(this.record[name]);
      }
    }
  }
}
function useState(state) {
  return useContext(state);
}

function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ariaBool(value) {
  return value ? "true" : "false";
}

function createDisposalBin() {
  const disposal = /* @__PURE__ */ new Set();
  return {
    add(...callbacks) {
      for (const callback of callbacks)
        disposal.add(callback);
    },
    empty() {
      for (const callback of disposal)
        callback();
      disposal.clear();
    }
  };
}

function deferredPromise() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function waitTimeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
function animationFrameThrottle(func) {
  return noop;
}

var key = {
    fullscreenEnabled: 0,
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5,
    fullscreen: 6
};
var webkit = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
    '-webkit-full-screen',
];
var moz = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
    '-moz-full-screen',
];
var ms = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
    '-ms-fullscreen',
];
// so it doesn't throw if no window or document
var document$1 = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
var vendor = (('fullscreenEnabled' in document$1 && Object.keys(key)) ||
    (webkit[0] in document$1 && webkit) ||
    (moz[0] in document$1 && moz) ||
    (ms[0] in document$1 && ms) ||
    []);
var fscreen = {
    requestFullscreen: function (element) { return element[vendor[key.requestFullscreen]](); },
    requestFullscreenFunction: function (element) { return element[vendor[key.requestFullscreen]]; },
    get exitFullscreen() { return document$1[vendor[key.exitFullscreen]].bind(document$1); },
    get fullscreenPseudoClass() { return ":" + vendor[key.fullscreen]; },
    addEventListener: function (type, handler, options) { return document$1.addEventListener(vendor[key[type]], handler, options); },
    removeEventListener: function (type, handler, options) { return document$1.removeEventListener(vendor[key[type]], handler, options); },
    get fullscreenEnabled() { return Boolean(document$1[vendor[key.fullscreenEnabled]]); },
    set fullscreenEnabled(val) { },
    get fullscreenElement() { return document$1[vendor[key.fullscreenElement]]; },
    set fullscreenElement(val) { },
    get onfullscreenchange() { return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()]; },
    set onfullscreenchange(handler) { return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler; },
    get onfullscreenerror() { return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()]; },
    set onfullscreenerror(handler) { return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler; },
};

var functionThrottle = throttle;

function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = (options && options.leading);
  var trailing = (options && options.trailing);

  if (leading == null) {
    leading = true; // default
  }

  if (trailing == null) {
    trailing = !leading; //default
  }

  if (leading == true) {
    trailing = false; // forced because there should be invocation per call
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

var functionDebounce = debounce;

function debounce(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;

  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  };

  var flush = function() {
    var call = debouncedFn;
    clear();

    if (call) {
      call();
    }
  };

  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }

    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();

    debouncedFn = function() {
      fn.apply(context, args);
    };

    timeout = setTimeout(function() {
      timeout = null;

      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;

        return call();
      }
    }, wait);

    if (callNow) {
      return debouncedFn();
    }
  };

  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;

  return debounceWrapper;
}

const t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,e=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),n=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return e(o.overflowY,n)||e(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return !1},o=(t,e,n,o,l,r,i,s)=>r<t&&i>e||r>t&&i<e?0:r<=t&&s<=n||i>=e&&s>=n?r-t-o:i>e&&s<n||r<t&&s>n?i-e+l:0,l=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e},r=(e,r)=>{var i,s,d,h;if("undefined"==typeof document)return [];const{scrollMode:c,block:f,inline:u,boundary:a,skipOverflowHiddenElements:g}=r,p="function"==typeof a?a:t=>t!==a;if(!t(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,w=[];let W=e;for(;t(W)&&p(W);){if(W=l(W),W===m){w.push(W);break}null!=W&&W===document.body&&n(W)&&!n(document.documentElement)||null!=W&&n(W,g)&&w.push(W);}const b=null!=(s=null==(i=window.visualViewport)?void 0:i.width)?s:innerWidth,H=null!=(h=null==(d=window.visualViewport)?void 0:d.height)?h:innerHeight,{scrollX:y,scrollY:M}=window,{height:v,width:E,top:x,right:C,bottom:I,left:R}=e.getBoundingClientRect(),{top:T,right:B,bottom:F,left:V}=(t=>{const e=window.getComputedStyle(t);return {top:parseFloat(e.scrollMarginTop)||0,right:parseFloat(e.scrollMarginRight)||0,bottom:parseFloat(e.scrollMarginBottom)||0,left:parseFloat(e.scrollMarginLeft)||0}})(e);let k="start"===f||"nearest"===f?x-T:"end"===f?I+F:x+v/2-T+F,D="center"===u?R+E/2-V+B:"end"===u?C+B:R-V;const L=[];for(let t=0;t<w.length;t++){const e=w[t],{height:n,width:l,top:r,right:i,bottom:s,left:d}=e.getBoundingClientRect();if("if-needed"===c&&x>=0&&R>=0&&I<=H&&C<=b&&x>=r&&I<=s&&R>=d&&C<=i)return L;const h=getComputedStyle(e),a=parseInt(h.borderLeftWidth,10),g=parseInt(h.borderTopWidth,10),p=parseInt(h.borderRightWidth,10),W=parseInt(h.borderBottomWidth,10);let T=0,B=0;const F="offsetWidth"in e?e.offsetWidth-e.clientWidth-a-p:0,V="offsetHeight"in e?e.offsetHeight-e.clientHeight-g-W:0,S="offsetWidth"in e?0===e.offsetWidth?0:l/e.offsetWidth:0,X="offsetHeight"in e?0===e.offsetHeight?0:n/e.offsetHeight:0;if(m===e)T="start"===f?k:"end"===f?k-H:"nearest"===f?o(M,M+H,H,g,W,M+k,M+k+v,v):k-H/2,B="start"===u?D:"center"===u?D-b/2:"end"===u?D-b:o(y,y+b,b,a,p,y+D,y+D+E,E),T=Math.max(0,T+M),B=Math.max(0,B+y);else {T="start"===f?k-r-g:"end"===f?k-s+W+V:"nearest"===f?o(r,s,n,g,W+V,k,k+v,v):k-(r+n/2)+V/2,B="start"===u?D-d-a:"center"===u?D-(d+l/2)+F/2:"end"===u?D-i+p+F:o(d,i,l,a,p+F,D,D+E,E);const{scrollLeft:t,scrollTop:h}=e;T=0===X?0:Math.max(0,Math.min(h+T/X,e.scrollHeight-n/X+V)),B=0===S?0:Math.max(0,Math.min(t+B/S,e.scrollWidth-l/S+F)),k+=h-T,D+=t-B;}L.push({el:e,top:T,left:B});}return L};

export { Component, DOMEvent, EventsTarget, State, ViewController, animationFrameThrottle, appendTriggerEvent, ariaBool, camelToKebabCase, computed, createContext, createDisposalBin, createScope, deferredPromise, effect, findTriggerEvent, fscreen, functionDebounce, functionThrottle, getScope, hasProvidedContext, hasTriggerEvent, isArray, isBoolean, isDOMNode, isFunction, isKeyboardClick, isKeyboardEvent, isMouseEvent, isNull, isNumber, isObject, isPointerEvent, isString, isTouchEvent, isUndefined, isWriteSignal, kebabToCamelCase, listenEvent, method, noop, onDispose, peek, prop, provideContext, r, scoped, setAttribute, setStyle, signal, tick, untrack, uppercaseFirstChar, useContext, useState, waitTimeout, walkTriggerEventChain, wasEnterKeyPressed };
