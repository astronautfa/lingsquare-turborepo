function a(e,t){return[...e].sort(t?o:i)}function i(e,t){return e.height===t.height?(e.bitrate??0)-(t.bitrate??0):e.height-t.height}function o(e,t){return t.height===e.height?(t.bitrate??0)-(e.bitrate??0):t.height-e.height}function r(e){return e?"true":"false"}function l(e){return()=>r(e())}export{a,l as b};
