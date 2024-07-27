import { signal, effect, toggleClass, Host, listenEvent } from '../chunks/vidstack-fG_Sx3Q9.js';
import { DefaultLayout, DefaultAnnouncer, DefaultCaptions, DefaultSeekButton, DefaultPlayButton, DefaultTimeSlider, DefaultTimeInvert, DefaultVolumePopup, DefaultCaptionButton, DefaultDownloadButton, DefaultAirPlayButton, DefaultChaptersMenu, DefaultSettingsMenu, useDefaultLayoutContext, DefaultControlsSpacer, i18n, DefaultChapterTitle, setLayoutName, createMenuContainer, DefaultLayoutIconsLoader } from '../chunks/vidstack-zYKny8qk.js';
import { useMediaContext, useMediaState } from '../chunks/vidstack-DQ4Fz5gz.js';
import { useTransitionActive, useResizeObserver, isHTMLElement } from '../chunks/vidstack-DdUZGy1h.js';
import { $signal, SlotManager } from '../chunks/vidstack--haiOhLb.js';
import { LitElement } from '../chunks/vidstack-D2YigfqZ.js';
import { html } from 'lit-html';
import { ref } from 'lit-html/directives/ref.js';
import '../chunks/vidstack-C_9SlM6s.js';
import '../chunks/vidstack-BOTZD4tC.js';
import 'lit-html/directives/if-defined.js';
import '../chunks/vidstack-n2fuk8wF.js';
import '../chunks/vidstack-C7y2WK8R.js';
import '@floating-ui/dom';
import 'lit-html/directives/unsafe-svg.js';
import 'lit-html/async-directive.js';

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
  _setupWatchScrubbing() {
    const { pointer } = this._media.$state;
    effect(() => {
      if (pointer() !== "coarse") return;
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
    if (!hasTimeSlider) return;
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
