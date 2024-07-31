var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-2d4dOpH4.js
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
  for (let i3 = 0; i3 < effects.length; i3++) {
    if (effects[i3].$st !== STATE_CLEAN)
      runTop(effects[i3]);
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
  for (let i3 = ancestors.length - 1; i3 >= 0; i3--) {
    updateCheck(ancestors[i3]);
  }
}
function root(init2) {
  const scope = createScope();
  return compute(scope, !init2.length ? init2 : init2.bind(null, dispose.bind(scope)), null);
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
function getContext(key2, scope = currentScope) {
  return scope?.$cx[key2];
}
function setContext(key2, value, scope = currentScope) {
  if (scope)
    scope.$cx = { ...scope.$cx, [key2]: value };
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
      for (let i3 = this.$h.length - 1; i3 >= 0; i3--) {
        dispose.call(this.$h[i3]);
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
      for (let i3 = scope.$d.length - 1; i3 >= 0; i3--) {
        const callable = scope.$d[i3];
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
  let i3 = 0, len = scope.$eh.length, currentError = error;
  for (i3 = 0; i3 < len; i3++) {
    try {
      scope.$eh[i3](currentError);
      break;
    } catch (error2) {
      currentError = error2;
    }
  }
  if (i3 === len)
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
      for (let i3 = 0; i3 < this.$o.length; i3++) {
        notify(this.$o[i3], STATE_DIRTY);
      }
    }
  }
  return this.$v;
}
function createScope() {
  return new ScopeNode();
}
function createComputation(initialValue, compute2, options) {
  return new ComputeNode(initialValue, compute2, options);
}
function isNotEqual(a2, b2) {
  return a2 !== b2;
}
function isFunction$1(value) {
  return typeof value === "function";
}
function updateCheck(node) {
  if (node.$st === STATE_CHECK) {
    for (let i3 = 0; i3 < node.$s.length; i3++) {
      updateCheck(node.$s[i3]);
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
      for (let i3 = 0; i3 < currentObservers.length; i3++) {
        node.$s[currentObserversIndex + i3] = currentObservers[i3];
      }
    } else {
      node.$s = currentObservers;
    }
    let source;
    for (let i3 = currentObserversIndex; i3 < node.$s.length; i3++) {
      source = node.$s[i3];
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
    for (let i3 = 0; i3 < node.$o.length; i3++) {
      notify(node.$o[i3], STATE_CHECK);
    }
  }
}
function removeSourceObservers(node, index) {
  let source, swap;
  for (let i3 = index; i3 < node.$s.length; i3++) {
    source = node.$s[i3];
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
function isDOMEvent(event2) {
  return !!event2?.[DOM_EVENT];
}
function listenEvent(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return onDispose(() => target.removeEventListener(type, handler, options));
}
function isTouchEvent(event2) {
  return !!event2?.type.startsWith("touch");
}
function isKeyboardEvent(event2) {
  return !!event2?.type.startsWith("key");
}
function wasEnterKeyPressed(event2) {
  return isKeyboardEvent(event2) && event2.key === "Enter";
}
function isKeyboardClick(event2) {
  return isKeyboardEvent(event2) && (event2.key === "Enter" || event2.key === " ");
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
var SCOPE, scheduledEffects, runningEffects, currentScope, currentObserver, currentObservers, currentObserversIndex, effects, defaultContext, NOOP, STATE_CLEAN, STATE_CHECK, STATE_DIRTY, STATE_DISPOSED, ScopeNode, ScopeProto, ComputeNode, ComputeProto, _a, EVENT, DOM_EVENT, DOMEvent, EventTriggers, EventsTarget;
var init_maverick_2d4dOpH4 = __esm({
  "../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-2d4dOpH4.js"() {
    SCOPE = Symbol(0);
    scheduledEffects = false;
    runningEffects = false;
    currentScope = null;
    currentObserver = null;
    currentObservers = null;
    currentObserversIndex = 0;
    effects = [];
    defaultContext = {};
    NOOP = () => {
    };
    STATE_CLEAN = 0;
    STATE_CHECK = 1;
    STATE_DIRTY = 2;
    STATE_DISPOSED = 3;
    ScopeNode = function Scope() {
      this[SCOPE] = null;
      this.$h = null;
      if (currentScope)
        currentScope.append(this);
    };
    ScopeProto = ScopeNode.prototype;
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
    ComputeNode = function Computation(initialValue, compute2, options) {
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
    ComputeProto = ComputeNode.prototype;
    Object.setPrototypeOf(ComputeProto, ScopeProto);
    ComputeProto.$ch = isNotEqual;
    ComputeProto.call = read;
    EVENT = Event;
    DOM_EVENT = Symbol("DOM_EVENT");
    DOMEvent = class extends EVENT {
      constructor(type, ...init2) {
        super(type, init2[0]);
        this[_a] = true;
        this.triggers = new EventTriggers();
        this.detail = init2[0]?.detail;
        const trigger = init2[0]?.trigger;
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
    _a = DOM_EVENT;
    EventTriggers = class {
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
      add(event2) {
        this.chain.push(event2);
        if (isDOMEvent(event2)) {
          this.chain.push(...event2.triggers);
        }
      }
      /**
       * Removes the event from the chain and returns it (if found).
       */
      remove(event2) {
        return this.chain.splice(this.chain.indexOf(event2), 1)[0];
      }
      /**
       * Returns whether the chain contains the given `event`.
       */
      has(event2) {
        return this.chain.some((e6) => e6 === event2);
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
        return this.chain.find((e6) => e6.type === type);
      }
      /**
       * Walks an event chain on a given `event`, and invokes the given `callback` for each trigger event.
       */
      walk(callback) {
        for (const event2 of this.chain) {
          const returnValue = callback(event2);
          if (returnValue)
            return [event2, returnValue];
        }
      }
      [Symbol.iterator]() {
        return this.chain.values();
      }
    };
    EventsTarget = class extends EventTarget {
      addEventListener(type, callback, options) {
        return super.addEventListener(type, callback, options);
      }
      removeEventListener(type, callback, options) {
        return super.removeEventListener(type, callback, options);
      }
    };
  }
});

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
function createInstanceProps(props) {
  const $props = {};
  for (const name of Object.keys(props)) {
    const def = props[name];
    $props[name] = signal(def, def);
  }
  return $props;
}
function createComponent(Component2, init2) {
  return root(() => {
    currentInstance.$$ = new Instance(Component2, getScope(), init2);
    const component = new Component2();
    currentInstance.$$.e = component;
    currentInstance.$$ = null;
    return component;
  });
}
var effect, PROPS, METHODS, ON_DISPATCH, _a2, EMPTY_PROPS, Instance, currentInstance, ViewController;
var init_maverick_Ikj49ROL = __esm({
  "../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-Ikj49ROL.js"() {
    init_maverick_2d4dOpH4();
    effect = effect$1;
    PROPS = /* @__PURE__ */ Symbol(0);
    METHODS = /* @__PURE__ */ Symbol(0);
    ON_DISPATCH = /* @__PURE__ */ Symbol(0);
    EMPTY_PROPS = {};
    Instance = class {
      constructor(Component2, scope, init2) {
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
        if (init2?.scope)
          init2.scope.append(scope);
        let stateFactory = Component2.state, props = Component2.props;
        if (stateFactory) {
          this.h = stateFactory.create();
          this.k = new Proxy(this.h, {
            get: (_2, prop8) => this.h[prop8]()
          });
          provideContext(stateFactory, this.h);
        }
        if (props) {
          this.i = createInstanceProps(props);
          if (init2?.props) {
            for (const prop8 of Object.keys(init2.props)) {
              this.i[prop8]?.set(init2.props[prop8]);
            }
          }
        }
        onDispose(this.p.bind(this));
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
    _a2 = ON_DISPATCH;
    currentInstance = { $$: null };
    ViewController = class extends EventTarget {
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
      createEvent(type, ...init2) {
        return new DOMEvent(type, init2[0]);
      }
      /**
       * Creates a `DOMEvent` and dispatches it from the host element. This method is typed to
       * match all component events.
       */
      dispatch(type, ...init2) {
        if (!this.el)
          return false;
        const event2 = type instanceof Event ? type : new DOMEvent(type, init2[0]);
        Object.defineProperty(event2, "target", {
          get: () => this.$$.e
        });
        return untrack(() => {
          this.$$[ON_DISPATCH]?.(event2);
          return this.el.dispatchEvent(event2);
        });
      }
      dispatchEvent(event2) {
        return this.dispatch(event2);
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
  }
});

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-PguL6eRI.js
function runAll(fns, arg) {
  for (const fn of fns)
    fn(arg);
}
var init_maverick_PguL6eRI = __esm({
  "../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-PguL6eRI.js"() {
  }
});

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-L-TO4Elh.js
function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x2) => x2[1].toUpperCase());
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var init_maverick_L_TO4Elh = __esm({
  "../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/chunks/maverick-L-TO4Elh.js"() {
  }
});

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/index.js
function useState(state) {
  return useContext(state);
}
var Component, State;
var init_prod = __esm({
  "../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/index.js"() {
    init_maverick_Ikj49ROL();
    init_maverick_Ikj49ROL();
    init_maverick_2d4dOpH4();
    init_maverick_2d4dOpH4();
    Component = class extends ViewController {
      subscribe(callback) {
        return scoped(() => effect(() => callback(this.state)), this.$$.d);
      }
      destroy() {
        this.$$.p();
      }
    };
    State = class {
      constructor(record) {
        this.id = Symbol(0);
        this.record = record;
        this.A = Object.getOwnPropertyDescriptors(record);
      }
      create() {
        const store = {}, state = new Proxy(store, { get: (_2, prop8) => store[prop8]() });
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
  }
});

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/std.js
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
  let id2 = -1, lastArgs;
  function throttle2(...args) {
    lastArgs = args;
    if (id2 >= 0)
      return;
    id2 = window.requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      id2 = -1;
      lastArgs = void 0;
    });
  }
  return throttle2;
}
function waitIdlePeriod(callback, options) {
  return new Promise((resolve) => {
    requestIdleCallback((deadline) => {
      callback?.(deadline);
      resolve();
    }, options);
  });
}
var requestIdleCallback;
var init_std = __esm({
  "../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/std.js"() {
    init_maverick_2d4dOpH4();
    init_maverick_2d4dOpH4();
    init_maverick_L_TO4Elh();
    requestIdleCallback = typeof window !== "undefined" ? "requestIdleCallback" in window ? window.requestIdleCallback : (cb) => window.setTimeout(cb, 1) : noop;
  }
});

// src/utils/support.ts
function canOrientScreen() {
  return canRotateScreen() && isFunction(screen.orientation.unlock);
}
function canRotateScreen() {
  return !isUndefined(window.screen.orientation) && !isUndefined(window.screen.orientation.lock);
}
function canPlayAudioType(audio, type) {
  if (false) return false;
  if (!audio) audio = document.createElement("audio");
  return audio.canPlayType(type).length > 0;
}
function canPlayVideoType(video, type) {
  if (false) return false;
  if (!video) video = document.createElement("video");
  return video.canPlayType(type).length > 0;
}
function canPlayHLSNatively(video) {
  if (false) return false;
  if (!video) video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl").length > 0;
}
function canUsePictureInPicture(video) {
  if (false) return false;
  return !!document.pictureInPictureEnabled && !video?.disablePictureInPicture;
}
function canUseVideoPresentation(video) {
  if (false) return false;
  return isFunction(video?.webkitSupportsPresentationMode) && isFunction(video?.webkitSetPresentationMode);
}
async function canChangeVolume() {
  const video = document.createElement("video");
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return false ? void 0 : window?.ManagedMediaSource ?? window?.MediaSource ?? window?.WebKitMediaSource;
}
function getSourceBuffer() {
  return false ? void 0 : window?.SourceBuffer ?? window?.WebKitSourceBuffer;
}
function isHLSSupported() {
  if (false) return false;
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource)) return false;
  const isTypeSupported = MediaSource && isFunction(MediaSource.isTypeSupported) && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid = isUndefined(SourceBuffer) || !isUndefined(SourceBuffer.prototype) && isFunction(SourceBuffer.prototype.appendBuffer) && isFunction(SourceBuffer.prototype.remove);
  return !!isTypeSupported && !!isSourceBufferValid;
}
function isDASHSupported() {
  return isHLSSupported();
}
var UA, IS_IOS, IS_IPHONE, IS_CHROME, IS_IOS_CHROME, IS_SAFARI;
var init_support = __esm({
  "src/utils/support.ts"() {
    "use strict";
    init_std();
    UA = false ? "" : navigator?.userAgent.toLowerCase() || "";
    IS_IOS = /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
    IS_IPHONE = /(iphone|ipod)/gi.test(navigator?.platform || "");
    IS_CHROME = !!window.chrome;
    IS_IOS_CHROME = /crios/i.test(UA);
    IS_SAFARI = !!window.safari || IS_IOS;
  }
});

// src/core/time-ranges.ts
function getTimeRangesStart(range) {
  if (!range.length) return null;
  let min2 = range.start(0);
  for (let i3 = 1; i3 < range.length; i3++) {
    const value = range.start(i3);
    if (value < min2) min2 = value;
  }
  return min2;
}
function getTimeRangesEnd(range) {
  if (!range.length) return null;
  let max2 = range.end(0);
  for (let i3 = 1; i3 < range.length; i3++) {
    const value = range.end(i3);
    if (value > max2) max2 = value;
  }
  return max2;
}
function throwIfEmpty(length) {
  if (false) return;
  if (!length) throw new Error(true ? "`TimeRanges` object is empty." : "empty");
}
function throwIfOutOfRange(fnName, index, end) {
  if (false) return;
  if (!isNumber(index) || index < 0 || index > end) {
    throw new Error(
      `Failed to execute '${fnName}' on 'TimeRanges': The index provided (${index}) is non-numeric or out of bounds (0-${end}).`
    );
  }
}
function normalizeTimeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }
  intervals.sort((a2, b2) => a2[0] - b2[0]);
  let normalized = [], current = intervals[0];
  for (let i3 = 1; i3 < intervals.length; i3++) {
    const next = intervals[i3];
    if (current[1] >= next[0] - 1) {
      current = [current[0], Math.max(current[1], next[1])];
    } else {
      normalized.push(current);
      current = next;
    }
  }
  normalized.push(current);
  return normalized;
}
function updateTimeIntervals(intervals, interval, value) {
  let start = interval[0], end = interval[1];
  if (value < start) {
    return [value, -1];
  } else if (value === start) {
    return interval;
  } else if (start === -1) {
    interval[0] = value;
    return interval;
  } else if (value > start) {
    interval[1] = value;
    if (end === -1) intervals.push(interval);
  }
  normalizeTimeIntervals(intervals);
  return interval;
}
var TimeRange;
var init_time_ranges = __esm({
  "src/core/time-ranges.ts"() {
    "use strict";
    init_std();
    TimeRange = class {
      #ranges;
      get length() {
        return this.#ranges.length;
      }
      constructor(start, end) {
        if (isArray(start)) {
          this.#ranges = start;
        } else if (!isUndefined(start) && !isUndefined(end)) {
          this.#ranges = [[start, end]];
        } else {
          this.#ranges = [];
        }
      }
      start(index) {
        if (true) throwIfEmpty(this.#ranges.length);
        if (true) throwIfOutOfRange("start", index, this.#ranges.length - 1);
        return this.#ranges[index][0] ?? Infinity;
      }
      end(index) {
        if (true) throwIfEmpty(this.#ranges.length);
        if (true) throwIfOutOfRange("end", index, this.#ranges.length - 1);
        return this.#ranges[index][1] ?? Infinity;
      }
    };
  }
});

// src/utils/mime.ts
function isAudioSrc({ src, type }) {
  return isString(src) ? AUDIO_EXTENSIONS.test(src) || AUDIO_TYPES.has(type) || src.startsWith("blob:") && type === "audio/object" : type === "audio/object";
}
function isVideoSrc(src) {
  return isString(src.src) ? VIDEO_EXTENSIONS.test(src.src) || VIDEO_TYPES.has(src.type) || src.src.startsWith("blob:") && src.type === "video/object" || isHLSSrc(src) && canPlayHLSNatively() : src.type === "video/object";
}
function isHLSSrc({ src, type }) {
  return isString(src) && HLS_VIDEO_EXTENSIONS.test(src) || HLS_VIDEO_TYPES.has(type);
}
function isDASHSrc({ src, type }) {
  return isString(src) && DASH_VIDEO_EXTENSIONS.test(src) || DASH_VIDEO_TYPES.has(type);
}
function canGoogleCastSrc(src) {
  return isString(src.src) && (isAudioSrc(src) || isVideoSrc(src) || isHLSSrc(src));
}
function isMediaStream(src) {
  return typeof window.MediaStream !== "undefined" && src instanceof window.MediaStream;
}
var AUDIO_EXTENSIONS, AUDIO_TYPES, VIDEO_EXTENSIONS, VIDEO_TYPES, HLS_VIDEO_EXTENSIONS, DASH_VIDEO_EXTENSIONS, HLS_VIDEO_TYPES, DASH_VIDEO_TYPES;
var init_mime = __esm({
  "src/utils/mime.ts"() {
    "use strict";
    init_std();
    init_support();
    AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
    AUDIO_TYPES = /* @__PURE__ */ new Set([
      "audio/mpeg",
      "audio/ogg",
      "audio/3gp",
      "audio/mp3",
      "audio/webm",
      "audio/flac"
    ]);
    VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
    VIDEO_TYPES = /* @__PURE__ */ new Set([
      "video/mp4",
      "video/webm",
      "video/3gp",
      "video/ogg",
      "video/avi",
      "video/mpeg"
    ]);
    HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
    DASH_VIDEO_EXTENSIONS = /\.(mpd)($|\?)/i;
    HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
      // Apple sanctioned
      "application/vnd.apple.mpegurl",
      // Apple sanctioned for backwards compatibility
      "audio/mpegurl",
      // Very common
      "audio/x-mpegurl",
      // Very common
      "application/x-mpegurl",
      // Included for completeness
      "video/x-mpegurl",
      "video/mpegurl",
      "application/mpegurl"
    ]);
    DASH_VIDEO_TYPES = /* @__PURE__ */ new Set(["application/dash+xml"]);
  }
});

// src/utils/network.ts
function appendParamsToURL(baseUrl, params) {
  const searchParams = new URLSearchParams();
  for (const key2 of Object.keys(params)) {
    searchParams.set(key2, params[key2] + "");
  }
  return baseUrl + "?" + searchParams.toString();
}
function preconnect(url, rel = "preconnect") {
  if (false) return false;
  const exists = document.querySelector(`link[href="${url}"]`);
  if (!isNull(exists)) return true;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = url;
  link.crossOrigin = "true";
  document.head.append(link);
  return true;
}
function loadScript(src) {
  if (pendingRequests[src]) return pendingRequests[src].promise;
  const promise = deferredPromise(), exists = document.querySelector(`script[src="${src}"]`);
  if (!isNull(exists)) {
    promise.resolve();
    return promise.promise;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    promise.resolve();
    delete pendingRequests[src];
  };
  script.onerror = () => {
    promise.reject();
    delete pendingRequests[src];
  };
  setTimeout(() => document.head.append(script), 0);
  return promise.promise;
}
function getRequestCredentials(crossOrigin) {
  return crossOrigin === "use-credentials" ? "include" : isString(crossOrigin) ? "same-origin" : void 0;
}
function getDownloadFile({
  title,
  src,
  download
}) {
  const url = isBoolean(download) || download === "" ? src.src : isString(download) ? download : download?.url;
  if (!isValidFileDownload({ url, src, download })) return null;
  return {
    url,
    name: !isBoolean(download) && !isString(download) && download?.filename || title.toLowerCase() || "media"
  };
}
function isValidFileDownload({
  url,
  src,
  download
}) {
  return isString(url) && (download && download !== true || isAudioSrc(src) || isVideoSrc(src));
}
var pendingRequests;
var init_network = __esm({
  "src/utils/network.ts"() {
    "use strict";
    init_std();
    init_mime();
    pendingRequests = {};
  }
});

// src/core/tracks/text/symbols.ts
var CROSS_ORIGIN, READY_STATE, UPDATE_ACTIVE_CUES, CAN_LOAD, ON_MODE_CHANGE, NATIVE, NATIVE_HLS, TextTrackSymbol;
var init_symbols = __esm({
  "src/core/tracks/text/symbols.ts"() {
    "use strict";
    CROSS_ORIGIN = Symbol(true ? "TEXT_TRACK_CROSS_ORIGIN" : 0);
    READY_STATE = Symbol(true ? "TEXT_TRACK_READY_STATE" : 0);
    UPDATE_ACTIVE_CUES = Symbol(true ? "TEXT_TRACK_UPDATE_ACTIVE_CUES" : 0);
    CAN_LOAD = Symbol(true ? "TEXT_TRACK_CAN_LOAD" : 0);
    ON_MODE_CHANGE = Symbol(true ? "TEXT_TRACK_ON_MODE_CHANGE" : 0);
    NATIVE = Symbol(true ? "TEXT_TRACK_NATIVE" : 0);
    NATIVE_HLS = Symbol(true ? "TEXT_TRACK_NATIVE_HLS" : 0);
    TextTrackSymbol = {
      crossOrigin: CROSS_ORIGIN,
      readyState: READY_STATE,
      updateActiveCues: UPDATE_ACTIVE_CUES,
      canLoad: CAN_LOAD,
      onModeChange: ON_MODE_CHANGE,
      native: NATIVE,
      nativeHLS: NATIVE_HLS
    };
  }
});

// src/core/tracks/text/utils.ts
function findActiveCue(cues, time) {
  for (let i3 = 0, len = cues.length; i3 < len; i3++) {
    if (isCueActive(cues[i3], time)) return cues[i3];
  }
  return null;
}
function isCueActive(cue, time) {
  return time >= cue.startTime && time < cue.endTime;
}
function watchActiveTextTrack(tracks, kind, onChange) {
  let currentTrack = null, scope = getScope();
  function onModeChange() {
    const kinds = isString(kind) ? [kind] : kind, track = tracks.toArray().find((track2) => kinds.includes(track2.kind) && track2.mode === "showing");
    if (track === currentTrack) return;
    if (!track) {
      onChange(null);
      currentTrack = null;
      return;
    }
    if (track.readyState == 2) {
      onChange(track);
    } else {
      onChange(null);
      scoped(() => {
        const off = listenEvent(
          track,
          "load",
          () => {
            onChange(track);
            off();
          },
          { once: true }
        );
      }, scope);
    }
    currentTrack = track;
  }
  onModeChange();
  return listenEvent(tracks, "mode-change", onModeChange);
}
function watchCueTextChange(tracks, kind, callback) {
  watchActiveTextTrack(tracks, kind, (track) => {
    if (!track) {
      callback("");
      return;
    }
    const onCueChange = () => {
      const activeCue = track?.activeCues[0];
      callback(activeCue?.text || "");
    };
    onCueChange();
    listenEvent(track, "cue-change", onCueChange);
  });
}
var init_utils = __esm({
  "src/core/tracks/text/utils.ts"() {
    "use strict";
    init_prod();
    init_std();
  }
});

// src/core/tracks/text/text-track.ts
function isTrackCaptionKind(track) {
  return captionRE.test(track.kind);
}
function parseJSONCaptionsFile(json, Cue, Region) {
  const content = isString(json) ? JSON.parse(json) : json;
  let regions = [], cues = [];
  if (content.regions && Region) {
    regions = content.regions.map((region) => Object.assign(new Region(), region));
  }
  if (content.cues || isArray(content)) {
    cues = (isArray(content) ? content : content.cues).filter((content2) => isNumber(content2.startTime) && isNumber(content2.endTime)).map((cue) => Object.assign(new Cue(0, 0, ""), cue));
  }
  return { regions, cues };
}
var TextTrack, captionRE;
var init_text_track = __esm({
  "src/core/tracks/text/text-track.ts"() {
    "use strict";
    init_std();
    init_network();
    init_symbols();
    init_utils();
    TextTrack = class extends EventsTarget {
      static createId(track) {
        return `vds-${track.type}-${track.kind}-${track.src ?? track.label ?? "?"}`;
      }
      src;
      content;
      type;
      encoding;
      id = "";
      label = "";
      language = "";
      kind;
      default = false;
      #canLoad = false;
      #currentTime = 0;
      #mode = "disabled";
      #metadata = {};
      #regions = [];
      #cues = [];
      #activeCues = [];
      /** @internal */
      [TextTrackSymbol.readyState] = 0;
      /** @internal */
      [TextTrackSymbol.crossOrigin];
      /** @internal */
      [TextTrackSymbol.onModeChange] = null;
      /** @internal */
      [TextTrackSymbol.native] = null;
      get metadata() {
        return this.#metadata;
      }
      get regions() {
        return this.#regions;
      }
      get cues() {
        return this.#cues;
      }
      get activeCues() {
        return this.#activeCues;
      }
      /**
       * - 0: Not Loading
       * - 1: Loading
       * - 2: Ready
       * - 3: Error
       */
      get readyState() {
        return this[TextTrackSymbol.readyState];
      }
      get mode() {
        return this.#mode;
      }
      set mode(mode) {
        this.setMode(mode);
      }
      constructor(init2) {
        super();
        for (const prop8 of Object.keys(init2)) this[prop8] = init2[prop8];
        if (!this.type) this.type = "vtt";
        if (init2.content) {
          this.#parseContent(init2);
        } else if (!init2.src) {
          this[TextTrackSymbol.readyState] = 2;
        }
        if (isTrackCaptionKind(this) && !this.label) {
          console.warn(`[vidstack] captions text track created without label: \`${this.src}\``);
        }
      }
      addCue(cue, trigger) {
        let i3 = 0, length = this.#cues.length;
        for (i3 = 0; i3 < length; i3++) if (cue.endTime <= this.#cues[i3].startTime) break;
        if (i3 === length) this.#cues.push(cue);
        else this.#cues.splice(i3, 0, cue);
        if (!(cue instanceof TextTrackCue)) {
          this[TextTrackSymbol.native]?.track.addCue(cue);
        }
        this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
        if (isCueActive(cue, this.#currentTime)) {
          this[TextTrackSymbol.updateActiveCues](this.#currentTime, trigger);
        }
      }
      removeCue(cue, trigger) {
        const index = this.#cues.indexOf(cue);
        if (index >= 0) {
          const isActive = this.#activeCues.includes(cue);
          this.#cues.splice(index, 1);
          this[TextTrackSymbol.native]?.track.removeCue(cue);
          this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
          if (isActive) {
            this[TextTrackSymbol.updateActiveCues](this.#currentTime, trigger);
          }
        }
      }
      setMode(mode, trigger) {
        if (this.#mode === mode) return;
        this.#mode = mode;
        if (mode === "disabled") {
          this.#activeCues = [];
          this.#activeCuesChanged();
        } else if (this.readyState === 2) {
          this[TextTrackSymbol.updateActiveCues](this.#currentTime, trigger);
        } else {
          this.#load();
        }
        this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
        this[TextTrackSymbol.onModeChange]?.();
      }
      /** @internal */
      [TextTrackSymbol.updateActiveCues](currentTime, trigger) {
        this.#currentTime = currentTime;
        if (this.mode === "disabled" || !this.#cues.length) return;
        const activeCues = [];
        for (let i3 = 0, length = this.#cues.length; i3 < length; i3++) {
          const cue = this.#cues[i3];
          if (isCueActive(cue, currentTime)) activeCues.push(cue);
        }
        let changed = activeCues.length !== this.#activeCues.length;
        if (!changed) {
          for (let i3 = 0; i3 < activeCues.length; i3++) {
            if (!this.#activeCues.includes(activeCues[i3])) {
              changed = true;
              break;
            }
          }
        }
        this.#activeCues = activeCues;
        if (changed) this.#activeCuesChanged(trigger);
      }
      /** @internal */
      [TextTrackSymbol.canLoad]() {
        this.#canLoad = true;
        if (this.#mode !== "disabled") this.#load();
      }
      #parseContent(init2) {
        import("https://cdn.vidstack.io/captions").then(({ parseText, VTTCue, VTTRegion }) => {
          if (!isString(init2.content) || init2.type === "json") {
            this.#parseJSON(init2.content, VTTCue, VTTRegion);
            if (this.readyState !== 3) this.#ready();
          } else {
            parseText(init2.content, { type: init2.type }).then(({ cues, regions }) => {
              this.#cues = cues;
              this.#regions = regions;
              this.#ready();
            });
          }
        });
      }
      async #load() {
        if (!this.#canLoad || this[TextTrackSymbol.readyState] > 0) return;
        this[TextTrackSymbol.readyState] = 1;
        this.dispatchEvent(new DOMEvent("load-start"));
        if (!this.src) {
          this.#ready();
          return;
        }
        try {
          const { parseResponse, VTTCue, VTTRegion } = await import("https://cdn.vidstack.io/captions"), crossOrigin = this[TextTrackSymbol.crossOrigin]?.();
          const response = fetch(this.src, {
            headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
            credentials: getRequestCredentials(crossOrigin)
          });
          if (this.type === "json") {
            this.#parseJSON(await (await response).text(), VTTCue, VTTRegion);
          } else {
            const { errors, metadata, regions, cues } = await parseResponse(response, {
              type: this.type,
              encoding: this.encoding
            });
            if (errors[0]?.code === 0) {
              throw errors[0];
            } else {
              this.#metadata = metadata;
              this.#regions = regions;
              this.#cues = cues;
            }
          }
          this.#ready();
        } catch (error) {
          this.#error(error);
        }
      }
      #ready() {
        this[TextTrackSymbol.readyState] = 2;
        if (!this.src || this.type !== "vtt") {
          const native = this[TextTrackSymbol.native];
          if (native && !native.managed) {
            for (const cue of this.#cues) native.track.addCue(cue);
          }
        }
        const loadEvent = new DOMEvent("load");
        this[TextTrackSymbol.updateActiveCues](this.#currentTime, loadEvent);
        this.dispatchEvent(loadEvent);
      }
      #error(error) {
        this[TextTrackSymbol.readyState] = 3;
        this.dispatchEvent(new DOMEvent("error", { detail: error }));
      }
      #parseJSON(json, VTTCue, VTTRegion) {
        try {
          const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
          this.#regions = regions;
          this.#cues = cues;
        } catch (error) {
          if (true) {
            console.error(`[vidstack] failed to parse JSON captions at: \`${this.src}\`

`, error);
          }
          this.#error(error);
        }
      }
      #activeCuesChanged(trigger) {
        this.dispatchEvent(new DOMEvent("cue-change", { trigger }));
      }
    };
    captionRE = /captions|subtitles/;
  }
});

// src/foundation/list/symbols.ts
var ADD, REMOVE, RESET, SELECT, READONLY, SET_READONLY, ON_RESET, ON_REMOVE, ON_USER_SELECT, ListSymbol;
var init_symbols2 = __esm({
  "src/foundation/list/symbols.ts"() {
    "use strict";
    ADD = Symbol(true ? "LIST_ADD" : 0);
    REMOVE = Symbol(true ? "LIST_REMOVE" : 0);
    RESET = Symbol(true ? "LIST_RESET" : 0);
    SELECT = Symbol(true ? "LIST_SELECT" : 0);
    READONLY = Symbol(true ? "LIST_READONLY" : 0);
    SET_READONLY = Symbol(true ? "LIST_SET_READONLY" : 0);
    ON_RESET = Symbol(true ? "LIST_ON_RESET" : 0);
    ON_REMOVE = Symbol(true ? "LIST_ON_REMOVE" : 0);
    ON_USER_SELECT = Symbol(true ? "LIST_ON_USER_SELECT" : 0);
    ListSymbol = {
      add: ADD,
      remove: REMOVE,
      reset: RESET,
      select: SELECT,
      readonly: READONLY,
      setReadonly: SET_READONLY,
      onReset: ON_RESET,
      onRemove: ON_REMOVE,
      onUserSelect: ON_USER_SELECT
    };
  }
});

// src/core/quality/symbols.ts
var SET_AUTO, ENABLE_AUTO, QualitySymbol;
var init_symbols3 = __esm({
  "src/core/quality/symbols.ts"() {
    "use strict";
    SET_AUTO = Symbol(true ? "SET_AUTO_QUALITY" : 0);
    ENABLE_AUTO = Symbol(true ? "ENABLE_AUTO_QUALITY" : 0);
    QualitySymbol = {
      setAuto: SET_AUTO,
      enableAuto: ENABLE_AUTO
    };
  }
});

// src/utils/error.ts
function coerceToError(error) {
  return error instanceof Error ? error : Error(typeof error === "string" ? error : JSON.stringify(error));
}
function assert(condition, message) {
  if (!condition) {
    throw Error(message || "Assertion failed.");
  }
}
var init_error = __esm({
  "src/utils/error.ts"() {
    "use strict";
  }
});

// ../../../node_modules/.pnpm/@floating-ui+utils@0.2.2/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x2,
    right: x2 + width,
    bottom: y2 + height,
    x: x2,
    y: y2
  };
}
var min, max, round, floor, createCoords, oppositeSideMap, oppositeAlignmentMap;
var init_floating_ui_utils = __esm({
  "../../../node_modules/.pnpm/@floating-ui+utils@0.2.2/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v2) => ({
      x: v2,
      y: v2
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
  }
});

// ../../../node_modules/.pnpm/@floating-ui+core@1.6.2/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var computePosition, flip, shift;
var init_floating_ui_core = __esm({
  "../../../node_modules/.pnpm/@floating-ui+core@1.6.2/node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    init_floating_ui_utils();
    init_floating_ui_utils();
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x: x2,
        y: y2
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i3 = 0; i3 < validMiddleware.length; i3++) {
        const {
          name,
          fn
        } = validMiddleware[i3];
        const {
          x: nextX,
          y: nextY,
          data,
          reset
        } = await fn({
          x: x2,
          y: y2,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platform2,
          elements: {
            reference,
            floating
          }
        });
        x2 = nextX != null ? nextX : x2;
        y2 = nextY != null ? nextY : y2;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data
          }
        };
        if (reset && resetCount <= 50) {
          resetCount++;
          if (typeof reset === "object") {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects = reset.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset.rects;
            }
            ({
              x: x2,
              y: y2
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i3 = -1;
        }
      }
      return {
        x: x2,
        y: y2,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    flip = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d3) => d3.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$map$so;
                  const placement2 = (_overflowsData$map$so = overflowsData.map((d3) => [d3.placement, d3.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    shift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const {
            x: x2,
            y: y2,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x3,
                  y: y3
                } = _ref;
                return {
                  x: x3,
                  y: y3
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x: x2,
            y: y2
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis)