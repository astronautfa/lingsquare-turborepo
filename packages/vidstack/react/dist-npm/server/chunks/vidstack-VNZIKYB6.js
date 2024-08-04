import{a as L}from"./vidstack-BCURYQHW.js";import{B as w,a as P,d as r,y as N}from"./vidstack-6TJG5OUF.js";import{b as S}from"./vidstack-ISJILNRC.js";import{a as u}from"./vidstack-D22ZK42Y.js";import{B as a,J as d,a as k,ca as C,f as c,g as M,h as o,n as x,q as _,u as l,v as A}from"./vidstack-YVHLWECJ.js";var m=null,p=[],f=[];function y(){return m??=new AudioContext}function D(){let n=y(),t=n.createGain();return t.connect(n.destination),p.push(t),t}function G(n,t){let e=y(),i=e.createMediaElementSource(n);return t&&i.connect(t),f.push(i),i}function R(n){let t=p.indexOf(n);t!==-1&&(p.splice(t,1),n.disconnect(),$())}function V(n){let t=f.indexOf(n);t!==-1&&(f.splice(t,1),n.disconnect(),$())}function $(){m&&p.length===0&&f.length===0&&m.close().then(()=>{m=null})}var v=class{#i;#t;#n=null;#s=null;get currentGain(){return this.#n?.gain?.value??null}get supported(){return!0}constructor(t,e){this.#i=t,this.#t=e}setGain(t){let e=this.currentGain;if(t!==this.currentGain){if(t===1&&e!==1){this.removeGain();return}this.#n||(this.#n=D(),this.#s&&this.#s.connect(this.#n)),this.#s||(this.#s=G(this.#i,this.#n)),this.#n.gain.value=t,this.#t(t)}}removeGain(){this.#n&&(this.#s&&this.#s.connect(y().destination),this.#r(),this.#t(null))}destroy(){this.#o(),this.#r()}#o(){if(this.#s)try{V(this.#s)}catch{}finally{this.#s=null}}#r(){if(this.#n)try{R(this.#n)}catch{}finally{this.#n=null}}};var F=["focus","blur","visibilitychange","pageshow","pagehide"],g=class{#i=o(H());#t=o("visible");#n;connect(){for(let t of F)a(window,t,this.#s.bind(this));r&&a(window,"beforeunload",t=>{this.#n=setTimeout(()=>{t.defaultPrevented||t.returnValue.length>0||(this.#i.set("hidden"),this.#t.set("hidden"))},0)})}get pageState(){return this.#i()}get visibility(){return this.#t()}#s(t){r&&window.clearTimeout(this.#n),(t.type!=="blur"||this.#i()==="active")&&(this.#i.set(H(t)),this.#t.set(document.visibilityState=="hidden"?"hidden":"visible"))}};function H(n){return"hidden"}var E=class{#i;#t;#n=C();#s=!1;#o=!1;#r=!1;#d=new L(this.#y.bind(this));#c=new g;get#e(){return this.#i.media}constructor(t,e){this.#i=t,this.#t=e,this.#v(),this.#c.connect(),l(this.#D.bind(this)),c(this.#f.bind(this))}#f(){this.#o=!1,this.#r=!1,this.#d.stop(),this.#n.empty()}#l=0;#u=-1;#y(){let t=this.#e.currentTime;!(r&&t-this.#u<.35)&&this.#l!==t&&(this.#h(t),this.#l=t)}#v(){this.#a("loadstart",this.#S),this.#a("abort",this.#p),this.#a("emptied",this.#T),this.#a("error",this.#B),this.#a("volumechange",this.#V)}#g(){this.#o||(this.#n.add(this.#a("loadeddata",this.#k),this.#a("loadedmetadata",this.#M),this.#a("canplay",this.#A),this.#a("canplaythrough",this.#C),this.#a("durationchange",this.#R),this.#a("play",this.#x),this.#a("progress",this.#I),this.#a("stalled",this.#N),this.#a("suspend",this.#O),this.#a("ratechange",this.#F)),this.#o=!0)}#E(){this.#r||(this.#n.add(this.#a("pause",this.#_),this.#a("playing",this.#P),this.#a("seeked",this.#$),this.#a("seeking",this.#H),this.#a("ended",this.#L),this.#a("waiting",this.#w)),this.#r=!0)}#b=void 0;#U=void 0;#a(t,e){return a(this.#e,t,e.bind(this))}#j(t){}#h(t,e){let i=Math.min(t,this.#t.$state.seekableEnd());this.#t.notify("time-change",i,e)}#S(t){if(this.#e.networkState===3){this.#p(t);return}this.#g(),this.#t.notify("load-start",void 0,t)}#p(t){this.#t.notify("abort",void 0,t)}#T(){this.#t.notify("emptied",void 0,event)}#k(t){this.#t.notify("loaded-data",void 0,t)}#M(t){this.#l=0,this.#u=-1,this.#E(),this.#t.notify("loaded-metadata",void 0,t),(P||r&&N(this.#t.$state.source()))&&this.#t.delegate.ready(this.#m(),t)}#m(){return{provider:k(this.#t.$provider),duration:this.#e.duration,buffered:this.#e.buffered,seekable:this.#e.seekable}}#x(t){this.#t.$state.canPlay&&this.#t.notify("play",void 0,t)}#_(t){this.#e.readyState===1&&!this.#s||(this.#s=!1,this.#d.stop(),this.#t.notify("pause",void 0,t))}#A(t){this.#t.delegate.ready(this.#m(),t)}#C(t){this.#t.$state.started()||this.#t.notify("can-play-through",this.#m(),t)}#P(t){this.#e.paused||(this.#s=!1,this.#t.notify("playing",void 0,t),this.#d.start())}#N(t){this.#t.notify("stalled",void 0,t),this.#e.readyState<3&&(this.#s=!0,this.#t.notify("waiting",void 0,t))}#w(t){this.#e.readyState<3&&(this.#s=!0,this.#t.notify("waiting",void 0,t))}#L(t){this.#d.stop(),this.#h(this.#e.duration,t),this.#t.notify("end",void 0,t),this.#t.$state.loop()&&x(this.#e.controls)&&(this.#e.controls=!1)}#D(){let t=this.#t.$state.paused(),e=this.#c.visibility==="hidden";(t||e)&&a(this.#e,"timeupdate",this.#G.bind(this))}#G(t){this.#h(this.#e.currentTime,t)}#R(t){this.#t.$state.ended()&&this.#h(this.#e.duration,t),this.#t.notify("duration-change",this.#e.duration,t)}#V(t){let e={volume:this.#e.volume,muted:this.#e.muted};this.#t.notify("volume-change",e,t)}#$(t){this.#u=this.#e.currentTime,this.#h(this.#e.currentTime,t),this.#t.notify("seeked",this.#e.currentTime,t),Math.trunc(this.#e.currentTime)===Math.trunc(this.#e.duration)&&S(this.#e.duration)>S(this.#e.currentTime)&&(this.#h(this.#e.duration,t),this.#e.ended||this.#t.player.dispatch(new A("media-play-request",{trigger:t})))}#H(t){this.#t.notify("seeking",this.#e.currentTime,t)}#I(t){let e={buffered:this.#e.buffered,seekable:this.#e.seekable};this.#t.notify("progress",e,t)}#O(t){this.#t.notify("suspend",void 0,t)}#F(t){this.#t.notify("rate-change",this.#e.playbackRate,t)}#B(t){let e=this.#e.error;if(!e)return;let i={message:e.message,code:e.code,mediaError:e};this.#t.notify("error",i,t)}};var b=class{#i;#t;get#n(){return this.#i.media.audioTracks}constructor(t,e){this.#i=t,this.#t=e,this.#n.onaddtrack=this.#s.bind(this),this.#n.onremovetrack=this.#o.bind(this),this.#n.onchange=this.#r.bind(this),a(this.#t.audioTracks,"change",this.#c.bind(this))}#s(t){let e=t.track;if(e.label==="")return;let i=e.id.toString()||`native-audio-${this.#t.audioTracks.length}`,s={id:i,label:e.label,language:e.language,kind:e.kind,selected:!1};this.#t.audioTracks[u.add](s,t),e.enabled&&(s.selected=!0)}#o(t){let e=this.#t.audioTracks.getById(t.track.id);e&&this.#t.audioTracks[u.remove](e,t)}#r(t){let e=this.#d();if(!e)return;let i=this.#t.audioTracks.getById(e.id);i&&this.#t.audioTracks[u.select](i,!0,t)}#d(){return Array.from(this.#n).find(t=>t.enabled)}#c(t){let{current:e}=t.detail;if(!e)return;let i=this.#n.getTrackById(e.id);if(i){let s=this.#d();s&&(s.enabled=!1),i.enabled=!0}}};var I=class{constructor(t,e){this.media=t;this.ctx=e}scope=M();currentSrc=null;audioGain=new v(this.media,t=>{this.ctx.notify("audio-gain-change",t)});setup(){new E(this,this.ctx),"audioTracks"in this.media&&new b(this,this.ctx),c(()=>{this.audioGain.destroy(),this.media.srcObject=null,this.media.removeAttribute("src");for(let t of this.media.querySelectorAll("source"))t.remove();this.media.load()})}get type(){return""}setPlaybackRate(t){this.media.playbackRate=t}async play(){return this.media.play()}async pause(){return this.media.pause()}setMuted(t){this.media.muted=t}setVolume(t){this.media.volume=t}setCurrentTime(t){this.media.currentTime=t}setPlaysInline(t){d(this.media,"playsinline",t)}async loadSource({src:t,type:e},i){this.media.preload=i||"",w(t)?(this.removeSource(),this.media.srcObject=t):(this.media.srcObject=null,_(t)?e!=="?"?this.appendSource({src:t,type:e}):(this.removeSource(),this.media.src=this.#i(t)):(this.removeSource(),this.media.src=window.URL.createObjectURL(t))),this.media.load(),this.currentSrc={src:t,type:e}}appendSource(t,e){let i=this.media.querySelector("source[data-vds]"),s=i??document.createElement("source");d(s,"src",this.#i(t.src)),d(s,"type",t.type!=="?"?t.type:e),d(s,"data-vds",""),i||this.media.append(s)}removeSource(){this.media.querySelector("source[data-vds]")?.remove()}#i(t){let{clipStartTime:e,clipEndTime:i}=this.ctx.$state,s=e(),h=i();return s>0&&h>0?`${t}#t=${s},${h}`:s>0?`${t}#t=${s}`:h>0?`${t}#t=0,${h}`:t}};var T=class{#i;#t;#n;#s=o(!1);get supported(){return this.#s()}constructor(t,e){this.#i=t,this.#t=e,this.#o()}#o(){}#r(){if(!this.#s())return;let t=["connecting","connect","disconnect"],e=this.#d.bind(this);e(),a(this.#i,"playing",e);for(let i of t)a(this.#i.remote,i,e)}async prompt(){if(!this.supported)throw Error("Not supported on this platform.");return this.type==="airplay"&&this.#i.webkitShowPlaybackTargetPicker?this.#i.webkitShowPlaybackTargetPicker():this.#i.remote.prompt()}#d(t){let e=this.#i.remote.state;if(e===this.#n)return;let i={type:this.type,state:e};this.#t.notify("remote-playback-change",i,t),this.#n=e}},O=class extends T{type="airplay";get canPrompt(){return"WebKitPlaybackTargetAvailabilityEvent"in window}};export{I as a,O as b};
