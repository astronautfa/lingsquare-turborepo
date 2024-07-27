import '../define/vidstack-player.js';
import { isString, defineCustomElement, kebabToCamelCase } from '../chunks/vidstack-C6myozhB.js';
import { isHTMLAudioElement, isHTMLVideoElement, isHTMLIFrameElement } from '../chunks/vidstack-D6Aq2zVp.js';
import { isHTMLElement } from '../chunks/vidstack-BeyDmEgV.js';
import '../chunks/vidstack-CVS6Z2ug.js';
import '../chunks/vidstack-Cq-GdDcp.js';
import '../chunks/vidstack-B9TAFm_g.js';
import '../chunks/vidstack-Dy-iOvF5.js';
import '../chunks/vidstack-B97tQYIP.js';
import '../chunks/vidstack-Vi2h5MrZ.js';
import '../chunks/vidstack-D2w309v1.js';
import '../chunks/vidstack-BoSiLpaP.js';
import '../chunks/vidstack-DH8xaM_3.js';
import '../chunks/vidstack-C9vIqaYT.js';
import '@floating-ui/dom';
import '../chunks/vidstack-Dihypf8P.js';
import '../chunks/vidstack-D6_zYTXL.js';

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
        for (const el of layouts) el[prop] = value;
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
        const { MediaPosterElement } = await import('../chunks/vidstack-CeWfOfmi.js');
        defineCustomElement(MediaPosterElement);
      }
      const poster = document.createElement("media-poster");
      if (layout?.name === "vidstack") poster.classList.add("vds-poster");
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
    if (title) player.setAttribute("title", title);
    const width = target.getAttribute("width"), height = target.getAttribute("height");
    if (width || height) {
      if (width) player.style.width = width;
      if (height) player.style.height = height;
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
      for (const track of tracks) player.textTracks.add(track);
    }
    player.append(provider);
    if (layouts) {
      for (const layout2 of layouts) player.append(layout2);
    }
    if (isTargetContainer) {
      target.append(player);
    } else {
      for (const child of [...target.children]) provider.append(child);
      target.replaceWith(player);
    }
    return player;
  }
}

export { PlyrLayout, VidstackPlayer, VidstackPlayerLayout };
