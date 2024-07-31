import {
  AirPlayButton,
  AudioRadioGroup,
  CaptionButton,
  CaptionsRadioGroup,
  FullscreenButton,
  LiveButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MuteButton,
  PIPButton,
  PlayButton,
  QualityRadioGroup,
  SeekButton,
  Slider,
  SliderPreview,
  SliderValue,
  SpeedRadioGroup,
  Thumbnail,
  Time,
  TimeSlider,
  VolumeSlider
} from "./vidstack-JNPTXWVG.js";
import {
  BOOLEAN,
  Host
} from "./vidstack-F4GL2AHS.js";
import {
  useMediaContext
} from "./vidstack-CJ2P7QXN.js";
import {
  cloneTemplate,
  cloneTemplateContent,
  createTemplate,
  requestScopedAnimationFrame
} from "./vidstack-365DTKRX.js";
import {
  effect,
  isString,
  setAttribute,
  useState
} from "./vidstack-LVHOI4SR.js";

// src/elements/define/thumbnail-element.ts
var imgTemplate = /* @__PURE__ */ createTemplate(
  '<img loading="eager" decoding="async" aria-hidden="true">'
);
var MediaThumbnailElement = class extends Host(HTMLElement, Thumbnail) {
  static tagName = "media-thumbnail";
  static attrs = {
    crossOrigin: "crossorigin"
  };
  #media;
  #img = this.#createImg();
  onSetup() {
    this.#media = useMediaContext();
    this.$state.img.set(this.#img);
  }
  onConnect() {
    const { src, crossOrigin } = this.$state;
    if (this.#img.parentNode !== this) {
      this.prepend(this.#img);
    }
    effect(() => {
      setAttribute(this.#img, "src", src());
      setAttribute(this.#img, "crossorigin", crossOrigin());
    });
  }
  #createImg() {
    return cloneTemplateContent(imgTemplate);
  }
};

// src/elements/define/time-element.ts
var MediaTimeElement = class extends Host(HTMLElement, Time) {
  static tagName = "media-time";
  onConnect() {
    effect(() => {
      this.textContent = this.$state.timeText();
    });
  }
};

// src/elements/define/buttons/airplay-button-element.ts
var MediaAirPlayButtonElement = class extends Host(HTMLElement, AirPlayButton) {
  static tagName = "media-airplay-button";
};

// src/elements/define/buttons/caption-button-element.ts
var MediaCaptionButtonElement = class extends Host(HTMLElement, CaptionButton) {
  static tagName = "media-caption-button";
};

// src/elements/define/buttons/fullscreen-button-element.ts
var MediaFullscreenButtonElement = class extends Host(HTMLElement, FullscreenButton) {
  static tagName = "media-fullscreen-button";
};

// src/elements/define/buttons/live-button-element.ts
var MediaLiveButtonElement = class extends Host(HTMLElement, LiveButton) {
  static tagName = "media-live-button";
};

// src/elements/define/buttons/mute-button-element.ts
var MediaMuteButtonElement = class extends Host(HTMLElement, MuteButton) {
  static tagName = "media-mute-button";
};

// src/elements/define/buttons/pip-button-element.ts
var MediaPIPButtonElement = class extends Host(HTMLElement, PIPButton) {
  static tagName = "media-pip-button";
};

// src/elements/define/buttons/play-button-element.ts
var MediaPlayButtonElement = class extends Host(HTMLElement, PlayButton) {
  static tagName = "media-play-button";
};

// src/elements/define/buttons/seek-button-element.ts
var MediaSeekButtonElement = class extends Host(HTMLElement, SeekButton) {
  static tagName = "media-seek-button";
};

// src/elements/define/menus/_template.ts
function renderMenuItemsTemplate(el, onCreate) {
  requestScopedAnimationFrame(() => {
    if (!el.connectScope) return;
    const template = el.querySelector("template");
    if (!template) return;
    effect(() => {
      if (!template.content.firstElementChild?.localName && !template.firstElementChild) {
        throw Error("[vidstack] menu items template requires root element");
      }
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

// src/elements/define/menus/audio-radio-group-element.ts
var MediaAudioRadioGroupElement = class extends Host(HTMLElement, AudioRadioGroup) {
  static tagName = "media-audio-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/elements/define/menus/captions-radio-group-element.ts
var MediaCaptionsRadioGroupElement = class extends Host(HTMLElement, CaptionsRadioGroup) {
  static tagName = "media-captions-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/elements/define/menus/menu-element.ts
var MediaMenuElement = class extends Host(HTMLElement, Menu) {
  static tagName = "media-menu";
};

// src/elements/define/menus/menu-button-element.ts
var MediaMenuButtonElement = class extends Host(HTMLElement, MenuButton) {
  static tagName = "media-menu-button";
};

// src/elements/define/menus/menu-item-element.ts
var MediaMenuItemElement = class extends Host(HTMLElement, MenuItem) {
  static tagName = "media-menu-item";
};

// src/elements/define/menus/menu-items-element.ts
var MediaMenuItemsElement = class extends Host(HTMLElement, MenuItems) {
  static tagName = "media-menu-items";
};

// src/elements/define/menus/speed-radio-group-element.ts
var MediaSpeedRadioGroupElement = class extends Host(HTMLElement, SpeedRadioGroup) {
  static tagName = "media-speed-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/elements/define/menus/quality-radio-group-element.ts
var MediaQualityRadioGroupElement = class extends Host(HTMLElement, QualityRadioGroup) {
  static tagName = "media-quality-radio-group";
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
};

// src/elements/define/sliders/slider-thumbnail-element.ts
var MediaSliderThumbnailElement = class extends MediaThumbnailElement {
  static tagName = "media-slider-thumbnail";
  #media;
  #slider;
  onSetup() {
    super.onSetup();
    this.#media = useMediaContext();
    this.#slider = useState(Slider.state);
  }
  onConnect() {
    super.onConnect();
    effect(this.#watchTime.bind(this));
  }
  #watchTime() {
    const { duration, clipStartTime } = this.#media.$state;
    this.time = clipStartTime() + this.#slider.pointerRate() * duration();
  }
};

// src/elements/define/sliders/slider-value-element.ts
var MediaSliderValueElement = class extends Host(HTMLElement, SliderValue) {
  static tagName = "media-slider-value";
  static attrs = {
    padMinutes: {
      converter: BOOLEAN
    }
  };
  onConnect() {
    effect(() => {
      this.textContent = this.getValueText();
    });
  }
};

// src/elements/define/sliders/time-slider-element.ts
var MediaTimeSliderElement = class extends Host(HTMLElement, TimeSlider) {
  static tagName = "media-time-slider";
};

// src/elements/define/sliders/slider-preview-element.ts
var MediaSliderPreviewElement = class extends Host(HTMLElement, SliderPreview) {
  static tagName = "media-slider-preview";
};

// src/elements/define/sliders/volume-slider-element.ts
var MediaVolumeSliderElement = class extends Host(HTMLElement, VolumeSlider) {
  static tagName = "media-volume-slider";
};

export {
  MediaThumbnailElement,
  MediaTimeElement,
  MediaAirPlayButtonElement,
  MediaCaptionButtonElement,
  MediaFullscreenButtonElement,
  MediaLiveButtonElement,
  MediaMuteButtonElement,
  MediaPIPButtonElement,
  MediaPlayButtonElement,
  MediaSeekButtonElement,
  renderMenuItemsTemplate,
  MediaAudioRadioGroupElement,
  MediaCaptionsRadioGroupElement,
  MediaMenuElement,
  MediaMenuButtonElement,
  MediaMenuItemElement,
  MediaMenuItemsElement,
  MediaSpeedRadioGroupElement,
  MediaQualityRadioGroupElement,
  MediaSliderThumbnailElement,
  MediaSliderValueElement,
  MediaTimeSliderElement,
  MediaSliderPreviewElement,
  MediaVolumeSliderElement
};
