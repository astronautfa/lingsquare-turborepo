import { n as isNull, b as isBoolean, i as isString, o as deferredPromise } from './vidstack-ND4uzLKO.js';
import { i as isAudioSrc, a as isVideoSrc } from './vidstack-Ca9dj_1Q.js';

function appendParamsToURL(baseUrl, params) {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(params)) {
    searchParams.set(key, params[key] + "");
  }
  return baseUrl + "?" + searchParams.toString();
}
function preconnect(url, rel = "preconnect") {
  const exists = document.querySelector(`link[href="${url}"]`);
  if (!isNull(exists))
    return true;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = url;
  link.crossOrigin = "true";
  document.head.append(link);
  return true;
}
const pendingRequests = {};
function loadScript(src) {
  if (pendingRequests[src])
    return pendingRequests[src].promise;
  const promise = deferredPromise(), exists = document.querySelector(`script[src="${src}"]`);
  if (!isNull(exists)) {
    promise.resolve();
    return promise.promise;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    promise.resolve();
    delete pendingRequests[src];
  };
  script.onerror = () => {
    promise.reject();
    delete pendingRequests[src];
  };
  setTimeout(() => document.head.append(script), 0);
  return promise.promise;
}
function getRequestCredentials(crossOrigin) {
  return crossOrigin === "use-credentials" ? "include" : isString(crossOrigin) ? "same-origin" : void 0;
}
function getDownloadFile({
  title,
  src,
  download
}) {
  const url = isBoolean(download) || download === "" ? src.src : isString(download) ? download : download?.url;
  if (!isValidFileDownload({ url, src, download }))
    return null;
  return {
    url,
    name: !isBoolean(download) && !isString(download) && download?.filename || title.toLowerCase() || "media"
  };
}
function isValidFileDownload({
  url,
  src,
  download
}) {
  return isString(url) && (download && download !== true || isAudioSrc(src) || isVideoSrc(src));
}

export { appendParamsToURL as a, getRequestCredentials as b, getDownloadFile as g, loadScript as l, preconnect as p };
