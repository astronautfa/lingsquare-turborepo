import {
  DefaultAirPlayButton,
  DefaultAnnouncer,
  DefaultCaptionButton,
  DefaultCaptions,
  DefaultChapterTitle,
  DefaultChaptersMenu,
  DefaultControlsSpacer,
  DefaultDownloadButton,
  DefaultLayout,
  DefaultLayoutIconsLoader,
  DefaultPlayButton,
  DefaultSeekButton,
  DefaultSettingsMenu,
  DefaultTimeInvert,
  DefaultTimeSlider,
  DefaultVolumePopup,
  createMenuContainer,
  i18n,
  setLayoutName,
  useDefaultLayoutContext
} from "./vidstack-FGQ4OQVN.js";
import {
  $signal,
  SlotManager
} from "./vidstack-FC53DJUH.js";
import {
  LitElement
} from "./vidstack-NVUZDSNN.js";
import {
  Host
} from "./vidstack-F4GL2AHS.js";
import {
  useMediaContext,
  useMediaState
} from "./vidstack-CJ2P7QXN.js";
import {
  isHTMLElement,
  useResizeObserver,
  useTransitionActive
} from "./vidstack-365DTKRX.js";
import {
  effect,
  listenEvent,
  signal,
  toggleClass
} from "./vidstack-LVHOI4SR.js";

// src/components/layouts/default/audio-layout.ts
var DefaultAudioLayout = class extends DefaultLayout {
  static props = {
    ...super.props,
    when: ({ viewType }) => viewType === "audio",
    smallWhen: ({ width }) => width < 576
  };
};

// src/elements/define/layouts/default/audio-layout.ts
import { html } from "lit-html";
import { ref } from "lit-html/directives/ref.js";
function DefaultAudioLayout2() {
  return [
    DefaultAnnouncer(),
    DefaultCaptions(),
    html`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[
      DefaultSeekButton({ backward: true, tooltip: "top start" }),
      DefaultPlayButton({ tooltip: "top" }),
      DefaultSeekButton({ tooltip: "top" }),
      DefaultAudioTitle(),
      DefaultTimeSlider(),
      DefaultTimeInvert(),
      DefaultVolumePopup({ orientation: "vertical", tooltip: "top" }),
      DefaultCaptionButton({ tooltip: "top" }),
      DefaultDownloadButton(),
      DefaultAirPlayButton({ tooltip: "top" }),
      DefaultAudioMenus()
    ]}
        </media-controls-group>
      </media-controls>
    `
  ];
}
function DefaultAudioTitle() {
  return $signal(() => {
    let $ref = signal(void 0), $isTextOverflowing = signal(false), media = useMediaContext(), { title, started, currentTime, ended } = useMediaState(), { translations } = useDefaultLayoutContext(), $isTransitionActive = useTransitionActive($ref), $isContinued = () => started() || currentTime() > 0;
    const $title = () => {
      const word = ended() ? "Replay" : $isContinued() ? "Continue" : "Play";
      return `${i18n(translations, word)}: ${title()}`;
    };
    effect(() => {
      if ($isTransitionActive() && document.activeElement === document.body) {
        media.player.el?.focus({ preventScroll: true });
      }
    });
    function onResize() {
      const el = $ref(), isOverflowing = !!el && !$isTransitionActive() && el.clientWidth < el.children[0].clientWidth;
      el && toggleClass(el, "vds-marquee", isOverflowing);
      $isTextOverflowing.set(isOverflowing);
    }
    function Title() {
      return html`
        <span class="vds-title-text">
          ${$signal($title)}${$signal(() => $isContinued() ? DefaultChapterTitle() : null)}
        </span>
      `;
    }
    useResizeObserver($ref, onResize);
    return title() ? html`
          <span class="vds-title" title=${$signal($title)} ${ref($ref.set)}>
            ${[
      Title(),
      $signal(() => $isTextOverflowing() && !$isTransitionActive() ? Title() : null)
    ]}
          </span>
        ` : DefaultControlsSpacer();
  });
}
function DefaultAudioMenus() {
  const placement = "top end";
  return [
    DefaultChaptersMenu({ tooltip: "top", placement, portal: true }),
    DefaultSettingsMenu({ tooltip: "top end", placement, portal: true })
  ];
}

// src/elements/define/layouts/default/audio-layout-element.ts
var MediaAudioLayoutElement = class extends Host(LitElement, DefaultAudioLayout) {
  static tagName = "media-audio-layout";
  static attrs = {
    smallWhen: {
      converter(value) {
        return value !== "never" && !!value;
      }
    }
  };
  #media;
  #scrubbing = signal(false);
  onSetup() {
    this.forwardKeepAlive = false;
    this.#media = useMediaContext();
    this.classList.add("vds-audio-layout");
    this.#setupWatchScrubbing();
  }
  onConnect() {
    setLayoutName("audio", () => this.isMatch);
    this.#setupMenuContainer();
  }
  render() {
    return $signal(this.#render.bind(this));
  }
  #render() {
    return this.isMatch ? DefaultAudioLayout2() : null;
  }
  #setupMenuContainer() {
    const { menuPortal } = useDefaultLayoutContext();
    effect(() => {
      if (!this.isMatch) return;
      const container = createMenuContainer(
        this,
        this.menuContainer,
        "vds-audio-layout",
        () => this.isSmallLayout
      ), roots = container ? [this, container] : [this];
      const iconsManager = this.$props.customIcons() ? new SlotManager(roots) : new DefaultLayoutIconsLoader(roots);
      iconsManager.connect();
      menuPortal.set(container);
      return () => {
        container.remove();
        menuPortal.set(null);
      };
    });
  }
  #setupWatchScrubbing() {
    const { pointer } = this.#media.$state;
    effect(() => {
      if (pointer() !== "coarse") return;
      effect(this.#watchScrubbing.bind(this));
    });
  }
  #watchScrubbing() {
    if (!this.#scrubbing()) {
      listenEvent(this, "pointerdown", this.#onStartScrubbing.bind(this), { capture: true });
      return;
    }
    listenEvent(this, "pointerdown", (e) => e.stopPropagation());
    listenEvent(window, "pointerdown", this.#onStopScrubbing.bind(this));
  }
  #onStartScrubbing(event) {
    const { target } = event, hasTimeSlider = !!(isHTMLElement(target) && target.closest(".vds-time-slider"));
    if (!hasTimeSlider) return;
    event.stopImmediatePropagation();
    this.setAttribute("data-scrubbing", "");
    this.#scrubbing.set(true);
  }
  #onStopScrubbing() {
    this.#scrubbing.set(false);
    this.removeAttribute("data-scrubbing");
  }
};

export {
  MediaAudioLayoutElement
};
