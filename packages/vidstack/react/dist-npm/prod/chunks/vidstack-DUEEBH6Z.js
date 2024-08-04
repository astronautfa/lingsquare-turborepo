import{a as k}from"./vidstack-CVAGCRPC.js";import{a as S}from"./vidstack-CIYAAZSF.js";import{a as l}from"./vidstack-XKIWRSNW.js";import{b as P}from"./vidstack-5LA5YANY.js";import"./vidstack-RMERH5DU.js";import{g as c,ga as v,h as m,m as y,o as f,p as d,q as b,r as g,u as T}from"./vidstack-YO4XO2QW.js";import"./vidstack-IGJ6WVY6.js";var r={Unstarted:-1,Ended:0,Playing:1,Paused:2,Buffering:3,Cued:5};var E=class extends k{$$PROVIDER_TYPE="YOUTUBE";scope=c();#e;#o=m("");#r=-1;#d=null;#n=-1;#s=!1;#i=new Map;constructor(e,t){super(e),this.#e=t}language="en";color="red";cookies=!1;get currentSrc(){return this.#d}get type(){return"youtube"}get videoId(){return this.#o()}preconnect(){P(this.getOrigin())}setup(){super.setup(),T(this.#m.bind(this)),this.#e.notify("provider-setup",this)}destroy(){this.#p();let e="provider destroyed";for(let t of this.#i.values())for(let{reject:s}of t)s(e);this.#i.clear()}async play(){return this.#t("playVideo")}#l(e){this.#a("playVideo")?.reject(e)}async pause(){return this.#t("pauseVideo")}#c(e){this.#a("pauseVideo")?.reject(e)}setMuted(e){e?this.#t("mute"):this.#t("unMute")}setCurrentTime(e){this.#s=this.#e.$state.paused(),this.#t("seekTo",e),this.#e.notify("seeking",e)}setVolume(e){this.#t("setVolume",e*100)}setPlaybackRate(e){this.#t("setPlaybackRate",e)}async loadSource(e){if(!b(e.src)){this.#d=null,this.#o.set("");return}let t=S(e.src);this.#o.set(t??""),this.#d=e}getOrigin(){return this.cookies?"https://www.youtube.com":"https://www.youtube-nocookie.com"}#m(){this.#p();let e=this.#o();if(!e){this.src.set("");return}this.src.set(`${this.getOrigin()}/embed/${e}`),this.#e.notify("load-start")}buildParams(){let{keyDisabled:e}=this.#e.$props,{muted:t,playsInline:s,nativeControls:a}=this.#e.$state,o=a();return{autoplay:0,cc_lang_pref:this.language,cc_load_policy:o?1:void 0,color:this.color,controls:o?1:0,disablekb:!o||e()?1:0,enablejsapi:1,fs:1,hl:this.language,iv_load_policy:o?1:3,mute:t()?1:0,playsinline:s()?1:0}}#t(e,t){let s=v(),a=this.#i.get(e);return a||this.#i.set(e,a=[]),a.push(s),this.postMessage({event:"command",func:e,args:t?[t]:void 0}),s.promise}onLoad(){window.setTimeout(()=>this.postMessage({event:"listening"}),100)}#y(e){this.#e.notify("loaded-metadata"),this.#e.notify("loaded-data"),this.#e.delegate.ready(void 0,e)}#f(e){this.#a("pauseVideo")?.resolve(),this.#e.notify("pause",void 0,e)}#b(e,t){let{duration:s,realCurrentTime:a}=this.#e.$state,o=this.#r===r.Ended,i=o?s():e;this.#e.notify("time-change",i,t),!o&&Math.abs(i-a())>1&&this.#e.notify("seeking",i,t)}#h(e,t,s){let a={buffered:new l(0,e),seekable:t};this.#e.notify("progress",a,s);let{seeking:o,realCurrentTime:i}=this.#e.$state;o()&&e>i()&&this.#u(s)}#u(e){let{paused:t,realCurrentTime:s}=this.#e.$state;window.clearTimeout(this.#n),this.#n=window.setTimeout(()=>{this.#e.notify("seeked",s(),e),this.#n=-1},t()?100:0),this.#s=!1}#g(e){let{seeking:t}=this.#e.$state;t()&&this.#u(e),this.#e.notify("pause",void 0,e),this.#e.notify("end",void 0,e)}#T(e,t){let{started:s,paused:a,seeking:o}=this.#e.$state,i=e===r.Playing,n=e===r.Buffering,h=!y(this.#a("playVideo")),u=(a()||h)&&(n||i);if(n&&this.#e.notify("waiting",void 0,t),o()&&i&&this.#u(t),!s()&&u&&this.#s){this.#l("invalid internal play operation"),i&&(this.pause(),this.#s=!1);return}switch(u&&(this.#a("playVideo")?.resolve(),this.#e.notify("play",void 0,t)),e){case r.Unstarted:this.#l("provider rejected"),this.#c("provider rejected"),this.#e.notify("pause",void 0,t);break;case r.Cued:this.#y(t);break;case r.Playing:this.#e.notify("playing",void 0,t);break;case r.Paused:this.#f(t);break;case r.Ended:this.#g(t);break}this.#r=e}onMessage({info:e},t){if(!e)return;let{title:s,intrinsicDuration:a,playbackRate:o}=this.#e.$state;if(f(e.videoData)&&e.videoData.title!==s()&&this.#e.notify("title-change",e.videoData.title,t),d(e.duration)&&e.duration!==a()){if(d(e.videoLoadedFraction)){let i=e.progressState?.loaded??e.videoLoadedFraction*e.duration,n=new l(0,e.duration);this.#h(i,n,t)}this.#e.notify("duration-change",e.duration,t)}if(d(e.playbackRate)&&e.playbackRate!==o()&&this.#e.notify("rate-change",e.playbackRate,t),e.progressState){let{current:i,seekableStart:n,seekableEnd:h,loaded:u,duration:p}=e.progressState;this.#b(i,t),this.#h(u,new l(n,h),t),p!==a()&&this.#e.notify("duration-change",p,t)}if(d(e.volume)&&g(e.muted)){let i={muted:e.muted,volume:e.volume/100};this.#e.notify("volume-change",i,t)}d(e.playerState)&&e.playerState!==this.#r&&this.#T(e.playerState,t)}#p(){this.#r=-1,this.#n=-1,this.#s=!1}#a(e){return this.#i.get(e)?.shift()}};export{E as YouTubeProvider};