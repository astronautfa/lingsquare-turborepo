import { f as signal, g as effect, L as toggleClass, H as Host, l as listenEvent } from '../chunks/vidstack-CBNXqr3M.js';
import { D as DefaultLayout, a as DefaultAnnouncer, b as DefaultCaptions, c as DefaultSeekButton, d as DefaultPlayButton, e as DefaultTimeSlider, f as DefaultTimeInvert, g as DefaultVolumePopup, h as DefaultCaptionButton, i as DefaultDownloadButton, j as DefaultAirPlayButton, k as DefaultChaptersMenu, l as DefaultSettingsMenu, u as useDefaultLayoutContext, m as DefaultControlsSpacer, n as i18n, o as DefaultChapterTitle, s as setLayoutName, p as createMenuContainer, q as DefaultLayoutIconsLoader } from '../chunks/vidstack-C8Ugzd03.js';
import { u as useMediaContext, a as useMediaState } from '../chunks/vidstack-DoOTQiYD.js';
import { u as useTransitionActive, d as useResizeObserver, i as isHTMLElement } from '../chunks/vidstack-C5IKOUzO.js';
import { $ as $signal, S as SlotManager } from '../chunks/vidstack-_f_0FzgB.js';
import { L as LitElement } from '../chunks/vidstack-rsZGrNIW.js';
import { x, n } from '../chunks/vidstack-Bf6opHxk.js';
import '../chunks/vidstack-DopyK5ml.js';
import '../chunks/vidstack-VrKElWm_.js';
import '../chunks/vidstack-DlGT_9qi.js';
import '../chunks/vidstack-THZVvA_p.js';
import '../chunks/vidstack-BTmcG2zk.js';
import '../chunks/vidstack-MhieM_9o.js';
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
    x`
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
      return x`
        <span class="vds-title-text">
          ${$signal($title)}${$signal(() => $isContinued() ? DefaultChapterTitle() : null)}
        </span>
      `;
    }
    useResizeObserver($ref, onResize);
    return title() ? x`
          <span class="vds-title" title=${$signal($title)} ${n($ref.set)}>
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
    this.en = signal(false);
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
    this.a = useMediaContext();
    this.classList.add("vds-audio-layout");
    this.Fn();
  }
  onConnect() {
    setLayoutName("audio", () => this.isMatch);
    this.En();
  }
  render() {
    return $signal(this.Zm.bind(this));
  }
  Zm() {
    return this.isMatch ? DefaultAudioLayout() : null;
  }
  En() {
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
  Fn() {
    const { pointer } = this.a.$state;
    effect(() => {
      if (pointer() !== "coarse")
        return;
      effect(this.rn.bind(this));
    });
  }
  rn() {
    if (!this.en()) {
      listenEvent(this, "pointerdown", this.sn.bind(this), { capture: true });
      return;
    }
    listenEvent(this, "pointerdown", (e) => e.stopPropagation());
    listenEvent(window, "pointerdown", this.tn.bind(this));
  }
  sn(event) {
    const { target } = event, hasTimeSlider = !!(isHTMLElement(target) && target.closest(".vds-time-slider"));
    if (!hasTimeSlider)
      return;
    event.stopImmediatePropagation();
    this.setAttribute("data-scrubbing", "");
    this.en.set(true);
  }
  tn() {
    this.en.set(false);
    this.removeAttribute("data-scrubbing");
  }
}

export { MediaAudioLayoutElement };
