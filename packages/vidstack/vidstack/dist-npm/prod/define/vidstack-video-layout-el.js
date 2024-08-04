import { q as computed, f as signal, g as effect, y as camelToKebabCase, H as Host } from '../chunks/vidstack-CBNXqr3M.js';
import { D as DefaultLayout, u as useDefaultLayoutContext, a as DefaultAnnouncer, b as DefaultCaptions, m as DefaultControlsSpacer, e as DefaultTimeSlider, d as DefaultPlayButton, g as DefaultVolumePopup, r as DefaultTimeInfo, t as DefaultTitle, h as DefaultCaptionButton, j as DefaultAirPlayButton, v as DefaultGoogleCastButton, i as DefaultDownloadButton, w as DefaultPIPButton, x as DefaultFullscreenButton, k as DefaultChaptersMenu, l as DefaultSettingsMenu, s as setLayoutName, p as createMenuContainer, q as DefaultLayoutIconsLoader } from '../chunks/vidstack-C8Ugzd03.js';
import { u as useMediaContext, a as useMediaState } from '../chunks/vidstack-DoOTQiYD.js';
import { $ as $signal, S as SlotManager } from '../chunks/vidstack-_f_0FzgB.js';
import { L as LitElement } from '../chunks/vidstack-rsZGrNIW.js';
import { x, i } from '../chunks/vidstack-Bf6opHxk.js';
import { e as createSlot } from '../chunks/vidstack-C5IKOUzO.js';
import '../chunks/vidstack-DopyK5ml.js';
import '../chunks/vidstack-VrKElWm_.js';
import '../chunks/vidstack-DlGT_9qi.js';
import '../chunks/vidstack-THZVvA_p.js';
import '../chunks/vidstack-BTmcG2zk.js';
import '../chunks/vidstack-MhieM_9o.js';
import '../chunks/vidstack-CSaHpIQV.js';

class DefaultVideoLayout extends DefaultLayout {
  static {
    this.props = {
      ...super.props,
      when: ({ viewType }) => viewType === "video",
      smallWhen: ({ width, height }) => width < 576 || height < 380
    };
  }
}

function DefaultKeyboardDisplay() {
  return $signal(() => {
    const media = useMediaContext(), { noKeyboardAnimations, userPrefersKeyboardAnimations } = useDefaultLayoutContext(), $disabled = computed(() => noKeyboardAnimations() || !userPrefersKeyboardAnimations());
    if ($disabled()) {
      return null;
    }
    const visible = signal(false), { lastKeyboardAction } = media.$state;
    effect(() => {
      visible.set(!!lastKeyboardAction());
      const id = setTimeout(() => visible.set(false), 500);
      return () => {
        visible.set(false);
        window.clearTimeout(id);
      };
    });
    const $actionDataAttr = computed(() => {
      const action = lastKeyboardAction()?.action;
      return action && visible() ? camelToKebabCase(action) : null;
    });
    const $classList = computed(() => `vds-kb-action${!visible() ? " hidden" : ""}`), $text = computed(getText), $iconSlot = computed(() => {
      const name = getIconName();
      return name ? createSlot(name) : null;
    });
    function Icon() {
      const $slot = $iconSlot();
      if (!$slot)
        return null;
      return x`
        <div class="vds-kb-bezel">
          <div class="vds-kb-icon">${$slot}</div>
        </div>
      `;
    }
    return x`
      <div class=${$signal($classList)} data-action=${$signal($actionDataAttr)}>
        <div class="vds-kb-text-wrapper">
          <div class="vds-kb-text">${$signal($text)}</div>
        </div>
        ${$signal(() => i(lastKeyboardAction(), Icon()))}
      </div>
    `;
  });
}
function getText() {
  const { $state } = useMediaContext(), action = $state.lastKeyboardAction()?.action, audioGain = $state.audioGain() ?? 1;
  switch (action) {
    case "toggleMuted":
      return $state.muted() ? "0%" : getVolumeText($state.volume(), audioGain);
    case "volumeUp":
    case "volumeDown":
      return getVolumeText($state.volume(), audioGain);
    default:
      return "";
  }
}
function getVolumeText(volume, gain) {
  return `${Math.round(volume * gain * 100)}%`;
}
function getIconName() {
  const { $state } = useMediaContext(), action = $state.lastKeyboardAction()?.action;
  switch (action) {
    case "togglePaused":
      return !$state.paused() ? "kb-play-icon" : "kb-pause-icon";
    case "toggleMuted":
      return $state.muted() || $state.volume() === 0 ? "kb-mute-icon" : $state.volume() >= 0.5 ? "kb-volume-up-icon" : "kb-volume-down-icon";
    case "toggleFullscreen":
      return `kb-fs-${$state.fullscreen() ? "enter" : "exit"}-icon`;
    case "togglePictureInPicture":
      return `kb-pip-${$state.pictureInPicture() ? "enter" : "exit"}-icon`;
    case "toggleCaptions":
      return $state.hasCaptions() ? `kb-cc-${$state.textTrack() ? "on" : "off"}-icon` : null;
    case "volumeUp":
      return "kb-volume-up-icon";
    case "volumeDown":
      return "kb-volume-down-icon";
    case "seekForward":
      return "kb-seek-forward-icon";
    case "seekBackward":
      return "kb-seek-backward-icon";
    default:
      return null;
  }
}

function DefaultVideoLayoutLarge() {
  return [
    DefaultAnnouncer(),
    DefaultVideoGestures(),
    DefaultBufferingIndicator(),
    DefaultKeyboardDisplay(),
    DefaultCaptions(),
    x`<div class="vds-scrim"></div>`,
    x`
      <media-controls class="vds-controls">
        ${[
      DefaultControlsGroupTop(),
      DefaultControlsSpacer(),
      x`<media-controls-group class="vds-controls-group"></media-controls-group>`,
      DefaultControlsSpacer(),
      x`
            <media-controls-group class="vds-controls-group">
              ${DefaultTimeSlider()}
            </media-controls-group>
          `,
      x`
            <media-controls-group class="vds-controls-group">
              ${[
        DefaultPlayButton({ tooltip: "top start" }),
        DefaultVolumePopup({ orientation: "horizontal", tooltip: "top" }),
        DefaultTimeInfo(),
        DefaultTitle(),
        DefaultCaptionButton({ tooltip: "top" }),
        DefaultBottomMenuGroup(),
        DefaultAirPlayButton({ tooltip: "top" }),
        DefaultGoogleCastButton({ tooltip: "top" }),
        DefaultDownloadButton(),
        DefaultPIPButton(),
        DefaultFullscreenButton({ tooltip: "top end" })
      ]}
            </media-controls-group>
          `
    ]}
      </media-controls>
    `
  ];
}
function DefaultBottomMenuGroup() {
  return $signal(() => {
    const { menuGroup } = useDefaultLayoutContext();
    return menuGroup() === "bottom" ? DefaultVideoMenus() : null;
  });
}
function DefaultControlsGroupTop() {
  return x`
    <media-controls-group class="vds-controls-group">
      ${$signal(() => {
    const { menuGroup } = useDefaultLayoutContext();
    return menuGroup() === "top" ? [DefaultControlsSpacer(), DefaultVideoMenus()] : null;
  })}
    </media-controls-group>
  `;
}
function DefaultVideoLayoutSmall() {
  return [
    DefaultAnnouncer(),
    DefaultVideoGestures(),
    DefaultBufferingIndicator(),
    DefaultCaptions(),
    DefaultKeyboardDisplay(),
    x`<div class="vds-scrim"></div>`,
    x`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[
      DefaultAirPlayButton({ tooltip: "top start" }),
      DefaultGoogleCastButton({ tooltip: "bottom start" }),
      DefaultControlsSpacer(),
      DefaultCaptionButton({ tooltip: "bottom" }),
      DefaultDownloadButton(),
      DefaultVideoMenus(),
      DefaultVolumePopup({ orientation: "vertical", tooltip: "bottom end" })
    ]}
        </media-controls-group>

        ${DefaultControlsSpacer()}

        <media-controls-group class="vds-controls-group" style="pointer-events: none;">
          ${[
      DefaultControlsSpacer(),
      DefaultPlayButton({ tooltip: "top" }),
      DefaultControlsSpacer()
    ]}
        </media-controls-group>

        ${DefaultControlsSpacer()}

        <media-controls-group class="vds-controls-group">
          ${[DefaultTimeInfo(), DefaultTitle(), DefaultFullscreenButton({ tooltip: "top end" })]}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${DefaultTimeSlider()}
        </media-controls-group>
      </media-controls>
    `,
    StartDuration()
  ];
}
function DefaultVideoLoadLayout() {
  return x`
    <div class="vds-load-container">
      ${[DefaultBufferingIndicator(), DefaultPlayButton({ tooltip: "top" })]}
    </div>
  `;
}
function StartDuration() {
  return $signal(() => {
    const { duration } = useMediaState();
    if (duration() === 0)
      return null;
    return x`
      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    `;
  });
}
function DefaultBufferingIndicator() {
  return x`
    <div class="vds-buffering-indicator">
      <media-spinner class="vds-buffering-spinner"></media-spinner>
    </div>
  `;
}
function DefaultVideoMenus() {
  const { menuGroup, smallWhen: smWhen } = useDefaultLayoutContext(), $side = () => menuGroup() === "top" || smWhen() ? "bottom" : "top", $tooltip = computed(() => `${$side()} ${menuGroup() === "top" ? "end" : "center"}`), $placement = computed(() => `${$side()} end`);
  return [
    DefaultChaptersMenu({ tooltip: $tooltip, placement: $placement, portal: true }),
    DefaultSettingsMenu({ tooltip: $tooltip, placement: $placement, portal: true })
  ];
}
function DefaultVideoGestures() {
  return $signal(() => {
    const { noGestures } = useDefaultLayoutContext();
    if (noGestures())
      return null;
    return x`
      <div class="vds-gestures">
        <media-gesture class="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="pointerup"
          action="toggle:controls"
        ></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="dblpointerup"
          action="toggle:fullscreen"
        ></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
      </div>
    `;
  });
}

class MediaVideoLayoutElement extends Host(LitElement, DefaultVideoLayout) {
  static {
    this.tagName = "media-video-layout";
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
    this.classList.add("vds-video-layout");
  }
  onConnect() {
    setLayoutName("video", () => this.isMatch);
    this.En();
  }
  render() {
    return $signal(this.Zm.bind(this));
  }
  En() {
    const { menuPortal } = useDefaultLayoutContext();
    effect(() => {
      if (!this.isMatch)
        return;
      const container = createMenuContainer(
        this.menuContainer,
        "vds-video-layout",
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
  Zm() {
    const { load } = this.a.$props, { canLoad, streamType, nativeControls } = this.a.$state;
    return !nativeControls() && this.isMatch ? load() === "play" && !canLoad() ? DefaultVideoLoadLayout() : streamType() === "unknown" ? DefaultBufferingIndicator() : this.isSmallLayout ? DefaultVideoLayoutSmall() : DefaultVideoLayoutLarge() : null;
  }
}

export { MediaVideoLayoutElement };