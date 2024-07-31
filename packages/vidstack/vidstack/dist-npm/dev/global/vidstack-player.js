import "../chunks/vidstack-HRV5GPEJ.js";
import "../chunks/vidstack-6467GOSE.js";
import {
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLVideoElement
} from "../chunks/vidstack-E2U3KYYB.js";
import "../chunks/vidstack-LGEXOBZ2.js";
import "../chunks/vidstack-KISR27XC.js";
import "../chunks/vidstack-5A4DIYIL.js";
import "../chunks/vidstack-52ODY4LU.js";
import "../chunks/vidstack-S7KFX33M.js";
import "../chunks/vidstack-XCGTB4OT.js";
import "../chunks/vidstack-LAEAMMDT.js";
import {
  defineCustomElement
} from "../chunks/vidstack-F4GL2AHS.js";
import "../chunks/vidstack-CJ2P7QXN.js";
import {
  isHTMLElement
} from "../chunks/vidstack-365DTKRX.js";
import "../chunks/vidstack-QXGC5JTS.js";
import "../chunks/vidstack-M63U4DIJ.js";
import "../chunks/vidstack-7GP6O6LE.js";
import "../chunks/vidstack-6IDPYHAE.js";
import {
  isString,
  kebabToCamelCase
} from "../chunks/vidstack-LVHOI4SR.js";

// src/global/layouts/default.ts
var VidstackPlayerLayout = class {
  constructor(props) {
    this.props = props;
  }
  name = "vidstack";
  async load() {
    await import("../define/vidstack-player-default-layout.js");
    await import("../define/vidstack-player-ui.js");
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
};

// src/global/layouts/plyr.ts
var PlyrLayout = class {
  constructor(props) {
    this.props = props;
  }
  name = "plyr";
  async load() {
    await import("../define/plyr-layout.js");
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
};

// src/global/player.ts
var LAYOUT_LOADED = Symbol();
var VidstackPlayer = class {
  static async create({ target, layout, tracks, ...props }) {
    if (false) {
      throw Error("[vidstack] can not create player on server.");
    }
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
        const { MediaPosterElement } = await import("../chunks/vidstack-GVMO4KRO.js");
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
};
if (false) {
  VidstackPlayer.Layout = {
    Default: VidstackPlayerLayout,
    Plyr: PlyrLayout
  };
  window.VidstackPlayer = VidstackPlayer;
}
export {
  PlyrLayout,
  VidstackPlayer,
  VidstackPlayerLayout
};
