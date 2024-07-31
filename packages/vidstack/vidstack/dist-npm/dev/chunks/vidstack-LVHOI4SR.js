// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-2d4dOpH4.js
var SCOPE = Symbol(0);
var scheduledEffects = false;
var runningEffects = false;
var currentScope = null;
var currentObserver = null;
var currentObservers = null;
var currentObserversIndex = 0;
var effects = [];
var defaultContext = {};
var NOOP = () => {
};
var STATE_CLEAN = 0;
var STATE_CHECK = 1;
var STATE_DIRTY = 2;
var STATE_DISPOSED = 3;
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
function root(init) {
  const scope = createScope();
  return compute(scope, !init.length ? init : init.bind(null, dispose.bind(scope)), null);
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
var ScopeNode = function Scope() {
  this[SCOPE] = null;
  this.$h = null;
  if (currentScope)
    currentScope.append(this);
};
var ScopeProto = ScopeNode.prototype;
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
var ComputeNode = function Computation(initialValue, compute2, options) {
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
var ComputeProto = ComputeNode.prototype;
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
function isNil(value) {
  return isNull(value) || isUndefined(value);
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
var EVENT = Event;
var DOM_EVENT = Symbol("DOM_EVENT");
var DOMEvent = class extends EVENT {
  constructor(type, ...init) {
    super(type, init[0]);
    this[_a] = true;
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
};
var EventTriggers = class {
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
};
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
var EventsTarget = class extends EventTarget {
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    return super.removeEventListener(type, callback, options);
  }
};
function listenEvent(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return onDispose(() => target.removeEventListener(type, handler, options));
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
function toggleClass(host, name, value) {
  host.classList[value ? "add" : "remove"](name);
}

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-Ikj49ROL.js
function signal(initialValue, options) {
  const node = createComputation(initialValue, null, options), signal2 = read.bind(node);
  signal2[SCOPE] = true;
  signal2.set = write.bind(node);
  return signal2;
}
function isReadSignal(fn) {
  return isFunction$1(fn) && SCOPE in fn;
}
function computed(compute2, options) {
  const node = createComputation(
    options?.initial,
    compute2,
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
var effect = effect$1;
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
var PROPS = /* @__PURE__ */ Symbol(0);
var METHODS = /* @__PURE__ */ Symbol(0);
var ON_DISPATCH = /* @__PURE__ */ Symbol(0);
var _a2;
var EMPTY_PROPS = {};
var Instance = class {
  constructor(Component2, scope, init) {
    this[_a2] = null;
    this.$el = signal(null);
    this.a = null;
    this.d = null;
    this.f = null;
    this.g = null;
    this.e = null;
    this.o = false;
    this.i = EMPTY_PROPS;
    this.b = null;
    this.c = null;
    this.l = [];
    this.m = [];
    this.j = [];
    this.n = [];
    this.d = scope;
    if (init?.scope)
      init.scope.append(scope);
    let stateFactory = Component2.state, props = Component2.props;
    if (stateFactory) {
      this.h = stateFactory.create();
      this.k = new Proxy(this.h, {
        get: (_, prop) => this.h[prop]()
      });
      provideContext(stateFactory, this.h);
    }
    if (props) {
      this.i = createInstanceProps(props);
      if (init?.props) {
        for (const prop of Object.keys(init.props)) {
          this.i[prop]?.set(init.props[prop]);
        }
      }
    }
    onDispose(this.p.bind(this));
  }
  static {
    _a2 = ON_DISPATCH;
  }
  w() {
    scoped(() => {
      for (const callback of this.l)
        callback();
    }, this.d);
  }
  x(el) {
    if (this.a)
      return;
    this.a = el;
    this.$el.set(el);
    scoped(() => {
      this.f = createScope();
      scoped(() => {
        for (const callback of this.m)
          callback(this.a);
        this.q();
        this.r();
      }, this.f);
    }, this.d);
    el.dispatchEvent(new Event("attached"));
  }
  s() {
    this.f?.dispose();
    this.f = null;
    this.g = null;
    this.a = null;
    this.$el.set(null);
  }
  y() {
    if (!this.a || !this.f || !this.j.length)
      return;
    scoped(() => {
      this.g = createScope();
      scoped(() => {
        for (const callback of this.j)
          callback(this.a);
      }, this.g);
    }, this.f);
  }
  z() {
    this.g?.dispose();
    this.g = null;
  }
  p() {
    if (this.o)
      return;
    this.o = true;
    scoped(() => {
      for (const callback of this.n)
        callback(this.a);
    }, this.d);
    const el = this.a;
    this.s();
    this.d.dispose();
    this.l.length = 0;
    this.m.length = 0;
    this.j.length = 0;
    this.n.length = 0;
    this.e = null;
    this.b = null;
    this.c = null;
    this.i = EMPTY_PROPS;
    this.d = null;
    this.k = EMPTY_PROPS;
    this.h = null;
    if (el)
      delete el.$;
  }
  t(target) {
    if (target.onSetup)
      this.l.push(target.onSetup.bind(target));
    if (target.onAttach)
      this.m.push(target.onAttach.bind(target));
    if (target.onConnect)
      this.j.push(target.onConnect.bind(target));
    if (target.onDestroy)
      this.n.push(target.onDestroy.bind(target));
  }
  q() {
    if (!this.b)
      return;
    for (const name of Object.keys(this.b)) {
      if (isFunction(this.b[name])) {
        effect(this.u.bind(this, name));
      } else {
        setAttribute(this.a, name, this.b[name]);
      }
    }
  }
  r() {
    if (!this.c)
      return;
    for (const name of Object.keys(this.c)) {
      if (isFunction(this.c[name])) {
        effect(this.v.bind(this, name));
      } else {
        setStyle(this.a, name, this.c[name]);
      }
    }
  }
  u(name) {
    setAttribute(this.a, name, this.b[name].call(this.e));
  }
  v(name) {
    setStyle(this.a, name, this.c[name].call(this.e));
  }
};
function createInstanceProps(props) {
  const $props = {};
  for (const name of Object.keys(props)) {
    const def = props[name];
    $props[name] = signal(def, def);
  }
  return $props;
}
var currentInstance = { $$: null };
function createComponent(Component2, init) {
  return root(() => {
    currentInstance.$$ = new Instance(Component2, getScope(), init);
    const component = new Component2();
    currentInstance.$$.e = component;
    currentInstance.$$ = null;
    return component;
  });
}
var ViewController = class extends EventTarget {
  constructor() {
    super();
    if (currentInstance.$$)
      this.attach(currentInstance);
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
    if (!this.el)
      return false;
    const event = type instanceof Event ? type : new DOMEvent(type, init[0]);
    Object.defineProperty(event, "target", {
      get: () => this.$$.e
    });
    return untrack(() => {
      this.$$[ON_DISPATCH]?.(event);
      return this.el.dispatchEvent(event);
    });
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
    if (!this.el)
      return noop;
    return listenEvent(this.el, type, handler, options);
  }
};

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/index.js
var Component = class extends ViewController {
  subscribe(callback) {
    return scoped(() => effect(() => callback(this.state)), this.$$.d);
  }
  destroy() {
    this.$$.p();
  }
};
var State = class {
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
};
function useState(state) {
  return useContext(state);
}

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-L-TO4Elh.js
function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-PguL6eRI.js
function runAll(fns, arg) {
  for (const fn of fns)
    fn(arg);
}

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/std.js
function unwrap(fn) {
  return isFunction(fn) ? fn() : fn;
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
function useDisposalBin() {
  const disposal = createDisposalBin();
  onDispose(disposal.empty);
  return disposal;
}
function keysOf(obj) {
  return Object.keys(obj);
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
  let id = -1, lastArgs;
  function throttle(...args) {
    lastArgs = args;
    if (id >= 0)
      return;
    id = window.requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      id = -1;
      lastArgs = void 0;
    });
  }
  return throttle;
}
var requestIdleCallback = typeof window !== "undefined" ? "requestIdleCallback" in window ? window.requestIdleCallback : (cb) => window.setTimeout(cb, 1) : noop;
function waitIdlePeriod(callback, options) {
  return new Promise((resolve) => {
    requestIdleCallback((deadline) => {
      callback?.(deadline);
      resolve();
    }, options);
  });
}

export {
  peek,
  untrack,
  tick,
  getScope,
  scoped,
  onDispose,
  createScope,
  noop,
  isNull,
  isUndefined,
  isNil,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isArray,
  DOMEvent,
  walkTriggerEventChain,
  findTriggerEvent,
  hasTriggerEvent,
  appendTriggerEvent,
  EventsTarget,
  listenEvent,
  isPointerEvent,
  isTouchEvent,
  isMouseEvent,
  isKeyboardEvent,
  wasEnterKeyPressed,
  isKeyboardClick,
  isDOMNode,
  setAttribute,
  setStyle,
  toggleClass,
  signal,
  computed,
  isWriteSignal,
  effect,
  createContext,
  provideContext,
  useContext,
  hasProvidedContext,
  PROPS,
  METHODS,
  createComponent,
  ViewController,
  Component,
  State,
  useState,
  runAll,
  camelToKebabCase,
  kebabToCamelCase,
  uppercaseFirstChar,
  unwrap,
  ariaBool,
  createDisposalBin,
  useDisposalBin,
  keysOf,
  deferredPromise,
  waitTimeout,
  animationFrameThrottle,
  waitIdlePeriod
};
