import { Host, effect, Component, signal, setAttribute, isBoolean, computed, isString, useState } from './vidstack-C6myozhB.js';
import { Captions, Gesture, MediaAnnouncer, Controls, ControlsGroup, GoogleCastButton, ToggleButton, Tooltip, TooltipTrigger, TooltipContent, ChaptersRadioGroup, AudioGainRadioGroup, Radio, RadioGroup, SliderVideo, AudioGainSlider, SpeedSlider, QualitySlider, SliderChapters } from './vidstack-izWupyUY.js';
import { useMediaContext } from './vidstack-Cq-GdDcp.js';
import { watchCueTextChange } from './vidstack-D2w309v1.js';
import { html } from 'lit-html';
import { requestScopedAnimationFrame, isHTMLElement, cloneTemplateContent, createTemplate, cloneTemplate } from './vidstack-BeyDmEgV.js';
import { LitElement } from './vidstack-D2YigfqZ.js';
import { MenuPortal, Slider, sliderState } from './vidstack-DVw4uMVF.js';
import { renderMenuItemsTemplate } from './vidstack-C3OxMpRj.js';

class MediaCaptionsElement extends Host(HTMLElement, Captions) {
  static {
    this.tagName = "media-captions";
  }
}

class MediaGestureElement extends Host(HTMLElement, Gesture) {
  static {
    this.tagName = "media-gesture";
  }
}

class MediaAnnouncerElement extends Host(HTMLElement, MediaAnnouncer) {
  static {
    this.tagName = "media-announcer";
  }
}

class MediaControlsElement extends Host(HTMLElement, Controls) {
  static {
    this.tagName = "media-controls";
  }
}

class MediaControlsGroupElement extends Host(HTMLElement, ControlsGroup) {
  static {
    this.tagName = "media-controls-group";
  }
}

class Title extends Component {
}
class MediaTitleElement extends Host(HTMLElement, Title) {
  static {
    this.tagName = "media-title";
  }
  onSetup() {
    this.a = useMediaContext();
  }
  onConnect() {
    effect(this.td.bind(this));
  }
  td() {
    const { title } = this.a.$state;
    this.textContent = title();
  }
}

class ChapterTitle extends Component {
  static {
    this.props = {
      defaultText: ""
    };
  }
}
class MediaChapterTitleElement extends Host(HTMLElement, ChapterTitle) {
  static {
    this.tagName = "media-chapter-title";
  }
  onSetup() {
    this.a = useMediaContext();
    this.bn = signal("");
  }
  onConnect() {
    const tracks = this.a.textTracks;
    watchCueTextChange(tracks, "chapters", this.bn.set);
    effect(this.pn.bind(this));
  }
  pn() {
    const { defaultText } = this.$props;
    this.textContent = this.bn() || defaultText();
  }
}

class Spinner extends Component {
  static {
    this.props = {
      size: 96,
      trackWidth: 8,
      fillPercent: 50
    };
  }
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      const root = el.querySelector("svg"), track = root.firstElementChild, trackFill = track.nextElementSibling;
      effect(this.Ha.bind(this, root, track, trackFill));
    });
  }
  Ha(root, track, trackFill) {
    const { size, trackWidth, fillPercent } = this.$props;
    setAttribute(root, "width", size());
    setAttribute(root, "height", size());
    setAttribute(track, "stroke-width", trackWidth());
    setAttribute(trackFill, "stroke-width", trackWidth());
    setAttribute(trackFill, "stroke-dashoffset", 100 - fillPercent());
  }
}
class MediaSpinnerElement extends Host(LitElement, Spinner) {
  static {
    this.tagName = "media-spinner";
  }
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
}

class MediaLayout extends Component {
  static {
    this.props = {
      when: false
    };
  }
}
class MediaLayoutElement extends Host(HTMLElement, MediaLayout) {
  static {
    this.tagName = "media-layout";
  }
  onSetup() {
    this.a = useMediaContext();
  }
  onConnect() {
    effect(this.qn.bind(this));
  }
  qn() {
    const root = this.firstElementChild, isTemplate = root?.localName === "template", when = this.$props.when(), matches = isBoolean(when) ? when : computed(() => when(this.a.player.state))();
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
}

class MediaGoogleCastButtonElement extends Host(HTMLElement, GoogleCastButton) {
  static {
    this.tagName = "media-google-cast-button";
  }
}

class MediaToggleButtonElement extends Host(HTMLElement, ToggleButton) {
  static {
    this.tagName = "media-toggle-button";
  }
}

class MediaTooltipElement extends Host(HTMLElement, Tooltip) {
  static {
    this.tagName = "media-tooltip";
  }
}

class MediaTooltipTriggerElement extends Host(HTMLElement, TooltipTrigger) {
  static {
    this.tagName = "media-tooltip-trigger";
  }
  onConnect() {
    this.style.display = "contents";
  }
}

class MediaTooltipContentElement extends Host(HTMLElement, TooltipContent) {
  static {
    this.tagName = "media-tooltip-content";
  }
}

class MediaMenuPortalElement extends Host(HTMLElement, MenuPortal) {
  static {
    this.tagName = "media-menu-portal";
  }
  static {
    this.attrs = {
      disabled: {
        converter(value) {
          if (isString(value)) return value;
          return value !== null;
        }
      }
    };
  }
}

class MediaChaptersRadioGroupElement extends Host(HTMLElement, ChaptersRadioGroup) {
  static {
    this.tagName = "media-chapters-radio-group";
  }
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
}

class MediaAudioGainRadioGroupElement extends Host(HTMLElement, AudioGainRadioGroup) {
  static {
    this.tagName = "media-audio-gain-radio-group";
  }
  onConnect() {
    renderMenuItemsTemplate(this);
  }
}

class MediaRadioElement extends Host(HTMLElement, Radio) {
  static {
    this.tagName = "media-radio";
  }
}

class MediaRadioGroupElement extends Host(HTMLElement, RadioGroup) {
  static {
    this.tagName = "media-radio-group";
  }
}

class MediaSliderElement extends Host(HTMLElement, Slider) {
  static {
    this.tagName = "media-slider";
  }
}

const videoTemplate = /* @__PURE__ */ createTemplate(
  `<video muted playsinline preload="none" style="max-width: unset;"></video>`
);
class MediaSliderVideoElement extends Host(HTMLElement, SliderVideo) {
  constructor() {
    super(...arguments);
    this.m = this.an();
  }
  static {
    this.tagName = "media-slider-video";
  }
  onSetup() {
    this.a = useMediaContext();
    this.$state.video.set(this.m);
  }
  onConnect() {
    const { canLoad } = this.a.$state, { src, crossOrigin } = this.$state;
    if (this.m.parentNode !== this) {
      this.prepend(this.m);
    }
    effect(() => {
      setAttribute(this.m, "crossorigin", crossOrigin());
      setAttribute(this.m, "preload", canLoad() ? "auto" : "none");
      setAttribute(this.m, "src", src());
    });
  }
  an() {
    return cloneTemplateContent(videoTemplate);
  }
}

class MediaAudioGainSliderElement extends Host(HTMLElement, AudioGainSlider) {
  static {
    this.tagName = "media-audio-gain-slider";
  }
}

class MediaSpeedSliderElement extends Host(HTMLElement, SpeedSlider) {
  static {
    this.tagName = "media-speed-slider";
  }
}

class MediaQualitySliderElement extends Host(HTMLElement, QualitySlider) {
  static {
    this.tagName = "media-quality-slider";
  }
}

class MediaSliderChaptersElement extends Host(HTMLElement, SliderChapters) {
  constructor() {
    super(...arguments);
    this.Ym = null;
  }
  static {
    this.tagName = "media-slider-chapters";
  }
  onConnect() {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      const template = this.querySelector("template");
      if (template) {
        this.Ym = template;
        effect(this.un.bind(this));
      }
    });
  }
  un() {
    if (!this.Ym) return;
    const elements = cloneTemplate(this.Ym, this.cues.length || 1);
    this.setRefs(elements);
  }
}

class SliderSteps extends Component {
}
class MediaSliderStepsElement extends Host(HTMLElement, SliderSteps) {
  constructor() {
    super(...arguments);
    this.Ym = null;
  }
  static {
    this.tagName = "media-slider-steps";
  }
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      this.Ym = el.querySelector("template");
      if (this.Ym) effect(this.Zm.bind(this));
    });
  }
  Zm() {
    if (!this.Ym) return;
    const { min, max, step } = useState(sliderState), steps = (max() - min()) / step();
    cloneTemplate(this.Ym, Math.floor(steps) + 1);
  }
}

export { MediaAnnouncerElement, MediaAudioGainRadioGroupElement, MediaAudioGainSliderElement, MediaCaptionsElement, MediaChapterTitleElement, MediaChaptersRadioGroupElement, MediaControlsElement, MediaControlsGroupElement, MediaGestureElement, MediaGoogleCastButtonElement, MediaLayoutElement, MediaMenuPortalElement, MediaQualitySliderElement, MediaRadioElement, MediaRadioGroupElement, MediaSliderChaptersElement, MediaSliderElement, MediaSliderStepsElement, MediaSliderVideoElement, MediaSpeedSliderElement, MediaSpinnerElement, MediaTitleElement, MediaToggleButtonElement, MediaTooltipContentElement, MediaTooltipElement, MediaTooltipTriggerElement };
