import { m as createContext, u as useContext } from './vidstack-CBNXqr3M.js';

const mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}
function useMediaState() {
  return useMediaContext().$state;
}

export { useMediaState as a, mediaContext as m, useMediaContext as u };
