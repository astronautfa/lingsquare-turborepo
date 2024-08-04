import{a as D}from"./vidstack-TG43JJAT.js";import"./vidstack-5UDFHBMF.js";import{a as w}from"./vidstack-L2HWA44V.js";import{a as I}from"./vidstack-MDPL2QMH.js";import"./vidstack-YHRZY7KJ.js";import{a as v}from"./vidstack-5IOIYQ2Y.js";import{a as y,f as x}from"./vidstack-IMDQ4X5U.js";import{a as p}from"./vidstack-X63HW5FO.js";import{b as T,c as k}from"./vidstack-ARJ2AQF3.js";import{c as C,m as _}from"./vidstack-7FJQKULN.js";import{B as g,U as H,a as u,m,q as d,s as b,u as E,v as l}from"./vidstack-7GZB5QIO.js";import"./vidstack-L4FAE4B5.js";var V=o=>H(o),L=class{#e;#t;#i=null;#s=null;config={};#o=new Set;get instance(){return this.#i}constructor(t,i){this.#e=t,this.#t=i}setup(t){let{streamType:i}=this.#t.$state,e=u(i).includes("live"),r=u(i).includes("ll-");this.#i=new t({lowLatencyMode:r,backBufferLength:r?4:e?8:void 0,renderTextTracksNatively:!1,...this.config});let n=this.#c.bind(this);for(let s of Object.values(t.Events))this.#i.on(s,n);this.#i.on(t.Events.ERROR,this.#L.bind(this));for(let s of this.#o)s(this.#i);this.#t.player.dispatch("hls-instance",{detail:this.#i}),this.#i.attachMedia(this.#e),this.#i.on(t.Events.AUDIO_TRACK_SWITCHED,this.#h.bind(this)),this.#i.on(t.Events.LEVEL_SWITCHED,this.#u.bind(this)),this.#i.on(t.Events.LEVEL_LOADED,this.#p.bind(this)),this.#i.on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND,this.#d.bind(this)),this.#i.on(t.Events.CUES_PARSED,this.#l.bind(this)),this.#t.qualities[v.enableAuto]=this.#S.bind(this),g(this.#t.qualities,"change",this.#m.bind(this)),g(this.#t.audioTracks,"change",this.#g.bind(this)),this.#s=E(this.#n.bind(this))}#r(t,i){return new l(V(t),{detail:i})}#n(){if(!this.#t.$state.live())return;let t=new w(this.#a.bind(this));return t.start(),t.stop.bind(t)}#a(){this.#t.$state.liveSyncPosition.set(this.#i?.liveSyncPosition??1/0)}#c(t,i){this.#t.player?.dispatch(this.#r(t,i))}#d(t,i){let e=this.#r(t,i),r=-1;for(let n=0;n<i.tracks.length;n++){let s=i.tracks[n],c=s.subtitleTrack??s.closedCaptions,h=new x({id:`hls-${s.kind}-${n}`,src:c?.url,label:s.label,language:c?.lang,kind:s.kind,default:s.default});h[y.readyState]=2,h[y.onModeChange]=()=>{h.mode==="showing"?(this.#i.subtitleTrack=n,r=n):r===n&&(this.#i.subtitleTrack=-1,r=-1)},this.#t.textTracks.add(h,e)}}#l(t,i){let e=this.#i?.subtitleTrack,r=this.#t.textTracks.getById(`hls-${i.type}-${e}`);if(!r)return;let n=this.#r(t,i);for(let s of i.cues)s.positionAlign="auto",r.addCue(s,n)}#h(t,i){let e=this.#t.audioTracks[i.id];if(e){let r=this.#r(t,i);this.#t.audioTracks[p.select](e,!0,r)}}#u(t,i){let e=this.#t.qualities[i.level];if(e){let r=this.#r(t,i);this.#t.qualities[p.select](e,!0,r)}}#p(t,i){if(this.#t.$state.canPlay())return;let{type:e,live:r,totalduration:n,targetduration:s}=i.details,c=this.#r(t,i);this.#t.notify("stream-type-change",r?e==="EVENT"&&Number.isFinite(n)&&s>=10?"live:dvr":"live":"on-demand",c),this.#t.notify("duration-change",n,c);let h=this.#i.media;this.#i.currentLevel===-1&&this.#t.qualities[v.setAuto](!0,c);for(let a of this.#i.audioTracks){let S={id:a.id.toString(),label:a.name,language:a.lang||"",kind:"main"};this.#t.audioTracks[p.add](S,c)}for(let a of this.#i.levels){let S={id:a.id?.toString()??a.height+"p",width:a.width,height:a.height,codec:a.codecSet,bitrate:a.bitrate};this.#t.qualities[p.add](S,c)}h.dispatchEvent(new l("canplay",{trigger:c}))}#L(t,i){if(i.fatal)switch(i.type){case"mediaError":this.#i?.recoverMediaError();break;default:this.#f(i.error);break}}#f(t){this.#t.notify("error",{message:t.message,code:1,error:t})}#S(){this.#i&&(this.#i.currentLevel=-1)}#m(){let{qualities:t}=this.#t;!this.#i||t.auto||(this.#i[t.switch+"Level"]=t.selectedIndex,C&&(this.#e.currentTime=this.#e.currentTime))}#g(){let{audioTracks:t}=this.#t;this.#i&&this.#i.audioTrack!==t.selectedIndex&&(this.#i.audioTrack=t.selectedIndex)}onInstance(t){return this.#o.add(t),()=>this.#o.delete(t)}loadSource(t){d(t.src)&&this.#i?.loadSource(t.src)}destroy(){this.#i?.destroy(),this.#i=null,this.#s?.(),this.#s=null}};var f=class{#e;#t;#i;constructor(t,i,e){this.#e=t,this.#t=i,this.#i=e,this.#s()}async#s(){let t={onLoadStart:this.#o.bind(this),onLoaded:this.#r.bind(this),onLoadError:this.#n.bind(this)},i=await A(this.#e,t);if(m(i)&&!d(this.#e)&&(i=await R(this.#e,t)),!i)return null;if(!i.isSupported()){let e="[vidstack] `hls.js` is not supported in this environment";return this.#t.player.dispatch(new l("hls-unsupported")),this.#t.notify("error",{message:e,code:4}),null}return i}#o(){this.#t.player.dispatch(new l("hls-lib-load-start"))}#r(t){this.#t.player.dispatch(new l("hls-lib-loaded",{detail:t})),this.#i(t)}#n(t){let i=I(t);this.#t.player.dispatch(new l("hls-lib-load-error",{detail:i})),this.#t.notify("error",{message:i.message,code:4,error:i})}};async function R(o,t={}){if(!m(o)){if(t.onLoadStart?.(),o.prototype&&o.prototype!==Function)return t.onLoaded?.(o),o;try{let i=(await o())?.default;if(i&&i.isSupported)t.onLoaded?.(i);else throw Error("");return i}catch(i){t.onLoadError?.(i)}}}async function A(o,t={}){if(d(o)){t.onLoadStart?.();try{if(await k(o),!b(window.Hls))throw Error("");let i=window.Hls;return t.onLoaded?.(i),i}catch(i){t.onLoadError?.(i)}}}var $="https://cdn.jsdelivr.net",M=class extends D{$$PROVIDER_TYPE="HLS";#e=null;#t=new L(this.video,this.ctx);get ctor(){return this.#e}get instance(){return this.#t.instance}static supported=_();get type(){return"hls"}get canLiveSync(){return!0}#i=`${$}/npm/hls.js@^1.5.0/dist/hls.min.js`;get config(){return this.#t.config}set config(t){this.#t.config=t}get library(){return this.#i}set library(t){this.#i=t}preconnect(){d(this.#i)&&T(this.#i)}setup(){super.setup(),new f(this.#i,this.ctx,t=>{this.#e=t,this.#t.setup(t),this.ctx.notify("provider-setup",this);let i=u(this.ctx.$state.source);i&&this.loadSource(i)})}async loadSource(t,i){if(!d(t.src)){this.removeSource();return}this.media.preload=i||"",this.appendSource(t,"application/x-mpegurl"),this.#t.loadSource(t),this.currentSrc=t}onInstance(t){let i=this.#t.instance;return i&&t(i),this.#t.onInstance(t)}destroy(){this.#t.destroy()}};export{M as HLSProvider};
