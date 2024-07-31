import{a as c,b as g,c as y,d as s,e as C,f,i as E,j as h}from"./vidstack-SNXAP7US.js";import"./vidstack-V4LVW72O.js";import"./vidstack-KCALJS55.js";import{c as m}from"./vidstack-4NFGSJSE.js";import{a as p,c as l,r as d}from"./vidstack-BVGUAZHX.js";import{a as n}from"./vidstack-E3UITMP3.js";var v=class{name="google-cast";target;#e;get cast(){return C()}mediaType(){return"video"}canPlay(e){return l&&!p&&d(e)}async prompt(e){let t,o,r;try{t=await this.#r(e),this.#e||(this.#e=new cast.framework.RemotePlayer,new cast.framework.RemotePlayerController(this.#e)),o=e.player.createEvent("google-cast-prompt-open",{trigger:t}),e.player.dispatchEvent(o),this.#t(e,"connecting",o),await this.#a(n(e.$props.googleCast)),e.$state.remotePlaybackInfo.set({deviceName:f()?.getCastDevice().friendlyName}),s()&&this.#t(e,"connected",o)}catch(a){let i=a instanceof Error?a:this.#o((a+"").toUpperCase(),"Prompt failed.");throw r=e.player.createEvent("google-cast-prompt-error",{detail:i,trigger:o??t,cancelable:!0}),e.player.dispatch(r),this.#t(e,s()?"connected":"disconnected",r),i}finally{e.player.dispatch("google-cast-prompt-close",{trigger:r??o??t})}}async load(e){if(!this.#e)throw Error("[vidstack] google cast player was not initialized");return new(await import("../providers/vidstack-google-cast.js")).GoogleCastProvider(this.#e,e)}async#r(e){if(g())return;let t=e.player.createEvent("google-cast-load-start");e.player.dispatch(t),await m(c()),await customElements.whenDefined("google-cast-launcher");let o=e.player.createEvent("google-cast-loaded",{trigger:t});if(e.player.dispatch(o),!y())throw this.#o("CAST_NOT_AVAILABLE","Google Cast not available on this platform.");return o}async#a(e){this.#s(e);let t=await this.cast.requestSession();if(t)throw this.#o(t.toUpperCase(),h(t))}#s(e){this.cast?.setOptions({...E(),...e})}#t(e,t,o){let r={type:"google-cast",state:t};e.notify("remote-playback-change",r,o)}#o(e,t){let o=Error(t);return o.code=e,o}};export{v as GoogleCastLoader};
