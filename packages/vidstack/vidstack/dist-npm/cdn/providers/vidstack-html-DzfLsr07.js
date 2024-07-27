import{e as v,g,f as k}from"../chunks/vidstack-DXSSsNHa.js";import{s as p,l as h,a3 as S,e as T,o as m,p as F,a4 as w,D as $,Z as x,q as c,i as M}from"../chunks/vidstack-DjvI5Yd7.js";import{l as o,b as A}from"../chunks/vidstack-CNPJZQP6.js";import{R as E}from"../chunks/vidstack-DEh4f7KB.js";import{L as l}from"../chunks/vidstack-ClIUVQwo.js";let n=null,d=[],u=[];function b(){return n??(n=new AudioContext)}function G(){const e=b(),t=e.createGain();return t.connect(e.destination),d.push(t),t}function j(e,t){const i=b(),s=i.createMediaElementSource(e);return t&&s.connect(t),u.push(s),s}function K(e){const t=d.indexOf(e);t!==-1&&(d.splice(t,1),e.disconnect(),f())}function N(e){const t=u.indexOf(e);t!==-1&&(u.splice(t,1),e.disconnect(),f())}function f(){n&&d.length===0&&u.length===0&&n.close().then(()=>{n=null})}class O{constructor(t,i){this.a=t,this.E=i,this.xa=null,this.Ka=null}get currentGain(){return this.xa?.gain?.value??null}get supported(){return!0}setGain(t){const i=this.currentGain;if(t!==this.currentGain){if(t===1&&i!==1){this.removeGain();return}this.xa||(this.xa=G(),this.Ka&&this.Ka.connect(this.xa)),this.Ka||(this.Ka=j(this.a,this.xa)),this.xa.gain.value=t,this.E(t)}}removeGain(){this.xa&&(this.Ka&&this.Ka.connect(b().destination),this.eg(),this.E(null))}destroy(){this.li(),this.eg()}li(){if(this.Ka)try{N(this.Ka)}catch{}finally{this.Ka=null}}eg(){if(this.xa)try{K(this.xa)}catch{}finally{this.xa=null}}}const R=["focus","blur","visibilitychange","pageshow","pagehide"];class z{constructor(){this.za=p(y()),this.on=p(document.visibilityState)}connect(){for(const t of R)h(window,t,this.An.bind(this));o&&h(window,"beforeunload",t=>{this.zn=setTimeout(()=>{t.defaultPrevented||t.returnValue.length>0||(this.za.set("hidden"),this.on.set("hidden"))},0)})}get pageState(){return this.za()}get visibility(){return this.on()}An(t){o&&window.clearTimeout(this.zn),(t.type!=="blur"||this.za()==="active")&&(this.za.set(y(t)),this.on.set(document.visibilityState=="hidden"?"hidden":"visible"))}}function y(e){return e?.type==="blur"||document.visibilityState==="hidden"?"hidden":document.hasFocus()?"active":"passive"}class I{constructor(t,i){this.p=t,this.b=i,this.Ya=S(),this.jc=!1,this.ae=!1,this.be=!1,this.fa=new E(this.kc.bind(this)),this.Qn=new z,this.Mn=0,this.Nn=-1,this.hg=void 0,this.zi=void 0,this.mi(),this.Qn.connect(),T(this.ni.bind(this)),m(this.ce.bind(this))}get a(){return this.p.media}get c(){return this.b.delegate.c}ce(){this.ae=!1,this.be=!1,this.fa.$(),this.Ya.empty()}kc(){const t=this.a.currentTime;!(o&&t-this.Nn<.35)&&this.Mn!==t&&(this.Jb(t),this.Mn=t)}mi(){this.F("loadstart",this.Ma),this.F("abort",this.gg),this.F("emptied",this.oi),this.F("error",this.Q),this.F("volumechange",this.Na)}pi(){this.ae||(this.Ya.add(this.F("loadeddata",this.qi),this.F("loadedmetadata",this.ri),this.F("canplay",this.ed),this.F("canplaythrough",this.si),this.F("durationchange",this.de),this.F("play",this.gc),this.F("progress",this.nb),this.F("stalled",this.ti),this.F("suspend",this.ui),this.F("ratechange",this.vi)),this.ae=!0)}wi(){this.be||(this.Ya.add(this.F("pause",this.ib),this.F("playing",this.xi),this.F("seeked",this.ob),this.F("seeking",this.yi),this.F("ended",this.lc),this.F("waiting",this.ee)),this.be=!0)}F(t,i){return h(this.a,t,i.bind(this))}Ai(t){}Jb(t,i){const s=Math.min(t,this.b.$state.seekableEnd());this.c("time-change",s,i)}Ma(t){if(this.a.networkState===3){this.gg(t);return}this.pi(),this.c("load-start",void 0,t)}gg(t){this.c("abort",void 0,t)}oi(){this.c("emptied",void 0,event)}qi(t){this.c("loaded-data",void 0,t)}ri(t){this.Mn=0,this.Nn=-1,this.wi(),this.c("loaded-metadata",void 0,t),(A||o&&v(this.b.$state.source()))&&this.b.delegate.Ga(this.fe(),t)}fe(){return{provider:F(this.b.$provider),duration:this.a.duration,buffered:this.a.buffered,seekable:this.a.seekable}}gc(t){this.b.$state.canPlay&&this.c("play",void 0,t)}ib(t){this.a.readyState===1&&!this.jc||(this.jc=!1,this.fa.$(),this.c("pause",void 0,t))}ed(t){this.b.delegate.Ga(this.fe(),t)}si(t){this.b.$state.started()||this.c("can-play-through",this.fe(),t)}xi(t){this.a.paused||(this.jc=!1,this.c("playing",void 0,t),this.fa.Xa())}ti(t){this.c("stalled",void 0,t),this.a.readyState<3&&(this.jc=!0,this.c("waiting",void 0,t))}ee(t){this.a.readyState<3&&(this.jc=!0,this.c("waiting",void 0,t))}lc(t){this.fa.$(),this.Jb(this.a.duration,t),this.c("end",void 0,t),this.b.$state.loop()&&w(this.a.controls)&&(this.a.controls=!1)}ni(){const t=this.b.$state.paused(),i=this.Qn.visibility==="hidden";(t||i)&&h(this.a,"timeupdate",this.mc.bind(this))}mc(t){this.Jb(this.a.currentTime,t)}de(t){this.b.$state.ended()&&this.Jb(this.a.duration,t),this.c("duration-change",this.a.duration,t)}Na(t){const i={volume:this.a.volume,muted:this.a.muted};this.c("volume-change",i,t)}ob(t){this.Nn=this.a.currentTime,this.Jb(this.a.currentTime,t),this.c("seeked",this.a.currentTime,t),Math.trunc(this.a.currentTime)===Math.trunc(this.a.duration)&&g(this.a.duration)>g(this.a.currentTime)&&(this.Jb(this.a.duration,t),this.a.ended||this.b.player.dispatch(new $("media-play-request",{trigger:t})))}yi(t){this.c("seeking",this.a.currentTime,t)}nb(t){const i={buffered:this.a.buffered,seekable:this.a.seekable};this.c("progress",i,t)}ui(t){this.c("suspend",void 0,t)}vi(t){this.c("rate-change",this.a.playbackRate,t)}Q(t){const i=this.a.error;if(!i)return;const s={message:i.message,code:i.code,mediaError:i};this.c("error",s,t)}}class L{constructor(t,i){this.p=t,this.b=i,this.nc.onaddtrack=this.Bi.bind(this),this.nc.onremovetrack=this.Ci.bind(this),this.nc.onchange=this.Di.bind(this),h(this.b.audioTracks,"change",this.Ei.bind(this))}get nc(){return this.p.media.audioTracks}Bi(t){const i=t.track;if(i.label==="")return;const s=i.id.toString()||`native-audio-${this.b.audioTracks.length}`,a={id:s,label:i.label,language:i.language,kind:i.kind,selected:!1};this.b.audioTracks[l.da](a,t),i.enabled&&(a.selected=!0)}Ci(t){const i=this.b.audioTracks.getById(t.track.id);i&&this.b.audioTracks[l.cc](i,t)}Di(t){let i=this.ig();if(!i)return;const s=this.b.audioTracks.getById(i.id);s&&this.b.audioTracks[l.ea](s,!0,t)}ig(){return Array.from(this.nc).find(t=>t.enabled)}Ei(t){const{current:i}=t.detail;if(!i)return;const s=this.nc.getTrackById(i.id);if(s){const a=this.ig();a&&(a.enabled=!1),s.enabled=!0}}}class q{constructor(t,i){this.a=t,this.b=i,this.scope=x(),this.K=null,this.audioGain=new O(this.a,s=>{this.b.delegate.c("audio-gain-change",s)})}setup(){new I(this,this.b),"audioTracks"in this.media&&new L(this,this.b),m(()=>{this.audioGain.destroy(),this.a.srcObject=null,this.a.removeAttribute("src");for(const t of this.a.querySelectorAll("source"))t.remove();this.a.load()})}get type(){return""}get media(){return this.a}get currentSrc(){return this.K}setPlaybackRate(t){this.a.playbackRate=t}async play(){return this.a.play()}async pause(){return this.a.pause()}setMuted(t){this.a.muted=t}setVolume(t){this.a.volume=t}setCurrentTime(t){this.a.currentTime=t}setPlaysInline(t){c(this.a,"playsinline",t)}async loadSource({src:t,type:i},s){this.a.preload=s||"",k(t)?(this.oc(),this.a.srcObject=t):(this.a.srcObject=null,M(t)?i!=="?"?this.ge({src:t,type:i}):(this.oc(),this.a.src=this.jg(t)):(this.oc(),this.a.src=window.URL.createObjectURL(t))),this.a.load(),this.K={src:t,type:i}}ge(t,i){const s=this.a.querySelector("source[data-vds]"),a=s??document.createElement("source");c(a,"src",this.jg(t.src)),c(a,"type",t.type!=="?"?t.type:i),c(a,"data-vds",""),s||this.a.append(a)}oc(){this.a.querySelector("source[data-vds]")?.remove()}jg(t){const{clipStartTime:i,clipEndTime:s}=this.b.$state,a=i(),r=s();return a>0&&r>0?`${t}#t=${a},${r}`:a>0?`${t}#t=${a}`:r>0?`${t}#t=0,${r}`:t}}export{q as HTMLMediaProvider};
