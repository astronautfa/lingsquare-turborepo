import{a as P,b as E}from"./vidstack-XPG5GCHN.js";import{a as V}from"./vidstack-GWANN7NA.js";import{a as m}from"./vidstack-ZSHM5QYX.js";import{f as g}from"./vidstack-3NDWMYL6.js";import{b}from"./vidstack-GIOYWYZF.js";import{a as o}from"./vidstack-MJ7YAI6G.js";import{a as k}from"./vidstack-TBIJQY3V.js";import"./vidstack-E7FJTJF3.js";import{a}from"./vidstack-D22ZK42Y.js";import{B as v,a as d,g as f,ga as u,h as c,q as p,t as y,u as h}from"./vidstack-DK4Y24W7.js";import"./vidstack-JGGQ3EWW.js";var C=["bufferend","bufferstart","durationchange","ended","enterpictureinpicture","error","fullscreenchange","leavepictureinpicture","loaded","playProgress","loadProgress","pause","play","playbackratechange","qualitychange","seeked","seeking","timeupdate","volumechange","waiting"];var T=class extends V{$$PROVIDER_TYPE="VIMEO";scope=f();fullscreen;#e;#i=c("");#s=c(!1);#r=null;#h=null;#u=!1;#n=new o(0,0);#l=new k(this.#C.bind(this));#k=null;#a=null;#o=new Map;#c=null;constructor(e,t){super(e),this.#e=t;let i=this;this.fullscreen={get active(){return i.#u},supported:!0,enter:()=>this.#t("requestFullscreen"),exit:()=>this.#t("exitFullscreen")}}cookies=!1;title=!0;byline=!0;portrait=!0;color="00ADEF";get type(){return"vimeo"}get currentSrc(){return this.#h}get videoId(){return this.#i()}get hash(){return this.#r}get isPro(){return this.#s()}preconnect(){b(this.getOrigin())}setup(){super.setup(),h(this.#V.bind(this)),h(this.#P.bind(this)),h(this.#E.bind(this)),this.#e.notify("provider-setup",this)}destroy(){this.#b(),this.fullscreen=void 0;let e="provider destroyed";for(let t of this.#o.values())for(let{reject:i}of t)i(e);this.#o.clear(),this.#t("destroy")}async play(){return this.#t("play")}async pause(){return this.#t("pause")}setMuted(e){this.#t("setMuted",e)}setCurrentTime(e){this.#t("seekTo",e),this.#e.notify("seeking",e)}setVolume(e){this.#t("setVolume",e),this.#t("setMuted",d(this.#e.$state.muted))}setPlaybackRate(e){this.#t("setPlaybackRate",e)}async loadSource(e){if(!p(e.src)){this.#h=null,this.#r=null,this.#i.set("");return}let{videoId:t,hash:i}=P(e.src);this.#i.set(t??""),this.#r=i??null,this.#h=e}#V(){this.#b();let e=this.#i();if(!e){this.src.set("");return}this.src.set(`${this.getOrigin()}/video/${e}`),this.#e.notify("load-start")}#P(){let e=this.#i();if(!e)return;let t=u(),i=new AbortController;return this.#c=t,E(e,i,this.#r).then(s=>{t.resolve(s)}).catch(s=>{t.reject()}),()=>{t.reject(),i.abort()}}#E(){let e=this.#s(),{$state:t,qualities:i}=this.#e;if(t.canSetPlaybackRate.set(e),i[a.setReadonly](!e),e)return v(i,"change",()=>{if(i.auto)return;let s=i.selected?.id;s&&this.#t("setQuality",s)})}getOrigin(){return"https://player.vimeo.com"}buildParams(){let{keyDisabled:e}=this.#e.$props,{playsInline:t,nativeControls:i}=this.#e.$state,s=i();return{title:this.title,byline:this.byline,color:this.color,portrait:this.portrait,controls:s,h:this.hash,keyboard:s&&!e(),transparent:!0,playsinline:t(),dnt:!this.cookies}}#C(){this.#t("getCurrentTime")}#d=!1;#T(e,t){if(this.#d&&e===0)return;let{realCurrentTime:i,realDuration:s,paused:n,bufferedEnd:r}=this.#e.$state;if(i()===e)return;let l=i();this.#e.notify("time-change",e,t),Math.abs(l-e)>1.5&&(this.#e.notify("seeking",e,t),!n()&&r()<e&&this.#e.notify("waiting",void 0,t)),s()-e<.01&&(this.#e.notify("end",void 0,t),this.#d=!0,setTimeout(()=>{this.#d=!1},500))}#w(e,t){this.#e.notify("seeked",e,t)}#x(e){let t=this.#i();this.#c?.promise.then(i=>{if(!i)return;let{title:s,poster:n,duration:r,pro:l}=i;this.#s.set(l),this.#e.notify("title-change",s,e),this.#e.notify("poster-change",n,e),this.#e.notify("duration-change",r,e),this.#m(r,e)}).catch(()=>{t===this.#i()&&(this.#t("getVideoTitle"),this.#t("getDuration"))})}#m(e,t){let{nativeControls:i}=this.#e.$state,s=i();this.#n=new o(0,e);let n={buffered:new o(0,0),seekable:this.#n,duration:e};this.#e.delegate.ready(n,t),s||this.#t("_hideOverlay"),this.#t("getQualities"),this.#t("getChapters")}#I(e,t,i){switch(e){case"getVideoTitle":let s=t;this.#e.notify("title-change",s,i);break;case"getDuration":let n=t;this.#e.$state.canPlay()?this.#e.notify("duration-change",n,i):this.#m(n,i);break;case"getCurrentTime":this.#T(t,i);break;case"getBuffered":y(t)&&t.length&&this.#f(t[t.length-1][1],i);break;case"setMuted":this.#p(d(this.#e.$state.volume),t,i);break;case"getChapters":this.#q(t);break;case"getQualities":this.#Q(t,i);break}this.#g(e)?.resolve()}#M(){for(let e of C)this.#t("addEventListener",e)}#$(e){this.#l.stop(),this.#e.notify("pause",void 0,e)}#A(e){this.#l.start(),this.#e.notify("play",void 0,e)}#D(e){let{paused:t}=this.#e.$state;!t()&&!this.#d&&this.#e.notify("playing",void 0,e)}#f(e,t){let i={buffered:new o(0,e),seekable:this.#n};this.#e.notify("progress",i,t)}#S(e){this.#e.notify("waiting",void 0,e)}#R(e){let{paused:t}=this.#e.$state;t()||this.#e.notify("playing",void 0,e)}#L(e){let{paused:t}=this.#e.$state;t()&&this.#e.notify("play",void 0,e),this.#e.notify("waiting",void 0,e)}#p(e,t,i){let s={volume:e,muted:t};this.#e.notify("volume-change",s,i)}#q(e){if(this.#y(),!e.length)return;let t=new g({kind:"chapters",default:!0}),{realDuration:i}=this.#e.$state;for(let s=0;s<e.length;s++){let n=e[s],r=e[s+1];t.addCue(new window.VTTCue(n.startTime,r?.startTime??i(),n.title))}this.#a=t,this.#e.textTracks.add(t)}#y(){this.#a&&(this.#e.textTracks.remove(this.#a),this.#a=null)}#Q(e,t){this.#e.qualities[m.enableAuto]=e.some(i=>i.id==="auto")?()=>this.#t("setQuality","auto"):void 0;for(let i of e){if(i.id==="auto")continue;let s=+i.id.slice(0,-1);isNaN(s)||this.#e.qualities[a.add]({id:i.id,width:s*(16/9),height:s,codec:"avc1,h.264",bitrate:-1},t)}this.#v(e.find(i=>i.active),t)}#v({id:e}={},t){if(!e)return;let i=e==="auto",s=this.#e.qualities.getById(e);i?(this.#e.qualities[m.setAuto](i,t),this.#e.qualities[a.select](void 0,!0,t)):this.#e.qualities[a.select](s??void 0,!0,t)}#F(e,t,i){switch(e){case"ready":this.#M();break;case"loaded":this.#x(i);break;case"play":this.#A(i);break;case"playProgress":this.#D(i);break;case"pause":this.#$(i);break;case"loadProgress":this.#f(t.seconds,i);break;case"waiting":this.#L(i);break;case"bufferstart":this.#S(i);break;case"bufferend":this.#R(i);break;case"volumechange":this.#p(t.volume,d(this.#e.$state.muted),i);break;case"durationchange":this.#n=new o(0,t.duration),this.#e.notify("duration-change",t.duration,i);break;case"playbackratechange":this.#e.notify("rate-change",t.playbackRate,i);break;case"qualitychange":this.#v(t,i);break;case"fullscreenchange":this.#u=t.fullscreen,this.#e.notify("fullscreen-change",t.fullscreen,i);break;case"enterpictureinpicture":this.#e.notify("picture-in-picture-change",!0,i);break;case"leavepictureinpicture":this.#e.notify("picture-in-picture-change",!1,i);break;case"ended":this.#e.notify("end",void 0,i);break;case"error":this.#_(t,i);break;case"seek":case"seeked":this.#w(t.seconds,i);break}}#_(e,t){let{message:i,method:s}=e;s==="setPlaybackRate"&&this.#s.set(!1),s&&this.#g(s)?.reject(i)}onMessage(e,t){e.event?this.#F(e.event,e.data,t):e.method&&this.#I(e.method,e.value,t)}onLoad(){}async#t(e,t){let i=u(),s=this.#o.get(e);return s||this.#o.set(e,s=[]),s.push(i),this.postMessage({method:e,value:t}),i.promise}#b(){this.#l.stop(),this.#n=new o(0,0),this.#c=null,this.#k=null,this.#s.set(!1),this.#y()}#g(e){return this.#o.get(e)?.shift()}};export{T as VimeoProvider};
