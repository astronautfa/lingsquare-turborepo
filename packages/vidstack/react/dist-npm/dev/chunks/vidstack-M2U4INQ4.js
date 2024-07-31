import {
  SliderInstance
} from "./vidstack-MS2S7JW7.js";
import {
  sliderState
} from "./vidstack-DYAEZIDU.js";
import {
  useSignal,
  useSignalRecord,
  useStateContext
} from "./vidstack-3R7QJDRC.js";

// src/hooks/use-slider-state.ts
var sliderStateRecord = SliderInstance.state.record;
var initialSliderStore = Object.keys(sliderStateRecord).reduce(
  (store, prop) => ({
    ...store,
    [prop]() {
      return sliderStateRecord[prop];
    }
  }),
  {}
);
function useSliderState(prop, ref) {
  const $state = useStateContext(sliderState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useSliderState\` requires \`RefObject<SliderInstance>\` argument if called outside of a slider component`
    );
  }
  return useSignal((ref?.current?.$state || $state || initialSliderStore)[prop]);
}
function useSliderStore(ref) {
  const $state = useStateContext(sliderState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useSliderStore\` requires \`RefObject<SliderInstance>\` argument if called outside of a slider component`
    );
  }
  return useSignalRecord(ref?.current ? ref.current.$state : $state || initialSliderStore);
}

export {
  useSliderState,
  useSliderStore
};
