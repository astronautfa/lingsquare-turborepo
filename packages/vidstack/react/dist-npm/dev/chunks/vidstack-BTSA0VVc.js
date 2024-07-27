"use client"

import * as React from 'react';
import { M as MediaRemoteControl, h as MediaPlayerInstance, s as sortVideoQualities, D as DEFAULT_PLAYBACK_RATES } from './vidstack-DLTRlLRp.js';
import { a as useMediaContext } from './vidstack-dFkreRXo.js';
import { u as useSignal, i as isString } from './vidstack-DwBltyvo.js';

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

function useVideoQualityOptions({
  auto = true,
  sort = "descending"
} = {}) {
  const media = useMediaContext(), { qualities, quality, autoQuality, canSetQuality } = media.$state, $qualities = useSignal(qualities);
  useSignal(quality);
  useSignal(autoQuality);
  useSignal(canSetQuality);
  return React.useMemo(() => {
    const sortedQualities = sortVideoQualities($qualities, sort === "descending"), options = sortedQualities.map((_quality) => {
      return {
        quality: _quality,
        label: _quality.height + "p",
        value: getQualityValue(_quality),
        bitrateText: _quality.bitrate && _quality.bitrate > 0 ? `${(_quality.bitrate / 1e6).toFixed(2)} Mbps` : null,
        get selected() {
          return _quality === quality();
        },
        get autoSelected() {
          return autoQuality();
        },
        select(trigger) {
          const index = qualities().indexOf(_quality);
          if (index >= 0)
            media.remote.changeQuality(index, trigger);
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

function usePlaybackRateOptions({
  rates = DEFAULT_PLAYBACK_RATES,
  normalLabel = "Normal"
} = {}) {
  const media = useMediaContext(), { playbackRate, canSetPlaybackRate } = media.$state;
  useSignal(playbackRate);
  useSignal(canSetPlaybackRate);
  return React.useMemo(() => {
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

export { usePlaybackRateOptions as a, useVideoQualityOptions as b, useMediaRemote as u };
