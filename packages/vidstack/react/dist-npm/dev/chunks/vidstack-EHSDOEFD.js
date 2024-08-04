import {
  SliderInstance
} from "./vidstack-CDYAPKDM.js";
import {
  sliderState
} from "./vidstack-ALARDIAR.js";
import {
  useSignal,
  useSignalRecord,
  useStateContext
} from "./vidstack-KAGOB6PR.js";

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
