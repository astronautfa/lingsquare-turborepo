import { A as isFunction, h as isUndefined, N as waitTimeout, i as isString } from './vidstack-ND4uzLKO.js';

const UA = navigator?.userAgent.toLowerCase() || "";
const IS_IOS = /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
const IS_IPHONE = /(iphone|ipod)/gi.test(navigator?.platform || "");
const IS_CHROME = !!window.chrome;
const IS_SAFARI = !!window.safari || IS_IOS;
function canOrientScreen() {
  return canRotateScreen() && isFunction(screen.orientation.unlock);
}
function canRotateScreen() {
  return !isUndefined(window.screen.orientation) && !isUndefined(window.screen.orientation.lock);
}
function canPlayAudioType(audio, type) {
  if (!audio)
    audio = document.createElement("audio");
  return audio.canPlayType(type).length > 0;
}
function canPlayVideoType(video, type) {
  if (!video)
    video = document.createElement("video");
  return video.canPlayType(type).length > 0;
}
function canPlayHLSNatively(video) {
  if (!video)
    video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl").length > 0;
}
function canUsePictureInPicture(video) {
  return !!document.pictureInPictureEnabled && !video?.disablePictureInPicture;
}
function canUseVideoPresentation(video) {
  return isFunction(video?.webkitSupportsPresentationMode) && isFunction(video?.webkitSetPresentationMode);
}
async function canChangeVolume() {
  const video = document.createElement("video");
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return window?.ManagedMediaSource ?? window?.MediaSource ?? window?.WebKitMediaSource;
}
function getSourceBuffer() {
  return window?.SourceBuffer ?? window?.WebKitSourceBuffer;
}
function isHLSSupported() {
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource))
    return false;
  const isTypeSupported = MediaSource && isFunction(MediaSource.isTypeSupported) && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid = isUndefined(SourceBuffer) || !isUndefined(SourceBuffer.prototype) && isFunction(SourceBuffer.prototype.appendBuffer) && isFunction(SourceBuffer.prototype.remove);
  return !!isTypeSupported && !!isSourceBufferValid;
}
function isDASHSupported() {
  return isHLSSupported();
}

const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
const AUDIO_TYPES = /* @__PURE__ */ new Set([
  "audio/mpeg",
  "audio/ogg",
  "audio/3gp",
  "audio/mp4",
  "audio/webm",
  "audio/flac"
]);
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
const VIDEO_TYPES = /* @__PURE__ */ new Set([
  "video/mp4",
  "video/webm",
  "video/3gp",
  "video/ogg",
  "video/avi",
  "video/mpeg"
]);
const HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
const DASH_VIDEO_EXTENSIONS = /\.(mpd)($|\?)/i;
const HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
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
const DASH_VIDEO_TYPES = /* @__PURE__ */ new Set(["application/dash+xml"]);
function isAudioSrc({ src, type }) {
  return isString(src) ? AUDIO_EXTENSIONS.test(src) || AUDIO_TYPES.has(type) || src.startsWith("blob:") && type === "audio/object" : type === "audio/object";
}
function isVideoSrc(src) {
  return isString(src.src) ? VIDEO_EXTENSIONS.test(src.src) || VIDEO_TYPES.has(src.type) || src.src.startsWith("blob:") && src.type === "video/object" || isHLSSrc(src) && canPlayHLSNatively() : src.type === "video/object";
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
  return typeof window.MediaStream !== "undefined" && src instanceof window.MediaStream;
}

export { AUDIO_EXTENSIONS as A, DASH_VIDEO_EXTENSIONS as D, HLS_VIDEO_EXTENSIONS as H, IS_CHROME as I, VIDEO_EXTENSIONS as V, isVideoSrc as a, IS_IOS as b, canPlayVideoType as c, canGoogleCastSrc as d, canChangeVolume as e, canOrientScreen as f, canPlayHLSNatively as g, canUsePictureInPicture as h, isAudioSrc as i, canUseVideoPresentation as j, canRotateScreen as k, AUDIO_TYPES as l, VIDEO_TYPES as m, HLS_VIDEO_TYPES as n, DASH_VIDEO_TYPES as o, isHLSSrc as p, isDASHSrc as q, isMediaStream as r, isHLSSupported as s, canPlayAudioType as t, isDASHSupported as u, IS_IPHONE as v, IS_SAFARI as w };