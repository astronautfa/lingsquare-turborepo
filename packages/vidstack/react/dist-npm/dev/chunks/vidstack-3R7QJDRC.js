// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/rsc/dev.js
import * as React from "react";
var IS_SERVER = typeof document === "undefined";
var SCOPE = Symbol("SCOPE");
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
    if (effects[i]._state !== STATE_CLEAN)
      runTop(effects[i]);
  }
  effects = [];
  scheduledEffects = false;
  runningEffects = false;
}
function runTop(node) {
  let ancestors = [node];
  while (node = node[SCOPE]) {
    if (node._effect && node._state !== STATE_CLEAN)
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
  return scope?._context[key];
}
function setContext(key, value, scope = currentScope) {
  if (scope)
    scope._context = { ...scope._context, [key]: value };
}
function onDispose(disposable) {
  if (!disposable || !currentScope)
    return disposable || NOOP;
  const node = currentScope;
  if (!node._disposal) {
    node._disposal = disposable;
  } else if (Array.isArray(node._disposal)) {
    node._disposal.push(disposable);
  } else {
    node._disposal = [node._disposal, disposable];
  }
  return function removeDispose() {
    if (node._state === STATE_DISPOSED)
      return;
    disposable.call(null);
    if (isFunction$1(node._disposal)) {
      node._disposal = null;
    } else if (Array.isArray(node._disposal)) {
      node._disposal.splice(node._disposal.indexOf(disposable), 1);
    }
  };
}
function dispose(self = true) {
  if (this._state === STATE_DISPOSED)
    return;
  if (this._children) {
    if (Array.isArray(this._children)) {
      for (let i = this._children.length - 1; i >= 0; i--) {
        dispose.call(this._children[i]);
      }
    } else {
      dispose.call(this._children);
    }
  }
  if (self) {
    const parent = this[SCOPE];
    if (parent) {
      if (Array.isArray(parent._children)) {
        parent._children.splice(parent._children.indexOf(this), 1);
      } else {
        parent._children = null;
      }
    }
    disposeNode(this);
  }
}
function disposeNode(node) {
  node._state = STATE_DISPOSED;
  if (node._disposal)
    emptyDisposal(node);
  if (node._sources)
    removeSourceObservers(node, 0);
  node[SCOPE] = null;
  node._sources = null;
  node._observers = null;
  node._children = null;
  node._context = defaultContext;
  node._handlers = null;
}
function emptyDisposal(scope) {
  try {
    if (Array.isArray(scope._disposal)) {
      for (let i = scope._disposal.length - 1; i >= 0; i--) {
        const callable = scope._disposal[i];
        callable.call(callable);
      }
    } else {
      scope._disposal.call(scope._disposal);
    }
    scope._disposal = null;
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
  if (!scope || !scope._handlers)
    throw error;
  let i = 0, len = scope._handlers.length, currentError = error;
  for (i = 0; i < len; i++) {
    try {
      scope._handlers[i](currentError);
      break;
    } catch (error2) {
      currentError = error2;
    }
  }
  if (i === len)
    throw currentError;
}
function read() {
  if (this._state === STATE_DISPOSED)
    return this._value;
  if (currentObserver && !this._effect) {
    if (!currentObservers && currentObserver._sources && currentObserver._sources[currentObserversIndex] == this) {
      currentObserversIndex++;
    } else if (!currentObservers)
      currentObservers = [this];
    else
      currentObservers.push(this);
  }
  if (this._compute)
    updateCheck(this);
  return this._value;
}
function write(newValue) {
  const value = isFunction$1(newValue) ? newValue(this._value) : newValue;
  if (this._changed(this._value, value)) {
    this._value = value;
    if (this._observers) {
      for (let i = 0; i < this._observers.length; i++) {
        notify(this._observers[i], STATE_DIRTY);
      }
    }
  }
  return this._value;
}
var ScopeNode = function Scope() {
  this[SCOPE] = null;
  this._children = null;
  if (currentScope)
    currentScope.append(this);
};
var ScopeProto = ScopeNode.prototype;
ScopeProto._context = defaultContext;
ScopeProto._handlers = null;
ScopeProto._compute = null;
ScopeProto._disposal = null;
ScopeProto.append = function(child) {
  child[SCOPE] = this;
  if (!this._children) {
    this._children = child;
  } else if (Array.isArray(this._children)) {
    this._children.push(child);
  } else {
    this._children = [this._children, child];
  }
  child._context = child._context === defaultContext ? this._context : { ...this._context, ...child._context };
  if (this._handlers) {
    child._handlers = !child._handlers ? this._handlers : [...child._handlers, ...this._handlers];
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
  this._state = compute2 ? STATE_DIRTY : STATE_CLEAN;
  this._init = false;
  this._effect = false;
  this._sources = null;
  this._observers = null;
  this._value = initialValue;
  this.id = options?.id ?? (this._compute ? "computed" : "signal");
  if (compute2)
    this._compute = compute2;
  if (options && options.dirty)
    this._changed = options.dirty;
};
var ComputeProto = ComputeNode.prototype;
Object.setPrototypeOf(ComputeProto, ScopeProto);
ComputeProto._changed = isNotEqual;
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
  if (node._state === STATE_CHECK) {
    for (let i = 0; i < node._sources.length; i++) {
      updateCheck(node._sources[i]);
      if (node._state === STATE_DIRTY) {
        break;
      }
    }
  }
  if (node._state === STATE_DIRTY)
    update(node);
  else
    node._state = STATE_CLEAN;
}
function cleanup(node) {
  if (node._children)
    dispose.call(node, false);
  if (node._disposal)
    emptyDisposal(node);
  node._handlers = node[SCOPE] ? node[SCOPE]._handlers : null;
}
function update(node) {
  let prevObservers = currentObservers, prevObserversIndex = currentObserversIndex;
  currentObservers = null;
  currentObserversIndex = 0;
  try {
    cleanup(node);
    const result = compute(node, node._compute, node);
    updateObservers(node);
    if (!node._effect && node._init) {
      write.call(node, result);
    } else {
      node._value = result;
      node._init = true;
    }
  } catch (error) {
    if (!node._init && typeof node._value === "undefined") {
      console.error(
        `computed \`${node.id}\` threw error during first run, this can be fatal.

Solutions:

1. Set the \`initial\` option to silence this error`,
        "\n2. Or, use an `effect` if the return value is not being used",
        "\n\n",
        error
      );
    }
    updateObservers(node);
    handleError(node, error);
  } finally {
    currentObservers = prevObservers;
    currentObserversIndex = prevObserversIndex;
    node._state = STATE_CLEAN;
  }
}
function updateObservers(node) {
  if (currentObservers) {
    if (node._sources)
      removeSourceObservers(node, currentObserversIndex);
    if (node._sources && currentObserversIndex > 0) {
      node._sources.length = currentObserversIndex + currentObservers.length;
      for (let i = 0; i < currentObservers.length; i++) {
        node._sources[currentObserversIndex + i] = currentObservers[i];
      }
    } else {
      node._sources = currentObservers;
    }
    let source;
    for (let i = currentObserversIndex; i < node._sources.length; i++) {
      source = node._sources[i];
      if (!source._observers)
        source._observers = [node];
      else
        source._observers.push(node);
    }
  } else if (node._sources && currentObserversIndex < node._sources.length) {
    removeSourceObservers(node, currentObserversIndex);
    node._sources.length = currentObserversIndex;
  }
}
function notify(node, state) {
  if (node._state >= state)
    return;
  if (node._effect && node._state === STATE_CLEAN) {
    effects.push(node);
    if (!scheduledEffects)
      flushEffects();
  }
  node._state = state;
  if (node._observers) {
    for (let i = 0; i < node._observers.length; i++) {
      notify(node._observers[i], STATE_CHECK);
    }
  }
}
function removeSourceObservers(node, index) {
  let source, swap;
  for (let i = index; i < node._sources.length; i++) {
    source = node._sources[i];
    if (source._observers) {
      swap = source._observers.indexOf(node);
      source._observers[swap] = source._observers[source._observers.length - 1];
      source._observers.pop();
    }
  }
}
function signal(initialValue, options) {
  const node = createComputation(initialValue, null, options), signal2 = read.bind(node);
  signal2.node = node;
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
  signal2.node = node;
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
    { id: options?.id ?? "effect" }
  );
  signal2._effect = true;
  update(signal2);
  {
    return function stopEffect() {
      dispose.call(signal2, true);
    };
  }
}
function isWriteSignal(fn) {
  return isReadSignal(fn) && "set" in fn;
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
var effect = IS_SERVER ? serverEffect : effect$1;
function serverEffect(effect2, options) {
  if (typeof process !== "undefined" && false) {
    return effect$1(effect2, options);
  }
  return noop;
}
var _a$1;
var EVENT = IS_SERVER ? class Event2 {
} : Event;
var DOM_EVENT = Symbol("DOM_EVENT");
var DOMEvent = class extends EVENT {
  constructor(type, ...init) {
    super(type, init[0]);
    this[_a$1] = true;
    this.triggers = new EventTriggers();
    this.detail = init[0]?.detail;
    const trigger = init[0]?.trigger;
    if (trigger)
      this.triggers.add(trigger);
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
_a$1 = DOM_EVENT;
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
  if (IS_SERVER)
    return noop;
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
function unwrapDeep(fn) {
  let value = fn;
  while (typeof value === "function")
    value = value.call(this);
  return value;
}
function createContext2(provide) {
  return { id: Symbol(), provide };
}
function provideContext(context, value, scope = getScope()) {
  if (!scope) {
    throw Error("[maverick] attempting to provide context outside root");
  }
  const hasProvidedValue = !isUndefined(value);
  if (!hasProvidedValue && !context.provide) {
    throw Error("[maverick] context can not be provided without a value or `provide` function");
  }
  setContext(context.id, hasProvidedValue ? value : context.provide?.(), scope);
}
function useContext2(context) {
  const value = getContext(context.id);
  if (isUndefined(value)) {
    throw Error("[maverick] attempting to use context without providing first");
  }
  return value;
}
function hasProvidedContext(context) {
  return !isUndefined(getContext(context.id));
}
var PROPS = /* @__PURE__ */ Symbol("PROPS");
var METHODS = /* @__PURE__ */ Symbol("METHODS");
var ON_DISPATCH = /* @__PURE__ */ Symbol("ON_DISPATCH");
var _a;
var EMPTY_PROPS = {};
var Instance = class {
  constructor(Component3, scope, init) {
    this[_a] = null;
    this.$el = signal(null);
    this._el = null;
    this._scope = null;
    this._attachScope = null;
    this._connectScope = null;
    this._component = null;
    this._destroyed = false;
    this._props = EMPTY_PROPS;
    this._attrs = null;
    this._styles = null;
    this._setupCallbacks = [];
    this._attachCallbacks = [];
    this._connectCallbacks = [];
    this._destroyCallbacks = [];
    this._scope = scope;
    if (init?.scope)
      init.scope.append(scope);
    let stateFactory = Component3.state, props = Component3.props;
    if (stateFactory) {
      this._$state = stateFactory.create();
      this._state = new Proxy(this._$state, {
        get: (_, prop2) => this._$state[prop2]()
      });
      provideContext(stateFactory, this._$state);
    }
    if (props) {
      this._props = createInstanceProps(props);
      if (init?.props) {
        for (const prop2 of Object.keys(init.props)) {
          this._props[prop2]?.set(init.props[prop2]);
        }
      }
    }
    onDispose(this._destroy.bind(this));
  }
  _setup() {
    scoped(() => {
      for (const callback of this._setupCallbacks)
        callback();
    }, this._scope);
  }
  _attach(el) {
    if (this._el)
      return;
    this._el = el;
    this.$el.set(el);
    {
      el.$$COMPONENT_NAME = this._component?.constructor.name;
    }
    scoped(() => {
      this._attachScope = createScope();
      scoped(() => {
        for (const callback of this._attachCallbacks)
          callback(this._el);
        this._attachAttrs();
        this._attachStyles();
      }, this._attachScope);
    }, this._scope);
    el.dispatchEvent(new Event("attached"));
  }
  _detach() {
    this._attachScope?.dispose();
    this._attachScope = null;
    this._connectScope = null;
    if (this._el) {
      this._el.$$COMPONENT_NAME = null;
    }
    this._el = null;
    this.$el.set(null);
  }
  _connect() {
    if (!this._el || !this._attachScope || !this._connectCallbacks.length)
      return;
    scoped(() => {
      this._connectScope = createScope();
      scoped(() => {
        for (const callback of this._connectCallbacks)
          callback(this._el);
      }, this._connectScope);
    }, this._attachScope);
  }
  _disconnect() {
    this._connectScope?.dispose();
    this._connectScope = null;
  }
  _destroy() {
    if (this._destroyed)
      return;
    this._destroyed = true;
    scoped(() => {
      for (const callback of this._destroyCallbacks)
        callback(this._el);
    }, this._scope);
    const el = this._el;
    this._detach();
    this._scope.dispose();
    this._setupCallbacks.length = 0;
    this._attachCallbacks.length = 0;
    this._connectCallbacks.length = 0;
    this._destroyCallbacks.length = 0;
    this._component = null;
    this._attrs = null;
    this._styles = null;
    this._props = EMPTY_PROPS;
    this._scope = null;
    this._state = EMPTY_PROPS;
    this._$state = null;
    if (el)
      delete el.$;
  }
  _addHooks(target) {
    if (target.onSetup)
      this._setupCallbacks.push(target.onSetup.bind(target));
    if (target.onAttach)
      this._attachCallbacks.push(target.onAttach.bind(target));
    if (target.onConnect)
      this._connectCallbacks.push(target.onConnect.bind(target));
    if (target.onDestroy)
      this._destroyCallbacks.push(target.onDestroy.bind(target));
  }
  _attachAttrs() {
    if (!this._attrs)
      return;
    for (const name of Object.keys(this._attrs)) {
      if (IS_SERVER) {
        setAttribute(this._el, name, unwrapDeep.call(this._component, this._attrs[name]));
      } else if (isFunction(this._attrs[name])) {
        effect(this._setAttr.bind(this, name));
      } else {
        setAttribute(this._el, name, this._attrs[name]);
      }
    }
  }
  _attachStyles() {
    if (!this._styles)
      return;
    for (const name of Object.keys(this._styles)) {
      if (IS_SERVER) {
        setStyle(this._el, name, unwrapDeep.call(this._component, this._styles[name]));
      } else if (isFunction(this._styles[name])) {
        effect(this._setStyle.bind(this, name));
      } else {
        setStyle(this._el, name, this._styles[name]);
      }
    }
  }
  _setAttr(name) {
    setAttribute(this._el, name, this._attrs[name].call(this._component));
  }
  _setStyle(name) {
    setStyle(this._el, name, this._styles[name].call(this._component));
  }
};
_a = ON_DISPATCH;
function createInstanceProps(props) {
  const $props = {};
  for (const name of Object.keys(props)) {
    const def = props[name];
    $props[name] = signal(def, def);
  }
  return $props;
}
var currentInstance = { $$: null };
function createComponent(Component3, init) {
  return root(() => {
    currentInstance.$$ = new Instance(Component3, getScope(), init);
    const component = new Component3();
    currentInstance.$$._component = component;
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
    return this.$$._el;
  }
  get $el() {
    return this.$$.$el();
  }
  get scope() {
    return this.$$._scope;
  }
  get attachScope() {
    return this.$$._attachScope;
  }
  get connectScope() {
    return this.$$._connectScope;
  }
  /** @internal */
  get $props() {
    return this.$$._props;
  }
  /** @internal */
  get $state() {
    return this.$$._$state;
  }
  get state() {
    return this.$$._state;
  }
  attach({ $$ }) {
    this.$$ = $$;
    $$._addHooks(this);
    return this;
  }
  addEventListener(type, callback, options) {
    if (!this.el) {
      const name = this.constructor.name;
      console.warn(`[maverick] adding event listener to \`${name}\` before element is attached`);
    }
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
    if (!this.$$._attrs)
      this.$$._attrs = {};
    Object.assign(this.$$._attrs, attributes);
  }
  /**
   * This method can be used to specify styles that should set be set on the host element. Any
   * styles that are assigned to a function will be considered a signal and updated accordingly.
   */
  setStyles(styles) {
    if (!this.$$._styles)
      this.$$._styles = {};
    Object.assign(this.$$._styles, styles);
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
    if (IS_SERVER || !this.el)
      return false;
    const event = type instanceof Event ? type : new DOMEvent(type, init[0]);
    Object.defineProperty(event, "target", {
      get: () => this.$$._component
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
    if (IS_SERVER || !this.el)
      return noop;
    return listenEvent(this.el, type, handler, options);
  }
};
var Component2 = class extends ViewController {
  subscribe(callback) {
    if (!this.state) {
      const name = this.constructor.name;
      throw Error(
        `[maverick] component \`${name}\` can not be subscribed to because it has no internal state`
      );
    }
    return scoped(() => effect(() => callback(this.state)), this.$$._scope);
  }
  destroy() {
    this.$$._destroy();
  }
};
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
var State = class {
  constructor(record) {
    this.id = Symbol("STATE");
    this.record = record;
    this._descriptors = Object.getOwnPropertyDescriptors(record);
  }
  create() {
    const store = {}, state = new Proxy(store, { get: (_, prop2) => store[prop2]() });
    for (const name of Object.keys(this.record)) {
      const getter = this._descriptors[name].get;
      store[name] = getter ? computed(getter.bind(state)) : signal(this.record[name]);
    }
    return store;
  }
  reset(record, filter) {
    for (const name of Object.keys(record)) {
      if (!this._descriptors[name].get && (!filter || filter(name))) {
        record[name].set(this.record[name]);
      }
    }
  }
};
function useState2(state) {
  return useContext2(state);
}
function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
function kebabToPascalCase(str) {
  return kebabToTitleCase(str).replace(/\s/g, "");
}
function kebabToTitleCase(str) {
  return uppercaseFirstChar(str.replace(/-./g, (x) => " " + x[1].toUpperCase()));
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var ReactScopeContext = React.createContext({ current: null });
ReactScopeContext.displayName = "Scope";
function WithScope(scope, ...children) {
  return React.createElement(ReactScopeContext.Provider, { value: scope }, ...children);
}
function useReactScope() {
  return React.useContext(ReactScopeContext).current;
}
function useReactContext(context) {
  const scope = useReactScope();
  return React.useMemo(() => getContext(context.id, scope), [scope]);
}
var _ScopeProvider = class _ScopeProvider extends React.Component {
  constructor(props, context) {
    super(props);
    this._scope = {
      current: createScope()
    };
    if (context)
      context.append(this._scope.current);
    const Ctor = this.constructor;
    if (Ctor._context)
      provideContext(Ctor._context, Ctor._provide?.(), this._scope.current);
  }
  render() {
    return WithScope(this._scope, this.props?.children);
  }
};
_ScopeProvider.contextType = ReactScopeContext;
var ScopeProvider = _ScopeProvider;
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function createClientComponent(Component22, options) {
  const forwardComponent = React.forwardRef((props, forwardRef2) => {
    let parentScopeRef = React.useContext(ReactScopeContext), scopeRef = React.useRef(null), stateRef = React.useRef();
    if (!stateRef.current) {
      const state2 = createInternalState(), component = initComponent(Component22, state2, props, parentScopeRef.current);
      state2._component = component;
      stateRef.current = state2;
      scopeRef.current = component.scope;
    }
    function onAttach() {
      let state2 = stateRef.current, scope = parentScopeRef.current;
      window.cancelAnimationFrame(state2._destroyId);
      state2._destroyId = -1;
      if (state2._component.$$._destroyed) {
        const component = initComponent(Component22, state2, props, scope);
        state2._component = component;
        state2._attached = false;
        state2._forwardedRef = false;
        scopeRef.current = component.scope;
      }
      if (state2._el) {
        attachToHost(state2, state2._el);
      }
      if (!state2._forwardedRef) {
        setRef(forwardRef2, state2._component);
        state2._forwardedRef = true;
      }
      return () => detachFromHost(state2);
    }
    function onRefChange(el) {
      const state2 = stateRef.current;
      if (!state2._forwardedRef) {
        state2._el = el;
        return;
      }
      window.cancelAnimationFrame(state2._refChangeId);
      state2._refChangeId = window.requestAnimationFrame(() => {
        const state3 = stateRef.current;
        state3._refChangeId = -1;
        if (state3._el === el)
          return;
        detachFromHost(state3);
        if (el)
          attachToHost(state3, el);
        state3._el = el;
      });
    }
    React.useEffect(() => {
      const state2 = stateRef.current;
      window.cancelAnimationFrame(state2._destroyId);
      state2._destroyId = -1;
      return function onDestroy() {
        if (!isFunction(props.children))
          return;
        window.cancelAnimationFrame(state2._refChangeId);
        state2._refChangeId = -1;
        window.cancelAnimationFrame(state2._connectId);
        state2._connectId = -1;
        window.cancelAnimationFrame(state2._destroyId);
        state2._destroyId = window.requestAnimationFrame(() => {
          state2._destroyId = -1;
          detachFromHost(state2);
          state2._component.$$._destroy();
          state2._component.$$[ON_DISPATCH] = null;
          state2._callbacks = {};
          state2._domCallbacks = {};
          scopeRef.current = null;
        });
      };
    }, []);
    React.useEffect(tick);
    let state = stateRef.current, { children, ...__props } = props, attrs = {}, prevPropNames = state._prevProps, newPropNames = Object.keys(__props);
    state._callbacks = {};
    for (const name of [...prevPropNames, ...newPropNames]) {
      if (options.props.has(name)) {
        state._component.$props[name].set(
          // If the prop was removed we'll use the default value provided on Component creation.
          isUndefined(__props[name]) ? Component22.props?.[name] : __props[name]
        );
      } else if (options.events?.has(name) || options.eventsRE?.test(name)) {
        state._callbacks[name] = __props[name];
      } else if (options.domEvents?.has(name) || options.domEventsRE?.test(name)) {
        let type = camelToKebabCase(name.slice(2));
        state._domCallbacks[type] = __props[name];
        if (!newPropNames.includes(name)) {
          state._el?.removeEventListener(type, state._onDOMEvent);
          state._listening?.delete(type);
        } else if (state._el && !state._listening?.has(type)) {
          if (!state._listening)
            state._listening = /* @__PURE__ */ new Set();
          state._listening.add(type);
          state._el.addEventListener(type, state._onDOMEvent);
        }
      } else {
        attrs[name] = __props[name];
      }
    }
    state._prevProps = newPropNames;
    return WithScope(
      scopeRef,
      React.createElement(AttachEffect, {
        effect: onAttach
      }),
      isFunction(children) ? children?.(
        {
          ...attrs,
          suppressHydrationWarning: true,
          ref: onRefChange
        },
        state._component
      ) : children
    );
  });
  forwardComponent.displayName = Component22.name + "Bridge";
  return forwardComponent;
}
function AttachEffect({ effect: effect2 }) {
  React.useEffect(effect2, []);
  return null;
}
var eventTypeToCallbackName = /* @__PURE__ */ new Map();
function createInternalState() {
  const state = {
    _el: null,
    _prevProps: [],
    _callbacks: {},
    _domCallbacks: {},
    _refChangeId: -1,
    _connectId: -1,
    _destroyId: -1,
    _attached: false,
    _forwardedRef: false,
    _listening: null,
    _onDOMEvent(event) {
      const args = !isUndefined(event.detail) ? [event.detail, event] : [event];
      state._domCallbacks[event.type]?.(...args);
    }
  };
  return state;
}
function attachToHost(state, el) {
  if (state._el === el && state._attached)
    return;
  else if (state._attached)
    detachFromHost(state);
  if (state._domCallbacks) {
    if (!state._listening)
      state._listening = /* @__PURE__ */ new Set();
    for (const type of Object.keys(state._domCallbacks)) {
      if (state._listening.has(type))
        continue;
      el.addEventListener(type, state._onDOMEvent);
      state._listening.add(type);
    }
  }
  state._component.$$._attach(el);
  state._connectId = window.requestAnimationFrame(() => {
    state._component.$$._connect();
    state._connectId = -1;
  });
  state._attached = true;
}
function detachFromHost(state) {
  if (!state._attached)
    return;
  window.cancelAnimationFrame(state._connectId);
  state._connectId = -1;
  state._component.$$._detach();
  state._attached = false;
  if (state._el && state._listening) {
    for (const type of state._listening) {
      state._el.removeEventListener(type, state._onDOMEvent);
    }
    state._listening.clear();
  }
}
function onDispatch(event) {
  let callbackProp = eventTypeToCallbackName.get(event.type), args = !isUndefined(event.detail) ? [event.detail, event] : [event];
  if (!callbackProp) {
    eventTypeToCallbackName.set(event.type, callbackProp = `on${kebabToPascalCase(event.type)}`);
  }
  this._callbacks[callbackProp]?.(...args);
}
function initComponent(Component22, state, props, scope) {
  const component = createComponent(Component22, { props, scope });
  component.$$[ON_DISPATCH] = onDispatch.bind(state);
  component.$$._setup();
  return component;
}
function escape(value, isAttr = false) {
  const type = typeof value;
  if (type !== "string") {
    if (!isAttr && type === "function")
      return escape(value());
    if (isAttr && type === "boolean")
      return value + "";
    return value;
  }
  const delimeter = isAttr ? '"' : "<", escapeDelimeter = isAttr ? "&quot;" : "&lt;";
  let iDelimeter = value.indexOf(delimeter), isAmpersand = value.indexOf("&");
  if (iDelimeter < 0 && isAmpersand < 0)
    return value;
  let left = 0, out = "";
  while (iDelimeter >= 0 && isAmpersand >= 0) {
    if (iDelimeter < isAmpersand) {
      if (left < iDelimeter)
        out += value.substring(left, iDelimeter);
      out += escapeDelimeter;
      left = iDelimeter + 1;
      iDelimeter = value.indexOf(delimeter, left);
    } else {
      if (left < isAmpersand)
        out += value.substring(left, isAmpersand);
      out += "&amp;";
      left = isAmpersand + 1;
      isAmpersand = value.indexOf("&", left);
    }
  }
  if (iDelimeter >= 0) {
    do {
      if (left < iDelimeter)
        out += value.substring(left, iDelimeter);
      out += escapeDelimeter;
      left = iDelimeter + 1;
      iDelimeter = value.indexOf(delimeter, left);
    } while (iDelimeter >= 0);
  } else
    while (isAmpersand >= 0) {
      if (left < isAmpersand)
        out += value.substring(left, isAmpersand);
      out += "&amp;";
      left = isAmpersand + 1;
      isAmpersand = value.indexOf("&", left);
    }
  return left < value.length ? out + value.substring(left) : out;
}
var SETUP = /* @__PURE__ */ Symbol("SETUP");
var classSplitRE = /\s+/;
function parseClassAttr(tokens, attrValue) {
  const classes = attrValue.trim().split(classSplitRE);
  for (const token of classes)
    tokens.add(token);
}
var styleSplitRE = /\s*:\s*/;
var stylesDelimeterRE = /\s*;\s*/;
function parseStyleAttr(tokens, attrValue) {
  const styles = attrValue.trim().split(stylesDelimeterRE);
  for (let i = 0; i < styles.length; i++) {
    if (styles[i] === "")
      continue;
    const [name, value] = styles[i].split(styleSplitRE);
    tokens.set(name, value);
  }
}
var MaverickServerElement = class {
  constructor(component) {
    this.keepAlive = false;
    this.forwardKeepAlive = true;
    this.attributes = new ServerAttributes();
    this.style = new ServerStyle();
    this.classList = new ServerClassList();
    this.$ = component;
  }
  get $props() {
    return this.$.$$._props;
  }
  get $state() {
    return this.$.$$._$state;
  }
  get state() {
    return this.$.state;
  }
  setup() {
    const instance = this.$.$$;
    scoped(() => {
      if (this.hasAttribute("class")) {
        parseClassAttr(this.classList.tokens, this.getAttribute("class"));
      }
      if (this.hasAttribute("style")) {
        parseStyleAttr(this.style.tokens, this.getAttribute("style"));
      }
      instance._setup();
      instance._attach(this);
      if (this.classList.length > 0) {
        this.setAttribute("class", this.classList.toString());
      }
      if (this.style.length > 0) {
        this.setAttribute("style", this.style.toString());
      }
      if (this.keepAlive) {
        this.setAttribute("keep-alive", "");
      }
    }, instance._scope);
  }
  getAttribute(name) {
    return this.attributes.getAttribute(name);
  }
  setAttribute(name, value) {
    this.attributes.setAttribute(name, value);
  }
  hasAttribute(name) {
    return this.attributes.hasAttribute(name);
  }
  removeAttribute(name) {
    return this.attributes.removeAttribute(name);
  }
  [SETUP]() {
  }
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent() {
    return false;
  }
  subscribe() {
    return noop;
  }
  destroy() {
    this.$.destroy();
  }
};
var ServerAttributes = class {
  constructor() {
    this._tokens = /* @__PURE__ */ new Map();
  }
  get length() {
    return this._tokens.size;
  }
  get tokens() {
    return this._tokens;
  }
  getAttribute(name) {
    return this._tokens.get(name) ?? null;
  }
  hasAttribute(name) {
    return this._tokens.has(name);
  }
  setAttribute(name, value) {
    this._tokens.set(name, value + "");
  }
  removeAttribute(name) {
    this._tokens.delete(name);
  }
  toString() {
    if (this._tokens.size === 0)
      return "";
    let result = "";
    for (const [name, value] of this._tokens) {
      result += ` ${name}="${escape(value, true)}"`;
    }
    return result;
  }
};
var ServerStyle = class {
  constructor() {
    this._tokens = /* @__PURE__ */ new Map();
  }
  get length() {
    return this._tokens.size;
  }
  get tokens() {
    return this._tokens;
  }
  getPropertyValue(prop2) {
    return this._tokens.get(prop2) ?? "";
  }
  setProperty(prop2, value) {
    this._tokens.set(prop2, value ?? "");
  }
  removeProperty(prop2) {
    const value = this._tokens.get(prop2);
    this._tokens.delete(prop2);
    return value ?? "";
  }
  toString() {
    if (this._tokens.size === 0)
      return "";
    let result = "";
    for (const [name, value] of this._tokens) {
      result += `${name}: ${value};`;
    }
    return result;
  }
};
var ServerClassList = class {
  constructor() {
    this._tokens = /* @__PURE__ */ new Set();
  }
  get length() {
    return this._tokens.size;
  }
  get tokens() {
    return this._tokens;
  }
  add(...tokens) {
    for (const token of tokens) {
      this._tokens.add(token);
    }
  }
  contains(token) {
    return this._tokens.has(token);
  }
  remove(token) {
    this._tokens.delete(token);
  }
  replace(token, newToken) {
    if (!this._tokens.has(token))
      return false;
    this._tokens.delete(token);
    this._tokens.add(newToken);
    return true;
  }
  toggle(token, force) {
    if (force !== true && (this._tokens.has(token) || force === false)) {
      this._tokens.delete(token);
      return false;
    } else {
      this._tokens.add(token);
      return true;
    }
  }
  toString() {
    return Array.from(this._tokens).join(" ");
  }
};
var attrsToProps = {
  acceptcharset: "acceptCharset",
  "accept-charset": "acceptCharset",
  accesskey: "accessKey",
  allowfullscreen: "allowFullScreen",
  autocapitalize: "autoCapitalize",
  autocomplete: "autoComplete",
  autocorrect: "autoCorrect",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  autosave: "autoSave",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  charset: "charSet",
  class: "className",
  classid: "classID",
  classname: "className",
  colspan: "colSpan",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  controlslist: "controlsList",
  crossorigin: "crossOrigin",
  dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
  datetime: "dateTime",
  defaultchecked: "defaultChecked",
  defaultvalue: "defaultValue",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback",
  enctype: "encType",
  enterkeyhint: "enterKeyHint",
  fetchpriority: "fetchPriority",
  for: "htmlFor",
  formmethod: "formMethod",
  formaction: "formAction",
  formenctype: "formEncType",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  hreflang: "hrefLang",
  htmlfor: "htmlFor",
  httpequiv: "httpEquiv",
  "http-equiv": "httpEquiv",
  imagesizes: "imageSizes",
  imagesrcset: "imageSrcSet",
  innerhtml: "innerHTML",
  inputmode: "inputMode",
  itemid: "itemID",
  itemprop: "itemProp",
  itemref: "itemRef",
  itemscope: "itemScope",
  itemtype: "itemType",
  keyparams: "keyParams",
  keytype: "keyType",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  maxlength: "maxLength",
  mediagroup: "mediaGroup",
  minlength: "minLength",
  nomodule: "noModule",
  novalidate: "noValidate",
  playsinline: "playsInline",
  radiogroup: "radioGroup",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  tabindex: "tabIndex",
  usemap: "useMap"
};
function createServerComponent(Component3, options) {
  function ServerComponent(props) {
    let scope = React.useContext(ReactScopeContext), component = createComponent(Component3, {
      props,
      scope: scope.current
    }), host = new MaverickServerElement(component), attrs = {}, { style = {}, children, forwardRef: forwardRef2, ...__props } = props;
    if (options.props.size) {
      for (const prop2 of Object.keys(__props)) {
        if (!options.props.has(prop2))
          attrs[prop2] = __props[prop2];
      }
    } else {
      attrs = __props;
    }
    host.setup();
    if (host.hasAttribute("style")) {
      for (const [name, value] of host.style.tokens) {
        style[name.startsWith("--") ? name : kebabToCamelCase(name)] = value;
      }
      host.removeAttribute("style");
    }
    for (const [attrName, attrValue] of host.attributes.tokens) {
      const propName = attrsToProps[attrName];
      if (propName) {
        if (!(propName in attrs)) {
          attrs[propName] = attrValue;
        }
        host.removeAttribute(attrName);
      }
    }
    return WithScope(
      { current: component.$$._scope },
      isFunction(children) ? children?.(
        {
          ...Object.fromEntries(host.attributes.tokens),
          ...attrs,
          style
        },
        component
      ) : children,
      React.createElement(() => {
        host.destroy();
        return null;
      })
    );
  }
  ServerComponent.displayName = Component3.name + "Bridge";
  return ServerComponent;
}
function useStateContext(state) {
  return useReactContext(state);
}
function useSignal(signal2, key) {
  const [, scheduleReactUpdate] = React.useState();
  React.useEffect(() => {
    return effect$1(() => {
      signal2();
      scheduleReactUpdate({});
    });
  }, [key ?? signal2]);
  return signal2();
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
  if (IS_SERVER)
    return noop;
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
var requestIdleCallback = IS_SERVER ? noop : typeof window !== "undefined" ? "requestIdleCallback" in window ? window.requestIdleCallback : (cb) => window.setTimeout(cb, 1) : noop;
function waitIdlePeriod(callback, options) {
  if (IS_SERVER)
    return Promise.resolve();
  return new Promise((resolve) => {
    requestIdleCallback((deadline) => {
      callback?.(deadline);
      resolve();
    }, options);
  });
}
function useSignalRecord($state) {
  const [, scheduleReactUpdate] = React.useState(), tracking = React.useRef(null);
  if (tracking.current == null) {
    tracking.current = {
      state: {},
      $update: signal({}),
      props: /* @__PURE__ */ new Set()
    };
  }
  React.useEffect(() => {
    let { state, $update, props } = tracking.current;
    return effect(() => {
      for (const prop2 of props) {
        const value = $state[prop2]();
        state[prop2] = isArray(value) ? [...value] : value;
      }
      $update();
      scheduleReactUpdate({});
    });
  }, [$state]);
  return React.useMemo(() => {
    let { state, $update, props } = tracking.current, scheduledUpdate = false;
    props.clear();
    return new Proxy(state, {
      get(_, prop2) {
        if (!props.has(prop2) && prop2 in $state) {
          props.add(prop2);
          const value = $state[prop2]();
          state[prop2] = isArray(value) ? [...value] : value;
          if (!scheduledUpdate) {
            $update.set({});
            scheduledUpdate = true;
            queueMicrotask(() => scheduledUpdate = false);
          }
        }
        return state[prop2];
      },
      set(_, prop2, newValue) {
        if (!(prop2 in $state))
          state[prop2] = newValue;
        return true;
      }
    });
  }, [$state]);
}
function createReactComponent(Component3, options) {
  if (IS_SERVER) {
    return createServerComponent(Component3, {
      props: new Set(Object.keys(Component3.props || {}))
    });
  } else {
    return createClientComponent(Component3, {
      props: new Set(Object.keys(Component3.props || {})),
      events: new Set(options?.events),
      eventsRE: options?.eventsRegex,
      domEvents: options?.domEvents,
      domEventsRE: options?.domEventsRegex
    });
  }
}

// virtual-env::virtual/env
var IS_SERVER2 = typeof document === "undefined";

export {
  peek,
  untrack,
  tick,
  getScope,
  scoped,
  onDispose,
  createScope,
  signal,
  computed,
  isWriteSignal,
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
  effect,
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
  createContext2 as createContext,
  provideContext,
  useContext2 as useContext,
  hasProvidedContext,
  ViewController,
  Component2 as Component,
  prop,
  method,
  State,
  useState2 as useState,
  camelToKebabCase,
  kebabToCamelCase,
  uppercaseFirstChar,
  useReactScope,
  useReactContext,
  composeRefs,
  useStateContext,
  useSignal,
  ariaBool,
  createDisposalBin,
  useDisposalBin,
  keysOf,
  deferredPromise,
  waitTimeout,
  animationFrameThrottle,
  waitIdlePeriod,
  useSignalRecord,
  createReactComponent,
  IS_SERVER2 as IS_SERVER
};
