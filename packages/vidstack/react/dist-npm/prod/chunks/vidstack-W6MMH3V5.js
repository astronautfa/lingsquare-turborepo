import{a as P,b as d,c as v,d as h}from"./vidstack-UWTXLL5O.js";import{P as b,Q as E}from"./vidstack-2UVVF4DI.js";import{Ia as m}from"./vidstack-EWFRKCDB.js";import{k as a}from"./vidstack-7GZB5QIO.js";import*as e from"react";import{Internals as p,random as I}from"remotion";var y=e.forwardRef(({frame:r,renderLoading:n,errorFallback:s,onError:l,...t},i)=>{let o=E("currentSrc"),u=e.useMemo(()=>new P,[]);m(o)&&!o.compositionWidth&&(o={compositionWidth:1920,compositionHeight:1080,fps:30,...o}),e.useEffect(()=>(u.setSrc(m(o)?o:null),()=>void u.setSrc(null)),[o]);let S=p.useLazyComponent({component:o.src}),c=e.useMemo(()=>String(I(null)),[]),R=e.useMemo(()=>({rootId:c,frame:{[d]:r},playing:!1,playbackRate:1,setPlaybackRate:a,audioAndVideoTags:{current:[]},imperativePlaying:{current:!1}}),[c]),g=e.useMemo(()=>({...R,frame:{[d]:r}}),[R,r]),f=e.useMemo(()=>({mediaMuted:!0,mediaVolume:0,setMediaMuted:a,setMediaVolume:a}),[]),[,C]=e.useState(0);return e.useEffect(()=>{C(1)},[]),m(o)?e.createElement(v,{src:o,component:S,timeline:g,mediaVolume:f,setMediaVolume:f,numberOfSharedAudioTags:0},e.createElement(b.div,{...t,ref:i,"data-remotion-thumbnail":!0},e.createElement("div",{"data-remotion-canvas":!0},e.createElement("div",{"data-remotion-container":!0,ref:M=>{u.setContainer(M)}},e.createElement(T,{inputProps:o.inputProps,renderLoading:n??o.renderLoading,errorFallback:s??o.errorFallback,onError:l??o.onError}))))):null});y.displayName="RemotionThumbnail";var w=y;function T({inputProps:r,renderLoading:n,errorFallback:s,onError:l}){let t=p.useVideo(),i=t?t.component:null,o=e.useMemo(()=>n?.(),[n]);return e.createElement(e.Suspense,{fallback:o},i?e.createElement(h,{fallback:s,onError:l},e.createElement(p.ClipComposition,null,e.createElement(i,{...t?.props,...r}))):null)}T.displayName="RemotionThumbnailUI";export{w as a};
