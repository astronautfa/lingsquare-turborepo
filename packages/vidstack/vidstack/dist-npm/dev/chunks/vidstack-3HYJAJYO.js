import {
  cloneTemplateContent,
  createTemplate
} from "./vidstack-365DTKRX.js";
import "./vidstack-M63U4DIJ.js";
import {
  effect
} from "./vidstack-LVHOI4SR.js";

// src/elements/define/provider-cast-display.ts
import chromecastIconPaths from "media-icons/dist/icons/chromecast.js";
var svgTemplate = /* @__PURE__ */ createTemplate(
  `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"></svg>`
);
function insertContent(container, $state) {
  const icon = cloneTemplateContent(svgTemplate);
  icon.innerHTML = chromecastIconPaths;
  container.append(icon);
  const text = document.createElement("span");
  text.classList.add("vds-google-cast-info");
  container.append(text);
  const deviceName = document.createElement("span");
  deviceName.classList.add("vds-google-cast-device-name");
  effect(() => {
    const { remotePlaybackInfo } = $state, info = remotePlaybackInfo();
    if (info?.deviceName) {
      deviceName.textContent = info.deviceName;
      text.append("Google Cast on ", deviceName);
    }
    return () => {
      text.textContent = "";
    };
  });
}
export {
  insertContent
};
