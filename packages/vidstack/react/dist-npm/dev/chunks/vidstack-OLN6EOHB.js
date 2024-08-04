import {
  useMediaContext
} from "./vidstack-QKZVTF5G.js";
import {
  MediaPlayerInstance
} from "./vidstack-CDYAPKDM.js";
import {
  DEFAULT_PLAYBACK_RATES,
  MediaRemoteControl,
  sortVideoQualities
} from "./vidstack-ALARDIAR.js";
import {
  isString,
  useSignal
} from "./vidstack-KAGOB6PR.js";

// src/hooks/use-media-remote.ts
import * as React from "react";
function useMediaRemote(target) {
  const media = useMediaContext(), remote = React.useRef();
  if (!remote.current) {
    remote.current = new MediaRemoteControl();
  }
  React.useEffect(() => {
    const ref = target && "current" in target ? target.current : target, isPlayerRef = ref instanceof MediaPlayerInstance, player = isPlayerRef ? ref : media?.player;
    remote.current.setPlayer(player ?? null);
    remote.current.setTarget(ref ?? null);
  }, [media, target && "current" in target ? target.current : target]);
  return remote.current;
}

// src/hooks/options/use-video-quality-options.ts
import * as React2 from "react";
function useVideoQualityOptions({
  auto = true,
  sort = "descending"
} = {}) {
  const media = useMediaContext(), { qualities, quality, autoQuality, canSetQuality } = media.$state, $qualities = useSignal(qualities);
  useSignal(quality);
  useSignal(autoQuality);
  useSignal(canSetQuality);
  return React2.useMemo(() => {
    const sortedQualities = sortVideoQualities($qualities, sort === "descending"), options = sortedQualities.map((q) => {
      return {
        quality: q,
        label: q.height + "p",
        value: getQualityValue(q),
        bitrateText: q.bitrate && q.bitrate > 0 ? `${(q.bitrate / 1e6).toFixed(2)} Mbps` : null,
        get selected() {
          return q === quality();
        },
        get autoSelected() {
          return autoQuality();
        },
        select(trigger) {
          const index = qualities().indexOf(q);
          if (index >= 0) media.remote.changeQuality(index, trigger);
        }
      };
    });
    if (auto) {
      options.unshift({
        quality: null,
        label: isString(auto) ? auto : "Auto",
        value: "auto",
        bitrateText: null,
        get selected() {
          return autoQuality();
        },
        get autoSelected() {
          return autoQuality();
        },
        select(trigger) {
          media.remote.requestAutoQuality(trigger);
        }
      });
    }
    Object.defineProperty(options, "disabled", {
      get() {
        return !canSetQuality() || $qualities.length <= 1;
      }
    });
    Object.defineProperty(options, "selectedQuality", {
      get() {
        return quality();
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        const $quality = quality();
        return !autoQuality() && $quality ? getQualityValue($quality) : "auto";
      }
    });
    return options;
  }, [$qualities, sort]);
}
function getQualityValue(quality) {
  return quality.height + "_" + quality.bitrate;
}

// src/hooks/options/use-playback-rate-options.ts
import * as React3 from "react";
function usePlaybackRateOptions({
  rates = DEFAULT_PLAYBACK_RATES,
  normalLabel = "Normal"
} = {}) {
  const media = useMediaContext(), { playbackRate, canSetPlaybackRate } = media.$state;
  useSignal(playbackRate);
  useSignal(canSetPlaybackRate);
  return React3.useMemo(() => {
    const options = rates.map((opt) => {
      const label = typeof opt === "number" ? opt === 1 && normalLabel ? normalLabel : opt + "x" : opt.label, rate = typeof opt === "number" ? opt : opt.rate;
      return {
        label,
        value: rate.toString(),
        rate,
        get selected() {
          return playbackRate() === rate;
        },
        select(trigger) {
          media.remote.changePlaybackRate(rate, trigger);
        }
      };
    });
    Object.defineProperty(options, "disabled", {
      get() {
        return !canSetPlaybackRate() || !options.length;
      }
    });
    Object.defineProperty(options, "selectedValue", {
      get() {
        return playbackRate().toString();
      }
    });
    return options;
  }, [rates]);
}

export {
  useMediaRemote,
  useVideoQualityOptions,
  usePlaybackRateOptions
};
