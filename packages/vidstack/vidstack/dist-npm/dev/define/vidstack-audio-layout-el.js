import { f as signal, g as effect, L as toggleClass, H as Host, l as listenEvent } from '../chunks/vidstack-ND4uzLKO.js';
import { D as DefaultLayout, a as DefaultAnnouncer, b as DefaultCaptions, c as DefaultSeekButton, d as DefaultPlayButton, e as DefaultTimeSlider, f as DefaultTimeInvert, g as DefaultVolumePopup, h as DefaultCaptionButton, i as DefaultDownloadButton, j as DefaultAirPlayButton, k as DefaultChaptersMenu, l as DefaultSettingsMenu, u as useDefaultLayoutContext, m as DefaultControlsSpacer, n as i18n, o as DefaultChapterTitle, s as setLayoutName, p as createMenuContainer, q as DefaultLayoutIconsLoader } from '../chunks/vidstack-BJZC6GZv.js';
import { u as useMediaContext, a as useMediaState } from '../chunks/vidstack-BuYg7N1V.js';
import { u as useTransitionActive, d as useResizeObserver, i as isHTMLElement } from '../chunks/vidstack-BNJih9gD.js';
import { $ as $signal, S as SlotManager } from '../chunks/vidstack-m43RuAVk.js';
import { L as LitElement } from '../chunks/vidstack-Do6-rxiG.js';
import { h as html, a as ref } from '../chunks/vidstack-Nzpo6ock.js';
import '../chunks/vidstack-BmzHu3v_.js';
import '../chunks/vidstack-CnaYRoc3.js';
import '../chunks/vidstack-Ca9dj_1Q.js';
import '../chunks/vidstack-DpIrri-f.js';
import '../chunks/vidstack-CkfyfBu0.js';
import '../chunks/vidstack-sLaeyx8c.js';
import '../chunks/vidstack-CSaHpIQV.js';

let DefaultAudioLayout$1 = class DefaultAudioLayout extends DefaultLayout {
  static {
    this.props = {
      ...super.props,
      when: ({ viewType }) => viewType === "audio",
      smallWhen: ({ width }) => width < 576
    };
  }
};

function DefaultAudioLayout() {
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
        media.player.el?.focus();
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

class MediaAudioLayoutElement extends Host(LitElement, DefaultAudioLayout$1) {
  constructor() {
    super(...arguments);
    this._scrubbing = signal(false);
  }
  static {
    this.tagName = "media-audio-layout";
  }
  static {
    this.attrs = {
      smallWhen: {
        converter(value) {
          return value !== "never" && !!value;
        }
      }
    };
  }
  onSetup() {
    this.forwardKeepAlive = false;
    this._media = useMediaContext();
    this.classList.add("vds-audio-layout");
    this._setupWatchScrubbing();
  }
  onConnect() {
    setLayoutName("audio", () => this.isMatch);
    this._setupMenuContainer();
  }
  render() {
    return $signal(this._render.bind(this));
  }
  _render() {
    return this.isMatch ? DefaultAudioLayout() : null;
  }
  _setupMenuContainer() {
    const { menuPortal } = useDefaultLayoutContext();
    effect(() => {
      if (!this.isMatch)
        return;
      const container = createMenuContainer(
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
  _setupWatchScrubbing() {
    const { pointer } = this._media.$state;
    effect(() => {
      if (pointer() !== "coarse")
        return;
      effect(this._watchScrubbing.bind(this));
    });
  }
  _watchScrubbing() {
    if (!this._scrubbing()) {
      listenEvent(this, "pointerdown", this._onStartScrubbing.bind(this), { capture: true });
      return;
    }
    listenEvent(this, "pointerdown", (e) => e.stopPropagation());
    listenEvent(window, "pointerdown", this._onStopScrubbing.bind(this));
  }
  _onStartScrubbing(event) {
    const { target } = event, hasTimeSlider = !!(isHTMLElement(target) && target.closest(".vds-time-slider"));
    if (!hasTimeSlider)
      return;
    event.stopImmediatePropagation();
    this.setAttribute("data-scrubbing", "");
    this._scrubbing.set(true);
  }
  _onStopScrubbing() {
    this._scrubbing.set(false);
    this.removeAttribute("data-scrubbing");
  }
}

export { MediaAudioLayoutElement };
