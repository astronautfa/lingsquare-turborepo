import { H as Host, g as effect, s as setAttribute, i as isString, O as useState, a1 as BOOLEAN } from './vidstack-CBNXqr3M.js';
import { T as Thumbnail, at as Time, Q as AirPlayButton, W as CaptionButton, X as FullscreenButton, a0 as LiveButton, Z as MuteButton, _ as PIPButton, U as PlayButton, $ as SeekButton, ak as AudioRadioGroup, an as CaptionsRadioGroup, ad as Menu, M as MenuButton, ag as MenuItems, ap as SpeedRadioGroup, aq as QualityRadioGroup, S as Slider, a4 as SliderValue, ab as TimeSlider, a5 as SliderPreview, a7 as VolumeSlider } from './vidstack-Dv7HWUBr.js';
import { c as cloneTemplateContent, a as createTemplate, r as requestScopedAnimationFrame, f as cloneTemplate } from './vidstack-C5IKOUzO.js';
import './vidstack-DlGT_9qi.js';
import './vidstack-DuqfpSxk.js';
import { M as MenuItem } from './vidstack-CysHdt3L.js';
import { u as useMediaContext } from './vidstack-DoOTQiYD.js';

const imgTemplate = /* @__PURE__ */ createTemplate(
  '<img loading="eager" decoding="async" aria-hidden="true">'
);
class MediaThumbnailElement extends Host(HTMLElement, Thumbnail) {
  constructor() {
    super(...arguments);
    this.Wm = this.nn();
  }
  static {
    this.tagName = "media-thumbnail";
  }
  static {
    this.attrs = {
      crossOrigin: "crossorigin"
    };
  }
  onSetup() {
    this.a = useMediaContext();
    this.$state.img.set(this.Wm);
  }
  onConnect() {
    const { src, crossOrigin } = this.$state;
    if (this.Wm.parentNode !== this) {
      this.prepend(this.Wm);
    }
    effect(() => {
      setAttribute(this.Wm, "src", src());
      setAttribute(this.Wm, "crossorigin", crossOrigin());
    });
  }
  nn() {
    return cloneTemplateContent(imgTemplate);
  }
}

class MediaTimeElement extends Host(HTMLElement, Time) {
  static {
    this.tagName = "media-time";
  }
  onConnect() {
    effect(() => {
      this.textContent = this.$state.timeText();
    });
  }
}

class MediaAirPlayButtonElement extends Host(HTMLElement, AirPlayButton) {
  static {
    this.tagName = "media-airplay-button";
  }
}

class MediaCaptionButtonElement extends Host(HTMLElement, CaptionButton) {
  static {
    this.tagName = "media-caption-button";
  }
}

class MediaFullscreenButtonElement extends Host(HTMLElement, FullscreenButton) {
  static {
    this.tagName = "media-fullscreen-button";
  }
}

class MediaLiveButtonElement extends Host(HTMLElement, LiveButton) {
  static {
    this.tagName = "media-live-button";
  }
}

class MediaMuteButtonElement extends Host(HTMLElement, MuteButton) {
  static {
    this.tagName = "media-mute-button";
  }
}

class MediaPIPButtonElement extends Host(HTMLElement, PIPButton) {
  static {
    this.tagName = "media-pip-button";
  }
}

class MediaPlayButtonElement extends Host(HTMLElement, PlayButton) {
  static {
    this.tagName = "media-play-button";
  }
}

class MediaSeekButtonElement extends Host(HTMLElement, SeekButton) {
  static {
    this.tagName = "media-seek-button";
  }
}

function renderMenuItemsTemplate(el, onCreate) {
  requestScopedAnimationFrame(() => {
    if (!el.connectScope)
      return;
    const template = el.querySelector("template");
    if (!template)
      return;
    effect(() => {
      const options = el.getOptions();
      cloneTemplate(template, options.length, (radio, i) => {
        const { label, value } = options[i], labelEl = radio.querySelector(`[data-part="label"]`);
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
        onCreate?.(radio, options[i], i);
      });
    });
  });
}

class MediaAudioRadioGroupElement extends Host(HTMLElement, AudioRadioGroup) {
  static {
    this.tagName = "media-audio-radio-group";
  }
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaCaptionsRadioGroupElement extends Host(HTMLElement, CaptionsRadioGroup) {
  static {
    this.tagName = "media-captions-radio-group";
  }
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaMenuElement extends Host(HTMLElement, Menu) {
  static {
    this.tagName = "media-menu";
  }
}

class MediaMenuButtonElement extends Host(HTMLElement, MenuButton) {
  static {
    this.tagName = "media-menu-button";
  }
}

class MediaMenuItemElement extends Host(HTMLElement, MenuItem) {
  static {
    this.tagName = "media-menu-item";
  }
}

class MediaMenuItemsElement extends Host(HTMLElement, MenuItems) {
  static {
    this.tagName = "media-menu-items";
  }
}

class MediaSpeedRadioGroupElement extends Host(HTMLElement, SpeedRadioGroup) {
  static {
    this.tagName = "media-speed-radio-group";
  }
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaQualityRadioGroupElement extends Host(HTMLElement, QualityRadioGroup) {
  static {
    this.tagName = "media-quality-radio-group";
  }
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
}

class MediaSliderThumbnailElement extends MediaThumbnailElement {
  static {
    this.tagName = "media-slider-thumbnail";
  }
  onSetup() {
    super.onSetup();
    this.ia = useState(Slider.state);
  }
  onConnect() {
    super.onConnect();
    effect(this.Yh.bind(this));
  }
  Yh() {
    const { duration, clipStartTime } = this.a.$state;
    this.time = clipStartTime() + this.ia.pointerRate() * duration();
  }
}

class MediaSliderValueElement extends Host(HTMLElement, SliderValue) {
  static {
    this.tagName = "media-slider-value";
  }
  static {
    this.attrs = {
      padMinutes: {
        converter: BOOLEAN
      }
    };
  }
  onConnect() {
    effect(() => {
      this.textContent = this.getValueText();
    });
  }
}

class MediaTimeSliderElement extends Host(HTMLElement, TimeSlider) {
  static {
    this.tagName = "media-time-slider";
  }
}

class MediaSliderPreviewElement extends Host(HTMLElement, SliderPreview) {
  static {
    this.tagName = "media-slider-preview";
  }
}

class MediaVolumeSliderElement extends Host(HTMLElement, VolumeSlider) {
  static {
    this.tagName = "media-volume-slider";
  }
}

export { MediaThumbnailElement as M, MediaTimeElement as a, MediaAirPlayButtonElement as b, MediaCaptionButtonElement as c, MediaFullscreenButtonElement as d, MediaLiveButtonElement as e, MediaMuteButtonElement as f, MediaPIPButtonElement as g, MediaPlayButtonElement as h, MediaSeekButtonElement as i, MediaAudioRadioGroupElement as j, MediaCaptionsRadioGroupElement as k, MediaMenuElement as l, MediaMenuButtonElement as m, MediaMenuItemElement as n, MediaMenuItemsElement as o, MediaSpeedRadioGroupElement as p, MediaQualityRadioGroupElement as q, MediaSliderThumbnailElement as r, MediaSliderValueElement as s, MediaTimeSliderElement as t, MediaSliderPreviewElement as u, MediaVolumeSliderElement as v, renderMenuItemsTemplate as w };
