import"../chunks/vidstack-E4OTE735.js";import"../chunks/vidstack-VMXK7TJF.js";import"../chunks/vidstack-HHAABY3A.js";import{g as N,v as R,w as O,y as $}from"../chunks/vidstack-TPV5IZLS.js";import"../chunks/vidstack-NTONOYHO.js";import"../chunks/vidstack-WJVXB6YB.js";import"../chunks/vidstack-CJCRVP5A.js";import"../chunks/vidstack-RVA6YKB7.js";import"../chunks/vidstack-P5OVTIKG.js";import"../chunks/vidstack-RBFWGAHH.js";import"../chunks/vidstack-6LOE6Z3S.js";import"../chunks/vidstack-ZYQSM73U.js";import"../chunks/vidstack-EV5FVEL6.js";import"../chunks/vidstack-IMNMJXWE.js";import"../chunks/vidstack-4QJFXBXL.js";import"../chunks/vidstack-E267Q6N4.js";import"../chunks/vidstack-I3NGMVWZ.js";import"../chunks/vidstack-OWZU7SXQ.js";import"../chunks/vidstack-2IDCNZ37.js";import"../chunks/vidstack-5IDZ3MKZ.js";import"../chunks/vidstack-RYIIIOKJ.js";import"../chunks/vidstack-HDVJ2P4K.js";import{t as M}from"../chunks/vidstack-SKR3AJXQ.js";import"../chunks/vidstack-CRUGUF5W.js";import"../chunks/vidstack-KCALJS55.js";import"../chunks/vidstack-BQBKKLOB.js";import{h as F}from"../chunks/vidstack-4WUVJWEQ.js";import{F as y,G as V,Z as q,ba as D,n as v,o as I,r as _,x as E}from"../chunks/vidstack-XC7WIXLW.js";var g=null,d=N.record,J=["playing","paused","ended","currentTime","seeking","duration","volume","muted","loop","poster"],B={ratechange:"rate-change",ready:"can-play",timeupdate:"time-update",volumechange:"volume-change"},Q=["airplay","captions-off","captions-on","download","enter-fullscreen","exit-fullscreen","fast-forward","muted","pause","pip","play","restart","rewind","settings","volume"],j=class x{constructor(e,t={}){this.target=e;this.config=t;if(v(e)?e=document.querySelector(e):M(e)||(e=e[0]),!M(e))throw Error(`[plyr] target must be of type \`HTMLElement\`, found \`${typeof e}\``);let n=e.getAttribute("data-plyr-config");if(n)try{t={...t,...JSON.parse(n)}}catch{}let{enabled:s=!0,debug:i="error",autoPause:l=!0,ratio:c=null,hideControls:o=!0,resetOnEnd:h=!1,disableContextMenu:U=!0,iconUrl:w=null,iconPrefix:C="plyr",keyboard:L={focused:!0,global:!1},i18n:K=null,...z}=t;if(this.player=document.createElement("media-player"),this.provider=document.createElement("media-provider"),this.layout=document.createElement("media-plyr-layout"),!s)return;for(let r of J)Object.defineProperty(this,r,{get:()=>this.player[r],set:a=>void(this.player[r]=a)});if(v(i)?this.player.logLevel=i:i&&(this.player.logLevel="warn"),l&&this.#i.add(E(this.player,"play",this.#n.bind(this))),this.ratio=c,this.layout.translations=K,o||(this.player.controls.canIdle=!1),h&&this.#i.add(E(this.player,"ended",this.#s.bind(this))),w){this.layout.customIcons=!0;let r=`sprite-${C}`,a=document.getElementById(r),f=()=>{for(let p of Q){let u="http://www.w3.org/2000/svg",m=document.createElementNS(u,"svg");y(m,"fill","none"),y(m,"slot",`${p}-icon`),y(m,"aria-hidden","true"),y(m,"viewBox","0 0 18 18");let H=document.createElementNS(u,"use");H.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${C}-${p}`),m.append(H),this.layout.append(m)}};a?f():fetch(w).then(p=>p.text()).then(p=>{let u=document.createElement("div");y(u,"id",r),y(u,"hidden",""),u.innerHTML=p,document.body.insertAdjacentElement("afterbegin",u),f()}).catch(p=>{this.layout.customIcons=!1})}L.global?this.player.keyTarget="document":L.focused?this.player.keyTarget="player":this.player.keyDisabled=!0,e.removeAttribute("controls");let A=e.getAttribute("title");A&&this.player.setAttribute("title",A);let b=e.getAttribute("width"),P=e.getAttribute("height");(b||P)&&(b&&(this.player.style.width=b),P&&(this.player.style.height=P),this.player.style.aspectRatio="unset");for(let r of e.attributes){let a=r.name.replace("data-",""),f=q(a);f in this.player?this.player.setAttribute(a,r.value):f in this.layout&&this.layout.setAttribute(a,r.value)}for(let[r,a]of Object.entries(z))r in this.player?this.player[r]=a:r in this.layout&&(this.layout[r]=a);if(this.player.append(this.provider,this.layout),!R(e)&&!O(e)&&!$(e))e.append(this.player);else{for(let r of[...e.children])this.provider.append(r);e.replaceWith(this.player)}let T=e.getAttribute("data-plyr-provider"),S=e.getAttribute("data-plyr-embed-id");T&&/youtube|vimeo/.test(T)&&S&&(this.player.src=`${T}/${S}`)}static setup(e,t){return v(e)&&(e=document.querySelectorAll(e)),[...e].map(n=>new x(n,t))}static supported(e,t){return!0}player;provider;layout;fullscreen=new k(this);playing=d.playing;paused=d.paused;ended=d.ended;currentTime=d.currentTime;seeking=d.seeking;duration=d.duration;volume=d.volume;muted=d.muted;loop=d.loop;poster=d.poster;get type(){return this.player.provider?.type??""}get isHTML5(){return/audio|video|hls/.test(this.type)}get isEmbed(){return/youtube|vimeo/.test(this.type)}get buffered(){let{bufferedEnd:e,seekableEnd:t}=this.player.state;return t>0?e/t:0}get stopped(){return this.paused&&this.currentTime===0}get hasAudio(){if(!this.isHTML5)return!0;let e=this.player.provider.media;return!!(e.mozHasAudio||e.webkitAudioDecodedByteCount||e.audioTracks?.length||this.player.audioTracks.length)}get speed(){return this.player.playbackRate}set speed(e){this.player.remoteControl.changePlaybackRate(e)}get currentTrack(){return this.player.textTracks.selectedIndex}set currentTrack(e){this.player.remoteControl.changeTextTrackMode(e,"showing")}get pip(){return this.player.state.pictureInPicture}set pip(e){e?this.player.enterPictureInPicture():this.player.exitPictureInPicture()}get quality(){return this.player.state.quality?.height??null}set quality(e){let t=this.player.qualities,n=-1;if(e!==null){let s=1/0;for(let i=0;i<t.length;i++){let l=Math.abs(t[i].height-e);l<s&&(n=i,s=l)}}this.player.remoteControl.changeQuality(n)}#t=null;get source(){return this.#t}set source(e){let{type:t="video",sources:n="",title:s="",poster:i="",thumbnails:l="",tracks:c=[]}=e??{};this.player.src=n,this.player.viewType=t,this.player.title=s,this.player.poster=i,this.layout.thumbnails=l,this.player.textTracks.clear();for(let o of c)this.player.textTracks.add(o);this.#t=e}#e=null;get ratio(){return this.#e}set ratio(e){e&&(e=e.replace(/\s*:\s*/," / ")),V(this.player,"aspect-ratio",e??"unset"),this.#e=e}get download(){return this.layout.download}set download(e){this.layout.download=e}#i=D();#n(){g!==this&&g?.pause(),g=this}#s(){this.currentTime=0,this.paused=!0}play(){return this.player.play()}pause(){return this.player.pause()}togglePlay(e=this.paused){return e?this.player.play():this.player.pause()}toggleCaptions(e=!this.player.textTracks.selected){let t=this.player.remoteControl;e?t.showCaptions():t.disableCaptions()}toggleControls(e=!this.player.controls.showing){let t=this.player.controls;e?t.show():t.hide()}restart(){this.currentTime=0}stop(){this.pause(),this.player.currentTime=0}forward(e=this.config.seekTime??10){this.currentTime+=e}rewind(e=this.config.seekTime??10){this.currentTime-=e}increaseVolume(e=5){this.volume+=e}decreaseVolume(e=5){this.volume-=e}airplay(){return this.player.requestAirPlay()}on(e,t){this.#o(e,t)}once(e,t){this.#o(e,t,{once:!0})}off(e,t){this.#o(e,t,{remove:!0})}#r=[];#o(e,t,n={}){let s=e,i=null;switch(e){case"captionsenabled":case"captionsdisabled":s="text-track-change",i=e==="captionsenabled";break;case"controlsshown":case"controlshidden":s="controls-change",i=e==="controlsshown";break;case"enterfullscreen":case"exitfullscreen":s="fullscreen-change",i=e==="enterfullscreen";break;default:}let l=B[s]??s,c=o=>{if(!(I(i)&&!!o.detail!==i)){if(l!==e){t(new _(e,{...o,trigger:o}));return}t(o)}};if(n.remove){let o=-1;do if(o=this.#r.findIndex(h=>h.type===e&&h.callback===t),o>=0){let{listener:h}=this.#r[o];this.player.removeEventListener(l,h),this.#r.splice(o,1)}while(o>=0)}else this.#r.push({type:e,callback:t,listener:c}),this.player.addEventListener(l,c,{once:n.once})}supports(e){return!!e&&F(null,e)}destroy(){for(let{type:e,listener:t}of this.#r)this.player.removeEventListener(B[e]??e,t);this.#t=null,this.#r.length=0,g===this&&(g=null),this.#i.empty(),this.player.destroy()}},k=class{#t;constructor(e){this.#t=e}get#e(){return this.#t.player}get enabled(){return this.#e.state.canFullscreen}get active(){return this.#e.state.fullscreen}enter(){return this.#e.requestFullscreen()}exit(){return this.#e.exitFullscreen()}toggle(){return this.active?this.exit():this.enter()}};export{j as Plyr,k as PlyrFullscreenAdapter};
