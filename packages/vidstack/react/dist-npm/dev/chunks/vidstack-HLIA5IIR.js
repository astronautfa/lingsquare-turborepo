import {
  IS_SERVER,
  isFunction,
  isString,
  isUndefined,
  waitTimeout
} from "./vidstack-3R7QJDRC.js";

// ../vidstack/src/utils/support.ts
var UA = IS_SERVER ? "" : navigator?.userAgent.toLowerCase() || "";
var IS_IOS = !IS_SERVER && /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
var IS_IPHONE = !IS_SERVER && /(iphone|ipod)/gi.test(navigator?.platform || "");
var IS_CHROME = !IS_SERVER && !!window.chrome;
var IS_IOS_CHROME = !IS_SERVER && /crios/i.test(UA);
var IS_SAFARI = !IS_SERVER && (!!window.safari || IS_IOS);
function canOrientScreen() {
  return canRotateScreen() && isFunction(screen.orientation.unlock);
}
function canRotateScreen() {
  return !IS_SERVER && !isUndefined(window.screen.orientation) && !isUndefined(window.screen.orientation.lock);
}
function canPlayAudioType(audio, type) {
  if (IS_SERVER) return false;
  if (!audio) audio = document.createElement("audio");
  return audio.canPlayType(type).length > 0;
}
function canPlayVideoType(video, type) {
  if (IS_SERVER) return false;
  if (!video) video = document.createElement("video");
  return video.canPlayType(type).length > 0;
}
function canPlayHLSNatively(video) {
  if (IS_SERVER) return false;
  if (!video) video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl").length > 0;
}
function canUsePictureInPicture(video) {
  if (IS_SERVER) return false;
  return !!document.pictureInPictureEnabled && !video?.disablePictureInPicture;
}
function canUseVideoPresentation(video) {
  if (IS_SERVER) return false;
  return isFunction(video?.webkitSupportsPresentationMode) && isFunction(video?.webkitSetPresentationMode);
}
async function canChangeVolume() {
  const video = document.createElement("video");
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return IS_SERVER ? void 0 : window?.ManagedMediaSource ?? window?.MediaSource ?? window?.WebKitMediaSource;
}
function getSourceBuffer() {
  return IS_SERVER ? void 0 : window?.SourceBuffer ?? window?.WebKitSourceBuffer;
}
function isHLSSupported() {
  if (IS_SERVER) return false;
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource)) return false;
  const isTypeSupported = MediaSource && isFunction(MediaSource.isTypeSupported) && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid = isUndefined(SourceBuffer) || !isUndefined(SourceBuffer.prototype) && isFunction(SourceBuffer.prototype.appendBuffer) && isFunction(SourceBuffer.prototype.remove);
  return !!isTypeSupported && !!isSourceBufferValid;
}
function isDASHSupported() {
  return isHLSSupported();
}

// ../vidstack/src/utils/mime.ts
var AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
var AUDIO_TYPES = /* @__PURE__ */ new Set([
  "audio/mpeg",
  "audio/ogg",
  "audio/3gp",
  "audio/mp3",
  "audio/webm",
  "audio/flac"
]);
var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
var VIDEO_TYPES = /* @__PURE__ */ new Set([
  "video/mp4",
  "video/webm",
  "video/3gp",
  "video/ogg",
  "video/avi",
  "video/mpeg"
]);
var HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
var DASH_VIDEO_EXTENSIONS = /\.(mpd)($|\?)/i;
var HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
  // Apple sanctioned
  "application/vnd.apple.mpegurl",
  // Apple sanctioned for backwards compatibility
  "audio/mpegurl",
  // Very common
  "audio/x-mpegurl",
  // Very common
  "application/x-mpegurl",
  // Included for completeness
  "video/x-mpegurl",
  "video/mpegurl",
  "application/mpegurl"
]);
var DASH_VIDEO_TYPES = /* @__PURE__ */ new Set(["application/dash+xml"]);
function isAudioSrc({ src, type }) {
  return isString(src) ? AUDIO_EXTENSIONS.test(src) || AUDIO_TYPES.has(type) || src.startsWith("blob:") && type === "audio/object" : type === "audio/object";
}
function isVideoSrc(src) {
  return isString(src.src) ? VIDEO_EXTENSIONS.test(src.src) || VIDEO_TYPES.has(src.type) || src.src.startsWith("blob:") && src.type === "video/object" || isHLSSrc(src) && (IS_SERVER || canPlayHLSNatively()) : src.type === "video/object";
}
function isHLSSrc({ src, type }) {
  return isString(src) && HLS_VIDEO_EXTENSIONS.test(src) || HLS_VIDEO_TYPES.has(type);
}
function isDASHSrc({ src, type }) {
  return isString(src) && DASH_VIDEO_EXTENSIONS.test(src) || DASH_VIDEO_TYPES.has(type);
}
function canGoogleCastSrc(src) {
  return isString(src.src) && (isAudioSrc(src) || isVideoSrc(src) || isHLSSrc(src));
}
function isMediaStream(src) {
  return !IS_SERVER && typeof window.MediaStream !== "undefined" && src instanceof window.MediaStream;
}

export {
  IS_IOS,
  IS_IPHONE,
  IS_CHROME,
  IS_SAFARI,
  canOrientScreen,
  canRotateScreen,
  canPlayAudioType,
  canPlayVideoType,
  canPlayHLSNatively,
  canUsePictureInPicture,
  canUseVideoPresentation,
  canChangeVolume,
  isHLSSupported,
  isDASHSupported,
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  HLS_VIDEO_EXTENSIONS,
  DASH_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  DASH_VIDEO_TYPES,
  isAudioSrc,
  isVideoSrc,
  isHLSSrc,
  isDASHSrc,
  canGoogleCastSrc,
  isMediaStream
};
