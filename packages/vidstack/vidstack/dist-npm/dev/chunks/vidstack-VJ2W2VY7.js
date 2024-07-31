import {
  AudioGainRadioGroup,
  AudioGainSlider,
  Captions,
  ChaptersRadioGroup,
  Controls,
  ControlsGroup,
  Gesture,
  GoogleCastButton,
  MediaAnnouncer,
  QualitySlider,
  Radio,
  RadioGroup,
  SliderChapters,
  SliderVideo,
  SpeedSlider,
  ToggleButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "./vidstack-VL7WHI4N.js";
import {
  renderMenuItemsTemplate
} from "./vidstack-TXCXMLDW.js";
import {
  MenuPortal,
  Slider,
  sliderState
} from "./vidstack-JNPTXWVG.js";
import {
  LitElement
} from "./vidstack-NVUZDSNN.js";
import {
  Host
} from "./vidstack-F4GL2AHS.js";
import {
  useMediaContext
} from "./vidstack-CJ2P7QXN.js";
import {
  cloneTemplate,
  cloneTemplateContent,
  createTemplate,
  isHTMLElement,
  requestScopedAnimationFrame
} from "./vidstack-365DTKRX.js";
import {
  watchCueTextChange
} from "./vidstack-QXGC5JTS.js";
import {
  Component,
  computed,
  effect,
  isBoolean,
  isString,
  setAttribute,
  signal,
  useState
} from "./vidstack-LVHOI4SR.js";

// src/elements/define/captions-element.ts
var MediaCaptionsElement = class extends Host(HTMLElement, Captions) {
  static tagName = "media-captions";
};

// src/elements/define/gesture-element.ts
var MediaGestureElement = class extends Host(HTMLElement, Gesture) {
  static tagName = "media-gesture";
};

// src/elements/define/announcer-element.ts
var MediaAnnouncerElement = class extends Host(HTMLElement, MediaAnnouncer) {
  static tagName = "media-announcer";
};

// src/elements/define/controls-element.ts
var MediaControlsElement = class extends Host(HTMLElement, Controls) {
  static tagName = "media-controls";
};

// src/elements/define/controls-group-element.ts
var MediaControlsGroupElement = class extends Host(HTMLElement, ControlsGroup) {
  static tagName = "media-controls-group";
};

// src/elements/define/title-element.ts
var Title = class extends Component {
};
var MediaTitleElement = class extends Host(HTMLElement, Title) {
  static tagName = "media-title";
  #media;
  onSetup() {
    this.#media = useMediaContext();
  }
  onConnect() {
    effect(this.#watchTitle.bind(this));
  }
  #watchTitle() {
    const { title } = this.#media.$state;
    this.textContent = title();
  }
};

// src/elements/define/chapter-title-element.ts
var ChapterTitle = class extends Component {
  static props = {
    defaultText: ""
  };
};
var MediaChapterTitleElement = class extends Host(HTMLElement, ChapterTitle) {
  static tagName = "media-chapter-title";
  #media;
  #chapterTitle;
  onSetup() {
    this.#media = useMediaContext();
    this.#chapterTitle = signal("");
  }
  onConnect() {
    const tracks = this.#media.textTracks;
    watchCueTextChange(tracks, "chapters", this.#chapterTitle.set);
    effect(this.#watchChapterTitle.bind(this));
  }
  #watchChapterTitle() {
    const { defaultText } = this.$props;
    this.textContent = this.#chapterTitle() || defaultText();
  }
};

// src/elements/define/spinner-element.ts
import { html } from "lit-html";
var Spinner = class extends Component {
  static props = {
    size: 96,
    trackWidth: 8,
    fillPercent: 50
  };
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      const root = el.querySelector("svg"), track = root.firstElementChild, trackFill = track.nextElementSibling;
      effect(this.#update.bind(this, root, track, trackFill));
    });
  }
  #update(root, track, trackFill) {
    const { size, trackWidth, fillPercent } = this.$props;
    setAttribute(root, "width", size());
    setAttribute(root, "height", size());
    setAttribute(track, "stroke-width", trackWidth());
    setAttribute(trackFill, "stroke-width", trackWidth());
    setAttribute(trackFill, "stroke-dashoffset", 100 - fillPercent());
  }
};
var MediaSpinnerElement = class extends Host(LitElement, Spinner) {
  static tagName = "media-spinner";
  render() {
    return html`
      <svg fill="none" viewBox="0 0 120 120" aria-hidden="true" data-part="root">
        <circle cx="60" cy="60" r="54" stroke="currentColor" data-part="track"></circle>
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="currentColor"
          pathLength="100"
          stroke-dasharray="100"
          data-part="track-fill"
        ></circle>
      </svg>
    `;
  }
};

// src/elements/define/layouts/layout-element.ts
var MediaLayout = class extends Component {
  static props = {
    when: false
  };
};
var MediaLayoutElement = class extends Host(HTMLElement, MediaLayout) {
  static tagName = "media-layout";
  #media;
  onSetup() {
    this.#media = useMediaContext();
  }
  onConnect() {
    effect(this.#watchWhen.bind(this));
  }
  #watchWhen() {
    const root = this.firstElementChild, isTemplate = root?.localName === "template", when = this.$props.when(), matches = isBoolean(when) ? when : computed(() => when(this.#media.player.state))();
    if (!matches) {
      if (isTemplate) {
        this.textContent = "";
        this.appendChild(root);
      } else if (isHTMLElement(root)) {
        root.style.display = "none";
      }
      return;
    }
    if (isTemplate) {
      this.append(root.content.cloneNode(true));
    } else if (isHTMLElement(root)) {
      root.style.display = "";
    }
  }
};

// src/elements/define/buttons/google-cast-button-element.ts
var MediaGoogleCastButtonElement = class extends Host(HTMLElement, GoogleCastButton) {
  static tagName = "media-google-cast-button";
};

// src/elements/define/buttons/toggle-button-element.ts
var MediaToggleButtonElement = class extends Host(HTMLElement, ToggleButton) {
  static tagName = "media-toggle-button";
};

// src/elements/define/tooltips/tooltip-element.ts
var MediaTooltipElement = class extends Host(HTMLElement, Tooltip) {
  static tagName = "media-tooltip";
};

// src/elements/define/tooltips/tooltip-trigger-element.ts
var MediaTooltipTriggerElement = class extends Host(HTMLElement, TooltipTrigger) {
  static tagName = "media-tooltip-trigger";
  onConnect() {
    this.style.display = "contents";
  }
};

// src/elements/define/tooltips/tooltip-content-element.ts
var MediaTooltipContentElement = class extends Host(HTMLElement, TooltipContent) {
  static tagName = "media-tooltip-content";
};

// src/elements/define/menus/menu-portal-element.ts
var MediaMenuPortalElement = class extends Host(HTMLElement, MenuPortal) {
  static tagName = "media-menu-portal";
  static attrs = {
    disabled: {
      converter(value) {
        if (isString(value)) return value;
        return value !== null;
      }
    }
  };
};

// src/elements/define/menus/chapters-radio-group-element.ts
var MediaChaptersRadioGroupElement = class extends Host(HTMLElement, ChaptersRadioGroup) {
  static tagName = "media-chapters-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this, (el, option) => {
      const { cue, startTime, duration } = option, thumbnailEl = el.querySelector(".vds-thumbnail,media-thumbnail"), startEl = el.querySelector('[data-part="start-time"]'), durationEl = el.querySelector('[data-part="duration"]');
      if (startEl) startEl.textContent = startTime;
      if (durationEl) durationEl.textContent = duration;
      if (thumbnailEl) {
        thumbnailEl.setAttribute("time", cue.startTime + "");
        effect(() => {
          const thumbnails = this.$props.thumbnails();
          if ("src" in thumbnailEl) {
            thumbnailEl.src = thumbnails;
          } else if (isString(thumbnails)) {
            thumbnailEl.setAttribute("src", thumbnails);
          }
        });
      }
    });
  }
};

// src/elements/define/menus/audio-gain-group-element.ts
var MediaAudioGainRadioGroupElement = class extends Host(HTMLElement, AudioGainRadioGroup) {
  static tagName = "media-audio-gain-radio-group";
  onConnect() {
    renderMenuItemsTemplate(this);
  }
};

// src/elements/define/menus/radio-element.ts
var MediaRadioElement = class extends Host(HTMLElement, Radio) {
  static tagName = "media-radio";
};

// src/elements/define/menus/radio-group-element.ts
var MediaRadioGroupElement = class extends Host(HTMLElement, RadioGroup) {
  static tagName = "media-radio-group";
};

// src/elements/define/sliders/slider-element.ts
var MediaSliderElement = class extends Host(HTMLElement, Slider) {
  static tagName = "media-slider";
};

// src/elements/define/sliders/slider-video-element.ts
var videoTemplate = /* @__PURE__ */ createTemplate(
  `<video muted playsinline preload="none" style="max-width: unset;"></video>`
);
var MediaSliderVideoElement = class extends Host(HTMLElement, SliderVideo) {
  static tagName = "media-slider-video";
  #media;
  #video = this.#createVideo();
  onSetup() {
    this.#media = useMediaContext();
    this.$state.video.set(this.#video);
  }
  onConnect() {
    const { canLoad } = this.#media.$state, { src, crossOrigin } = this.$state;
    if (this.#video.parentNode !== this) {
      this.prepend(this.#video);
    }
    effect(() => {
      setAttribute(this.#video, "crossorigin", crossOrigin());
      setAttribute(this.#video, "preload", canLoad() ? "auto" : "none");
      setAttribute(this.#video, "src", src());
    });
  }
  #createVideo() {
    return cloneTemplateContent(videoTemplate);
  }
};

// src/elements/define/sliders/audio-gain-slider-element.ts
var MediaAudioGainSliderElement = class extends Host(HTMLElement, AudioGainSlider) {
  static tagName = "media-audio-gain-slider";
};

// src/elements/define/sliders/speed-slider-element.ts
var MediaSpeedSliderElement = class extends Host(HTMLElement, SpeedSlider) {
  static tagName = "media-speed-slider";
};

// src/elements/define/sliders/quality-slider-element.ts
var MediaQualitySliderElement = class extends Host(HTMLElement, QualitySlider) {
  static tagName = "media-quality-slider";
};

// src/elements/define/sliders/slider-chapters-element.ts
var MediaSliderChaptersElement = class extends Host(HTMLElement, SliderChapters) {
  static tagName = "media-slider-chapters";
  #template = null;
  onConnect() {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      const template = this.querySelector("template");
      if (template) {
        this.#template = template;
        effect(this.#renderTemplate.bind(this));
      }
    });
  }
  #renderTemplate() {
    if (!this.#template) return;
    const elements = cloneTemplate(this.#template, this.cues.length || 1);
    this.setRefs(elements);
  }
};

// src/elements/define/sliders/slider-steps-element.ts
var SliderSteps = class extends Component {
};
var MediaSliderStepsElement = class extends Host(HTMLElement, SliderSteps) {
  static tagName = "media-slider-steps";
  #template = null;
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      this.#template = el.querySelector("template");
      if (this.#template) effect(this.#render.bind(this));
    });
  }
  #render() {
    if (!this.#template) return;
    const { min, max, step } = useState(sliderState), steps = (max() - min()) / step();
    cloneTemplate(this.#template, Math.floor(steps) + 1);
  }
};

export {
  MediaCaptionsElement,
  MediaGestureElement,
  MediaAnnouncerElement,
  MediaControlsElement,
  MediaControlsGroupElement,
  MediaTitleElement,
  MediaChapterTitleElement,
  MediaSpinnerElement,
  MediaLayoutElement,
  MediaGoogleCastButtonElement,
  MediaToggleButtonElement,
  MediaTooltipElement,
  MediaTooltipTriggerElement,
  MediaTooltipContentElement,
  MediaMenuPortalElement,
  MediaChaptersRadioGroupElement,
  MediaAudioGainRadioGroupElement,
  MediaRadioElement,
  MediaRadioGroupElement,
  MediaSliderElement,
  MediaSliderVideoElement,
  MediaAudioGainSliderElement,
  MediaSpeedSliderElement,
  MediaQualitySliderElement,
  MediaSliderChaptersElement,
  MediaSliderStepsElement
};
