import { q as computed, p as peek, g as effect, M as animationFrameThrottle, r as onDispose, z as isDOMNode, i as isString } from './vidstack-ND4uzLKO.js';
import { d as directive, A as AsyncDirective, P as PartType, n as nothing, i as ifDefined, r as render, h as html, b as unsafeSVG } from './vidstack-Nzpo6ock.js';
import { u as useMediaContext } from './vidstack-BuYg7N1V.js';

class SignalDirective extends AsyncDirective {
  constructor(part) {
    super(part);
    this._signal = null;
    this._isAttr = false;
    this._stop = null;
    this._isAttr = part.type === PartType.ATTRIBUTE || part.type === PartType.BOOLEAN_ATTRIBUTE;
  }
  render(signal) {
    if (signal !== this._signal) {
      this.disconnected();
      this._signal = signal;
      if (this.isConnected)
        this._watch();
    }
    return this._signal ? this._resolveValue(peek(this._signal)) : nothing;
  }
  reconnected() {
    this._watch();
  }
  disconnected() {
    this._stop?.();
    this._stop = null;
  }
  _watch() {
    if (!this._signal)
      return;
    this._stop = effect(this._onValueChange.bind(this));
  }
  _resolveValue(value) {
    return this._isAttr ? ifDefined(value) : value;
  }
  _setValue(value) {
    this.setValue(this._resolveValue(value));
  }
  _onValueChange() {
    {
      try {
        this._setValue(this._signal?.());
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
    }
  }
}
function $signal(compute) {
  return directive(SignalDirective)(computed(compute));
}

class SlotObserver {
  constructor(_roots, _callback) {
    this._roots = _roots;
    this._callback = _callback;
    this.elements = /* @__PURE__ */ new Set();
    this._onMutation = animationFrameThrottle(this._update.bind(this));
  }
  connect() {
    this._update();
    const observer = new MutationObserver(this._onMutation);
    for (const root of this._roots)
      observer.observe(root, { childList: true, subtree: true });
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
      render(null, slot);
      render(template, slot);
    }
    if (!slot.style.display) {
      slot.style.display = "contents";
    }
    const el = slot.firstElementChild;
    if (!el)
      return;
    const classList = slot.getAttribute("data-class");
    if (classList)
      el.classList.add(...classList.split(" "));
  }
  _update(entries) {
    if (entries && !entries.some((e) => e.addedNodes.length))
      return;
    let changed = false, slots = this._roots.flatMap((root) => [...root.querySelectorAll("slot")]);
    for (const slot of slots) {
      if (!slot.hasAttribute("name") || this.elements.has(slot))
        continue;
      this.elements.add(slot);
      changed = true;
    }
    if (changed)
      this._callback(this.elements);
  }
}

let id = 0, slotIdAttr = "data-slot-id";
class SlotManager {
  constructor(_roots) {
    this._roots = _roots;
    this._onMutation = animationFrameThrottle(this._update.bind(this));
    this.slots = new SlotObserver(_roots, this._update.bind(this));
  }
  connect() {
    this.slots.connect();
    this._update();
    const mutations = new MutationObserver(this._onMutation);
    for (const root of this._roots)
      mutations.observe(root, { childList: true });
    onDispose(() => mutations.disconnect());
  }
  _update() {
    for (const root of this._roots) {
      for (const node of root.children) {
        if (node.nodeType !== 1)
          continue;
        const name = node.getAttribute("slot");
        if (!name)
          continue;
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
          if (name.includes("-icon"))
            clone.classList.add("vds-icon");
          clone.style.display = "";
          clone.removeAttribute("slot");
          this.slots.assign(clone, slot);
          slot.setAttribute(slotIdAttr, slotId);
        }
      }
    }
  }
}

function Icon({ name, class: _class, state, paths, viewBox = "0 0 32 32" }) {
  return html`<svg
    class="${"vds-icon" + (_class ? ` ${_class}` : "")}"
    viewBox="${viewBox}"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    data-icon=${ifDefined(name ?? state)}
  >
    ${!isString(paths) ? $signal(paths) : unsafeSVG(paths)}
  </svg>`;
}

class IconsLoader {
  constructor(_roots) {
    this._roots = _roots;
    this._icons = {};
    this._loaded = false;
    this.slots = new SlotObserver(_roots, this._insertIcons.bind(this));
  }
  connect() {
    this.slots.connect();
  }
  load() {
    this._load().then((icons) => {
      this._icons = icons;
      this._loaded = true;
      this._insertIcons();
    });
  }
  *_iterate() {
    for (const iconName of Object.keys(this._icons)) {
      const slotName = `${iconName}-icon`;
      for (const slot of this.slots.elements) {
        if (slot.name !== slotName)
          continue;
        yield { icon: this._icons[iconName], slot };
      }
    }
  }
  _insertIcons() {
    if (!this._loaded)
      return;
    for (const { icon, slot } of this._iterate()) {
      this.slots.assign(icon, slot);
    }
  }
}

class LayoutIconsLoader extends IconsLoader {
  connect() {
    super.connect();
    const { player } = useMediaContext();
    if (!player.el)
      return;
    let dispose, observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting)
        return;
      dispose?.();
      dispose = void 0;
      this.load();
    });
    observer.observe(player.el);
    dispose = onDispose(() => observer.disconnect());
  }
}

export { $signal as $, Icon as I, LayoutIconsLoader as L, SlotManager as S };
