import{fa as u,ka as o,m as r,q as i,s as n}from"./vidstack-7GZB5QIO.js";var c=o?"":navigator?.userAgent.toLowerCase()||"",l=!o&&/iphone|ipad|ipod|ios|crios|fxios/i.test(c),H=!o&&/(iphone|ipod)/gi.test(navigator?.platform||""),V=!o&&!!window.chrome,A=!o&&/crios/i.test(c),N=!o&&(!!window.safari||l);function D(){return _()&&n(screen.orientation.unlock)}function _(){return!o&&!r(window.screen.orientation)&&!r(window.screen.orientation.lock)}function L(e,t){return o?!1:(e||(e=document.createElement("audio")),e.canPlayType(t).length>0)}function I(e,t){return o?!1:(e||(e=document.createElement("video")),e.canPlayType(t).length>0)}function p(e){return o?!1:(e||(e=document.createElement("video")),e.canPlayType("application/vnd.apple.mpegurl").length>0)}function R(e){return o?!1:!!document.pictureInPictureEnabled&&!e?.disablePictureInPicture}function B(e){return o?!1:n(e?.webkitSupportsPresentationMode)&&n(e?.webkitSetPresentationMode)}async function U(){let e=document.createElement("video");return e.volume=.5,await u(0),e.volume===.5}function f(){return o?void 0:window?.ManagedMediaSource??window?.MediaSource??window?.WebKitMediaSource}function m(){return o?void 0:window?.SourceBuffer??window?.WebKitSourceBuffer}function S(){if(o)return!1;let e=f();if(r(e))return!1;let t=e&&n(e.isTypeSupported)&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),a=m(),s=r(a)||!r(a.prototype)&&n(a.prototype.appendBuffer)&&n(a.prototype.remove);return!!t&&!!s}function k(){return S()}var w=/\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i,x=new Set(["audio/mpeg","audio/ogg","audio/3gp","audio/mp3","audio/webm","audio/flac"]),g=/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,b=new Set(["video/mp4","video/webm","video/3gp","video/ogg","video/avi","video/mpeg"]),E=/\.(m3u8)($|\?)/i,v=/\.(mpd)($|\?)/i,y=new Set(["application/vnd.apple.mpegurl","audio/mpegurl","audio/x-mpegurl","application/x-mpegurl","video/x-mpegurl","video/mpegurl","application/mpegurl"]),M=new Set(["application/dash+xml"]);function T({src:e,type:t}){return i(e)?w.test(e)||x.has(t)||e.startsWith("blob:")&&t==="audio/object":t==="audio/object"}function P(e){return i(e.src)?g.test(e.src)||b.has(e.type)||e.src.startsWith("blob:")&&e.type==="video/object"||d(e)&&(o||p()):e.type==="video/object"}function d({src:e,type:t}){return i(e)&&E.test(e)||y.has(t)}function Y({src:e,type:t}){return i(e)&&v.test(e)||M.has(t)}function $(e){return i(e.src)&&(T(e)||P(e)||d(e))}function F(e){return!o&&typeof window.MediaStream<"u"&&e instanceof window.MediaStream}export{l as a,H as b,V as c,N as d,D as e,_ as f,L as g,I as h,p as i,R as j,B as k,U as l,S as m,k as n,w as o,x as p,g as q,b as r,E as s,v as t,y as u,M as v,T as w,P as x,d as y,Y as z,$ as A,F as B};
