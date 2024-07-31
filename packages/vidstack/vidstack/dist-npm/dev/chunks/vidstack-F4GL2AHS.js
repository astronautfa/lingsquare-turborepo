import {
  METHODS,
  PROPS,
  camelToKebabCase,
  createComponent,
  isArray,
  isString,
  runAll,
  scoped
} from "./vidstack-LVHOI4SR.js";

// ../../../node_modules/.pnpm/maverick.js@0.42.0/node_modules/maverick.js/dist/prod/element.js
var STRING = (v) => v === null ? "" : v + "";
var NULLABLE_STRING = (v) => v === null ? null : v + "";
var NUMBER = (v) => v === null ? 0 : Number(v);
var BOOLEAN = (v) => v !== null;
var FUNCTION = () => null;
var ARRAY = (v) => v === null ? [] : JSON.parse(v);
var OBJECT = (v) => v === null ? {} : JSON.parse(v);
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
function Host(Super, Component) {
  var _a, _b, _c;
  class MaverickElement extends Super {
    constructor(...args) {
      super(...args);
      this[_b] = 0;
      this[_c] = null;
      this.keepAlive = false;
      this.forwardKeepAlive = true;
      this.$ = scoped(() => createComponent(Component), null);
      this.$.$$.t(this);
      if (Component.props) {
        const props = this.$props, descriptors = Object.getOwnPropertyDescriptors(this);
        for (const prop of Object.keys(descriptors)) {
          if (prop in Component.props) {
            props[prop].set(this[prop]);
            delete this[prop];
          }
        }
      }
    }
    static {
      this[_a] = null;
    }
    static get observedAttributes() {
      if (!this[ATTRS] && Component.props) {
        const map = /* @__PURE__ */ new Map();
        for (const propName of Object.keys(Component.props)) {
          let attr = this.attrs?.[propName], attrName = isString(attr) ? attr : !attr ? attr : attr?.attr;
          if (attrName === false)
            continue;
          if (!attrName)
            attrName = camelToKebabCase(propName);
          map.set(attrName, {
            C: propName,
            B: attr && !isString(attr) && attr?.converter || inferAttributeConverter(Component.props[propName])
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
    attributeChangedCallback(name, _, newValue) {
      const Ctor = this.constructor;
      if (!Ctor[ATTRS]) {
        super.attributeChangedCallback?.(name, _, newValue);
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
    [(_a = ATTRS, _b = SETUP_STATE, _c = SETUP_CALLBACKS, SETUP)]() {
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
  }
  extendProto(MaverickElement, Component);
  return MaverickElement;
}
function extendProto(Element, Component) {
  const ElementProto = Element.prototype, ComponentProto = Component.prototype;
  if (Component.props) {
    for (const prop of Object.keys(Component.props)) {
      Object.defineProperty(ElementProto, prop, {
        enumerable: true,
        configurable: true,
        get() {
          return this.$props[prop]();
        },
        set(value) {
          this.$props[prop].set(value);
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

export {
  BOOLEAN,
  Host,
  defineCustomElement
};
