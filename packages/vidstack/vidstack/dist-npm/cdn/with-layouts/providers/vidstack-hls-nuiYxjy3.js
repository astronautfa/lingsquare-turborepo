import{l as T,p as v}from"../chunks/vidstack-6e217PNu.js";import{a as E,l as S}from"../chunks/vidstack-Dg0S0-F_.js";import{VideoProvider as k}from"./vidstack-video-BM4kSeC8.js";import{p,l as m,e as w,D as c,i as l,y as q,j as f,X as R}from"../chunks/vidstack-D-qUEirC.js";import{Q as g}from"../chunks/vidstack-dclo3F73.js";import{a as _,T as L}from"../chunks/vidstack-DLCsoEmc.js";import{L as u}from"../chunks/vidstack-ClIUVQwo.js";import{R as $}from"../chunks/vidstack-Xj0Gg0KH.js";import{c as I}from"../chunks/vidstack-CYZ2CtI4.js";import"./vidstack-html-CbJypX1j.js";import"../chunks/vidstack-Bxv1Qnxe.js";import"../chunks/vidstack-Lfo4VTXP.js";const x=a=>q(a);class O{constructor(t,i){this.m=t,this.b=i,this.d=null,this.qb=null,this.rb={},this.sb=new Set}get instance(){return this.d}setup(t){const{streamType:i}=this.b.$state,s=p(i).includes("live"),e=p(i).includes("ll-");this.d=new t({lowLatencyMode:e,backBufferLength:e?4:s?8:void 0,renderTextTracksNatively:!1,...this.rb});const n=this.Oi.bind(this);for(const r of Object.values(t.Events))this.d.on(r,n);this.d.on(t.Events.ERROR,this.Q.bind(this));for(const r of this.sb)r(this.d);this.b.player.dispatch("hls-instance",{detail:this.d}),this.d.attachMedia(this.m),this.d.on(t.Events.AUDIO_TRACK_SWITCHED,this.Qi.bind(this)),this.d.on(t.Events.LEVEL_SWITCHED,this.Ri.bind(this)),this.d.on(t.Events.LEVEL_LOADED,this.Si.bind(this)),this.d.on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND,this.Ti.bind(this)),this.d.on(t.Events.CUES_PARSED,this.Ui.bind(this)),this.b.qualities[g.Ia]=this.je.bind(this),m(this.b.qualities,"change",this.ke.bind(this)),m(this.b.audioTracks,"change",this.le.bind(this)),this.qb=w(this.me.bind(this))}aa(t,i){return new c(x(t),{detail:i})}me(){if(!this.b.$state.live())return;const t=new $(this.ne.bind(this));return t.Xa(),t.$.bind(t)}ne(){this.b.$state.liveSyncPosition.set(this.d?.liveSyncPosition??1/0)}Oi(t,i){this.b.player?.dispatch(this.aa(t,i))}Ti(t,i){const s=this.aa(t,i);let e=-1;for(let n=0;n<i.tracks.length;n++){const r=i.tracks[n],h=r.subtitleTrack??r.closedCaptions,d=new _({id:`hls-${r.kind}-${n}`,src:h?.url,label:r.label,language:h?.lang,kind:r.kind,default:r.default});d[L.ma]=2,d[L.hb]=()=>{d.mode==="showing"?(this.d.subtitleTrack=n,e=n):e===n&&(this.d.subtitleTrack=-1,e=-1)},this.b.textTracks.add(d,s)}}Ui(t,i){const s=this.d?.subtitleTrack,e=this.b.textTracks.getById(`hls-${i.type}-${s}`);if(!e)return;const n=this.aa(t,i);for(const r of i.cues)r.positionAlign="auto",e.addCue(r,n)}Qi(t,i){const s=this.b.audioTracks[i.id];if(s){const e=this.aa(t,i);this.b.audioTracks[u.ea](s,!0,e)}}Ri(t,i){const s=this.b.qualities[i.level];if(s){const e=this.aa(t,i);this.b.qualities[u.ea](s,!0,e)}}Si(t,i){if(this.b.$state.canPlay())return;const{type:s,live:e,totalduration:n,targetduration:r}=i.details,h=this.aa(t,i);this.b.delegate.c("stream-type-change",e?s==="EVENT"&&Number.isFinite(n)&&r>=10?"live:dvr":"live":"on-demand",h),this.b.delegate.c("duration-change",n,h);const d=this.d.media;this.d.currentLevel===-1&&this.b.qualities[g.Wa](!0,h);for(const o of this.d.audioTracks){const b={id:o.id.toString(),label:o.name,language:o.lang||"",kind:"main"};this.b.audioTracks[u.da](b,h)}for(const o of this.d.levels){const b={id:o.id?.toString()??o.height+"p",width:o.width,height:o.height,codec:o.codecSet,bitrate:o.bitrate};this.b.qualities[u.da](b,h)}d.dispatchEvent(new c("canplay",{trigger:h}))}Q(t,i){if(i.fatal)switch(i.type){case"mediaError":this.d?.recoverMediaError();break;default:this.qc(i.error);break}}qc(t){this.b.delegate.c("error",{message:t.message,code:1,error:t})}je(){this.d&&(this.d.currentLevel=-1)}ke(){const{qualities:t}=this.b;!this.d||t.auto||(this.d[t.switch+"Level"]=t.selectedIndex,E&&(this.m.currentTime=this.m.currentTime))}le(){const{audioTracks:t}=this.b;this.d&&this.d.audioTrack!==t.selectedIndex&&(this.d.audioTrack=t.selectedIndex)}Vi(t){l(t.src)&&this.d?.loadSource(t.src)}Wi(){this.d?.destroy(),this.d=null,this.qb?.(),this.qb=null}}class C{constructor(t,i,s){this.L=t,this.b=i,this.La=s,this.qe()}async qe(){const t={onLoadStart:this.Ma.bind(this),onLoaded:this.tb.bind(this),onLoadError:this.re.bind(this)};let i=await H(this.L,t);return f(i)&&!l(this.L)&&(i=await D(this.L,t)),i?i.isSupported()?i:(this.b.player.dispatch(new c("hls-unsupported")),this.b.delegate.c("error",{message:"[vidstack] `hls.js` is not supported in this environment",code:4}),null):null}Ma(){this.b.player.dispatch(new c("hls-lib-load-start"))}tb(t){this.b.player.dispatch(new c("hls-lib-loaded",{detail:t})),this.La(t)}re(t){const i=I(t);this.b.player.dispatch(new c("hls-lib-load-error",{detail:i})),this.b.delegate.c("error",{message:i.message,code:4,error:i})}}async function D(a,t={}){if(!f(a)){if(t.onLoadStart?.(),a.prototype&&a.prototype!==Function)return t.onLoaded?.(a),a;try{const i=(await a())?.default;if(i&&i.isSupported)t.onLoaded?.(i);else throw Error("");return i}catch(i){t.onLoadError?.(i)}}}async function H(a,t={}){if(l(a)){t.onLoadStart?.();try{if(await T(a),!R(window.Hls))throw Error("");const i=window.Hls;return t.onLoaded?.(i),i}catch(i){t.onLoadError?.(i)}}}const j="https://cdn.jsdelivr.net";class y extends k{constructor(){super(...arguments),this.$$PROVIDER_TYPE="HLS",this.rc=null,this.e=new O(this.video,this.b),this.oa=`${j}/npm/hls.js@^1.5.0/dist/hls.min.js`}get ctor(){return this.rc}get instance(){return this.e.instance}get type(){return"hls"}get canLiveSync(){return!0}get config(){return this.e.rb}set config(t){this.e.rb=t}get library(){return this.oa}set library(t){this.oa=t}preconnect(){l(this.oa)&&v(this.oa)}setup(){super.setup(),new C(this.oa,this.b,t=>{this.rc=t,this.e.setup(t),this.b.delegate.c("provider-setup",this);const i=p(this.b.$state.source);i&&this.loadSource(i)})}async loadSource(t,i){if(!l(t.src)){this.oc();return}this.a.preload=i||"",this.ge(t,"application/x-mpegurl"),this.e.Vi(t),this.K=t}onInstance(t){const i=this.e.instance;return i&&t(i),this.e.sb.add(t),()=>this.e.sb.delete(t)}destroy(){this.e.Wi()}}y.supported=S();export{y as HLSProvider};
