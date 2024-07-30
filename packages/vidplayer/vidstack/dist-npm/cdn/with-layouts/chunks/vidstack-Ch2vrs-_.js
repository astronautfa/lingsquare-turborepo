import{S as f,m,t as g,af as y,D as l,s as T,j as S,i as v}from"./vidstack-IrJJUbQ3.js";import{c as b,e as k}from"./vidstack-Cfe5J9Tk.js";import{T as o,b as d,g as c}from"./vidstack--uA-lUoM.js";import{i as P}from"./vidstack-DbpGT7Dn.js";import{L as s}from"./vidstack-ClIUVQwo.js";const u=new f({artist:"",artwork:null,audioTrack:null,audioTracks:[],autoPlay:!1,autoPlayError:null,audioGain:null,buffered:new o,canLoad:!1,canLoadPoster:!1,canFullscreen:!1,canOrientScreen:b(),canPictureInPicture:!1,canPlay:!1,clipStartTime:0,clipEndTime:0,controls:!1,get iOSControls(){return k&&this.mediaType==="video"&&(!this.playsInline||!m.fullscreenEnabled&&this.fullscreen)},get nativeControls(){return this.controls||this.iOSControls},controlsVisible:!1,get controlsHidden(){return!this.controlsVisible},crossOrigin:null,ended:!1,error:null,fullscreen:!1,get loop(){return this.providedLoop||this.userPrefersLoop},logLevel:"silent",mediaType:"unknown",muted:!1,paused:!0,played:new o,playing:!1,playsInline:!1,pictureInPicture:!1,preload:"metadata",playbackRate:1,qualities:[],quality:null,autoQuality:!1,canSetQuality:!0,canSetPlaybackRate:!0,canSetVolume:!1,canSetAudioGain:!1,seekable:new o,seeking:!1,source:{src:"",type:""},sources:[],started:!1,textTracks:[],textTrack:null,get hasCaptions(){return this.textTracks.filter(P).length>0},volume:1,waiting:!1,realCurrentTime:0,get currentTime(){return this.clipStartTime>0?Math.max(0,Math.min(this.realCurrentTime-this.clipStartTime,this.duration)):this.realCurrentTime},providedDuration:-1,intrinsicDuration:0,get realDuration(){return this.providedDuration>0?this.providedDuration:this.intrinsicDuration},get duration(){return this.clipEndTime>0?this.clipEndTime-this.clipStartTime:Math.max(0,this.realDuration-this.clipStartTime)},get title(){return this.providedTitle||this.inferredTitle},get poster(){return this.providedPoster||this.inferredPoster},get viewType(){return this.providedViewType!=="unknown"?this.providedViewType:this.inferredViewType},get streamType(){return this.providedStreamType!=="unknown"?this.providedStreamType:this.inferredStreamType},get currentSrc(){return this.source},get bufferedStart(){const t=d(this.buffered)??0;return Math.max(0,t-this.clipStartTime)},get bufferedEnd(){const t=c(this.buffered)??0;return Math.min(this.duration,Math.max(0,t-this.clipStartTime))},get seekableStart(){const t=d(this.seekable)??0;return Math.max(0,t-this.clipStartTime)},get seekableEnd(){const t=this.canPlay?c(this.seekable)??1/0:0;return this.clipEndTime>0?Math.max(this.clipEndTime,Math.max(0,t-this.clipStartTime)):t},get seekableWindow(){return Math.max(0,this.seekableEnd-this.seekableStart)},canAirPlay:!1,canGoogleCast:!1,remotePlaybackState:"disconnected",remotePlaybackType:"none",remotePlaybackLoader:null,remotePlaybackInfo:null,get isAirPlayConnected(){return this.remotePlaybackType==="airplay"&&this.remotePlaybackState==="connected"},get isGoogleCastConnected(){return this.remotePlaybackType==="google-cast"&&this.remotePlaybackState==="connected"},pointer:"fine",orientation:"landscape",width:0,height:0,mediaWidth:0,mediaHeight:0,lastKeyboardAction:null,userBehindLiveEdge:!1,liveEdgeTolerance:10,minLiveDVRWindow:60,get canSeek(){return/unknown|on-demand|:dvr/.test(this.streamType)&&Number.isFinite(this.seekableWindow)&&(!this.live||/:dvr/.test(this.streamType)&&this.seekableWindow>=this.minLiveDVRWindow)},get live(){return this.streamType.includes("live")||!Number.isFinite(this.realDuration)},get liveEdgeStart(){return this.live&&Number.isFinite(this.seekableEnd)?Math.max(0,(this.liveSyncPosition??this.seekableEnd)-this.liveEdgeTolerance):0},get liveEdge(){return this.live&&(!this.canSeek||!this.userBehindLiveEdge&&this.currentTime>=this.liveEdgeStart)},get liveEdgeWindow(){return this.live&&Number.isFinite(this.seekableEnd)?this.seekableEnd-this.liveEdgeStart:0},autoPlaying:!1,providedTitle:"",inferredTitle:"",providedLoop:!1,userPrefersLoop:!1,providedPoster:"",inferredPoster:"",inferredViewType:"unknown",providedViewType:"unknown",providedStreamType:"unknown",inferredStreamType:"unknown",liveSyncPosition:null,savedState:null}),h=new Set(["autoPlayError","autoPlaying","buffered","canPlay","error","paused","played","playing","seekable","seeking","waiting"]),O=new Set([...h,"ended","inferredPoster","inferredStreamType","inferredTitle","intrinsicDuration","liveSyncPosition","realCurrentTime","savedState","started","userBehindLiveEdge"]);function w(t,e=!1){const i=e?h:O;u.reset(t,r=>i.has(r)),g()}var p;class E extends y{constructor(){super(...arguments),this.A=[],this[p]=!1}get length(){return this.A.length}get readonly(){return this[s.Yc]}indexOf(e){return this.A.indexOf(e)}getById(e){return e===""?null:this.A.find(i=>i.id===e)??null}toArray(){return[...this.A]}[(p=s.Yc,Symbol.iterator)](){return this.A.values()}[s.da](e,i){const r=this.A.length;""+r in this||Object.defineProperty(this,r,{get(){return this.A[r]}}),!this.A.includes(e)&&(this.A.push(e),this.dispatchEvent(new l("add",{detail:e,trigger:i})))}[s.cc](e,i){const r=this.A.indexOf(e);r>=0&&(this[s.Hf]?.(e,i),this.A.splice(r,1),this.dispatchEvent(new l("remove",{detail:e,trigger:i})))}[s.z](e){for(const i of[...this.A])this[s.cc](i,e);this.A=[],this[s.Od](!1,e),this[s.Gf]?.()}[s.Od](e,i){this[s.Yc]!==e&&(this[s.Yc]=e,this.dispatchEvent(new l("readonly-change",{detail:e,trigger:i})))}}const x={type:"color"},A={type:"radio",values:{"Monospaced Serif":"mono-serif","Proportional Serif":"pro-serif","Monospaced Sans-Serif":"mono-sans","Proportional Sans-Serif":"pro-sans",Casual:"casual",Cursive:"cursive","Small Capitals":"capitals"}},I={type:"slider",min:0,max:400,step:25,upIcon:null,downIcon:null},L={type:"slider",min:0,max:100,step:5,upIcon:null,downIcon:null},C={type:"radio",values:["None","Drop Shadow","Raised","Depressed","Outline"]},n={fontFamily:"pro-sans",fontSize:"100%",textColor:"#ffffff",textOpacity:"100%",textShadow:"none",textBg:"#000000",textBgOpacity:"100%",displayBg:"#000000",displayBgOpacity:"0%"},a=Object.keys(n).reduce((t,e)=>({...t,[e]:T(n[e])}),{});for(const t of Object.keys(a)){const e=localStorage.getItem(`vds-player:${S(t)}`);v(e)&&a[t].set(e)}function N(){for(const t of Object.keys(a)){const e=n[t];a[t].set(e)}}export{a as F,E as L,n as a,A as b,x as c,C as d,I as e,L as f,u as m,N as o,w as s};
