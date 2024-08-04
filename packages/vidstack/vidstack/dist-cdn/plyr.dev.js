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
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x2,
              y: limitedCoords.y - y2
            }
          };
        }
      };
    };
  }
});

// ../../../node_modules/.pnpm/@floating-ui+utils@0.2.2/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit2 = isWebKit();
  const css = getComputedStyle2(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit2 && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit2 && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
var init_floating_ui_utils_dom = __esm({
  "../../../node_modules/.pnpm/@floating-ui+utils@0.2.2/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
  }
});

// ../../../node_modules/.pnpm/@floating-ui+dom@1.6.5/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x2 = ($2 ? round(rect.width) : rect.width) / width;
  let y2 = ($2 ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (e6) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x2 = rect.left + scroll.scrollLeft - offsets.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y;
  return {
    x: x2,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root2 = getDocumentElement(element);
  function cleanup2() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup2();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root2.clientWidth - (left + width));
    const insetBottom = floor(root2.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root2.ownerDocument
      });
    } catch (e6) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup2;
}
function autoUpdate(reference, floating, update2, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update2, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update2);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update2();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update2();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update2();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update2);
      ancestorResize && ancestor.removeEventListener("resize", update2);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var noOffsets, topLayerSelectors, getElementRects, platform, shift2, flip2, computePosition2;
var init_floating_ui_dom = __esm({
  "../../../node_modules/.pnpm/@floating-ui+dom@1.6.5/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    init_floating_ui_core();
    init_floating_ui_utils();
    init_floating_ui_utils_dom();
    noOffsets = /* @__PURE__ */ createCoords(0);
    topLayerSelectors = [":popover-open", ":modal"];
    getElementRects = async function(data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    shift2 = shift;
    flip2 = flip;
    computePosition2 = (reference, floating, options) => {
      const cache2 = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache2
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// src/utils/number.ts
function round2(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  return String(num).split(".")[1]?.length ?? 0;
}
function clampNumber(min2, value, max2) {
  return Math.max(min2, Math.min(max2, value));
}
var init_number = __esm({
  "src/utils/number.ts"() {
    "use strict";
  }
});

// src/utils/dom.ts
function listen(target, type, handler) {
  if (!target) return;
  return listenEvent(target, type, handler);
}
function isEventInside(el, event2) {
  const target = event2.composedPath()[0];
  return isDOMNode(target) && el.contains(target);
}
function scheduleRafJob(job) {
  rafJobs.add(job);
  return () => rafJobs.delete(job);
}
function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name)) target.setAttribute(name, value);
}
function setARIALabel(target, $label) {
  if (target.hasAttribute("aria-label") || target.hasAttribute("data-no-label")) return;
  if (!isFunction($label)) {
    setAttribute(target, "aria-label", $label);
    return;
  }
  function updateAriaDescription() {
    setAttribute(target, "aria-label", $label());
  }
  if (false) updateAriaDescription();
  else effect(updateAriaDescription);
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
  listenEvent(target, "pointerup", (event2) => {
    if (event2.button === 0 && !event2.defaultPrevented) handler(event2);
  });
  listenEvent(target, "keydown", (event2) => {
    if (isKeyboardClick(event2)) handler(event2);
  });
}
function isTouchPinchEvent(event2) {
  return isTouchEvent(event2) && (event2.touches.length > 1 || event2.changedTouches.length > 1);
}
function requestScopedAnimationFrame(callback) {
  if (false) return callback();
  let scope = getScope(), id2 = window.requestAnimationFrame(() => {
    scoped(callback, scope);
    id2 = -1;
  });
  return () => void window.cancelAnimationFrame(id2);
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
  for (let i3 = 0; i3 < length; i3++) {
    current = document.importNode(content, true);
    onCreate?.(current, i3);
    parent.insertBefore(current, prev.nextSibling);
    elements.push(current);
    prev = current;
  }
  onDispose(() => {
    for (let i3 = 0; i3 < elements.length; i3++) elements[i3].remove();
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
function autoPlacement2(el, trigger, placement, {
  offsetVarName,
  xOffset,
  yOffset,
  ...options
}) {
  if (!el) return;
  const floatingPlacement = placement.replace(" ", "-").replace("-center", "");
  setStyle(el, "visibility", !trigger ? "hidden" : null);
  if (!trigger) return;
  let isTop = placement.includes("top");
  const negateX = (x2) => placement.includes("left") ? `calc(-1 * ${x2})` : x2, negateY = (y2) => isTop ? `calc(-1 * ${y2})` : y2;
  return autoUpdate(trigger, el, () => {
    computePosition2(trigger, el, {
      placement: floatingPlacement,
      middleware: [
        ...options.middleware ?? [],
        flip2({ fallbackAxisSideDirection: "start", crossAxis: false }),
        shift2()
      ],
      ...options
    }).then(({ x: x2, y: y2, middlewareData }) => {
      const hasFlipped = !!middlewareData.flip?.index;
      isTop = placement.includes(hasFlipped ? "bottom" : "top");
      el.setAttribute(
        "data-placement",
        hasFlipped ? placement.startsWith("top") ? placement.replace("top", "bottom") : placement.replace("bottom", "top") : placement
      );
      Object.assign(el.style, {
        top: `calc(${y2 + "px"} + ${negateY(
          yOffset ? yOffset + "px" : `var(--${offsetVarName}-y-offset, 0px)`
        )})`,
        left: `calc(${x2 + "px"} + ${negateX(
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
function isHTMLElement2(el) {
  return el instanceof HTMLElement;
}
var rafJobs, processJobs2;
var init_dom = __esm({
  "src/utils/dom.ts"() {
    "use strict";
    init_floating_ui_dom();
    init_prod();
    init_std();
    rafJobs = /* @__PURE__ */ new Set();
    if (true) {
      let processJobs = function() {
        for (const job of rafJobs) {
          try {
            job();
          } catch (e6) {
            if (true) console.error(`[vidstack] failed job:

${e6}`);
          }
        }
        window.requestAnimationFrame(processJobs);
      };
      processJobs2 = processJobs;
      processJobs();
    }
  }
});

// src/providers/google-cast/utils.ts
function getCastFrameworkURL() {
  return "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
}
function hasLoadedCastFramework() {
  return !!window.cast?.framework;
}
function isCastAvailable() {
  return !!window.chrome?.cast?.isAvailable;
}
function isCastConnected() {
  return getCastContext().getCastState() === cast.framework.CastState.CONNECTED;
}
function getCastContext() {
  return window.cast.framework.CastContext.getInstance();
}
function getCastSession() {
  return getCastContext().getCurrentSession();
}
function getCastSessionMedia() {
  return getCastSession()?.getSessionObj().media[0];
}
function hasActiveCastSession(src) {
  const contentId = getCastSessionMedia()?.media.contentId;
  return contentId === src?.src;
}
function getDefaultCastOptions() {
  return {
    language: "en-US",
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    resumeSavedSession: true,
    androidReceiverCompatible: true
  };
}
function getCastErrorMessage(code) {
  const defaultMessage = `Google Cast Error Code: ${code}`;
  if (true) {
    switch (code) {
      case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
        return "The API is not initialized.";
      case chrome.cast.ErrorCode.CANCEL:
        return "The operation was canceled by the user";
      case chrome.cast.ErrorCode.CHANNEL_ERROR:
        return "A channel to the receiver is not available.";
      case chrome.cast.ErrorCode.EXTENSION_MISSING:
        return "The Cast extension is not available.";
      case chrome.cast.ErrorCode.INVALID_PARAMETER:
        return "The parameters to the operation were not valid.";
      case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
        return "No receiver was compatible with the session request.";
      case chrome.cast.ErrorCode.SESSION_ERROR:
        return "A session could not be created, or a session was invalid.";
      case chrome.cast.ErrorCode.TIMEOUT:
        return "The operation timed out.";
      default:
        return defaultMessage;
    }
  }
  return defaultMessage;
}
function listenCastContextEvent(type, handler) {
  return listen(getCastContext(), type, handler);
}
var init_utils2 = __esm({
  "src/providers/google-cast/utils.ts"() {
    "use strict";
    init_dom();
  }
});

// src/foundation/observers/raf-loop.ts
var RAFLoop;
var init_raf_loop = __esm({
  "src/foundation/observers/raf-loop.ts"() {
    "use strict";
    init_std();
    RAFLoop = class {
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
  }
});

// src/providers/google-cast/media-info.ts
var GoogleCastMediaInfoBuilder;
var init_media_info = __esm({
  "src/providers/google-cast/media-info.ts"() {
    "use strict";
    GoogleCastMediaInfoBuilder = class {
      #info;
      constructor(src) {
        this.#info = new chrome.cast.media.MediaInfo(src.src, src.type);
      }
      build() {
        return this.#info;
      }
      setStreamType(streamType) {
        if (streamType.includes("live")) {
          this.#info.streamType = chrome.cast.media.StreamType.LIVE;
        } else {
          this.#info.streamType = chrome.cast.media.StreamType.BUFFERED;
        }
        return this;
      }
      setTracks(tracks) {
        this.#info.tracks = tracks.map(this.#buildCastTrack);
        return this;
      }
      setMetadata(title, poster) {
        this.#info.metadata = new chrome.cast.media.GenericMediaMetadata();
        this.#info.metadata.title = title;
        this.#info.metadata.images = [{ url: poster }];
        return this;
      }
      #buildCastTrack(track, trackId) {
        const castTrack = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.TEXT);
        castTrack.name = track.label;
        castTrack.trackContentId = track.src;
        castTrack.trackContentType = "text/vtt";
        castTrack.language = track.language;
        castTrack.subtype = track.kind.toUpperCase();
        return castTrack;
      }
    };
  }
});

// src/providers/google-cast/tracks.ts
var REMOTE_TRACK_TEXT_TYPE, REMOTE_TRACK_AUDIO_TYPE, GoogleCastTracksManager;
var init_tracks = __esm({
  "src/providers/google-cast/tracks.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_symbols2();
    init_utils2();
    REMOTE_TRACK_TEXT_TYPE = chrome.cast.media.TrackType.TEXT;
    REMOTE_TRACK_AUDIO_TYPE = chrome.cast.media.TrackType.AUDIO;
    GoogleCastTracksManager = class {
      #cast;
      #ctx;
      #onNewLocalTracks;
      constructor(cast2, ctx, onNewLocalTracks) {
        this.#cast = cast2;
        this.#ctx = ctx;
        this.#onNewLocalTracks = onNewLocalTracks;
      }
      setup() {
        const syncRemoteActiveIds = this.syncRemoteActiveIds.bind(this);
        listenEvent(this.#ctx.audioTracks, "change", syncRemoteActiveIds);
        listenEvent(this.#ctx.textTracks, "mode-change", syncRemoteActiveIds);
        effect(this.#syncLocalTracks.bind(this));
      }
      getLocalTextTracks() {
        return this.#ctx.$state.textTracks().filter((track) => track.src && track.type === "vtt");
      }
      #getLocalAudioTracks() {
        return this.#ctx.$state.audioTracks();
      }
      #getRemoteTracks(type) {
        const tracks = this.#cast.mediaInfo?.tracks ?? [];
        return type ? tracks.filter((track) => track.type === type) : tracks;
      }
      #getRemoteActiveIds() {
        const activeIds = [], activeLocalAudioTrack = this.#getLocalAudioTracks().find((track) => track.selected), activeLocalTextTracks = this.getLocalTextTracks().filter((track) => track.mode === "showing");
        if (activeLocalAudioTrack) {
          const remoteAudioTracks = this.#getRemoteTracks(REMOTE_TRACK_AUDIO_TYPE), remoteAudioTrack = this.#findRemoteTrack(remoteAudioTracks, activeLocalAudioTrack);
          if (remoteAudioTrack) activeIds.push(remoteAudioTrack.trackId);
        }
        if (activeLocalTextTracks?.length) {
          const remoteTextTracks = this.#getRemoteTracks(REMOTE_TRACK_TEXT_TYPE);
          if (remoteTextTracks.length) {
            for (const localTrack of activeLocalTextTracks) {
              const remoteTextTrack = this.#findRemoteTrack(remoteTextTracks, localTrack);
              if (remoteTextTrack) activeIds.push(remoteTextTrack.trackId);
            }
          }
        }
        return activeIds;
      }
      #syncLocalTracks() {
        const localTextTracks = this.getLocalTextTracks();
        if (!this.#cast.isMediaLoaded) return;
        const remoteTextTracks = this.#getRemoteTracks(REMOTE_TRACK_TEXT_TYPE);
        for (const localTrack of localTextTracks) {
          const hasRemoteTrack = this.#findRemoteTrack(remoteTextTracks, localTrack);
          if (!hasRemoteTrack) {
            untrack(() => this.#onNewLocalTracks?.());
            break;
          }
        }
      }
      syncRemoteTracks(event2) {
        if (!this.#cast.isMediaLoaded) return;
        const localAudioTracks = this.#getLocalAudioTracks(), localTextTracks = this.getLocalTextTracks(), remoteAudioTracks = this.#getRemoteTracks(REMOTE_TRACK_AUDIO_TYPE), remoteTextTracks = this.#getRemoteTracks(REMOTE_TRACK_TEXT_TYPE);
        for (const remoteAudioTrack of remoteAudioTracks) {
          const hasLocalTrack = this.#findLocalTrack(localAudioTracks, remoteAudioTrack);
          if (hasLocalTrack) continue;
          const localAudioTrack = {
            id: remoteAudioTrack.trackId.toString(),
            label: remoteAudioTrack.name,
            language: remoteAudioTrack.language,
            kind: remoteAudioTrack.subtype ?? "main",
            selected: false
          };
          this.#ctx.audioTracks[ListSymbol.add](localAudioTrack, event2);
        }
        for (const remoteTextTrack of remoteTextTracks) {
          const hasLocalTrack = this.#findLocalTrack(localTextTracks, remoteTextTrack);
          if (hasLocalTrack) continue;
          const localTextTrack = {
            id: remoteTextTrack.trackId.toString(),
            src: remoteTextTrack.trackContentId,
            label: remoteTextTrack.name,
            language: remoteTextTrack.language,
            kind: remoteTextTrack.subtype.toLowerCase()
          };
          this.#ctx.textTracks.add(localTextTrack, event2);
        }
      }
      syncRemoteActiveIds(event2) {
        if (!this.#cast.isMediaLoaded) return;
        const activeIds = this.#getRemoteActiveIds(), editRequest = new chrome.cast.media.EditTracksInfoRequest(activeIds);
        this.#editTracksInfo(editRequest).catch((error) => {
          if (true) {
            this.#ctx.logger?.errorGroup("[vidstack] failed to edit cast tracks info").labelledLog("Edit Request", editRequest).labelledLog("Error", error).dispatch();
          }
        });
      }
      #editTracksInfo(request) {
        const media = getCastSessionMedia();
        return new Promise((resolve, reject) => media?.editTracksInfo(request, resolve, reject));
      }
      #findLocalTrack(localTracks, remoteTrack) {
        return localTracks.find((localTrack) => this.#isMatch(localTrack, remoteTrack));
      }
      #findRemoteTrack(remoteTracks, localTrack) {
        return remoteTracks.find((remoteTrack) => this.#isMatch(localTrack, remoteTrack));
      }
      // Note: we can't rely on id matching because they will differ between local/remote. A local
      // track id might not even exist.
      #isMatch(localTrack, remoteTrack) {
        return remoteTrack.name === localTrack.label && remoteTrack.language === localTrack.language && remoteTrack.subtype.toLowerCase() === localTrack.kind.toLowerCase();
      }
    };
  }
});

// src/providers/google-cast/provider.ts
var provider_exports = {};
__export(provider_exports, {
  GoogleCastProvider: () => GoogleCastProvider
});
var GoogleCastProvider;
var init_provider = __esm({
  "src/providers/google-cast/provider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_time_ranges();
    init_raf_loop();
    init_media_info();
    init_tracks();
    init_utils2();
    GoogleCastProvider = class {
      $$PROVIDER_TYPE = "GOOGLE_CAST";
      scope = createScope();
      #player;
      #ctx;
      #tracks;
      #currentSrc = null;
      #state = "disconnected";
      #currentTime = 0;
      #played = 0;
      #seekableRange = new TimeRange(0, 0);
      #timeRAF = new RAFLoop(this.#onAnimationFrame.bind(this));
      #playerEventHandlers;
      #reloadInfo = null;
      #isIdle = false;
      constructor(player, ctx) {
        this.#player = player;
        this.#ctx = ctx;
        this.#tracks = new GoogleCastTracksManager(player, ctx, this.#onNewLocalTracks.bind(this));
      }
      get type() {
        return "google-cast";
      }
      get currentSrc() {
        return this.#currentSrc;
      }
      /**
       * The Google Cast remote player.
       *
       * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.RemotePlayer}
       */
      get player() {
        return this.#player;
      }
      /**
       * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
       */
      get cast() {
        return getCastContext();
      }
      /**
       * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastSession}
       */
      get session() {
        return getCastSession();
      }
      /**
       * @see {@link https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.Media}
       */
      get media() {
        return getCastSessionMedia();
      }
      /**
       * Whether the current Google Cast session belongs to this provider.
       */
      get hasActiveSession() {
        return hasActiveCastSession(this.#currentSrc);
      }
      setup() {
        this.#attachCastContextEventListeners();
        this.#attachCastPlayerEventListeners();
        this.#tracks.setup();
        this.#ctx.notify("provider-setup", this);
      }
      #attachCastContextEventListeners() {
        listenCastContextEvent(
          cast.framework.CastContextEventType.CAST_STATE_CHANGED,
          this.#onCastStateChange.bind(this)
        );
      }
      #attachCastPlayerEventListeners() {
        const Event2 = cast.framework.RemotePlayerEventType, handlers = {
          [Event2.IS_CONNECTED_CHANGED]: this.#onCastStateChange,
          [Event2.IS_MEDIA_LOADED_CHANGED]: this.#onMediaLoadedChange,
          [Event2.CAN_CONTROL_VOLUME_CHANGED]: this.#onCanControlVolumeChange,
          [Event2.CAN_SEEK_CHANGED]: this.#onCanSeekChange,
          [Event2.DURATION_CHANGED]: this.#onDurationChange,
          [Event2.IS_MUTED_CHANGED]: this.#onVolumeChange,
          [Event2.VOLUME_LEVEL_CHANGED]: this.#onVolumeChange,
          [Event2.IS_PAUSED_CHANGED]: this.#onPausedChange,
          [Event2.LIVE_SEEKABLE_RANGE_CHANGED]: this.#onProgress,
          [Event2.PLAYER_STATE_CHANGED]: this.#onPlayerStateChange
        };
        this.#playerEventHandlers = handlers;
        const handler = this.#onRemotePlayerEvent.bind(this);
        for (const type of keysOf(handlers)) {
          this.#player.controller.addEventListener(type, handler);
        }
        onDispose(() => {
          for (const type of keysOf(handlers)) {
            this.#player.controller.removeEventListener(type, handler);
          }
        });
      }
      async play() {
        if (!this.#player.isPaused && !this.#isIdle) return;
        if (this.#isIdle) {
          await this.#reload(false, 0);
          return;
        }
        this.#player.controller?.playOrPause();
      }
      async pause() {
        if (this.#player.isPaused) return;
        this.#player.controller?.playOrPause();
      }
      getMediaStatus(request) {
        return new Promise((resolve, reject) => {
          this.media?.getStatus(request, resolve, reject);
        });
      }
      setMuted(muted) {
        const hasChanged = muted && !this.#player.isMuted || !muted && this.#player.isMuted;
        if (hasChanged) this.#player.controller?.muteOrUnmute();
      }
      setCurrentTime(time) {
        this.#player.currentTime = time;
        this.#ctx.notify("seeking", time);
        this.#player.controller?.seek();
      }
      setVolume(volume) {
        this.#player.volumeLevel = volume;
        this.#player.controller?.setVolumeLevel();
      }
      async loadSource(src) {
        if (this.#reloadInfo?.src !== src) this.#reloadInfo = null;
        if (hasActiveCastSession(src)) {
          this.#resumeSession();
          this.#currentSrc = src;
          return;
        }
        this.#ctx.notify("load-start");
        const loadRequest = this.#buildLoadRequest(src), errorCode = await this.session.loadMedia(loadRequest);
        if (errorCode) {
          this.#currentSrc = null;
          this.#ctx.notify("error", Error(getCastErrorMessage(errorCode)));
          return;
        }
        this.#currentSrc = src;
      }
      destroy() {
        this.#reset();
        this.#endSession();
      }
      #reset() {
        if (!this.#reloadInfo) {
          this.#played = 0;
          this.#seekableRange = new TimeRange(0, 0);
        }
        this.#timeRAF.stop();
        this.#currentTime = 0;
        this.#reloadInfo = null;
      }
      #resumeSession() {
        const resumeSessionEvent = new DOMEvent("resume-session", { detail: this.session });
        this.#onMediaLoadedChange(resumeSessionEvent);
        const { muted, volume, savedState } = this.#ctx.$state, localState = savedState();
        this.setCurrentTime(Math.max(this.#player.currentTime, localState?.currentTime ?? 0));
        this.setMuted(muted());
        this.setVolume(volume());
        if (localState?.paused === false) this.play();
      }
      #endSession() {
        this.cast.endCurrentSession(true);
        const { remotePlaybackLoader } = this.#ctx.$state;
        remotePlaybackLoader.set(null);
      }
      #disconnectFromReceiver() {
        const { savedState } = this.#ctx.$state;
        savedState.set({
          paused: this.#player.isPaused,
          currentTime: this.#player.currentTime
        });
        this.#endSession();
      }
      #onAnimationFrame() {
        this.#onCurrentTimeChange();
      }
      #onRemotePlayerEvent(event2) {
        this.#playerEventHandlers[event2.type].call(this, event2);
      }
      #onCastStateChange(data) {
        const castState = this.cast.getCastState(), state = castState === cast.framework.CastState.CONNECTED ? "connected" : castState === cast.framework.CastState.CONNECTING ? "connecting" : "disconnected";
        if (this.#state === state) return;
        const detail = { type: "google-cast", state }, trigger = this.#createEvent(data);
        this.#state = state;
        this.#ctx.notify("remote-playback-change", detail, trigger);
        if (state === "disconnected") {
          this.#disconnectFromReceiver();
        }
      }
      #onMediaLoadedChange(event2) {
        const hasLoaded = !!this.#player.isMediaLoaded;
        if (!hasLoaded) return;
        const src = peek(this.#ctx.$state.source);
        Promise.resolve().then(() => {
          if (src !== peek(this.#ctx.$state.source) || !this.#player.isMediaLoaded) return;
          this.#reset();
          const duration = this.#player.duration;
          this.#seekableRange = new TimeRange(0, duration);
          const detail = {
            provider: this,
            duration,
            buffered: new TimeRange(0, 0),
            seekable: this.#getSeekableRange()
          }, trigger = this.#createEvent(event2);
          this.#ctx.notify("loaded-metadata", void 0, trigger);
          this.#ctx.notify("loaded-data", void 0, trigger);
          this.#ctx.notify("can-play", detail, trigger);
          this.#onCanControlVolumeChange();
          this.#onCanSeekChange(event2);
          const { volume, muted } = this.#ctx.$state;
          this.setVolume(volume());
          this.setMuted(muted());
          this.#timeRAF.start();
          this.#tracks.syncRemoteTracks(trigger);
          this.#tracks.syncRemoteActiveIds(trigger);
        });
      }
      #onCanControlVolumeChange() {
        this.#ctx.$state.canSetVolume.set(this.#player.canControlVolume);
      }
      #onCanSeekChange(event2) {
        const trigger = this.#createEvent(event2);
        this.#ctx.notify("stream-type-change", this.#getStreamType(), trigger);
      }
      #getStreamType() {
        const streamType = this.#player.mediaInfo?.streamType;
        return streamType === chrome.cast.media.StreamType.LIVE ? this.#player.canSeek ? "live:dvr" : "live" : "on-demand";
      }
      #onCurrentTimeChange() {
        if (this.#reloadInfo) return;
        const currentTime = this.#player.currentTime;
        if (currentTime === this.#currentTime) return;
        this.#ctx.notify("time-change", currentTime);
        if (currentTime > this.#played) {
          this.#played = currentTime;
          this.#onProgress();
        }
        if (this.#ctx.$state.seeking()) {
          this.#ctx.notify("seeked", currentTime);
        }
        this.#currentTime = currentTime;
      }
      #onDurationChange(event2) {
        if (!this.#player.isMediaLoaded || this.#reloadInfo) return;
        const duration = this.#player.duration, trigger = this.#createEvent(event2);
        this.#seekableRange = new TimeRange(0, duration);
        this.#ctx.notify("duration-change", duration, trigger);
      }
      #onVolumeChange(event2) {
        if (!this.#player.isMediaLoaded) return;
        const detail = {
          muted: this.#player.isMuted,
          volume: this.#player.volumeLevel
        }, trigger = this.#createEvent(event2);
        this.#ctx.notify("volume-change", detail, trigger);
      }
      #onPausedChange(event2) {
        const trigger = this.#createEvent(event2);
        if (this.#player.isPaused) {
          this.#ctx.notify("pause", void 0, trigger);
        } else {
          this.#ctx.notify("play", void 0, trigger);
        }
      }
      #onProgress(event2) {
        const detail = {
          seekable: this.#getSeekableRange(),
          buffered: new TimeRange(0, this.#played)
        }, trigger = event2 ? this.#createEvent(event2) : void 0;
        this.#ctx.notify("progress", detail, trigger);
      }
      #onPlayerStateChange(event2) {
        const state = this.#player.playerState, PlayerState = chrome.cast.media.PlayerState;
        this.#isIdle = state === PlayerState.IDLE;
        if (state === PlayerState.PAUSED) return;
        const trigger = this.#createEvent(event2);
        switch (state) {
          case PlayerState.PLAYING:
            this.#ctx.notify("playing", void 0, trigger);
            break;
          case PlayerState.BUFFERING:
            this.#ctx.notify("waiting", void 0, trigger);
            break;
          case PlayerState.IDLE:
            this.#timeRAF.stop();
            this.#ctx.notify("pause");
            this.#ctx.notify("end");
            break;
        }
      }
      #getSeekableRange() {
        return this.#player.liveSeekableRange ? new TimeRange(this.#player.liveSeekableRange.start, this.#player.liveSeekableRange.end) : this.#seekableRange;
      }
      #createEvent(detail) {
        return detail instanceof Event ? detail : new DOMEvent(detail.type, { detail });
      }
      #buildMediaInfo(src) {
        const { streamType, title, poster } = this.#ctx.$state;
        return new GoogleCastMediaInfoBuilder(src).setMetadata(title(), poster()).setStreamType(streamType()).setTracks(this.#tracks.getLocalTextTracks()).build();
      }
      #buildLoadRequest(src) {
        const mediaInfo = this.#buildMediaInfo(src), request = new chrome.cast.media.LoadRequest(mediaInfo), savedState = this.#ctx.$state.savedState();
        request.autoplay = (this.#reloadInfo?.paused ?? savedState?.paused) === false;
        request.currentTime = this.#reloadInfo?.time ?? savedState?.currentTime ?? 0;
        return request;
      }
      async #reload(paused, time) {
        const src = peek(this.#ctx.$state.source);
        this.#reloadInfo = { src, paused, time };
        await this.loadSource(src);
      }
      #onNewLocalTracks() {
        this.#reload(this.#player.isPaused, this.#player.currentTime).catch((error) => {
          if (true) {
            this.#ctx.logger?.errorGroup("[vidstack] cast failed to load new local tracks").labelledLog("Error", error).dispatch();
          }
        });
      }
    };
  }
});

// src/providers/google-cast/loader.ts
var loader_exports = {};
__export(loader_exports, {
  GoogleCastLoader: () => GoogleCastLoader
});
var GoogleCastLoader;
var init_loader = __esm({
  "src/providers/google-cast/loader.ts"() {
    "use strict";
    init_prod();
    init_mime();
    init_network();
    init_support();
    init_utils2();
    GoogleCastLoader = class {
      name = "google-cast";
      target;
      #player;
      /**
       * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
       */
      get cast() {
        return getCastContext();
      }
      mediaType() {
        return "video";
      }
      canPlay(src) {
        return IS_CHROME && !IS_IOS && canGoogleCastSrc(src);
      }
      async prompt(ctx) {
        let loadEvent, openEvent, errorEvent;
        try {
          loadEvent = await this.#loadCastFramework(ctx);
          if (!this.#player) {
            this.#player = new cast.framework.RemotePlayer();
            new cast.framework.RemotePlayerController(this.#player);
          }
          openEvent = ctx.player.createEvent("google-cast-prompt-open", {
            trigger: loadEvent
          });
          ctx.player.dispatchEvent(openEvent);
          this.#notifyRemoteStateChange(ctx, "connecting", openEvent);
          await this.#showPrompt(peek(ctx.$props.googleCast));
          ctx.$state.remotePlaybackInfo.set({
            deviceName: getCastSession()?.getCastDevice().friendlyName
          });
          if (isCastConnected()) this.#notifyRemoteStateChange(ctx, "connected", openEvent);
        } catch (code) {
          const error = code instanceof Error ? code : this.#createError(
            (code + "").toUpperCase(),
            "Prompt failed."
          );
          errorEvent = ctx.player.createEvent("google-cast-prompt-error", {
            detail: error,
            trigger: openEvent ?? loadEvent,
            cancelable: true
          });
          ctx.player.dispatch(errorEvent);
          this.#notifyRemoteStateChange(
            ctx,
            isCastConnected() ? "connected" : "disconnected",
            errorEvent
          );
          throw error;
        } finally {
          ctx.player.dispatch("google-cast-prompt-close", {
            trigger: errorEvent ?? openEvent ?? loadEvent
          });
        }
      }
      async load(ctx) {
        if (false) {
          throw Error("[vidstack] can not load google cast provider server-side");
        }
        if (!this.#player) {
          throw Error("[vidstack] google cast player was not initialized");
        }
        return new (await Promise.resolve().then(() => (init_provider(), provider_exports))).GoogleCastProvider(this.#player, ctx);
      }
      async #loadCastFramework(ctx) {
        if (hasLoadedCastFramework()) return;
        const loadStartEvent = ctx.player.createEvent("google-cast-load-start");
        ctx.player.dispatch(loadStartEvent);
        await loadScript(getCastFrameworkURL());
        await customElements.whenDefined("google-cast-launcher");
        const loadedEvent = ctx.player.createEvent("google-cast-loaded", { trigger: loadStartEvent });
        ctx.player.dispatch(loadedEvent);
        if (!isCastAvailable()) {
          throw this.#createError("CAST_NOT_AVAILABLE", "Google Cast not available on this platform.");
        }
        return loadedEvent;
      }
      async #showPrompt(options) {
        this.#setOptions(options);
        const errorCode = await this.cast.requestSession();
        if (errorCode) {
          throw this.#createError(
            errorCode.toUpperCase(),
            getCastErrorMessage(errorCode)
          );
        }
      }
      #setOptions(options) {
        this.cast?.setOptions({
          ...getDefaultCastOptions(),
          ...options
        });
      }
      #notifyRemoteStateChange(ctx, state, trigger) {
        const detail = { type: "google-cast", state };
        ctx.notify("remote-playback-change", detail, trigger);
      }
      #createError(code, message) {
        const error = Error(message);
        error.code = code;
        return error;
      }
    };
  }
});

// src/providers/html/audio/audio-context.ts
function getOrCreateAudioCtx() {
  return audioContext ??= new AudioContext();
}
function createGainNode() {
  const audioCtx = getOrCreateAudioCtx(), gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNodes.push(gainNode);
  return gainNode;
}
function createElementSource(el, gainNode) {
  const audioCtx = getOrCreateAudioCtx(), src = audioCtx.createMediaElementSource(el);
  if (gainNode) {
    src.connect(gainNode);
  }
  elAudioSources.push(src);
  return src;
}
function destroyGainNode(node) {
  const idx = gainNodes.indexOf(node);
  if (idx !== -1) {
    gainNodes.splice(idx, 1);
    node.disconnect();
    freeAudioCtxWhenAllResourcesFreed();
  }
}
function destroyElementSource(src) {
  const idx = elAudioSources.indexOf(src);
  if (idx !== -1) {
    elAudioSources.splice(idx, 1);
    src.disconnect();
    freeAudioCtxWhenAllResourcesFreed();
  }
}
function freeAudioCtxWhenAllResourcesFreed() {
  if (audioContext && gainNodes.length === 0 && elAudioSources.length === 0) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
}
var audioContext, gainNodes, elAudioSources;
var init_audio_context = __esm({
  "src/providers/html/audio/audio-context.ts"() {
    "use strict";
    audioContext = null;
    gainNodes = [];
    elAudioSources = [];
  }
});

// src/providers/html/audio/audio-gain.ts
var AudioGain;
var init_audio_gain = __esm({
  "src/providers/html/audio/audio-gain.ts"() {
    "use strict";
    init_audio_context();
    AudioGain = class {
      #media;
      #onChange;
      #gainNode = null;
      #srcAudioNode = null;
      get currentGain() {
        return this.#gainNode?.gain?.value ?? null;
      }
      get supported() {
        return true;
      }
      constructor(media, onChange) {
        this.#media = media;
        this.#onChange = onChange;
      }
      setGain(gain) {
        const currGain = this.currentGain;
        if (gain === this.currentGain) {
          return;
        }
        if (gain === 1 && currGain !== 1) {
          this.removeGain();
          return;
        }
        if (!this.#gainNode) {
          this.#gainNode = createGainNode();
          if (this.#srcAudioNode) {
            this.#srcAudioNode.connect(this.#gainNode);
          }
        }
        if (!this.#srcAudioNode) {
          this.#srcAudioNode = createElementSource(this.#media, this.#gainNode);
        }
        this.#gainNode.gain.value = gain;
        this.#onChange(gain);
      }
      removeGain() {
        if (!this.#gainNode) return;
        if (this.#srcAudioNode) {
          this.#srcAudioNode.connect(getOrCreateAudioCtx().destination);
        }
        this.#destroyGainNode();
        this.#onChange(null);
      }
      destroy() {
        this.#destroySrcNode();
        this.#destroyGainNode();
      }
      #destroySrcNode() {
        if (!this.#srcAudioNode) return;
        try {
          destroyElementSource(this.#srcAudioNode);
        } catch (e6) {
        } finally {
          this.#srcAudioNode = null;
        }
      }
      #destroyGainNode() {
        if (!this.#gainNode) return;
        try {
          destroyGainNode(this.#gainNode);
        } catch (e6) {
        } finally {
          this.#gainNode = null;
        }
      }
    };
  }
});

// src/foundation/observers/page-visibility.ts
function determinePageState(event2) {
  if (false) return "hidden";
  if (event2?.type === "blur" || document.visibilityState === "hidden") return "hidden";
  if (document.hasFocus()) return "active";
  return "passive";
}
var PAGE_EVENTS, PageVisibility;
var init_page_visibility = __esm({
  "src/foundation/observers/page-visibility.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_support();
    PAGE_EVENTS = ["focus", "blur", "visibilitychange", "pageshow", "pagehide"];
    PageVisibility = class {
      #state = signal(determinePageState());
      #visibility = signal(false ? "visible" : document.visibilityState);
      #safariBeforeUnloadTimeout;
      connect() {
        for (const eventType of PAGE_EVENTS) {
          listenEvent(window, eventType, this.#handlePageEvent.bind(this));
        }
        if (IS_SAFARI) {
          listenEvent(window, "beforeunload", (event2) => {
            this.#safariBeforeUnloadTimeout = setTimeout(() => {
              if (!(event2.defaultPrevented || event2.returnValue.length > 0)) {
                this.#state.set("hidden");
                this.#visibility.set("hidden");
              }
            }, 0);
          });
        }
      }
      /**
       * The current page state. Important to note we only account for a subset of page states, as
       * the rest aren't valuable to the player at the moment.
       *
       * - **active:** A page is in the active state if it is visible and has input focus.
       * - **passive:** A page is in the passive state if it is visible and does not have input focus.
       * - **hidden:** A page is in the hidden state if it is not visible.
       *
       * @see https://developers.google.com/web/updates/2018/07/page-lifecycle-api#states
       */
      get pageState() {
        return this.#state();
      }
      /**
       * The current document visibility state.
       *
       * - **visible:** The page content may be at least partially visible. In practice, this means that
       * the page is the foreground tab of a non-minimized window.
       * - **hidden:** The page content is not visible to the user. In practice this means that the
       * document is either a background tab or part of a minimized window, or the OS screen lock is
       * active.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
       */
      get visibility() {
        return this.#visibility();
      }
      #handlePageEvent(event2) {
        if (IS_SAFARI) window.clearTimeout(this.#safariBeforeUnloadTimeout);
        if (event2.type !== "blur" || this.#state() === "active") {
          this.#state.set(determinePageState(event2));
          this.#visibility.set(document.visibilityState == "hidden" ? "hidden" : "visible");
        }
      }
    };
  }
});

// src/providers/html/html–media-events.ts
var HTMLMediaEvents;
var init_html_media_events = __esm({
  "src/providers/html/html\u2013media-events.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_page_visibility();
    init_raf_loop();
    init_mime();
    init_number();
    init_support();
    HTMLMediaEvents = class {
      #provider;
      #ctx;
      #disposal = useDisposalBin();
      #waiting = false;
      #attachedLoadStart = false;
      #attachedCanPlay = false;
      #timeRAF = new RAFLoop(this.#onAnimationFrame.bind(this));
      #pageVisibility = new PageVisibility();
      get #media() {
        return this.#provider.media;
      }
      constructor(provider, ctx) {
        this.#provider = provider;
        this.#ctx = ctx;
        this.#attachInitialListeners();
        this.#pageVisibility.connect();
        effect(this.#attachTimeUpdate.bind(this));
        onDispose(this.#onDispose.bind(this));
      }
      #onDispose() {
        this.#attachedLoadStart = false;
        this.#attachedCanPlay = false;
        this.#timeRAF.stop();
        this.#disposal.empty();
      }
      /**
       * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
       * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
       * resolve that by retrieving time updates in a request animation frame loop.
       */
      #lastSeenTime = 0;
      #seekedTo = -1;
      #onAnimationFrame() {
        const newTime = this.#media.currentTime;
        const didStutter = IS_SAFARI && newTime - this.#seekedTo < 0.35;
        if (!didStutter && this.#lastSeenTime !== newTime) {
          this.#updateCurrentTime(newTime);
          this.#lastSeenTime = newTime;
        }
      }
      #attachInitialListeners() {
        if (true) {
          this.#ctx.logger?.info("attaching initial listeners");
        }
        this.#attachEventListener("loadstart", this.#onLoadStart);
        this.#attachEventListener("abort", this.#onAbort);
        this.#attachEventListener("emptied", this.#onEmptied);
        this.#attachEventListener("error", this.#onError);
        this.#attachEventListener("volumechange", this.#onVolumeChange);
        if (true) this.#ctx.logger?.debug("attached initial media event listeners");
      }
      #attachLoadStartListeners() {
        if (this.#attachedLoadStart) return;
        if (true) {
          this.#ctx.logger?.info("attaching load start listeners");
        }
        this.#disposal.add(
          this.#attachEventListener("loadeddata", this.#onLoadedData),
          this.#attachEventListener("loadedmetadata", this.#onLoadedMetadata),
          this.#attachEventListener("canplay", this.#onCanPlay),
          this.#attachEventListener("canplaythrough", this.#onCanPlayThrough),
          this.#attachEventListener("durationchange", this.#onDurationChange),
          this.#attachEventListener("play", this.#onPlay),
          this.#attachEventListener("progress", this.#onProgress),
          this.#attachEventListener("stalled", this.#onStalled),
          this.#attachEventListener("suspend", this.#onSuspend),
          this.#attachEventListener("ratechange", this.#onRateChange)
        );
        this.#attachedLoadStart = true;
      }
      #attachCanPlayListeners() {
        if (this.#attachedCanPlay) return;
        if (true) {
          this.#ctx.logger?.info("attaching can play listeners");
        }
        this.#disposal.add(
          this.#attachEventListener("pause", this.#onPause),
          this.#attachEventListener("playing", this.#onPlaying),
          this.#attachEventListener("seeked", this.#onSeeked),
          this.#attachEventListener("seeking", this.#onSeeking),
          this.#attachEventListener("ended", this.#onEnded),
          this.#attachEventListener("waiting", this.#onWaiting)
        );
        this.#attachedCanPlay = true;
      }
      #handlers = true ? /* @__PURE__ */ new Map() : void 0;
      #handleDevEvent = true ? this.#onDevEvent.bind(this) : void 0;
      #attachEventListener(eventType, handler) {
        if (true) this.#handlers.set(eventType, handler);
        return listenEvent(
          this.#media,
          eventType,
          true ? this.#handleDevEvent : handler.bind(this)
        );
      }
      #onDevEvent(event2) {
        if (false) return;
        this.#ctx.logger?.debugGroup(`\u{1F4FA} provider fired \`${event2.type}\``).labelledLog("Provider", this.#provider).labelledLog("Event", event2).labelledLog("Media Store", { ...this.#ctx.$state }).dispatch();
        this.#handlers.get(event2.type)?.call(this, event2);
      }
      #updateCurrentTime(time, trigger) {
        const newTime = Math.min(time, this.#ctx.$state.seekableEnd());
        this.#ctx.notify("time-change", newTime, trigger);
      }
      #onLoadStart(event2) {
        if (this.#media.networkState === 3) {
          this.#onAbort(event2);
          return;
        }
        this.#attachLoadStartListeners();
        this.#ctx.notify("load-start", void 0, event2);
      }
      #onAbort(event2) {
        this.#ctx.notify("abort", void 0, event2);
      }
      #onEmptied() {
        this.#ctx.notify("emptied", void 0, event);
      }
      #onLoadedData(event2) {
        this.#ctx.notify("loaded-data", void 0, event2);
      }
      #onLoadedMetadata(event2) {
        this.#lastSeenTime = 0;
        this.#seekedTo = -1;
        this.#attachCanPlayListeners();
        this.#ctx.notify("loaded-metadata", void 0, event2);
        if (IS_IOS || IS_SAFARI && isHLSSrc(this.#ctx.$state.source())) {
          this.#ctx.delegate.ready(this.#getCanPlayDetail(), event2);
        }
      }
      #getCanPlayDetail() {
        return {
          provider: peek(this.#ctx.$provider),
          duration: this.#media.duration,
          buffered: this.#media.buffered,
          seekable: this.#media.seekable
        };
      }
      #onPlay(event2) {
        if (!this.#ctx.$state.canPlay) return;
        this.#ctx.notify("play", void 0, event2);
      }
      #onPause(event2) {
        if (this.#media.readyState === 1 && !this.#waiting) return;
        this.#waiting = false;
        this.#timeRAF.stop();
        this.#ctx.notify("pause", void 0, event2);
      }
      #onCanPlay(event2) {
        this.#ctx.delegate.ready(this.#getCanPlayDetail(), event2);
      }
      #onCanPlayThrough(event2) {
        if (this.#ctx.$state.started()) return;
        this.#ctx.notify("can-play-through", this.#getCanPlayDetail(), event2);
      }
      #onPlaying(event2) {
        if (this.#media.paused) return;
        this.#waiting = false;
        this.#ctx.notify("playing", void 0, event2);
        this.#timeRAF.start();
      }
      #onStalled(event2) {
        this.#ctx.notify("stalled", void 0, event2);
        if (this.#media.readyState < 3) {
          this.#waiting = true;
          this.#ctx.notify("waiting", void 0, event2);
        }
      }
      #onWaiting(event2) {
        if (this.#media.readyState < 3) {
          this.#waiting = true;
          this.#ctx.notify("waiting", void 0, event2);
        }
      }
      #onEnded(event2) {
        this.#timeRAF.stop();
        this.#updateCurrentTime(this.#media.duration, event2);
        this.#ctx.notify("end", void 0, event2);
        if (this.#ctx.$state.loop()) {
          const hasCustomControls = isNil(this.#media.controls);
          if (hasCustomControls) this.#media.controls = false;
        }
      }
      #attachTimeUpdate() {
        const isPaused = this.#ctx.$state.paused(), isPageHidden = this.#pageVisibility.visibility === "hidden", shouldListenToTimeUpdates = isPaused || isPageHidden;
        if (shouldListenToTimeUpdates) {
          listenEvent(this.#media, "timeupdate", this.#onTimeUpdate.bind(this));
        }
      }
      #onTimeUpdate(event2) {
        this.#updateCurrentTime(this.#media.currentTime, event2);
      }
      #onDurationChange(event2) {
        if (this.#ctx.$state.ended()) {
          this.#updateCurrentTime(this.#media.duration, event2);
        }
        this.#ctx.notify("duration-change", this.#media.duration, event2);
      }
      #onVolumeChange(event2) {
        const detail = {
          volume: this.#media.volume,
          muted: this.#media.muted
        };
        this.#ctx.notify("volume-change", detail, event2);
      }
      #onSeeked(event2) {
        this.#seekedTo = this.#media.currentTime;
        this.#updateCurrentTime(this.#media.currentTime, event2);
        this.#ctx.notify("seeked", this.#media.currentTime, event2);
        if (Math.trunc(this.#media.currentTime) === Math.trunc(this.#media.duration) && getNumberOfDecimalPlaces(this.#media.duration) > getNumberOfDecimalPlaces(this.#media.currentTime)) {
          this.#updateCurrentTime(this.#media.duration, event2);
          if (!this.#media.ended) {
            this.#ctx.player.dispatch(
              new DOMEvent("media-play-request", {
                trigger: event2
              })
            );
          }
        }
      }
      #onSeeking(event2) {
        this.#ctx.notify("seeking", this.#media.currentTime, event2);
      }
      #onProgress(event2) {
        const detail = {
          buffered: this.#media.buffered,
          seekable: this.#media.seekable
        };
        this.#ctx.notify("progress", detail, event2);
      }
      #onSuspend(event2) {
        this.#ctx.notify("suspend", void 0, event2);
      }
      #onRateChange(event2) {
        this.#ctx.notify("rate-change", this.#media.playbackRate, event2);
      }
      #onError(event2) {
        const error = this.#media.error;
        if (!error) return;
        const detail = {
          message: error.message,
          code: error.code,
          mediaError: error
        };
        this.#ctx.notify("error", detail, event2);
      }
    };
  }
});

// src/providers/html/native-audio-tracks.ts
var NativeAudioTracks;
var init_native_audio_tracks = __esm({
  "src/providers/html/native-audio-tracks.ts"() {
    "use strict";
    init_std();
    init_symbols2();
    NativeAudioTracks = class {
      #provider;
      #ctx;
      get #nativeTracks() {
        return this.#provider.media.audioTracks;
      }
      constructor(provider, ctx) {
        this.#provider = provider;
        this.#ctx = ctx;
        this.#nativeTracks.onaddtrack = this.#onAddNativeTrack.bind(this);
        this.#nativeTracks.onremovetrack = this.#onRemoveNativeTrack.bind(this);
        this.#nativeTracks.onchange = this.#onChangeNativeTrack.bind(this);
        listenEvent(this.#ctx.audioTracks, "change", this.#onChangeTrack.bind(this));
      }
      #onAddNativeTrack(event2) {
        const nativeTrack = event2.track;
        if (nativeTrack.label === "") return;
        const id2 = nativeTrack.id.toString() || `native-audio-${this.#ctx.audioTracks.length}`, audioTrack = {
          id: id2,
          label: nativeTrack.label,
          language: nativeTrack.language,
          kind: nativeTrack.kind,
          selected: false
        };
        this.#ctx.audioTracks[ListSymbol.add](audioTrack, event2);
        if (nativeTrack.enabled) audioTrack.selected = true;
      }
      #onRemoveNativeTrack(event2) {
        const track = this.#ctx.audioTracks.getById(event2.track.id);
        if (track) this.#ctx.audioTracks[ListSymbol.remove](track, event2);
      }
      #onChangeNativeTrack(event2) {
        let enabledTrack = this.#getEnabledNativeTrack();
        if (!enabledTrack) return;
        const track = this.#ctx.audioTracks.getById(enabledTrack.id);
        if (track) this.#ctx.audioTracks[ListSymbol.select](track, true, event2);
      }
      #getEnabledNativeTrack() {
        return Array.from(this.#nativeTracks).find((track) => track.enabled);
      }
      #onChangeTrack(event2) {
        const { current } = event2.detail;
        if (!current) return;
        const track = this.#nativeTracks.getTrackById(current.id);
        if (track) {
          const prev = this.#getEnabledNativeTrack();
          if (prev) prev.enabled = false;
          track.enabled = true;
        }
      }
    };
  }
});

// src/providers/html/provider.ts
var HTMLMediaProvider;
var init_provider2 = __esm({
  "src/providers/html/provider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_mime();
    init_audio_gain();
    init_html_media_events();
    init_native_audio_tracks();
    HTMLMediaProvider = class {
      constructor(media, ctx) {
        this.media = media;
        this.ctx = ctx;
      }
      scope = createScope();
      currentSrc = null;
      audioGain = new AudioGain(this.media, (gain) => {
        this.ctx.notify("audio-gain-change", gain);
      });
      setup() {
        new HTMLMediaEvents(this, this.ctx);
        if ("audioTracks" in this.media) new NativeAudioTracks(this, this.ctx);
        onDispose(() => {
          this.audioGain.destroy();
          this.media.srcObject = null;
          this.media.removeAttribute("src");
          for (const source of this.media.querySelectorAll("source")) source.remove();
          this.media.load();
        });
      }
      get type() {
        return "";
      }
      setPlaybackRate(rate) {
        this.media.playbackRate = rate;
      }
      async play() {
        return this.media.play();
      }
      async pause() {
        return this.media.pause();
      }
      setMuted(muted) {
        this.media.muted = muted;
      }
      setVolume(volume) {
        this.media.volume = volume;
      }
      setCurrentTime(time) {
        this.media.currentTime = time;
      }
      setPlaysInline(inline2) {
        setAttribute(this.media, "playsinline", inline2);
      }
      async loadSource({ src, type }, preload) {
        this.media.preload = preload || "";
        if (isMediaStream(src)) {
          this.removeSource();
          this.media.srcObject = src;
        } else {
          this.media.srcObject = null;
          if (isString(src)) {
            if (type !== "?") {
              this.appendSource({ src, type });
            } else {
              this.removeSource();
              this.media.src = this.#appendMediaFragment(src);
            }
          } else {
            this.removeSource();
            this.media.src = window.URL.createObjectURL(src);
          }
        }
        this.media.load();
        this.currentSrc = { src, type };
      }
      /**
       * Append source so it works when requesting AirPlay since hls.js will remove it.
       */
      appendSource(src, defaultType) {
        const prevSource = this.media.querySelector("source[data-vds]"), source = prevSource ?? document.createElement("source");
        setAttribute(source, "src", this.#appendMediaFragment(src.src));
        setAttribute(source, "type", src.type !== "?" ? src.type : defaultType);
        setAttribute(source, "data-vds", "");
        if (!prevSource) this.media.append(source);
      }
      removeSource() {
        this.media.querySelector("source[data-vds]")?.remove();
      }
      #appendMediaFragment(src) {
        const { clipStartTime, clipEndTime } = this.ctx.$state, startTime = clipStartTime(), endTime = clipEndTime();
        if (startTime > 0 && endTime > 0) {
          return `${src}#t=${startTime},${endTime}`;
        } else if (startTime > 0) {
          return `${src}#t=${startTime}`;
        } else if (endTime > 0) {
          return `${src}#t=0,${endTime}`;
        }
        return src;
      }
    };
  }
});

// src/providers/html/remote-playback.ts
var HTMLRemotePlaybackAdapter, HTMLAirPlayAdapter;
var init_remote_playback = __esm({
  "src/providers/html/remote-playback.ts"() {
    "use strict";
    init_prod();
    init_std();
    HTMLRemotePlaybackAdapter = class {
      #media;
      #ctx;
      #state;
      #supported = signal(false);
      get supported() {
        return this.#supported();
      }
      constructor(media, ctx) {
        this.#media = media;
        this.#ctx = ctx;
        this.#setup();
      }
      #setup() {
        if (!this.#media?.remote || !this.canPrompt) return;
        this.#media.remote.watchAvailability((available) => {
          this.#supported.set(available);
        }).catch(() => {
          this.#supported.set(false);
        });
        effect(this.#watchSupported.bind(this));
      }
      #watchSupported() {
        if (!this.#supported()) return;
        const events = ["connecting", "connect", "disconnect"], onStateChange = this.#onStateChange.bind(this);
        onStateChange();
        listenEvent(this.#media, "playing", onStateChange);
        for (const type of events) {
          listenEvent(this.#media.remote, type, onStateChange);
        }
      }
      async prompt() {
        if (!this.supported) throw Error("Not supported on this platform.");
        if (this.type === "airplay" && this.#media.webkitShowPlaybackTargetPicker) {
          return this.#media.webkitShowPlaybackTargetPicker();
        }
        return this.#media.remote.prompt();
      }
      #onStateChange(event2) {
        const state = this.#media.remote.state;
        if (state === this.#state) return;
        const detail = { type: this.type, state };
        this.#ctx.notify("remote-playback-change", detail, event2);
        this.#state = state;
      }
    };
    HTMLAirPlayAdapter = class extends HTMLRemotePlaybackAdapter {
      type = "airplay";
      get canPrompt() {
        return "WebKitPlaybackTargetAvailabilityEvent" in window;
      }
    };
  }
});

// src/providers/audio/provider.ts
var provider_exports2 = {};
__export(provider_exports2, {
  AudioProvider: () => AudioProvider
});
var AudioProvider;
var init_provider3 = __esm({
  "src/providers/audio/provider.ts"() {
    "use strict";
    init_prod();
    init_provider2();
    init_remote_playback();
    AudioProvider = class extends HTMLMediaProvider {
      $$PROVIDER_TYPE = "AUDIO";
      get type() {
        return "audio";
      }
      airPlay;
      constructor(audio, ctx) {
        super(audio, ctx);
        scoped(() => {
          this.airPlay = new HTMLAirPlayAdapter(this.media, ctx);
        }, this.scope);
      }
      setup() {
        super.setup();
        if (this.type === "audio") this.ctx.notify("provider-setup", this);
      }
      /**
       * The native HTML `<audio>` element.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
       */
      get audio() {
        return this.media;
      }
    };
  }
});

// src/providers/video/native-hls-text-tracks.ts
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}
var NativeHLSTextTracks;
var init_native_hls_text_tracks = __esm({
  "src/providers/video/native-hls-text-tracks.ts"() {
    "use strict";
    init_prod();
    init_symbols();
    init_text_track();
    NativeHLSTextTracks = class {
      #video;
      #ctx;
      constructor(video, ctx) {
        this.#video = video;
        this.#ctx = ctx;
        video.textTracks.onaddtrack = this.#onAddTrack.bind(this);
        onDispose(this.#onDispose.bind(this));
      }
      #onAddTrack(event2) {
        const nativeTrack = event2.track;
        if (!nativeTrack || findTextTrackElement(this.#video, nativeTrack)) return;
        const track = new TextTrack({
          id: nativeTrack.id,
          kind: nativeTrack.kind,
          label: nativeTrack.label ?? "",
          language: nativeTrack.language,
          type: "vtt"
        });
        track[TextTrackSymbol.native] = { track: nativeTrack };
        track[TextTrackSymbol.readyState] = 2;
        track[TextTrackSymbol.nativeHLS] = true;
        let lastIndex = 0;
        const onCueChange = (event3) => {
          if (!nativeTrack.cues) return;
          for (let i3 = lastIndex; i3 < nativeTrack.cues.length; i3++) {
            track.addCue(nativeTrack.cues[i3], event3);
            lastIndex++;
          }
        };
        onCueChange(event2);
        nativeTrack.oncuechange = onCueChange;
        this.#ctx.textTracks.add(track, event2);
        track.setMode(nativeTrack.mode, event2);
      }
      #onDispose() {
        this.#video.textTracks.onaddtrack = null;
        for (const track of this.#ctx.textTracks) {
          const nativeTrack = track[TextTrackSymbol.native]?.track;
          if (nativeTrack?.oncuechange) nativeTrack.oncuechange = null;
        }
      }
    };
  }
});

// src/providers/video/picture-in-picture.ts
var VideoPictureInPicture;
var init_picture_in_picture = __esm({
  "src/providers/video/picture-in-picture.ts"() {
    "use strict";
    init_std();
    init_support();
    VideoPictureInPicture = class {
      #video;
      #media;
      constructor(video, media) {
        this.#video = video;
        this.#media = media;
        listenEvent(video, "enterpictureinpicture", this.#onEnter.bind(this));
        listenEvent(video, "leavepictureinpicture", this.#onExit.bind(this));
      }
      get active() {
        return document.pictureInPictureElement === this.#video;
      }
      get supported() {
        return canUsePictureInPicture(this.#video);
      }
      async enter() {
        return this.#video.requestPictureInPicture();
      }
      exit() {
        return document.exitPictureInPicture();
      }
      #onEnter(event2) {
        this.#onChange(true, event2);
      }
      #onExit(event2) {
        this.#onChange(false, event2);
      }
      #onChange = (active, event2) => {
        this.#media.notify("picture-in-picture-change", active, event2);
      };
    };
  }
});

// src/providers/video/presentation/video-presentation.ts
var VideoPresentation, FullscreenPresentationAdapter, PIPPresentationAdapter;
var init_video_presentation = __esm({
  "src/providers/video/presentation/video-presentation.ts"() {
    "use strict";
    init_std();
    init_support();
    VideoPresentation = class {
      #video;
      #media;
      #mode = "inline";
      get mode() {
        return this.#mode;
      }
      constructor(video, media) {
        this.#video = video;
        this.#media = media;
        listenEvent(video, "webkitpresentationmodechanged", this.#onModeChange.bind(this));
      }
      get supported() {
        return canUseVideoPresentation(this.#video);
      }
      async setPresentationMode(mode) {
        if (this.#mode === mode) return;
        this.#video.webkitSetPresentationMode(mode);
      }
      #onModeChange(event2) {
        const prevMode = this.#mode;
        this.#mode = this.#video.webkitPresentationMode;
        if (true) {
          this.#media.logger?.infoGroup("presentation mode change").labelledLog("Mode", this.#mode).labelledLog("Event", event2).dispatch();
        }
        this.#media.player?.dispatch(
          new DOMEvent("video-presentation-change", {
            detail: this.#mode,
            trigger: event2
          })
        );
        ["fullscreen", "picture-in-picture"].forEach((type) => {
          if (this.#mode === type || prevMode === type) {
            this.#media.notify(`${type}-change`, this.#mode === type, event2);
          }
        });
      }
    };
    FullscreenPresentationAdapter = class {
      #presentation;
      get active() {
        return this.#presentation.mode === "fullscreen";
      }
      get supported() {
        return this.#presentation.supported;
      }
      constructor(presentation) {
        this.#presentation = presentation;
      }
      async enter() {
        this.#presentation.setPresentationMode("fullscreen");
      }
      async exit() {
        this.#presentation.setPresentationMode("inline");
      }
    };
    PIPPresentationAdapter = class {
      #presentation;
      get active() {
        return this.#presentation.mode === "picture-in-picture";
      }
      get supported() {
        return this.#presentation.supported;
      }
      constructor(presentation) {
        this.#presentation = presentation;
      }
      async enter() {
        this.#presentation.setPresentationMode("picture-in-picture");
      }
      async exit() {
        this.#presentation.setPresentationMode("inline");
      }
    };
  }
});

// src/providers/video/provider.ts
var provider_exports3 = {};
__export(provider_exports3, {
  VideoProvider: () => VideoProvider
});
var VideoProvider;
var init_provider4 = __esm({
  "src/providers/video/provider.ts"() {
    "use strict";
    init_prod();
    init_support();
    init_provider2();
    init_remote_playback();
    init_native_hls_text_tracks();
    init_picture_in_picture();
    init_video_presentation();
    VideoProvider = class extends HTMLMediaProvider {
      $$PROVIDER_TYPE = "VIDEO";
      get type() {
        return "video";
      }
      airPlay;
      fullscreen;
      pictureInPicture;
      constructor(video, ctx) {
        super(video, ctx);
        scoped(() => {
          this.airPlay = new HTMLAirPlayAdapter(video, ctx);
          if (canUseVideoPresentation(video)) {
            const presentation = new VideoPresentation(video, ctx);
            this.fullscreen = new FullscreenPresentationAdapter(presentation);
            this.pictureInPicture = new PIPPresentationAdapter(presentation);
          } else if (canUsePictureInPicture(video)) {
            this.pictureInPicture = new VideoPictureInPicture(video, ctx);
          }
        }, this.scope);
      }
      setup() {
        super.setup();
        if (canPlayHLSNatively(this.video)) {
          new NativeHLSTextTracks(this.video, this.ctx);
        }
        this.ctx.textRenderers.attachVideo(this.video);
        onDispose(() => {
          this.ctx.textRenderers.attachVideo(null);
        });
        if (this.type === "video") this.ctx.notify("provider-setup", this);
      }
      /**
       * The native HTML `<video>` element.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
       */
      get video() {
        return this.media;
      }
    };
  }
});

// src/utils/language.ts
function getLangName(langCode) {
  try {
    const displayNames = new Intl.DisplayNames(navigator.languages, { type: "language" });
    const languageName = displayNames.of(langCode);
    return languageName ?? null;
  } catch (err) {
    return null;
  }
}
var init_language = __esm({
  "src/utils/language.ts"() {
    "use strict";
  }
});

// src/providers/dash/dash.ts
var toDOMEventType, DASHController;
var init_dash = __esm({
  "src/providers/dash/dash.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_symbols3();
    init_symbols();
    init_text_track();
    init_symbols2();
    init_raf_loop();
    init_language();
    init_support();
    toDOMEventType = (type) => `dash-${camelToKebabCase(type)}`;
    DASHController = class {
      #video;
      #ctx;
      #instance = null;
      #callbacks = /* @__PURE__ */ new Set();
      #stopLiveSync = null;
      config = {};
      get instance() {
        return this.#instance;
      }
      constructor(video, ctx) {
        this.#video = video;
        this.#ctx = ctx;
      }
      setup(ctor) {
        this.#instance = ctor().create();
        const dispatcher = this.#dispatchDASHEvent.bind(this);
        for (const event2 of Object.values(ctor.events)) this.#instance.on(event2, dispatcher);
        this.#instance.on(ctor.events.ERROR, this.#onError.bind(this));
        for (const callback of this.#callbacks) callback(this.#instance);
        this.#ctx.player.dispatch("dash-instance", {
          detail: this.#instance
        });
        this.#instance.initialize(this.#video, void 0, false);
        this.#instance.updateSettings({
          streaming: {
            text: {
              // Disabling text rendering by dash.
              defaultEnabled: false,
              dispatchForManualRendering: true
            },
            buffer: {
              /// Enables buffer replacement when switching bitrates for faster switching.
              fastSwitchEnabled: true
            }
          },
          ...this.config
        });
        this.#instance.on(ctor.events.FRAGMENT_LOADING_STARTED, this.#onFragmentLoadStart.bind(this));
        this.#instance.on(
          ctor.events.FRAGMENT_LOADING_COMPLETED,
          this.#onFragmentLoadComplete.bind(this)
        );
        this.#instance.on(ctor.events.MANIFEST_LOADED, this.#onManifestLoaded.bind(this));
        this.#instance.on(ctor.events.QUALITY_CHANGE_RENDERED, this.#onQualityChange.bind(this));
        this.#instance.on(ctor.events.TEXT_TRACKS_ADDED, this.#onTextTracksAdded.bind(this));
        this.#instance.on(ctor.events.TRACK_CHANGE_RENDERED, this.#onTrackChange.bind(this));
        this.#ctx.qualities[QualitySymbol.enableAuto] = this.#enableAutoQuality.bind(this);
        listenEvent(this.#ctx.qualities, "change", this.#onUserQualityChange.bind(this));
        listenEvent(this.#ctx.audioTracks, "change", this.#onUserAudioChange.bind(this));
        this.#stopLiveSync = effect(this.#liveSync.bind(this));
      }
      #createDOMEvent(event2) {
        return new DOMEvent(toDOMEventType(event2.type), { detail: event2 });
      }
      #liveSync() {
        if (!this.#ctx.$state.live()) return;
        const raf = new RAFLoop(this.#liveSyncPosition.bind(this));
        raf.start();
        return raf.stop.bind(raf);
      }
      #liveSyncPosition() {
        if (!this.#instance) return;
        const position = this.#instance.duration() - this.#instance.time();
        this.#ctx.$state.liveSyncPosition.set(!isNaN(position) ? position : Infinity);
      }
      #dispatchDASHEvent(event2) {
        this.#ctx.player?.dispatch(this.#createDOMEvent(event2));
      }
      #currentTrack = null;
      #cueTracker = {};
      #onTextFragmentLoaded(event2) {
        const native = this.#currentTrack?.[TextTrackSymbol.native], cues = (native?.track).cues;
        if (!native || !cues) return;
        const id2 = this.#currentTrack.id, startIndex = this.#cueTracker[id2] ?? 0, trigger = this.#createDOMEvent(event2);
        for (let i3 = startIndex; i3 < cues.length; i3++) {
          const cue = cues[i3];
          if (!cue.positionAlign) cue.positionAlign = "auto";
          this.#currentTrack.addCue(cue, trigger);
        }
        this.#cueTracker[id2] = cues.length;
      }
      #onTextTracksAdded(event2) {
        if (!this.#instance) return;
        const data = event2.tracks, nativeTextTracks = [...this.#video.textTracks].filter((track) => "manualMode" in track), trigger = this.#createDOMEvent(event2);
        for (let i3 = 0; i3 < nativeTextTracks.length; i3++) {
          const textTrackInfo = data[i3], nativeTextTrack = nativeTextTracks[i3];
          const id2 = `dash-${textTrackInfo.kind}-${i3}`, track = new TextTrack({
            id: id2,
            label: textTrackInfo?.label ?? textTrackInfo.labels.find((t5) => t5.text)?.text ?? (textTrackInfo?.lang && getLangName(textTrackInfo.lang)) ?? textTrackInfo?.lang ?? void 0,
            language: textTrackInfo.lang ?? void 0,
            kind: textTrackInfo.kind,
            default: textTrackInfo.defaultTrack
          });
          track[TextTrackSymbol.native] = {
            managed: true,
            track: nativeTextTrack
          };
          track[TextTrackSymbol.readyState] = 2;
          track[TextTrackSymbol.onModeChange] = () => {
            if (!this.#instance) return;
            if (track.mode === "showing") {
              this.#instance.setTextTrack(i3);
              this.#currentTrack = track;
            } else {
              this.#instance.setTextTrack(-1);
              this.#currentTrack = null;
            }
          };
          this.#ctx.textTracks.add(track, trigger);
        }
      }
      #onTrackChange(event2) {
        const { mediaType, newMediaInfo } = event2;
        if (mediaType === "audio") {
          const track = this.#ctx.audioTracks.getById(`dash-audio-${newMediaInfo.index}`);
          if (track) {
            const trigger = this.#createDOMEvent(event2);
            this.#ctx.audioTracks[ListSymbol.select](track, true, trigger);
          }
        }
      }
      #onQualityChange(event2) {
        if (event2.mediaType !== "video") return;
        const quality = this.#ctx.qualities[event2.newQuality];
        if (quality) {
          const trigger = this.#createDOMEvent(event2);
          this.#ctx.qualities[ListSymbol.select](quality, true, trigger);
        }
      }
      #onManifestLoaded(event2) {
        if (this.#ctx.$state.canPlay() || !this.#instance) return;
        const { type, mediaPresentationDuration } = event2.data, trigger = this.#createDOMEvent(event2);
        this.#ctx.notify("stream-type-change", type !== "static" ? "live" : "on-demand", trigger);
        this.#ctx.notify("duration-change", mediaPresentationDuration, trigger);
        this.#ctx.qualities[QualitySymbol.setAuto](true, trigger);
        const media = this.#instance.getVideoElement();
        const videoQualities = this.#instance.getTracksForTypeFromManifest(
          "video",
          event2.data
        );
        const supportedVideoMimeType = [...new Set(videoQualities.map((e6) => e6.mimeType))].find(
          (type2) => type2 && canPlayVideoType(media, type2)
        );
        const videoQuality = videoQualities.filter(
          (track) => supportedVideoMimeType === track.mimeType
        )[0];
        let audioTracks = this.#instance.getTracksForTypeFromManifest(
          "audio",
          event2.data
        );
        const supportedAudioMimeType = [...new Set(audioTracks.map((e6) => e6.mimeType))].find(
          (type2) => type2 && canPlayAudioType(media, type2)
        );
        audioTracks = audioTracks.filter((track) => supportedAudioMimeType === track.mimeType);
        videoQuality.bitrateList.forEach((bitrate, index) => {
          const quality = {
            id: bitrate.id?.toString() ?? `dash-bitrate-${index}`,
            width: bitrate.width ?? 0,
            height: bitrate.height ?? 0,
            bitrate: bitrate.bandwidth ?? 0,
            codec: videoQuality.codec,
            index
          };
          this.#ctx.qualities[ListSymbol.add](quality, trigger);
        });
        if (isNumber(videoQuality.index)) {
          const quality = this.#ctx.qualities[videoQuality.index];
          if (quality) this.#ctx.qualities[ListSymbol.select](quality, true, trigger);
        }
        audioTracks.forEach((audioTrack, index) => {
          const matchingLabel = audioTrack.labels.find((label2) => {
            return navigator.languages.some((language) => {
              return label2.lang && language.toLowerCase().startsWith(label2.lang.toLowerCase());
            });
          });
          const label = matchingLabel || audioTrack.labels[0];
          const localTrack = {
            id: `dash-audio-${audioTrack?.index}`,
            label: label?.text ?? (audioTrack.lang && getLangName(audioTrack.lang)) ?? audioTrack.lang ?? "",
            language: audioTrack.lang ?? "",
            kind: "main",
            mimeType: audioTrack.mimeType,
            codec: audioTrack.codec,
            index
          };
          this.#ctx.audioTracks[ListSymbol.add](localTrack, trigger);
        });
        media.dispatchEvent(new DOMEvent("canplay", { trigger }));
      }
      #onError(event2) {
        const { type: eventType, error: data } = event2;
        if (true) {
          this.#ctx.logger?.errorGroup(`[vidstack] DASH error \`${data.message}\``).labelledLog("Media Element", this.#video).labelledLog("DASH Instance", this.#instance).labelledLog("Event Type", eventType).labelledLog("Data", data).labelledLog("Src", peek(this.#ctx.$state.source)).labelledLog("Media Store", { ...this.#ctx.$state }).dispatch();
        }
        switch (data.code) {
          case 27:
            this.#onNetworkError(data);
            break;
          default:
            this.#onFatalError(data);
            break;
        }
      }
      #onFragmentLoadStart() {
        if (this.#retryLoadingTimer >= 0) this.#clearRetryTimer();
      }
      #onFragmentLoadComplete(event2) {
        const mediaType = event2.mediaType;
        if (mediaType === "text") {
          requestAnimationFrame(this.#onTextFragmentLoaded.bind(this, event2));
        }
      }
      #retryLoadingTimer = -1;
      #onNetworkError(error) {
        this.#clearRetryTimer();
        this.#instance?.play();
        this.#retryLoadingTimer = window.setTimeout(() => {
          this.#retryLoadingTimer = -1;
          this.#onFatalError(error);
        }, 5e3);
      }
      #clearRetryTimer() {
        clearTimeout(this.#retryLoadingTimer);
        this.#retryLoadingTimer = -1;
      }
      #onFatalError(error) {
        this.#ctx.notify("error", {
          message: error.message ?? "",
          code: 1,
          error
        });
      }
      #enableAutoQuality() {
        this.#switchAutoBitrate("video", true);
        const { qualities } = this.#ctx;
        this.#instance?.setQualityFor("video", qualities.selectedIndex, true);
      }
      #switchAutoBitrate(type, auto) {
        this.#instance?.updateSettings({
          streaming: { abr: { autoSwitchBitrate: { [type]: auto } } }
        });
      }
      #onUserQualityChange() {
        const { qualities } = this.#ctx;
        if (!this.#instance || qualities.auto || !qualities.selected) return;
        this.#switchAutoBitrate("video", false);
        this.#instance.setQualityFor("video", qualities.selectedIndex, qualities.switch === "current");
        if (IS_CHROME) {
          this.#video.currentTime = this.#video.currentTime;
        }
      }
      #onUserAudioChange() {
        if (!this.#instance) return;
        const { audioTracks } = this.#ctx, selectedTrack = this.#instance.getTracksFor("audio").find(
          (track) => audioTracks.selected && audioTracks.selected.id === `dash-audio-${track.index}`
        );
        if (selectedTrack) this.#instance.setCurrentTrack(selectedTrack);
      }
      #reset() {
        this.#clearRetryTimer();
        this.#currentTrack = null;
        this.#cueTracker = {};
      }
      onInstance(callback) {
        this.#callbacks.add(callback);
        return () => this.#callbacks.delete(callback);
      }
      loadSource(src) {
        this.#reset();
        if (!isString(src.src)) return;
        this.#instance?.attachSource(src.src);
      }
      destroy() {
        this.#reset();
        this.#instance?.destroy();
        this.#instance = null;
        this.#stopLiveSync?.();
        this.#stopLiveSync = null;
        if (true) this.#ctx?.logger?.info("\u{1F3D7}\uFE0F Destroyed DASH instance");
      }
    };
  }
});

// src/providers/dash/lib-loader.ts
async function importDASH(loader, callbacks = {}) {
  if (isUndefined(loader)) return void 0;
  callbacks.onLoadStart?.();
  if (isDASHConstructor(loader)) {
    callbacks.onLoaded?.(loader);
    return loader;
  }
  if (isDASHNamespace(loader)) {
    const ctor = loader.MediaPlayer;
    callbacks.onLoaded?.(ctor);
    return ctor;
  }
  try {
    const ctor = (await loader())?.default;
    if (isDASHNamespace(ctor)) {
      callbacks.onLoaded?.(ctor.MediaPlayer);
      return ctor.MediaPlayer;
    }
    if (ctor) {
      callbacks.onLoaded?.(ctor);
    } else {
      throw Error(
        true ? "[vidstack] failed importing `dash.js`. Dynamic import returned invalid object." : ""
      );
    }
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
async function loadDASHScript(src, callbacks = {}) {
  if (!isString(src)) return void 0;
  callbacks.onLoadStart?.();
  try {
    await loadScript(src);
    if (!isFunction(window.dashjs.MediaPlayer)) {
      throw Error(
        true ? "[vidstack] failed loading `dash.js`. Could not find a valid `Dash` constructor on window" : ""
      );
    }
    const ctor = window.dashjs.MediaPlayer;
    callbacks.onLoaded?.(ctor);
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
function isDASHConstructor(value) {
  return value && value.prototype && value.prototype !== Function;
}
function isDASHNamespace(value) {
  return value && "MediaPlayer" in value;
}
var DASHLibLoader;
var init_lib_loader = __esm({
  "src/providers/dash/lib-loader.ts"() {
    "use strict";
    init_std();
    init_error();
    init_network();
    DASHLibLoader = class {
      #lib;
      #ctx;
      #callback;
      constructor(lib, ctx, callback) {
        this.#lib = lib;
        this.#ctx = ctx;
        this.#callback = callback;
        this.#startLoading();
      }
      async #startLoading() {
        if (true) this.#ctx.logger?.info("\u{1F3D7}\uFE0F Loading DASH Library");
        const callbacks = {
          onLoadStart: this.#onLoadStart.bind(this),
          onLoaded: this.#onLoaded.bind(this),
          onLoadError: this.#onLoadError.bind(this)
        };
        let ctor = await loadDASHScript(this.#lib, callbacks);
        if (isUndefined(ctor) && !isString(this.#lib)) ctor = await importDASH(this.#lib, callbacks);
        if (!ctor) return null;
        if (!window.dashjs.supportsMediaSource()) {
          const message = "[vidstack] `dash.js` is not supported in this environment";
          if (true) this.#ctx.logger?.error(message);
          this.#ctx.player.dispatch(new DOMEvent("dash-unsupported"));
          this.#ctx.notify("error", { message, code: 4 });
          return null;
        }
        return ctor;
      }
      #onLoadStart() {
        if (true) {
          this.#ctx.logger?.infoGroup("Starting to load `dash.js`").labelledLog("URL", this.#lib).dispatch();
        }
        this.#ctx.player.dispatch(new DOMEvent("dash-lib-load-start"));
      }
      #onLoaded(ctor) {
        if (true) {
          this.#ctx.logger?.infoGroup("Loaded `dash.js`").labelledLog("Library", this.#lib).labelledLog("Constructor", ctor).dispatch();
        }
        this.#ctx.player.dispatch(
          new DOMEvent("dash-lib-loaded", {
            detail: ctor
          })
        );
        this.#callback(ctor);
      }
      #onLoadError(e6) {
        const error = coerceToError(e6);
        if (true) {
          this.#ctx.logger?.errorGroup("[vidstack] Failed to load `dash.js`").labelledLog("Library", this.#lib).labelledLog("Error", e6).dispatch();
        }
        this.#ctx.player.dispatch(
          new DOMEvent("dash-lib-load-error", {
            detail: error
          })
        );
        this.#ctx.notify("error", {
          message: error.message,
          code: 4,
          error
        });
      }
    };
  }
});

// src/providers/dash/provider.ts
var provider_exports4 = {};
__export(provider_exports4, {
  DASHProvider: () => DASHProvider
});
var JS_DELIVR_CDN, DASHProvider;
var init_provider5 = __esm({
  "src/providers/dash/provider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_network();
    init_support();
    init_provider4();
    init_dash();
    init_lib_loader();
    JS_DELIVR_CDN = "https://cdn.jsdelivr.net";
    DASHProvider = class extends VideoProvider {
      $$PROVIDER_TYPE = "DASH";
      #ctor = null;
      #controller = new DASHController(this.video, this.ctx);
      /**
       * The `dash.js` constructor.
       */
      get ctor() {
        return this.#ctor;
      }
      /**
       * The current `dash.js` instance.
       */
      get instance() {
        return this.#controller.instance;
      }
      /**
       * Whether `dash.js` is supported in this environment.
       */
      static supported = isDASHSupported();
      get type() {
        return "dash";
      }
      get canLiveSync() {
        return true;
      }
      #library = `${JS_DELIVR_CDN}/npm/dashjs@4.7.4/dist/dash${true ? ".all.debug.js" : ".all.min.js"}`;
      /**
       * The `dash.js` configuration object.
       *
       * @see {@link https://cdn.dashjs.org/latest/jsdoc/module-Settings.html}
       */
      get config() {
        return this.#controller.config;
      }
      set config(config) {
        this.#controller.config = config;
      }
      /**
       * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
       *
       * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
       */
      get library() {
        return this.#library;
      }
      set library(library) {
        this.#library = library;
      }
      preconnect() {
        if (!isString(this.#library)) return;
        preconnect(this.#library);
      }
      setup() {
        super.setup();
        new DASHLibLoader(this.#library, this.ctx, (ctor) => {
          this.#ctor = ctor;
          this.#controller.setup(ctor);
          this.ctx.notify("provider-setup", this);
          const src = peek(this.ctx.$state.source);
          if (src) this.loadSource(src);
        });
      }
      async loadSource(src, preload) {
        if (!isString(src.src)) {
          this.removeSource();
          return;
        }
        this.media.preload = preload || "";
        this.appendSource(src, "application/x-mpegurl");
        this.#controller.loadSource(src);
        this.currentSrc = src;
      }
      /**
       * The given callback is invoked when a new `dash.js` instance is created and right before it's
       * attached to media.
       */
      onInstance(callback) {
        const instance = this.#controller.instance;
        if (instance) callback(instance);
        return this.#controller.onInstance(callback);
      }
      destroy() {
        this.#controller.destroy();
      }
    };
  }
});

// src/providers/hls/hls.ts
var toDOMEventType2, HLSController;
var init_hls = __esm({
  "src/providers/hls/hls.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_symbols3();
    init_symbols();
    init_text_track();
    init_symbols2();
    init_raf_loop();
    init_support();
    toDOMEventType2 = (type) => camelToKebabCase(type);
    HLSController = class {
      #video;
      #ctx;
      #instance = null;
      #stopLiveSync = null;
      config = {};
      #callbacks = /* @__PURE__ */ new Set();
      get instance() {
        return this.#instance;
      }
      constructor(video, ctx) {
        this.#video = video;
        this.#ctx = ctx;
      }
      setup(ctor) {
        const { streamType } = this.#ctx.$state;
        const isLive = peek(streamType).includes("live"), isLiveLowLatency = peek(streamType).includes("ll-");
        this.#instance = new ctor({
          lowLatencyMode: isLiveLowLatency,
          backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
          renderTextTracksNatively: false,
          ...this.config
        });
        const dispatcher = this.#dispatchHLSEvent.bind(this);
        for (const event2 of Object.values(ctor.Events)) this.#instance.on(event2, dispatcher);
        this.#instance.on(ctor.Events.ERROR, this.#onError.bind(this));
        for (const callback of this.#callbacks) callback(this.#instance);
        this.#ctx.player.dispatch("hls-instance", {
          detail: this.#instance
        });
        this.#instance.attachMedia(this.#video);
        this.#instance.on(ctor.Events.AUDIO_TRACK_SWITCHED, this.#onAudioSwitch.bind(this));
        this.#instance.on(ctor.Events.LEVEL_SWITCHED, this.#onLevelSwitched.bind(this));
        this.#instance.on(ctor.Events.LEVEL_LOADED, this.#onLevelLoaded.bind(this));
        this.#instance.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this.#onTracksFound.bind(this));
        this.#instance.on(ctor.Events.CUES_PARSED, this.#onCuesParsed.bind(this));
        this.#ctx.qualities[QualitySymbol.enableAuto] = this.#enableAutoQuality.bind(this);
        listenEvent(this.#ctx.qualities, "change", this.#onUserQualityChange.bind(this));
        listenEvent(this.#ctx.audioTracks, "change", this.#onUserAudioChange.bind(this));
        this.#stopLiveSync = effect(this.#liveSync.bind(this));
      }
      #createDOMEvent(type, data) {
        return new DOMEvent(toDOMEventType2(type), { detail: data });
      }
      #liveSync() {
        if (!this.#ctx.$state.live()) return;
        const raf = new RAFLoop(this.#liveSyncPosition.bind(this));
        raf.start();
        return raf.stop.bind(raf);
      }
      #liveSyncPosition() {
        this.#ctx.$state.liveSyncPosition.set(this.#instance?.liveSyncPosition ?? Infinity);
      }
      #dispatchHLSEvent(type, data) {
        this.#ctx.player?.dispatch(this.#createDOMEvent(type, data));
      }
      #onTracksFound(eventType, data) {
        const event2 = this.#createDOMEvent(eventType, data);
        let currentTrack = -1;
        for (let i3 = 0; i3 < data.tracks.length; i3++) {
          const nonNativeTrack = data.tracks[i3], init2 = nonNativeTrack.subtitleTrack ?? nonNativeTrack.closedCaptions, track = new TextTrack({
            id: `hls-${nonNativeTrack.kind}-${i3}`,
            src: init2?.url,
            label: nonNativeTrack.label,
            language: init2?.lang,
            kind: nonNativeTrack.kind,
            default: nonNativeTrack.default
          });
          track[TextTrackSymbol.readyState] = 2;
          track[TextTrackSymbol.onModeChange] = () => {
            if (track.mode === "showing") {
              this.#instance.subtitleTrack = i3;
              currentTrack = i3;
            } else if (currentTrack === i3) {
              this.#instance.subtitleTrack = -1;
              currentTrack = -1;
            }
          };
          this.#ctx.textTracks.add(track, event2);
        }
      }
      #onCuesParsed(eventType, data) {
        const index = this.#instance?.subtitleTrack, track = this.#ctx.textTracks.getById(`hls-${data.type}-${index}`);
        if (!track) return;
        const event2 = this.#createDOMEvent(eventType, data);
        for (const cue of data.cues) {
          cue.positionAlign = "auto";
          track.addCue(cue, event2);
        }
      }
      #onAudioSwitch(eventType, data) {
        const track = this.#ctx.audioTracks[data.id];
        if (track) {
          const trigger = this.#createDOMEvent(eventType, data);
          this.#ctx.audioTracks[ListSymbol.select](track, true, trigger);
        }
      }
      #onLevelSwitched(eventType, data) {
        const quality = this.#ctx.qualities[data.level];
        if (quality) {
          const trigger = this.#createDOMEvent(eventType, data);
          this.#ctx.qualities[ListSymbol.select](quality, true, trigger);
        }
      }
      #onLevelLoaded(eventType, data) {
        if (this.#ctx.$state.canPlay()) return;
        const { type, live, totalduration: duration, targetduration } = data.details, trigger = this.#createDOMEvent(eventType, data);
        this.#ctx.notify(
          "stream-type-change",
          live ? type === "EVENT" && Number.isFinite(duration) && targetduration >= 10 ? "live:dvr" : "live" : "on-demand",
          trigger
        );
        this.#ctx.notify("duration-change", duration, trigger);
        const media = this.#instance.media;
        if (this.#instance.currentLevel === -1) {
          this.#ctx.qualities[QualitySymbol.setAuto](true, trigger);
        }
        for (const remoteTrack of this.#instance.audioTracks) {
          const localTrack = {
            id: remoteTrack.id.toString(),
            label: remoteTrack.name,
            language: remoteTrack.lang || "",
            kind: "main"
          };
          this.#ctx.audioTracks[ListSymbol.add](localTrack, trigger);
        }
        for (const level of this.#instance.levels) {
          const videoQuality = {
            id: level.id?.toString() ?? level.height + "p",
            width: level.width,
            height: level.height,
            codec: level.codecSet,
            bitrate: level.bitrate
          };
          this.#ctx.qualities[ListSymbol.add](videoQuality, trigger);
        }
        media.dispatchEvent(new DOMEvent("canplay", { trigger }));
      }
      #onError(eventType, data) {
        if (true) {
          this.#ctx.logger?.errorGroup(`[vidstack] HLS error \`${eventType}\``).labelledLog("Media Element", this.#instance?.media).labelledLog("HLS Instance", this.#instance).labelledLog("Event Type", eventType).labelledLog("Data", data).labelledLog("Src", peek(this.#ctx.$state.source)).labelledLog("Media Store", { ...this.#ctx.$state }).dispatch();
        }
        if (data.fatal) {
          switch (data.type) {
            case "mediaError":
              this.#instance?.recoverMediaError();
              break;
            default:
              this.#onFatalError(data.error);
              break;
          }
        }
      }
      #onFatalError(error) {
        this.#ctx.notify("error", {
          message: error.message,
          code: 1,
          error
        });
      }
      #enableAutoQuality() {
        if (this.#instance) this.#instance.currentLevel = -1;
      }
      #onUserQualityChange() {
        const { qualities } = this.#ctx;
        if (!this.#instance || qualities.auto) return;
        this.#instance[qualities.switch + "Level"] = qualities.selectedIndex;
        if (IS_CHROME) {
          this.#video.currentTime = this.#video.currentTime;
        }
      }
      #onUserAudioChange() {
        const { audioTracks } = this.#ctx;
        if (this.#instance && this.#instance.audioTrack !== audioTracks.selectedIndex) {
          this.#instance.audioTrack = audioTracks.selectedIndex;
        }
      }
      onInstance(callback) {
        this.#callbacks.add(callback);
        return () => this.#callbacks.delete(callback);
      }
      loadSource(src) {
        if (!isString(src.src)) return;
        this.#instance?.loadSource(src.src);
      }
      destroy() {
        this.#instance?.destroy();
        this.#instance = null;
        this.#stopLiveSync?.();
        this.#stopLiveSync = null;
        if (true) this.#ctx?.logger?.info("\u{1F3D7}\uFE0F Destroyed HLS instance");
      }
    };
  }
});

// src/providers/hls/lib-loader.ts
async function importHLS(loader, callbacks = {}) {
  if (isUndefined(loader)) return void 0;
  callbacks.onLoadStart?.();
  if (loader.prototype && loader.prototype !== Function) {
    callbacks.onLoaded?.(loader);
    return loader;
  }
  try {
    const ctor = (await loader())?.default;
    if (ctor && !!ctor.isSupported) {
      callbacks.onLoaded?.(ctor);
    } else {
      throw Error(
        true ? "[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor." : ""
      );
    }
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
async function loadHLSScript(src, callbacks = {}) {
  if (!isString(src)) return void 0;
  callbacks.onLoadStart?.();
  try {
    await loadScript(src);
    if (!isFunction(window.Hls)) {
      throw Error(
        true ? "[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window" : ""
      );
    }
    const ctor = window.Hls;
    callbacks.onLoaded?.(ctor);
    return ctor;
  } catch (err) {
    callbacks.onLoadError?.(err);
  }
  return void 0;
}
var HLSLibLoader;
var init_lib_loader2 = __esm({
  "src/providers/hls/lib-loader.ts"() {
    "use strict";
    init_std();
    init_error();
    init_network();
    HLSLibLoader = class {
      #lib;
      #ctx;
      #callback;
      constructor(lib, ctx, callback) {
        this.#lib = lib;
        this.#ctx = ctx;
        this.#callback = callback;
        this.#startLoading();
      }
      async #startLoading() {
        if (true) this.#ctx.logger?.info("\u{1F3D7}\uFE0F Loading HLS Library");
        const callbacks = {
          onLoadStart: this.#onLoadStart.bind(this),
          onLoaded: this.#onLoaded.bind(this),
          onLoadError: this.#onLoadError.bind(this)
        };
        let ctor = await loadHLSScript(this.#lib, callbacks);
        if (isUndefined(ctor) && !isString(this.#lib)) ctor = await importHLS(this.#lib, callbacks);
        if (!ctor) return null;
        if (!ctor.isSupported()) {
          const message = "[vidstack] `hls.js` is not supported in this environment";
          if (true) this.#ctx.logger?.error(message);
          this.#ctx.player.dispatch(new DOMEvent("hls-unsupported"));
          this.#ctx.notify("error", { message, code: 4 });
          return null;
        }
        return ctor;
      }
      #onLoadStart() {
        if (true) {
          this.#ctx.logger?.infoGroup("Starting to load `hls.js`").labelledLog("URL", this.#lib).dispatch();
        }
        this.#ctx.player.dispatch(new DOMEvent("hls-lib-load-start"));
      }
      #onLoaded(ctor) {
        if (true) {
          this.#ctx.logger?.infoGroup("Loaded `hls.js`").labelledLog("Library", this.#lib).labelledLog("Constructor", ctor).dispatch();
        }
        this.#ctx.player.dispatch(
          new DOMEvent("hls-lib-loaded", {
            detail: ctor
          })
        );
        this.#callback(ctor);
      }
      #onLoadError(e6) {
        const error = coerceToError(e6);
        if (true) {
          this.#ctx.logger?.errorGroup("[vidstack] Failed to load `hls.js`").labelledLog("Library", this.#lib).labelledLog("Error", e6).dispatch();
        }
        this.#ctx.player.dispatch(
          new DOMEvent("hls-lib-load-error", {
            detail: error
          })
        );
        this.#ctx.notify("error", {
          message: error.message,
          code: 4,
          error
        });
      }
    };
  }
});

// src/providers/hls/provider.ts
var provider_exports5 = {};
__export(provider_exports5, {
  HLSProvider: () => HLSProvider
});
var JS_DELIVR_CDN2, HLSProvider;
var init_provider6 = __esm({
  "src/providers/hls/provider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_network();
    init_support();
    init_provider4();
    init_hls();
    init_lib_loader2();
    JS_DELIVR_CDN2 = "https://cdn.jsdelivr.net";
    HLSProvider = class extends VideoProvider {
      $$PROVIDER_TYPE = "HLS";
      #ctor = null;
      #controller = new HLSController(this.video, this.ctx);
      /**
       * The `hls.js` constructor.
       */
      get ctor() {
        return this.#ctor;
      }
      /**
       * The current `hls.js` instance.
       */
      get instance() {
        return this.#controller.instance;
      }
      /**
       * Whether `hls.js` is supported in this environment.
       */
      static supported = isHLSSupported();
      get type() {
        return "hls";
      }
      get canLiveSync() {
        return true;
      }
      #library = `${JS_DELIVR_CDN2}/npm/hls.js@^1.5.0/dist/hls${true ? ".js" : ".min.js"}`;
      /**
       * The `hls.js` configuration object.
       *
       * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
       */
      get config() {
        return this.#controller.config;
      }
      set config(config) {
        this.#controller.config = config;
      }
      /**
       * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
       *
       * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
       */
      get library() {
        return this.#library;
      }
      set library(library) {
        this.#library = library;
      }
      preconnect() {
        if (!isString(this.#library)) return;
        preconnect(this.#library);
      }
      setup() {
        super.setup();
        new HLSLibLoader(this.#library, this.ctx, (ctor) => {
          this.#ctor = ctor;
          this.#controller.setup(ctor);
          this.ctx.notify("provider-setup", this);
          const src = peek(this.ctx.$state.source);
          if (src) this.loadSource(src);
        });
      }
      async loadSource(src, preload) {
        if (!isString(src.src)) {
          this.removeSource();
          return;
        }
        this.media.preload = preload || "";
        this.appendSource(src, "application/x-mpegurl");
        this.#controller.loadSource(src);
        this.currentSrc = src;
      }
      /**
       * The given callback is invoked when a new `hls.js` instance is created and right before it's
       * attached to media.
       */
      onInstance(callback) {
        const instance = this.#controller.instance;
        if (instance) callback(instance);
        return this.#controller.onInstance(callback);
      }
      destroy() {
        this.#controller.destroy();
      }
    };
  }
});

// src/providers/embed/EmbedProvider.ts
var EmbedProvider;
var init_EmbedProvider = __esm({
  "src/providers/embed/EmbedProvider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_network();
    EmbedProvider = class {
      #iframe;
      src = signal("");
      /**
       * Defines which referrer is sent when fetching the resource.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
       */
      referrerPolicy = null;
      get iframe() {
        return this.#iframe;
      }
      constructor(iframe) {
        this.#iframe = iframe;
        iframe.setAttribute("frameBorder", "0");
        iframe.setAttribute("aria-hidden", "true");
        iframe.setAttribute(
          "allow",
          "autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"
        );
        if (this.referrerPolicy !== null) {
          iframe.setAttribute("referrerpolicy", this.referrerPolicy);
        }
      }
      setup() {
        listenEvent(window, "message", this.#onWindowMessage.bind(this));
        listenEvent(this.#iframe, "load", this.onLoad.bind(this));
        effect(this.#watchSrc.bind(this));
      }
      #watchSrc() {
        const src = this.src();
        if (!src.length) {
          this.#iframe.setAttribute("src", "");
          return;
        }
        const params = peek(() => this.buildParams());
        this.#iframe.setAttribute("src", appendParamsToURL(src, params));
      }
      postMessage(message, target) {
        if (false) return;
        this.#iframe.contentWindow?.postMessage(JSON.stringify(message), target ?? "*");
      }
      #onWindowMessage(event2) {
        const origin = this.getOrigin(), isOriginMatch = (event2.source === null || event2.source === this.#iframe?.contentWindow) && (!isString(origin) || origin === event2.origin);
        if (!isOriginMatch) return;
        try {
          const message = JSON.parse(event2.data);
          if (message) this.onMessage(message, event2);
          return;
        } catch (e6) {
        }
        if (event2.data) this.onMessage(event2.data, event2);
      }
    };
  }
});

// src/providers/vimeo/embed/event.ts
var trackedVimeoEvents;
var init_event = __esm({
  "src/providers/vimeo/embed/event.ts"() {
    "use strict";
    trackedVimeoEvents = [
      "bufferend",
      "bufferstart",
      // 'cuechange',
      "durationchange",
      "ended",
      "enterpictureinpicture",
      "error",
      "fullscreenchange",
      "leavepictureinpicture",
      "loaded",
      // 'loadeddata',
      // 'loadedmetadata',
      // 'loadstart',
      "playProgress",
      "loadProgress",
      "pause",
      "play",
      "playbackratechange",
      // 'progress',
      "qualitychange",
      "seeked",
      "seeking",
      // 'texttrackchange',
      "timeupdate",
      "volumechange",
      "waiting"
      // 'adstarted',
      // 'adcompleted',
      // 'aderror',
      // 'adskipped',
      // 'adallcompleted',
      // 'adclicked',
      // 'chapterchange',
      // 'chromecastconnected',
      // 'remoteplaybackavailabilitychange',
      // 'remoteplaybackconnecting',
      // 'remoteplaybackconnect',
      // 'remoteplaybackdisconnect',
      // 'liveeventended',
      // 'liveeventstarted',
      // 'livestreamoffline',
      // 'livestreamonline',
    ];
  }
});

// src/providers/vimeo/utils.ts
var utils_exports = {};
__export(utils_exports, {
  getVimeoVideoInfo: () => getVimeoVideoInfo,
  resolveVimeoVideoId: () => resolveVimeoVideoId
});
function resolveVimeoVideoId(src) {
  const matches = src.match(videoIdRE);
  return { videoId: matches?.[1], hash: matches?.[2] };
}
async function getVimeoVideoInfo(videoId, abort, videoHash) {
  if (infoCache.has(videoId)) return infoCache.get(videoId);
  if (pendingFetch.has(videoId)) return pendingFetch.get(videoId);
  let oembedSrc = `https://vimeo.com/api/oembed.json?url=https://player.vimeo.com/video/${videoId}`;
  if (videoHash) {
    oembedSrc = oembedSrc.concat(`?h=${videoHash}`);
  }
  const promise = window.fetch(oembedSrc, {
    mode: "cors",
    signal: abort.signal
  }).then((response) => response.json()).then((data) => {
    const thumnailRegex = /vimeocdn.com\/video\/(.*)?_/, thumbnailId = data?.thumbnail_url?.match(thumnailRegex)?.[1], poster = thumbnailId ? `https://i.vimeocdn.com/video/${thumbnailId}_1920x1080.webp` : "", info = {
      title: data?.title ?? "",
      duration: data?.duration ?? 0,
      poster,
      pro: data.account_type !== "basic"
    };
    infoCache.set(videoId, info);
    return info;
  }).finally(() => pendingFetch.delete(videoId));
  pendingFetch.set(videoId, promise);
  return promise;
}
var videoIdRE, infoCache, pendingFetch;
var init_utils3 = __esm({
  "src/providers/vimeo/utils.ts"() {
    "use strict";
    videoIdRE = /(?:https:\/\/)?(?:player\.)?vimeo(?:\.com)?\/(?:video\/)?(\d+)(?:(?:\?hash=|\?h=|\/)(.*))?/;
    infoCache = /* @__PURE__ */ new Map();
    pendingFetch = /* @__PURE__ */ new Map();
  }
});

// src/providers/vimeo/provider.ts
var provider_exports6 = {};
__export(provider_exports6, {
  VimeoProvider: () => VimeoProvider
});
var VimeoProvider;
var init_provider7 = __esm({
  "src/providers/vimeo/provider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_symbols3();
    init_time_ranges();
    init_text_track();
    init_symbols2();
    init_raf_loop();
    init_network();
    init_EmbedProvider();
    init_event();
    init_utils3();
    VimeoProvider = class extends EmbedProvider {
      $$PROVIDER_TYPE = "VIMEO";
      scope = createScope();
      fullscreen;
      #ctx;
      #videoId = signal("");
      #pro = signal(false);
      #hash = null;
      #currentSrc = null;
      #fullscreenActive = false;
      #seekableRange = new TimeRange(0, 0);
      #timeRAF = new RAFLoop(this.#onAnimationFrame.bind(this));
      #currentCue = null;
      #chaptersTrack = null;
      #promises = /* @__PURE__ */ new Map();
      #videoInfoPromise = null;
      constructor(iframe, ctx) {
        super(iframe);
        this.#ctx = ctx;
        const self = this;
        this.fullscreen = {
          get active() {
            return self.#fullscreenActive;
          },
          supported: true,
          enter: () => this.#remote("requestFullscreen"),
          exit: () => this.#remote("exitFullscreen")
        };
      }
      /**
       * Whether tracking session data should be enabled on the embed, including cookies and analytics.
       * This is turned off by default to be GDPR-compliant.
       *
       * @defaultValue `false`
       */
      cookies = false;
      title = true;
      byline = true;
      portrait = true;
      color = "00ADEF";
      get type() {
        return "vimeo";
      }
      get currentSrc() {
        return this.#currentSrc;
      }
      get videoId() {
        return this.#videoId();
      }
      get hash() {
        return this.#hash;
      }
      get isPro() {
        return this.#pro();
      }
      preconnect() {
        preconnect(this.getOrigin());
      }
      setup() {
        super.setup();
        effect(this.#watchVideoId.bind(this));
        effect(this.#watchVideoInfo.bind(this));
        effect(this.#watchPro.bind(this));
        this.#ctx.notify("provider-setup", this);
      }
      destroy() {
        this.#reset();
        this.fullscreen = void 0;
        const message = "provider destroyed";
        for (const promises of this.#promises.values()) {
          for (const { reject } of promises) reject(message);
        }
        this.#promises.clear();
        this.#remote("destroy");
      }
      async play() {
        return this.#remote("play");
      }
      async pause() {
        return this.#remote("pause");
      }
      setMuted(muted) {
        this.#remote("setMuted", muted);
      }
      setCurrentTime(time) {
        this.#remote("seekTo", time);
        this.#ctx.notify("seeking", time);
      }
      setVolume(volume) {
        this.#remote("setVolume", volume);
        this.#remote("setMuted", peek(this.#ctx.$state.muted));
      }
      setPlaybackRate(rate) {
        this.#remote("setPlaybackRate", rate);
      }
      async loadSource(src) {
        if (!isString(src.src)) {
          this.#currentSrc = null;
          this.#hash = null;
          this.#videoId.set("");
          return;
        }
        const { videoId, hash } = resolveVimeoVideoId(src.src);
        this.#videoId.set(videoId ?? "");
        this.#hash = hash ?? null;
        this.#currentSrc = src;
      }
      #watchVideoId() {
        this.#reset();
        const videoId = this.#videoId();
        if (!videoId) {
          this.src.set("");
          return;
        }
        this.src.set(`${this.getOrigin()}/video/${videoId}`);
        this.#ctx.notify("load-start");
      }
      #watchVideoInfo() {
        const videoId = this.#videoId();
        if (!videoId) return;
        const promise = deferredPromise(), abort = new AbortController();
        this.#videoInfoPromise = promise;
        getVimeoVideoInfo(videoId, abort, this.#hash).then((info) => {
          promise.resolve(info);
        }).catch((e6) => {
          promise.reject();
          if (true) {
            this.#ctx.logger?.warnGroup(`Failed to fetch vimeo video info for id \`${videoId}\`.`).labelledLog("Error", e6).dispatch();
          }
        });
        return () => {
          promise.reject();
          abort.abort();
        };
      }
      #watchPro() {
        const isPro = this.#pro(), { $state, qualities } = this.#ctx;
        $state.canSetPlaybackRate.set(isPro);
        qualities[ListSymbol.setReadonly](!isPro);
        if (isPro) {
          return listenEvent(qualities, "change", () => {
            if (qualities.auto) return;
            const id2 = qualities.selected?.id;
            if (id2) this.#remote("setQuality", id2);
          });
        }
      }
      getOrigin() {
        return "https://player.vimeo.com";
      }
      buildParams() {
        const { keyDisabled } = this.#ctx.$props, { playsInline, nativeControls } = this.#ctx.$state, showControls = nativeControls();
        return {
          title: this.title,
          byline: this.byline,
          color: this.color,
          portrait: this.portrait,
          controls: showControls,
          h: this.hash,
          keyboard: showControls && !keyDisabled(),
          transparent: true,
          playsinline: playsInline(),
          dnt: !this.cookies
        };
      }
      #onAnimationFrame() {
        this.#remote("getCurrentTime");
      }
      // Embed will sometimes dispatch 0 at end of playback.
      #preventTimeUpdates = false;
      #onTimeUpdate(time, trigger) {
        if (this.#preventTimeUpdates && time === 0) return;
        const { realCurrentTime, realDuration, paused, bufferedEnd } = this.#ctx.$state;
        if (realCurrentTime() === time) return;
        const prevTime = realCurrentTime();
        this.#ctx.notify("time-change", time, trigger);
        if (Math.abs(prevTime - time) > 1.5) {
          this.#ctx.notify("seeking", time, trigger);
          if (!paused() && bufferedEnd() < time) {
            this.#ctx.notify("waiting", void 0, trigger);
          }
        }
        if (realDuration() - time < 0.01) {
          this.#ctx.notify("end", void 0, trigger);
          this.#preventTimeUpdates = true;
          setTimeout(() => {
            this.#preventTimeUpdates = false;
          }, 500);
        }
      }
      #onSeeked(time, trigger) {
        this.#ctx.notify("seeked", time, trigger);
      }
      #onLoaded(trigger) {
        const videoId = this.#videoId();
        this.#videoInfoPromise?.promise.then((info) => {
          if (!info) return;
          const { title, poster, duration, pro } = info;
          this.#pro.set(pro);
          this.#ctx.notify("title-change", title, trigger);
          this.#ctx.notify("poster-change", poster, trigger);
          this.#ctx.notify("duration-change", duration, trigger);
          this.#onReady(duration, trigger);
        }).catch(() => {
          if (videoId !== this.#videoId()) return;
          this.#remote("getVideoTitle");
          this.#remote("getDuration");
        });
      }
      #onReady(duration, trigger) {
        const { nativeControls } = this.#ctx.$state, showEmbedControls = nativeControls();
        this.#seekableRange = new TimeRange(0, duration);
        const detail = {
          buffered: new TimeRange(0, 0),
          seekable: this.#seekableRange,
          duration
        };
        this.#ctx.delegate.ready(detail, trigger);
        if (!showEmbedControls) {
          this.#remote("_hideOverlay");
        }
        this.#remote("getQualities");
        this.#remote("getChapters");
      }
      #onMethod(method9, data, trigger) {
        switch (method9) {
          case "getVideoTitle":
            const videoTitle = data;
            this.#ctx.notify("title-change", videoTitle, trigger);
            break;
          case "getDuration":
            const duration = data;
            if (!this.#ctx.$state.canPlay()) {
              this.#onReady(duration, trigger);
            } else {
              this.#ctx.notify("duration-change", duration, trigger);
            }
            break;
          case "getCurrentTime":
            this.#onTimeUpdate(data, trigger);
            break;
          case "getBuffered":
            if (isArray(data) && data.length) {
              this.#onLoadProgress(data[data.length - 1][1], trigger);
            }
            break;
          case "setMuted":
            this.#onVolumeChange(peek(this.#ctx.$state.volume), data, trigger);
            break;
          case "getChapters":
            this.#onChaptersChange(data);
            break;
          case "getQualities":
            this.#onQualitiesChange(data, trigger);
            break;
        }
        this.#getPromise(method9)?.resolve();
      }
      #attachListeners() {
        for (const type of trackedVimeoEvents) {
          this.#remote("addEventListener", type);
        }
      }
      #onPause(trigger) {
        this.#timeRAF.stop();
        this.#ctx.notify("pause", void 0, trigger);
      }
      #onPlay(trigger) {
        this.#timeRAF.start();
        this.#ctx.notify("play", void 0, trigger);
      }
      #onPlayProgress(trigger) {
        const { paused } = this.#ctx.$state;
        if (!paused() && !this.#preventTimeUpdates) {
          this.#ctx.notify("playing", void 0, trigger);
        }
      }
      #onLoadProgress(buffered, trigger) {
        const detail = {
          buffered: new TimeRange(0, buffered),
          seekable: this.#seekableRange
        };
        this.#ctx.notify("progress", detail, trigger);
      }
      #onBufferStart(trigger) {
        this.#ctx.notify("waiting", void 0, trigger);
      }
      #onBufferEnd(trigger) {
        const { paused } = this.#ctx.$state;
        if (!paused()) this.#ctx.notify("playing", void 0, trigger);
      }
      #onWaiting(trigger) {
        const { paused } = this.#ctx.$state;
        if (paused()) {
          this.#ctx.notify("play", void 0, trigger);
        }
        this.#ctx.notify("waiting", void 0, trigger);
      }
      #onVolumeChange(volume, muted, trigger) {
        const detail = { volume, muted };
        this.#ctx.notify("volume-change", detail, trigger);
      }
      // #onTextTrackChange(track: VimeoTextTrack, trigger: Event) {
      //   const textTrack = this.#ctx.textTracks.toArray().find((t) => t.language === track.language);
      //   if (textTrack) textTrack.mode = track.mode;
      // }
      // #onTextTracksChange(tracks: VimeoTextTrack[], trigger: Event) {
      //   for (const init of tracks) {
      //     const textTrack = new TextTrack({
      //       ...init,
      //       label: init.label.replace('auto-generated', 'auto'),
      //     });
      //     textTrack[TextTrackSymbol.readyState] = 2;
      //     this.#ctx.textTracks.add(textTrack, trigger);
      //     textTrack.setMode(init.mode, trigger);
      //   }
      // }
      // #onCueChange(cue: VimeoTextCue, trigger: Event) {
      //   const { textTracks, $state } = this.#ctx,
      //     { currentTime } = $state,
      //     track = textTracks.selected;
      //   if (this.#currentCue) track?.removeCue(this.#currentCue, trigger);
      //   this.#currentCue = new window.VTTCue(currentTime(), Number.MAX_SAFE_INTEGER, cue.text);
      //   track?.addCue(this.#currentCue, trigger);
      // }
      #onChaptersChange(chapters) {
        this.#removeChapters();
        if (!chapters.length) return;
        const track = new TextTrack({
          kind: "chapters",
          default: true
        }), { realDuration } = this.#ctx.$state;
        for (let i3 = 0; i3 < chapters.length; i3++) {
          const chapter = chapters[i3], nextChapter = chapters[i3 + 1];
          track.addCue(
            new window.VTTCue(
              chapter.startTime,
              nextChapter?.startTime ?? realDuration(),
              chapter.title
            )
          );
        }
        this.#chaptersTrack = track;
        this.#ctx.textTracks.add(track);
      }
      #removeChapters() {
        if (!this.#chaptersTrack) return;
        this.#ctx.textTracks.remove(this.#chaptersTrack);
        this.#chaptersTrack = null;
      }
      #onQualitiesChange(qualities, trigger) {
        this.#ctx.qualities[QualitySymbol.enableAuto] = qualities.some((q) => q.id === "auto") ? () => this.#remote("setQuality", "auto") : void 0;
        for (const quality of qualities) {
          if (quality.id === "auto") continue;
          const height = +quality.id.slice(0, -1);
          if (isNaN(height)) continue;
          this.#ctx.qualities[ListSymbol.add](
            {
              id: quality.id,
              width: height * (16 / 9),
              height,
              codec: "avc1,h.264",
              bitrate: -1
            },
            trigger
          );
        }
        this.#onQualityChange(
          qualities.find((q) => q.active),
          trigger
        );
      }
      #onQualityChange({ id: id2 } = {}, trigger) {
        if (!id2) return;
        const isAuto = id2 === "auto", newQuality = this.#ctx.qualities.getById(id2);
        if (isAuto) {
          this.#ctx.qualities[QualitySymbol.setAuto](isAuto, trigger);
          this.#ctx.qualities[ListSymbol.select](void 0, true, trigger);
        } else {
          this.#ctx.qualities[ListSymbol.select](newQuality ?? void 0, true, trigger);
        }
      }
      #onEvent(event2, payload, trigger) {
        switch (event2) {
          case "ready":
            this.#attachListeners();
            break;
          case "loaded":
            this.#onLoaded(trigger);
            break;
          case "play":
            this.#onPlay(trigger);
            break;
          case "playProgress":
            this.#onPlayProgress(trigger);
            break;
          case "pause":
            this.#onPause(trigger);
            break;
          case "loadProgress":
            this.#onLoadProgress(payload.seconds, trigger);
            break;
          case "waiting":
            this.#onWaiting(trigger);
            break;
          case "bufferstart":
            this.#onBufferStart(trigger);
            break;
          case "bufferend":
            this.#onBufferEnd(trigger);
            break;
          case "volumechange":
            this.#onVolumeChange(payload.volume, peek(this.#ctx.$state.muted), trigger);
            break;
          case "durationchange":
            this.#seekableRange = new TimeRange(0, payload.duration);
            this.#ctx.notify("duration-change", payload.duration, trigger);
            break;
          case "playbackratechange":
            this.#ctx.notify("rate-change", payload.playbackRate, trigger);
            break;
          case "qualitychange":
            this.#onQualityChange(payload, trigger);
            break;
          case "fullscreenchange":
            this.#fullscreenActive = payload.fullscreen;
            this.#ctx.notify("fullscreen-change", payload.fullscreen, trigger);
            break;
          case "enterpictureinpicture":
            this.#ctx.notify("picture-in-picture-change", true, trigger);
            break;
          case "leavepictureinpicture":
            this.#ctx.notify("picture-in-picture-change", false, trigger);
            break;
          case "ended":
            this.#ctx.notify("end", void 0, trigger);
            break;
          case "error":
            this.#onError(payload, trigger);
            break;
          case "seek":
          case "seeked":
            this.#onSeeked(payload.seconds, trigger);
            break;
        }
      }
      #onError(error, trigger) {
        const { message, method: method9 } = error;
        if (method9 === "setPlaybackRate") {
          this.#pro.set(false);
        }
        if (method9) {
          this.#getPromise(method9)?.reject(message);
        }
        if (true) {
          this.#ctx.logger?.errorGroup(`[vimeo]: ${message}`).labelledLog("Error", error).labelledLog("Provider", this).labelledLog("Event", trigger).dispatch();
        }
      }
      onMessage(message, event2) {
        if (message.event) {
          this.#onEvent(message.event, message.data, event2);
        } else if (message.method) {
          this.#onMethod(message.method, message.value, event2);
        }
      }
      onLoad() {
      }
      async #remote(command, arg) {
        let promise = deferredPromise(), promises = this.#promises.get(command);
        if (!promises) this.#promises.set(command, promises = []);
        promises.push(promise);
        this.postMessage({
          method: command,
          value: arg
        });
        return promise.promise;
      }
      #reset() {
        this.#timeRAF.stop();
        this.#seekableRange = new TimeRange(0, 0);
        this.#videoInfoPromise = null;
        this.#currentCue = null;
        this.#pro.set(false);
        this.#removeChapters();
      }
      #getPromise(command) {
        return this.#promises.get(command)?.shift();
      }
    };
  }
});

// src/providers/youtube/embed/state.ts
var YouTubePlayerState;
var init_state = __esm({
  "src/providers/youtube/embed/state.ts"() {
    "use strict";
    YouTubePlayerState = {
      Unstarted: -1,
      Ended: 0,
      Playing: 1,
      Paused: 2,
      Buffering: 3,
      Cued: 5
    };
  }
});

// src/providers/youtube/utils.ts
var utils_exports2 = {};
__export(utils_exports2, {
  findYouTubePoster: () => findYouTubePoster,
  resolveYouTubeVideoId: () => resolveYouTubeVideoId
});
function resolveYouTubeVideoId(src) {
  return src.match(videoIdRE2)?.[1];
}
async function findYouTubePoster(videoId, abort) {
  if (posterCache.has(videoId)) return posterCache.get(videoId);
  if (pendingFetch2.has(videoId)) return pendingFetch2.get(videoId);
  const pending2 = new Promise(async (resolve) => {
    const sizes = ["maxresdefault", "sddefault", "hqdefault"];
    for (const size2 of sizes) {
      for (const webp of [true, false]) {
        const url = resolveYouTubePosterURL(videoId, size2, webp), response = await fetch(url, {
          mode: "no-cors",
          signal: abort.signal
        });
        if (response.status < 400) {
          posterCache.set(videoId, url);
          resolve(url);
          return;
        }
      }
    }
  }).catch(() => "").finally(() => pendingFetch2.delete(videoId));
  pendingFetch2.set(videoId, pending2);
  return pending2;
}
function resolveYouTubePosterURL(videoId, size2, webp) {
  const type = webp ? "webp" : "jpg";
  return `https://i.ytimg.com/${webp ? "vi_webp" : "vi"}/${videoId}/${size2}.${type}`;
}
var videoIdRE2, posterCache, pendingFetch2;
var init_utils4 = __esm({
  "src/providers/youtube/utils.ts"() {
    "use strict";
    videoIdRE2 = /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
    posterCache = /* @__PURE__ */ new Map();
    pendingFetch2 = /* @__PURE__ */ new Map();
  }
});

// src/providers/youtube/provider.ts
var provider_exports7 = {};
__export(provider_exports7, {
  YouTubeProvider: () => YouTubeProvider
});
var YouTubeProvider;
var init_provider8 = __esm({
  "src/providers/youtube/provider.ts"() {
    "use strict";
    init_prod();
    init_std();
    init_time_ranges();
    init_network();
    init_EmbedProvider();
    init_state();
    init_utils4();
    YouTubeProvider = class extends EmbedProvider {
      $$PROVIDER_TYPE = "YOUTUBE";
      scope = createScope();
      #ctx;
      #videoId = signal("");
      #state = -1;
      #currentSrc = null;
      #seekingTimer = -1;
      #pausedSeeking = false;
      #promises = /* @__PURE__ */ new Map();
      constructor(iframe, ctx) {
        super(iframe);
        this.#ctx = ctx;
      }
      /**
       * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
       * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
       * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
       *
       * The interface language is used for tooltips in the player and also affects the default caption
       * track. Note that YouTube might select a different caption track language for a particular
       * user based on the user's individual language preferences and the availability of caption tracks.
       *
       * @defaultValue 'en'
       */
      language = "en";
      color = "red";
      /**
       * Whether cookies should be enabled on the embed. This is turned off by default to be
       * GDPR-compliant.
       *
       * @defaultValue `false`
       */
      cookies = false;
      get currentSrc() {
        return this.#currentSrc;
      }
      get type() {
        return "youtube";
      }
      get videoId() {
        return this.#videoId();
      }
      preconnect() {
        preconnect(this.getOrigin());
      }
      setup() {
        super.setup();
        effect(this.#watchVideoId.bind(this));
        this.#ctx.notify("provider-setup", this);
      }
      destroy() {
        this.#reset();
        const message = "provider destroyed";
        for (const promises of this.#promises.values()) {
          for (const { reject } of promises) reject(message);
        }
        this.#promises.clear();
      }
      async play() {
        return this.#remote("playVideo");
      }
      #playFail(message) {
        this.#getPromise("playVideo")?.reject(message);
      }
      async pause() {
        return this.#remote("pauseVideo");
      }
      #pauseFail(message) {
        this.#getPromise("pauseVideo")?.reject(message);
      }
      setMuted(muted) {
        if (muted) this.#remote("mute");
        else this.#remote("unMute");
      }
      setCurrentTime(time) {
        this.#pausedSeeking = this.#ctx.$state.paused();
        this.#remote("seekTo", time);
        this.#ctx.notify("seeking", time);
      }
      setVolume(volume) {
        this.#remote("setVolume", volume * 100);
      }
      setPlaybackRate(rate) {
        this.#remote("setPlaybackRate", rate);
      }
      async loadSource(src) {
        if (!isString(src.src)) {
          this.#currentSrc = null;
          this.#videoId.set("");
          return;
        }
        const videoId = resolveYouTubeVideoId(src.src);
        this.#videoId.set(videoId ?? "");
        this.#currentSrc = src;
      }
      getOrigin() {
        return !this.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
      }
      #watchVideoId() {
        this.#reset();
        const videoId = this.#videoId();
        if (!videoId) {
          this.src.set("");
          return;
        }
        this.src.set(`${this.getOrigin()}/embed/${videoId}`);
        this.#ctx.notify("load-start");
      }
      buildParams() {
        const { keyDisabled } = this.#ctx.$props, { muted, playsInline, nativeControls } = this.#ctx.$state, showControls = nativeControls();
        return {
          autoplay: 0,
          cc_lang_pref: this.language,
          cc_load_policy: showControls ? 1 : void 0,
          color: this.color,
          controls: showControls ? 1 : 0,
          disablekb: !showControls || keyDisabled() ? 1 : 0,
          enablejsapi: 1,
          fs: 1,
          hl: this.language,
          iv_load_policy: showControls ? 1 : 3,
          mute: muted() ? 1 : 0,
          playsinline: playsInline() ? 1 : 0
        };
      }
      #remote(command, arg) {
        let promise = deferredPromise(), promises = this.#promises.get(command);
        if (!promises) this.#promises.set(command, promises = []);
        promises.push(promise);
        this.postMessage({
          event: "command",
          func: command,
          args: arg ? [arg] : void 0
        });
        return promise.promise;
      }
      onLoad() {
        window.setTimeout(() => this.postMessage({ event: "listening" }), 100);
      }
      #onReady(trigger) {
        this.#ctx.notify("loaded-metadata");
        this.#ctx.notify("loaded-data");
        this.#ctx.delegate.ready(void 0, trigger);
      }
      #onPause(trigger) {
        this.#getPromise("pauseVideo")?.resolve();
        this.#ctx.notify("pause", void 0, trigger);
      }
      #onTimeUpdate(time, trigger) {
        const { duration, realCurrentTime } = this.#ctx.$state, hasEnded = this.#state === YouTubePlayerState.Ended, boundTime = hasEnded ? duration() : time;
        this.#ctx.notify("time-change", boundTime, trigger);
        if (!hasEnded && Math.abs(boundTime - realCurrentTime()) > 1) {
          this.#ctx.notify("seeking", boundTime, trigger);
        }
      }
      #onProgress(buffered, seekable, trigger) {
        const detail = {
          buffered: new TimeRange(0, buffered),
          seekable
        };
        this.#ctx.notify("progress", detail, trigger);
        const { seeking, realCurrentTime } = this.#ctx.$state;
        if (seeking() && buffered > realCurrentTime()) {
          this.#onSeeked(trigger);
        }
      }
      #onSeeked(trigger) {
        const { paused, realCurrentTime } = this.#ctx.$state;
        window.clearTimeout(this.#seekingTimer);
        this.#seekingTimer = window.setTimeout(
          () => {
            this.#ctx.notify("seeked", realCurrentTime(), trigger);
            this.#seekingTimer = -1;
          },
          paused() ? 100 : 0
        );
        this.#pausedSeeking = false;
      }
      #onEnded(trigger) {
        const { seeking } = this.#ctx.$state;
        if (seeking()) this.#onSeeked(trigger);
        this.#ctx.notify("pause", void 0, trigger);
        this.#ctx.notify("end", void 0, trigger);
      }
      #onStateChange(state, trigger) {
        const { started, paused, seeking } = this.#ctx.$state, isPlaying = state === YouTubePlayerState.Playing, isBuffering = state === YouTubePlayerState.Buffering, isPendingPlay = !isUndefined(this.#getPromise("playVideo")), isPlay = (paused() || isPendingPlay) && (isBuffering || isPlaying);
        if (isBuffering) this.#ctx.notify("waiting", void 0, trigger);
        if (seeking() && isPlaying) {
          this.#onSeeked(trigger);
        }
        if (!started() && isPlay && this.#pausedSeeking) {
          this.#playFail("invalid internal play operation");
          if (isPlaying) {
            this.pause();
            this.#pausedSeeking = false;
          }
          return;
        }
        if (isPlay) {
          this.#getPromise("playVideo")?.resolve();
          this.#ctx.notify("play", void 0, trigger);
        }
        switch (state) {
          case YouTubePlayerState.Unstarted:
            this.#playFail("provider rejected");
            this.#pauseFail("provider rejected");
            this.#ctx.notify("pause", void 0, trigger);
            break;
          case YouTubePlayerState.Cued:
            this.#onReady(trigger);
            break;
          case YouTubePlayerState.Playing:
            this.#ctx.notify("playing", void 0, trigger);
            break;
          case YouTubePlayerState.Paused:
            this.#onPause(trigger);
            break;
          case YouTubePlayerState.Ended:
            this.#onEnded(trigger);
            break;
        }
        this.#state = state;
      }
      onMessage({ info }, event2) {
        if (!info) return;
        const { title, intrinsicDuration, playbackRate } = this.#ctx.$state;
        if (isObject(info.videoData) && info.videoData.title !== title()) {
          this.#ctx.notify("title-change", info.videoData.title, event2);
        }
        if (isNumber(info.duration) && info.duration !== intrinsicDuration()) {
          if (isNumber(info.videoLoadedFraction)) {
            const buffered = info.progressState?.loaded ?? info.videoLoadedFraction * info.duration, seekable = new TimeRange(0, info.duration);
            this.#onProgress(buffered, seekable, event2);
          }
          this.#ctx.notify("duration-change", info.duration, event2);
        }
        if (isNumber(info.playbackRate) && info.playbackRate !== playbackRate()) {
          this.#ctx.notify("rate-change", info.playbackRate, event2);
        }
        if (info.progressState) {
          const { current, seekableStart, seekableEnd, loaded, duration } = info.progressState;
          this.#onTimeUpdate(current, event2);
          this.#onProgress(loaded, new TimeRange(seekableStart, seekableEnd), event2);
          if (duration !== intrinsicDuration()) {
            this.#ctx.notify("duration-change", duration, event2);
          }
        }
        if (isNumber(info.volume) && isBoolean(info.muted)) {
          const detail = {
            muted: info.muted,
            volume: info.volume / 100
          };
          this.#ctx.notify("volume-change", detail, event2);
        }
        if (isNumber(info.playerState) && info.playerState !== this.#state) {
          this.#onStateChange(info.playerState, event2);
        }
      }
      #reset() {
        this.#state = -1;
        this.#seekingTimer = -1;
        this.#pausedSeeking = false;
      }
      #getPromise(command) {
        return this.#promises.get(command)?.shift();
      }
    };
  }
});

// src/elements/define/provider-cast-display.ts
var provider_cast_display_exports = {};
__export(provider_cast_display_exports, {
  insertContent: () => insertContent
});
import chromecastIconPaths from "https://cdn.vidstack.io/icons/dist/icons/chromecast.js";
function insertContent(container, $state) {
  const icon = cloneTemplateContent(svgTemplate);
  icon.innerHTML = chromecastIconPaths;
  container.append(icon);
  const text = document.createElement("span");
  text.classList.add("vds-google-cast-info");
  container.append(text);
  const deviceName = document.createElement("span");
  deviceName.classList.add("vds-google-cast-device-name");
  effect(() => {
    const { remotePlaybackInfo } = $state, info = remotePlaybackInfo();
    if (info?.deviceName) {
      deviceName.textContent = info.deviceName;
      text.append("Google Cast on ", deviceName);
    }
    return () => {
      text.textContent = "";
    };
  });
}
var svgTemplate;
var init_provider_cast_display = __esm({
  "src/elements/define/provider-cast-display.ts"() {
    "use strict";
    init_prod();
    init_dom();
    svgTemplate = /* @__PURE__ */ createTemplate(
      `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"></svg>`
    );
  }
});

// src/elements/define/layouts/plyr/icons/plyr-airplay.js
var plyr_airplay_default;
var init_plyr_airplay = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-airplay.js"() {
    "use strict";
    plyr_airplay_default = `<g><path d="M16,1 L2,1 C1.447,1 1,1.447 1,2 L1,12 C1,12.553 1.447,13 2,13 L5,13 L5,11 L3,11 L3,3 L15,3 L15,11 L13,11 L13,13 L16,13 C16.553,13 17,12.553 17,12 L17,2 C17,1.447 16.553,1 16,1 L16,1 Z"></path><polygon points="4 17 14 17 9 11"></polygon></g>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-captions-off.js
var plyr_captions_off_default;
var init_plyr_captions_off = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-captions-off.js"() {
    "use strict";
    plyr_captions_off_default = `<g fill-rule="evenodd" fill-opacity="0.5"><path d="M1,1 C0.4,1 0,1.4 0,2 L0,13 C0,13.6 0.4,14 1,14 L5.6,14 L8.3,16.7 C8.5,16.9 8.7,17 9,17 C9.3,17 9.5,16.9 9.7,16.7 L12.4,14 L17,14 C17.6,14 18,13.6 18,13 L18,2 C18,1.4 17.6,1 17,1 L1,1 Z M5.52,11.15 C7.51,11.15 8.53,9.83 8.8,8.74 L7.51,8.35 C7.32,9.01 6.73,9.8 5.52,9.8 C4.38,9.8 3.32,8.97 3.32,7.46 C3.32,5.85 4.44,5.09 5.5,5.09 C6.73,5.09 7.28,5.84 7.45,6.52 L8.75,6.11 C8.47,4.96 7.46,3.76 5.5,3.76 C3.6,3.76 1.89,5.2 1.89,7.46 C1.89,9.72 3.54,11.15 5.52,11.15 Z M13.09,11.15 C15.08,11.15 16.1,9.83 16.37,8.74 L15.08,8.35 C14.89,9.01 14.3,9.8 13.09,9.8 C11.95,9.8 10.89,8.97 10.89,7.46 C10.89,5.85 12.01,5.09 13.07,5.09 C14.3,5.09 14.85,5.84 15.02,6.52 L16.32,6.11 C16.04,4.96 15.03,3.76 13.07,3.76 C11.17,3.76 9.46,5.2 9.46,7.46 C9.46,9.72 11.11,11.15 13.09,11.15 Z"></path></g>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-captions-on.js
var plyr_captions_on_default;
var init_plyr_captions_on = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-captions-on.js"() {
    "use strict";
    plyr_captions_on_default = `<g fill-rule="evenodd"><path d="M1,1 C0.4,1 0,1.4 0,2 L0,13 C0,13.6 0.4,14 1,14 L5.6,14 L8.3,16.7 C8.5,16.9 8.7,17 9,17 C9.3,17 9.5,16.9 9.7,16.7 L12.4,14 L17,14 C17.6,14 18,13.6 18,13 L18,2 C18,1.4 17.6,1 17,1 L1,1 Z M5.52,11.15 C7.51,11.15 8.53,9.83 8.8,8.74 L7.51,8.35 C7.32,9.01 6.73,9.8 5.52,9.8 C4.38,9.8 3.32,8.97 3.32,7.46 C3.32,5.85 4.44,5.09 5.5,5.09 C6.73,5.09 7.28,5.84 7.45,6.52 L8.75,6.11 C8.47,4.96 7.46,3.76 5.5,3.76 C3.6,3.76 1.89,5.2 1.89,7.46 C1.89,9.72 3.54,11.15 5.52,11.15 Z M13.09,11.15 C15.08,11.15 16.1,9.83 16.37,8.74 L15.08,8.35 C14.89,9.01 14.3,9.8 13.09,9.8 C11.95,9.8 10.89,8.97 10.89,7.46 C10.89,5.85 12.01,5.09 13.07,5.09 C14.3,5.09 14.85,5.84 15.02,6.52 L16.32,6.11 C16.04,4.96 15.03,3.76 13.07,3.76 C11.17,3.76 9.46,5.2 9.46,7.46 C9.46,9.72 11.11,11.15 13.09,11.15 Z"></path></g>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-download.js
var plyr_download_default;
var init_plyr_download = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-download.js"() {
    "use strict";
    plyr_download_default = `<g transform="translate(2 1)"><path d="M7,12 C7.3,12 7.5,11.9 7.7,11.7 L13.4,6 L12,4.6 L8,8.6 L8,0 L6,0 L6,8.6 L2,4.6 L0.6,6 L6.3,11.7 C6.5,11.9 6.7,12 7,12 Z" /><rect width="14" height="2" y="14" /></g>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-enter-fullscreen.js
var plyr_enter_fullscreen_default;
var init_plyr_enter_fullscreen = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-enter-fullscreen.js"() {
    "use strict";
    plyr_enter_fullscreen_default = `<polygon points="10 3 13.6 3 9.6 7 11 8.4 15 4.4 15 8 17 8 17 1 10 1"></polygon><polygon points="7 9.6 3 13.6 3 10 1 10 1 17 8 17 8 15 4.4 15 8.4 11"></polygon>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-exit-fullscreen.js
var plyr_exit_fullscreen_default;
var init_plyr_exit_fullscreen = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-exit-fullscreen.js"() {
    "use strict";
    plyr_exit_fullscreen_default = `<polygon points="1 12 4.6 12 0.6 16 2 17.4 6 13.4 6 17 8 17 8 10 1 10"></polygon><polygon points="16 0.6 12 4.6 12 1 10 1 10 8 17 8 17 6 13.4 6 17.4 2"></polygon>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-fast-forward.js
var plyr_fast_forward_default;
var init_plyr_fast_forward = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-fast-forward.js"() {
    "use strict";
    plyr_fast_forward_default = `<polygon points="7.875 7.17142857 0 1 0 17 7.875 10.8285714 7.875 17 18 9 7.875 1"></polygon>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-muted.js
var plyr_muted_default;
var init_plyr_muted = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-muted.js"() {
    "use strict";
    plyr_muted_default = `<polygon points="12.4 12.5 14.5 10.4 16.6 12.5 18 11.1 15.9 9 18 6.9 16.6 5.5 14.5 7.6 12.4 5.5 11 6.9 13.1 9 11 11.1"></polygon><path d="M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-pause.js
var plyr_pause_default;
var init_plyr_pause = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-pause.js"() {
    "use strict";
    plyr_pause_default = `<path d="M6,1 L3,1 C2.4,1 2,1.4 2,2 L2,16 C2,16.6 2.4,17 3,17 L6,17 C6.6,17 7,16.6 7,16 L7,2 C7,1.4 6.6,1 6,1 L6,1 Z"></path><path d="M12,1 C11.4,1 11,1.4 11,2 L11,16 C11,16.6 11.4,17 12,17 L15,17 C15.6,17 16,16.6 16,16 L16,2 C16,1.4 15.6,1 15,1 L12,1 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-pip.js
var plyr_pip_default;
var init_plyr_pip = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-pip.js"() {
    "use strict";
    plyr_pip_default = `<polygon points="13.293 3.293 7.022 9.564 8.436 10.978 14.707 4.707 17 7 17 1 11 1"></polygon><path d="M13,15 L3,15 L3,5 L8,5 L8,3 L2,3 C1.448,3 1,3.448 1,4 L1,16 C1,16.552 1.448,17 2,17 L14,17 C14.552,17 15,16.552 15,16 L15,10 L13,10 L13,15 L13,15 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-play.js
var plyr_play_default;
var init_plyr_play = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-play.js"() {
    "use strict";
    plyr_play_default = `<path d="M15.5615866,8.10002147 L3.87056367,0.225209313 C3.05219207,-0.33727727 2,0.225209313 2,1.12518784 L2,16.8748122 C2,17.7747907 3.05219207,18.3372773 3.87056367,17.7747907 L15.5615866,9.89997853 C16.1461378,9.44998927 16.1461378,8.55001073 15.5615866,8.10002147 L15.5615866,8.10002147 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-restart.js
var plyr_restart_default;
var init_plyr_restart = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-restart.js"() {
    "use strict";
    plyr_restart_default = `<path d="M9.7,1.2 L10.4,7.6 L12.5,5.5 C14.4,7.4 14.4,10.6 12.5,12.5 C11.6,13.5 10.3,14 9,14 C7.7,14 6.4,13.5 5.5,12.5 C3.6,10.6 3.6,7.4 5.5,5.5 C6.1,4.9 6.9,4.4 7.8,4.2 L7.2,2.3 C6,2.6 4.9,3.2 4,4.1 C1.3,6.8 1.3,11.2 4,14 C5.3,15.3 7.1,16 8.9,16 C10.8,16 12.5,15.3 13.8,14 C16.5,11.3 16.5,6.9 13.8,4.1 L16,1.9 L9.7,1.2 L9.7,1.2 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-rewind.js
var plyr_rewind_default;
var init_plyr_rewind = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-rewind.js"() {
    "use strict";
    plyr_rewind_default = `<polygon points="10.125 1 0 9 10.125 17 10.125 10.8285714 18 17 18 1 10.125 7.17142857"></polygon>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-settings.js
var plyr_settings_default;
var init_plyr_settings = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-settings.js"() {
    "use strict";
    plyr_settings_default = `<path d="M16.135,7.784 C14.832,7.458 14.214,5.966 14.905,4.815 C15.227,4.279 15.13,3.817 14.811,3.499 L14.501,3.189 C14.183,2.871 13.721,2.774 13.185,3.095 C12.033,3.786 10.541,3.168 10.216,1.865 C10.065,1.258 9.669,1 9.219,1 L8.781,1 C8.331,1 7.936,1.258 7.784,1.865 C7.458,3.168 5.966,3.786 4.815,3.095 C4.279,2.773 3.816,2.87 3.498,3.188 L3.188,3.498 C2.87,3.816 2.773,4.279 3.095,4.815 C3.786,5.967 3.168,7.459 1.865,7.784 C1.26,7.935 1,8.33 1,8.781 L1,9.219 C1,9.669 1.258,10.064 1.865,10.216 C3.168,10.542 3.786,12.034 3.095,13.185 C2.773,13.721 2.87,14.183 3.189,14.501 L3.499,14.811 C3.818,15.13 4.281,15.226 4.815,14.905 C5.967,14.214 7.459,14.832 7.784,16.135 C7.935,16.742 8.331,17 8.781,17 L9.219,17 C9.669,17 10.064,16.742 10.216,16.135 C10.542,14.832 12.034,14.214 13.185,14.905 C13.72,15.226 14.182,15.13 14.501,14.811 L14.811,14.501 C15.129,14.183 15.226,13.72 14.905,13.185 C14.214,12.033 14.832,10.541 16.135,10.216 C16.742,10.065 17,9.669 17,9.219 L17,8.781 C17,8.33 16.74,7.935 16.135,7.784 L16.135,7.784 Z M9,12 C7.343,12 6,10.657 6,9 C6,7.343 7.343,6 9,6 C10.657,6 12,7.343 12,9 C12,10.657 10.657,12 9,12 L9,12 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons/plyr-volume.js
var plyr_volume_default;
var init_plyr_volume = __esm({
  "src/elements/define/layouts/plyr/icons/plyr-volume.js"() {
    "use strict";
    plyr_volume_default = `<path d="M15.5999996,3.3 C15.1999996,2.9 14.5999996,2.9 14.1999996,3.3 C13.7999996,3.7 13.7999996,4.3 14.1999996,4.7 C15.3999996,5.9 15.9999996,7.4 15.9999996,9 C15.9999996,10.6 15.3999996,12.1 14.1999996,13.3 C13.7999996,13.7 13.7999996,14.3 14.1999996,14.7 C14.3999996,14.9 14.6999996,15 14.8999996,15 C15.1999996,15 15.3999996,14.9 15.5999996,14.7 C17.0999996,13.2 17.9999996,11.2 17.9999996,9 C17.9999996,6.8 17.0999996,4.8 15.5999996,3.3 L15.5999996,3.3 Z"></path><path d="M11.2819745,5.28197449 C10.9060085,5.65794047 10.9060085,6.22188944 11.2819745,6.59785542 C12.0171538,7.33303477 12.2772954,8.05605449 12.2772954,9.00000021 C12.2772954,9.93588462 11.851678,10.9172014 11.2819745,11.4869049 C10.9060085,11.8628709 10.9060085,12.4268199 11.2819745,12.8027859 C11.4271642,12.9479755 11.9176724,13.0649528 12.2998149,12.9592565 C12.4124479,12.9281035 12.5156669,12.8776063 12.5978555,12.8027859 C13.773371,11.732654 14.1311161,10.1597914 14.1312523,9.00000021 C14.1312723,8.8299555 14.1286311,8.66015647 14.119665,8.4897429 C14.0674781,7.49784946 13.8010171,6.48513613 12.5978554,5.28197449 C12.2218894,4.9060085 11.6579405,4.9060085 11.2819745,5.28197449 Z"></path><path d="M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"></path>`;
  }
});

// src/elements/define/layouts/plyr/icons.ts
var icons_exports = {};
__export(icons_exports, {
  icons: () => icons
});
var icons;
var init_icons = __esm({
  "src/elements/define/layouts/plyr/icons.ts"() {
    "use strict";
    init_plyr_airplay();
    init_plyr_captions_off();
    init_plyr_captions_on();
    init_plyr_download();
    init_plyr_enter_fullscreen();
    init_plyr_exit_fullscreen();
    init_plyr_fast_forward();
    init_plyr_muted();
    init_plyr_pause();
    init_plyr_pip();
    init_plyr_play();
    init_plyr_restart();
    init_plyr_rewind();
    init_plyr_settings();
    init_plyr_volume();
    icons = {
      airplay: plyr_airplay_default,
      "captions-off": plyr_captions_off_default,
      "captions-on": plyr_captions_on_default,
      download: plyr_download_default,
      "enter-fullscreen": plyr_exit_fullscreen_default,
      "exit-fullscreen": plyr_enter_fullscreen_default,
      "fast-forward": plyr_fast_forward_default,
      muted: plyr_muted_default,
      pause: plyr_pause_default,
      "enter-pip": plyr_pip_default,
      "exit-pip": plyr_pip_default,
      play: plyr_play_default,
      restart: plyr_restart_default,
      rewind: plyr_rewind_default,
      settings: plyr_settings_default,
      volume: plyr_volume_default
    };
  }
});

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/element.js
init_maverick_2d4dOpH4();
init_maverick_Ikj49ROL();
init_maverick_PguL6eRI();
init_maverick_L_TO4Elh();
var STRING = (v2) => v2 === null ? "" : v2 + "";
var NULLABLE_STRING = (v2) => v2 === null ? null : v2 + "";
var NUMBER = (v2) => v2 === null ? 0 : Number(v2);
var BOOLEAN = (v2) => v2 !== null;
var FUNCTION = () => null;
var ARRAY = (v2) => v2 === null ? [] : JSON.parse(v2);
var OBJECT = (v2) => v2 === null ? {} : JSON.parse(v2);
function inferAttributeConverter(value) {
  if (value === null)
    return NULLABLE_STRING;
  switch (typeof value) {
    case "undefined":
      return STRING;
    case "string":
      return STRING;
    case "boolean":
      return BOOLEAN;
    case "number":
      return NUMBER;
    case "function":
      return FUNCTION;
    case "object":
      return isArray(value) ? ARRAY : OBJECT;
    default:
      return STRING;
  }
}
var ATTRS = /* @__PURE__ */ Symbol(0);
var SETUP = /* @__PURE__ */ Symbol(0);
var SETUP_STATE = /* @__PURE__ */ Symbol(0);
var SETUP_CALLBACKS = /* @__PURE__ */ Symbol(0);
function Host(Super, Component2) {
  var _a3, _b, _c;
  const _MaverickElement = class _MaverickElement extends Super {
    constructor(...args) {
      super(...args);
      this[_b] = 0;
      this[_c] = null;
      this.keepAlive = false;
      this.forwardKeepAlive = true;
      this.$ = scoped(() => createComponent(Component2), null);
      this.$.$$.t(this);
      if (Component2.props) {
        const props = this.$props, descriptors = Object.getOwnPropertyDescriptors(this);
        for (const prop8 of Object.keys(descriptors)) {
          if (prop8 in Component2.props) {
            props[prop8].set(this[prop8]);
            delete this[prop8];
          }
        }
      }
    }
    static get observedAttributes() {
      if (!this[ATTRS] && Component2.props) {
        const map = /* @__PURE__ */ new Map();
        for (const propName of Object.keys(Component2.props)) {
          let attr = this.attrs?.[propName], attrName = isString(attr) ? attr : !attr ? attr : attr?.attr;
          if (attrName === false)
            continue;
          if (!attrName)
            attrName = camelToKebabCase(propName);
          map.set(attrName, {
            C: propName,
            B: attr && !isString(attr) && attr?.converter || inferAttributeConverter(Component2.props[propName])
          });
        }
        this[ATTRS] = map;
      }
      return this[ATTRS] ? Array.from(this[ATTRS].keys()) : [];
    }
    get scope() {
      return this.$.$$.d;
    }
    get attachScope() {
      return this.$.$$.f;
    }
    get connectScope() {
      return this.$.$$.g;
    }
    get $props() {
      return this.$.$$.i;
    }
    get $state() {
      return this.$.$$.h;
    }
    get state() {
      return this.$.state;
    }
    attributeChangedCallback(name, _2, newValue) {
      const Ctor = this.constructor;
      if (!Ctor[ATTRS]) {
        super.attributeChangedCallback?.(name, _2, newValue);
        return;
      }
      const def = Ctor[ATTRS].get(name);
      if (def)
        this[def.C] = def.B(newValue);
    }
    connectedCallback() {
      const instance = this.$?.$$;
      if (!instance || instance.o)
        return;
      if (this[SETUP_STATE] !== 2) {
        setup.call(this);
        return;
      }
      if (!this.isConnected)
        return;
      if (this.hasAttribute("keep-alive")) {
        this.keepAlive = true;
      }
      instance.y();
      if (isArray(this[SETUP_CALLBACKS]))
        runAll(this[SETUP_CALLBACKS], this);
      this[SETUP_CALLBACKS] = null;
      const callback = super.connectedCallback;
      if (callback)
        scoped(() => callback.call(this), this.connectScope);
      return;
    }
    disconnectedCallback() {
      const instance = this.$?.$$;
      if (!instance || instance.o)
        return;
      instance.z();
      const callback = super.disconnectedCallback;
      if (callback)
        callback.call(this);
      if (!this.keepAlive && !this.hasAttribute("keep-alive")) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.isConnected)
              instance.p();
          });
        }, 0);
      }
    }
    [(_a3 = ATTRS, _b = SETUP_STATE, _c = SETUP_CALLBACKS, SETUP)]() {
      const instance = this.$.$$, Ctor = this.constructor;
      if (instance.o)
        return;
      const attrs = Ctor[ATTRS];
      if (attrs) {
        for (const attr of this.attributes) {
          let def = attrs.get(attr.name);
          if (def && def.B) {
            instance.i[def.C].set(def.B(this.getAttribute(attr.name)));
          }
        }
      }
      instance.w();
      instance.x(this);
      this[SETUP_STATE] = 2;
      this.connectedCallback();
    }
    // @ts-expect-error
    subscribe(callback) {
      return this.$.subscribe(callback);
    }
    destroy() {
      this.disconnectedCallback();
      this.$.destroy();
    }
  };
  _MaverickElement[_a3] = null;
  let MaverickElement = _MaverickElement;
  extendProto(MaverickElement, Component2);
  return MaverickElement;
}
function extendProto(Element2, Component2) {
  const ElementProto = Element2.prototype, ComponentProto = Component2.prototype;
  if (Component2.props) {
    for (const prop8 of Object.keys(Component2.props)) {
      Object.defineProperty(ElementProto, prop8, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$props[prop8]();
        },
        set(value) {
          this.$props[prop8].set(value);
        }
      });
    }
  }
  if (ComponentProto[PROPS]) {
    for (const name of ComponentProto[PROPS]) {
      Object.defineProperty(ElementProto, name, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$[name];
        },
        set(value) {
          this.$[name] = value;
        }
      });
    }
  }
  if (ComponentProto[METHODS]) {
    for (const name of ComponentProto[METHODS]) {
      ElementProto[name] = function(...args) {
        return this.$[name](...args);
      };
    }
  }
}
function setup() {
  if (this[SETUP_STATE] !== 0)
    return;
  this[SETUP_STATE] = 1;
  const parent = findParent(this), isParentRegistered = parent && window.customElements.get(parent.localName), isParentSetup = parent && parent[SETUP_STATE] === 2;
  if (parent && (!isParentRegistered || !isParentSetup)) {
    waitForParent.call(this, parent);
    return;
  }
  attach.call(this, parent);
}
async function waitForParent(parent) {
  await window.customElements.whenDefined(parent.localName);
  if (parent[SETUP_STATE] !== 2) {
    await new Promise((res) => (parent[SETUP_CALLBACKS] ??= []).push(res));
  }
  attach.call(this, parent);
}
function attach(parent) {
  if (!this.isConnected)
    return;
  if (parent) {
    if (parent.keepAlive && parent.forwardKeepAlive) {
      this.keepAlive = true;
      this.setAttribute("keep-alive", "");
    }
    const scope = this.$.$$.d;
    if (scope)
      parent.$.$$.f.append(scope);
  }
  this[SETUP]();
}
function findParent(host) {
  let node = host.parentNode, prefix = host.localName.split("-", 1)[0] + "-";
  while (node) {
    if (node.nodeType === 1 && node.localName.startsWith(prefix)) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}
function defineCustomElement(element, throws = false) {
  if (throws || !window.customElements.get(element.tagName)) {
    window.customElements.define(element.tagName, element);
  }
}

// src/components/player.ts
init_prod();
init_std();

// src/core/api/media-attrs.ts
var MEDIA_ATTRIBUTES = Symbol(true ? "MEDIA_ATTRIBUTES" : 0);
var mediaAttributes = [
  "autoPlay",
  "canAirPlay",
  "canFullscreen",
  "canGoogleCast",
  "canLoad",
  "canLoadPoster",
  "canPictureInPicture",
  "canPlay",
  "canSeek",
  "ended",
  "fullscreen",
  "isAirPlayConnected",
  "isGoogleCastConnected",
  "live",
  "liveEdge",
  "loop",
  "mediaType",
  "muted",
  "paused",
  "pictureInPicture",
  "playing",
  "playsInline",
  "remotePlaybackState",
  "remotePlaybackType",
  "seeking",
  "started",
  "streamType",
  "viewType",
  "waiting"
];

// src/core/api/media-context.ts
init_prod();
var mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}

// src/core/keyboard/controller.ts
init_prod();
init_std();

// src/providers/type-check.ts
function isHTMLAudioElement(element) {
  return element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
function isHTMLIFrameElement(element) {
  return element instanceof HTMLIFrameElement;
}

// src/core/api/player-controller.ts
init_prod();
var MediaPlayerController = class extends ViewController {
};

// src/core/keyboard/controller.ts
var MEDIA_KEY_SHORTCUTS = {
  togglePaused: "k Space",
  toggleMuted: "m",
  toggleFullscreen: "f",
  togglePictureInPicture: "i",
  toggleCaptions: "c",
  seekBackward: "j J ArrowLeft",
  seekForward: "l L ArrowRight",
  volumeUp: "ArrowUp",
  volumeDown: "ArrowDown",
  speedUp: ">",
  slowDown: "<"
};
var MODIFIER_KEYS = /* @__PURE__ */ new Set(["Shift", "Alt", "Meta", "Ctrl"]);
var BUTTON_SELECTORS = 'button, [role="button"]';
var IGNORE_SELECTORS = 'input, textarea, select, [contenteditable], [role^="menuitem"], [role="timer"]';
var MediaKeyboardController = class extends MediaPlayerController {
  #media;
  constructor(media) {
    super();
    this.#media = media;
  }
  onConnect() {
    effect(this.#onTargetChange.bind(this));
  }
  #onTargetChange() {
    const { keyDisabled, keyTarget } = this.$props;
    if (keyDisabled()) return;
    const target = keyTarget() === "player" ? this.el : document, $active = signal(false);
    if (target === this.el) {
      this.listen("focusin", () => $active.set(true));
      this.listen("focusout", (event2) => {
        if (!this.el.contains(event2.target)) $active.set(false);
      });
    } else {
      if (!peek($active)) $active.set(document.querySelector("[data-media-player]") === this.el);
      listenEvent(document, "focusin", (event2) => {
        const activePlayer = event2.composedPath().find((el) => el instanceof Element && el.localName === "media-player");
        if (activePlayer !== void 0) $active.set(this.el === activePlayer);
      });
    }
    effect(() => {
      if (!$active()) return;
      listenEvent(target, "keyup", this.#onKeyUp.bind(this));
      listenEvent(target, "keydown", this.#onKeyDown.bind(this));
      listenEvent(target, "keydown", this.#onPreventVideoKeys.bind(this), { capture: true });
    });
  }
  #onKeyUp(event2) {
    const focusedEl = document.activeElement;
    if (!event2.key || !this.$state.canSeek() || focusedEl?.matches(IGNORE_SELECTORS)) {
      return;
    }
    let { method: method9, value } = this.#getMatchingMethod(event2);
    if (!isString(value) && !isArray(value)) {
      value?.onKeyUp?.({
        event: event2,
        player: this.#media.player,
        remote: this.#media.remote
      });
      value?.callback?.(event2, this.#media.remote);
      return;
    }
    if (method9?.startsWith("seek")) {
      event2.preventDefault();
      event2.stopPropagation();
      if (this.#timeSlider) {
        this.#forwardTimeKeyboardEvent(event2, method9 === "seekForward");
        this.#timeSlider = null;
      } else {
        this.#media.remote.seek(this.#seekTotal, event2);
        this.#seekTotal = void 0;
      }
    }
    if (method9?.startsWith("volume")) {
      const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
      volumeSlider?.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: method9 === "volumeUp" ? "Up" : "Down",
          shiftKey: event2.shiftKey,
          trigger: event2
        })
      );
    }
  }
  #onKeyDown(event2) {
    if (!event2.key || MODIFIER_KEYS.has(event2.key)) return;
    const focusedEl = document.activeElement;
    if (focusedEl?.matches(IGNORE_SELECTORS) || isKeyboardClick(event2) && focusedEl?.matches(BUTTON_SELECTORS)) {
      return;
    }
    let { method: method9, value } = this.#getMatchingMethod(event2), isNumberPress = !event2.metaKey && /^[0-9]$/.test(event2.key);
    if (!isString(value) && !isArray(value) && !isNumberPress) {
      value?.onKeyDown?.({
        event: event2,
        player: this.#media.player,
        remote: this.#media.remote
      });
      value?.callback?.(event2, this.#media.remote);
      return;
    }
    if (!method9 && isNumberPress) {
      event2.preventDefault();
      event2.stopPropagation();
      this.#media.remote.seek(this.$state.duration() / 10 * Number(event2.key), event2);
      return;
    }
    if (!method9) return;
    event2.preventDefault();
    event2.stopPropagation();
    switch (method9) {
      case "seekForward":
      case "seekBackward":
        this.#seeking(event2, method9, method9 === "seekForward");
        break;
      case "volumeUp":
      case "volumeDown":
        const volumeSlider = this.el.querySelector("[data-media-volume-slider]");
        if (volumeSlider) {
          volumeSlider.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: method9 === "volumeUp" ? "Up" : "Down",
              shiftKey: event2.shiftKey,
              trigger: event2
            })
          );
        } else {
          const value2 = event2.shiftKey ? 0.1 : 0.05;
          this.#media.remote.changeVolume(
            this.$state.volume() + (method9 === "volumeUp" ? +value2 : -value2),
            event2
          );
        }
        break;
      case "toggleFullscreen":
        this.#media.remote.toggleFullscreen("prefer-media", event2);
        break;
      case "speedUp":
      case "slowDown":
        const playbackRate = this.$state.playbackRate();
        this.#media.remote.changePlaybackRate(
          Math.max(0.25, Math.min(2, playbackRate + (method9 === "speedUp" ? 0.25 : -0.25))),
          event2
        );
        break;
      default:
        this.#media.remote[method9]?.(event2);
    }
    this.$state.lastKeyboardAction.set({
      action: method9,
      event: event2
    });
  }
  #onPreventVideoKeys(event2) {
    if (isHTMLMediaElement(event2.target) && this.#getMatchingMethod(event2).method) {
      event2.preventDefault();
    }
  }
  #getMatchingMethod(event2) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this.#media.ariaKeys
    };
    const method9 = Object.keys(keyShortcuts).find((method10) => {
      const value = keyShortcuts[method10], keys = isArray(value) ? value.join(" ") : isString(value) ? value : value?.keys;
      const combinations = (isArray(keys) ? keys : keys?.split(" "))?.map(
        (key2) => replaceSymbolKeys(key2).replace(/Control/g, "Ctrl").split("+")
      );
      return combinations?.some((combo) => {
        const modifierKeys = new Set(combo.filter((key2) => MODIFIER_KEYS.has(key2)));
        for (const modKey of MODIFIER_KEYS) {
          const modKeyProp = modKey.toLowerCase() + "Key";
          if (!modifierKeys.has(modKey) && event2[modKeyProp]) {
            return false;
          }
        }
        return combo.every((key2) => {
          return MODIFIER_KEYS.has(key2) ? event2[key2.toLowerCase() + "Key"] : event2.key === key2.replace("Space", " ");
        });
      });
    });
    return {
      method: method9,
      value: method9 ? keyShortcuts[method9] : null
    };
  }
  #seekTotal;
  #calcSeekAmount(event2, type) {
    const seekBy = event2.shiftKey ? 10 : 5;
    return this.#seekTotal = Math.max(
      0,
      Math.min(
        (this.#seekTotal ?? this.$state.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$state.duration()
      )
    );
  }
  #timeSlider = null;
  #forwardTimeKeyboardEvent(event2, forward) {
    this.#timeSlider?.dispatchEvent(
      new KeyboardEvent(event2.type, {
        key: !forward ? "Left" : "Right",
        shiftKey: event2.shiftKey,
        trigger: event2
      })
    );
  }
  #seeking(event2, type, forward) {
    if (!this.$state.canSeek()) return;
    if (!this.#timeSlider) {
      this.#timeSlider = this.el.querySelector("[data-media-time-slider]");
    }
    if (this.#timeSlider) {
      this.#forwardTimeKeyboardEvent(event2, forward);
    } else {
      this.#media.remote.seeking(this.#calcSeekAmount(event2, type), event2);
    }
  }
};
var SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key2) {
  return key2.replace(/Shift\+(\d)/g, (_2, num) => SYMBOL_KEY_MAP[num - 1]);
}

// src/core/api/player-props.ts
var mediaPlayerProps = {
  artist: "",
  artwork: null,
  autoplay: false,
  autoPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  currentTime: 0,
  crossorigin: null,
  crossOrigin: null,
  duration: -1,
  fullscreenOrientation: "landscape",
  googleCast: {},
  load: "visible",
  posterLoad: "visible",
  logLevel: true ? "warn" : "silent",
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playsInline: false,
  playbackRate: 1,
  poster: "",
  preload: "metadata",
  preferNativeHLS: false,
  src: "",
  title: "",
  controlsDelay: 2e3,
  hideControlsOnMouseLeave: false,
  viewType: "unknown",
  streamType: "unknown",
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: "player",
  keyShortcuts: MEDIA_KEY_SHORTCUTS,
  storage: null
};

// ../../../node_modules/.pnpm/fscreen@1.2.0/node_modules/fscreen/dist/fscreen.esm.js
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
  "webkitFullscreenEnabled",
  "webkitFullscreenElement",
  "webkitRequestFullscreen",
  "webkitExitFullscreen",
  "webkitfullscreenchange",
  "webkitfullscreenerror",
  "-webkit-full-screen"
];
var moz = [
  "mozFullScreenEnabled",
  "mozFullScreenElement",
  "mozRequestFullScreen",
  "mozCancelFullScreen",
  "mozfullscreenchange",
  "mozfullscreenerror",
  "-moz-full-screen"
];
var ms = [
  "msFullscreenEnabled",
  "msFullscreenElement",
  "msRequestFullscreen",
  "msExitFullscreen",
  "MSFullscreenChange",
  "MSFullscreenError",
  "-ms-fullscreen"
];
var document2 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document2 && Object.keys(key) || webkit[0] in document2 && webkit || moz[0] in document2 && moz || ms[0] in document2 && ms || [];
var fscreen = {
  requestFullscreen: function(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document2[vendor[key.exitFullscreen]].bind(document2);
  },
  get fullscreenPseudoClass() {
    return ":" + vendor[key.fullscreen];
  },
  addEventListener: function(type, handler, options) {
    return document2.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function(type, handler, options) {
    return document2.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document2[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {
  },
  get fullscreenElement() {
    return document2[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {
  },
  get onfullscreenchange() {
    return document2[("on" + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document2[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document2[("on" + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document2[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};
var fscreen_esm_default = fscreen;

// src/core/api/player-state.ts
init_prod();
init_support();
init_time_ranges();
init_text_track();
var mediaState = new State({
  artist: "",
  artwork: null,
  audioTrack: null,
  audioTracks: [],
  autoPlay: false,
  autoPlayError: null,
  audioGain: null,
  buffered: new TimeRange(),
  canLoad: false,
  canLoadPoster: false,
  canFullscreen: false,
  canOrientScreen: canOrientScreen(),
  canPictureInPicture: false,
  canPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  get iOSControls() {
    return IS_IPHONE && this.mediaType === "video" && (!this.playsInline || !fscreen_esm_default.fullscreenEnabled && this.fullscreen);
  },
  get nativeControls() {
    return this.controls || this.iOSControls;
  },
  controlsVisible: false,
  get controlsHidden() {
    return !this.controlsVisible;
  },
  crossOrigin: null,
  ended: false,
  error: null,
  fullscreen: false,
  get loop() {
    return this.providedLoop || this.userPrefersLoop;
  },
  logLevel: true ? "warn" : "silent",
  mediaType: "unknown",
  muted: false,
  paused: true,
  played: new TimeRange(),
  playing: false,
  playsInline: false,
  pictureInPicture: false,
  preload: "metadata",
  playbackRate: 1,
  qualities: [],
  quality: null,
  autoQuality: false,
  canSetQuality: true,
  canSetPlaybackRate: true,
  canSetVolume: false,
  canSetAudioGain: false,
  seekable: new TimeRange(),
  seeking: false,
  source: { src: "", type: "" },
  sources: [],
  started: false,
  textTracks: [],
  textTrack: null,
  get hasCaptions() {
    return this.textTracks.filter(isTrackCaptionKind).length > 0;
  },
  volume: 1,
  waiting: false,
  realCurrentTime: 0,
  get currentTime() {
    return this.ended ? this.duration : this.clipStartTime > 0 ? Math.max(0, Math.min(this.realCurrentTime - this.clipStartTime, this.duration)) : this.realCurrentTime;
  },
  providedDuration: -1,
  intrinsicDuration: 0,
  get realDuration() {
    return this.providedDuration > 0 ? this.providedDuration : this.intrinsicDuration;
  },
  get duration() {
    return this.clipEndTime > 0 ? this.clipEndTime - this.clipStartTime : Math.max(0, this.realDuration - this.clipStartTime);
  },
  get title() {
    return this.providedTitle || this.inferredTitle;
  },
  get poster() {
    return this.providedPoster || this.inferredPoster;
  },
  get viewType() {
    return this.providedViewType !== "unknown" ? this.providedViewType : this.inferredViewType;
  },
  get streamType() {
    return this.providedStreamType !== "unknown" ? this.providedStreamType : this.inferredStreamType;
  },
  get currentSrc() {
    return this.source;
  },
  get bufferedStart() {
    const start = getTimeRangesStart(this.buffered) ?? 0;
    return Math.max(0, start - this.clipStartTime);
  },
  get bufferedEnd() {
    const end = getTimeRangesEnd(this.buffered) ?? 0;
    return Math.min(this.duration, Math.max(0, end - this.clipStartTime));
  },
  get seekableStart() {
    const start = getTimeRangesStart(this.seekable) ?? 0;
    return Math.max(0, start - this.clipStartTime);
  },
  get seekableEnd() {
    const end = this.canPlay ? getTimeRangesEnd(this.seekable) ?? Infinity : 0;
    return this.clipEndTime > 0 ? Math.max(this.clipEndTime, Math.max(0, end - this.clipStartTime)) : end;
  },
  get seekableWindow() {
    return Math.max(0, this.seekableEnd - this.seekableStart);
  },
  // ~~ remote playback ~~
  canAirPlay: false,
  canGoogleCast: false,
  remotePlaybackState: "disconnected",
  remotePlaybackType: "none",
  remotePlaybackLoader: null,
  remotePlaybackInfo: null,
  get isAirPlayConnected() {
    return this.remotePlaybackType === "airplay" && this.remotePlaybackState === "connected";
  },
  get isGoogleCastConnected() {
    return this.remotePlaybackType === "google-cast" && this.remotePlaybackState === "connected";
  },
  // ~~ responsive design ~~
  pointer: "fine",
  orientation: "landscape",
  width: 0,
  height: 0,
  mediaWidth: 0,
  mediaHeight: 0,
  lastKeyboardAction: null,
  // ~~ user props ~~
  userBehindLiveEdge: false,
  // ~~ live props ~~
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  get canSeek() {
    return /unknown|on-demand|:dvr/.test(this.streamType) && Number.isFinite(this.seekableWindow) && (!this.live || /:dvr/.test(this.streamType) && this.seekableWindow >= this.minLiveDVRWindow);
  },
  get live() {
    return this.streamType.includes("live") || !Number.isFinite(this.realDuration);
  },
  get liveEdgeStart() {
    return this.live && Number.isFinite(this.seekableEnd) ? Math.max(0, (this.liveSyncPosition ?? this.seekableEnd) - this.liveEdgeTolerance) : 0;
  },
  get liveEdge() {
    return this.live && (!this.canSeek || !this.userBehindLiveEdge && this.currentTime >= this.liveEdgeStart);
  },
  get liveEdgeWindow() {
    return this.live && Number.isFinite(this.seekableEnd) ? this.seekableEnd - this.liveEdgeStart : 0;
  },
  // ~~ internal props ~~
  autoPlaying: false,
  providedTitle: "",
  inferredTitle: "",
  providedLoop: false,
  userPrefersLoop: false,
  providedPoster: "",
  inferredPoster: "",
  inferredViewType: "unknown",
  providedViewType: "unknown",
  providedStreamType: "unknown",
  inferredStreamType: "unknown",
  liveSyncPosition: null,
  savedState: null
});
var RESET_ON_SRC_QUALITY_CHANGE = /* @__PURE__ */ new Set([
  "autoPlayError",
  "autoPlaying",
  "buffered",
  "canPlay",
  "error",
  "paused",
  "played",
  "playing",
  "seekable",
  "seeking",
  "waiting"
]);
var RESET_ON_SRC_CHANGE = /* @__PURE__ */ new Set([
  ...RESET_ON_SRC_QUALITY_CHANGE,
  "ended",
  "inferredPoster",
  "inferredStreamType",
  "inferredTitle",
  "intrinsicDuration",
  "liveSyncPosition",
  "realCurrentTime",
  "savedState",
  "started",
  "userBehindLiveEdge"
]);
function softResetMediaState($media, isSourceQualityChange = false) {
  const filter = isSourceQualityChange ? RESET_ON_SRC_QUALITY_CHANGE : RESET_ON_SRC_CHANGE;
  mediaState.reset($media, (prop8) => filter.has(prop8));
  tick();
}

// src/core/quality/video-quality.ts
init_std();

// src/foundation/list/select-list.ts
init_std();

// src/foundation/list/list.ts
init_std();
init_symbols2();
var List = class extends EventsTarget {
  items = [];
  /** @internal */
  [ListSymbol.readonly] = false;
  get length() {
    return this.items.length;
  }
  get readonly() {
    return this[ListSymbol.readonly];
  }
  /**
   * Returns the index of the first occurrence of the given item, or -1 if it is not present.
   */
  indexOf(item) {
    return this.items.indexOf(item);
  }
  /**
   * Returns an item matching the given `id`, or `null` if not present.
   */
  getById(id2) {
    if (id2 === "") return null;
    return this.items.find((item) => item.id === id2) ?? null;
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.items];
  }
  [Symbol.iterator]() {
    return this.items.values();
  }
  /** @internal */
  [ListSymbol.add](item, trigger) {
    const index = this.items.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.items[index];
        }
      });
    }
    if (this.items.includes(item)) return;
    this.items.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /** @internal */
  [ListSymbol.remove](item, trigger) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this[ListSymbol.onRemove]?.(item, trigger);
      this.items.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /** @internal */
  [ListSymbol.reset](trigger) {
    for (const item of [...this.items]) this[ListSymbol.remove](item, trigger);
    this.items = [];
    this[ListSymbol.setReadonly](false, trigger);
    this[ListSymbol.onReset]?.();
  }
  /** @internal */
  [ListSymbol.setReadonly](readonly2, trigger) {
    if (this[ListSymbol.readonly] === readonly2) return;
    this[ListSymbol.readonly] = readonly2;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly2, trigger }));
  }
};

// src/foundation/list/select-list.ts
init_symbols2();
var SELECTED = Symbol(true ? "SELECTED" : 0);
var SelectList = class extends List {
  get selected() {
    return this.items.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol.onRemove](item, trigger) {
    this[ListSymbol.select](item, false, trigger);
  }
  /** @internal */
  [ListSymbol.add](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        if (this.readonly) return;
        this[ListSymbol.onUserSelect]?.();
        this[ListSymbol.select](item, selected);
      }
    });
    super[ListSymbol.add](item, trigger);
  }
  /** @internal */
  [ListSymbol.select](item, selected, trigger) {
    if (selected === item?.[SELECTED]) return;
    const prev = this.selected;
    if (item) item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev) prev[SELECTED] = false;
      this.dispatchEvent(
        new DOMEvent("change", {
          detail: {
            prev,
            current: this.selected
          },
          trigger
        })
      );
    }
  }
};

// src/core/quality/video-quality.ts
init_symbols2();
init_symbols3();
var VideoQualityList = class extends SelectList {
  #auto = false;
  /**
   * Configures quality switching:
   *
   * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
   * request if any, flush the whole buffer, and fetch fragment matching with current position
   * and requested quality level.
   *
   * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
   * already buffered next fragment.
   *
   * - `load`: Set quality level for next loaded fragment.
   *
   * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
   */
  switch = "current";
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this.#auto || this.readonly;
  }
  /** @internal */
  [QualitySymbol.enableAuto];
  /** @internal */
  [ListSymbol.onUserSelect]() {
    this[QualitySymbol.setAuto](false);
  }
  /** @internal */
  [ListSymbol.onReset](trigger) {
    this[QualitySymbol.enableAuto] = void 0;
    this[QualitySymbol.setAuto](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.#auto || !this[QualitySymbol.enableAuto]) return;
    this[QualitySymbol.enableAuto]?.(trigger);
    this[QualitySymbol.setAuto](true, trigger);
  }
  getBySrc(src) {
    return this.items.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol.setAuto](auto, trigger) {
    if (this.#auto === auto) return;
    this.#auto = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
};

// src/core/state/media-events-logger.ts
var MEDIA_EVENTS = true ? [
  "abort",
  "can-play",
  "can-play-through",
  "duration-change",
  "emptied",
  "ended",
  "error",
  "fullscreen-change",
  "loaded-data",
  "loaded-metadata",
  "load-start",
  "media-type-change",
  "pause",
  "play",
  "playing",
  "progress",
  "seeked",
  "seeking",
  "source-change",
  "sources-change",
  "stalled",
  "started",
  "suspend",
  "stream-type-change",
  "replay",
  // time-change,
  // 'time-update',
  "view-type-change",
  "volume-change",
  "waiting"
] : void 0;
var MediaEventsLogger = class extends MediaPlayerController {
  #media;
  constructor(media) {
    super();
    this.#media = media;
  }
  onConnect() {
    const handler = this.#onMediaEvent.bind(this);
    for (const eventType of MEDIA_EVENTS) this.listen(eventType, handler);
  }
  #onMediaEvent(event2) {
    this.#media.logger?.debugGroup(`\u{1F4E1} dispatching \`${event2.type}\``).labelledLog("Media Store", { ...this.$state }).labelledLog("Event", event2).dispatch();
  }
};

// src/core/state/media-load-controller.ts
init_prod();
init_std();
var MediaLoadController = class extends MediaPlayerController {
  #type;
  #callback;
  constructor(type, callback) {
    super();
    this.#type = type;
    this.#callback = callback;
  }
  async onAttach(el) {
    if (false) return;
    const load = this.$props[this.#type]();
    if (load === "eager") {
      requestAnimationFrame(this.#callback);
    } else if (load === "idle") {
      waitIdlePeriod(this.#callback);
    } else if (load === "visible") {
      let dispose2, observer = new IntersectionObserver((entries) => {
        if (!this.scope) return;
        if (entries[0].isIntersecting) {
          dispose2?.();
          dispose2 = void 0;
          this.#callback();
        }
      });
      observer.observe(el);
      dispose2 = onDispose(() => observer.disconnect());
    }
  }
};

// src/core/state/media-player-delegate.ts
init_prod();
init_std();
var seenAutoplayWarning = false;
var MediaPlayerDelegate = class {
  #handle;
  #media;
  constructor(handle, media) {
    this.#handle = handle;
    this.#media = media;
  }
  notify(type, ...init2) {
    if (false) return;
    this.#handle(
      new DOMEvent(type, {
        detail: init2?.[0],
        trigger: init2?.[1]
      })
    );
  }
  async ready(info, trigger) {
    if (false) return;
    return untrack(async () => {
      const { logger } = this.#media, {
        autoPlay,
        canPlay,
        started,
        duration,
        seekable,
        buffered,
        remotePlaybackInfo,
        playsInline,
        savedState,
        source
      } = this.#media.$state;
      if (canPlay()) return;
      const detail = {
        duration: info?.duration ?? duration(),
        seekable: info?.seekable ?? seekable(),
        buffered: info?.buffered ?? buffered(),
        provider: this.#media.$provider()
      };
      this.notify("can-play", detail, trigger);
      tick();
      if (true) {
        logger?.infoGroup("-~-~-~-~-~-~- \u2705 MEDIA READY -~-~-~-~-~-~-").labelledLog("Media", this.#media).labelledLog("Trigger Event", trigger).dispatch();
      }
      let provider = this.#media.$provider(), { storage, qualities } = this.#media, { muted, volume, clipStartTime, playbackRate } = this.#media.$props;
      await storage?.onLoad?.(source());
      const savedPlaybackTime = savedState()?.currentTime, savedPlayingState = savedState()?.paused, storageTime = await storage?.getTime(), startTime = savedPlaybackTime ?? storageTime ?? clipStartTime(), shouldAutoPlay = savedPlayingState || savedPlayingState !== false && !started() && autoPlay();
      if (provider) {
        provider.setVolume(await storage?.getVolume() ?? volume());
        provider.setMuted(muted() || !!await storage?.getMuted());
        const audioGain = await storage?.getAudioGain() ?? 1;
        if (audioGain > 1) provider.audioGain?.setGain?.(audioGain);
        provider.setPlaybackRate?.(await storage?.getPlaybackRate() ?? playbackRate());
        provider.setPlaysInline?.(playsInline());
        if (startTime > 0) provider.setCurrentTime(startTime);
      }
      const prefQuality = await storage?.getVideoQuality();
      if (prefQuality && qualities.length) {
        let currentQuality = null, currentScore = Infinity;
        for (const quality of qualities) {
          const score = Math.abs(prefQuality.width - quality.width) + Math.abs(prefQuality.height - quality.height) + (prefQuality.bitrate ? Math.abs(prefQuality.bitrate - (quality.bitrate ?? 0)) : 0);
          if (score < currentScore) {
            currentQuality = quality;
            currentScore = score;
          }
        }
        if (currentQuality) currentQuality.selected = true;
      }
      if (canPlay() && shouldAutoPlay) {
        await this.#attemptAutoplay(trigger);
      } else if (storageTime && storageTime > 0) {
        this.notify("started", void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
  async #attemptAutoplay(trigger) {
    const {
      player,
      $state: { autoPlaying, muted }
    } = this.#media;
    autoPlaying.set(true);
    const attemptEvent = new DOMEvent("auto-play-attempt", { trigger });
    try {
      await player.play(attemptEvent);
    } catch (error) {
      if (!seenAutoplayWarning) {
        const muteMsg = !muted() ? " Attempting with volume muted will most likely resolve the issue." : "";
        this.#media.logger?.errorGroup("[vidstack] auto-play request failed").labelledLog(
          "Message",
          `Autoplay was requested but failed most likely due to browser autoplay policies.${muteMsg}`
        ).labelledLog("Trigger Event", trigger).labelledLog("Error", error).labelledLog("See", "https://developer.chrome.com/blog/autoplay").dispatch();
        seenAutoplayWarning = true;
      }
    }
  }
};

// src/core/state/media-request-manager.ts
init_prod();
init_std();

// src/foundation/fullscreen/controller.ts
init_prod();
init_std();
var CAN_FULLSCREEN = fscreen_esm_default.fullscreenEnabled;
var FullscreenController = class extends ViewController {
  /**
   * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
   * listened to globally on the document so we need to know if they relate to the current host
   * element or not.
   */
  #listening = false;
  #active = false;
  get active() {
    return this.#active;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen_esm_default, "fullscreenchange", this.#onChange.bind(this));
    listenEvent(fscreen_esm_default, "fullscreenerror", this.#onError.bind(this));
    onDispose(this.#onDisconnect.bind(this));
  }
  async #onDisconnect() {
    if (CAN_FULLSCREEN) await this.exit();
  }
  #onChange(event2) {
    const active = isFullscreen(this.el);
    if (active === this.#active) return;
    if (!active) this.#listening = false;
    this.#active = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event2 });
  }
  #onError(event2) {
    if (!this.#listening) return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event2 });
    this.#listening = false;
  }
  async enter() {
    try {
      this.#listening = true;
      if (!this.el || isFullscreen(this.el)) return;
      assertFullscreenAPI();
      return fscreen_esm_default.requestFullscreen(this.el);
    } catch (error) {
      this.#listening = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el)) return;
    assertFullscreenAPI();
    return fscreen_esm_default.exitFullscreen();
  }
};
function isFullscreen(host) {
  if (fscreen_esm_default.fullscreenElement === host) return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen_esm_default.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN) return;
  throw Error(
    true ? "[vidstack] fullscreen API is not enabled or supported in this environment" : "[vidstack] no fullscreen API"
  );
}

// src/foundation/orientation/controller.ts
init_prod();
init_std();
init_support();
var ScreenOrientationController = class _ScreenOrientationController extends ViewController {
  #type = signal(this.#getScreenOrientation());
  #locked = signal(false);
  #currentLock;
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.#type();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.#locked();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.#type().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.#type().startsWith("landscape");
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  static supported = canOrientScreen();
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return _ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(screen.orientation, "change", this.#onOrientationChange.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.#onOrientationChange.bind(this);
      onDispose(() => query.onchange = null);
    }
    onDispose(this.#onDisconnect.bind(this));
  }
  async #onDisconnect() {
    if (this.supported && this.#locked()) await this.unlock();
  }
  #onOrientationChange(event2) {
    this.#type.set(this.#getScreenOrientation());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.#type),
        lock: this.#currentLock
      },
      trigger: event2
    });
  }
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async lock(lockType) {
    if (peek(this.#locked) || this.#currentLock === lockType) return;
    this.#assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    this.#locked.set(true);
    this.#currentLock = lockType;
  }
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async unlock() {
    if (!peek(this.#locked)) return;
    this.#assertScreenOrientationAPI();
    this.#currentLock = void 0;
    await screen.orientation.unlock();
    this.#locked.set(false);
  }
  #assertScreenOrientationAPI() {
    if (this.supported) return;
    throw Error(
      true ? "[vidstack] screen orientation API is not available" : "[vidstack] no orientation API"
    );
  }
  #getScreenOrientation() {
    if (false) return "portrait-primary";
    if (this.supported) return window.screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }
};

// src/foundation/queue/queue.ts
var Queue = class {
  #queue = /* @__PURE__ */ new Map();
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  enqueue(key2, item) {
    this.#queue.set(key2, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  serve(key2) {
    const value = this.peek(key2);
    this.#queue.delete(key2);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  peek(key2) {
    return this.#queue.get(key2);
  }
  /**
   * Removes queued item under the given `key`.
   */
  delete(key2) {
    this.#queue.delete(key2);
  }
  /**
   * Clear all items in the queue.
   */
  clear() {
    this.#queue.clear();
  }
};

// src/foundation/queue/request-queue.ts
init_std();
var RequestQueue = class {
  #serving = false;
  #pending = deferredPromise();
  #queue = /* @__PURE__ */ new Map();
  /**
   * The number of callbacks that are currently in queue.
   */
  get size() {
    return this.#queue.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get isServing() {
    return this.#serving;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async waitForFlush() {
    if (this.#serving) return;
    await this.#pending.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  enqueue(key2, callback) {
    if (this.#serving) {
      callback();
      return;
    }
    this.#queue.delete(key2);
    this.#queue.set(key2, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  serve(key2) {
    this.#queue.get(key2)?.();
    this.#queue.delete(key2);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  start() {
    this.#flush();
    this.#serving = true;
    if (this.#queue.size > 0) this.#flush();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  stop() {
    this.#serving = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  reset() {
    this.stop();
    this.#queue.clear();
    this.#release();
  }
  #flush() {
    for (const key2 of this.#queue.keys()) this.serve(key2);
    this.#release();
  }
  #release() {
    this.#pending.resolve();
    this.#pending = deferredPromise();
  }
};

// src/core/state/media-request-manager.ts
init_error();
init_mime();
init_network();
init_support();

// src/core/controls.ts
init_prod();
init_std();
init_dom();
var MediaControls = class extends MediaPlayerController {
  #idleTimer = -2;
  #pausedTracking = false;
  #hideOnMouseLeave = signal(false);
  #isMouseOutside = signal(false);
  #focusedItem = null;
  #canIdle = signal(true);
  /**
   * The default amount of delay in milliseconds while media playback is progressing without user
   * activity to indicate an idle state (i.e., hide controls).
   *
   * @defaultValue 2000
   */
  defaultDelay = 2e3;
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return this.#canIdle();
  }
  set canIdle(canIdle) {
    this.#canIdle.set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return this.#hideOnMouseLeave() || hideControlsOnMouseLeave();
  }
  set hideOnMouseLeave(hide2) {
    this.#hideOnMouseLeave.set(hide2);
  }
  /**
   * Whether media controls are currently visible.
   */
  get showing() {
    return this.$state.controlsVisible();
  }
  /**
   * Show controls.
   */
  show(delay = 0, trigger) {
    this.#clearIdleTimer();
    if (!this.#pausedTracking) {
      this.#changeVisibility(true, delay, trigger);
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    this.#clearIdleTimer();
    if (!this.#pausedTracking) {
      this.#changeVisibility(false, delay, trigger);
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    this.#pausedTracking = true;
    this.#clearIdleTimer();
    this.#changeVisibility(true, 0, trigger);
  }
  resume(trigger) {
    this.#pausedTracking = false;
    if (this.$state.paused()) return;
    this.#changeVisibility(false, this.defaultDelay, trigger);
  }
  onConnect() {
    effect(this.#init.bind(this));
  }
  #init() {
    const { viewType } = this.$state;
    if (!this.#canIdle()) return;
    if (viewType() === "audio") {
      this.show();
      return;
    }
    effect(this.#watchMouse.bind(this));
    effect(this.#watchPaused.bind(this));
    const onPlay = this.#onPlay.bind(this), onPause = this.#onPause.bind(this);
    this.listen("can-play", (event2) => this.show(0, event2));
    this.listen("play", onPlay);
    this.listen("pause", onPause);
    this.listen("auto-play-fail", onPause);
  }
  #watchMouse() {
    const { started, pointer, paused } = this.$state;
    if (!started() || pointer() !== "fine") return;
    const shouldHideOnMouseLeave = this.hideOnMouseLeave;
    if (!shouldHideOnMouseLeave || !this.#isMouseOutside()) {
      effect(() => {
        if (!paused()) this.listen("pointermove", this.#onStopIdle.bind(this));
      });
    }
    if (shouldHideOnMouseLeave) {
      this.listen("mouseenter", this.#onMouseEnter.bind(this));
      this.listen("mouseleave", this.#onMouseLeave.bind(this));
    }
  }
  #watchPaused() {
    const { paused, started, autoPlayError } = this.$state;
    if (paused() || autoPlayError() && !started()) return;
    const onStopIdle = this.#onStopIdle.bind(this);
    effect(() => {
      const pointer = this.$state.pointer(), isTouch = pointer === "coarse", events = [isTouch ? "touchend" : "pointerup", "keydown"];
      for (const eventType of events) {
        this.listen(eventType, onStopIdle, { passive: false });
      }
    });
  }
  #onPlay(event2) {
    this.show(0, event2);
    this.hide(void 0, event2);
  }
  #onPause(event2) {
    this.show(0, event2);
  }
  #onMouseEnter(event2) {
    this.#isMouseOutside.set(false);
    this.show(0, event2);
    this.hide(void 0, event2);
  }
  #onMouseLeave(event2) {
    this.#isMouseOutside.set(true);
    this.hide(0, event2);
  }
  #clearIdleTimer() {
    window.clearTimeout(this.#idleTimer);
    this.#idleTimer = -1;
  }
  #onStopIdle(event2) {
    if (
      // @ts-expect-error
      event2.MEDIA_GESTURE || this.#pausedTracking || isTouchPinchEvent(event2)
    ) {
      return;
    }
    if (isKeyboardEvent(event2)) {
      if (event2.key === "Escape") {
        this.el?.focus();
        this.#focusedItem = null;
      } else if (this.#focusedItem) {
        event2.preventDefault();
        requestAnimationFrame(() => {
          this.#focusedItem?.focus();
          this.#focusedItem = null;
        });
      }
    }
    this.show(0, event2);
    this.hide(this.defaultDelay, event2);
  }
  #changeVisibility(visible, delay, trigger) {
    if (delay === 0) {
      this.#onChange(visible, trigger);
      return;
    }
    this.#idleTimer = window.setTimeout(() => {
      if (!this.scope) return;
      this.#onChange(visible && !this.#pausedTracking, trigger);
    }, delay);
  }
  #onChange(visible, trigger) {
    if (this.$state.controlsVisible() === visible) return;
    this.$state.controlsVisible.set(visible);
    if (!visible && document.activeElement && this.el?.contains(document.activeElement)) {
      this.#focusedItem = document.activeElement;
      requestAnimationFrame(() => {
        this.el?.focus({ preventScroll: true });
      });
    }
    this.dispatch("controls-change", {
      detail: visible,
      trigger
    });
  }
};

// src/core/state/media-request-manager.ts
var MediaRequestManager = class extends MediaPlayerController {
  #stateMgr;
  #request;
  #media;
  controls;
  #fullscreen;
  #orientation;
  #$provider;
  #providerQueue = new RequestQueue();
  constructor(stateMgr, request, media) {
    super();
    this.#stateMgr = stateMgr;
    this.#request = request;
    this.#media = media;
    this.#$provider = media.$provider;
    this.controls = new MediaControls();
    this.#fullscreen = new FullscreenController();
    this.#orientation = new ScreenOrientationController();
  }
  onAttach() {
    this.listen("fullscreen-change", this.#onFullscreenChange.bind(this));
  }
  onConnect() {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.#handleRequest.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this.#attachLoadPlayListener();
    effect(this.#watchProvider.bind(this));
    effect(this.#watchControlsDelayChange.bind(this));
    effect(this.#watchAudioGainSupport.bind(this));
    effect(this.#watchAirPlaySupport.bind(this));
    effect(this.#watchGoogleCastSupport.bind(this));
    effect(this.#watchFullscreenSupport.bind(this));
    effect(this.#watchPiPSupport.bind(this));
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent("destroy"), { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen()) this.exitFullscreen("prefer-media", destroyEvent);
      if (pictureInPicture()) this.exitPictureInPicture(destroyEvent);
    } catch (e6) {
    }
    this.#providerQueue.reset();
  }
  #attachLoadPlayListener() {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() !== "play" || canLoad()) return;
    const off = this.listen("media-play-request", (event2) => {
      this.#handleLoadPlayStrategy(event2);
      off();
    });
  }
  #watchProvider() {
    const provider = this.#$provider(), canPlay = this.$state.canPlay();
    if (provider && canPlay) {
      this.#providerQueue.start();
    }
    return () => {
      this.#providerQueue.stop();
    };
  }
  #handleRequest(event2) {
    event2.stopPropagation();
    if (event2.defaultPrevented) return;
    if (true) {
      this.#media.logger?.infoGroup(`\u{1F4EC} received \`${event2.type}\``).labelledLog("Request", event2).dispatch();
    }
    if (!this[event2.type]) return;
    if (peek(this.#$provider)) {
      this[event2.type](event2);
    } else {
      this.#providerQueue.enqueue(event2.type, () => {
        if (peek(this.#$provider)) this[event2.type](event2);
      });
    }
  }
  async play(trigger) {
    if (false) return;
    const { canPlay, paused, autoPlaying } = this.$state;
    if (this.#handleLoadPlayStrategy(trigger)) return;
    if (!peek(paused)) return;
    if (trigger) this.#request.queue.enqueue("media-play-request", trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider = peek(this.#$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.play();
    } catch (error) {
      if (true) this.#logError("play request failed", error, trigger);
      const errorEvent = this.createEvent("play-fail", {
        detail: coerceToError(error),
        trigger
      });
      errorEvent.autoPlay = isAutoPlaying;
      this.#stateMgr.handle(errorEvent);
      throw error;
    }
  }
  #handleLoadPlayStrategy(trigger) {
    const { load } = this.$props, { canLoad } = this.$state;
    if (load() === "play" && !canLoad()) {
      const event2 = this.createEvent("media-start-loading", { trigger });
      this.dispatchEvent(event2);
      this.#providerQueue.enqueue("media-play-request", async () => {
        try {
          await this.play(event2);
        } catch (error) {
        }
      });
      return true;
    }
    return false;
  }
  async pause(trigger) {
    if (false) return;
    const { canPlay, paused } = this.$state;
    if (peek(paused)) return;
    if (trigger) {
      this.#request.queue.enqueue("media-pause-request", trigger);
    }
    try {
      const provider = peek(this.#$provider);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      return await provider.pause();
    } catch (error) {
      this.#request.queue.delete("media-pause-request");
      if (true) {
        this.#logError("pause request failed", error, trigger);
      }
      throw error;
    }
  }
  setAudioGain(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain) return;
    const provider = this.#$provider();
    if (!provider?.audioGain || !canSetAudioGain()) {
      throw Error("[vidstack] audio gain api not available");
    }
    if (trigger) {
      this.#request.queue.enqueue("media-audio-gain-change-request", trigger);
    }
    provider.audioGain.setGain(gain);
  }
  seekToLiveEdge(trigger) {
    if (false) return;
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek())) return;
    const provider = peek(this.#$provider);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    if (trigger) this.#request.queue.enqueue("media-seek-request", trigger);
    const end = seekableEnd() - 2;
    provider.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  #wasPIPActive = false;
  async enterFullscreen(target = "prefer-media", trigger) {
    if (false) return;
    const adapter = this.#getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active) return;
    if (peek(this.$state.pictureInPicture)) {
      this.#wasPIPActive = true;
      await this.exitPictureInPicture(trigger);
    }
    if (trigger) {
      this.#request.queue.enqueue("media-enter-fullscreen-request", trigger);
    }
    return adapter.enter();
  }
  async exitFullscreen(target = "prefer-media", trigger) {
    if (false) return;
    const adapter = this.#getFullscreenAdapter(target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active) return;
    if (trigger) {
      this.#request.queue.enqueue("media-exit-fullscreen-request", trigger);
    }
    try {
      const result = await adapter.exit();
      if (this.#wasPIPActive && peek(this.$state.canPictureInPicture)) {
        await this.enterPictureInPicture();
      }
      return result;
    } finally {
      this.#wasPIPActive = false;
    }
  }
  #getFullscreenAdapter(target) {
    const provider = peek(this.#$provider);
    return target === "prefer-media" && this.#fullscreen.supported || target === "media" ? this.#fullscreen : provider?.fullscreen;
  }
  async enterPictureInPicture(trigger) {
    if (false) return;
    this.#throwIfPIPNotSupported();
    if (this.$state.pictureInPicture()) return;
    if (trigger) {
      this.#request.queue.enqueue("media-enter-pip-request", trigger);
    }
    return await this.#$provider().pictureInPicture.enter();
  }
  async exitPictureInPicture(trigger) {
    if (false) return;
    this.#throwIfPIPNotSupported();
    if (!this.$state.pictureInPicture()) return;
    if (trigger) {
      this.#request.queue.enqueue("media-exit-pip-request", trigger);
    }
    return await this.#$provider().pictureInPicture.exit();
  }
  #throwIfPIPNotSupported() {
    if (this.$state.canPictureInPicture()) return;
    throw Error(
      true ? `[vidstack] picture-in-picture is not currently available` : "[vidstack] no pip support"
    );
  }
  #watchControlsDelayChange() {
    this.controls.defaultDelay = this.$props.controlsDelay();
  }
  #watchAudioGainSupport() {
    const { canSetAudioGain } = this.$state, supported = !!this.#$provider()?.audioGain?.supported;
    canSetAudioGain.set(supported);
  }
  #watchAirPlaySupport() {
    const { canAirPlay } = this.$state, supported = !!this.#$provider()?.airPlay?.supported;
    canAirPlay.set(supported);
  }
  #watchGoogleCastSupport() {
    const { canGoogleCast, source } = this.$state, supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
    canGoogleCast.set(supported);
  }
  #watchFullscreenSupport() {
    const { canFullscreen } = this.$state, supported = this.#fullscreen.supported || !!this.#$provider()?.fullscreen?.supported;
    canFullscreen.set(supported);
  }
  #watchPiPSupport() {
    const { canPictureInPicture } = this.$state, supported = !!this.#$provider()?.pictureInPicture?.supported;
    canPictureInPicture.set(supported);
  }
  async ["media-airplay-request"](event2) {
    try {
      await this.requestAirPlay(event2);
    } catch (error) {
    }
  }
  async requestAirPlay(trigger) {
    try {
      const adapter = this.#$provider()?.airPlay;
      if (!adapter?.supported) {
        throw Error(true ? "AirPlay adapter not available on provider." : "No AirPlay adapter.");
      }
      if (trigger) {
        this.#request.queue.enqueue("media-airplay-request", trigger);
      }
      return await adapter.prompt();
    } catch (error) {
      this.#request.queue.delete("media-airplay-request");
      if (true) {
        this.#logError("airplay request failed", error, trigger);
      }
      throw error;
    }
  }
  async ["media-google-cast-request"](event2) {
    try {
      await this.requestGoogleCast(event2);
    } catch (error) {
    }
  }
  #googleCastLoader;
  async requestGoogleCast(trigger) {
    try {
      const { canGoogleCast } = this.$state;
      if (!peek(canGoogleCast)) {
        const error = Error(
          true ? "Google Cast not available on this platform." : "Cast not available."
        );
        error.code = "CAST_NOT_AVAILABLE";
        throw error;
      }
      preconnect("https://www.gstatic.com");
      if (!this.#googleCastLoader) {
        const $module = await Promise.resolve().then(() => (init_loader(), loader_exports));
        this.#googleCastLoader = new $module.GoogleCastLoader();
      }
      await this.#googleCastLoader.prompt(this.#media);
      if (trigger) {
        this.#request.queue.enqueue("media-google-cast-request", trigger);
      }
      const isConnecting = peek(this.$state.remotePlaybackState) !== "disconnected";
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime)
        });
      }
      this.$state.remotePlaybackLoader.set(isConnecting ? this.#googleCastLoader : null);
    } catch (error) {
      this.#request.queue.delete("media-google-cast-request");
      if (true) {
        this.#logError("google cast request failed", error, trigger);
      }
      throw error;
    }
  }
  ["media-clip-start-change-request"](event2) {
    const { clipStartTime } = this.$state;
    clipStartTime.set(event2.detail);
  }
  ["media-clip-end-change-request"](event2) {
    const { clipEndTime } = this.$state;
    clipEndTime.set(event2.detail);
    this.dispatch("duration-change", {
      detail: event2.detail,
      trigger: event2
    });
  }
  ["media-duration-change-request"](event2) {
    const { providedDuration, clipEndTime } = this.$state;
    providedDuration.set(event2.detail);
    if (clipEndTime() <= 0) {
      this.dispatch("duration-change", {
        detail: event2.detail,
        trigger: event2
      });
    }
  }
  ["media-audio-track-change-request"](event2) {
    const { logger, audioTracks } = this.#media;
    if (audioTracks.readonly) {
      if (true) {
        logger?.warnGroup(`[vidstack] attempted to change audio track but it is currently read-only`).labelledLog("Request Event", event2).dispatch();
      }
      return;
    }
    const index = event2.detail, track = audioTracks[index];
    if (track) {
      const key2 = event2.type;
      this.#request.queue.enqueue(key2, event2);
      track.selected = true;
    } else if (true) {
      logger?.warnGroup("[vidstack] failed audio track change request (invalid index)").labelledLog("Audio Tracks", audioTracks.toArray()).labelledLog("Index", index).labelledLog("Request Event", event2).dispatch();
    }
  }
  async ["media-enter-fullscreen-request"](event2) {
    try {
      await this.enterFullscreen(event2.detail, event2);
    } catch (error) {
      this.#onFullscreenError(error, event2);
    }
  }
  async ["media-exit-fullscreen-request"](event2) {
    try {
      await this.exitFullscreen(event2.detail, event2);
    } catch (error) {
      this.#onFullscreenError(error, event2);
    }
  }
  async #onFullscreenChange(event2) {
    const lockType = peek(this.$props.fullscreenOrientation), isFullscreen2 = event2.detail;
    if (isUndefined(lockType) || lockType === "none" || !this.#orientation.supported) return;
    if (isFullscreen2) {
      if (this.#orientation.locked) return;
      this.dispatch("media-orientation-lock-request", {
        detail: lockType,
        trigger: event2
      });
    } else if (this.#orientation.locked) {
      this.dispatch("media-orientation-unlock-request", {
        trigger: event2
      });
    }
  }
  #onFullscreenError(error, request) {
    if (true) {
      this.#logError("fullscreen request failed", error, request);
    }
    this.#stateMgr.handle(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-orientation-lock-request"](event2) {
    const key2 = event2.type;
    try {
      this.#request.queue.enqueue(key2, event2);
      await this.#orientation.lock(event2.detail);
    } catch (error) {
      this.#request.queue.delete(key2);
      if (true) {
        this.#logError("failed to lock screen orientation", error, event2);
      }
    }
  }
  async ["media-orientation-unlock-request"](event2) {
    const key2 = event2.type;
    try {
      this.#request.queue.enqueue(key2, event2);
      await this.#orientation.unlock();
    } catch (error) {
      this.#request.queue.delete(key2);
      if (true) {
        this.#logError("failed to unlock screen orientation", error, event2);
      }
    }
  }
  async ["media-enter-pip-request"](event2) {
    try {
      await this.enterPictureInPicture(event2);
    } catch (error) {
      this.#onPictureInPictureError(error, event2);
    }
  }
  async ["media-exit-pip-request"](event2) {
    try {
      await this.exitPictureInPicture(event2);
    } catch (error) {
      this.#onPictureInPictureError(error, event2);
    }
  }
  #onPictureInPictureError(error, request) {
    if (true) {
      this.#logError("pip request failed", error, request);
    }
    this.#stateMgr.handle(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event2) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek()) return;
    this.#request.queue.enqueue("media-seek-request", event2);
    try {
      this.seekToLiveEdge();
    } catch (error) {
      this.#request.queue.delete("media-seek-request");
      if (true) {
        this.#logError("seek to live edge fail", error, event2);
      }
    }
  }
  async ["media-loop-request"](event2) {
    try {
      this.#request.looping = true;
      this.#request.replaying = true;
      await this.play(event2);
    } catch (error) {
      this.#request.looping = false;
    }
  }
  ["media-user-loop-change-request"](event2) {
    this.$state.userPrefersLoop.set(event2.detail);
  }
  async ["media-pause-request"](event2) {
    if (this.$state.paused()) return;
    try {
      await this.pause(event2);
    } catch (error) {
    }
  }
  async ["media-play-request"](event2) {
    if (!this.$state.paused()) return;
    try {
      await this.play(event2);
    } catch (e6) {
    }
  }
  ["media-rate-change-request"](event2) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event2.detail || !canSetPlaybackRate()) return;
    const provider = this.#$provider();
    if (!provider?.setPlaybackRate) return;
    this.#request.queue.enqueue("media-rate-change-request", event2);
    provider.setPlaybackRate(event2.detail);
  }
  ["media-audio-gain-change-request"](event2) {
    try {
      this.setAudioGain(event2.detail, event2);
    } catch (e6) {
    }
  }
  ["media-quality-change-request"](event2) {
    const { qualities, storage, logger } = this.#media;
    if (qualities.readonly) {
      if (true) {
        logger?.warnGroup(`[vidstack] attempted to change video quality but it is currently read-only`).labelledLog("Request Event", event2).dispatch();
      }
      return;
    }
    this.#request.queue.enqueue("media-quality-change-request", event2);
    const index = event2.detail;
    if (index < 0) {
      qualities.autoSelect(event2);
      if (event2.isOriginTrusted) storage?.setVideoQuality?.(null);
    } else {
      const quality = qualities[index];
      if (quality) {
        quality.selected = true;
        if (event2.isOriginTrusted) {
          storage?.setVideoQuality?.({
            id: quality.id,
            width: quality.width,
            height: quality.height,
            bitrate: quality.bitrate
          });
        }
      } else if (true) {
        logger?.warnGroup("[vidstack] failed quality change request (invalid index)").labelledLog("Qualities", qualities.toArray()).labelledLog("Index", index).labelledLog("Request Event", event2).dispatch();
      }
    }
  }
  ["media-pause-controls-request"](event2) {
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.controls.pause(event2);
  }
  ["media-resume-controls-request"](event2) {
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.controls.resume(event2);
  }
  ["media-seek-request"](event2) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge, clipStartTime } = this.$state, seekTime = event2.detail;
    if (ended()) this.#request.replaying = true;
    const key2 = event2.type;
    this.#request.seeking = false;
    this.#request.queue.delete(key2);
    const clippedTime = seekTime + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek()) return;
    this.#request.queue.enqueue(key2, event2);
    this.#$provider().setCurrentTime(boundTime);
    if (live() && event2.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event2) {
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.$state.seeking.set(true);
    this.#request.seeking = true;
  }
  ["media-start-loading"](event2) {
    if (this.$state.canLoad()) return;
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.#stateMgr.handle(this.createEvent("can-load"));
  }
  ["media-poster-start-loading"](event2) {
    if (this.$state.canLoadPoster()) return;
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.#stateMgr.handle(this.createEvent("can-load-poster"));
  }
  ["media-text-track-change-request"](event2) {
    const { index, mode } = event2.detail, track = this.#media.textTracks[index];
    if (track) {
      const key2 = event2.type;
      this.#request.queue.enqueue(key2, event2);
      track.setMode(mode, event2);
    } else if (true) {
      this.#media.logger?.warnGroup("[vidstack] failed text track change request (invalid index)").labelledLog("Text Tracks", this.#media.textTracks.toArray()).labelledLog("Index", index).labelledLog("Request Event", event2).dispatch();
    }
  }
  ["media-mute-request"](event2) {
    if (this.$state.muted()) return;
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.#$provider().setMuted(true);
  }
  ["media-unmute-request"](event2) {
    const { muted, volume } = this.$state;
    if (!muted()) return;
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.#media.$provider().setMuted(false);
    if (volume() === 0) {
      this.#request.queue.enqueue(key2, event2);
      this.#$provider().setVolume(0.25);
    }
  }
  ["media-volume-change-request"](event2) {
    const { muted, volume } = this.$state;
    const newVolume = event2.detail;
    if (volume() === newVolume) return;
    const key2 = event2.type;
    this.#request.queue.enqueue(key2, event2);
    this.#$provider().setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      this.#request.queue.enqueue(key2, event2);
      this.#$provider().setMuted(false);
    }
  }
  #logError(title, error, request) {
    if (false) return;
    this.#media.logger?.errorGroup(`[vidstack] ${title}`).labelledLog("Error", error).labelledLog("Media Context", { ...this.#media }).labelledLog("Trigger Event", request).dispatch();
  }
};
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay) return;
  throw Error(
    true ? `[vidstack] media is not ready - wait for \`can-play\` event.` : "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen?.supported) return;
  throw Error(
    true ? `[vidstack] fullscreen is not currently available on target \`${target}\`` : "[vidstack] no fullscreen support"
  );
}
var MediaRequestContext = class {
  seeking = false;
  looping = false;
  replaying = false;
  queue = new Queue();
};

// ../../../node_modules/.pnpm/just-debounce-it@3.2.0/node_modules/just-debounce-it/index.mjs
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

// src/core/state/media-state-manager.ts
init_prod();
init_std();
init_symbols2();
init_support();

// src/core/api/src-types.ts
init_std();
function isVideoQualitySrc(src) {
  return !isString(src) && "width" in src && "height" in src && isNumber(src.width) && isNumber(src.height);
}

// src/core/state/media-state-manager.ts
init_symbols3();
init_time_ranges();
init_symbols();

// src/core/state/tracked-media-events.ts
var TRACKED_EVENT = /* @__PURE__ */ new Set([
  "auto-play",
  "auto-play-fail",
  "can-load",
  "sources-change",
  "source-change",
  "load-start",
  "abort",
  "error",
  "loaded-metadata",
  "loaded-data",
  "can-play",
  "play",
  "play-fail",
  "pause",
  "playing",
  "seeking",
  "seeked",
  "waiting"
]);

// src/core/state/media-state-manager.ts
var MediaStateManager = class extends MediaPlayerController {
  #request;
  #media;
  #trackedEvents = /* @__PURE__ */ new Map();
  #clipEnded = false;
  #playedIntervals = [];
  #playedInterval = [-1, -1];
  #firingWaiting = false;
  #waitingTrigger;
  constructor(request, media) {
    super();
    this.#request = request;
    this.#media = media;
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
    this.listen("orientation-change", this["orientation-change"].bind(this));
  }
  onConnect(el) {
    effect(this.#watchCanSetVolume.bind(this));
    this.#addTextTrackListeners();
    this.#addQualityListeners();
    this.#addAudioTrackListeners();
    this.#resumePlaybackOnConnect();
    onDispose(this.#pausePlaybackOnDisconnect.bind(this));
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = this.#media;
    audioTracks[ListSymbol.reset]();
    qualities[ListSymbol.reset]();
    textTracks[ListSymbol.reset]();
    this.#stopWatchingQualityResize();
  }
  handle(event2) {
    if (!this.scope) return;
    const type = event2.type;
    untrack(() => this[event2.type]?.(event2));
    if (true) {
      if (TRACKED_EVENT.has(type)) this.#trackedEvents.set(type, event2);
      this.dispatch(event2);
    }
  }
  #isPlayingOnDisconnect = false;
  #resumePlaybackOnConnect() {
    if (!this.#isPlayingOnDisconnect) return;
    requestAnimationFrame(() => {
      if (!this.scope) return;
      this.#media.remote.play(new DOMEvent("dom-connect"));
    });
    this.#isPlayingOnDisconnect = false;
  }
  #pausePlaybackOnDisconnect() {
    if (this.#isPlayingOnDisconnect) return;
    this.#isPlayingOnDisconnect = !this.$state.paused();
    this.#media.$provider()?.pause();
  }
  #resetTracking() {
    this.#stopWaiting();
    this.#clipEnded = false;
    this.#request.replaying = false;
    this.#request.looping = false;
    this.#firingWaiting = false;
    this.#waitingTrigger = void 0;
    this.#trackedEvents.clear();
  }
  #satisfyRequest(request, event2) {
    const requestEvent = this.#request.queue.serve(request);
    if (!requestEvent) return;
    event2.request = requestEvent;
    event2.triggers.add(requestEvent);
  }
  #addTextTrackListeners() {
    this.#onTextTracksChange();
    this.#onTextTrackModeChange();
    const textTracks = this.#media.textTracks;
    listenEvent(textTracks, "add", this.#onTextTracksChange.bind(this));
    listenEvent(textTracks, "remove", this.#onTextTracksChange.bind(this));
    listenEvent(textTracks, "mode-change", this.#onTextTrackModeChange.bind(this));
  }
  #addQualityListeners() {
    const qualities = this.#media.qualities;
    listenEvent(qualities, "add", this.#onQualitiesChange.bind(this));
    listenEvent(qualities, "remove", this.#onQualitiesChange.bind(this));
    listenEvent(qualities, "change", this.#onQualityChange.bind(this));
    listenEvent(qualities, "auto-change", this.#onAutoQualityChange.bind(this));
    listenEvent(qualities, "readonly-change", this.#onCanSetQualityChange.bind(this));
  }
  #addAudioTrackListeners() {
    const audioTracks = this.#media.audioTracks;
    listenEvent(audioTracks, "add", this.#onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "remove", this.#onAudioTracksChange.bind(this));
    listenEvent(audioTracks, "change", this.#onAudioTrackChange.bind(this));
  }
  #onTextTracksChange(event2) {
    const { textTracks } = this.$state;
    textTracks.set(this.#media.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event2
    });
  }
  #onTextTrackModeChange(event2) {
    if (event2) this.#satisfyRequest("media-text-track-change-request", event2);
    const current = this.#media.textTracks.selected, { textTrack } = this.$state;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event2
      });
    }
  }
  #onAudioTracksChange(event2) {
    const { audioTracks } = this.$state;
    audioTracks.set(this.#media.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event2
    });
  }
  #onAudioTrackChange(event2) {
    const { audioTrack } = this.$state;
    audioTrack.set(this.#media.audioTracks.selected);
    if (event2) this.#satisfyRequest("media-audio-track-change-request", event2);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event2
    });
  }
  #onQualitiesChange(event2) {
    const { qualities } = this.$state;
    qualities.set(this.#media.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event2
    });
  }
  #onQualityChange(event2) {
    const { quality } = this.$state;
    quality.set(this.#media.qualities.selected);
    if (event2) this.#satisfyRequest("media-quality-change-request", event2);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event2
    });
  }
  #onAutoQualityChange() {
    const { qualities } = this.#media, isAuto = qualities.auto;
    this.$state.autoQuality.set(isAuto);
    if (!isAuto) this.#stopWatchingQualityResize();
  }
  #stopQualityResizeEffect = null;
  #watchQualityResize() {
    this.#stopWatchingQualityResize();
    this.#stopQualityResizeEffect = effect(() => {
      const { qualities } = this.#media, { mediaWidth, mediaHeight } = this.$state, w2 = mediaWidth(), h4 = mediaHeight();
      if (w2 === 0 || h4 === 0) return;
      let selectedQuality = null, minScore = Infinity;
      for (const quality of qualities) {
        const score = Math.abs(quality.width - w2) + Math.abs(quality.height - h4);
        if (score < minScore) {
          minScore = score;
          selectedQuality = quality;
        }
      }
      if (selectedQuality) {
        qualities[ListSymbol.select](
          selectedQuality,
          true,
          new DOMEvent("resize", { detail: { width: w2, height: h4 } })
        );
      }
    });
  }
  #stopWatchingQualityResize() {
    this.#stopQualityResizeEffect?.();
    this.#stopQualityResizeEffect = null;
  }
  #onCanSetQualityChange() {
    this.$state.canSetQuality.set(!this.#media.qualities.readonly);
  }
  #watchCanSetVolume() {
    const { canSetVolume, isGoogleCastConnected } = this.$state;
    if (isGoogleCastConnected()) {
      canSetVolume.set(false);
      return;
    }
    canChangeVolume().then(canSetVolume.set);
  }
  ["provider-change"](event2) {
    const prevProvider = this.#media.$provider(), newProvider = event2.detail;
    if (prevProvider?.type === newProvider?.type) return;
    prevProvider?.destroy?.();
    prevProvider?.scope?.dispose();
    this.#media.$provider.set(event2.detail);
    if (prevProvider && event2.detail === null) {
      this.#resetMediaState(event2);
    }
  }
  ["provider-loader-change"](event2) {
    if (true) {
      this.#media.logger?.infoGroup(`Loader change \`${event2.detail?.constructor.name}\``).labelledLog("Event", event2).dispatch();
    }
  }
  ["auto-play"](event2) {
    this.$state.autoPlayError.set(null);
  }
  ["auto-play-fail"](event2) {
    this.$state.autoPlayError.set(event2.detail);
    this.#resetTracking();
  }
  ["can-load"](event2) {
    this.$state.canLoad.set(true);
    this.#trackedEvents.set("can-load", event2);
    this.#media.textTracks[TextTrackSymbol.canLoad]();
    this.#satisfyRequest("media-start-loading", event2);
  }
  ["can-load-poster"](event2) {
    this.$state.canLoadPoster.set(true);
    this.#trackedEvents.set("can-load-poster", event2);
    this.#satisfyRequest("media-poster-start-loading", event2);
  }
  ["media-type-change"](event2) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event2.detail);
    const providedViewType = this.$state.providedViewType(), currentViewType = providedViewType === "unknown" ? event2.detail : providedViewType;
    if (viewType !== currentViewType) {
      if (false) {
        this.$state.inferredViewType.set(currentViewType);
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.scope) return;
            this.$state.inferredViewType.set(event2.detail);
            this.dispatch("view-type-change", {
              detail: currentViewType,
              trigger: event2
            });
          });
        }, 0);
      }
    }
  }
  ["stream-type-change"](event2) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event2.detail);
    event2.detail = streamType();
  }
  ["rate-change"](event2) {
    const { storage } = this.#media, { canPlay } = this.$state;
    this.$state.playbackRate.set(event2.detail);
    this.#satisfyRequest("media-rate-change-request", event2);
    if (canPlay()) {
      storage?.setPlaybackRate?.(event2.detail);
    }
  }
  ["remote-playback-change"](event2) {
    const { remotePlaybackState, remotePlaybackType } = this.$state, { type, state } = event2.detail, isConnected = state === "connected";
    remotePlaybackType.set(type);
    remotePlaybackState.set(state);
    const key2 = type === "airplay" ? "media-airplay-request" : "media-google-cast-request";
    if (isConnected) {
      this.#satisfyRequest(key2, event2);
    } else {
      const requestEvent = this.#request.queue.peek(key2);
      if (requestEvent) {
        event2.request = requestEvent;
        event2.triggers.add(requestEvent);
      }
    }
  }
  ["sources-change"](event2) {
    const prevSources = this.$state.sources(), newSources = event2.detail;
    this.$state.sources.set(newSources);
    this.#onSourceQualitiesChange(prevSources, newSources, event2);
  }
  #onSourceQualitiesChange(prevSources, newSources, trigger) {
    let { qualities } = this.#media, added = false, removed = false;
    for (const prevSrc of prevSources) {
      if (!isVideoQualitySrc(prevSrc)) continue;
      const exists = newSources.some((s4) => s4.src === prevSrc.src);
      if (!exists) {
        const quality = qualities.getBySrc(prevSrc.src);
        if (quality) {
          qualities[ListSymbol.remove](quality, trigger);
          removed = true;
        }
      }
    }
    if (removed && !qualities.length) {
      this.$state.savedState.set(null);
      qualities[ListSymbol.reset](trigger);
    }
    for (const src of newSources) {
      if (!isVideoQualitySrc(src) || qualities.getBySrc(src.src)) continue;
      const quality = {
        id: src.id ?? src.height + "p",
        bitrate: null,
        codec: null,
        ...src,
        selected: false
      };
      qualities[ListSymbol.add](quality, trigger);
      added = true;
    }
    if (added && !qualities[QualitySymbol.enableAuto]) {
      this.#watchQualityResize();
      qualities[QualitySymbol.enableAuto] = this.#watchQualityResize.bind(this);
      qualities[QualitySymbol.setAuto](true, trigger);
    }
  }
  ["source-change"](event2) {
    event2.isQualityChange = event2.originEvent?.type === "quality-change";
    const source = event2.detail;
    this.#resetMediaState(event2, event2.isQualityChange);
    this.#trackedEvents.set(event2.type, event2);
    this.$state.source.set(source);
    this.el?.setAttribute("aria-busy", "true");
    if (true) {
      this.#media.logger?.infoGroup("\u{1F4FC} Media source change").labelledLog("Source", source).dispatch();
    }
  }
  #resetMediaState(event2, isSourceQualityChange = false) {
    const { audioTracks, qualities } = this.#media;
    if (!isSourceQualityChange) {
      this.#playedIntervals = [];
      this.#playedInterval = [-1, -1];
      audioTracks[ListSymbol.reset](event2);
      qualities[ListSymbol.reset](event2);
      softResetMediaState(this.$state, isSourceQualityChange);
      this.#resetTracking();
      return;
    }
    softResetMediaState(this.$state, isSourceQualityChange);
    this.#resetTracking();
  }
  ["abort"](event2) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
    const canLoadEvent = this.#trackedEvents.get("can-load");
    if (canLoadEvent && !event2.triggers.hasType("can-load")) {
      event2.triggers.add(canLoadEvent);
    }
  }
  ["load-start"](event2) {
    const sourceChangeEvent = this.#trackedEvents.get("source-change");
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
  }
  ["error"](event2) {
    this.$state.error.set(event2.detail);
    const abortEvent = this.#trackedEvents.get("abort");
    if (abortEvent) event2.triggers.add(abortEvent);
    if (true) {
      this.#media.logger?.errorGroup("Media Error").labelledLog("Error", event2.detail).labelledLog("Event", event2).labelledLog("Context", this.#media).dispatch();
    }
  }
  ["loaded-metadata"](event2) {
    const loadStartEvent = this.#trackedEvents.get("load-start");
    if (loadStartEvent) event2.triggers.add(loadStartEvent);
  }
  ["loaded-data"](event2) {
    const loadStartEvent = this.#trackedEvents.get("load-start");
    if (loadStartEvent) event2.triggers.add(loadStartEvent);
  }
  ["can-play"](event2) {
    const loadedMetadata = this.#trackedEvents.get("loaded-metadata");
    if (loadedMetadata) event2.triggers.add(loadedMetadata);
    this.#onCanPlayDetail(event2.detail);
    this.el?.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event2) {
    this.#onCanPlayDetail(event2.detail);
    const canPlay = this.#trackedEvents.get("can-play");
    if (canPlay) event2.triggers.add(canPlay);
  }
  #onCanPlayDetail(detail) {
    const { seekable, buffered, intrinsicDuration, canPlay } = this.$state;
    canPlay.set(true);
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    const seekableEnd = getTimeRangesEnd(detail.seekable) ?? Infinity;
    intrinsicDuration.set(seekableEnd);
  }
  ["duration-change"](event2) {
    const { live, intrinsicDuration, providedDuration, clipEndTime, ended } = this.$state, time = event2.detail;
    if (!live()) {
      const duration = !Number.isNaN(time) ? time : 0;
      intrinsicDuration.set(duration);
      if (ended()) this.#onEndPrecisionChange(event2);
    }
    if (providedDuration() > 0 || clipEndTime() > 0) {
      event2.stopImmediatePropagation();
    }
  }
  ["progress"](event2) {
    const { buffered, bufferedEnd, seekable, seekableEnd, live, intrinsicDuration } = this.$state, { buffered: newBuffered, seekable: newSeekable } = event2.detail, newBufferedEnd = getTimeRangesEnd(newBuffered) ?? Infinity, hasBufferedLengthChanged = newBuffered.length !== buffered().length, hasBufferedEndChanged = newBufferedEnd > bufferedEnd(), newSeekableEnd = getTimeRangesEnd(newSeekable) ?? Infinity, hasSeekableLengthChanged = newSeekable.length !== seekable().length, hasSeekableEndChanged = newSeekableEnd > seekableEnd();
    if (hasBufferedLengthChanged || hasBufferedEndChanged) {
      buffered.set(newBuffered);
    }
    if (hasSeekableLengthChanged || hasSeekableEndChanged) {
      seekable.set(newSeekable);
    }
    if (live()) {
      intrinsicDuration.set(newSeekableEnd);
      this.dispatch("duration-change", {
        detail: newSeekableEnd,
        trigger: event2
      });
    }
  }
  ["play"](event2) {
    const {
      paused,
      autoPlayError,
      ended,
      autoPlaying,
      playsInline,
      pointer,
      muted,
      viewType,
      live,
      userBehindLiveEdge
    } = this.$state;
    this.#resetPlaybackIfNeeded();
    if (!paused()) {
      event2.stopImmediatePropagation();
      return;
    }
    event2.autoPlay = autoPlaying();
    const waitingEvent = this.#trackedEvents.get("waiting");
    if (waitingEvent) event2.triggers.add(waitingEvent);
    this.#satisfyRequest("media-play-request", event2);
    this.#trackedEvents.set("play", event2);
    paused.set(false);
    autoPlayError.set(null);
    if (event2.autoPlay) {
      this.handle(
        this.createEvent("auto-play", {
          detail: { muted: muted() },
          trigger: event2
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || this.#request.replaying) {
      this.#request.replaying = false;
      ended.set(false);
      this.handle(this.createEvent("replay", { trigger: event2 }));
    }
    if (!playsInline() && viewType() === "video" && pointer() === "coarse") {
      this.#media.remote.enterFullscreen("prefer-media", event2);
    }
    if (live() && !userBehindLiveEdge()) {
      this.#media.remote.seekToLiveEdge(event2);
    }
  }
  #resetPlaybackIfNeeded(trigger) {
    const provider = peek(this.#media.$provider);
    if (!provider) return;
    const { ended, seekableStart, clipStartTime, clipEndTime, realCurrentTime, duration } = this.$state;
    const shouldReset = realCurrentTime() < clipStartTime() || clipEndTime() > 0 && realCurrentTime() >= clipEndTime() || Math.abs(realCurrentTime() - duration()) < 0.1 || ended();
    if (shouldReset) {
      this.dispatch("media-seek-request", {
        detail: (clipStartTime() > 0 ? 0 : seekableStart()) + 0.1,
        trigger
      });
    }
    return shouldReset;
  }
  ["play-fail"](event2) {
    const { muted, autoPlaying } = this.$state;
    const playEvent = this.#trackedEvents.get("play");
    if (playEvent) event2.triggers.add(playEvent);
    this.#satisfyRequest("media-play-request", event2);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    this.#resetTracking();
    this.#trackedEvents.set("play-fail", event2);
    if (event2.autoPlay) {
      this.handle(
        this.createEvent("auto-play-fail", {
          detail: {
            muted: muted(),
            error: event2.detail
          },
          trigger: event2
        })
      );
      autoPlaying.set(false);
    }
  }
  ["playing"](event2) {
    const playEvent = this.#trackedEvents.get("play"), seekedEvent = this.#trackedEvents.get("seeked");
    if (playEvent) event2.triggers.add(playEvent);
    else if (seekedEvent) event2.triggers.add(seekedEvent);
    setTimeout(() => this.#resetTracking(), 0);
    const {
      paused,
      playing,
      live,
      liveSyncPosition,
      seekableEnd,
      started,
      currentTime,
      seeking,
      ended
    } = this.$state;
    paused.set(false);
    playing.set(true);
    seeking.set(false);
    ended.set(false);
    if (this.#request.looping) {
      this.#request.looping = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end)) this.#media.$provider().setCurrentTime(end);
    }
    this["started"](event2);
  }
  ["started"](event2) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.handle(this.createEvent("started", { trigger: event2 }));
    }
  }
  ["pause"](event2) {
    if (!this.el?.isConnected) {
      this.#isPlayingOnDisconnect = true;
    }
    this.#satisfyRequest("media-pause-request", event2);
    const seekedEvent = this.#trackedEvents.get("seeked");
    if (seekedEvent) event2.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (this.#clipEnded) {
      setTimeout(() => {
        this.handle(this.createEvent("end", { trigger: event2 }));
        this.#clipEnded = false;
      }, 0);
    }
    this.#resetTracking();
  }
  ["time-change"](event2) {
    if (this.#request.looping) {
      event2.stopImmediatePropagation();
      return;
    }
    let { waiting, played, clipEndTime, realCurrentTime, currentTime } = this.$state, newTime = event2.detail, endTime = clipEndTime();
    realCurrentTime.set(newTime);
    this.#updatePlayed();
    waiting.set(false);
    for (const track of this.#media.textTracks) {
      track[TextTrackSymbol.updateActiveCues](newTime, event2);
    }
    if (endTime > 0 && newTime >= endTime) {
      this.#clipEnded = true;
      this.dispatch("media-pause-request", { trigger: event2 });
    }
    this.#saveTime();
    this.dispatch("time-update", {
      detail: { currentTime: currentTime(), played: played() },
      trigger: event2
    });
  }
  #updatePlayed() {
    const { currentTime, played, paused } = this.$state;
    if (paused()) return;
    this.#playedInterval = updateTimeIntervals(
      this.#playedIntervals,
      this.#playedInterval,
      currentTime()
    );
    played.set(new TimeRange(this.#playedIntervals));
  }
  // Called to update time again incase duration precision has changed.
  #onEndPrecisionChange(trigger) {
    const { clipStartTime, clipEndTime, duration } = this.$state, isClipped = clipStartTime() > 0 || clipEndTime() > 0;
    if (isClipped) return;
    this.handle(
      this.createEvent("time-change", {
        detail: duration(),
        trigger
      })
    );
  }
  #saveTime() {
    const { storage } = this.#media, { canPlay, realCurrentTime } = this.$state;
    if (canPlay()) {
      storage?.setTime?.(realCurrentTime());
    }
  }
  ["audio-gain-change"](event2) {
    const { storage } = this.#media, { canPlay, audioGain } = this.$state;
    audioGain.set(event2.detail);
    this.#satisfyRequest("media-audio-gain-change-request", event2);
    if (canPlay()) storage?.setAudioGain?.(audioGain());
  }
  ["volume-change"](event2) {
    const { storage } = this.#media, { volume, muted, canPlay } = this.$state, detail = event2.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.#satisfyRequest("media-volume-change-request", event2);
    this.#satisfyRequest(detail.muted ? "media-mute-request" : "media-unmute-request", event2);
    if (canPlay()) {
      storage?.setVolume?.(volume());
      storage?.setMuted?.(muted());
    }
  }
  ["seeking"] = functionThrottle(
    (event2) => {
      const { seeking, realCurrentTime, paused } = this.$state;
      seeking.set(true);
      realCurrentTime.set(event2.detail);
      this.#satisfyRequest("media-seeking-request", event2);
      if (paused()) {
        this.#waitingTrigger = event2;
        this.#fireWaiting();
      }
      this.#playedInterval = [-1, -1];
    },
    150,
    { leading: true }
  );
  ["seeked"](event2) {
    const { seeking, currentTime, realCurrentTime, paused, seekableEnd, ended } = this.$state;
    if (this.#request.seeking) {
      seeking.set(true);
      event2.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.#trackedEvents.get("waiting");
      if (waitingEvent) event2.triggers.add(waitingEvent);
      const seekingEvent = this.#trackedEvents.get("seeking");
      if (seekingEvent && !event2.triggers.has(seekingEvent)) {
        event2.triggers.add(seekingEvent);
      }
      if (paused()) this.#stopWaiting();
      seeking.set(false);
      realCurrentTime.set(event2.detail);
      this.#satisfyRequest("media-seek-request", event2);
      const origin = event2?.originEvent;
      if (origin?.isTrusted && !(origin instanceof MessageEvent) && !/seek/.test(origin.type)) {
        this["started"](event2);
      }
    }
    if (Math.floor(currentTime()) !== Math.floor(seekableEnd())) {
      ended.set(false);
    } else {
      this.end(event2);
    }
  }
  ["waiting"](event2) {
    if (this.#firingWaiting || this.#request.seeking) return;
    event2.stopImmediatePropagation();
    this.#waitingTrigger = event2;
    this.#fireWaiting();
  }
  #fireWaiting = functionDebounce(() => {
    if (!this.#waitingTrigger) return;
    this.#firingWaiting = true;
    const { waiting, playing } = this.$state;
    waiting.set(true);
    playing.set(false);
    const event2 = this.createEvent("waiting", { trigger: this.#waitingTrigger });
    this.#trackedEvents.set("waiting", event2);
    this.dispatch(event2);
    this.#waitingTrigger = void 0;
    this.#firingWaiting = false;
  }, 300);
  ["end"](event2) {
    const { loop, ended } = this.$state;
    if (!loop() && ended()) return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.#resetPlaybackIfNeeded(event2);
          this.dispatch("media-loop-request", { trigger: event2 });
        });
      }, 10);
      return;
    }
    setTimeout(() => this.#onEnded(event2), 0);
  }
  #onEnded(event2) {
    const { storage } = this.#media, { paused, seeking, ended, duration } = this.$state;
    this.#onEndPrecisionChange(event2);
    if (!paused()) {
      this.dispatch("pause", { trigger: event2 });
    }
    if (seeking()) {
      this.dispatch("seeked", {
        detail: duration(),
        trigger: event2
      });
    }
    ended.set(true);
    this.#resetTracking();
    storage?.setTime?.(duration(), true);
    this.dispatch("ended", {
      trigger: event2
    });
  }
  #stopWaiting() {
    this.#fireWaiting.cancel();
    this.$state.waiting.set(false);
  }
  ["fullscreen-change"](event2) {
    const isFullscreen2 = event2.detail;
    this.$state.fullscreen.set(isFullscreen2);
    this.#satisfyRequest(
      isFullscreen2 ? "media-enter-fullscreen-request" : "media-exit-fullscreen-request",
      event2
    );
  }
  ["fullscreen-error"](event2) {
    this.#satisfyRequest("media-enter-fullscreen-request", event2);
    this.#satisfyRequest("media-exit-fullscreen-request", event2);
  }
  ["orientation-change"](event2) {
    const isLocked = event2.detail.lock;
    this.#satisfyRequest(
      isLocked ? "media-orientation-lock-request" : "media-orientation-unlock-request",
      event2
    );
  }
  ["picture-in-picture-change"](event2) {
    const isPiP = event2.detail;
    this.$state.pictureInPicture.set(isPiP);
    this.#satisfyRequest(isPiP ? "media-enter-pip-request" : "media-exit-pip-request", event2);
  }
  ["picture-in-picture-error"](event2) {
    this.#satisfyRequest("media-enter-pip-request", event2);
    this.#satisfyRequest("media-exit-pip-request", event2);
  }
  ["title-change"](event2) {
    if (!event2.trigger) return;
    event2.stopImmediatePropagation();
    this.$state.inferredTitle.set(event2.detail);
  }
  ["poster-change"](event2) {
    if (!event2.trigger) return;
    event2.stopImmediatePropagation();
    this.$state.inferredPoster.set(event2.detail);
  }
};

// src/core/state/media-state-sync.ts
init_prod();
var MediaStateSync = class extends MediaPlayerController {
  onSetup() {
    this.#init();
    if (false) return;
    if (true) effect(this.#watchLogLevel.bind(this));
    const effects2 = [
      this.#watchMetadata,
      this.#watchAutoplay,
      this.#watchClipStartTime,
      this.#watchClipEndTime,
      this.#watchControls,
      this.#watchCrossOrigin,
      this.#watchDuration,
      this.#watchLive,
      this.#watchLiveEdge,
      this.#watchLiveTolerance,
      this.#watchLoop,
      this.#watchPlaysInline,
      this.#watchPoster,
      this.#watchProvidedTypes,
      this.#watchTitle
    ];
    for (const callback of effects2) {
      effect(callback.bind(this));
    }
  }
  #init() {
    const providedProps = {
      duration: "providedDuration",
      loop: "providedLoop",
      poster: "providedPoster",
      streamType: "providedStreamType",
      title: "providedTitle",
      viewType: "providedViewType"
    };
    const skip = /* @__PURE__ */ new Set([
      "currentTime",
      "paused",
      "playbackRate",
      "volume"
    ]);
    for (const prop8 of Object.keys(this.$props)) {
      if (skip.has(prop8)) continue;
      this.$state[providedProps[prop8] ?? prop8]?.set(this.$props[prop8]());
    }
    this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  // Sync "provided" props with internal state. Provided props are used to differentiate from
  // provider inferred values.
  #watchProvidedTypes() {
    const { viewType, streamType, title, poster, loop } = this.$props, $state = this.$state;
    $state.providedPoster.set(poster());
    $state.providedStreamType.set(streamType());
    $state.providedViewType.set(viewType());
    $state.providedTitle.set(title());
    $state.providedLoop.set(loop());
  }
  #watchLogLevel() {
    if (false) return;
    this.$state.logLevel.set(this.$props.logLevel());
  }
  #watchMetadata() {
    const { artist, artwork } = this.$props;
    this.$state.artist.set(artist());
    this.$state.artwork.set(artwork());
  }
  #watchTitle() {
    const { title } = this.$state;
    this.dispatch("title-change", { detail: title() });
  }
  #watchAutoplay() {
    const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
    this.$state.autoPlay.set(autoPlay);
    this.dispatch("auto-play-change", { detail: autoPlay });
  }
  #watchLoop() {
    const loop = this.$state.loop();
    this.dispatch("loop-change", { detail: loop });
  }
  #watchControls() {
    const controls = this.$props.controls();
    this.$state.controls.set(controls);
  }
  #watchPoster() {
    const { poster } = this.$state;
    this.dispatch("poster-change", { detail: poster() });
  }
  #watchCrossOrigin() {
    const crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(), value = crossOrigin === true ? "" : crossOrigin;
    this.$state.crossOrigin.set(value);
  }
  #watchDuration() {
    const { duration } = this.$props;
    this.dispatch("media-duration-change-request", {
      detail: duration()
    });
  }
  #watchPlaysInline() {
    const inline2 = this.$props.playsInline() || this.$props.playsinline();
    this.$state.playsInline.set(inline2);
    this.dispatch("plays-inline-change", { detail: inline2 });
  }
  #watchClipStartTime() {
    const { clipStartTime } = this.$props;
    this.dispatch("media-clip-start-change-request", {
      detail: clipStartTime()
    });
  }
  #watchClipEndTime() {
    const { clipEndTime } = this.$props;
    this.dispatch("media-clip-end-change-request", {
      detail: clipEndTime()
    });
  }
  #watchLive() {
    this.dispatch("live-change", { detail: this.$state.live() });
  }
  #watchLiveTolerance() {
    this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  #watchLiveEdge() {
    this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
  }
};

// src/core/state/media-storage.ts
var LocalMediaStorage = class {
  playerId = "vds-player";
  mediaId = null;
  #data = {
    volume: null,
    muted: null,
    audioGain: null,
    time: null,
    lang: null,
    captions: null,
    rate: null,
    quality: null
  };
  async getVolume() {
    return this.#data.volume;
  }
  async setVolume(volume) {
    this.#data.volume = volume;
    this.save();
  }
  async getMuted() {
    return this.#data.muted;
  }
  async setMuted(muted) {
    this.#data.muted = muted;
    this.save();
  }
  async getTime() {
    return this.#data.time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    this.#data.time = !shouldClear ? time : null;
    if (shouldClear || ended) this.saveTime();
    else this.saveTimeThrottled();
  }
  async getLang() {
    return this.#data.lang;
  }
  async setLang(lang) {
    this.#data.lang = lang;
    this.save();
  }
  async getCaptions() {
    return this.#data.captions;
  }
  async setCaptions(enabled) {
    this.#data.captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return this.#data.rate;
  }
  async setPlaybackRate(rate) {
    this.#data.rate = rate;
    this.save();
  }
  async getAudioGain() {
    return this.#data.audioGain;
  }
  async setAudioGain(gain) {
    this.#data.audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return this.#data.quality;
  }
  async setVideoQuality(quality) {
    this.#data.quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = "vds-player") {
    const savedData = playerId ? localStorage.getItem(playerId) : null, savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    this.#data = {
      volume: null,
      muted: null,
      audioGain: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null,
      ...savedData ? JSON.parse(savedData) : {},
      time: savedTime ? +savedTime : null
    };
  }
  save() {
    if (!this.playerId) return;
    const data = JSON.stringify({ ...this.#data, time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTimeThrottled = functionThrottle(this.saveTime.bind(this), 1e3);
  saveTime() {
    if (!this.mediaId) return;
    const data = (this.#data.time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
};

// src/core/state/navigator-media-session.ts
init_prod();
init_std();
var actions = ["play", "pause", "seekforward", "seekbackward", "seekto"];
var NavigatorMediaSession = class extends MediaPlayerController {
  onConnect() {
    effect(this.#onMetadataChange.bind(this));
    effect(this.#onPlaybackStateChange.bind(this));
    const handleAction = this.#handleAction.bind(this);
    for (const action of actions) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(this.#onDisconnect.bind(this));
  }
  #onDisconnect() {
    for (const action of actions) {
      navigator.mediaSession.setActionHandler(action, null);
    }
  }
  #onMetadataChange() {
    const { title, artist, artwork, poster } = this.$state;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title(),
      artist: artist(),
      artwork: artwork() ?? [{ src: poster() }]
    });
  }
  #onPlaybackStateChange() {
    const { canPlay, paused } = this.$state;
    navigator.mediaSession.playbackState = !canPlay() ? "none" : paused() ? "paused" : "playing";
  }
  #handleAction(details) {
    const trigger = new DOMEvent(`media-session-action`, { detail: details });
    switch (details.action) {
      case "play":
        this.dispatch("media-play-request", { trigger });
        break;
      case "pause":
        this.dispatch("media-pause-request", { trigger });
        break;
      case "seekto":
      case "seekforward":
      case "seekbackward":
        this.dispatch("media-seek-request", {
          detail: isNumber(details.seekTime) ? details.seekTime : this.$state.currentTime() + (details.seekOffset ?? 10),
          trigger
        });
        break;
    }
  }
};

// src/core/state/remote-control.ts
init_prod();
init_std();

// src/foundation/logger/controller.ts
init_std();

// src/foundation/logger/grouped-log.ts
var GROUPED_LOG = Symbol(true ? "GROUPED_LOG" : 0);
var GroupedLog = class _GroupedLog {
  constructor(logger, level, title, root2, parent) {
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root2;
    this.parent = parent;
  }
  [GROUPED_LOG] = true;
  logs = [];
  log(...data) {
    this.logs.push({ data });
    return this;
  }
  labelledLog(label, ...data) {
    this.logs.push({ label, data });
    return this;
  }
  groupStart(title) {
    return new _GroupedLog(this.logger, this.level, title, this.root ?? this, this);
  }
  groupEnd() {
    this.parent?.logs.push(this);
    return this.parent ?? this;
  }
  dispatch() {
    return this.logger.dispatch(this.level, this.root ?? this);
  }
};
function isGroupedLog(data) {
  return !!data?.[GROUPED_LOG];
}

// src/foundation/logger/controller.ts
var Logger = class {
  #target = null;
  error(...data) {
    return this.dispatch("error", ...data);
  }
  warn(...data) {
    return this.dispatch("warn", ...data);
  }
  info(...data) {
    return this.dispatch("info", ...data);
  }
  debug(...data) {
    return this.dispatch("debug", ...data);
  }
  errorGroup(title) {
    return new GroupedLog(this, "error", title);
  }
  warnGroup(title) {
    return new GroupedLog(this, "warn", title);
  }
  infoGroup(title) {
    return new GroupedLog(this, "info", title);
  }
  debugGroup(title) {
    return new GroupedLog(this, "debug", title);
  }
  setTarget(newTarget) {
    this.#target = newTarget;
  }
  dispatch(level, ...data) {
    return this.#target?.dispatchEvent(
      new DOMEvent("vds-log", {
        bubbles: true,
        composed: true,
        detail: { level, data }
      })
    ) || false;
  }
};

// src/core/state/remote-control.ts
init_text_track();
var MediaRemoteControl = class {
  #target = null;
  #player = null;
  #prevTrackIndex = -1;
  #logger;
  constructor(logger = true ? new Logger() : void 0) {
    this.#logger = logger;
  }
  /**
   * Set the target from which to dispatch media requests events from. The events should bubble
   * up from this target to the player element.
   *
   * @example
   * ```ts
   * const button = document.querySelector('button');
   * remote.setTarget(button);
   * ```
   */
  setTarget(target) {
    this.#target = target;
    if (true) this.#logger?.setTarget(target);
  }
  /**
   * Returns the current player element. This method will attempt to find the player by
   * searching up from either the given `target` or default target set via `remote.setTarget`.
   *
   * @example
   * ```ts
   * const player = remote.getPlayer();
   * ```
   */
  getPlayer(target) {
    if (this.#player) return this.#player;
    (target ?? this.#target)?.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this.#player = player),
        bubbles: true,
        composed: true
      })
    );
    return this.#player;
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this.#player = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    this.#dispatchRequest("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    this.#dispatchRequest("media-poster-start-loading", trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    this.#dispatchRequest("media-airplay-request", trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    this.#dispatchRequest("media-google-cast-request", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.#dispatchRequest("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.#dispatchRequest("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.#dispatchRequest("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.#dispatchRequest("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    this.#dispatchRequest("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    this.#dispatchRequest("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    this.#dispatchRequest("media-orientation-lock-request", trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    this.#dispatchRequest("media-orientation-unlock-request", trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    this.#dispatchRequest("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    this.#dispatchRequest("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.#dispatchRequest("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.#dispatchRequest("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.#dispatchRequest("media-live-edge-request", trigger);
  }
  /**
   * Dispatch a request to update the length of the media in seconds.
   *
   * @example
   * ```ts
   * remote.changeDuration(100); // 100 seconds
   * ```
   */
  changeDuration(duration, trigger) {
    this.#dispatchRequest("media-duration-change-request", trigger, duration);
  }
  /**
   * Dispatch a request to update the clip start time. This is the time at which media playback
   * should start at.
   *
   * @example
   * ```ts
   * remote.changeClipStart(100); // start at 100 seconds
   * ```
   */
  changeClipStart(startTime, trigger) {
    this.#dispatchRequest("media-clip-start-change-request", trigger, startTime);
  }
  /**
   * Dispatch a request to update the clip end time. This is the time at which media playback
   * should end at.
   *
   * @example
   * ```ts
   * remote.changeClipEnd(100); // end at 100 seconds
   * ```
   */
  changeClipEnd(endTime, trigger) {
    this.#dispatchRequest("media-clip-end-change-request", trigger, endTime);
  }
  /**
   * Dispatch a request to update the media volume to the given `volume` level which is a value
   * between 0 and 1.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/audio-gain#remote-control}
   * @example
   * ```ts
   * remote.changeVolume(0); // 0%
   * remote.changeVolume(0.05); // 5%
   * remote.changeVolume(0.5); // 50%
   * remote.changeVolume(0.75); // 70%
   * remote.changeVolume(1); // 100%
   * ```
   */
  changeVolume(volume, trigger) {
    this.#dispatchRequest("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
  }
  /**
   * Dispatch a request to change the current audio track.
   *
   * @example
   * ```ts
   * remote.changeAudioTrack(1); // track at index 1
   * ```
   */
  changeAudioTrack(index, trigger) {
    this.#dispatchRequest("media-audio-track-change-request", trigger, index);
  }
  /**
   * Dispatch a request to change the video quality. The special value `-1` represents auto quality
   * selection.
   *
   * @example
   * ```ts
   * remote.changeQuality(-1); // auto
   * remote.changeQuality(1); // quality at index 1
   * ```
   */
  changeQuality(index, trigger) {
    this.#dispatchRequest("media-quality-change-request", trigger, index);
  }
  /**
   * Request auto quality selection.
   */
  requestAutoQuality(trigger) {
    this.changeQuality(-1, trigger);
  }
  /**
   * Dispatch a request to change the mode of the text track at the given index.
   *
   * @example
   * ```ts
   * remote.changeTextTrackMode(1, 'showing'); // track at index 1
   * ```
   */
  changeTextTrackMode(index, mode, trigger) {
    this.#dispatchRequest("media-text-track-change-request", trigger, {
      index,
      mode
    });
  }
  /**
   * Dispatch a request to change the media playback rate.
   *
   * @example
   * ```ts
   * remote.changePlaybackRate(0.5); // Half the normal speed
   * remote.changePlaybackRate(1); // Normal speed
   * remote.changePlaybackRate(1.5); // 50% faster than normal
   * remote.changePlaybackRate(2); // Double the normal speed
   * ```
   */
  changePlaybackRate(rate, trigger) {
    this.#dispatchRequest("media-rate-change-request", trigger, rate);
  }
  /**
   * Dispatch a request to change the media audio gain.
   *
   * @example
   * ```ts
   * remote.changeAudioGain(1); // Disable audio gain
   * remote.changeAudioGain(1.5); // 50% louder
   * remote.changeAudioGain(2); // 100% louder
   * ```
   */
  changeAudioGain(gain, trigger) {
    this.#dispatchRequest("media-audio-gain-change-request", trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    this.#dispatchRequest("media-resume-controls-request", trigger);
  }
  /**
   * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
   * controls being visible until `remote.resumeControls()` is called. This method
   * is generally used when building custom controls and you'd like to prevent the UI from
   * disappearing.
   *
   * @example
   * ```ts
   * // Prevent controls hiding while menu is being interacted with.
   * function onSettingsOpen() {
   *   remote.pauseControls();
   * }
   *
   * function onSettingsClose() {
   *   remote.resumeControls();
   * }
   * ```
   */
  pauseControls(trigger) {
    this.#dispatchRequest("media-pause-controls-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.togglePaused.name);
      return;
    }
    if (player.state.paused) this.play(trigger);
    else this.pause(trigger);
  }
  /**
   * Dispatch a request to toggle the controls visibility.
   */
  toggleControls(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleControls.name);
      return;
    }
    if (!player.controls.showing) {
      player.controls.show(0, trigger);
    } else {
      player.controls.hide(0, trigger);
    }
  }
  /**
   * Dispatch a request to toggle the media muted state.
   */
  toggleMuted(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleMuted.name);
      return;
    }
    if (player.state.muted) this.unmute(trigger);
    else this.mute(trigger);
  }
  /**
   * Dispatch a request to toggle the media fullscreen state.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  toggleFullscreen(target, trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleFullscreen.name);
      return;
    }
    if (player.state.fullscreen) this.exitFullscreen(target, trigger);
    else this.enterFullscreen(target, trigger);
  }
  /**
   * Dispatch a request to toggle the media picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  togglePictureInPicture(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.togglePictureInPicture.name);
      return;
    }
    if (player.state.pictureInPicture) this.exitPictureInPicture(trigger);
    else this.enterPictureInPicture(trigger);
  }
  /**
   * Show captions.
   */
  showCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.showCaptions.name);
      return;
    }
    let tracks = player.state.textTracks, index = this.#prevTrackIndex;
    if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
      index = -1;
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track) && track.default);
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track));
    }
    if (index >= 0) this.changeTextTrackMode(index, "showing", trigger);
    this.#prevTrackIndex = -1;
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.disableCaptions.name);
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this.#prevTrackIndex = index;
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger?.target);
    if (!player) {
      if (true) this.#noPlayerWarning(this.toggleCaptions.name);
      return;
    }
    if (player.state.textTrack) {
      this.disableCaptions();
    } else {
      this.showCaptions();
    }
  }
  userPrefersLoopChange(prefersLoop, trigger) {
    this.#dispatchRequest("media-user-loop-change-request", trigger, prefersLoop);
  }
  #dispatchRequest(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      trigger
    });
    let target = trigger?.target || null;
    if (target && target instanceof Component) target = target.el;
    const shouldUsePlayer = !target || target === document || target === window || target === document.body || this.#player?.el && target instanceof Node && !this.#player.el.contains(target);
    target = shouldUsePlayer ? this.#target ?? this.getPlayer()?.el : target ?? this.#target;
    if (true) {
      this.#logger?.debugGroup(`\u{1F4E8} dispatching \`${type}\``).labelledLog("Target", target).labelledLog("Player", this.#player).labelledLog("Request Event", request).labelledLog("Trigger Event", trigger).dispatch();
    }
    if (this.#player) {
      if (type === "media-play-request" && !this.#player.state.canLoad) {
        target?.dispatchEvent(request);
      } else {
        this.#player.canPlayQueue.enqueue(type, () => target?.dispatchEvent(request));
      }
    } else {
      target?.dispatchEvent(request);
    }
  }
  #noPlayerWarning(method9) {
    if (true) {
      console.warn(
        `[vidstack] attempted to call \`MediaRemoteControl.${method9}\`() that requires player but failed because remote could not find a parent player element from target`
      );
    }
  }
};

// src/core/tracks/audio-tracks.ts
var AudioTrackList = class extends SelectList {
};

// src/core/tracks/text/render/text-renderer.ts
init_prod();
init_std();
init_symbols();
init_text_track();

// src/core/tracks/text/render/native-text-renderer.ts
init_dom();
init_symbols();
var NativeTextRenderer = class {
  priority = 0;
  #display = true;
  #video = null;
  #track = null;
  #tracks = /* @__PURE__ */ new Set();
  canRender(_2, video) {
    return !!video;
  }
  attach(video) {
    this.#video = video;
    if (video) video.textTracks.onchange = this.#onChange.bind(this);
  }
  addTrack(track) {
    this.#tracks.add(track);
    this.#attachTrack(track);
  }
  removeTrack(track) {
    track[TextTrackSymbol.native]?.remove?.();
    track[TextTrackSymbol.native] = null;
    this.#tracks.delete(track);
  }
  changeTrack(track) {
    const current = track?.[TextTrackSymbol.native];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.#track = track;
  }
  setDisplay(display) {
    this.#display = display;
    this.#onChange();
  }
  detach() {
    if (this.#video) this.#video.textTracks.onchange = null;
    for (const track of this.#tracks) this.removeTrack(track);
    this.#tracks.clear();
    this.#video = null;
    this.#track = null;
  }
  #attachTrack(track) {
    if (!this.#video) return;
    const el = track[TextTrackSymbol.native] ??= this.#createTrackElement(track);
    if (isHTMLElement2(el)) {
      this.#video.append(el);
      el.track.mode = el.default ? "showing" : "disabled";
    }
  }
  #createTrackElement(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.#copyCues(track, el.track);
    }
    return el;
  }
  #copyCues(track, native) {
    if (track.src && track.type === "vtt" || native.cues?.length) return;
    for (const cue of track.cues) native.addCue(cue);
  }
  #onChange(event2) {
    for (const track of this.#tracks) {
      const native = track[TextTrackSymbol.native];
      if (!native) continue;
      if (!this.#display) {
        native.track.mode = native.managed ? "hidden" : "disabled";
        continue;
      }
      const isShowing = native.track.mode === "showing";
      if (isShowing) this.#copyCues(track, native.track);
      track.setMode(isShowing ? "showing" : "disabled", event2);
    }
  }
};

// src/core/tracks/text/render/text-renderer.ts
var TextRenderers = class {
  #video = null;
  #textTracks;
  #renderers = [];
  #media;
  #nativeDisplay = false;
  #nativeRenderer = null;
  #customRenderer = null;
  constructor(media) {
    this.#media = media;
    const textTracks = media.textTracks;
    this.#textTracks = textTracks;
    effect(this.#watchControls.bind(this));
    onDispose(this.#detach.bind(this));
    listenEvent(textTracks, "add", this.#onAddTrack.bind(this));
    listenEvent(textTracks, "remove", this.#onRemoveTrack.bind(this));
    listenEvent(textTracks, "mode-change", this.#update.bind(this));
  }
  #watchControls() {
    const { nativeControls } = this.#media.$state;
    this.#nativeDisplay = nativeControls();
    this.#update();
  }
  add(renderer) {
    this.#renderers.push(renderer);
    untrack(this.#update.bind(this));
  }
  remove(renderer) {
    renderer.detach();
    this.#renderers.splice(this.#renderers.indexOf(renderer), 1);
    untrack(this.#update.bind(this));
  }
  /** @internal */
  attachVideo(video) {
    requestAnimationFrame(() => {
      this.#video = video;
      if (video) {
        this.#nativeRenderer = new NativeTextRenderer();
        this.#nativeRenderer.attach(video);
        for (const track of this.#textTracks) this.#addNativeTrack(track);
      }
      this.#update();
    });
  }
  #addNativeTrack(track) {
    if (!isTrackCaptionKind(track)) return;
    this.#nativeRenderer?.addTrack(track);
  }
  #removeNativeTrack(track) {
    if (!isTrackCaptionKind(track)) return;
    this.#nativeRenderer?.removeTrack(track);
  }
  #onAddTrack(event2) {
    this.#addNativeTrack(event2.detail);
  }
  #onRemoveTrack(event2) {
    this.#removeNativeTrack(event2.detail);
  }
  #update() {
    const currentTrack = this.#textTracks.selected;
    if (this.#video && (this.#nativeDisplay || currentTrack?.[TextTrackSymbol.nativeHLS])) {
      this.#customRenderer?.changeTrack(null);
      this.#nativeRenderer?.setDisplay(true);
      this.#nativeRenderer?.changeTrack(currentTrack);
      return;
    }
    this.#nativeRenderer?.setDisplay(false);
    this.#nativeRenderer?.changeTrack(null);
    if (!currentTrack) {
      this.#customRenderer?.changeTrack(null);
      return;
    }
    const customRenderer = this.#renderers.sort((a2, b2) => a2.priority - b2.priority).find((renderer) => renderer.canRender(currentTrack, this.#video));
    if (this.#customRenderer !== customRenderer) {
      this.#customRenderer?.detach();
      customRenderer?.attach(this.#video);
      this.#customRenderer = customRenderer ?? null;
    }
    customRenderer?.changeTrack(currentTrack);
  }
  #detach() {
    this.#nativeRenderer?.detach();
    this.#nativeRenderer = null;
    this.#customRenderer?.detach();
    this.#customRenderer = null;
  }
};

// src/components/player.ts
init_symbols();
init_text_track();

// src/core/tracks/text/text-tracks.ts
init_std();
init_symbols2();
init_symbols();
init_text_track();
var TextTrackList = class extends List {
  #canLoad = false;
  #defaults = {};
  #storage = null;
  #preferredLang = null;
  /** @internal */
  [TextTrackSymbol.crossOrigin];
  constructor() {
    super();
  }
  get selected() {
    const track = this.items.find((t5) => t5.mode === "showing" && isTrackCaptionKind(t5));
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return this.#preferredLang;
  }
  set preferredLang(lang) {
    this.#preferredLang = lang;
    this.#saveLang(lang);
  }
  add(init2, trigger) {
    const isTrack = init2 instanceof TextTrack, track = isTrack ? init2 : new TextTrack(init2), kind = init2.kind === "captions" || init2.kind === "subtitles" ? "captions" : init2.kind;
    if (this.#defaults[kind] && init2.default) delete init2.default;
    track.addEventListener("mode-change", this.#onTrackModeChangeBind);
    this[ListSymbol.add](track, trigger);
    track[TextTrackSymbol.crossOrigin] = this[TextTrackSymbol.crossOrigin];
    if (this.#canLoad) track[TextTrackSymbol.canLoad]();
    if (init2.default) this.#defaults[kind] = track;
    this.#selectTracks();
    return this;
  }
  remove(track, trigger) {
    this.#pendingRemoval = track;
    if (!this.items.includes(track)) return;
    if (track === this.#defaults[track.kind]) delete this.#defaults[track.kind];
    track.mode = "disabled";
    track[TextTrackSymbol.onModeChange] = null;
    track.removeEventListener("mode-change", this.#onTrackModeChangeBind);
    this[ListSymbol.remove](track, trigger);
    this.#pendingRemoval = null;
    return this;
  }
  clear(trigger) {
    for (const track of [...this.items]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.items.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [TextTrackSymbol.canLoad]() {
    if (this.#canLoad) return;
    for (const track of this.items) track[TextTrackSymbol.canLoad]();
    this.#canLoad = true;
    this.#selectTracks();
  }
  #selectTracks = functionDebounce(async () => {
    if (!this.#canLoad) return;
    if (!this.#preferredLang && this.#storage) {
      this.#preferredLang = await this.#storage.getLang();
    }
    const showCaptions = await this.#storage?.getCaptions(), kinds = [
      ["captions", "subtitles"],
      "chapters",
      "descriptions",
      "metadata"
    ];
    for (const kind of kinds) {
      const tracks = this.getByKind(kind);
      if (tracks.find((t5) => t5.mode === "showing")) continue;
      const preferredTrack = this.#preferredLang ? tracks.find((track2) => track2.language === this.#preferredLang) : null;
      const defaultTrack = isArray(kind) ? this.#defaults[kind.find((kind2) => this.#defaults[kind2]) || ""] : this.#defaults[kind];
      const track = preferredTrack ?? defaultTrack, isCaptionsKind = track && isTrackCaptionKind(track);
      if (track && (!isCaptionsKind || showCaptions !== false)) {
        track.mode = "showing";
        if (isCaptionsKind) this.#saveCaptionsTrack(track);
      }
    }
  }, 300);
  #pendingRemoval = null;
  #onTrackModeChangeBind = this.#onTrackModeChange.bind(this);
  #onTrackModeChange(event2) {
    const track = event2.detail;
    if (this.#storage && isTrackCaptionKind(track) && track !== this.#pendingRemoval) {
      this.#saveCaptionsTrack(track);
    }
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t5 of this.items) {
        if (t5.mode === "showing" && t5 != track && kinds.includes(t5.kind)) {
          t5.mode = "disabled";
        }
      }
    }
    this.dispatchEvent(
      new DOMEvent("mode-change", {
        detail: event2.detail,
        trigger: event2
      })
    );
  }
  #saveCaptionsTrack(track) {
    if (track.mode !== "disabled") {
      this.#saveLang(track.language);
    }
    this.#storage?.setCaptions?.(track.mode === "showing");
  }
  #saveLang(lang) {
    this.#storage?.setLang?.(this.#preferredLang = lang);
  }
  setStorage(storage) {
    this.#storage = storage;
  }
};

// src/foundation/logger/log-printer.ts
init_prod();
init_std();

// src/foundation/logger/colors.ts
var LOCAL_STORAGE_KEY = "@vidstack/log-colors";
var savedColors = init();
function getLogColor(key2) {
  return savedColors.get(key2);
}
function saveLogColor(key2, { color = generateColor(), overwrite = false } = {}) {
  if (false) return;
  if (!savedColors.has(key2) || overwrite) {
    savedColors.set(key2, color);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Object.entries(savedColors)));
  }
}
function generateColor() {
  return `hsl(${Math.random() * 360}, 55%, 70%)`;
}
function init() {
  if (false) return /* @__PURE__ */ new Map();
  let colors;
  try {
    colors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch {
  }
  return new Map(Object.entries(colors ?? {}));
}

// src/foundation/logger/log-level.ts
var LogLevelValue = Object.freeze({
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
});
var LogLevelColor = Object.freeze({
  silent: "white",
  error: "hsl(6, 58%, 50%)",
  warn: "hsl(51, 58%, 50%)",
  info: "hsl(219, 58%, 50%)",
  debug: "hsl(280, 58%, 50%)"
});

// src/foundation/logger/ms.ts
init_number();
var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
function ms2(val) {
  const msAbs = Math.abs(val);
  if (msAbs >= d) {
    return Math.round(val / d) + "d";
  }
  if (msAbs >= h) {
    return Math.round(val / h) + "h";
  }
  if (msAbs >= m) {
    return Math.round(val / m) + "m";
  }
  if (msAbs >= s) {
    return Math.round(val / s) + "s";
  }
  return round2(val, 2) + "ms";
}

// src/foundation/logger/log-printer.ts
var LogPrinter = class extends ViewController {
  #level = true ? "warn" : "silent";
  #lastLogged;
  /**
   * The current log level.
   */
  get logLevel() {
    return true ? this.#level : "silent";
  }
  set logLevel(level) {
    if (true) this.#level = level;
  }
  onConnect() {
    this.listen("vds-log", (event2) => {
      event2.stopPropagation();
      const element = event2.path?.[0] ?? (event2.target instanceof ViewController ? event2.target.el : event2.target), eventTargetName = element?.$$COMPONENT_NAME?.replace(/^_/, "").replace(/Instance$/, "") ?? element?.tagName.toLowerCase() ?? "unknown";
      const { level = "warn", data } = event2.detail ?? {};
      if (LogLevelValue[this.#level] < LogLevelValue[level]) {
        return;
      }
      saveLogColor(eventTargetName);
      const hint = data?.length === 1 && isGroupedLog(data[0]) ? data[0].title : isString(data?.[0]) ? data[0] : "";
      console.groupCollapsed(
        `%c${level.toUpperCase()}%c ${eventTargetName}%c ${hint.slice(0, 50)}${hint.length > 50 ? "..." : ""}`,
        `background: ${LogLevelColor[level]}; color: white; padding: 1.5px 2.2px; border-radius: 2px; font-size: 11px;`,
        `color: ${getLogColor(eventTargetName)}; padding: 4px 0px; font-size: 11px;`,
        "color: gray; font-size: 11px; padding-left: 4px;"
      );
      if (data?.length === 1 && isGroupedLog(data[0])) {
        if (element) data[0].logs.unshift({ label: "Element", data: [element] });
        printGroup(level, data[0]);
      } else if (data) {
        print(level, ...data);
      }
      this.#printTimeDiff();
      printStackTrace();
      console.groupEnd();
    });
    onDispose(() => {
      this.#lastLogged = void 0;
    });
  }
  #printTimeDiff() {
    labelledPrint("Time since last log", this.#calcLastLogTimeDiff());
  }
  #calcLastLogTimeDiff() {
    const time = performance.now();
    const diff = time - (this.#lastLogged ?? (this.#lastLogged = performance.now()));
    this.#lastLogged = time;
    return ms2(diff);
  }
};
function print(level, ...data) {
  console[level](...data);
}
function labelledPrint(label, ...data) {
  console.log(`%c${label}:`, "color: gray", ...data);
}
function printStackTrace() {
  console.groupCollapsed("%cStack Trace", "color: gray");
  console.trace();
  console.groupEnd();
}
function printGroup(level, groupedLog) {
  for (const log of groupedLog.logs) {
    if (isGroupedLog(log)) {
      console.groupCollapsed(groupedLog.title);
      printGroup(level, log);
      console.groupEnd();
    } else if ("label" in log && !isUndefined(log.label)) {
      labelledPrint(log.label, ...log.data);
    } else {
      print(level, ...log.data);
    }
  }
}

// src/foundation/observers/focus-visible.ts
init_prod();
init_std();
var $keyboard = signal(false);
if (true) {
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e6) => {
    if (e6.metaKey || e6.altKey || e6.ctrlKey) return;
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

// src/components/player.ts
init_dom();
init_number();
init_support();
var MediaPlayer = class _MediaPlayer extends Component {
  static props = mediaPlayerProps;
  static state = mediaState;
  #media;
  #stateMgr;
  #requestMgr;
  // @prop
  canPlayQueue = new RequestQueue();
  // @prop
  remoteControl;
  get #provider() {
    return this.#media.$provider();
  }
  get #props() {
    return this.$props;
  }
  constructor() {
    super();
    new MediaStateSync();
    const context = {
      player: this,
      qualities: new VideoQualityList(),
      audioTracks: new AudioTrackList(),
      storage: null,
      $provider: signal(null),
      $providerSetup: signal(false),
      $props: this.$props,
      $state: this.$state
    };
    if (true) {
      const logPrinter = new LogPrinter();
      effect(() => {
        logPrinter.logLevel = this.$props.logLevel();
      });
    }
    if (true) context.logger = new Logger();
    context.remote = this.remoteControl = new MediaRemoteControl(
      true ? context.logger : void 0
    );
    context.remote.setPlayer(this);
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol.crossOrigin] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this.#media = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    if (true) new MediaEventsLogger(context);
    const request = new MediaRequestContext();
    this.#stateMgr = new MediaStateManager(request, context);
    this.#requestMgr = new MediaRequestManager(this.#stateMgr, request, context);
    context.delegate = new MediaPlayerDelegate(this.#stateMgr.handle.bind(this.#stateMgr), context);
    context.notify = context.delegate.notify.bind(context.delegate);
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      new NavigatorMediaSession();
    }
    new MediaLoadController("load", this.startLoading.bind(this));
    new MediaLoadController("posterLoad", this.startLoadingPoster.bind(this));
  }
  onSetup() {
    this.#setupMediaAttributes();
    effect(this.#watchCanPlay.bind(this));
    effect(this.#watchMuted.bind(this));
    effect(this.#watchPaused.bind(this));
    effect(this.#watchVolume.bind(this));
    effect(this.#watchCurrentTime.bind(this));
    effect(this.#watchPlaysInline.bind(this));
    effect(this.#watchPlaybackRate.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-player", "");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this.#watchStorage.bind(this));
    if (false) this.#watchTitle();
    else effect(this.#watchTitle.bind(this));
    if (false) this.#watchOrientation();
    else effect(this.#watchOrientation.bind(this));
    listenEvent(el, "find-media-player", this.#onFindPlayer.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE) setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this.#onPointerChange(pointerQuery);
    pointerQuery.onchange = this.#onPointerChange.bind(this);
    const resize = new ResizeObserver(animationFrameThrottle(this.#onResize.bind(this)));
    resize.observe(el);
    effect(this.#onResize.bind(this));
    this.dispatch("media-player-connect", {
      detail: this,
      bubbles: true,
      composed: true
    });
    if (true) this.#media.logger.setTarget(el);
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
      if (true) this.#media.logger.setTarget(null);
    });
  }
  onDestroy() {
    this.#media.player = null;
    this.canPlayQueue.reset();
  }
  #skipTitleUpdate = false;
  #watchTitle() {
    const el = this.$el, { title, live, viewType, providedTitle } = this.$state, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media", currentTitle = title();
    setAttribute(
      this.el,
      "aria-label",
      `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : "")
    );
    if (el?.hasAttribute("title")) {
      this.#skipTitleUpdate = true;
      el?.removeAttribute("title");
    }
  }
  #watchOrientation() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$state.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this.#onResize();
  }
  #watchCanPlay() {
    if (this.$state.canPlay() && this.#provider) this.canPlayQueue.start();
    else this.canPlayQueue.stop();
  }
  #setupMediaAttributes() {
    if (_MediaPlayer[MEDIA_ATTRIBUTES]) {
      this.setAttributes(_MediaPlayer[MEDIA_ATTRIBUTES]);
      return;
    }
    const $attrs = {
      "data-load": function() {
        return this.$props.load();
      },
      "data-captions": function() {
        const track = this.$state.textTrack();
        return !!track && isTrackCaptionKind(track);
      },
      "data-ios-controls": function() {
        return this.$state.iOSControls();
      },
      "data-controls": function() {
        return this.controls.showing;
      },
      "data-buffering": function() {
        const { canLoad, canPlay, waiting } = this.$state;
        return canLoad() && (!canPlay() || waiting());
      },
      "data-error": function() {
        const { error } = this.$state;
        return !!error();
      },
      "data-autoplay-error": function() {
        const { autoPlayError } = this.$state;
        return !!autoPlayError();
      }
    };
    const alias = {
      autoPlay: "autoplay",
      canAirPlay: "can-airplay",
      canPictureInPicture: "can-pip",
      pictureInPicture: "pip",
      playsInline: "playsinline",
      remotePlaybackState: "remote-state",
      remotePlaybackType: "remote-type",
      isAirPlayConnected: "airplay",
      isGoogleCastConnected: "google-cast"
    };
    for (const prop8 of mediaAttributes) {
      const attrName = "data-" + (alias[prop8] ?? camelToKebabCase(prop8));
      $attrs[attrName] = function() {
        return this.$state[prop8]();
      };
    }
    delete $attrs.title;
    _MediaPlayer[MEDIA_ATTRIBUTES] = $attrs;
    this.setAttributes($attrs);
  }
  #onFindPlayer(event2) {
    event2.detail(this);
  }
  #onResize() {
    if (!this.el) return;
    const width = this.el.clientWidth, height = this.el.clientHeight;
    this.$state.width.set(width);
    this.$state.height.set(height);
    setStyle(this.el, "--player-width", width + "px");
    setStyle(this.el, "--player-height", height + "px");
  }
  #onPointerChange(queryList) {
    if (false) return;
    const pointer = queryList.matches ? "coarse" : "fine";
    setAttribute(this.el, "data-pointer", pointer);
    this.$state.pointer.set(pointer);
    this.#onResize();
  }
  /**
   * The current media provider.
   */
  // @prop
  get provider() {
    return this.#provider;
  }
  /**
   * Media controls settings.
   */
  // @prop
  get controls() {
    return this.#requestMgr.controls;
  }
  set controls(controls) {
    this.#props.controls.set(controls);
  }
  /**
   * Controls the screen orientation of the current browser window and dispatches orientation
   * change events on the player.
   */
  // @prop
  orientation;
  /**
   * The title of the current media.
   */
  // @prop
  get title() {
    return peek(this.$state.providedTitle);
  }
  set title(newTitle) {
    if (this.#skipTitleUpdate) {
      this.#skipTitleUpdate = false;
      return;
    }
    this.$state.providedTitle.set(newTitle);
  }
  /**
   * A list of all `VideoQuality` objects representing the set of available video renditions.
   *
   * @see {@link https://vidstack.io/docs/player/api/video-quality}
   */
  // @prop
  get qualities() {
    return this.#media.qualities;
  }
  /**
   * A list of all `AudioTrack` objects representing the set of available audio tracks.
   *
   * @see {@link https://vidstack.io/docs/player/api/audio-tracks}
   */
  // @prop
  get audioTracks() {
    return this.#media.audioTracks;
  }
  /**
   * A list of all `TextTrack` objects representing the set of available text tracks.
   *
   * @see {@link https://vidstack.io/docs/player/api/text-tracks}
   */
  // @prop
  get textTracks() {
    return this.#media.textTracks;
  }
  /**
   * Contains text renderers which are responsible for loading, parsing, and rendering text
   * tracks.
   */
  // @prop
  get textRenderers() {
    return this.#media.textRenderers;
  }
  // @prop
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    this.#props.duration.set(duration);
  }
  // @prop
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    this.#queuePausedUpdate(paused);
  }
  #watchPaused() {
    this.#queuePausedUpdate(this.$props.paused());
  }
  #queuePausedUpdate(paused) {
    if (paused) {
      this.canPlayQueue.enqueue("paused", () => this.#requestMgr.pause());
    } else this.canPlayQueue.enqueue("paused", () => this.#requestMgr.play());
  }
  // @prop
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    this.#queueMutedUpdate(muted);
  }
  #watchMuted() {
    this.#queueMutedUpdate(this.$props.muted());
  }
  #queueMutedUpdate(muted) {
    this.canPlayQueue.enqueue("muted", () => {
      if (this.#provider) this.#provider.setMuted(muted);
    });
  }
  // @prop
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    this.#queueCurrentTimeUpdate(time);
  }
  #watchCurrentTime() {
    this.#queueCurrentTimeUpdate(this.$props.currentTime());
  }
  #queueCurrentTimeUpdate(time) {
    this.canPlayQueue.enqueue("currentTime", () => {
      const { currentTime, clipStartTime, seekableStart, seekableEnd } = this.$state;
      if (time === peek(currentTime)) return;
      peek(() => {
        if (!this.#provider) return;
        const clippedTime = time + clipStartTime(), isEnd = Math.floor(clippedTime) === Math.floor(seekableEnd()), boundTime = isEnd ? seekableEnd() : Math.min(Math.max(seekableStart() + 0.1, clippedTime), seekableEnd() - 0.1);
        if (Number.isFinite(boundTime)) {
          this.#provider.setCurrentTime(boundTime);
        }
      });
    });
  }
  // @prop
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    this.#queueVolumeUpdate(volume);
  }
  #watchVolume() {
    this.#queueVolumeUpdate(this.$props.volume());
  }
  #queueVolumeUpdate(volume) {
    const clampedVolume = clampNumber(0, volume, 1);
    this.canPlayQueue.enqueue("volume", () => {
      if (this.#provider) this.#provider.setVolume(clampedVolume);
    });
  }
  // @prop
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    this.#queuePlaybackRateUpdate(rate);
  }
  #watchPlaybackRate() {
    this.#queuePlaybackRateUpdate(this.$props.playbackRate());
  }
  #queuePlaybackRateUpdate(rate) {
    this.canPlayQueue.enqueue("rate", () => {
      if (this.#provider) this.#provider.setPlaybackRate?.(rate);
    });
  }
  #watchPlaysInline() {
    this.#queuePlaysInlineUpdate(this.$props.playsInline());
  }
  #queuePlaysInlineUpdate(inline2) {
    this.canPlayQueue.enqueue("playsinline", () => {
      if (this.#provider) this.#provider.setPlaysInline?.(inline2);
    });
  }
  #watchStorage() {
    let storageValue = this.$props.storage(), storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
    if (storage?.onChange) {
      const { source } = this.$state, playerId = isString(storageValue) ? storageValue : this.el?.id, mediaId = computed(this.#computeMediaId.bind(this));
      effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
    }
    this.#media.storage = storage;
    this.#media.textTracks.setStorage(storage);
    onDispose(() => {
      storage?.onDestroy?.();
      this.#media.storage = null;
      this.#media.textTracks.setStorage(null);
    });
  }
  #computeMediaId() {
    const { clipStartTime, clipEndTime } = this.$props, { source } = this.$state, src = source();
    return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
  }
  /**
   * Begins/resumes playback of the media. If this method is called programmatically before the
   * user has interacted with the player, the promise may be rejected subject to the browser's
   * autoplay policies. This method will throw if called before media is ready for playback.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play}
   */
  // @method
  async play(trigger) {
    return this.#requestMgr.play(trigger);
  }
  /**
   * Pauses playback of the media. This method will throw if called before media is ready for
   * playback.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause}
   */
  // @method
  async pause(trigger) {
    return this.#requestMgr.pause(trigger);
  }
  /**
   * Attempts to display the player in fullscreen. The promise will resolve if successful, and
   * reject if not. This method will throw if any fullscreen API is _not_ currently available.
   *
   * @see {@link https://vidstack.io/docs/player/api/fullscreen}
   */
  // @method
  async enterFullscreen(target, trigger) {
    return this.#requestMgr.enterFullscreen(target, trigger);
  }
  /**
   * Attempts to display the player inline by exiting fullscreen. This method will throw if any
   * fullscreen API is _not_ currently available.
   *
   * @see {@link https://vidstack.io/docs/player/api/fullscreen}
   */
  // @method
  async exitFullscreen(target, trigger) {
    return this.#requestMgr.exitFullscreen(target, trigger);
  }
  /**
   * Attempts to display the player in picture-in-picture mode. This method will throw if PIP is
   * not supported. This method will also return a `PictureInPictureWindow` if the current
   * provider supports it.
   *
   * @see {@link https://vidstack.io/docs/player/api/picture-in-picture}
   */
  // @method
  enterPictureInPicture(trigger) {
    return this.#requestMgr.enterPictureInPicture(trigger);
  }
  /**
   * Attempts to display the player in inline by exiting picture-in-picture mode. This method
   * will throw if not supported.
   *
   * @see {@link https://vidstack.io/docs/player/api/picture-in-picture}
   */
  // @method
  exitPictureInPicture(trigger) {
    return this.#requestMgr.exitPictureInPicture(trigger);
  }
  /**
   * Sets the current time to the live edge (i.e., `duration`). This is a no-op for non-live
   * streams and will throw if called before media is ready for playback.
   *
   * @see {@link https://vidstack.io/docs/player/api/live}
   */
  // @method
  seekToLiveEdge(trigger) {
    this.#requestMgr.seekToLiveEdge(trigger);
  }
  /**
   * Called when media can begin loading. Calling this method will trigger the initial provider
   * loading process. Calling it more than once has no effect.
   *
   * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  // @method
  startLoading(trigger) {
    this.#media.notify("can-load", void 0, trigger);
  }
  /**
   * Called when the poster image can begin loading. Calling it more than once has no effect.
   *
   * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  // @method
  startLoadingPoster(trigger) {
    this.#media.notify("can-load-poster", void 0, trigger);
  }
  /**
   * Request Apple AirPlay picker to open.
   */
  // @method
  requestAirPlay(trigger) {
    return this.#requestMgr.requestAirPlay(trigger);
  }
  /**
   * Request Google Cast device picker to open. The Google Cast framework will be loaded if it
   * hasn't yet.
   */
  // @method
  requestGoogleCast(trigger) {
    return this.#requestMgr.requestGoogleCast(trigger);
  }
  /**
   * Set the audio gain, amplifying volume and enabling a maximum volume above 100%.
   *
   * @see {@link https://vidstack.io/docs/player/api/audio-gain}
   */
  // @method
  setAudioGain(gain, trigger) {
    return this.#requestMgr.setAudioGain(gain, trigger);
  }
  destroy() {
    super.destroy();
    this.#media.remote.setPlayer(null);
    this.dispatch("destroy");
  }
};

// src/elements/define/player-element.ts
var MediaPlayerElement = class extends Host(HTMLElement, MediaPlayer) {
  static tagName = "media-player";
  static attrs = {
    autoPlay: "autoplay",
    crossOrigin: "crossorigin",
    playsInline: "playsinline",
    preferNativeHLS: "prefer-native-hls",
    minLiveDVRWindow: "min-live-dvr-window"
  };
};

// src/elements/define/provider-element.ts
init_prod();
init_std();

// src/components/provider/provider.ts
init_prod();
init_std();
init_text_track();

// src/components/provider/source-select.ts
init_prod();
init_std();

// src/providers/audio/loader.ts
init_std();
init_mime();
init_support();
var AudioProviderLoader = class {
  name = "audio";
  target;
  canPlay(src) {
    if (!isAudioSrc(src)) return false;
    return !isString(src.src) || src.type === "?" || canPlayAudioType(this.target, src.type);
  }
  mediaType() {
    return "audio";
  }
  async load(ctx) {
    if (false) {
      throw Error("[vidstack] can not load audio provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<audio>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await Promise.resolve().then(() => (init_provider3(), provider_exports2))).AudioProvider(this.target, ctx);
  }
};

// src/providers/dash/loader.ts
init_mime();
init_support();

// src/providers/video/loader.ts
init_std();
init_mime();
init_support();
var VideoProviderLoader = class {
  name = "video";
  target;
  canPlay(src) {
    if (!isVideoSrc(src)) return false;
    return !isString(src.src) || src.type === "?" || canPlayVideoType(this.target, src.type);
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (false) {
      throw Error("[vidstack] can not load video provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await Promise.resolve().then(() => (init_provider4(), provider_exports3))).VideoProvider(this.target, ctx);
  }
};

// src/providers/dash/loader.ts
var DASHProviderLoader = class _DASHProviderLoader extends VideoProviderLoader {
  static supported = isDASHSupported();
  name = "dash";
  canPlay(src) {
    return _DASHProviderLoader.supported && isDASHSrc(src);
  }
  async load(context) {
    if (false) {
      throw Error("[vidstack] can not load dash provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await Promise.resolve().then(() => (init_provider5(), provider_exports4))).DASHProvider(this.target, context);
  }
};

// src/providers/hls/loader.ts
init_mime();
init_support();
var HLSProviderLoader = class _HLSProviderLoader extends VideoProviderLoader {
  static supported = isHLSSupported();
  name = "hls";
  canPlay(src) {
    return _HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    if (false) {
      throw Error("[vidstack] can not load hls provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?"
      );
    }
    return new (await Promise.resolve().then(() => (init_provider6(), provider_exports5))).HLSProvider(this.target, context);
  }
};

// src/providers/vimeo/loader.ts
init_std();
init_network();
var VimeoProviderLoader = class {
  name = "vimeo";
  target;
  preconnect() {
    const connections = [
      "https://i.vimeocdn.com",
      "https://f.vimeocdn.com",
      "https://fresnel.vimeocdn.com"
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/vimeo";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (false) {
      throw Error("[vidstack] can not load vimeo provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await Promise.resolve().then(() => (init_provider7(), provider_exports6))).VimeoProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId: resolveVimeoVideoId2, getVimeoVideoInfo: getVimeoVideoInfo2 } = await Promise.resolve().then(() => (init_utils3(), utils_exports));
    if (!isString(src.src)) return null;
    const { videoId, hash } = resolveVimeoVideoId2(src.src);
    if (videoId) {
      return getVimeoVideoInfo2(videoId, abort, hash).then((info) => info ? info.poster : null);
    }
    return null;
  }
};

// src/providers/youtube/loader.ts
init_std();
init_network();
var YouTubeProviderLoader = class {
  name = "youtube";
  target;
  preconnect() {
    const connections = [
      // Botguard script.
      "https://www.google.com",
      // Posters.
      "https://i.ytimg.com",
      // Ads.
      "https://googleads.g.doubleclick.net",
      "https://static.doubleclick.net"
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === "video/youtube";
  }
  mediaType() {
    return "video";
  }
  async load(ctx) {
    if (false) {
      throw Error("[vidstack] can not load youtube provider server-side");
    }
    if (!this.target) {
      throw Error(
        "[vidstack] `<iframe>` element was not found - did you forget to include media provider?"
      );
    }
    return new (await Promise.resolve().then(() => (init_provider8(), provider_exports7))).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster: findYouTubePoster2, resolveYouTubeVideoId: resolveYouTubeVideoId2 } = await Promise.resolve().then(() => (init_utils4(), utils_exports2));
    const videoId = isString(src.src) && resolveYouTubeVideoId2(src.src);
    if (videoId) return findYouTubePoster2(videoId, abort);
    return null;
  }
};

// src/utils/manifest.ts
function resolveStreamTypeFromDASHManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    return /type="static"/.test(manifest) ? "on-demand" : "live";
  });
}
function resolveStreamTypeFromHLSManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit).then((res) => res.text()).then((manifest) => {
    const renditionURI = resolveHLSRenditionURI(manifest);
    if (renditionURI) {
      return resolveStreamTypeFromHLSManifest(
        /^https?:/.test(renditionURI) ? renditionURI : new URL(renditionURI, manifestSrc).href,
        requestInit
      );
    }
    const streamType = /EXT-X-PLAYLIST-TYPE:\s*VOD/.test(manifest) ? "on-demand" : "live";
    if (streamType === "live" && resolveTargetDuration(manifest) >= 10 && (/#EXT-X-DVR-ENABLED:\s*true/.test(manifest) || manifest.includes("#EXT-X-DISCONTINUITY"))) {
      return "live:dvr";
    }
    return streamType;
  });
}
function resolveHLSRenditionURI(manifest) {
  const matches = manifest.match(/#EXT-X-STREAM-INF:[^\n]+(\n[^\n]+)*/g);
  return matches ? matches[0].split("\n")[1].trim() : null;
}
function resolveTargetDuration(manifest) {
  const lines = manifest.split("\n");
  for (const line of lines) {
    if (line.startsWith("#EXT-X-TARGETDURATION")) {
      const duration = parseFloat(line.split(":")[1]);
      if (!isNaN(duration)) {
        return duration;
      }
    }
  }
  return -1;
}

// src/components/provider/source-select.ts
init_mime();
init_network();
init_support();
var warned = true ? /* @__PURE__ */ new Set() : void 0;
var sourceTypes = /* @__PURE__ */ new Map();
var SourceSelection = class {
  #initialize = false;
  #loaders;
  #domSources;
  #media;
  #loader;
  constructor(domSources, media, loader, customLoaders = []) {
    this.#domSources = domSources;
    this.#media = media;
    this.#loader = loader;
    const DASH_LOADER = new DASHProviderLoader(), HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader(), YOUTUBE_LOADER = new YouTubeProviderLoader(), VIMEO_LOADER = new VimeoProviderLoader(), EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    this.#loaders = computed(() => {
      const remoteLoader = media.$state.remotePlaybackLoader();
      const loaders = media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, HLS_LOADER, ...EMBED_LOADERS, ...customLoaders] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER, DASH_LOADER, ...EMBED_LOADERS, ...customLoaders];
      return remoteLoader ? [remoteLoader, ...loaders] : loaders;
    });
    const { $state } = media;
    $state.sources.set(normalizeSrc(media.$props.src()));
    for (const src of $state.sources()) {
      const loader2 = this.#loaders().find((loader3) => loader3.canPlay(src));
      if (!loader2) continue;
      const mediaType = loader2.mediaType(src);
      media.$state.source.set(src);
      media.$state.mediaType.set(mediaType);
      media.$state.inferredViewType.set(mediaType);
      this.#loader.set(loader2);
      this.#initialize = true;
      break;
    }
  }
  connect() {
    const loader = this.#loader();
    if (this.#initialize) {
      this.#notifySourceChange(this.#media.$state.source(), loader);
      this.#notifyLoaderChange(loader);
      this.#initialize = false;
    }
    effect(this.#onSourcesChange.bind(this));
    effect(this.#onSourceChange.bind(this));
    effect(this.#onSetup.bind(this));
    effect(this.#onLoadSource.bind(this));
    effect(this.#onLoadPoster.bind(this));
  }
  #onSourcesChange() {
    this.#media.notify("sources-change", [
      ...normalizeSrc(this.#media.$props.src()),
      ...this.#domSources()
    ]);
  }
  #onSourceChange() {
    const { $state } = this.#media;
    const sources = $state.sources(), currentSource = peek($state.source), newSource = this.#findNewSource(currentSource, sources), noMatch = sources[0]?.src && !newSource.src && !newSource.type;
    if (noMatch && !warned.has(newSource.src) && !peek(this.#loader)) {
      const source = sources[0];
      console.warn(
        `[vidstack] could not find a loader for any of the given media sources, consider providing \`type\`:

--- HTML ---

<media-provider>
  <source src="${source.src}" type="video/mp4" />
</media-provider>"

--- React ---

<MediaPlayer src={{ src: "${source.src}", type: "video/mp4" }}>

---

Falling back to fetching source headers...`
      );
      warned.add(newSource.src);
    }
    if (noMatch) {
      const { crossOrigin } = $state, credentials = getRequestCredentials(crossOrigin()), abort = new AbortController();
      Promise.all(
        sources.map(
          (source) => isString(source.src) && source.type === "?" ? fetch(source.src, {
            method: "HEAD",
            credentials,
            signal: abort.signal
          }).then((res) => {
            source.type = res.headers.get("content-type") || "??";
            sourceTypes.set(source.src, source.type);
            return source;
          }).catch(() => source) : source
        )
      ).then((sources2) => {
        if (abort.signal.aborted) return;
        const newSource2 = this.#findNewSource(peek($state.source), sources2);
        tick();
        if (!newSource2.src) {
          this.#media.notify("error", {
            message: "Failed to load resource.",
            code: 4
          });
        }
      });
      return () => abort.abort();
    }
    tick();
  }
  #findNewSource(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null, triggerEvent = new DOMEvent("sources-change", { detail: { sources } }), loaders = this.#loaders(), { started, paused, currentTime, quality, savedState } = this.#media.$state;
    for (const src of sources) {
      const loader = loaders.find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
        break;
      }
    }
    if (isVideoQualitySrc(newSource)) {
      const currentQuality = quality(), sourceQuality = sources.find((s4) => s4.src === currentQuality?.src);
      if (peek(started)) {
        savedState.set({
          paused: peek(paused),
          currentTime: peek(currentTime)
        });
      } else {
        savedState.set(null);
      }
      if (sourceQuality) {
        newSource = sourceQuality;
        triggerEvent = new DOMEvent("quality-change", {
          detail: { quality: currentQuality }
        });
      }
    }
    if (!isSameSrc(currentSource, newSource)) {
      this.#notifySourceChange(newSource, newLoader, triggerEvent);
    }
    if (newLoader !== peek(this.#loader)) {
      this.#notifyLoaderChange(newLoader, triggerEvent);
    }
    return newSource;
  }
  #notifySourceChange(src, loader, trigger) {
    this.#media.notify("source-change", src, trigger);
    this.#media.notify("media-type-change", loader?.mediaType(src) || "unknown", trigger);
  }
  #notifyLoaderChange(loader, trigger) {
    this.#media.$providerSetup.set(false);
    this.#media.notify("provider-change", null, trigger);
    loader && peek(() => loader.preconnect?.(this.#media));
    this.#loader.set(loader);
    this.#media.notify("provider-loader-change", loader, trigger);
  }
  #onSetup() {
    const provider = this.#media.$provider();
    if (!provider || peek(this.#media.$providerSetup)) return;
    if (this.#media.$state.canLoad()) {
      scoped(() => provider.setup(), provider.scope);
      this.#media.$providerSetup.set(true);
      return;
    }
    peek(() => provider.preconnect?.());
  }
  #onLoadSource() {
    if (!this.#media.$providerSetup()) return;
    const provider = this.#media.$provider(), source = this.#media.$state.source(), crossOrigin = peek(this.#media.$state.crossOrigin), preferNativeHLS = peek(this.#media.$props.preferNativeHLS);
    if (isSameSrc(provider?.currentSrc, source)) {
      return;
    }
    if (this.#media.$state.canLoad()) {
      const abort = new AbortController();
      if (isHLSSrc(source)) {
        if (preferNativeHLS || !isHLSSupported()) {
          resolveStreamTypeFromHLSManifest(source.src, {
            credentials: getRequestCredentials(crossOrigin),
            signal: abort.signal
          }).then((streamType) => {
            this.#media.notify("stream-type-change", streamType);
          }).catch(noop);
        }
      } else if (isDASHSrc(source)) {
        resolveStreamTypeFromDASHManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal
        }).then((streamType) => {
          this.#media.notify("stream-type-change", streamType);
        }).catch(noop);
      } else {
        this.#media.notify("stream-type-change", "on-demand");
      }
      peek(() => {
        const preload = peek(this.#media.$state.preload);
        return provider?.loadSource(source, preload).catch((error) => {
          if (true) {
            this.#media.logger?.errorGroup("[vidstack] failed to load source").labelledLog("Error", error).labelledLog("Source", source).labelledLog("Provider", provider).labelledLog("Media Context", { ...this.#media }).dispatch();
          }
        });
      });
      return () => abort.abort();
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin);
    } catch (error) {
      if (true) {
        this.#media.logger?.infoGroup(`Failed to preconnect to source: ${source.src}`).labelledLog("Error", error).dispatch();
      }
    }
  }
  #onLoadPoster() {
    const loader = this.#loader(), { providedPoster, source, canLoadPoster } = this.#media.$state;
    if (!loader || !loader.loadPoster || !source() || !canLoadPoster() || providedPoster()) return;
    const abort = new AbortController(), trigger = new DOMEvent("source-change", { detail: source });
    loader.loadPoster(source(), this.#media, abort).then((url) => {
      this.#media.notify("poster-change", url || "", trigger);
    }).catch(() => {
      this.#media.notify("poster-change", "", trigger);
    });
    return () => {
      abort.abort();
    };
  }
};
function normalizeSrc(src) {
  return (isArray(src) ? src : [src]).map((src2) => {
    if (isString(src2)) {
      return { src: src2, type: inferType(src2) };
    } else {
      return { ...src2, type: inferType(src2.src, src2.type) };
    }
  });
}
function inferType(src, type) {
  if (isString(type) && type.length) {
    return type;
  } else if (isString(src) && sourceTypes.has(src)) {
    return sourceTypes.get(src);
  } else if (!type && isHLSSrc({ src, type: "" })) {
    return "application/x-mpegurl";
  } else if (!type && isDASHSrc({ src, type: "" })) {
    return "application/dash+xml";
  } else if (!isString(src) || src.startsWith("blob:")) {
    return "video/object";
  } else if (src.includes("youtube") || src.includes("youtu.be")) {
    return "video/youtube";
  } else if (src.includes("vimeo") && !src.includes("progressive_redirect") && !src.includes(".m3u8")) {
    return "video/vimeo";
  }
  return "?";
}
function isSameSrc(a2, b2) {
  return a2?.src === b2?.src && a2?.type === b2?.type;
}

// src/components/provider/tracks.ts
init_prod();
init_text_track();
var Tracks = class {
  #domTracks;
  #media;
  #prevTracks = [];
  constructor(domTracks, media) {
    this.#domTracks = domTracks;
    this.#media = media;
    effect(this.#onTracksChange.bind(this));
  }
  #onTracksChange() {
    const newTracks = this.#domTracks();
    for (const oldTrack of this.#prevTracks) {
      if (!newTracks.some((t5) => t5.id === oldTrack.id)) {
        const track = oldTrack.id && this.#media.textTracks.getById(oldTrack.id);
        if (track) this.#media.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id2 = newTrack.id || TextTrack.createId(newTrack);
      if (!this.#media.textTracks.getById(id2)) {
        newTrack.id = id2;
        this.#media.textTracks.add(newTrack);
      }
    }
    this.#prevTracks = newTracks;
  }
};

// src/components/provider/provider.ts
var MediaProvider = class extends Component {
  static props = {
    loaders: []
  };
  static state = new State({
    loader: null
  });
  #media;
  #sources;
  #domSources = signal([]);
  #domTracks = signal([]);
  #loader = null;
  onSetup() {
    this.#media = useMediaContext();
    this.#sources = new SourceSelection(
      this.#domSources,
      this.#media,
      this.$state.loader,
      this.$props.loaders()
    );
  }
  onAttach(el) {
    el.setAttribute("data-media-provider", "");
  }
  onConnect(el) {
    this.#sources.connect();
    new Tracks(this.#domTracks, this.#media);
    const resize = new ResizeObserver(animationFrameThrottle(this.#onResize.bind(this)));
    resize.observe(el);
    const mutations = new MutationObserver(this.#onMutation.bind(this));
    mutations.observe(el, { attributes: true, childList: true });
    this.#onResize();
    this.#onMutation();
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  #loadRafId = -1;
  // @method
  load(target) {
    target?.setAttribute("aria-hidden", "true");
    window.cancelAnimationFrame(this.#loadRafId);
    this.#loadRafId = requestAnimationFrame(() => this.#runLoader(target));
    onDispose(() => {
      window.cancelAnimationFrame(this.#loadRafId);
    });
  }
  #runLoader(target) {
    if (!this.scope) return;
    const loader = this.$state.loader(), { $provider } = this.#media;
    if (this.#loader === loader && loader?.target === target && peek($provider)) return;
    this.#destroyProvider();
    this.#loader = loader;
    if (loader) loader.target = target || null;
    if (!loader || !target) return;
    loader.load(this.#media).then((provider) => {
      if (!this.scope) return;
      if (peek(this.$state.loader) !== loader) return;
      this.#media.notify("provider-change", provider);
    });
  }
  onDestroy() {
    this.#loader = null;
    this.#destroyProvider();
  }
  #destroyProvider() {
    this.#media?.notify("provider-change", null);
  }
  #onResize() {
    if (!this.el) return;
    const { player, $state } = this.#media, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player) return;
    $state.mediaWidth.set(width);
    $state.mediaHeight.set(height);
    if (player.el) {
      setStyle(player.el, "--media-width", width + "px");
      setStyle(player.el, "--media-height", height + "px");
    }
  }
  #onMutation() {
    const sources = [], tracks = [], children = this.el.children;
    for (const el of children) {
      if (el.hasAttribute("data-vds")) continue;
      if (el instanceof HTMLSourceElement) {
        const src = {
          id: el.id,
          src: el.src,
          type: el.type
        };
        for (const prop8 of ["id", "src", "width", "height", "bitrate", "codec"]) {
          const value = el.getAttribute(`data-${prop8}`);
          if (isString(value)) src[prop8] = /id|src|codec/.test(prop8) ? value : Number(value);
        }
        sources.push(src);
      } else if (el instanceof HTMLTrackElement) {
        const track = {
          src: el.src,
          kind: el.track.kind,
          language: el.srclang,
          label: el.label,
          default: el.default,
          type: el.getAttribute("data-type")
        };
        tracks.push({
          id: el.id || TextTrack.createId(track),
          ...track
        });
      }
    }
    this.#domSources.set(sources);
    this.#domTracks.set(tracks);
    tick();
  }
};

// src/elements/define/provider-element.ts
var MediaProviderElement = class extends Host(HTMLElement, MediaProvider) {
  static tagName = "media-provider";
  #media;
  #target = null;
  #blocker = null;
  onSetup() {
    this.#media = useMediaContext();
    this.setAttribute("keep-alive", "");
  }
  onDestroy() {
    this.#blocker?.remove();
    this.#blocker = null;
    this.#target?.remove();
    this.#target = null;
  }
  onConnect() {
    effect(() => {
      const loader = this.$state.loader(), isYouTubeEmbed = loader?.name === "youtube", isVimeoEmbed = loader?.name === "vimeo", isEmbed = isYouTubeEmbed || isVimeoEmbed, isGoogleCast = loader?.name === "google-cast";
      const target = loader ? isGoogleCast ? this.#createGoogleCastContainer() : isEmbed ? this.#createIFrame() : loader.mediaType() === "audio" ? this.#createAudio() : this.#createVideo() : null;
      if (this.#target !== target) {
        const parent = this.#target?.parentElement ?? this;
        this.#target?.remove();
        this.#target = target;
        if (target) parent.prepend(target);
        if (isEmbed && target) {
          effect(() => {
            const { nativeControls, viewType } = this.#media.$state, showNativeControls = nativeControls(), isAudioView = viewType() === "audio", showBlocker = !showNativeControls && !isAudioView;
            if (showBlocker) {
              this.#blocker = this.querySelector(".vds-blocker");
              if (!this.#blocker) {
                this.#blocker = document.createElement("div");
                this.#blocker.classList.add("vds-blocker");
                target.after(this.#blocker);
              }
            } else {
              this.#blocker?.remove();
              this.#blocker = null;
            }
            setAttribute(target, "data-no-controls", !showNativeControls);
          });
        }
      }
      if (isYouTubeEmbed) target?.classList.add("vds-youtube");
      else if (isVimeoEmbed) target?.classList.add("vds-vimeo");
      if (!isEmbed) {
        this.#blocker?.remove();
        this.#blocker = null;
      }
      this.load(target);
    });
  }
  #createAudio() {
    const audio = this.#target instanceof HTMLAudioElement ? this.#target : document.createElement("audio");
    const { controls, crossOrigin } = this.#media.$state;
    effect(() => {
      setAttribute(audio, "controls", controls());
      setAttribute(audio, "crossorigin", crossOrigin());
    });
    return audio;
  }
  #createVideo() {
    const video = this.#target instanceof HTMLVideoElement ? this.#target : document.createElement("video");
    const { crossOrigin, poster, nativeControls } = this.#media.$state, $controls = computed(() => nativeControls() ? "true" : null), $poster = computed(() => poster() && nativeControls() ? poster() : null);
    effect(() => {
      setAttribute(video, "controls", $controls());
      setAttribute(video, "crossorigin", crossOrigin());
      setAttribute(video, "poster", $poster());
    });
    return video;
  }
  #createIFrame() {
    const iframe = this.#target instanceof HTMLIFrameElement ? this.#target : document.createElement("iframe"), { nativeControls } = this.#media.$state;
    effect(() => setAttribute(iframe, "tabindex", !nativeControls() ? -1 : null));
    return iframe;
  }
  #createGoogleCastContainer() {
    if (this.#target?.classList.contains("vds-google-cast")) {
      return this.#target;
    }
    const container = document.createElement("div");
    container.classList.add("vds-google-cast");
    Promise.resolve().then(() => (init_provider_cast_display(), provider_cast_display_exports)).then(({ insertContent: insertContent2 }) => {
      insertContent2(container, this.#media.$state);
    });
    return container;
  }
};

// src/elements/bundles/player.ts
defineCustomElement(MediaPlayerElement);
defineCustomElement(MediaProviderElement);

// src/components/ui/buttons/airplay-button.ts
init_prod();

// src/utils/aria.ts
function ariaBool2(value) {
  return value ? "true" : "false";
}
function $ariaBool(signal2) {
  return () => ariaBool2(signal2());
}

// src/components/ui/buttons/airplay-button.ts
init_dom();

// src/components/ui/buttons/toggle-button-controller.ts
init_prod();
init_std();

// src/core/keyboard/aria-shortcuts.ts
init_prod();
init_std();
var ARIAKeyShortcuts = class extends ViewController {
  #shortcut;
  constructor(shortcut) {
    super();
    this.#shortcut = shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this.#shortcut] = keys;
      if (true) {
        onDispose(() => {
          delete ariaKeys[this.#shortcut];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this.#shortcut];
    if (shortcuts) {
      const keys2 = isArray(shortcuts) ? shortcuts.join(" ") : isString(shortcuts) ? shortcuts : shortcuts?.keys;
      el.setAttribute("aria-keyshortcuts", isArray(keys2) ? keys2.join(" ") : keys2);
    }
  }
};

// src/components/ui/buttons/toggle-button-controller.ts
init_dom();
var ToggleButtonController = class extends ViewController {
  static props = {
    disabled: false
  };
  #delegate;
  constructor(delegate) {
    super();
    this.#delegate = delegate;
    new FocusVisibleController();
    if (delegate.keyShortcut) {
      new ARIAKeyShortcuts(delegate.keyShortcut);
    }
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      "data-pressed": this.#delegate.isPresssed,
      "aria-pressed": this.#isARIAPressed.bind(this),
      "aria-disabled": () => disabled() ? "true" : null
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    onPress(el, this.#onMaybePress.bind(this));
    for (const type of ["click", "touchstart"]) {
      this.listen(type, this.#onInteraction.bind(this), {
        passive: true
      });
    }
  }
  #isARIAPressed() {
    return ariaBool(this.#delegate.isPresssed());
  }
  #onPressed(event2) {
    if (isWriteSignal(this.#delegate.isPresssed)) {
      this.#delegate.isPresssed.set((p2) => !p2);
    }
  }
  #onMaybePress(event2) {
    const disabled = this.$props.disabled() || this.el.hasAttribute("data-disabled");
    if (disabled) {
      event2.preventDefault();
      event2.stopImmediatePropagation();
      return;
    }
    event2.preventDefault();
    (this.#delegate.onPress ?? this.#onPressed).call(this, event2);
  }
  #onInteraction(event2) {
    if (this.$props.disabled()) {
      event2.preventDefault();
      event2.stopImmediatePropagation();
    }
  }
};

// src/components/ui/buttons/airplay-button.ts
var AirPlayButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { canAirPlay, isAirPlayConnected } = this.#media.$state;
    this.setAttributes({
      "data-active": isAirPlayConnected,
      "data-supported": canAirPlay,
      "data-state": this.#getState.bind(this),
      "aria-hidden": $ariaBool(() => !canAirPlay())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "airplay");
    setARIALabel(el, this.#getDefaultLabel.bind(this));
  }
  #onPress(event2) {
    const remote = this.#media.remote;
    remote.requestAirPlay(event2);
  }
  #isPressed() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState() !== "disconnected";
  }
  #getState() {
    const { remotePlaybackType, remotePlaybackState } = this.#media.$state;
    return remotePlaybackType() === "airplay" && remotePlaybackState();
  }
  #getDefaultLabel() {
    const { remotePlaybackState } = this.#media.$state;
    return `AirPlay ${remotePlaybackState()}`;
  }
};

// src/elements/define/buttons/airplay-button-element.ts
var MediaAirPlayButtonElement = class extends Host(HTMLElement, AirPlayButton) {
  static tagName = "media-airplay-button";
};

// src/components/ui/buttons/caption-button.ts
init_prod();
init_text_track();
init_dom();
var CaptionButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "toggleCaptions",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    this.setAttributes({
      "data-active": this.#isPressed.bind(this),
      "data-supported": () => !this.#isHidden(),
      "aria-hidden": $ariaBool(this.#isHidden.bind(this))
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "caption");
    setARIALabel(el, "Captions");
  }
  #onPress(event2) {
    this.#media.remote.toggleCaptions(event2);
  }
  #isPressed() {
    const { textTrack } = this.#media.$state, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  #isHidden() {
    const { hasCaptions } = this.#media.$state;
    return !hasCaptions();
  }
};

// src/elements/define/buttons/caption-button-element.ts
var MediaCaptionButtonElement = class extends Host(HTMLElement, CaptionButton) {
  static tagName = "media-caption-button";
};

// src/components/ui/buttons/fullscreen-button.ts
init_prod();
init_dom();
var FullscreenButton = class extends Component {
  static props = {
    ...ToggleButtonController.props,
    target: "prefer-media"
  };
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "toggleFullscreen",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { fullscreen } = this.#media.$state, isSupported = this.#isSupported.bind(this);
    this.setAttributes({
      "data-active": fullscreen,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "fullscreen");
    setARIALabel(el, "Fullscreen");
  }
  #onPress(event2) {
    const remote = this.#media.remote, target = this.$props.target();
    this.#isPressed() ? remote.exitFullscreen(target, event2) : remote.enterFullscreen(target, event2);
  }
  #isPressed() {
    const { fullscreen } = this.#media.$state;
    return fullscreen();
  }
  #isSupported() {
    const { canFullscreen } = this.#media.$state;
    return canFullscreen();
  }
};

// src/elements/define/buttons/fullscreen-button-element.ts
var MediaFullscreenButtonElement = class extends Host(HTMLElement, FullscreenButton) {
  static tagName = "media-fullscreen-button";
};

// src/components/ui/buttons/live-button.ts
init_prod();
init_dom();
var LiveButton = class extends Component {
  static props = {
    disabled: false
  };
  #media;
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.#media = useMediaContext();
    const { disabled } = this.$props, { live, liveEdge } = this.#media.$state, isHidden = () => !live();
    this.setAttributes({
      "data-edge": liveEdge,
      "data-hidden": isHidden,
      "aria-disabled": $ariaBool(() => disabled() || liveEdge()),
      "aria-hidden": $ariaBool(isHidden)
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "live");
  }
  onConnect(el) {
    onPress(el, this.#onPress.bind(this));
  }
  #onPress(event2) {
    const { disabled } = this.$props, { liveEdge } = this.#media.$state;
    if (disabled() || liveEdge()) return;
    this.#media.remote.seekToLiveEdge(event2);
  }
};

// src/elements/define/buttons/live-button-element.ts
var MediaLiveButtonElement = class extends Host(HTMLElement, LiveButton) {
  static tagName = "media-live-button";
};

// src/components/ui/buttons/mute-button.ts
init_prod();
init_dom();
var MuteButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "toggleMuted",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    this.setAttributes({
      "data-muted": this.#isPressed.bind(this),
      "data-state": this.#getState.bind(this)
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-mute-button", "");
    el.setAttribute("data-media-tooltip", "mute");
    setARIALabel(el, "Mute");
  }
  #onPress(event2) {
    const remote = this.#media.remote;
    this.#isPressed() ? remote.unmute(event2) : remote.mute(event2);
  }
  #isPressed() {
    const { muted, volume } = this.#media.$state;
    return muted() || volume() === 0;
  }
  #getState() {
    const { muted, volume } = this.#media.$state, $volume = volume();
    if (muted() || $volume === 0) return "muted";
    else if ($volume >= 0.5) return "high";
    else if ($volume < 0.5) return "low";
  }
};

// src/elements/define/buttons/mute-button-element.ts
var MediaMuteButtonElement = class extends Host(HTMLElement, MuteButton) {
  static tagName = "media-mute-button";
};

// src/components/ui/buttons/pip-button.ts
init_prod();
init_dom();
var PIPButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "togglePictureInPicture",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { pictureInPicture } = this.#media.$state, isSupported = this.#isSupported.bind(this);
    this.setAttributes({
      "data-active": pictureInPicture,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "pip");
    setARIALabel(el, "PiP");
  }
  #onPress(event2) {
    const remote = this.#media.remote;
    this.#isPressed() ? remote.exitPictureInPicture(event2) : remote.enterPictureInPicture(event2);
  }
  #isPressed() {
    const { pictureInPicture } = this.#media.$state;
    return pictureInPicture();
  }
  #isSupported() {
    const { canPictureInPicture } = this.#media.$state;
    return canPictureInPicture();
  }
};

// src/elements/define/buttons/pip-button-element.ts
var MediaPIPButtonElement = class extends Host(HTMLElement, PIPButton) {
  static tagName = "media-pip-button";
};

// src/components/ui/buttons/play-button.ts
init_prod();
init_dom();
var PlayButton = class extends Component {
  static props = ToggleButtonController.props;
  #media;
  constructor() {
    super();
    new ToggleButtonController({
      isPresssed: this.#isPressed.bind(this),
      keyShortcut: "togglePaused",
      onPress: this.#onPress.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const { paused, ended } = this.#media.$state;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  onAttach(el) {
    el.setAttribute("data-media-tooltip", "play");
    setARIALabel(el, "Play");
  }
  #onPress(event2) {
    const remote = this.#media.remote;
    this.#isPressed() ? remote.pause(event2) : remote.play(event2);
  }
  #isPressed() {
    const { paused } = this.#media.$state;
    return !paused();
  }
};

// src/elements/define/buttons/play-button-element.ts
var MediaPlayButtonElement = class extends Host(HTMLElement, PlayButton) {
  static tagName = "media-play-button";
};

// src/components/ui/buttons/seek-button.ts
init_prod();
init_dom();
var SeekButton = class extends Component {
  static props = {
    disabled: false,
    seconds: 30
  };
  #media;
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.#media = useMediaContext();
    const { seeking } = this.#media.$state, { seconds } = this.$props, isSupported = this.#isSupported.bind(this);
    this.setAttributes({
      seconds,
      "data-seeking": seeking,
      "data-supported": isSupported,
      "aria-hidden": $ariaBool(() => !isSupported())
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setAttributeIfEmpty(el, "type", "button");
    el.setAttribute("data-media-tooltip", "seek");
    setARIALabel(el, this.#getDefaultLabel.bind(this));
  }
  onConnect(el) {
    onPress(el, this.#onPress.bind(this));
  }
  #isSupported() {
    const { canSeek } = this.#media.$state;
    return canSeek();
  }
  #getDefaultLabel() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  #onPress(event2) {
    const { seconds, disabled } = this.$props;
    if (disabled()) return;
    const { currentTime } = this.#media.$state, seekTo = currentTime() + seconds();
    this.#media.remote.seek(seekTo, event2);
  }
};

// src/elements/define/buttons/seek-button-element.ts
var MediaSeekButtonElement = class extends Host(HTMLElement, SeekButton) {
  static tagName = "media-seek-button";
};

// src/elements/define/layouts/plyr/plyr-layout-element.ts
init_prod();

// src/components/layouts/plyr/plyr-layout.ts
init_prod();
init_std();

// src/components/layouts/plyr/context.ts
init_prod();
var plyrLayoutContext = createContext();
function usePlyrLayoutContext() {
  return useContext(plyrLayoutContext);
}

// src/components/layouts/plyr/props.ts
var plyrLayoutProps = {
  clickToPlay: true,
  clickToFullscreen: true,
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute+volume",
    "captions",
    "settings",
    "pip",
    "airplay",
    "fullscreen"
  ],
  customIcons: false,
  displayDuration: false,
  download: null,
  markers: null,
  invertTime: true,
  thumbnails: null,
  toggleTime: true,
  translations: null,
  seekTime: 10,
  speed: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
};

// src/components/layouts/plyr/plyr-layout.ts
var PlyrLayout = class extends Component {
  static props = plyrLayoutProps;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    provideContext(plyrLayoutContext, {
      ...this.$props,
      previewTime: signal(0)
    });
  }
};
function usePlyrLayoutClasses(el, media) {
  const {
    canAirPlay,
    canFullscreen,
    canPictureInPicture,
    controlsHidden,
    currentTime,
    fullscreen,
    hasCaptions,
    isAirPlayConnected,
    paused,
    pictureInPicture,
    playing,
    pointer,
    poster,
    textTrack,
    viewType,
    waiting
  } = media.$state;
  el.classList.add("plyr");
  el.classList.add("plyr--full-ui");
  const classes = {
    "plyr--airplay-active": isAirPlayConnected,
    "plyr--airplay-supported": canAirPlay,
    "plyr--fullscreen-active": fullscreen,
    "plyr--fullscreen-enabled": canFullscreen,
    "plyr--hide-controls": controlsHidden,
    "plyr--is-touch": () => pointer() === "coarse",
    "plyr--loading": waiting,
    "plyr--paused": paused,
    "plyr--pip-active": pictureInPicture,
    "plyr--pip-enabled": canPictureInPicture,
    "plyr--playing": playing,
    "plyr__poster-enabled": poster,
    "plyr--stopped": () => paused() && currentTime() === 0,
    "plyr--captions-active": textTrack,
    "plyr--captions-enabled": hasCaptions
  };
  const disposal = createDisposalBin();
  for (const token of Object.keys(classes)) {
    disposal.add(effect(() => void el.classList.toggle(token, !!classes[token]())));
  }
  disposal.add(
    effect(() => {
      const token = `plyr--${viewType()}`;
      el.classList.add(token);
      return () => el.classList.remove(token);
    }),
    effect(() => {
      const { $provider } = media, type = $provider()?.type, token = `plyr--${isHTMLProvider(type) ? "html5" : type}`;
      el.classList.toggle(token, !!type);
      return () => el.classList.remove(token);
    })
  );
  return () => disposal.empty();
}
function isHTMLProvider(type) {
  return type === "audio" || type === "video";
}

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/lit-html.js
var t;
var i = window;
var s2 = i.trustedTypes;
var e = s2 ? s2.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
var o = "$lit$";
var n = `lit$${(Math.random() + "").slice(9)}$`;
var l = "?" + n;
var h2 = `<${l}>`;
var r = document;
var u = () => r.createComment("");
var d2 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
var c = Array.isArray;
var v = (t5) => c(t5) || "function" == typeof (null == t5 ? void 0 : t5[Symbol.iterator]);
var a = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m2 = />/g;
var p = RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t5) => (i3, ...s4) => ({ _$litType$: t5, strings: i3, values: s4 });
var x = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r.createTreeWalker(r, 129, null, false);
function P(t5, i3) {
  if (!Array.isArray(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i3) : i3;
}
var V = (t5, i3) => {
  const s4 = t5.length - 1, e6 = [];
  let l6, r4 = 2 === i3 ? "<svg>" : "", u2 = f;
  for (let i4 = 0; i4 < s4; i4++) {
    const s5 = t5[i4];
    let d3, c3, v2 = -1, a2 = 0;
    for (; a2 < s5.length && (u2.lastIndex = a2, c3 = u2.exec(s5), null !== c3); ) a2 = u2.lastIndex, u2 === f ? "!--" === c3[1] ? u2 = _ : void 0 !== c3[1] ? u2 = m2 : void 0 !== c3[2] ? (y.test(c3[2]) && (l6 = RegExp("</" + c3[2], "g")), u2 = p) : void 0 !== c3[3] && (u2 = p) : u2 === p ? ">" === c3[0] ? (u2 = null != l6 ? l6 : f, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u2.lastIndex - c3[2].length, d3 = c3[1], u2 = void 0 === c3[3] ? p : '"' === c3[3] ? $ : g) : u2 === $ || u2 === g ? u2 = p : u2 === _ || u2 === m2 ? u2 = f : (u2 = p, l6 = void 0);
    const w2 = u2 === p && t5[i4 + 1].startsWith("/>") ? " " : "";
    r4 += u2 === f ? s5 + h2 : v2 >= 0 ? (e6.push(d3), s5.slice(0, v2) + o + s5.slice(v2) + n + w2) : s5 + n + (-2 === v2 ? (e6.push(void 0), i4) : w2);
  }
  return [P(t5, r4 + (t5[s4] || "<?>") + (2 === i3 ? "</svg>" : "")), e6];
};
var N = class _N {
  constructor({ strings: t5, _$litType$: i3 }, e6) {
    let h4;
    this.parts = [];
    let r4 = 0, d3 = 0;
    const c3 = t5.length - 1, v2 = this.parts, [a2, f2] = V(t5, i3);
    if (this.el = _N.createElement(a2, e6), C.currentNode = this.el.content, 2 === i3) {
      const t6 = this.el.content, i4 = t6.firstChild;
      i4.remove(), t6.append(...i4.childNodes);
    }
    for (; null !== (h4 = C.nextNode()) && v2.length < c3; ) {
      if (1 === h4.nodeType) {
        if (h4.hasAttributes()) {
          const t6 = [];
          for (const i4 of h4.getAttributeNames()) if (i4.endsWith(o) || i4.startsWith(n)) {
            const s4 = f2[d3++];
            if (t6.push(i4), void 0 !== s4) {
              const t7 = h4.getAttribute(s4.toLowerCase() + o).split(n), i5 = /([.?@])?(.*)/.exec(s4);
              v2.push({ type: 1, index: r4, name: i5[2], strings: t7, ctor: "." === i5[1] ? H : "?" === i5[1] ? L : "@" === i5[1] ? z : k });
            } else v2.push({ type: 6, index: r4 });
          }
          for (const i4 of t6) h4.removeAttribute(i4);
        }
        if (y.test(h4.tagName)) {
          const t6 = h4.textContent.split(n), i4 = t6.length - 1;
          if (i4 > 0) {
            h4.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i4; s4++) h4.append(t6[s4], u()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
            h4.append(t6[i4], u());
          }
        }
      } else if (8 === h4.nodeType) if (h4.data === l) v2.push({ type: 2, index: r4 });
      else {
        let t6 = -1;
        for (; -1 !== (t6 = h4.data.indexOf(n, t6 + 1)); ) v2.push({ type: 7, index: r4 }), t6 += n.length - 1;
      }
      r4++;
    }
  }
  static createElement(t5, i3) {
    const s4 = r.createElement("template");
    return s4.innerHTML = t5, s4;
  }
};
function S(t5, i3, s4 = t5, e6) {
  var o6, n4, l6, h4;
  if (i3 === T) return i3;
  let r4 = void 0 !== e6 ? null === (o6 = s4._$Co) || void 0 === o6 ? void 0 : o6[e6] : s4._$Cl;
  const u2 = d2(i3) ? void 0 : i3._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u2 && (null === (n4 = null == r4 ? void 0 : r4._$AO) || void 0 === n4 || n4.call(r4, false), void 0 === u2 ? r4 = void 0 : (r4 = new u2(t5), r4._$AT(t5, s4, e6)), void 0 !== e6 ? (null !== (l6 = (h4 = s4)._$Co) && void 0 !== l6 ? l6 : h4._$Co = [])[e6] = r4 : s4._$Cl = r4), void 0 !== r4 && (i3 = S(t5, r4._$AS(t5, i3.values), r4, e6)), i3;
}
var M = class {
  constructor(t5, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t5) {
    var i3;
    const { el: { content: s4 }, parts: e6 } = this._$AD, o6 = (null !== (i3 = null == t5 ? void 0 : t5.creationScope) && void 0 !== i3 ? i3 : r).importNode(s4, true);
    C.currentNode = o6;
    let n4 = C.nextNode(), l6 = 0, h4 = 0, u2 = e6[0];
    for (; void 0 !== u2; ) {
      if (l6 === u2.index) {
        let i4;
        2 === u2.type ? i4 = new R(n4, n4.nextSibling, this, t5) : 1 === u2.type ? i4 = new u2.ctor(n4, u2.name, u2.strings, this, t5) : 6 === u2.type && (i4 = new Z(n4, this, t5)), this._$AV.push(i4), u2 = e6[++h4];
      }
      l6 !== (null == u2 ? void 0 : u2.index) && (n4 = C.nextNode(), l6++);
    }
    return C.currentNode = r, o6;
  }
  v(t5) {
    let i3 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t5, s4, i3), i3 += s4.strings.length - 2) : s4._$AI(t5[i3])), i3++;
  }
};
var R = class _R {
  constructor(t5, i3, s4, e6) {
    var o6;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i3, this._$AM = s4, this.options = e6, this._$Cp = null === (o6 = null == e6 ? void 0 : e6.isConnected) || void 0 === o6 || o6;
  }
  get _$AU() {
    var t5, i3;
    return null !== (i3 = null === (t5 = this._$AM) || void 0 === t5 ? void 0 : t5._$AU) && void 0 !== i3 ? i3 : this._$Cp;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === (null == t5 ? void 0 : t5.nodeType) && (t5 = i3.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i3 = this) {
    t5 = S(this, t5, i3), d2(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== T && this._(t5) : void 0 !== t5._$litType$ ? this.g(t5) : void 0 !== t5.nodeType ? this.$(t5) : v(t5) ? this.T(t5) : this._(t5);
  }
  k(t5) {
    return this._$AA.parentNode.insertBefore(t5, this._$AB);
  }
  $(t5) {
    this._$AH !== t5 && (this._$AR(), this._$AH = this.k(t5));
  }
  _(t5) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t5 : this.$(r.createTextNode(t5)), this._$AH = t5;
  }
  g(t5) {
    var i3;
    const { values: s4, _$litType$: e6 } = t5, o6 = "number" == typeof e6 ? this._$AC(t5) : (void 0 === e6.el && (e6.el = N.createElement(P(e6.h, e6.h[0]), this.options)), e6);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o6) this._$AH.v(s4);
    else {
      const t6 = new M(o6, this), i4 = t6.u(this.options);
      t6.v(s4), this.$(i4), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i3 = E.get(t5.strings);
    return void 0 === i3 && E.set(t5.strings, i3 = new N(t5)), i3;
  }
  T(t5) {
    c(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s4, e6 = 0;
    for (const o6 of t5) e6 === i3.length ? i3.push(s4 = new _R(this.k(u()), this.k(u()), this, this.options)) : s4 = i3[e6], s4._$AI(o6), e6++;
    e6 < i3.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i3.length = e6);
  }
  _$AR(t5 = this._$AA.nextSibling, i3) {
    var s4;
    for (null === (s4 = this._$AP) || void 0 === s4 || s4.call(this, false, true, i3); t5 && t5 !== this._$AB; ) {
      const i4 = t5.nextSibling;
      t5.remove(), t5 = i4;
    }
  }
  setConnected(t5) {
    var i3;
    void 0 === this._$AM && (this._$Cp = t5, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t5));
  }
};
var k = class {
  constructor(t5, i3, s4, e6, o6) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i3, this._$AM = e6, this.options = o6, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5, i3 = this, s4, e6) {
    const o6 = this.strings;
    let n4 = false;
    if (void 0 === o6) t5 = S(this, t5, i3, 0), n4 = !d2(t5) || t5 !== this._$AH && t5 !== T, n4 && (this._$AH = t5);
    else {
      const e7 = t5;
      let l6, h4;
      for (t5 = o6[0], l6 = 0; l6 < o6.length - 1; l6++) h4 = S(this, e7[s4 + l6], i3, l6), h4 === T && (h4 = this._$AH[l6]), n4 || (n4 = !d2(h4) || h4 !== this._$AH[l6]), h4 === A ? t5 = A : t5 !== A && (t5 += (null != h4 ? h4 : "") + o6[l6 + 1]), this._$AH[l6] = h4;
    }
    n4 && !e6 && this.j(t5);
  }
  j(t5) {
    t5 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t5 ? t5 : "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t5) {
    this.element[this.name] = t5 === A ? void 0 : t5;
  }
};
var I = s2 ? s2.emptyScript : "";
var L = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t5) {
    t5 && t5 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
};
var z = class extends k {
  constructor(t5, i3, s4, e6, o6) {
    super(t5, i3, s4, e6, o6), this.type = 5;
  }
  _$AI(t5, i3 = this) {
    var s4;
    if ((t5 = null !== (s4 = S(this, t5, i3, 0)) && void 0 !== s4 ? s4 : A) === T) return;
    const e6 = this._$AH, o6 = t5 === A && e6 !== A || t5.capture !== e6.capture || t5.once !== e6.once || t5.passive !== e6.passive, n4 = t5 !== A && (e6 === A || o6);
    o6 && this.element.removeEventListener(this.name, this, e6), n4 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    var i3, s4;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s4 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s4 ? s4 : this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var Z = class {
  constructor(t5, i3, s4) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    S(this, t5);
  }
};
var j = { O: o, P: n, A: l, C: 1, M: V, L: M, R: v, D: S, I: R, V: k, H: L, N: z, U: H, F: Z };
var B = i.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t = i.litHtmlVersions) && void 0 !== t ? t : i.litHtmlVersions = []).push("2.8.0");
var D = (t5, i3, s4) => {
  var e6, o6;
  const n4 = null !== (e6 = null == s4 ? void 0 : s4.renderBefore) && void 0 !== e6 ? e6 : i3;
  let l6 = n4._$litPart$;
  if (void 0 === l6) {
    const t6 = null !== (o6 = null == s4 ? void 0 : s4.renderBefore) && void 0 !== o6 ? o6 : null;
    n4._$litPart$ = l6 = new R(i3.insertBefore(u(), t6), t6, void 0, null != s4 ? s4 : {});
  }
  return l6._$AI(t5), l6;
};

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/directive-helpers.js
var { I: l2 } = j;
var e2 = (o6) => void 0 === o6.strings;

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/directive.js
var t2 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e3 = (t5) => (...e6) => ({ _$litDirective$: t5, values: e6 });
var i2 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e6, i3) {
    this._$Ct = t5, this._$AM = e6, this._$Ci = i3;
  }
  _$AS(t5, e6) {
    return this.update(t5, e6);
  }
  update(t5, e6) {
    return this.render(...e6);
  }
};

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/async-directive.js
var s3 = (i3, t5) => {
  var e6, o6;
  const r4 = i3._$AN;
  if (void 0 === r4) return false;
  for (const i4 of r4) null === (o6 = (e6 = i4)._$AO) || void 0 === o6 || o6.call(e6, t5, false), s3(i4, t5);
  return true;
};
var o2 = (i3) => {
  let t5, e6;
  do {
    if (void 0 === (t5 = i3._$AM)) break;
    e6 = t5._$AN, e6.delete(i3), i3 = t5;
  } while (0 === (null == e6 ? void 0 : e6.size));
};
var r2 = (i3) => {
  for (let t5; t5 = i3._$AM; i3 = t5) {
    let e6 = t5._$AN;
    if (void 0 === e6) t5._$AN = e6 = /* @__PURE__ */ new Set();
    else if (e6.has(i3)) break;
    e6.add(i3), l3(t5);
  }
};
function n2(i3) {
  void 0 !== this._$AN ? (o2(this), this._$AM = i3, r2(this)) : this._$AM = i3;
}
function h3(i3, t5 = false, e6 = 0) {
  const r4 = this._$AH, n4 = this._$AN;
  if (void 0 !== n4 && 0 !== n4.size) if (t5) if (Array.isArray(r4)) for (let i4 = e6; i4 < r4.length; i4++) s3(r4[i4], false), o2(r4[i4]);
  else null != r4 && (s3(r4, false), o2(r4));
  else s3(this, i3);
}
var l3 = (i3) => {
  var t5, s4, o6, r4;
  i3.type == t2.CHILD && (null !== (t5 = (o6 = i3)._$AP) && void 0 !== t5 || (o6._$AP = h3), null !== (s4 = (r4 = i3)._$AQ) && void 0 !== s4 || (r4._$AQ = n2));
};
var c2 = class extends i2 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i3, t5, e6) {
    super._$AT(i3, t5, e6), r2(this), this.isConnected = i3._$AU;
  }
  _$AO(i3, t5 = true) {
    var e6, r4;
    i3 !== this.isConnected && (this.isConnected = i3, i3 ? null === (e6 = this.reconnected) || void 0 === e6 || e6.call(this) : null === (r4 = this.disconnected) || void 0 === r4 || r4.call(this)), t5 && (s3(this, i3), o2(this));
  }
  setValue(t5) {
    if (e2(this._$Ct)) this._$Ct._$AI(t5, this);
    else {
      const i3 = [...this._$Ct._$AH];
      i3[this._$Ci] = t5, this._$Ct._$AI(i3, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/directives/if-defined.js
var l4 = (l6) => null != l6 ? l6 : A;

// src/elements/lit/directives/signal.ts
init_prod();
var SignalDirective = class extends c2 {
  #signal = null;
  #isAttr = false;
  #stop = null;
  constructor(part) {
    super(part);
    this.#isAttr = part.type === t2.ATTRIBUTE || part.type === t2.BOOLEAN_ATTRIBUTE;
  }
  render(signal2) {
    if (signal2 !== this.#signal) {
      this.disconnected();
      this.#signal = signal2;
      if (this.isConnected) this.#watch();
    }
    return this.#signal ? this.#resolveValue(peek(this.#signal)) : A;
  }
  reconnected() {
    this.#watch();
  }
  disconnected() {
    this.#stop?.();
    this.#stop = null;
  }
  #watch() {
    if (!this.#signal) return;
    this.#stop = effect(this.#onValueChange.bind(this));
  }
  #resolveValue(value) {
    return this.#isAttr ? l4(value) : value;
  }
  #setValue(value) {
    this.setValue(this.#resolveValue(value));
  }
  #onValueChange() {
    if (true) {
      try {
        this.#setValue(this.#signal?.());
      } catch (error) {
        if (error instanceof Error && error.message.includes("This `ChildPart` has no `parentNode`")) {
          const svelteDynamicImportExample = [
            "{#await import('./Player.svelte') then {default: Player}}",
            "  <svelte:component this={Player} />",
            "{/await}"
          ].join("\n");
          console.warn(
            `[vidstack] Failed to render most likely due to a hydration issue with your framework. Dynamically importing the player should resolve the issue.

Svelte Example:

${svelteDynamicImportExample}`
          );
        } else {
          console.error(error);
        }
      }
    } else {
      this.#setValue(this.#signal?.());
    }
  }
};
function $signal(compute2) {
  return e3(SignalDirective)(computed(compute2));
}

// src/elements/lit/lit-element.ts
var LitElement = class extends HTMLElement {
  rootPart = null;
  connectedCallback() {
    this.rootPart = D(this.render(), this, {
      renderBefore: this.firstChild
    });
    this.rootPart.setConnected(true);
  }
  disconnectedCallback() {
    this.rootPart?.setConnected(false);
    this.rootPart = null;
    D(null, this);
  }
};

// src/elements/define/layouts/slot-manager.ts
init_prod();
init_std();

// src/elements/define/layouts/slot-observer.ts
init_prod();
init_std();
var SlotObserver = class {
  #roots;
  #callback;
  elements = /* @__PURE__ */ new Set();
  constructor(roots, callback) {
    this.#roots = roots;
    this.#callback = callback;
  }
  connect() {
    this.#update();
    const observer = new MutationObserver(this.#onMutation);
    for (const root2 of this.#roots) observer.observe(root2, { childList: true, subtree: true });
    onDispose(() => observer.disconnect());
    onDispose(this.disconnect.bind(this));
  }
  disconnect() {
    this.elements.clear();
  }
  assign(template, slot) {
    if (isDOMNode(template)) {
      slot.textContent = "";
      slot.append(template);
    } else {
      D(null, slot);
      D(template, slot);
    }
    if (!slot.style.display) {
      slot.style.display = "contents";
    }
    const el = slot.firstElementChild;
    if (!el) return;
    const classList = slot.getAttribute("data-class");
    if (classList) el.classList.add(...classList.split(" "));
  }
  #onMutation = animationFrameThrottle(this.#update.bind(this));
  #update(entries) {
    if (entries && !entries.some((e6) => e6.addedNodes.length)) return;
    let changed = false, slots = this.#roots.flatMap((root2) => [...root2.querySelectorAll("slot")]);
    for (const slot of slots) {
      if (!slot.hasAttribute("name") || this.elements.has(slot)) continue;
      this.elements.add(slot);
      changed = true;
    }
    if (changed) this.#callback(this.elements);
  }
};

// src/elements/define/layouts/slot-manager.ts
var id = 0;
var slotIdAttr = "data-slot-id";
var SlotManager = class {
  #roots;
  slots;
  constructor(roots) {
    this.#roots = roots;
    this.slots = new SlotObserver(roots, this.#update.bind(this));
  }
  connect() {
    this.slots.connect();
    this.#update();
    const mutations = new MutationObserver(this.#onMutation);
    for (const root2 of this.#roots) mutations.observe(root2, { childList: true });
    onDispose(() => mutations.disconnect());
  }
  #onMutation = animationFrameThrottle(this.#update.bind(this));
  #update() {
    for (const root2 of this.#roots) {
      for (const node of root2.children) {
        if (node.nodeType !== 1) continue;
        const name = node.getAttribute("slot");
        if (!name) continue;
        node.style.display = "none";
        let slotId = node.getAttribute(slotIdAttr);
        if (!slotId) {
          node.setAttribute(slotIdAttr, slotId = ++id + "");
        }
        for (const slot of this.slots.elements) {
          if (slot.getAttribute("name") !== name || slot.getAttribute(slotIdAttr) === slotId) {
            continue;
          }
          const clone = document.importNode(node, true);
          if (name.includes("-icon")) clone.classList.add("vds-icon");
          clone.style.display = "";
          clone.removeAttribute("slot");
          this.slots.assign(clone, slot);
          slot.setAttribute(slotIdAttr, slotId);
        }
      }
    }
  }
};

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/directives/unsafe-html.js
var e4 = class extends i2 {
  constructor(i3) {
    if (super(i3), this.et = A, i3.type !== t2.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r4) {
    if (r4 === A || null == r4) return this.ft = void 0, this.et = r4;
    if (r4 === T) return r4;
    if ("string" != typeof r4) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r4 === this.et) return this.ft;
    this.et = r4;
    const s4 = [r4];
    return s4.raw = s4, this.ft = { _$litType$: this.constructor.resultType, strings: s4, values: [] };
  }
};
e4.directiveName = "unsafeHTML", e4.resultType = 1;
var o3 = e3(e4);

// ../../../node_modules/.pnpm/lit-html@2.8.0/node_modules/lit-html/directives/unsafe-svg.js
var t3 = class extends e4 {
};
t3.directiveName = "unsafeSVG", t3.resultType = 2;
var o4 = e3(t3);

// src/elements/icon.ts
init_std();
function Icon({ name, class: _class, state, paths, viewBox = "0 0 32 32" }) {
  return x`<svg
    class="${"vds-icon" + (_class ? ` ${_class}` : "")}"
    viewBox="${viewBox}"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    data-icon=${l4(name ?? state)}
  >
    ${!isString(paths) ? $signal(paths) : o4(paths)}
  </svg>`;
}

// src/elements/define/layouts/icons/layout-icons-loader.ts
init_prod();

// src/elements/define/layouts/icons/icons-loader.ts
var IconsLoader = class {
  #icons = {};
  #loaded = false;
  slots;
  constructor(roots) {
    this.slots = new SlotObserver(roots, this.#insertIcons.bind(this));
  }
  connect() {
    this.slots.connect();
  }
  load() {
    this.loadIcons().then((icons3) => {
      this.#icons = icons3;
      this.#loaded = true;
      this.#insertIcons();
    });
  }
  *#iterate() {
    for (const iconName of Object.keys(this.#icons)) {
      const slotName = `${iconName}-icon`;
      for (const slot of this.slots.elements) {
        if (slot.name !== slotName) continue;
        yield { icon: this.#icons[iconName], slot };
      }
    }
  }
  #insertIcons() {
    if (!this.#loaded) return;
    for (const { icon, slot } of this.#iterate()) {
      this.slots.assign(icon, slot);
    }
  }
};

// src/elements/define/layouts/icons/layout-icons-loader.ts
var LayoutIconsLoader = class extends IconsLoader {
  connect() {
    super.connect();
    const { player } = useMediaContext();
    if (!player.el) return;
    let dispose2, observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      dispose2?.();
      dispose2 = void 0;
      this.load();
    });
    observer.observe(player.el);
    dispose2 = onDispose(() => observer.disconnect());
  }
};

// src/elements/define/layouts/plyr/icons-loader.ts
var PlyrLayoutIconsLoader = class extends LayoutIconsLoader {
  async loadIcons() {
    const paths = (await Promise.resolve().then(() => (init_icons(), icons_exports))).icons, icons3 = {};
    for (const iconName of Object.keys(paths)) {
      icons3[iconName] = Icon({
        name: iconName,
        paths: paths[iconName],
        viewBox: "0 0 18 18"
      });
    }
    return icons3;
  }
};

// src/elements/define/layouts/plyr/ui.ts
init_prod();
init_std();

// src/components/layouts/plyr/translations.ts
function i18n(translations, word) {
  return translations()?.[word] ?? word;
}

// src/elements/define/layouts/plyr/ui.ts
init_network();
function PlyrAudioLayout() {
  return AudioControls();
}
function PlyrVideoLayout() {
  const media = useMediaContext(), { load } = media.$props, { canLoad } = media.$state, showLoadScreen = computed(() => load() === "play" && !canLoad());
  if (showLoadScreen()) {
    return [PlayLargeButton(), Poster()];
  }
  return [
    OptionalPlayLarge(),
    PreviewScrubbing(),
    Poster(),
    VideoControls(),
    Gestures(),
    Captions()
  ];
}
function PlayLargeButton() {
  const media = useMediaContext(), { translations } = usePlyrLayoutContext(), { title } = media.$state, $label = $signal(() => `${i18n(translations, "Play")}, ${title()}`);
  return x`
    <media-play-button
      class="plyr__control plyr__control--overlaid"
      aria-label=${$label}
      data-plyr="play"
    >
      <slot name="play-icon"></slot>
    </button>
  `;
}
function OptionalPlayLarge() {
  const { controls } = usePlyrLayoutContext();
  return $signal(() => controls().includes("play-large") ? PlayLargeButton() : null);
}
function PreviewScrubbing() {
  const { thumbnails, previewTime } = usePlyrLayoutContext();
  return x`
    <media-thumbnail
      .src=${$signal(thumbnails)}
      class="plyr__preview-scrubbing"
      time=${$signal(() => previewTime())}
    ></media-thumbnail>
  `;
}
function Poster() {
  const media = useMediaContext(), { poster } = media.$state, $style = $signal(() => `background-image: url("${poster()}");`);
  return x`<div class="plyr__poster" style=${$style}></div>`;
}
function AudioControls() {
  const ignore = /* @__PURE__ */ new Set(["captions", "pip", "airplay", "fullscreen"]), { controls } = usePlyrLayoutContext(), $controls = $signal(
    () => controls().filter((type) => !ignore.has(type)).map(Control)
  );
  return x`<div class="plyr__controls">${$controls}</div>`;
}
function VideoControls() {
  const { controls } = usePlyrLayoutContext(), $controls = $signal(() => controls().map(Control));
  return x`<div class="plyr__controls">${$controls}</div>`;
}
function Control(type) {
  switch (type) {
    case "airplay":
      return AirPlayButton2();
    case "captions":
      return CaptionsButton();
    case "current-time":
      return CurrentTime();
    case "download":
      return DownloadButton();
    case "duration":
      return Duration();
    case "fast-forward":
      return FastForwardButton();
    case "fullscreen":
      return FullscreenButton2();
    case "mute":
    case "volume":
    case "mute+volume":
      return Volume(type);
    case "pip":
      return PIPButton2();
    case "play":
      return PlayButton2();
    case "progress":
      return TimeSlider();
    case "restart":
      return RestartButton();
    case "rewind":
      return RewindButton();
    case "settings":
      return Settings();
    default:
      return null;
  }
}
function AirPlayButton2() {
  const { translations } = usePlyrLayoutContext();
  return x`
    <media-airplay-button class="plyr__controls__item plyr__control" data-plyr="airplay">
      <slot name="airplay-icon"></slot>
      <span class="plyr__tooltip">${$i18n(translations, "AirPlay")}</span>
    </media-airplay-button>
  `;
}
function CaptionsButton() {
  const { translations } = usePlyrLayoutContext(), $disableText = $i18n(translations, "Disable captions"), $enableText = $i18n(translations, "Enable captions");
  return x`
    <media-caption-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="captions"
    >
      <slot name="captions-on-icon" data-class="icon--pressed"></slot>
      <slot name="captions-off-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${$disableText}</span>
      <span class="label--not-pressed plyr__tooltip">${$enableText}</span>
    </media-caption-button>
  `;
}
function FullscreenButton2() {
  const { translations } = usePlyrLayoutContext(), $enterText = $i18n(translations, "Enter Fullscreen"), $exitText = $i18n(translations, "Exit Fullscreen");
  return x`
    <media-fullscreen-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="fullscreen"
    >
      <slot name="enter-fullscreen-icon" data-class="icon--pressed"></slot>
      <slot name="exit-fullscreen-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${$exitText}</span>
      <span class="label--not-pressed plyr__tooltip">${$enterText}</span>
    </media-fullscreen-button>
  `;
}
function MuteButton2() {
  const { translations } = usePlyrLayoutContext(), $muteText = $i18n(translations, "Mute"), $unmuteText = $i18n(translations, "Unmute");
  return x`
    <media-mute-button class="plyr__control" data-no-label data-plyr="mute">
      <slot name="muted-icon" data-class="icon--pressed"></slot>
      <slot name="volume-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${$unmuteText}</span>
      <span class="label--not-pressed plyr__tooltip">${$muteText}</span>
    </media-mute-button>
  `;
}
function PIPButton2() {
  const { translations } = usePlyrLayoutContext(), $enterText = $i18n(translations, "Enter PiP"), $exitText = $i18n(translations, "Exit PiP");
  return x`
    <media-pip-button class="plyr__controls__item plyr__control" data-no-label data-plyr="pip">
      <slot name="pip-icon"></slot>
      <slot name="enter-pip-icon" data-class="icon--pressed"></slot>
      <slot name="exit-pip-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${$exitText}</span>
      <span class="label--not-pressed plyr__tooltip">${$enterText}</span>
    </media-pip-button>
  `;
}
function PlayButton2() {
  const { translations } = usePlyrLayoutContext(), $playText = $i18n(translations, "Play"), $pauseText = $i18n(translations, "Pause");
  return x`
    <media-play-button class="plyr__controls__item plyr__control" data-no-label data-plyr="play">
      <slot name="pause-icon" data-class="icon--pressed"></slot>
      <slot name="play-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${$pauseText}</span>
      <span class="label--not-pressed plyr__tooltip">${$playText}</span>
    </media-play-button>
  `;
}
function RestartButton() {
  const { translations } = usePlyrLayoutContext(), { remote } = useMediaContext(), $restartText = $i18n(translations, "Restart");
  function onPress2(event2) {
    if (isKeyboardEvent(event2) && !isKeyboardClick(event2)) return;
    remote.seek(0, event2);
  }
  return x`
    <button
      type="button"
      class="plyr__control"
      data-plyr="restart"
      @pointerup=${onPress2}
      @keydown=${onPress2}
    >
      <slot name="restart-icon"></slot>
      <span class="plyr__tooltip">${$restartText}</span>
    </button>
  `;
}
function RewindButton() {
  const { translations, seekTime } = usePlyrLayoutContext(), $label = $signal(() => `${i18n(translations, "Rewind")} ${seekTime()}s`), $seconds = $signal(() => -1 * seekTime());
  return x`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${$seconds}
      data-no-label
      data-plyr="rewind"
    >
      <slot name="rewind-icon"></slot>
      <span class="plyr__tooltip">${$label}</span>
    </media-seek-button>
  `;
}
function FastForwardButton() {
  const { translations, seekTime } = usePlyrLayoutContext(), $label = $signal(() => `${i18n(translations, "Forward")} ${seekTime()}s`), $seconds = $signal(seekTime);
  return x`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${$seconds}
      data-no-label
      data-plyr="fast-forward"
    >
      <slot name="fast-forward-icon"></slot>
      <span class="plyr__tooltip">${$label}</span>
    </media-seek-button>
  `;
}
function TimeSlider() {
  let media = useMediaContext(), { duration, viewType } = media.$state, { translations, markers, thumbnails, seekTime, previewTime } = usePlyrLayoutContext(), $seekText = $i18n(translations, "Seek"), activeMarker = signal(null), $markerLabel = $signal(() => {
    const marker = activeMarker();
    return marker ? x`<span class="plyr__progress__marker-label">${o3(marker.label)}<br /></span>` : null;
  });
  function onSeekingRequest(event2) {
    previewTime.set(event2.detail);
  }
  function onMarkerEnter() {
    activeMarker.set(this);
  }
  function onMarkerLeave() {
    activeMarker.set(null);
  }
  function Preview() {
    const src = thumbnails(), $noClamp = $signal(() => viewType() === "audio");
    return !src ? x`
          <span class="plyr__tooltip">
            ${$markerLabel}
            <media-slider-value></media-slider-value>
          </span>
        ` : x`
          <media-slider-preview class="plyr__slider__preview" ?no-clamp=${$noClamp}>
            <media-slider-thumbnail .src=${src} class="plyr__slider__preview__thumbnail">
              <span class="plyr__slider__preview__time-container">
                ${$markerLabel}
                <media-slider-value class="plyr__slider__preview__time"></media-slider-value>
              </span>
            </media-slider-thumbnail>
          </media-slider-preview>
        `;
  }
  function Markers() {
    const endTime = duration();
    if (!Number.isFinite(endTime)) return null;
    return markers()?.map(
      (marker) => x`
        <span
          class="plyr__progress__marker"
          @mouseenter=${onMarkerEnter.bind(marker)}
          @mouseleave=${onMarkerLeave}
          style=${`left: ${marker.time / endTime * 100}%;`}
        ></span>
      `
    );
  }
  return x`
    <div class="plyr__controls__item plyr__progress__container">
      <div class="plyr__progress">
        <media-time-slider
          class="plyr__slider"
          data-plyr="seek"
          pause-while-dragging
          key-step=${$signal(seekTime)}
          aria-label=${$seekText}
          @media-seeking-request=${onSeekingRequest}
        >
          <div class="plyr__slider__track"></div>
          <div class="plyr__slider__thumb"></div>
          <div class="plyr__slider__buffer"></div>
          ${$signal(Preview)}${$signal(Markers)}
        </media-time-slider>
      </div>
    </div>
  `;
}
function Volume(type) {
  return $signal(() => {
    const hasMuteButton = type === "mute" || type === "mute+volume", hasVolumeSlider = type === "volume" || type === "mute+volume";
    return x`
      <div class="plyr__controls__item plyr__volume">
        ${[hasMuteButton ? MuteButton2() : null, hasVolumeSlider ? VolumeSlider() : null]}
      </div>
    `;
  });
}
function VolumeSlider() {
  const { translations } = usePlyrLayoutContext(), $volumeText = $i18n(translations, "Volume");
  return x`
    <media-volume-slider class="plyr__slider" data-plyr="volume" aria-label=${$volumeText}>
      <div class="plyr__slider__track"></div>
      <div class="plyr__slider__thumb"></div>
    </media-volume-slider>
  `;
}
function CurrentTime() {
  const media = useMediaContext(), { translations, invertTime, toggleTime, displayDuration } = usePlyrLayoutContext(), invert = signal(peek(invertTime));
  function onPress2(event2) {
    if (!toggleTime() || displayDuration() || isKeyboardEvent(event2) && !isKeyboardClick(event2)) {
      return;
    }
    invert.set((n4) => !n4);
  }
  function MaybeDuration() {
    return $signal(() => displayDuration() ? Duration() : null);
  }
  return $signal(() => {
    const { streamType } = media.$state, $liveText = $i18n(translations, "LIVE"), $currentTimeText = $i18n(translations, "Current time"), $remainder = $signal(() => !displayDuration() && invert());
    return streamType() === "live" || streamType() === "ll-live" ? x`
          <media-live-button
            class="plyr__controls__item plyr__control plyr__live-button"
            data-plyr="live"
          >
            <span class="plyr__live-button__text">${$liveText}</span>
          </media-live-button>
        ` : x`
          <media-time
            type="current"
            class="plyr__controls__item plyr__time plyr__time--current"
            tabindex="0"
            role="timer"
            aria-label=${$currentTimeText}
            ?remainder=${$remainder}
            @pointerup=${onPress2}
            @keydown=${onPress2}
          ></media-time>
          ${MaybeDuration()}
        `;
  });
}
function Duration() {
  const { translations } = usePlyrLayoutContext(), $durationText = $i18n(translations, "Duration");
  return x`
    <media-time
      type="duration"
      class="plyr__controls__item plyr__time plyr__time--duration"
      role="timer"
      tabindex="0"
      aria-label=${$durationText}
    ></media-time>
  `;
}
function DownloadButton() {
  return $signal(() => {
    const media = useMediaContext(), { translations, download } = usePlyrLayoutContext(), { title, source } = media.$state, $src = source(), $download = download(), file = getDownloadFile({
      title: title(),
      src: $src,
      download: $download
    }), $downloadText = $i18n(translations, "Download");
    return file ? x`
          <a
            class="plyr__controls__item plyr__control"
            href=${file.url + `?download=${file.name}`}
            download=${file.name}
            target="_blank"
          >
            <slot name="download-icon" />
            <span class="plyr__tooltip">${$downloadText}</span>
          </a>
        ` : null;
  });
}
function Gestures() {
  return $signal(() => {
    const { clickToPlay, clickToFullscreen } = usePlyrLayoutContext();
    return [
      clickToPlay() ? x`
            <media-gesture
              class="plyr__gesture"
              event="pointerup"
              action="toggle:paused"
            ></media-gesture>
          ` : null,
      clickToFullscreen() ? x`
            <media-gesture
              class="plyr__gesture"
              event="dblpointerup"
              action="toggle:fullscreen"
            ></media-gesture>
          ` : null
    ];
  });
}
function Captions() {
  const media = useMediaContext(), activeCue = signal(void 0), $cueText = $signal(() => o3(activeCue()?.text));
  effect(() => {
    const track = media.$state.textTrack();
    if (!track) return;
    function onCueChange() {
      activeCue.set(track?.activeCues[0]);
    }
    onCueChange();
    return listenEvent(track, "cue-change", onCueChange);
  });
  return x`
    <div class="plyr__captions" dir="auto">
      <span class="plyr__caption">${$cueText}</span>
    </div>
  `;
}
function Settings() {
  const { translations } = usePlyrLayoutContext(), $settingsText = $i18n(translations, "Settings");
  return x`
    <div class="plyr__controls__item plyr__menu">
      <media-menu>
        <media-menu-button class="plyr__control" data-plyr="settings">
          <slot name="settings-icon" />
          <span class="plyr__tooltip">${$settingsText}</span>
        </media-menu-button>
        <media-menu-items class="plyr__menu__container" placement="top end">
          <div><div>${[AudioMenu(), CaptionsMenu(), QualityMenu(), SpeedMenu()]}</div></div>
        </media-menu-items>
      </media-menu>
    </div>
  `;
}
function Menu({ label, children }) {
  const open = signal(false), onOpen = () => open.set(true), onClose = () => open.set(false);
  return x`
    <media-menu @open=${onOpen} @close=${onClose}>
      ${MenuButton({ label, open })}
      <media-menu-items>${children}</media-menu-items>
    </media-menu>
  `;
}
function MenuButton({ open, label }) {
  const { translations } = usePlyrLayoutContext(), $class = $signal(() => `plyr__control plyr__control--${open() ? "back" : "forward"}`);
  function GoBackText() {
    const $text = $i18n(translations, "Go back to previous menu");
    return $signal(() => open() ? x`<span class="plyr__sr-only">${$text}</span>` : null);
  }
  return x`
    <media-menu-button class=${$class} data-plyr="settings">
      <span class="plyr__menu__label" aria-hidden=${$aria(open)}>
        ${$i18n(translations, label)}
      </span>
      <span class="plyr__menu__value" data-part="hint"></span>
      ${GoBackText()}
    </media-menu-button>
  `;
}
function AudioMenu() {
  return Menu({ label: "Audio", children: AudioRadioGroup() });
}
function AudioRadioGroup() {
  const { translations } = usePlyrLayoutContext();
  return x`
    <media-audio-radio-group empty-label=${$i18n(translations, "Default")}>
      <template>
        <media-radio class="plyr__control" data-plyr="audio">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-audio-radio-group>
  `;
}
function SpeedMenu() {
  return Menu({ label: "Speed", children: SpeedRadioGroup() });
}
function SpeedRadioGroup() {
  const { translations, speed } = usePlyrLayoutContext();
  return x`
    <media-speed-radio-group .rates=${speed} normal-label=${$i18n(translations, "Normal")}>
      <template>
        <media-radio class="plyr__control" data-plyr="speed">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-speed-radio-group>
  `;
}
function CaptionsMenu() {
  return Menu({ label: "Captions", children: CaptionsRadioGroup() });
}
function CaptionsRadioGroup() {
  const { translations } = usePlyrLayoutContext();
  return x`
    <media-captions-radio-group off-label=${$i18n(translations, "Disabled")}>
      <template>
        <media-radio class="plyr__control" data-plyr="captions">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-captions-radio-group>
  `;
}
function QualityMenu() {
  return Menu({ label: "Quality", children: QualityRadioGroup() });
}
function QualityRadioGroup() {
  const { translations } = usePlyrLayoutContext();
  return x`
    <media-quality-radio-group auto-label=${$i18n(translations, "Auto")}>
      <template>
        <media-radio class="plyr__control" data-plyr="quality">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-quality-radio-group>
  `;
}
function $aria(signal2) {
  return $signal(() => signal2() ? "true" : "false");
}
function $i18n(translations, word) {
  return $signal(() => i18n(translations, word));
}

// src/elements/define/layouts/plyr/plyr-layout-element.ts
var MediaPlyrLayoutElement = class extends Host(LitElement, PlyrLayout) {
  static tagName = "media-plyr-layout";
  #media;
  onSetup() {
    this.forwardKeepAlive = false;
    this.#media = useMediaContext();
  }
  onConnect() {
    this.#media.player.el?.setAttribute("data-layout", "plyr");
    onDispose(() => this.#media.player.el?.removeAttribute("data-layout"));
    usePlyrLayoutClasses(this, this.#media);
    effect(() => {
      if (this.$props.customIcons()) {
        new SlotManager([this]).connect();
      } else {
        new PlyrLayoutIconsLoader([this]).connect();
      }
    });
  }
  render() {
    return $signal(this.#render.bind(this));
  }
  #render() {
    const { viewType } = this.#media.$state;
    return viewType() === "audio" ? PlyrAudioLayout() : viewType() === "video" ? PlyrVideoLayout() : null;
  }
};

// src/components/ui/menu/radio-groups/audio-radio-group.ts
init_prod();

// src/components/ui/menu/menu-context.ts
init_prod();
var menuContext = createContext();

// src/components/ui/menu/radio/radio-group-controller.ts
init_prod();
init_dom();

// src/components/ui/menu/radio/radio-controller.ts
init_prod();
var radioControllerContext = createContext();

// src/components/ui/menu/radio/radio-group-controller.ts
var RadioGroupController = class extends ViewController {
  #group = /* @__PURE__ */ new Set();
  #value = signal("");
  #controller = null;
  onValueChange;
  get values() {
    return Array.from(this.#group).map((radio) => radio.value());
  }
  get value() {
    return this.#value();
  }
  set value(value) {
    this.#onChange(value);
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: this.#addRadio.bind(this),
      remove: this.#removeRadio.bind(this)
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem) setAttributeIfEmpty(el, "role", "radiogroup");
    this.setAttributes({ value: this.#value });
  }
  onDestroy() {
    this.#group.clear();
  }
  #addRadio(radio) {
    if (this.#group.has(radio)) return;
    this.#group.add(radio);
    radio.onCheck = this.#onChangeBind;
    radio.check(radio.value() === this.#value());
  }
  #removeRadio(radio) {
    radio.onCheck = null;
    this.#group.delete(radio);
  }
  #onChangeBind = this.#onChange.bind(this);
  #onChange(newValue, trigger) {
    const currentValue = peek(this.#value);
    if (!newValue || newValue === currentValue) return;
    const currentRadio = this.#findRadio(currentValue), newRadio = this.#findRadio(newValue);
    currentRadio?.check(false, trigger);
    newRadio?.check(true, trigger);
    this.#value.set(newValue);
    this.onValueChange?.(newValue, trigger);
  }
  #findRadio(newValue) {
    for (const radio of this.#group) {
      if (newValue === peek(radio.value)) return radio;
    }
    return null;
  }
};

// src/components/ui/menu/radio-groups/audio-radio-group.ts
var AudioRadioGroup2 = class extends Component {
  static props = {
    emptyLabel: "Default"
  };
  #menu;
  #media;
  #controller;
  // @prop
  get value() {
    return this.#controller.value;
  }
  // @prop
  get disabled() {
    const { audioTracks } = this.#media.$state;
    return audioTracks().length <= 1;
  }
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    this.#media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.#menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.#watchValue.bind(this));
    effect(this.#watchControllerDisabled.bind(this));
    effect(this.#watchHintText.bind(this));
  }
  // @method
  getOptions() {
    const { audioTracks } = this.#media.$state;
    return audioTracks().map((track) => ({
      track,
      label: track.label,
      value: track.label.toLowerCase()
    }));
  }
  #watchValue() {
    this.#controller.value = this.#getValue();
  }
  #watchHintText() {
    const { emptyLabel } = this.$props, { audioTrack } = this.#media.$state, track = audioTrack();
    this.#menu?.hint.set(track?.label ?? emptyLabel());
  }
  #watchControllerDisabled() {
    this.#menu?.disable(this.disabled);
  }
  #getValue() {
    const { audioTrack } = this.#media.$state;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  #onValueChange(value, trigger) {
    if (this.disabled) return;
    const index = this.#media.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0) {
      const track = this.#media.audioTracks[index];
      this.#media.remote.changeAudioTrack(index, trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
};

// src/elements/define/menus/_template.ts
init_prod();
init_std();
init_dom();
function renderMenuItemsTemplate(el, onCreate) {
  requestScopedAnimationFrame(() => {
    if (!el.connectScope) return;
    const template = el.querySelector("template");
    if (!template) return;
    effect(() => {
      if (!template.content.firstElementChild?.localName && !template.firstElementChild) {
        throw Error("[vidstack] menu items template requires root element");
      }
      const options = el.getOptions();
      cloneTemplate(template, options.length, (radio, i3) => {
        const { label, value } = options[i3], labelEl = radio.querySelector(`[data-part="label"]`);
        radio.setAttribute("value", value);
        if (labelEl) {
          if (isString(label)) {
            labelEl.textContent = label;
          } else {
            effect(() => {
              labelEl.textContent = label();
            });
          }
        }
        onCreate?.(radio, options[i3], i3);
      });
    });
  });
}

// src/elements/define/menus/audio-radio-group-element.ts
var MediaAudioRadioGroupElement = class extends Host(HTMLElement, AudioRadioGroup2) {
  static tagName = "media-audio-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/components/ui/menu/radio-groups/captions-radio-group.ts
init_prod();
init_text_track();
var CaptionsRadioGroup2 = class extends Component {
  static props = {
    offLabel: "Off"
  };
  #media;
  #menu;
  #controller;
  // @prop
  get value() {
    return this.#controller.value;
  }
  // @prop
  get disabled() {
    const { hasCaptions } = this.#media.$state;
    return !hasCaptions();
  }
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    this.#media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.#menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    super.onConnect?.(el);
    effect(this.#watchValue.bind(this));
    effect(this.#watchControllerDisabled.bind(this));
    effect(this.#watchHintText.bind(this));
  }
  // @method
  getOptions() {
    const { offLabel } = this.$props, { textTracks } = this.#media.$state;
    return [
      { value: "off", label: offLabel },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        track,
        label: track.label,
        value: this.#getTrackValue(track)
      }))
    ];
  }
  #watchValue() {
    this.#controller.value = this.#getValue();
  }
  #watchHintText() {
    const { offLabel } = this.$props, { textTrack } = this.#media.$state, track = textTrack();
    this.#menu?.hint.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  #watchControllerDisabled() {
    this.#menu?.disable(this.disabled);
  }
  #getValue() {
    const { textTrack } = this.#media.$state, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? this.#getTrackValue(track) : "off";
  }
  #onValueChange(value, trigger) {
    if (this.disabled) return;
    if (value === "off") {
      const track = this.#media.textTracks.selected;
      if (track) {
        const index2 = this.#media.textTracks.indexOf(track);
        this.#media.remote.changeTextTrackMode(index2, "disabled", trigger);
        this.dispatch("change", { detail: null, trigger });
      }
      return;
    }
    const index = this.#media.textTracks.toArray().findIndex((track) => this.#getTrackValue(track) === value);
    if (index >= 0) {
      const track = this.#media.textTracks[index];
      this.#media.remote.changeTextTrackMode(index, "showing", trigger);
      this.dispatch("change", { detail: track, trigger });
    }
  }
  #getTrackValue(track) {
    return track.id + ":" + track.kind + "-" + track.label.toLowerCase();
  }
};

// src/elements/define/menus/captions-radio-group-element.ts
var MediaCaptionsRadioGroupElement = class extends Host(HTMLElement, CaptionsRadioGroup2) {
  static tagName = "media-captions-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/components/ui/menu/menu-button.ts
init_prod();
init_dom();
var MenuButton2 = class extends Component {
  static props = {
    disabled: false
  };
  #menu;
  #hintEl = signal(null);
  // @prop
  get expanded() {
    return this.#menu?.expanded() ?? false;
  }
  constructor() {
    super();
    new FocusVisibleController();
  }
  onSetup() {
    this.#menu = useContext(menuContext);
  }
  onAttach(el) {
    this.#menu.attachMenuButton(this);
    effect(this.#watchDisabled.bind(this));
    setAttributeIfEmpty(el, "type", "button");
  }
  onConnect(el) {
    effect(this.#watchHintEl.bind(this));
    this.#onMutation();
    const mutations = new MutationObserver(this.#onMutation.bind(this));
    mutations.observe(el, { attributeFilter: ["data-part"], childList: true, subtree: true });
    onDispose(() => mutations.disconnect());
    onPress(el, (trigger) => {
      this.dispatch("select", { trigger });
    });
  }
  #watchDisabled() {
    this.#menu.disableMenuButton(this.$props.disabled());
  }
  #watchHintEl() {
    const el = this.#hintEl();
    if (!el) return;
    effect(() => {
      const text = this.#menu.hint();
      if (text) el.textContent = text;
    });
  }
  #onMutation() {
    const hintEl = this.el?.querySelector('[data-part="hint"]');
    this.#hintEl.set(hintEl ?? null);
  }
};

// src/elements/define/menus/menu-button-element.ts
var MediaMenuButtonElement = class extends Host(HTMLElement, MenuButton2) {
  static tagName = "media-menu-button";
};

// src/components/ui/menu/menu.ts
init_prod();
init_std();
init_dom();

// src/components/ui/popper/popper.ts
init_prod();
init_std();
init_dom();
var Popper = class extends ViewController {
  #delegate;
  constructor(delegate) {
    super();
    this.#delegate = delegate;
    effect(this.#watchTrigger.bind(this));
  }
  onDestroy() {
    this.#stopAnimationEndListener?.();
    this.#stopAnimationEndListener = null;
  }
  #watchTrigger() {
    const trigger = this.#delegate.trigger();
    if (!trigger) {
      this.hide();
      return;
    }
    const show = this.show.bind(this), hide2 = this.hide.bind(this);
    this.#delegate.listen(trigger, show, hide2);
  }
  #showTimerId = -1;
  #hideRafId = -1;
  #stopAnimationEndListener = null;
  show(trigger) {
    this.#cancelShowing();
    window.cancelAnimationFrame(this.#hideRafId);
    this.#hideRafId = -1;
    this.#stopAnimationEndListener?.();
    this.#stopAnimationEndListener = null;
    this.#showTimerId = window.setTimeout(() => {
      this.#showTimerId = -1;
      const content = this.#delegate.content();
      if (content) content.style.removeProperty("display");
      peek(() => this.#delegate.onChange(true, trigger));
    }, this.#delegate.showDelay?.() ?? 0);
  }
  hide(trigger) {
    this.#cancelShowing();
    peek(() => this.#delegate.onChange(false, trigger));
    this.#hideRafId = requestAnimationFrame(() => {
      this.#cancelShowing();
      this.#hideRafId = -1;
      const content = this.#delegate.content();
      if (content) {
        const onHide = () => {
          content.style.display = "none";
          this.#stopAnimationEndListener = null;
        };
        const isAnimated = hasAnimation(content);
        if (isAnimated) {
          this.#stopAnimationEndListener?.();
          const stop = listenEvent(content, "animationend", onHide, { once: true });
          this.#stopAnimationEndListener = stop;
        } else {
          onHide();
        }
      }
    });
  }
  #cancelShowing() {
    window.clearTimeout(this.#showTimerId);
    this.#showTimerId = -1;
  }
};

// src/components/ui/sliders/slider/slider-context.ts
init_prod();
var sliderContext = createContext();
var sliderObserverContext = createContext();

// src/components/ui/menu/menu-focus-controller.ts
init_prod();
init_std();
init_dom();

// ../../../node_modules/.pnpm/compute-scroll-into-view@3.1.0/node_modules/compute-scroll-into-view/dist/index.js
var t4 = (t5) => "object" == typeof t5 && null != t5 && 1 === t5.nodeType;
var e5 = (t5, e6) => (!e6 || "hidden" !== t5) && ("visible" !== t5 && "clip" !== t5);
var n3 = (t5, n4) => {
  if (t5.clientHeight < t5.scrollHeight || t5.clientWidth < t5.scrollWidth) {
    const o6 = getComputedStyle(t5, null);
    return e5(o6.overflowY, n4) || e5(o6.overflowX, n4) || ((t6) => {
      const e6 = ((t7) => {
        if (!t7.ownerDocument || !t7.ownerDocument.defaultView) return null;
        try {
          return t7.ownerDocument.defaultView.frameElement;
        } catch (t8) {
          return null;
        }
      })(t6);
      return !!e6 && (e6.clientHeight < t6.scrollHeight || e6.clientWidth < t6.scrollWidth);
    })(t5);
  }
  return false;
};
var o5 = (t5, e6, n4, o6, l6, r4, i3, s4) => r4 < t5 && i3 > e6 || r4 > t5 && i3 < e6 ? 0 : r4 <= t5 && s4 <= n4 || i3 >= e6 && s4 >= n4 ? r4 - t5 - o6 : i3 > e6 && s4 < n4 || r4 < t5 && s4 > n4 ? i3 - e6 + l6 : 0;
var l5 = (t5) => {
  const e6 = t5.parentElement;
  return null == e6 ? t5.getRootNode().host || null : e6;
};
var r3 = (e6, r4) => {
  var i3, s4, d3, h4;
  if ("undefined" == typeof document) return [];
  const { scrollMode: c3, block: f2, inline: u2, boundary: a2, skipOverflowHiddenElements: g2 } = r4, p2 = "function" == typeof a2 ? a2 : (t5) => t5 !== a2;
  if (!t4(e6)) throw new TypeError("Invalid target");
  const m3 = document.scrollingElement || document.documentElement, w2 = [];
  let W = e6;
  for (; t4(W) && p2(W); ) {
    if (W = l5(W), W === m3) {
      w2.push(W);
      break;
    }
    null != W && W === document.body && n3(W) && !n3(document.documentElement) || null != W && n3(W, g2) && w2.push(W);
  }
  const b2 = null != (s4 = null == (i3 = window.visualViewport) ? void 0 : i3.width) ? s4 : innerWidth, H2 = null != (h4 = null == (d3 = window.visualViewport) ? void 0 : d3.height) ? h4 : innerHeight, { scrollX: y2, scrollY: M2 } = window, { height: v2, width: E2, top: x2, right: C2, bottom: I2, left: R2 } = e6.getBoundingClientRect(), { top: T2, right: B2, bottom: F, left: V2 } = ((t5) => {
    const e7 = window.getComputedStyle(t5);
    return { top: parseFloat(e7.scrollMarginTop) || 0, right: parseFloat(e7.scrollMarginRight) || 0, bottom: parseFloat(e7.scrollMarginBottom) || 0, left: parseFloat(e7.scrollMarginLeft) || 0 };
  })(e6);
  let k2 = "start" === f2 || "nearest" === f2 ? x2 - T2 : "end" === f2 ? I2 + F : x2 + v2 / 2 - T2 + F, D2 = "center" === u2 ? R2 + E2 / 2 - V2 + B2 : "end" === u2 ? C2 + B2 : R2 - V2;
  const L2 = [];
  for (let t5 = 0; t5 < w2.length; t5++) {
    const e7 = w2[t5], { height: n4, width: l6, top: r5, right: i4, bottom: s5, left: d4 } = e7.getBoundingClientRect();
    if ("if-needed" === c3 && x2 >= 0 && R2 >= 0 && I2 <= H2 && C2 <= b2 && x2 >= r5 && I2 <= s5 && R2 >= d4 && C2 <= i4) return L2;
    const h5 = getComputedStyle(e7), a3 = parseInt(h5.borderLeftWidth, 10), g3 = parseInt(h5.borderTopWidth, 10), p3 = parseInt(h5.borderRightWidth, 10), W2 = parseInt(h5.borderBottomWidth, 10);
    let T3 = 0, B3 = 0;
    const F2 = "offsetWidth" in e7 ? e7.offsetWidth - e7.clientWidth - a3 - p3 : 0, V3 = "offsetHeight" in e7 ? e7.offsetHeight - e7.clientHeight - g3 - W2 : 0, S2 = "offsetWidth" in e7 ? 0 === e7.offsetWidth ? 0 : l6 / e7.offsetWidth : 0, X = "offsetHeight" in e7 ? 0 === e7.offsetHeight ? 0 : n4 / e7.offsetHeight : 0;
    if (m3 === e7) T3 = "start" === f2 ? k2 : "end" === f2 ? k2 - H2 : "nearest" === f2 ? o5(M2, M2 + H2, H2, g3, W2, M2 + k2, M2 + k2 + v2, v2) : k2 - H2 / 2, B3 = "start" === u2 ? D2 : "center" === u2 ? D2 - b2 / 2 : "end" === u2 ? D2 - b2 : o5(y2, y2 + b2, b2, a3, p3, y2 + D2, y2 + D2 + E2, E2), T3 = Math.max(0, T3 + M2), B3 = Math.max(0, B3 + y2);
    else {
      T3 = "start" === f2 ? k2 - r5 - g3 : "end" === f2 ? k2 - s5 + W2 + V3 : "nearest" === f2 ? o5(r5, s5, n4, g3, W2 + V3, k2, k2 + v2, v2) : k2 - (r5 + n4 / 2) + V3 / 2, B3 = "start" === u2 ? D2 - d4 - a3 : "center" === u2 ? D2 - (d4 + l6 / 2) + F2 / 2 : "end" === u2 ? D2 - i4 + p3 + F2 : o5(d4, i4, l6, a3, p3 + F2, D2, D2 + E2, E2);
      const { scrollLeft: t6, scrollTop: h6 } = e7;
      T3 = 0 === X ? 0 : Math.max(0, Math.min(h6 + T3 / X, e7.scrollHeight - n4 / X + V3)), B3 = 0 === S2 ? 0 : Math.max(0, Math.min(t6 + B3 / S2, e7.scrollWidth - l6 / S2 + F2)), k2 += h6 - T3, D2 += t6 - B3;
    }
    L2.push({ el: e7, top: T3, left: B3 });
  }
  return L2;
};

// src/utils/scroll.ts
function scrollIntoView(el, options) {
  const scrolls = r3(el, options);
  for (const { el: el2, top, left } of scrolls) {
    el2.scroll({ top, left, behavior: options.behavior });
  }
}
function scrollIntoCenter(el, options = {}) {
  scrollIntoView(el, {
    scrollMode: "if-needed",
    block: "center",
    inline: "center",
    ...options
  });
}

// src/components/ui/menu/menu-focus-controller.ts
var FOCUSABLE_ELEMENTS_SELECTOR = /* @__PURE__ */ [
  "a[href]",
  "[tabindex]",
  "input",
  "select",
  "button"
].map((selector) => `${selector}:not([aria-hidden='true'])`).join(",");
var VALID_KEYS = /* @__PURE__ */ new Set([
  "Escape",
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "PageUp",
  "End",
  "PageDown",
  "Enter",
  " "
]);
var MenuFocusController = class {
  #index = -1;
  #el = null;
  #elements = [];
  #delegate;
  get items() {
    return this.#elements;
  }
  constructor(delegate) {
    this.#delegate = delegate;
  }
  attachMenu(el) {
    listenEvent(el, "focus", this.#onFocus.bind(this));
    this.#el = el;
    onDispose(() => {
      this.#el = null;
    });
  }
  listen() {
    if (!this.#el) return;
    this.update();
    listenEvent(this.#el, "keyup", this.#onKeyUp.bind(this));
    listenEvent(this.#el, "keydown", this.#onKeyDown.bind(this));
    onDispose(() => {
      this.#index = -1;
      this.#elements = [];
    });
  }
  update() {
    this.#index = 0;
    this.#elements = this.#getFocusableElements();
  }
  scroll(index = this.#findActiveIndex()) {
    const element = this.#elements[index];
    if (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollIntoCenter(element, {
            behavior: "smooth",
            boundary: (el) => {
              return !el.hasAttribute("data-root");
            }
          });
        });
      });
    }
  }
  focusActive(scroll = true) {
    const index = this.#findActiveIndex();
    this.#focusAt(index >= 0 ? index : 0, scroll);
  }
  #focusAt(index, scroll = true) {
    this.#index = index;
    if (this.#elements[index]) {
      this.#elements[index].focus({ preventScroll: true });
      if (scroll) this.scroll(index);
    } else {
      this.#el?.focus({ preventScroll: true });
    }
  }
  #findActiveIndex() {
    return this.#elements.findIndex(
      (el) => document.activeElement === el || el.getAttribute("role") === "menuitemradio" && el.getAttribute("aria-checked") === "true"
    );
  }
  #onFocus() {
    if (this.#index >= 0) return;
    this.update();
    this.focusActive();
  }
  #validateKeyEvent(event2) {
    const el = event2.target;
    if (wasEnterKeyPressed(event2) && el instanceof Element) {
      const role = el.getAttribute("role");
      return !/a|input|select|button/.test(el.localName) && !role;
    }
    return VALID_KEYS.has(event2.key);
  }
  #onKeyUp(event2) {
    if (!this.#validateKeyEvent(event2)) return;
    event2.stopPropagation();
    event2.preventDefault();
  }
  #onKeyDown(event2) {
    if (!this.#validateKeyEvent(event2)) return;
    event2.stopPropagation();
    event2.preventDefault();
    switch (event2.key) {
      case "Escape":
        this.#delegate.closeMenu(event2);
        break;
      case "Tab":
        this.#focusAt(this.#nextIndex(event2.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this.#focusAt(this.#nextIndex(-1));
        break;
      case "ArrowDown":
        this.#focusAt(this.#nextIndex(1));
        break;
      case "Home":
      case "PageUp":
        this.#focusAt(0);
        break;
      case "End":
      case "PageDown":
        this.#focusAt(this.#elements.length - 1);
        break;
    }
  }
  #nextIndex(delta) {
    let index = this.#index;
    do {
      index = (index + delta + this.#elements.length) % this.#elements.length;
    } while (this.#elements[index]?.offsetParent === null);
    return index;
  }
  #getFocusableElements() {
    if (!this.#el) return [];
    const focusableElements = this.#el.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => {
      return node.getAttribute("role") === "menu";
    };
    for (const el of focusableElements) {
      if (isHTMLElement2(el) && el.offsetParent !== null && // does not have display: none
      isElementParent(this.#el, el, is)) {
        elements.push(el);
      }
    }
    return elements;
  }
};

// src/components/ui/menu/menu.ts
var idCount = 0;
var Menu2 = class extends Component {
  static props = {
    showDelay: 0
  };
  #media;
  #menuId;
  #menuButtonId;
  #expanded = signal(false);
  #disabled = signal(false);
  #trigger = signal(null);
  #content = signal(null);
  #parentMenu;
  #submenus = /* @__PURE__ */ new Set();
  #menuObserver = null;
  #popper;
  #focus;
  #isSliderActive = false;
  #isTriggerDisabled = signal(false);
  #transitionCallbacks = /* @__PURE__ */ new Set();
  /**
   * The menu trigger element.
   */
  // @prop
  get triggerElement() {
    return this.#trigger();
  }
  /**
   * The menu items element.
   */
  // @prop
  get contentElement() {
    return this.#content();
  }
  /**
   * Whether this menu is the child of another menu that contains it.
   */
  // @prop
  get isSubmenu() {
    return !!this.#parentMenu;
  }
  constructor() {
    super();
    const { showDelay } = this.$props;
    this.#popper = new Popper({
      trigger: this.#trigger,
      content: this.#content,
      showDelay,
      listen: (trigger, show, hide2) => {
        onPress(trigger, (event2) => {
          if (this.#expanded()) hide2(event2);
          else show(event2);
        });
        const closeTarget = this.#getCloseTarget();
        if (closeTarget) {
          onPress(closeTarget, (event2) => {
            event2.stopPropagation();
            hide2(event2);
          });
        }
      },
      onChange: this.#onExpandedChange.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    const currentIdCount = ++idCount;
    this.#menuId = `media-menu-${currentIdCount}`;
    this.#menuButtonId = `media-menu-button-${currentIdCount}`;
    this.#focus = new MenuFocusController({
      closeMenu: this.close.bind(this)
    });
    if (hasProvidedContext(menuContext)) {
      this.#parentMenu = useContext(menuContext);
    }
    this.#observeSliders();
    this.setAttributes({
      "data-open": this.#expanded,
      "data-root": !this.isSubmenu,
      "data-submenu": this.isSubmenu,
      "data-disabled": this.#isDisabled.bind(this)
    });
    provideContext(menuContext, {
      button: this.#trigger,
      content: this.#content,
      expanded: this.#expanded,
      hint: signal(""),
      submenu: !!this.#parentMenu,
      disable: this.#disable.bind(this),
      attachMenuButton: this.#attachMenuButton.bind(this),
      attachMenuItems: this.#attachMenuItems.bind(this),
      attachObserver: this.#attachObserver.bind(this),
      disableMenuButton: this.#disableMenuButton.bind(this),
      addSubmenu: this.#addSubmenu.bind(this),
      onTransitionEvent: (callback) => {
        this.#transitionCallbacks.add(callback);
        onDispose(() => {
          this.#transitionCallbacks.delete(callback);
        });
      }
    });
  }
  onAttach(el) {
    el.style.setProperty("display", "contents");
  }
  onConnect(el) {
    effect(this.#watchExpanded.bind(this));
    if (this.isSubmenu) {
      this.#parentMenu?.addSubmenu(this);
    }
  }
  onDestroy() {
    this.#trigger.set(null);
    this.#content.set(null);
    this.#menuObserver = null;
    this.#transitionCallbacks.clear();
  }
  #observeSliders() {
    let sliderActiveTimer = -1, parentSliderObserver = hasProvidedContext(sliderObserverContext) ? useContext(sliderObserverContext) : null;
    provideContext(sliderObserverContext, {
      onDragStart: () => {
        parentSliderObserver?.onDragStart?.();
        window.clearTimeout(sliderActiveTimer);
        sliderActiveTimer = -1;
        this.#isSliderActive = true;
      },
      onDragEnd: () => {
        parentSliderObserver?.onDragEnd?.();
        sliderActiveTimer = window.setTimeout(() => {
          this.#isSliderActive = false;
          sliderActiveTimer = -1;
        }, 300);
      }
    });
  }
  #watchExpanded() {
    const expanded = this.#isExpanded();
    if (!this.isSubmenu) this.#onResize();
    this.#updateMenuItemsHidden(expanded);
    if (!expanded) return;
    effect(() => {
      const { height } = this.#media.$state, content = this.#content();
      content && setStyle(content, "--player-height", height() + "px");
    });
    this.#focus.listen();
    this.listen("pointerup", this.#onPointerUp.bind(this));
    listenEvent(window, "pointerup", this.#onWindowPointerUp.bind(this));
  }
  #attachMenuButton(button) {
    const el = button.el, isMenuItem = this.isSubmenu, isARIADisabled = $ariaBool(this.#isDisabled.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this.#menuButtonId);
    setAttribute(el, "aria-haspopup", "menu");
    setAttribute(el, "aria-expanded", "false");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    const watchAttrs = () => {
      setAttribute(el, "data-open", this.#expanded());
      setAttribute(el, "aria-disabled", isARIADisabled());
    };
    if (false) watchAttrs();
    else effect(watchAttrs);
    this.#trigger.set(el);
    onDispose(() => {
      this.#trigger.set(null);
    });
  }
  #attachMenuItems(items) {
    const el = items.el;
    el.style.setProperty("display", "none");
    setAttribute(el, "id", this.#menuId);
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "data-root", !this.isSubmenu);
    setAttribute(el, "data-submenu", this.isSubmenu);
    this.#content.set(el);
    onDispose(() => this.#content.set(null));
    const watchAttrs = () => setAttribute(el, "data-open", this.#expanded());
    if (false) watchAttrs();
    else effect(watchAttrs);
    this.#focus.attachMenu(el);
    this.#updateMenuItemsHidden(false);
    const onTransition = this.#onResizeTransition.bind(this);
    if (!this.isSubmenu) {
      items.listen("transitionstart", onTransition);
      items.listen("transitionend", onTransition);
      items.listen("animationend", this.#onResize);
      items.listen("vds-menu-resize", this.#onResize);
    } else {
      this.#parentMenu?.onTransitionEvent(onTransition);
    }
  }
  #attachObserver(observer) {
    this.#menuObserver = observer;
  }
  #updateMenuItemsHidden(expanded) {
    const content = peek(this.#content);
    if (content) setAttribute(content, "aria-hidden", ariaBool(!expanded));
  }
  #disableMenuButton(disabled) {
    this.#isTriggerDisabled.set(disabled);
  }
  #wasKeyboardExpand = false;
  #onExpandedChange(isExpanded, event2) {
    this.#wasKeyboardExpand = isKeyboardEvent(event2);
    event2?.stopPropagation();
    if (this.#expanded() === isExpanded) return;
    if (this.#isDisabled()) {
      if (isExpanded) this.#popper.hide(event2);
      return;
    }
    this.el?.dispatchEvent(
      new Event("vds-menu-resize", {
        bubbles: true,
        composed: true
      })
    );
    const trigger = this.#trigger(), content = this.#content();
    if (trigger) {
      setAttribute(trigger, "aria-controls", isExpanded && this.#menuId);
      setAttribute(trigger, "aria-expanded", ariaBool(isExpanded));
    }
    if (content) setAttribute(content, "aria-labelledby", isExpanded && this.#menuButtonId);
    this.#expanded.set(isExpanded);
    this.#toggleMediaControls(event2);
    tick();
    if (this.#wasKeyboardExpand) {
      if (isExpanded) content?.focus();
      else trigger?.focus();
      for (const el of [this.el, content]) {
        el && el.setAttribute("data-keyboard", "");
      }
    } else {
      for (const el of [this.el, content]) {
        el && el.removeAttribute("data-keyboard");
      }
    }
    this.dispatch(isExpanded ? "open" : "close", { trigger: event2 });
    if (isExpanded) {
      if (!this.isSubmenu && this.#media.activeMenu !== this) {
        this.#media.activeMenu?.close(event2);
        this.#media.activeMenu = this;
      }
      this.#menuObserver?.onOpen?.(event2);
    } else {
      if (this.isSubmenu) {
        for (const el of this.#submenus) el.close(event2);
      } else {
        this.#media.activeMenu = null;
      }
      this.#menuObserver?.onClose?.(event2);
    }
    if (isExpanded) {
      requestAnimationFrame(this.#updateFocus.bind(this));
    }
  }
  #updateFocus() {
    if (this.#isTransitionActive || this.#isSubmenuOpen) return;
    this.#focus.update();
    requestAnimationFrame(() => {
      if (this.#wasKeyboardExpand) {
        this.#focus.focusActive();
      } else {
        this.#focus.scroll();
      }
    });
  }
  #isExpanded() {
    return !this.#isDisabled() && this.#expanded();
  }
  #isDisabled() {
    return this.#disabled() || this.#isTriggerDisabled();
  }
  #disable(disabled) {
    this.#disabled.set(disabled);
  }
  #onPointerUp(event2) {
    const content = this.#content();
    if (this.#isSliderActive || content && isEventInside(content, event2)) {
      return;
    }
    event2.stopPropagation();
  }
  #onWindowPointerUp(event2) {
    const content = this.#content();
    if (this.#isSliderActive || content && isEventInside(content, event2)) {
      return;
    }
    this.close(event2);
  }
  #getCloseTarget() {
    const target = this.el?.querySelector('[data-part="close-target"]');
    return this.el && target && isElementParent(this.el, target, (node) => node.getAttribute("role") === "menu") ? target : null;
  }
  #toggleMediaControls(trigger) {
    if (this.isSubmenu) return;
    if (this.#expanded()) this.#media.remote.pauseControls(trigger);
    else this.#media.remote.resumeControls(trigger);
  }
  #addSubmenu(menu) {
    this.#submenus.add(menu);
    listenEvent(menu, "open", this.#onSubmenuOpenBind);
    listenEvent(menu, "close", this.#onSubmenuCloseBind);
    onDispose(this.#removeSubmenuBind);
  }
  #removeSubmenuBind = this.#removeSubmenu.bind(this);
  #removeSubmenu(menu) {
    this.#submenus.delete(menu);
  }
  #isSubmenuOpen = false;
  #onSubmenuOpenBind = this.#onSubmenuOpen.bind(this);
  #onSubmenuOpen(event2) {
    this.#isSubmenuOpen = true;
    const content = this.#content();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "true");
    }
    for (const target of this.#submenus) {
      if (target !== event2.target) {
        for (const el of [target.el, target.triggerElement]) {
          el?.setAttribute("aria-hidden", "true");
        }
      }
    }
    if (content) {
      const el = event2.target.el;
      for (const child of content.children) {
        if (child.contains(el)) {
          child.setAttribute("data-open", "");
        } else if (child !== el) {
          child.setAttribute("data-hidden", "");
        }
      }
    }
  }
  #onSubmenuCloseBind = this.#onSubmenuClose.bind(this);
  #onSubmenuClose(event2) {
    this.#isSubmenuOpen = false;
    const content = this.#content();
    if (this.isSubmenu) {
      this.triggerElement?.setAttribute("aria-hidden", "false");
    }
    for (const target of this.#submenus) {
      for (const el of [target.el, target.triggerElement]) {
        el?.setAttribute("aria-hidden", "false");
      }
    }
    if (content) {
      for (const child of content.children) {
        child.removeAttribute("data-open");
        child.removeAttribute("data-hidden");
      }
    }
  }
  #onResize = animationFrameThrottle(() => {
    const content = peek(this.#content);
    if (!content || false) return;
    let height = 0, styles = getComputedStyle(content), children = [...content.children];
    for (const prop8 of ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"]) {
      height += parseFloat(styles[prop8]) || 0;
    }
    for (const child of children) {
      if (isHTMLElement2(child) && child.style.display === "contents") {
        children.push(...child.children);
      } else if (child.nodeType === 3) {
        height += parseFloat(getComputedStyle(child).fontSize);
      } else if (isHTMLElement2(child)) {
        if (!isElementVisible(child)) continue;
        const style = getComputedStyle(child);
        height += child.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
      }
    }
    setStyle(content, "--menu-height", height + "px");
  });
  #isTransitionActive = false;
  #onResizeTransition(event2) {
    const content = this.#content();
    if (content && event2.propertyName === "height") {
      this.#isTransitionActive = event2.type === "transitionstart";
      setAttribute(content, "data-transition", this.#isTransitionActive ? "height" : null);
      if (this.#expanded()) this.#updateFocus();
    }
    for (const callback of this.#transitionCallbacks) callback(event2);
  }
  /**
   * Open this menu. The first menu item will be focused if a `KeyboardEvent` trigger is provided
   */
  // @method
  open(trigger) {
    if (peek(this.#expanded)) return;
    this.#popper.show(trigger);
    tick();
  }
  /**
   * Close this menu. The menu button that controls this menu will be focused if a `KeyboardEvent`
   * trigger is provided
   */
  // @method
  close(trigger) {
    if (!peek(this.#expanded)) return;
    this.#popper.hide(trigger);
    tick();
  }
};

// src/elements/define/menus/menu-element.ts
var MediaMenuElement = class extends Host(HTMLElement, Menu2) {
  static tagName = "media-menu";
};

// src/components/ui/menu/menu-item.ts
var MenuItem = class extends MenuButton2 {
};

// src/elements/define/menus/menu-item-element.ts
var MediaMenuItemElement = class extends Host(HTMLElement, MenuItem) {
  static tagName = "media-menu-item";
};

// src/components/ui/menu/menu-items.ts
init_prod();
init_dom();

// src/components/ui/menu/menu-portal.ts
init_prod();
var menuPortalContext = createContext();

// src/components/ui/menu/menu-items.ts
var MenuItems = class extends Component {
  static props = {
    placement: null,
    offset: 0,
    alignOffset: 0
  };
  #menu;
  constructor() {
    super();
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      "data-placement": placement
    });
  }
  onAttach(el) {
    this.#menu = useContext(menuContext);
    this.#menu.attachMenuItems(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal.attach(el);
        onDispose(() => portal.attach(null));
      }
    }
  }
  onConnect(el) {
    effect(this.#watchPlacement.bind(this));
  }
  #watchPlacement() {
    if (!this.el) return;
    const placement = this.$props.placement();
    if (placement) {
      Object.assign(this.el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content"
      });
      const { offset: mainOffset, alignOffset } = this.$props;
      return autoPlacement2(this.el, this.#getButton(), placement, {
        offsetVarName: "media-menu",
        xOffset: alignOffset(),
        yOffset: mainOffset()
      });
    } else {
      this.el.removeAttribute("style");
      this.el.style.display = "none";
    }
  }
  #getButton() {
    return this.#menu.button();
  }
};

// src/elements/define/menus/menu-items-element.ts
var MediaMenuItemsElement = class extends Host(HTMLElement, MenuItems) {
  static tagName = "media-menu-items";
};

// src/elements/define/menus/quality-radio-group-element.ts
init_prod();

// src/components/ui/menu/radio-groups/quality-radio-group.ts
init_prod();

// src/core/quality/utils.ts
function sortVideoQualities(qualities, desc) {
  return [...qualities].sort(desc ? compareVideoQualityDesc : compareVideoQualityAsc);
}
function compareVideoQualityAsc(a2, b2) {
  return a2.height === b2.height ? (a2.bitrate ?? 0) - (b2.bitrate ?? 0) : a2.height - b2.height;
}
function compareVideoQualityDesc(a2, b2) {
  return b2.height === a2.height ? (b2.bitrate ?? 0) - (a2.bitrate ?? 0) : b2.height - a2.height;
}

// src/components/ui/menu/radio-groups/quality-radio-group.ts
init_number();
var QualityRadioGroup2 = class extends Component {
  static props = {
    autoLabel: "Auto",
    hideBitrate: false,
    sort: "descending"
  };
  #media;
  #menu;
  #controller;
  // @prop
  get value() {
    return this.#controller.value;
  }
  // @prop
  get disabled() {
    const { canSetQuality, qualities } = this.#media.$state;
    return !canSetQuality() || qualities().length <= 1;
  }
  #sortedQualities = computed(() => {
    const { sort } = this.$props, { qualities } = this.#media.$state;
    return sortVideoQualities(qualities(), sort() === "descending");
  });
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    this.#media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.#menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.#watchValue.bind(this));
    effect(this.#watchControllerDisabled.bind(this));
    effect(this.#watchHintText.bind(this));
  }
  // @method
  getOptions() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", label: autoLabel },
      ...this.#sortedQualities().map((quality) => {
        const bitrate = quality.bitrate && quality.bitrate >= 0 ? `${round2(quality.bitrate / 1e6, 2)} Mbps` : null;
        return {
          quality,
          label: quality.height + "p",
          value: this.#getQualityId(quality),
          bitrate: () => !hideBitrate() ? bitrate : null
        };
      })
    ];
  }
  #watchValue() {
    this.#controller.value = this.#getValue();
  }
  #watchHintText() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this.#media.$state, qualityText = quality() ? quality().height + "p" : "";
    this.#menu?.hint.set(
      !autoQuality() ? qualityText : autoLabel() + (qualityText ? ` (${qualityText})` : "")
    );
  }
  #watchControllerDisabled() {
    this.#menu?.disable(this.disabled);
  }
  #onValueChange(value, trigger) {
    if (this.disabled) return;
    if (value === "auto") {
      this.#media.remote.changeQuality(-1, trigger);
      this.dispatch("change", { detail: "auto", trigger });
      return;
    }
    const { qualities } = this.#media.$state, index = peek(qualities).findIndex((quality) => this.#getQualityId(quality) === value);
    if (index >= 0) {
      const quality = peek(qualities)[index];
      this.#media.remote.changeQuality(index, trigger);
      this.dispatch("change", { detail: quality, trigger });
    }
  }
  #getValue() {
    const { quality, autoQuality } = this.#media.$state;
    if (autoQuality()) return "auto";
    const currentQuality = quality();
    return currentQuality ? this.#getQualityId(currentQuality) : "auto";
  }
  #getQualityId(quality) {
    return quality.height + "_" + quality.bitrate;
  }
};

// src/elements/define/menus/quality-radio-group-element.ts
var MediaQualityRadioGroupElement = class extends Host(HTMLElement, QualityRadioGroup2) {
  static tagName = "media-quality-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this, (el, option) => {
      const bitrate = option.bitrate, bitrateEl = el.querySelector('[data-part="bitrate"]');
      if (bitrate && bitrateEl) {
        effect(() => {
          bitrateEl.textContent = bitrate() || "";
        });
      }
    });
  }
};

// src/components/ui/menu/radio-groups/speed-radio-group.ts
init_prod();
var DEFAULT_PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
var SpeedRadioGroup2 = class extends Component {
  static props = {
    normalLabel: "Normal",
    rates: DEFAULT_PLAYBACK_RATES
  };
  #media;
  #menu;
  #controller;
  // @prop
  get value() {
    return this.#controller.value;
  }
  // @prop
  get disabled() {
    const { rates } = this.$props, { canSetPlaybackRate } = this.#media.$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  constructor() {
    super();
    this.#controller = new RadioGroupController();
    this.#controller.onValueChange = this.#onValueChange.bind(this);
  }
  onSetup() {
    this.#media = useMediaContext();
    if (hasProvidedContext(menuContext)) {
      this.#menu = useContext(menuContext);
    }
  }
  onConnect(el) {
    effect(this.#watchValue.bind(this));
    effect(this.#watchHintText.bind(this));
    effect(this.#watchControllerDisabled.bind(this));
  }
  // @method
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + "\xD7",
      value: rate.toString()
    }));
  }
  #watchValue() {
    this.#controller.value = this.#getValue();
  }
  #watchHintText() {
    const { normalLabel } = this.$props, { playbackRate } = this.#media.$state, rate = playbackRate();
    this.#menu?.hint.set(rate === 1 ? normalLabel() : rate + "\xD7");
  }
  #watchControllerDisabled() {
    this.#menu?.disable(this.disabled);
  }
  #getValue() {
    const { playbackRate } = this.#media.$state;
    return playbackRate().toString();
  }
  #onValueChange(value, trigger) {
    if (this.disabled) return;
    const rate = +value;
    this.#media.remote.changePlaybackRate(rate, trigger);
    this.dispatch("change", { detail: rate, trigger });
  }
};

// src/elements/define/menus/speed-radio-group-element.ts
var MediaSpeedRadioGroupElement = class extends Host(HTMLElement, SpeedRadioGroup2) {
  static tagName = "media-speed-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/elements/define/poster-element.ts
init_prod();
init_std();

// src/components/ui/poster.ts
init_prod();
init_std();
init_network();
var Poster2 = class extends Component {
  static props = {
    src: null,
    alt: null,
    crossOrigin: null
  };
  static state = new State({
    img: null,
    src: null,
    alt: null,
    crossOrigin: null,
    loading: true,
    error: null,
    hidden: false
  });
  #media;
  onSetup() {
    this.#media = useMediaContext();
    this.#watchSrc();
    this.#watchAlt();
    this.#watchCrossOrigin();
    this.#watchHidden();
  }
  onAttach(el) {
    el.style.setProperty("pointer-events", "none");
    effect(this.#watchImg.bind(this));
    effect(this.#watchSrc.bind(this));
    effect(this.#watchAlt.bind(this));
    effect(this.#watchCrossOrigin.bind(this));
    effect(this.#watchHidden.bind(this));
    const { started } = this.#media.$state;
    this.setAttributes({
      "data-visible": () => !started() && !this.$state.hidden(),
      "data-loading": this.#isLoading.bind(this),
      "data-error": this.#hasError.bind(this),
      "data-hidden": this.$state.hidden
    });
  }
  onConnect(el) {
    effect(this.#onPreconnect.bind(this));
    effect(this.#onLoadStart.bind(this));
  }
  #hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  #onPreconnect() {
    const { canLoadPoster, poster } = this.#media.$state;
    if (!canLoadPoster() && poster()) preconnect(poster(), "preconnect");
  }
  #watchHidden() {
    const { src } = this.$props, { poster, nativeControls } = this.#media.$state;
    this.el && setAttribute(this.el, "display", nativeControls() ? "none" : null);
    this.$state.hidden.set(this.#hasError() || !(src() || poster()) || nativeControls());
  }
  #isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  #watchImg() {
    const img = this.$state.img();
    if (!img) return;
    listenEvent(img, "load", this.#onLoad.bind(this));
    listenEvent(img, "error", this.#onError.bind(this));
    if (img.complete) this.#onLoad();
  }
  #prevSrc = "";
  #watchSrc() {
    const { poster: defaultPoster } = this.#media.$props, { canLoadPoster, providedPoster, inferredPoster } = this.#media.$state;
    const src = this.$props.src() || "", poster = src || defaultPoster() || inferredPoster();
    if (this.#prevSrc === providedPoster()) {
      providedPoster.set(src);
    }
    this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
    this.#prevSrc = src;
  }
  #watchAlt() {
    const { src } = this.$props, { alt } = this.$state, { poster } = this.#media.$state;
    alt.set(src() || poster() ? this.$props.alt() : null);
  }
  #watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin, poster: src } = this.#media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(
      /ytimg\.com|vimeo/.test(src() || "") ? null : crossOrigin === true ? "anonymous" : crossOrigin
    );
  }
  #onLoadStart() {
    const { loading, error } = this.$state, { canLoadPoster, poster } = this.#media.$state;
    loading.set(canLoadPoster() && !!poster());
    error.set(null);
  }
  #onLoad() {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(null);
  }
  #onError(event2) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event2);
  }
};

// src/elements/define/poster-element.ts
var MediaPosterElement = class extends Host(HTMLElement, Poster2) {
  static tagName = "media-poster";
  static attrs = {
    crossOrigin: "crossorigin"
  };
  #img = document.createElement("img");
  onSetup() {
    this.$state.img.set(this.#img);
  }
  onConnect() {
    const { src, alt, crossOrigin } = this.$state;
    effect(() => {
      const { loading, hidden } = this.$state;
      this.#img.style.display = loading() || hidden() ? "none" : "";
    });
    effect(() => {
      setAttribute(this.#img, "alt", alt());
      setAttribute(this.#img, "crossorigin", crossOrigin());
      setAttribute(this.#img, "src", src());
    });
    if (this.#img.parentNode !== this) {
      this.prepend(this.#img);
    }
  }
};

// src/components/ui/sliders/slider-preview.ts
init_prod();
init_std();

// src/components/ui/sliders/slider/slider.ts
init_prod();
init_number();

// src/components/ui/sliders/slider/api/state.ts
init_prod();
var sliderState = new State({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  pointerValue: 0,
  focused: false,
  dragging: false,
  pointing: false,
  hidden: false,
  get active() {
    return this.dragging || this.focused || this.pointing;
  },
  get fillRate() {
    return calcRate(this.min, this.max, this.value);
  },
  get fillPercent() {
    return this.fillRate * 100;
  },
  get pointerRate() {
    return calcRate(this.min, this.max, this.pointerValue);
  },
  get pointerPercent() {
    return this.pointerRate * 100;
  }
});
function calcRate(min2, max2, value) {
  const range = max2 - min2, offset2 = value - min2;
  return range > 0 ? offset2 / range : 0;
}

// src/components/ui/sliders/slider/slider-controller.ts
init_prod();
init_std();

// src/foundation/observers/intersection-observer.ts
init_prod();
var IntersectionObserverController = class extends ViewController {
  #init;
  #observer;
  constructor(init2) {
    super();
    this.#init = init2;
  }
  onConnect(el) {
    this.#observer = new IntersectionObserver((entries) => {
      this.#init.callback?.(entries, this.#observer);
    }, this.#init);
    this.#observer.observe(el);
    onDispose(this.#onDisconnect.bind(this));
  }
  /**
   * Disconnect any active intersection observers.
   */
  #onDisconnect() {
    this.#observer?.disconnect();
    this.#observer = void 0;
  }
};

// src/components/ui/sliders/slider/slider-controller.ts
init_dom();
init_number();

// src/components/ui/sliders/slider/events-controller.ts
init_prod();
init_std();
init_dom();

// src/components/ui/sliders/slider/utils.ts
init_number();
function getClampedValue(min2, max2, value, step) {
  return clampNumber(min2, round2(value, getNumberOfDecimalPlaces(step)), max2);
}
function getValueFromRate(min2, max2, rate, step) {
  const boundRate = clampNumber(0, rate, 1), range = max2 - min2, fill = range * boundRate, stepRatio = fill / step, steps = step * Math.round(stepRatio);
  return min2 + steps;
}

// src/components/ui/sliders/slider/events-controller.ts
var SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1
};
var SliderEventsController = class extends ViewController {
  #delegate;
  #media;
  #observer;
  constructor(delegate, media) {
    super();
    this.#delegate = delegate;
    this.#media = media;
  }
  onSetup() {
    if (hasProvidedContext(sliderObserverContext)) {
      this.#observer = useContext(sliderObserverContext);
    }
  }
  onConnect() {
    effect(this.#attachEventListeners.bind(this));
    effect(this.#attachPointerListeners.bind(this));
    if (this.#delegate.swipeGesture) effect(this.#watchSwipeGesture.bind(this));
  }
  #watchSwipeGesture() {
    const { pointer } = this.#media.$state;
    if (pointer() !== "coarse" || !this.#delegate.swipeGesture()) {
      this.#provider = null;
      return;
    }
    this.#provider = this.#media.player.el?.querySelector(
      "media-provider,[data-media-provider]"
    );
    if (!this.#provider) return;
    listenEvent(this.#provider, "touchstart", this.#onTouchStart.bind(this), {
      passive: true
    });
    listenEvent(this.#provider, "touchmove", this.#onTouchMove.bind(this), {
      passive: false
    });
  }
  #provider = null;
  #touch = null;
  #touchStartValue = null;
  #onTouchStart(event2) {
    this.#touch = event2.touches[0];
  }
  #onTouchMove(event2) {
    if (isNull(this.#touch) || isTouchPinchEvent(event2)) return;
    const touch = event2.touches[0], xDiff = touch.clientX - this.#touch.clientX, yDiff = touch.clientY - this.#touch.clientY, isDragging = this.$state.dragging();
    if (!isDragging && Math.abs(yDiff) > 5) {
      return;
    }
    if (isDragging) return;
    event2.preventDefault();
    if (Math.abs(xDiff) > 20) {
      this.#touch = touch;
      this.#touchStartValue = this.$state.value();
      this.#onStartDragging(this.#touchStartValue, event2);
    }
  }
  #attachEventListeners() {
    const { hidden } = this.$props;
    this.listen("focus", this.#onFocus.bind(this));
    this.listen("keydown", this.#onKeyDown.bind(this));
    this.listen("keyup", this.#onKeyUp.bind(this));
    if (hidden() || this.#delegate.isDisabled()) return;
    this.listen("pointerenter", this.#onPointerEnter.bind(this));
    this.listen("pointermove", this.#onPointerMove.bind(this));
    this.listen("pointerleave", this.#onPointerLeave.bind(this));
    this.listen("pointerdown", this.#onPointerDown.bind(this));
  }
  #attachPointerListeners() {
    if (this.#delegate.isDisabled() || !this.$state.dragging()) return;
    listenEvent(document, "pointerup", this.#onDocumentPointerUp.bind(this), { capture: true });
    listenEvent(document, "pointermove", this.#onDocumentPointerMove.bind(this));
    listenEvent(document, "touchmove", this.#onDocumentTouchMove.bind(this), {
      passive: false
    });
  }
  #onFocus() {
    this.#updatePointerValue(this.$state.value());
  }
  #updateValue(newValue, trigger) {
    const { value, min: min2, max: max2, dragging } = this.$state;
    const clampedValue = Math.max(min2(), Math.min(newValue, max2()));
    value.set(clampedValue);
    const event2 = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.dispatch(event2);
    this.#delegate.onValueChange?.(event2);
    if (dragging()) {
      const event3 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.dispatch(event3);
      this.#delegate.onDragValueChange?.(event3);
    }
  }
  #updatePointerValue(value, trigger) {
    const { pointerValue, dragging } = this.$state;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      this.#updateValue(value, trigger);
    }
  }
  #getPointerValue(event2) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min: min2, max: max2 } = this.$state;
    if (this.$props.orientation() === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event2.clientY) / trackHeight;
    } else {
      if (this.#touch && isNumber(this.#touchStartValue)) {
        const { width } = this.#provider.getBoundingClientRect(), rate = (event2.clientX - this.#touch.clientX) / width, range = max2() - min2(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this.#touchStartValue - diff : this.#touchStartValue + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event2.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min2(),
      Math.min(
        max2(),
        this.#delegate.roundValue(
          getValueFromRate(min2(), max2(), thumbPositionRate, this.#delegate.getStep())
        )
      )
    );
  }
  #onPointerEnter(event2) {
    this.$state.pointing.set(true);
  }
  #onPointerMove(event2) {
    const { dragging } = this.$state;
    if (dragging()) return;
    this.#updatePointerValue(this.#getPointerValue(event2), event2);
  }
  #onPointerLeave(event2) {
    this.$state.pointing.set(false);
  }
  #onPointerDown(event2) {
    if (event2.button !== 0) return;
    const value = this.#getPointerValue(event2);
    this.#onStartDragging(value, event2);
    this.#updatePointerValue(value, event2);
  }
  #onStartDragging(value, trigger) {
    const { dragging } = this.$state;
    if (dragging()) return;
    dragging.set(true);
    this.#media.remote.pauseControls(trigger);
    const event2 = this.createEvent("drag-start", { detail: value, trigger });
    this.dispatch(event2);
    this.#delegate.onDragStart?.(event2);
    this.#observer?.onDragStart?.();
  }
  #onStopDragging(value, trigger) {
    const { dragging } = this.$state;
    if (!dragging()) return;
    dragging.set(false);
    this.#media.remote.resumeControls(trigger);
    const event2 = this.createEvent("drag-end", { detail: value, trigger });
    this.dispatch(event2);
    this.#delegate.onDragEnd?.(event2);
    this.#touch = null;
    this.#touchStartValue = null;
    this.#observer?.onDragEnd?.();
  }
  // -------------------------------------------------------------------------------------------
  // Keyboard Events
  // -------------------------------------------------------------------------------------------
  #lastDownKey;
  #repeatedKeys = false;
  #onKeyDown(event2) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event2.key);
    if (!isValidKey) return;
    const { key: key2 } = event2, jumpValue = this.#calcJumpValue(event2);
    if (!isNull(jumpValue)) {
      this.#updatePointerValue(jumpValue, event2);
      this.#updateValue(jumpValue, event2);
      return;
    }
    const newValue = this.#calcNewKeyValue(event2);
    if (!this.#repeatedKeys) {
      this.#repeatedKeys = key2 === this.#lastDownKey;
      if (!this.$state.dragging() && this.#repeatedKeys) {
        this.#onStartDragging(newValue, event2);
      }
    }
    this.#updatePointerValue(newValue, event2);
    this.#lastDownKey = key2;
  }
  #onKeyUp(event2) {
    const isValidKey = Object.keys(SliderKeyDirection).includes(event2.key);
    if (!isValidKey || !isNull(this.#calcJumpValue(event2))) return;
    const newValue = this.#repeatedKeys ? this.$state.pointerValue() : this.#calcNewKeyValue(event2);
    this.#updateValue(newValue, event2);
    this.#onStopDragging(newValue, event2);
    this.#lastDownKey = "";
    this.#repeatedKeys = false;
  }
  #calcJumpValue(event2) {
    let key2 = event2.key, { min: min2, max: max2 } = this.$state;
    if (key2 === "Home" || key2 === "PageUp") {
      return min2();
    } else if (key2 === "End" || key2 === "PageDown") {
      return max2();
    } else if (!event2.metaKey && /^[0-9]$/.test(key2)) {
      return (max2() - min2()) / 10 * Number(key2);
    }
    return null;
  }
  #calcNewKeyValue(event2) {
    const { key: key2, shiftKey } = event2;
    event2.preventDefault();
    event2.stopPropagation();
    const { shiftKeyMultiplier } = this.$props;
    const { min: min2, max: max2, value, pointerValue } = this.$state, step = this.#delegate.getStep(), keyStep = this.#delegate.getKeyStep();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key2]), diff = modifiedStep * direction, currentValue = this.#repeatedKeys ? pointerValue() : this.#delegate.getValue?.() ?? value(), steps = (currentValue + diff) / step;
    return Math.max(min2(), Math.min(max2(), Number((step * steps).toFixed(3))));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  #onDocumentPointerUp(event2) {
    if (event2.button !== 0) return;
    event2.preventDefault();
    event2.stopImmediatePropagation();
    const value = this.#getPointerValue(event2);
    this.#updatePointerValue(value, event2);
    this.#onStopDragging(value, event2);
  }
  #onDocumentTouchMove(event2) {
    event2.preventDefault();
  }
  #onDocumentPointerMove = functionThrottle(
    (event2) => {
      this.#updatePointerValue(this.#getPointerValue(event2), event2);
    },
    20,
    { leading: true }
  );
};

// src/components/ui/sliders/slider/format.ts
init_prod();
var sliderValueFormatContext = createContext(() => ({}));

// src/components/ui/sliders/slider/slider-controller.ts
var SliderController = class extends ViewController {
  static props = {
    hidden: false,
    disabled: false,
    step: 1,
    keyStep: 1,
    orientation: "horizontal",
    shiftKeyMultiplier: 5
  };
  #media;
  #delegate;
  #isVisible = signal(true);
  #isIntersecting = signal(true);
  constructor(delegate) {
    super();
    this.#delegate = delegate;
  }
  onSetup() {
    this.#media = useMediaContext();
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: "value"
      });
    }
    provideContext(sliderContext, {
      orientation: this.$props.orientation,
      disabled: this.#delegate.isDisabled,
      preview: signal(null)
    });
    effect(this.#watchValue.bind(this));
    effect(this.#watchStep.bind(this));
    effect(this.#watchDisabled.bind(this));
    this.#setupAttrs();
    new SliderEventsController(this.#delegate, this.#media).attach(this);
    new IntersectionObserverController({
      callback: this.#onIntersectionChange.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "autocomplete", "off");
    if (false) this.#watchCSSVars();
    else effect(this.#watchCSSVars.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.#isVisible.set));
    effect(this.#watchHidden.bind(this));
  }
  #onIntersectionChange(entries) {
    this.#isIntersecting.set(entries[0].isIntersecting);
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  #watchHidden() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.#isVisible() || !this.#isIntersecting.bind(this));
  }
  #watchValue() {
    const { dragging, value, min: min2, max: max2 } = this.$state;
    if (peek(dragging)) return;
    value.set(getClampedValue(min2(), max2(), value(), this.#delegate.getStep()));
  }
  #watchStep() {
    this.$state.step.set(this.#delegate.getStep());
  }
  #watchDisabled() {
    if (!this.#delegate.isDisabled()) return;
    const { dragging, pointing } = this.$state;
    dragging.set(false);
    pointing.set(false);
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  #getARIADisabled() {
    return ariaBool(this.#delegate.isDisabled());
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  #setupAttrs() {
    const { orientation } = this.$props, { dragging, active, pointing } = this.$state;
    this.setAttributes({
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-active": active,
      "aria-disabled": this.#getARIADisabled.bind(this),
      "aria-valuemin": this.#delegate.aria.valueMin ?? this.$state.min,
      "aria-valuemax": this.#delegate.aria.valueMax ?? this.$state.max,
      "aria-valuenow": this.#delegate.aria.valueNow,
      "aria-valuetext": this.#delegate.aria.valueText,
      "aria-orientation": orientation
    });
  }
  #watchCSSVars() {
    const { fillPercent, pointerPercent } = this.$state;
    this.#updateSliderVars(round2(fillPercent(), 3), round2(pointerPercent(), 3));
  }
  #updateSliderVars = animationFrameThrottle((fillPercent, pointerPercent) => {
    this.el?.style.setProperty("--slider-fill", fillPercent + "%");
    this.el?.style.setProperty("--slider-pointer", pointerPercent + "%");
  });
};

// src/components/ui/sliders/slider/slider.ts
var Slider = class extends Component {
  static props = {
    ...SliderController.props,
    min: 0,
    max: 100,
    value: 0
  };
  static state = sliderState;
  constructor() {
    super();
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.$props.disabled,
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      }
    });
  }
  onSetup() {
    effect(this.#watchValue.bind(this));
    effect(this.#watchMinMax.bind(this));
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  #getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  #getARIAValueText() {
    const { value, max: max2 } = this.$state;
    return round2(value() / max2() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  #watchValue() {
    const { value } = this.$props;
    this.$state.value.set(value());
  }
  #watchMinMax() {
    const { min: min2, max: max2 } = this.$props;
    this.$state.min.set(min2());
    this.$state.max.set(max2());
  }
};

// src/components/ui/sliders/slider-preview.ts
var SliderPreview = class extends Component {
  static props = {
    offset: 0,
    noClamp: false
  };
  #slider;
  onSetup() {
    this.#slider = useContext(sliderContext);
    const { active } = useState(Slider.state);
    this.setAttributes({
      "data-visible": active
    });
  }
  onAttach(el) {
    Object.assign(el.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "max-content"
    });
  }
  onConnect(el) {
    const { preview } = this.#slider;
    preview.set(el);
    onDispose(() => preview.set(null));
    effect(this.#updatePlacement.bind(this));
    const resize = new ResizeObserver(this.#updatePlacement.bind(this));
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
  #updatePlacement = animationFrameThrottle(() => {
    const { disabled, orientation } = this.#slider;
    if (disabled()) return;
    const el = this.el, { offset: offset2, noClamp } = this.$props;
    if (!el) return;
    updateSliderPreviewPlacement(el, {
      clamp: !noClamp(),
      offset: offset2(),
      orientation: orientation()
    });
  });
};
function updateSliderPreviewPlacement(el, {
  clamp: clamp2,
  offset: offset2,
  orientation
}) {
  const computedStyle = getComputedStyle(el), width = parseFloat(computedStyle.width), height = parseFloat(computedStyle.height), styles = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  styles[orientation === "horizontal" ? "bottom" : "left"] = `calc(100% + var(--media-slider-preview-offset, ${offset2}px))`;
  if (orientation === "horizontal") {
    const widthHalf = width / 2;
    if (!clamp2) {
      styles.left = `calc(var(--slider-pointer) - ${widthHalf}px)`;
    } else {
      const leftClamp = `max(0px, calc(var(--slider-pointer) - ${widthHalf}px))`, rightClamp = `calc(100% - ${width}px)`;
      styles.left = `min(${leftClamp}, ${rightClamp})`;
    }
  } else {
    const heightHalf = height / 2;
    if (!clamp2) {
      styles.bottom = `calc(var(--slider-pointer) - ${heightHalf}px)`;
    } else {
      const topClamp = `max(${heightHalf}px, calc(var(--slider-pointer) - ${heightHalf}px))`, bottomClamp = `calc(100% - ${height}px)`;
      styles.bottom = `min(${topClamp}, ${bottomClamp})`;
    }
  }
  Object.assign(el.style, styles);
}

// src/elements/define/sliders/slider-preview-element.ts
var MediaSliderPreviewElement = class extends Host(HTMLElement, SliderPreview) {
  static tagName = "media-slider-preview";
};

// src/elements/define/sliders/slider-thumbnail-element.ts
init_prod();

// src/elements/define/thumbnail-element.ts
init_prod();
init_std();

// src/components/ui/thumbnails/thumbnail.ts
init_prod();
init_std();

// src/components/ui/thumbnails/thumbnail-loader.ts
init_prod();
init_std();
init_error();
init_network();
var cache = /* @__PURE__ */ new Map();
var pending = /* @__PURE__ */ new Map();
var warned2 = true ? /* @__PURE__ */ new Set() : void 0;
var ThumbnailsLoader = class _ThumbnailsLoader {
  #media;
  #src;
  #crossOrigin;
  $images = signal([]);
  static create(src, crossOrigin) {
    const media = useMediaContext();
    return new _ThumbnailsLoader(src, crossOrigin, media);
  }
  constructor(src, crossOrigin, media) {
    this.#src = src;
    this.#crossOrigin = crossOrigin;
    this.#media = media;
    effect(this.#onLoadCues.bind(this));
  }
  #onLoadCues() {
    const { canLoad } = this.#media.$state;
    if (!canLoad()) return;
    const src = this.#src();
    if (!src) return;
    if (isString(src) && cache.has(src)) {
      const cues = cache.get(src);
      cache.delete(src);
      cache.set(src, cues);
      if (cache.size > 99) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      this.$images.set(cache.get(src));
    } else if (isString(src)) {
      const crossOrigin = this.#crossOrigin(), currentKey = src + "::" + crossOrigin;
      if (!pending.has(currentKey)) {
        const promise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(src, {
              credentials: getRequestCredentials(crossOrigin)
            }), isJSON = response.headers.get("content-type") === "application/json";
            if (isJSON) {
              const json = await response.json();
              if (isArray(json)) {
                if (json[0] && "text" in json[0]) {
                  resolve(this.#processVTTCues(json));
                } else {
                  for (let i3 = 0; i3 < json.length; i3++) {
                    const image = json[i3];
                    assert(isObject(image), `Item not an object at index ${i3}`);
                    assert(
                      "url" in image && isString(image.url),
                      `Invalid or missing \`url\` property at index ${i3}`
                    );
                    assert(
                      "startTime" in image && isNumber(image.startTime),
                      `Invalid or missing \`startTime\` property at index ${i3}`
                    );
                  }
                  resolve(json);
                }
              } else {
                resolve(this.#processStoryboard(json));
              }
              return;
            }
            import("https://cdn.vidstack.io/captions").then(async ({ parseResponse }) => {
              try {
                const { cues } = await parseResponse(response);
                resolve(this.#processVTTCues(cues));
              } catch (e6) {
                reject(e6);
              }
            });
          } catch (e6) {
            reject(e6);
          }
        }).then((images) => {
          cache.set(currentKey, images);
          return images;
        }).catch((error) => {
          this.#onError(src, error);
        }).finally(() => {
          if (isString(currentKey)) pending.delete(currentKey);
        });
        pending.set(currentKey, promise);
      }
      pending.get(currentKey)?.then((images) => {
        this.$images.set(images || []);
      });
    } else if (isArray(src)) {
      try {
        this.$images.set(this.#processImages(src));
      } catch (error) {
        this.#onError(src, error);
      }
    } else {
      try {
        this.$images.set(this.#processStoryboard(src));
      } catch (error) {
        this.#onError(src, error);
      }
    }
    return () => {
      this.$images.set([]);
    };
  }
  #processImages(images) {
    const baseURL = this.#resolveBaseUrl();
    return images.map((img, i3) => {
      assert(
        img.url && isString(img.url),
        `Invalid or missing \`url\` property at index ${i3}`
      );
      assert(
        "startTime" in img && isNumber(img.startTime),
        `Invalid or missing \`startTime\` property at index ${i3}`
      );
      return {
        ...img,
        url: isString(img.url) ? this.#resolveURL(img.url, baseURL) : img.url
      };
    });
  }
  #processStoryboard(board) {
    assert(isString(board.url), "Missing `url` in storyboard object");
    assert(isArray(board.tiles) && board.tiles?.length, `Empty tiles in storyboard`);
    const url = new URL(board.url), images = [];
    const tileWidth = "tile_width" in board ? board.tile_width : board.tileWidth, tileHeight = "tile_height" in board ? board.tile_height : board.tileHeight;
    for (const tile of board.tiles) {
      images.push({
        url,
        startTime: "start" in tile ? tile.start : tile.startTime,
        width: tileWidth,
        height: tileHeight,
        coords: { x: tile.x, y: tile.y }
      });
    }
    return images;
  }
  #processVTTCues(cues) {
    for (let i3 = 0; i3 < cues.length; i3++) {
      const cue = cues[i3];
      assert(
        "startTime" in cue && isNumber(cue.startTime),
        `Invalid or missing \`startTime\` property at index ${i3}`
      );
      assert(
        "text" in cue && isString(cue.text),
        `Invalid or missing \`text\` property at index ${i3}`
      );
    }
    const images = [], baseURL = this.#resolveBaseUrl();
    for (const cue of cues) {
      const [url, hash] = cue.text.split("#"), data = this.#resolveData(hash);
      images.push({
        url: this.#resolveURL(url, baseURL),
        startTime: cue.startTime,
        endTime: cue.endTime,
        width: data?.w,
        height: data?.h,
        coords: data && isNumber(data.x) && isNumber(data.y) ? { x: data.x, y: data.y } : void 0
      });
    }
    return images;
  }
  #resolveBaseUrl() {
    let baseURL = peek(this.#src);
    if (!isString(baseURL) || !/^https?:/.test(baseURL)) {
      return location.href;
    }
    return baseURL;
  }
  #resolveURL(src, baseURL) {
    return /^https?:/.test(src) ? new URL(src) : new URL(src, baseURL);
  }
  #resolveData(hash) {
    if (!hash) return {};
    const [hashProps, values] = hash.split("="), hashValues = values?.split(","), data = {};
    if (!hashProps || !hashValues) {
      return null;
    }
    for (let i3 = 0; i3 < hashProps.length; i3++) {
      const value = +hashValues[i3];
      if (!isNaN(value)) data[hashProps[i3]] = value;
    }
    return data;
  }
  #onError(src, error) {
    if (warned2?.has(src)) return;
    this.#media.logger?.errorGroup("[vidstack] failed to load thumbnails").labelledLog("Src", src).labelledLog("Error", error).dispatch();
    warned2?.add(src);
  }
};

// src/components/ui/thumbnails/thumbnail.ts
var Thumbnail = class extends Component {
  static props = {
    src: null,
    time: 0,
    crossOrigin: null
  };
  static state = new State({
    src: "",
    img: null,
    thumbnails: [],
    activeThumbnail: null,
    crossOrigin: null,
    loading: false,
    error: null,
    hidden: false
  });
  media;
  #loader;
  #styleResets = [];
  onSetup() {
    this.media = useMediaContext();
    this.#loader = ThumbnailsLoader.create(this.$props.src, this.$state.crossOrigin);
    this.#watchCrossOrigin();
    this.setAttributes({
      "data-loading": this.#isLoading.bind(this),
      "data-error": this.#hasError.bind(this),
      "data-hidden": this.$state.hidden,
      "aria-hidden": $ariaBool(this.$state.hidden)
    });
  }
  onConnect(el) {
    effect(this.#watchImg.bind(this));
    effect(this.#watchHidden.bind(this));
    effect(this.#watchCrossOrigin.bind(this));
    effect(this.#onLoadStart.bind(this));
    effect(this.#onFindActiveThumbnail.bind(this));
    effect(this.#resize.bind(this));
  }
  #watchImg() {
    const img = this.$state.img();
    if (!img) return;
    listenEvent(img, "load", this.#onLoaded.bind(this));
    listenEvent(img, "error", this.#onError.bind(this));
  }
  #watchCrossOrigin() {
    const { crossOrigin: crossOriginProp } = this.$props, { crossOrigin: crossOriginState } = this.$state, { crossOrigin: mediaCrossOrigin } = this.media.$state, crossOrigin = crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
    crossOriginState.set(crossOrigin === true ? "anonymous" : crossOrigin);
  }
  #onLoadStart() {
    const { src, loading, error } = this.$state;
    if (src()) {
      loading.set(true);
      error.set(null);
    }
    return () => {
      this.#resetStyles();
      loading.set(false);
      error.set(null);
    };
  }
  #onLoaded() {
    const { loading, error } = this.$state;
    this.#resize();
    loading.set(false);
    error.set(null);
  }
  #onError(event2) {
    const { loading, error } = this.$state;
    loading.set(false);
    error.set(event2);
  }
  #isLoading() {
    const { loading, hidden } = this.$state;
    return !hidden() && loading();
  }
  #hasError() {
    const { error } = this.$state;
    return !isNull(error());
  }
  #watchHidden() {
    const { hidden } = this.$state, { duration } = this.media.$state, images = this.#loader.$images();
    hidden.set(this.#hasError() || !Number.isFinite(duration()) || images.length === 0);
  }
  getTime() {
    return this.$props.time();
  }
  #onFindActiveThumbnail() {
    let images = this.#loader.$images();
    if (!images.length) return;
    let time = this.getTime(), { src, activeThumbnail } = this.$state, activeIndex = -1, activeImage = null;
    for (let i3 = images.length - 1; i3 >= 0; i3--) {
      const image = images[i3];
      if (time >= image.startTime && (!image.endTime || time < image.endTime)) {
        activeIndex = i3;
        break;
      }
    }
    if (images[activeIndex]) {
      activeImage = images[activeIndex];
    }
    activeThumbnail.set(activeImage);
    src.set(activeImage?.url.href || "");
  }
  #resize() {
    if (!this.scope || this.$state.hidden()) return;
    const rootEl = this.el, imgEl = this.$state.img(), thumbnail = this.$state.activeThumbnail();
    if (!imgEl || !thumbnail || !rootEl) return;
    let width = thumbnail.width ?? imgEl.naturalWidth, height = thumbnail?.height ?? imgEl.naturalHeight, {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width: elWidth,
      height: elHeight
    } = getComputedStyle(this.el);
    if (minWidth === "100%") minWidth = parseFloat(elWidth) + "";
    if (minHeight === "100%") minHeight = parseFloat(elHeight) + "";
    let minRatio = Math.max(parseInt(minWidth) / width, parseInt(minHeight) / height), maxRatio = Math.min(
      Math.max(parseInt(minWidth), parseInt(maxWidth)) / width,
      Math.max(parseInt(minHeight), parseInt(maxHeight)) / height
    ), scale = !isNaN(maxRatio) && maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this.#style(rootEl, "--thumbnail-width", `${width * scale}px`);
    this.#style(rootEl, "--thumbnail-height", `${height * scale}px`);
    this.#style(imgEl, "width", `${imgEl.naturalWidth * scale}px`);
    this.#style(imgEl, "height", `${imgEl.naturalHeight * scale}px`);
    this.#style(
      imgEl,
      "transform",
      thumbnail.coords ? `translate(-${thumbnail.coords.x * scale}px, -${thumbnail.coords.y * scale}px)` : ""
    );
    this.#style(imgEl, "max-width", "none");
  }
  #style(el, name, value) {
    el.style.setProperty(name, value);
    this.#styleResets.push(() => el.style.removeProperty(name));
  }
  #resetStyles() {
    for (const reset of this.#styleResets) reset();
    this.#styleResets = [];
  }
};

// src/elements/define/thumbnail-element.ts
init_dom();
var imgTemplate = /* @__PURE__ */ createTemplate(
  '<img loading="eager" decoding="async" aria-hidden="true">'
);
var MediaThumbnailElement = class extends Host(HTMLElement, Thumbnail) {
  static tagName = "media-thumbnail";
  static attrs = {
    crossOrigin: "crossorigin"
  };
  #media;
  #img = this.#createImg();
  onSetup() {
    this.#media = useMediaContext();
    this.$state.img.set(this.#img);
  }
  onConnect() {
    const { src, crossOrigin } = this.$state;
    if (this.#img.parentNode !== this) {
      this.prepend(this.#img);
    }
    effect(() => {
      setAttribute(this.#img, "src", src());
      setAttribute(this.#img, "crossorigin", crossOrigin());
    });
  }
  #createImg() {
    return cloneTemplateContent(imgTemplate);
  }
};

// src/elements/define/sliders/slider-thumbnail-element.ts
var MediaSliderThumbnailElement = class extends MediaThumbnailElement {
  static tagName = "media-slider-thumbnail";
  #media;
  #slider;
  onSetup() {
    super.onSetup();
    this.#media = useMediaContext();
    this.#slider = useState(Slider.state);
  }
  onConnect() {
    super.onConnect();
    effect(this.#watchTime.bind(this));
  }
  #watchTime() {
    const { duration, clipStartTime } = this.#media.$state;
    this.time = clipStartTime() + this.#slider.pointerRate() * duration();
  }
};

// src/elements/define/sliders/slider-value-element.ts
init_prod();

// src/components/ui/sliders/slider-value.ts
init_prod();
init_number();

// src/utils/time.ts
init_std();
function padNumberWithZeroes(num, expectedLength) {
  const str = String(num);
  const actualLength = str.length;
  const shouldPad = actualLength < expectedLength;
  if (shouldPad) {
    const padLength = expectedLength - actualLength;
    const padding = `0`.repeat(padLength);
    return `${padding}${num}`;
  }
  return str;
}
function parseTime(duration) {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc(duration % 3600 / 60);
  const seconds = Math.trunc(duration % 60);
  const fraction = Number((duration - Math.trunc(duration)).toPrecision(3));
  return {
    hours,
    minutes,
    seconds,
    fraction
  };
}
function formatTime(duration, { padHrs = null, padMins = null, showHrs = false, showMs = false } = {}) {
  const { hours, minutes, seconds, fraction } = parseTime(duration), paddedHours = padHrs ? padNumberWithZeroes(hours, 2) : hours, paddedMinutes = padMins || isNull(padMins) && duration >= 3600 ? padNumberWithZeroes(minutes, 2) : minutes, paddedSeconds = padNumberWithZeroes(seconds, 2), paddedMs = showMs && fraction > 0 ? `.${String(fraction).replace(/^0?\./, "")}` : "", time = `${paddedMinutes}:${paddedSeconds}${paddedMs}`;
  return hours > 0 || showHrs ? `${paddedHours}:${time}` : time;
}
function formatSpokenTime(duration) {
  const spokenParts = [];
  const { hours, minutes, seconds } = parseTime(duration);
  if (hours > 0) {
    spokenParts.push(`${hours} hour`);
  }
  if (minutes > 0) {
    spokenParts.push(`${minutes} min`);
  }
  if (seconds > 0 || spokenParts.length === 0) {
    spokenParts.push(`${seconds} sec`);
  }
  return spokenParts.join(" ");
}

// src/components/ui/sliders/slider-value.ts
var SliderValue = class extends Component {
  static props = {
    type: "pointer",
    format: null,
    showHours: false,
    showMs: false,
    padHours: null,
    padMinutes: null,
    decimalPlaces: 2
  };
  #format;
  #text;
  #slider;
  onSetup() {
    this.#slider = useState(Slider.state);
    this.#format = useContext(sliderValueFormatContext);
    this.#text = computed(this.getValueText.bind(this));
  }
  /**
   * Returns the current value formatted as text based on prop settings.
   */
  // @method
  getValueText() {
    const {
      type,
      format: $format,
      decimalPlaces,
      padHours,
      padMinutes,
      showHours,
      showMs
    } = this.$props, { value: sliderValue, pointerValue, min: min2, max: max2 } = this.#slider, format = $format?.() ?? this.#format.default;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (format === "percent") {
      const range = max2() - min2();
      const percent = value / range * 100;
      return (this.#format.percent ?? round2)(percent, decimalPlaces()) + "%";
    } else if (format === "time") {
      return (this.#format.time ?? formatTime)(value, {
        padHrs: padHours(),
        padMins: padMinutes(),
        showHrs: showHours(),
        showMs: showMs()
      });
    } else {
      return (this.#format.value?.(value) ?? value.toFixed(2)) + "";
    }
  }
};

// src/elements/define/sliders/slider-value-element.ts
var MediaSliderValueElement = class extends Host(HTMLElement, SliderValue) {
  static tagName = "media-slider-value";
  static attrs = {
    padMinutes: {
      converter: BOOLEAN
    }
  };
  onConnect() {
    effect(() => {
      this.textContent = this.getValueText();
    });
  }
};

// src/components/ui/sliders/time-slider/time-slider.ts
init_prod();
init_std();
init_utils();
init_dom();
init_number();
var TimeSlider2 = class extends Component {
  static props = {
    ...SliderController.props,
    step: 0.1,
    keyStep: 5,
    shiftKeyMultiplier: 2,
    pauseWhileDragging: false,
    noSwipeGesture: false,
    seekingRequestThrottle: 100
  };
  static state = sliderState;
  #media;
  #dispatchSeeking;
  #chapter = signal(null);
  constructor() {
    super();
    const { noSwipeGesture } = this.$props;
    new SliderController({
      swipeGesture: () => !noSwipeGesture(),
      getValue: this.#getValue.bind(this),
      getStep: this.#getStep.bind(this),
      getKeyStep: this.#getKeyStep.bind(this),
      roundValue: this.#roundValue,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragStart: this.#onDragStart.bind(this),
      onDragValueChange: this.#onDragValueChange.bind(this),
      onDragEnd: this.#onDragEnd.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    });
  }
  onSetup() {
    this.#media = useMediaContext();
    provideContext(sliderValueFormatContext, {
      default: "time",
      value: this.#formatValue.bind(this),
      time: this.#formatTime.bind(this)
    });
    this.setAttributes({
      "data-chapters": this.#hasChapters.bind(this)
    });
    this.setStyles({
      "--slider-progress": this.#calcBufferedPercent.bind(this)
    });
    effect(this.#watchCurrentTime.bind(this));
    effect(this.#watchSeekingThrottle.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-time-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Seek");
  }
  onConnect(el) {
    effect(this.#watchPreviewing.bind(this));
    watchActiveTextTrack(this.#media.textTracks, "chapters", this.#chapter.set);
  }
  #calcBufferedPercent() {
    const { bufferedEnd, duration } = this.#media.$state;
    return round2(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  #hasChapters() {
    const { duration } = this.#media.$state;
    return this.#chapter()?.cues.length && Number.isFinite(duration()) && duration() > 0;
  }
  #watchSeekingThrottle() {
    this.#dispatchSeeking = functionThrottle(
      this.#seeking.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  #watchCurrentTime() {
    if (this.$state.hidden()) return;
    const { value, dragging } = this.$state, newValue = this.#getValue();
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  #watchPreviewing() {
    const player = this.#media.player.el, { preview } = useContext(sliderContext);
    player && preview() && setAttribute(player, "data-preview", this.$state.active());
  }
  #seeking(time, event2) {
    this.#media.remote.seeking(time, event2);
  }
  #seek(time, percent, event2) {
    this.#dispatchSeeking.cancel();
    const { live } = this.#media.$state;
    if (live() && percent >= 99) {
      this.#media.remote.seekToLiveEdge(event2);
      return;
    }
    this.#media.remote.seek(time, event2);
  }
  #playingBeforeDragStart = false;
  #onDragStart(event2) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this.#media.$state;
      this.#playingBeforeDragStart = !paused();
      this.#media.remote.pause(event2);
    }
  }
  #onDragValueChange(event2) {
    this.#dispatchSeeking(this.#percentToTime(event2.detail), event2);
  }
  #onDragEnd(event2) {
    const { seeking } = this.#media.$state;
    if (!peek(seeking)) this.#seeking(this.#percentToTime(event2.detail), event2);
    const percent = event2.detail;
    this.#seek(this.#percentToTime(percent), percent, event2);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this.#playingBeforeDragStart) {
      this.#media.remote.play(event2);
      this.#playingBeforeDragStart = false;
    }
  }
  #onValueChange(event2) {
    const { dragging } = this.$state;
    if (dragging() || !event2.trigger) return;
    this.#onDragEnd(event2);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  #getValue() {
    const { currentTime } = this.#media.$state;
    return this.#timeToPercent(currentTime());
  }
  #getStep() {
    const value = this.$props.step() / this.#media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  #getKeyStep() {
    const value = this.$props.keyStep() / this.#media.$state.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  #roundValue(value) {
    return round2(value, 3);
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSeek } = this.#media.$state;
    return disabled() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  #getARIAValueNow() {
    const { value } = this.$state;
    return Math.round(value());
  }
  #getARIAValueText() {
    const time = this.#percentToTime(this.$state.value()), { duration } = this.#media.$state;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  #percentToTime(percent) {
    const { duration } = this.#media.$state;
    return round2(percent / 100 * duration(), 5);
  }
  #timeToPercent(time) {
    const { liveEdge, duration } = this.#media.$state, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  #formatValue(percent) {
    const time = this.#percentToTime(percent), { live, duration } = this.#media.$state;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  #formatTime(percent, options) {
    const time = this.#percentToTime(percent), { live, duration } = this.#media.$state, value = live() ? time - duration() : time;
    return Number.isFinite(time) ? `${value < 0 ? "-" : ""}${formatTime(Math.abs(value), options)}` : "LIVE";
  }
};

// src/elements/define/sliders/time-slider-element.ts
var MediaTimeSliderElement = class extends Host(HTMLElement, TimeSlider2) {
  static tagName = "media-time-slider";
};

// src/components/ui/sliders/volume-slider.ts
init_prod();
init_dom();
init_number();
var VolumeSlider2 = class extends Component {
  static props = {
    ...SliderController.props,
    keyStep: 5,
    shiftKeyMultiplier: 2
  };
  static state = sliderState;
  #media;
  onSetup() {
    this.#media = useMediaContext();
    const { audioGain } = this.#media.$state;
    provideContext(sliderValueFormatContext, {
      default: "percent",
      value(value) {
        return (value * (audioGain() ?? 1)).toFixed(2);
      },
      percent(value) {
        return Math.round(value * (audioGain() ?? 1));
      }
    });
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.#isDisabled.bind(this),
      aria: {
        valueMax: this.#getARIAValueMax.bind(this),
        valueNow: this.#getARIAValueNow.bind(this),
        valueText: this.#getARIAValueText.bind(this)
      },
      onDragValueChange: this.#onDragValueChange.bind(this),
      onValueChange: this.#onValueChange.bind(this)
    }).attach(this);
    effect(this.#watchVolume.bind(this));
  }
  onAttach(el) {
    el.setAttribute("data-media-volume-slider", "");
    setAttributeIfEmpty(el, "aria-label", "Volume");
    const { canSetVolume } = this.#media.$state;
    this.setAttributes({
      "data-supported": canSetVolume,
      "aria-hidden": $ariaBool(() => !canSetVolume())
    });
  }
  #getARIAValueNow() {
    const { value } = this.$state, { audioGain } = this.#media.$state;
    return Math.round(value() * (audioGain() ?? 1));
  }
  #getARIAValueText() {
    const { value, max: max2 } = this.$state, { audioGain } = this.#media.$state;
    return round2(value() / max2() * (audioGain() ?? 1) * 100, 2) + "%";
  }
  #getARIAValueMax() {
    const { audioGain } = this.#media.$state;
    return this.$state.max() * (audioGain() ?? 1);
  }
  #isDisabled() {
    const { disabled } = this.$props, { canSetVolume } = this.#media.$state;
    return disabled() || !canSetVolume();
  }
  #watchVolume() {
    const { muted, volume } = this.#media.$state;
    const newValue = muted() ? 0 : volume() * 100;
    this.$state.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  #throttleVolumeChange = functionThrottle(this.#onVolumeChange.bind(this), 25);
  #onVolumeChange(event2) {
    if (!event2.trigger) return;
    const mediaVolume = round2(event2.detail / 100, 3);
    this.#media.remote.changeVolume(mediaVolume, event2);
  }
  #onValueChange(event2) {
    this.#throttleVolumeChange(event2);
  }
  #onDragValueChange(event2) {
    this.#throttleVolumeChange(event2);
  }
};

// src/elements/define/sliders/volume-slider-element.ts
var MediaVolumeSliderElement = class extends Host(HTMLElement, VolumeSlider2) {
  static tagName = "media-volume-slider";
};

// src/elements/define/time-element.ts
init_prod();

// src/components/ui/time.ts
init_prod();
init_std();
init_dom();
var Time = class extends Component {
  static props = {
    type: "current",
    showHours: false,
    padHours: null,
    padMinutes: null,
    remainder: false,
    toggle: false,
    hidden: false
  };
  static state = new State({
    timeText: "",
    hidden: false
  });
  #media;
  #invert = signal(null);
  #isVisible = signal(true);
  #isIntersecting = signal(true);
  onSetup() {
    this.#media = useMediaContext();
    this.#watchTime();
    const { type } = this.$props;
    this.setAttributes({
      "data-type": type,
      "data-remainder": this.#shouldInvert.bind(this)
    });
    new IntersectionObserverController({
      callback: this.#onIntersectionChange.bind(this)
    }).attach(this);
  }
  onAttach(el) {
    if (!el.hasAttribute("role")) effect(this.#watchRole.bind(this));
    effect(this.#watchTime.bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, this.#isVisible.set));
    effect(this.#watchHidden.bind(this));
    effect(this.#watchToggle.bind(this));
  }
  #onIntersectionChange(entries) {
    this.#isIntersecting.set(entries[0].isIntersecting);
  }
  #watchHidden() {
    const { hidden } = this.$props;
    this.$state.hidden.set(hidden() || !this.#isVisible() || !this.#isIntersecting());
  }
  #watchToggle() {
    if (!this.$props.toggle()) {
      this.#invert.set(null);
      return;
    }
    if (this.el) {
      onPress(this.el, this.#onToggle.bind(this));
    }
  }
  #watchTime() {
    const { hidden, timeText } = this.$state, { duration } = this.#media.$state;
    if (hidden()) return;
    const { type, padHours, padMinutes, showHours } = this.$props, seconds = this.#getSeconds(type()), $duration = duration(), shouldInvert = this.#shouldInvert();
    if (!Number.isFinite(seconds + $duration)) {
      timeText.set("LIVE");
      return;
    }
    const time = shouldInvert ? Math.max(0, $duration - seconds) : seconds, formattedTime = formatTime(time, {
      padHrs: padHours(),
      padMins: padMinutes(),
      showHrs: showHours()
    });
    timeText.set((shouldInvert ? "-" : "") + formattedTime);
  }
  #watchRole() {
    if (!this.el) return;
    const { toggle } = this.$props;
    setAttribute(this.el, "role", toggle() ? "timer" : null);
    setAttribute(this.el, "tabindex", toggle() ? 0 : null);
  }
  #getSeconds(type) {
    const { bufferedEnd, duration, currentTime } = this.#media.$state;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
  #shouldInvert() {
    return this.$props.remainder() && this.#invert() !== false;
  }
  #onToggle(event2) {
    event2.preventDefault();
    if (this.#invert() === null) {
      this.#invert.set(!this.$props.remainder());
      return;
    }
    this.#invert.set((v2) => !v2);
  }
};

// src/elements/define/time-element.ts
var MediaTimeElement = class extends Host(HTMLElement, Time) {
  static tagName = "media-time";
  onConnect() {
    effect(() => {
      this.textContent = this.$state.timeText();
    });
  }
};

// src/elements/bundles/player-layouts/plyr.ts
defineCustomElement(MediaPlyrLayoutElement);
defineCustomElement(MediaPosterElement);
defineCustomElement(MediaPlayButtonElement);
defineCustomElement(MediaMuteButtonElement);
defineCustomElement(MediaCaptionButtonElement);
defineCustomElement(MediaPIPButtonElement);
defineCustomElement(MediaFullscreenButtonElement);
defineCustomElement(MediaSeekButtonElement);
defineCustomElement(MediaAirPlayButtonElement);
defineCustomElement(MediaLiveButtonElement);
defineCustomElement(MediaVolumeSliderElement);
defineCustomElement(MediaTimeSliderElement);
defineCustomElement(MediaSliderPreviewElement);
defineCustomElement(MediaSliderThumbnailElement);
defineCustomElement(MediaSliderValueElement);
defineCustomElement(MediaMenuElement);
defineCustomElement(MediaMenuButtonElement);
defineCustomElement(MediaMenuItemsElement);
defineCustomElement(MediaMenuItemElement);
defineCustomElement(MediaAudioRadioGroupElement);
defineCustomElement(MediaCaptionsRadioGroupElement);
defineCustomElement(MediaSpeedRadioGroupElement);
defineCustomElement(MediaQualityRadioGroupElement);
defineCustomElement(MediaTimeElement);
defineCustomElement(MediaThumbnailElement);

// src/global/plyr.ts
init_std();
init_dom();
init_support();
var activePlyr = null;
var defaults = mediaState.record;
var forwardedPlayerState = [
  "playing",
  "paused",
  "ended",
  "currentTime",
  "seeking",
  "duration",
  "volume",
  "muted",
  "loop",
  "poster"
];
var eventMap = {
  ratechange: "rate-change",
  ready: "can-play",
  timeupdate: "time-update",
  volumechange: "volume-change"
};
var icons2 = [
  "airplay",
  "captions-off",
  "captions-on",
  "download",
  "enter-fullscreen",
  "exit-fullscreen",
  "fast-forward",
  "muted",
  "pause",
  "pip",
  "play",
  "restart",
  "rewind",
  "settings",
  "volume"
];
var Plyr = class _Plyr {
  constructor(target, config = {}) {
    this.target = target;
    this.config = config;
    if (false) {
      throw Error("[plyr] can not create player on server.");
    }
    if (isString(target)) {
      target = document.querySelector(target);
    } else if (!isHTMLElement2(target)) {
      target = target[0];
    }
    if (!isHTMLElement2(target)) {
      throw Error(`[plyr] target must be of type \`HTMLElement\`, found \`${typeof target}\``);
    }
    const dataConfig = target.getAttribute("data-plyr-config");
    if (dataConfig) {
      try {
        config = { ...config, ...JSON.parse(dataConfig) };
      } catch (error) {
        if (true) {
          console.error(`[plyr] failed to parse \`data-plyr-config\`

`, error);
        }
      }
    }
    const {
      enabled = true,
      debug = true ? "warn" : "error",
      autoPause = true,
      ratio = null,
      hideControls = true,
      resetOnEnd = false,
      disableContextMenu = true,
      iconUrl = null,
      iconPrefix = "plyr",
      keyboard = { focused: true, global: false },
      i18n: i18n2 = null,
      ...props
    } = config;
    this.player = document.createElement("media-player");
    this.provider = document.createElement("media-provider");
    this.layout = document.createElement("media-plyr-layout");
    if (!enabled) return;
    for (const prop8 of forwardedPlayerState) {
      Object.defineProperty(this, prop8, {
        get: () => this.player[prop8],
        set: (value) => void (this.player[prop8] = value)
      });
    }
    if (isString(debug)) {
      this.player.logLevel = debug;
    } else if (debug) {
      this.player.logLevel = "warn";
    }
    if (autoPause) {
      this.#disposal.add(listenEvent(this.player, "play", this.#onPlay.bind(this)));
    }
    this.ratio = ratio;
    this.layout.translations = i18n2;
    if (!hideControls) {
      this.player.controls.canIdle = false;
    }
    if (resetOnEnd) {
      this.#disposal.add(listenEvent(this.player, "ended", this.#onReset.bind(this)));
    }
    if (disableContextMenu) {
    }
    if (iconUrl) {
      this.layout.customIcons = true;
      const id2 = `sprite-${iconPrefix}`, exists = document.getElementById(id2);
      const addIcons = () => {
        for (const icon of icons2) {
          const namepsace = "http://www.w3.org/2000/svg";
          const svg = document.createElementNS(namepsace, "svg");
          setAttribute(svg, "fill", "none");
          setAttribute(svg, "slot", `${icon}-icon`);
          setAttribute(svg, "aria-hidden", "true");
          setAttribute(svg, "viewBox", "0 0 18 18");
          const use = document.createElementNS(namepsace, "use");
          use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${iconPrefix}-${icon}`);
          svg.append(use);
          this.layout.append(svg);
        }
      };
      if (!exists) {
        fetch(iconUrl).then((response) => response.text()).then((data) => {
          const container = document.createElement("div");
          setAttribute(container, "id", id2);
          setAttribute(container, "hidden", "");
          container.innerHTML = data;
          document.body.insertAdjacentElement("afterbegin", container);
          addIcons();
        }).catch((error) => {
          if (true) {
            console.error("[plyr] failed tol oad sprite:\n\n", error);
          }
          this.layout.customIcons = false;
        });
      } else {
        addIcons();
      }
    }
    if (keyboard.global) {
      this.player.keyTarget = "document";
    } else if (keyboard.focused) {
      this.player.keyTarget = "player";
    } else {
      this.player.keyDisabled = true;
    }
    target.removeAttribute("controls");
    const title = target.getAttribute("title");
    if (title) this.player.setAttribute("title", title);
    const width = target.getAttribute("width"), height = target.getAttribute("height");
    if (width || height) {
      if (width) this.player.style.width = width;
      if (height) this.player.style.height = height;
      this.player.style.aspectRatio = "unset";
    }
    for (const attr of target.attributes) {
      const name = attr.name.replace("data-", ""), propName = kebabToCamelCase(name);
      if (propName in this.player) {
        this.player.setAttribute(name, attr.value);
      } else if (propName in this.layout) {
        this.layout.setAttribute(name, attr.value);
      }
    }
    for (const [prop8, value] of Object.entries(props)) {
      if (prop8 in this.player) {
        this.player[prop8] = value;
      } else if (prop8 in this.layout) {
        this.layout[prop8] = value;
      }
    }
    this.player.append(this.provider, this.layout);
    const isTargetContainer = !isHTMLAudioElement(target) && !isHTMLVideoElement(target) && !isHTMLIFrameElement(target);
    if (isTargetContainer) {
      target.append(this.player);
    } else {
      for (const child of [...target.children]) this.provider.append(child);
      target.replaceWith(this.player);
    }
    const embedProvider = target.getAttribute("data-plyr-provider"), embedId = target.getAttribute("data-plyr-embed-id");
    if (embedProvider && /youtube|vimeo/.test(embedProvider) && embedId) {
      this.player.src = `${embedProvider}/${embedId}`;
    }
  }
  static setup(targets, config) {
    if (isString(targets)) {
      targets = document.querySelectorAll(targets);
    }
    return [...targets].map((target) => new _Plyr(target, config));
  }
  static supported(type, provider) {
    return true;
  }
  player;
  provider;
  layout;
  fullscreen = new PlyrFullscreenAdapter(this);
  // These are only included for type defs, props are defined in constructor.
  playing = defaults.playing;
  paused = defaults.paused;
  ended = defaults.ended;
  currentTime = defaults.currentTime;
  seeking = defaults.seeking;
  duration = defaults.duration;
  volume = defaults.volume;
  muted = defaults.muted;
  loop = defaults.loop;
  poster = defaults.poster;
  get type() {
    return this.player.provider?.type ?? "";
  }
  get isHTML5() {
    return /audio|video|hls/.test(this.type);
  }
  get isEmbed() {
    return /youtube|vimeo/.test(this.type);
  }
  get buffered() {
    const { bufferedEnd, seekableEnd } = this.player.state;
    return seekableEnd > 0 ? bufferedEnd / seekableEnd : 0;
  }
  get stopped() {
    return this.paused && this.currentTime === 0;
  }
  get hasAudio() {
    if (!this.isHTML5) return true;
    const media = this.player.provider.media;
    return Boolean(
      media.mozHasAudio || media.webkitAudioDecodedByteCount || media.audioTracks?.length || this.player.audioTracks.length
    );
  }
  get speed() {
    return this.player.playbackRate;
  }
  set speed(speed) {
    this.player.remoteControl.changePlaybackRate(speed);
  }
  get currentTrack() {
    return this.player.textTracks.selectedIndex;
  }
  set currentTrack(index) {
    this.player.remoteControl.changeTextTrackMode(index, "showing");
  }
  get pip() {
    return this.player.state.pictureInPicture;
  }
  set pip(isActive) {
    if (isActive) this.player.enterPictureInPicture();
    else this.player.exitPictureInPicture();
  }
  get quality() {
    return this.player.state.quality?.height ?? null;
  }
  set quality(value) {
    let qualities = this.player.qualities, index = -1;
    if (value !== null) {
      let minScore = Infinity;
      for (let i3 = 0; i3 < qualities.length; i3++) {
        const score = Math.abs(qualities[i3].height - value);
        if (score < minScore) {
          index = i3;
          minScore = score;
        }
      }
    }
    this.player.remoteControl.changeQuality(index);
  }
  #source = null;
  get source() {
    return this.#source;
  }
  set source(source) {
    const {
      type: viewType = "video",
      sources = "",
      title = "",
      poster = "",
      thumbnails = "",
      tracks = []
    } = source ?? {};
    this.player.src = sources;
    this.player.viewType = viewType;
    this.player.title = title;
    this.player.poster = poster;
    this.layout.thumbnails = thumbnails;
    this.player.textTracks.clear();
    for (const track of tracks) this.player.textTracks.add(track);
    this.#source = source;
  }
  #ratio = null;
  get ratio() {
    return this.#ratio;
  }
  set ratio(ratio) {
    if (ratio) ratio = ratio.replace(/\s*:\s*/, " / ");
    setStyle(this.player, "aspect-ratio", ratio ?? "unset");
    this.#ratio = ratio;
  }
  get download() {
    return this.layout.download;
  }
  set download(download) {
    this.layout.download = download;
  }
  #disposal = createDisposalBin();
  #onPlay() {
    if (activePlyr !== this) activePlyr?.pause();
    activePlyr = this;
  }
  #onReset() {
    this.currentTime = 0;
    this.paused = true;
  }
  play() {
    return this.player.play();
  }
  pause() {
    return this.player.pause();
  }
  togglePlay(toggle = this.paused) {
    if (toggle) {
      return this.player.play();
    } else {
      return this.player.pause();
    }
  }
  toggleCaptions(toggle = !this.player.textTracks.selected) {
    const controller = this.player.remoteControl;
    if (toggle) {
      controller.showCaptions();
    } else {
      controller.disableCaptions();
    }
  }
  toggleControls(toggle = !this.player.controls.showing) {
    const controls = this.player.controls;
    if (toggle) {
      controls.show();
    } else {
      controls.hide();
    }
  }
  restart() {
    this.currentTime = 0;
  }
  stop() {
    this.pause();
    this.player.currentTime = 0;
  }
  forward(seekTime = this.config.seekTime ?? 10) {
    this.currentTime += seekTime;
  }
  rewind(seekTime = this.config.seekTime ?? 10) {
    this.currentTime -= seekTime;
  }
  increaseVolume(step = 5) {
    this.volume += step;
  }
  decreaseVolume(step = 5) {
    this.volume -= step;
  }
  airplay() {
    return this.player.requestAirPlay();
  }
  on(type, callback) {
    this.#listen(type, callback);
  }
  once(type, callback) {
    this.#listen(type, callback, { once: true });
  }
  off(type, callback) {
    this.#listen(type, callback, { remove: true });
  }
  #listeners = [];
  #listen(type, callback, options = {}) {
    let eventType = type, toggle = null;
    switch (type) {
      case "captionsenabled":
      case "captionsdisabled":
        eventType = "text-track-change";
        toggle = type === "captionsenabled";
        break;
      case "controlsshown":
      case "controlshidden":
        eventType = "controls-change";
        toggle = type === "controlsshown";
        break;
      case "enterfullscreen":
      case "exitfullscreen":
        eventType = "fullscreen-change";
        toggle = type === "enterfullscreen";
        break;
      default:
    }
    const mappedEventType = eventMap[eventType] ?? eventType;
    const listener = (event2) => {
      if (isBoolean(toggle) && !!event2.detail !== toggle) return;
      if (mappedEventType !== type) {
        callback(new DOMEvent(type, { ...event2, trigger: event2 }));
        return;
      }
      callback(event2);
    };
    if (options.remove) {
      let index = -1;
      do {
        index = this.#listeners.findIndex((t5) => t5.type === type && t5.callback === callback);
        if (index >= 0) {
          const { listener: listener2 } = this.#listeners[index];
          this.player.removeEventListener(mappedEventType, listener2);
          this.#listeners.splice(index, 1);
        }
      } while (index >= 0);
    } else {
      this.#listeners.push({ type, callback, listener });
      this.player.addEventListener(mappedEventType, listener, { once: options.once });
    }
  }
  supports(type) {
    return !!type && canPlayVideoType(null, type);
  }
  destroy() {
    for (const { type, listener } of this.#listeners) {
      this.player.removeEventListener(eventMap[type] ?? type, listener);
    }
    this.#source = null;
    this.#listeners.length = 0;
    if (activePlyr === this) activePlyr = null;
    this.#disposal.empty();
    this.player.destroy();
  }
};
var PlyrFullscreenAdapter = class {
  #plyr;
  constructor(plyr) {
    this.#plyr = plyr;
  }
  get #player() {
    return this.#plyr.player;
  }
  /**
   * 	Returns a boolean indicating if the current player has fullscreen enabled.
   */
  get enabled() {
    return this.#player.state.canFullscreen;
  }
  /**
   * Returns a boolean indicating if the current player is in fullscreen mode.
   */
  get active() {
    return this.#player.state.fullscreen;
  }
  /**
   * Request to enter fullscreen.
   */
  enter() {
    return this.#player.requestFullscreen();
  }
  /**
   * Request to exit fullscreen.
   */
  exit() {
    return this.#player.exitFullscreen();
  }
  /**
   * Request to toggle fullscreen.
   */
  toggle() {
    if (this.active) return this.exit();
    else return this.enter();
  }
};
if (true) {
  window.Plyr = Plyr;
}

// src/core/tracks/text/render/libass-text-renderer.ts
init_std();
init_symbols();
var LibASSTextRenderer = class {
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
  }
  priority = 1;
  #instance = null;
  #track = null;
  #typeRE = /(ssa|ass)$/;
  canRender(track, video) {
    return !!video && !!track.src && (isString(track.type) && this.#typeRE.test(track.type) || this.#typeRE.test(track.src));
  }
  attach(video) {
    if (!video) return;
    this.loader().then(async (mod) => {
      this.#instance = new mod.default({
        ...this.config,
        video,
        subUrl: this.#track?.src || ""
      });
      listenEvent(this.#instance, "ready", () => {
        const canvas = this.#instance?._canvas;
        if (canvas) canvas.style.pointerEvents = "none";
      });
      listenEvent(this.#instance, "error", (event2) => {
        if (this.#track) {
          this.#track[TextTrackSymbol.readyState] = 3;
          this.#track.dispatchEvent(
            new DOMEvent("error", {
              trigger: event2,
              detail: event2.error
            })
          );
        }
      });
    });
  }
  changeTrack(track) {
    if (!track || track.readyState === 3) {
      this.#freeTrack();
    } else if (this.#track !== track) {
      this.#instance?.setTrackByUrl(track.src);
      this.#track = track;
    }
  }
  detach() {
    this.#freeTrack();
  }
  #freeTrack() {
    this.#instance?.freeTrack();
    this.#track = null;
  }
};

// src/exports/core.ts
init_text_track();
init_utils();
init_time_ranges();
export {
  ARIAKeyShortcuts,
  AudioTrackList,
  LibASSTextRenderer,
  LocalMediaStorage,
  MEDIA_KEY_SHORTCUTS,
  MediaControls,
  MediaRemoteControl,
  Plyr,
  PlyrFullscreenAdapter,
  TextRenderers,
  TextTrack,
  TextTrackList,
  TimeRange,
  VideoQualityList,
  findActiveCue,
  getTimeRangesEnd,
  getTimeRangesStart,
  isCueActive,
  isTrackCaptionKind,
  isVideoQualitySrc,
  mediaContext,
  mediaState,
  normalizeTimeIntervals,
  parseJSONCaptionsFile,
  softResetMediaState,
  sortVideoQualities,
  updateTimeIntervals,
  watchActiveTextTrack,
  watchCueTextChange
};
