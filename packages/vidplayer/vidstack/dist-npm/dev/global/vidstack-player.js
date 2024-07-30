import '../define/vidstack-player.js';
import { i as isString, d as defineCustomElement, k as kebabToCamelCase } from '../chunks/vidstack-ND4uzLKO.js';
import '../chunks/vidstack-Ca9dj_1Q.js';
import { i as isHTMLAudioElement, a as isHTMLVideoElement, b as isHTMLIFrameElement } from '../chunks/vidstack-Ga5LXVQf.js';
import { i as isHTMLElement } from '../chunks/vidstack-BNJih9gD.js';
import '../chunks/vidstack-CW4x-cgq.js';
import '../chunks/vidstack-BuYg7N1V.js';
import '../chunks/vidstack-pWEcRV_H.js';
import '../chunks/vidstack-BmzHu3v_.js';
import '../chunks/vidstack-CnaYRoc3.js';
import '../chunks/vidstack-DpIrri-f.js';
import '../chunks/vidstack-CkfyfBu0.js';
import '../chunks/vidstack-1gmLGa6x.js';
import '../chunks/vidstack-DM_McBs5.js';
import '../chunks/vidstack-ksPACRiU.js';
import '../chunks/vidstack-CSaHpIQV.js';

class VidstackPlayerLayout {
  constructor(props) {
    this.props = props;
    this.name = "vidstack";
  }
  async load() {
    await import('../define/vidstack-player-default-layout.js');
    await import('../define/vidstack-player-ui.js');
  }
  create() {
    const layouts = [
      document.createElement("media-audio-layout"),
      document.createElement("media-video-layout")
    ];
    if (this.props) {
      for (const [prop, value] of Object.entries(this.props)) {
        for (const el of layouts)
          el[prop] = value;
      }
    }
    return layouts;
  }
}

class PlyrLayout {
  constructor(props) {
    this.props = props;
    this.name = "plyr";
  }
  async load() {
    await import('../define/plyr-layout.js');
  }
  create() {
    const layout = document.createElement("media-plyr-layout");
    if (this.props) {
      for (const [prop, value] of Object.entries(this.props)) {
        layout[prop] = value;
      }
    }
    return [layout];
  }
}

const LAYOUT_LOADED = Symbol();
class VidstackPlayer {
  static async create({ target, layout, tracks, ...props }) {
    if (isString(target)) {
      target = document.querySelector(target);
    }
    if (!isHTMLElement(target)) {
      throw Error(`[vidstack] target must be of type \`HTMLElement\`, found \`${typeof target}\``);
    }
    let player = document.createElement("media-player"), provider = document.createElement("media-provider"), layouts, isTargetContainer = !isHTMLAudioElement(target) && !isHTMLVideoElement(target) && !isHTMLIFrameElement(target);
    player.setAttribute("keep-alive", "");
    if (props.poster && layout?.name !== "plyr") {
      if (!customElements.get("media-poster")) {
        const { MediaPosterElement } = await import('../chunks/vidstack-Sx7aEl95.js');
        defineCustomElement(MediaPosterElement);
      }
      const poster = document.createElement("media-poster");
      if (layout?.name === "vidstack")
        poster.classList.add("vds-poster");
      provider.append(poster);
    }
    if (layout) {
      target.removeAttribute("controls");
      if (!layout[LAYOUT_LOADED]) {
        await layout.load();
        layout[LAYOUT_LOADED] = true;
      }
      layouts = await layout.create();
    }
    const title = target.getAttribute("title");
    if (title)
      player.setAttribute("title", title);
    const width = target.getAttribute("width"), height = target.getAttribute("height");
    if (width || height) {
      if (width)
        player.style.width = width;
      if (height)
        player.style.height = height;
      player.style.aspectRatio = "unset";
    }
    for (const attr of target.attributes) {
      const name = attr.name.replace("data-", ""), propName = kebabToCamelCase(name);
      if (propName in player) {
        player.setAttribute(name, attr.value);
      } else if (layouts?.length) {
        for (const layout2 of layouts) {
          if (propName in layout2) {
            layout2.setAttribute(name, attr.value);
          }
        }
      }
    }
    for (const [prop, value] of Object.entries(props)) {
      player[prop] = value;
    }
    if (tracks) {
      for (const track of tracks)
        player.textTracks.add(track);
    }
    player.append(provider);
    if (layouts) {
      for (const layout2 of layouts)
        player.append(layout2);
    }
    if (isTargetContainer) {
      target.append(player);
    } else {
      for (const child of [...target.children])
        provider.append(child);
      target.replaceWith(player);
    }
    return player;
  }
}

export { PlyrLayout, VidstackPlayer, VidstackPlayerLayout };
