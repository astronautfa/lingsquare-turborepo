import { H as Host, g as effect, C as Component, f as signal, s as setAttribute, b as isBoolean, q as computed, i as isString, O as useState } from './vidstack-ND4uzLKO.js';
import { at as Captions, as as Gesture, J as MediaAnnouncer, K as Controls, U as GoogleCastButton, Q as ToggleButton, N as Tooltip, O as TooltipContent, af as MenuPortal, ak as ChaptersRadioGroup, an as AudioGainRadioGroup, aj as Radio, ai as RadioGroup, S as Slider, a4 as SliderVideo, a9 as AudioGainSlider, aa as SpeedSlider, ab as QualitySlider, ad as SliderChapters, a2 as sliderState } from './vidstack-Ga5LXVQf.js';
import { r as requestScopedAnimationFrame, i as isHTMLElement, c as cloneTemplateContent, a as createTemplate, f as cloneTemplate } from './vidstack-BNJih9gD.js';
import './vidstack-Ca9dj_1Q.js';
import './vidstack-pWEcRV_H.js';
import { C as ControlsGroup, T as TooltipTrigger } from './vidstack-CdyrXrBE.js';
import './vidstack-BmzHu3v_.js';
import { u as useMediaContext } from './vidstack-BuYg7N1V.js';
import { c as watchCueTextChange } from './vidstack-DpIrri-f.js';
import { h as html } from './vidstack-Nzpo6ock.js';
import { L as LitElement } from './vidstack-Do6-rxiG.js';
import { w as renderMenuItemsTemplate } from './vidstack-CiJ6cioV.js';

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
    this._media = useMediaContext();
  }
  onConnect() {
    effect(this._watchTitle.bind(this));
  }
  _watchTitle() {
    const { title } = this._media.$state;
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
    this._media = useMediaContext();
    this._chapterTitle = signal("");
  }
  onConnect() {
    const tracks = this._media.textTracks;
    watchCueTextChange(tracks, "chapters", this._chapterTitle.set);
    effect(this._watchChapterTitle.bind(this));
  }
  _watchChapterTitle() {
    const { defaultText } = this.$props;
    this.textContent = this._chapterTitle() || defaultText();
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
      if (!this.connectScope)
        return;
      const root = el.querySelector("svg"), track = root.firstElementChild, trackFill = track.nextElementSibling;
      effect(this._update.bind(this, root, track, trackFill));
    });
  }
  _update(root, track, trackFill) {
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
    this._media = useMediaContext();
  }
  onConnect() {
    effect(this._watchWhen.bind(this));
  }
  _watchWhen() {
    const root = this.firstElementChild, isTemplate = root?.localName === "template", when = this.$props.when(), matches = isBoolean(when) ? when : computed(() => when(this._media.player.state))();
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
          if (isString(value))
            return value;
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
      if (startEl)
        startEl.textContent = startTime;
      if (durationEl)
        durationEl.textContent = duration;
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
    this._video = this._createVideo();
  }
  static {
    this.tagName = "media-slider-video";
  }
  onSetup() {
    this._media = useMediaContext();
    this.$state.video.set(this._video);
  }
  onConnect() {
    const { canLoad } = this._media.$state, { src, crossOrigin } = this.$state;
    if (this._video.parentNode !== this) {
      this.prepend(this._video);
    }
    effect(() => {
      setAttribute(this._video, "crossorigin", crossOrigin());
      setAttribute(this._video, "preload", canLoad() ? "auto" : "none");
      setAttribute(this._video, "src", src());
    });
  }
  _createVideo() {
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
    this._template = null;
  }
  static {
    this.tagName = "media-slider-chapters";
  }
  onConnect() {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope)
        return;
      const template = this.querySelector("template");
      if (template) {
        this._template = template;
        effect(this._renderTemplate.bind(this));
      }
    });
  }
  _renderTemplate() {
    if (!this._template)
      return;
    const elements = cloneTemplate(this._template, this.cues.length || 1);
    this.setRefs(elements);
  }
}

class SliderSteps extends Component {
}
class MediaSliderStepsElement extends Host(HTMLElement, SliderSteps) {
  constructor() {
    super(...arguments);
    this._template = null;
  }
  static {
    this.tagName = "media-slider-steps";
  }
  onConnect(el) {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope)
        return;
      this._template = el.querySelector("template");
      if (this._template)
        effect(this._render.bind(this));
    });
  }
  _render() {
    if (!this._template)
      return;
    const { min, max, step } = useState(sliderState), steps = (max() - min()) / step();
    cloneTemplate(this._template, Math.floor(steps) + 1);
  }
}

export { MediaCaptionsElement as M, MediaGestureElement as a, MediaAnnouncerElement as b, MediaControlsElement as c, MediaControlsGroupElement as d, MediaTitleElement as e, MediaChapterTitleElement as f, MediaSpinnerElement as g, MediaLayoutElement as h, MediaGoogleCastButtonElement as i, MediaToggleButtonElement as j, MediaTooltipElement as k, MediaTooltipTriggerElement as l, MediaTooltipContentElement as m, MediaMenuPortalElement as n, MediaChaptersRadioGroupElement as o, MediaAudioGainRadioGroupElement as p, MediaRadioElement as q, MediaRadioGroupElement as r, MediaSliderElement as s, MediaSliderVideoElement as t, MediaAudioGainSliderElement as u, MediaSpeedSliderElement as v, MediaQualitySliderElement as w, MediaSliderChaptersElement as x, MediaSliderStepsElement as y };