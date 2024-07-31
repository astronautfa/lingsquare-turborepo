import{a as V}from"./vidstack-EZSRPPZM.js";import{a as $}from"./vidstack-S4PU3EFK.js";import{a as T}from"./vidstack-ZSHM5QYX.js";import{a as m,f as F}from"./vidstack-3NDWMYL6.js";import{b as I,c as R}from"./vidstack-GIOYWYZF.js";import"./vidstack-E6RN3UOU.js";import{a as P}from"./vidstack-TBIJQY3V.js";import{c as k,g as M,h as w,n as N}from"./vidstack-E7FJTJF3.js";import"./vidstack-ISJILNRC.js";import{a as p}from"./vidstack-D22ZK42Y.js";import{B as A,W as _,a as v,m as D,p as H,q as h,s as C,u as x,v as l}from"./vidstack-DK4Y24W7.js";import"./vidstack-JGGQ3EWW.js";function b(r){try{return new Intl.DisplayNames(navigator.languages,{type:"language"}).of(r)??null}catch{return null}}var U=r=>`dash-${_(r)}`,g=class{#i;#e;#t=null;#a=new Set;#n=null;config={};get instance(){return this.#t}constructor(t,e){this.#i=t,this.#e=e}setup(t){this.#t=t().create();let e=this.#f.bind(this);for(let s of Object.values(t.events))this.#t.on(s,e);this.#t.on(t.events.ERROR,this.#T.bind(this));for(let s of this.#a)s(this.#t);this.#e.player.dispatch("dash-instance",{detail:this.#t}),this.#t.initialize(this.#i,void 0,!1),this.#t.updateSettings({streaming:{text:{defaultEnabled:!1,dispatchForManualRendering:!0},buffer:{fastSwitchEnabled:!0}},...this.config}),this.#t.on(t.events.FRAGMENT_LOADING_STARTED,this.#b.bind(this)),this.#t.on(t.events.FRAGMENT_LOADING_COMPLETED,this.#E.bind(this)),this.#t.on(t.events.MANIFEST_LOADED,this.#A.bind(this)),this.#t.on(t.events.QUALITY_CHANGE_RENDERED,this.#D.bind(this)),this.#t.on(t.events.TEXT_TRACKS_ADDED,this.#y.bind(this)),this.#t.on(t.events.TRACK_CHANGE_RENDERED,this.#S.bind(this)),this.#e.qualities[T.enableAuto]=this.#v.bind(this),A(this.#e.qualities,"change",this.#H.bind(this)),A(this.#e.audioTracks,"change",this.#C.bind(this)),this.#n=x(this.#d.bind(this))}#s(t){return new l(U(t.type),{detail:t})}#d(){if(!this.#e.$state.live())return;let t=new P(this.#m.bind(this));return t.start(),t.stop.bind(t)}#m(){if(!this.#t)return;let t=this.#t.duration()-this.#t.time();this.#e.$state.liveSyncPosition.set(isNaN(t)?1/0:t)}#f(t){this.#e.player?.dispatch(this.#s(t))}#r=null;#c={};#g(t){let e=this.#r?.[m.native],s=(e?.track).cues;if(!e||!s)return;let n=this.#r.id,a=this.#c[n]??0,o=this.#s(t);for(let u=a;u<s.length;u++){let c=s[u];c.positionAlign||(c.positionAlign="auto"),this.#r.addCue(c,o)}this.#c[n]=s.length}#y(t){if(!this.#t)return;let e=t.tracks,s=[...this.#i.textTracks].filter(a=>"manualMode"in a),n=this.#s(t);for(let a=0;a<s.length;a++){let o=e[a],u=s[a],c=`dash-${o.kind}-${a}`,d=new F({id:c,label:o?.label??o.labels.find(S=>S.text)?.text??(o?.lang&&b(o.lang))??o?.lang??void 0,language:o.lang??void 0,kind:o.kind,default:o.defaultTrack});d[m.native]={managed:!0,track:u},d[m.readyState]=2,d[m.onModeChange]=()=>{this.#t&&(d.mode==="showing"?(this.#t.setTextTrack(a),this.#r=d):(this.#t.setTextTrack(-1),this.#r=null))},this.#e.textTracks.add(d,n)}}#S(t){let{mediaType:e,newMediaInfo:s}=t;if(e==="audio"){let n=this.#e.audioTracks.getById(`dash-audio-${s.index}`);if(n){let a=this.#s(t);this.#e.audioTracks[p.select](n,!0,a)}}}#D(t){if(t.mediaType!=="video")return;let e=this.#e.qualities[t.newQuality];if(e){let s=this.#s(t);this.#e.qualities[p.select](e,!0,s)}}#A(t){if(this.#e.$state.canPlay()||!this.#t)return;let{type:e,mediaPresentationDuration:s}=t.data,n=this.#s(t);this.#e.notify("stream-type-change",e!=="static"?"live":"on-demand",n),this.#e.notify("duration-change",s,n),this.#e.qualities[T.setAuto](!0,n);let a=this.#t.getVideoElement(),o=this.#t.getTracksForTypeFromManifest("video",t.data),u=[...new Set(o.map(i=>i.mimeType))].find(i=>i&&w(a,i)),c=o.filter(i=>u===i.mimeType)[0],d=this.#t.getTracksForTypeFromManifest("audio",t.data),S=[...new Set(d.map(i=>i.mimeType))].find(i=>i&&M(a,i));if(d=d.filter(i=>S===i.mimeType),c.bitrateList.forEach((i,f)=>{let E={id:i.id?.toString()??`dash-bitrate-${f}`,width:i.width??0,height:i.height??0,bitrate:i.bandwidth??0,codec:c.codec,index:f};this.#e.qualities[p.add](E,n)}),H(c.index)){let i=this.#e.qualities[c.index];i&&this.#e.qualities[p.select](i,!0,n)}d.forEach((i,f)=>{let G=i.labels.find(L=>navigator.languages.some(Q=>L.lang&&Q.toLowerCase().startsWith(L.lang.toLowerCase())))||i.labels[0],O={id:`dash-audio-${i?.index}`,label:G?.text??(i.lang&&b(i.lang))??i.lang??"",language:i.lang??"",kind:"main",mimeType:i.mimeType,codec:i.codec,index:f};this.#e.audioTracks[p.add](O,n)}),a.dispatchEvent(new l("canplay",{trigger:n}))}#T(t){let{type:e,error:s}=t;switch(s.code){case 27:this.#L(s);break;default:this.#l(s);break}}#b(){this.#o>=0&&this.#h()}#E(t){t.mediaType==="text"&&requestAnimationFrame(this.#g.bind(this,t))}#o=-1;#L(t){this.#h(),this.#t?.play(),this.#o=window.setTimeout(()=>{this.#o=-1,this.#l(t)},5e3)}#h(){clearTimeout(this.#o),this.#o=-1}#l(t){this.#e.notify("error",{message:t.message??"",code:1,error:t})}#v(){this.#u("video",!0);let{qualities:t}=this.#e;this.#t?.setQualityFor("video",t.selectedIndex,!0)}#u(t,e){this.#t?.updateSettings({streaming:{abr:{autoSwitchBitrate:{[t]:e}}}})}#H(){let{qualities:t}=this.#e;!this.#t||t.auto||!t.selected||(this.#u("video",!1),this.#t.setQualityFor("video",t.selectedIndex,t.switch==="current"),k&&(this.#i.currentTime=this.#i.currentTime))}#C(){if(!this.#t)return;let{audioTracks:t}=this.#e,e=this.#t.getTracksFor("audio").find(s=>t.selected&&t.selected.id===`dash-audio-${s.index}`);e&&this.#t.setCurrentTrack(e)}#p(){this.#h(),this.#r=null,this.#c={}}onInstance(t){return this.#a.add(t),()=>this.#a.delete(t)}loadSource(t){this.#p(),h(t.src)&&this.#t?.attachSource(t.src)}destroy(){this.#p(),this.#t?.destroy(),this.#t=null,this.#n?.(),this.#n=null}};var y=class{#i;#e;#t;constructor(t,e,s){this.#i=t,this.#e=e,this.#t=s,this.#a()}async#a(){let t={onLoadStart:this.#n.bind(this),onLoaded:this.#s.bind(this),onLoadError:this.#d.bind(this)},e=await B(this.#i,t);if(D(e)&&!h(this.#i)&&(e=await K(this.#i,t)),!e)return null;if(!window.dashjs.supportsMediaSource()){let s="[vidstack] `dash.js` is not supported in this environment";return this.#e.player.dispatch(new l("dash-unsupported")),this.#e.notify("error",{message:s,code:4}),null}return e}#n(){this.#e.player.dispatch(new l("dash-lib-load-start"))}#s(t){this.#e.player.dispatch(new l("dash-lib-loaded",{detail:t})),this.#t(t)}#d(t){let e=$(t);this.#e.player.dispatch(new l("dash-lib-load-error",{detail:e})),this.#e.notify("error",{message:e.message,code:4,error:e})}};async function K(r,t={}){if(!D(r)){if(t.onLoadStart?.(),J(r))return t.onLoaded?.(r),r;if(j(r)){let e=r.MediaPlayer;return t.onLoaded?.(e),e}try{let e=(await r())?.default;if(j(e))return t.onLoaded?.(e.MediaPlayer),e.MediaPlayer;if(e)t.onLoaded?.(e);else throw Error("");return e}catch(e){t.onLoadError?.(e)}}}async function B(r,t={}){if(h(r)){t.onLoadStart?.();try{if(await R(r),!C(window.dashjs.MediaPlayer))throw Error("");let e=window.dashjs.MediaPlayer;return t.onLoaded?.(e),e}catch(e){t.onLoadError?.(e)}}}function J(r){return r&&r.prototype&&r.prototype!==Function}function j(r){return r&&"MediaPlayer"in r}var Y="https://cdn.jsdelivr.net",q=class extends V{$$PROVIDER_TYPE="DASH";#i=null;#e=new g(this.video,this.ctx);get ctor(){return this.#i}get instance(){return this.#e.instance}static supported=N();get type(){return"dash"}get canLiveSync(){return!0}#t=`${Y}/npm/dashjs@4.7.4/dist/dash.all.min.js`;get config(){return this.#e.config}set config(t){this.#e.config=t}get library(){return this.#t}set library(t){this.#t=t}preconnect(){h(this.#t)&&I(this.#t)}setup(){super.setup(),new y(this.#t,this.ctx,t=>{this.#i=t,this.#e.setup(t),this.ctx.notify("provider-setup",this);let e=v(this.ctx.$state.source);e&&this.loadSource(e)})}async loadSource(t,e){if(!h(t.src)){this.removeSource();return}this.media.preload=e||"",this.appendSource(t,"application/x-mpegurl"),this.#e.loadSource(t),this.currentSrc=t}onInstance(t){let e=this.#e.instance;return e&&t(e),this.#e.onInstance(t)}destroy(){this.#e.destroy()}};export{q as DASHProvider};
