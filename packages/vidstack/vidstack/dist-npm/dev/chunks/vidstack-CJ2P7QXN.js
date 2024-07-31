import {
  createContext,
  useContext
} from "./vidstack-LVHOI4SR.js";

// src/core/api/media-context.ts
var mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}
function useMediaState() {
  return useMediaContext().$state;
}

export {
  mediaContext,
  useMediaContext,
  useMediaState
};
