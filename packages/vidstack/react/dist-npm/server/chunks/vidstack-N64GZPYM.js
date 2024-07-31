import{a as A}from"./vidstack-2THMY37V.js";import{A as fe,B as Re,C as ue,D as Pe,E as Te,F as ve,G as ye,I as Be,J as xe,L as ge,N as z,O as he,P as n,Q as Ee,g as ee,h as te,i as re,j as oe,k as ne,l as ae,m as ie,o as se,s as ce,t as me,u as le,y as de,z as pe}from"./vidstack-T3YB2P2M.js";import{b as Y,d as Z}from"./vidstack-7EEF72GH.js";import{g as X}from"./vidstack-3NDWMYL6.js";import{$ as c,_ as Q,aa as O,ba as f,h as K,k,la as a,q as w,u as J}from"./vidstack-DK4Y24W7.js";import{b as y}from"./vidstack-JGGQ3EWW.js";function B(){return Q(Z)}import*as g from"react";var Qe=a(ie,{domEventsRegex:/^onMedia/}),Xe=g.forwardRef(({children:e,...r},o)=>g.createElement(Qe,{...r},t=>g.createElement(n.button,{...t,ref:c(t.ref,o)},e)));Xe.displayName="AirPlayButton";import*as h from"react";var Ye=a(ae,{domEventsRegex:/^onMedia/}),Ze=h.forwardRef(({children:e,...r},o)=>h.createElement(Ye,{...r},t=>h.createElement(n.button,{...t,ref:c(t.ref,o)},e)));Ze.displayName="PlayButton";import*as E from"react";var et=a(ee,{domEventsRegex:/^onMedia/}),tt=E.forwardRef(({children:e,...r},o)=>E.createElement(et,{...r},t=>E.createElement(n.button,{...t,ref:c(t.ref,o)},e)));tt.displayName="CaptionButton";import*as C from"react";var rt=a(te,{domEventsRegex:/^onMedia/}),ot=C.forwardRef(({children:e,...r},o)=>C.createElement(rt,{...r},t=>C.createElement(n.button,{...t,ref:c(t.ref,o)},e)));ot.displayName="FullscreenButton";import*as I from"react";var nt=a(oe,{domEventsRegex:/^onMedia/}),at=I.forwardRef(({children:e,...r},o)=>I.createElement(nt,{...r},t=>I.createElement(n.button,{...t,ref:c(t.ref,o)},e)));at.displayName="MuteButton";import*as M from"react";var it=a(ne,{domEventsRegex:/^onMedia/}),st=M.forwardRef(({children:e,...r},o)=>M.createElement(it,{...r},t=>M.createElement(n.button,{...t,ref:c(t.ref,o)},e)));st.displayName="PIPButton";import*as S from"react";var ct=a(se,{domEventsRegex:/^onMedia/}),mt=S.forwardRef(({children:e,...r},o)=>S.createElement(ct,{...r},t=>S.createElement(n.button,{...t,ref:c(t.ref,o)},e)));mt.displayName="SeekButton";import*as b from"react";var lt=a(re,{domEventsRegex:/^onMedia/}),dt=b.forwardRef(({children:e,...r},o)=>b.createElement(lt,{...r},t=>b.createElement(n.button,{...t,ref:c(t.ref,o)},e)));dt.displayName="LiveButton";var Rt={};y(Rt,{Preview:()=>F,Root:()=>Ie,Steps:()=>_,Thumb:()=>$,Track:()=>G,TrackFill:()=>W,Value:()=>L});import*as p from"react";var x=["onDragStart","onDragEnd","onDragValueChange","onValueChange","onPointerValueChange"];var Ce=a(pe);var pt=a(ce,{events:x}),Ie=p.forwardRef(({children:e,...r},o)=>p.createElement(pt,{...r,ref:o},t=>p.createElement(n.div,{...t},e)));Ie.displayName="Slider";var $=p.forwardRef((e,r)=>p.createElement(n.div,{...e,ref:r}));$.displayName="SliderThumb";var G=p.forwardRef((e,r)=>p.createElement(n.div,{...e,ref:r}));G.displayName="SliderTrack";var W=p.forwardRef((e,r)=>p.createElement(n.div,{...e,ref:r}));W.displayName="SliderTrackFill";var ft=a(Re),F=p.forwardRef(({children:e,...r},o)=>p.createElement(ft,{...r},t=>p.createElement(n.div,{...t,ref:c(t.ref,o)},e)));F.displayName="SliderPreview";var L=p.forwardRef(({children:e,...r},o)=>p.createElement(Ce,{...r},(t,s)=>{let m=f(()=>s.getValueText(),s);return p.createElement(n.div,{...t,ref:o},m,e)}));L.displayName="SliderValue";var _=p.forwardRef(({children:e,...r},o)=>{let t=A("min"),s=A("max"),m=A("step"),d=(s-t)/m;return p.createElement(n.div,{...r,ref:o},Array.from({length:Math.floor(d)+1}).map((l,P)=>e(P)))});_.displayName="SliderSteps";var Pt={};y(Pt,{Preview:()=>F,Root:()=>Me,Steps:()=>_,Thumb:()=>$,Track:()=>G,TrackFill:()=>W,Value:()=>L});import*as N from"react";var ut=a(le,{events:x,domEventsRegex:/^onMedia/}),Me=N.forwardRef(({children:e,...r},o)=>N.createElement(ut,{...r,ref:o},t=>N.createElement(n.div,{...t},e)));Me.displayName="VolumeSlider";var be={};y(be,{Img:()=>j,Root:()=>Se});import*as T from"react";var Tt=a(z),Se=T.forwardRef(({children:e,...r},o)=>T.createElement(Tt,{...r},t=>T.createElement(n.div,{...t,ref:c(t.ref,o)},e)));Se.displayName="Thumbnail";var j=T.forwardRef(({children:e,...r},o)=>{let{src:t,img:s,crossOrigin:m}=O(z.state),d=f(t),l=f(m);return T.createElement(n.img,{crossOrigin:l,...r,src:d,ref:c(s.set,o)},e)});j.displayName="ThumbnailImg";var ht={};y(ht,{ChapterTitle:()=>ke,Chapters:()=>He,Preview:()=>F,Progress:()=>we,Root:()=>Ne,Steps:()=>_,Thumb:()=>$,Thumbnail:()=>xt,Track:()=>G,TrackFill:()=>W,Value:()=>L,Video:()=>Ae});import*as i from"react";function Le(e=0,r=0,o=""){return{startTime:e,endTime:r,text:o,addEventListener:k,removeEventListener:k,dispatchEvent:k}}var D=i.createContext({$chapters:K(null)});D.displayName="TimeSliderContext";var vt=a(me,{events:x,domEventsRegex:/^onMedia/}),Ne=i.forwardRef(({children:e,...r},o)=>{let t=i.useMemo(()=>K(null),[]);return i.createElement(D.Provider,{value:{$chapters:t}},i.createElement(vt,{...r,ref:o},s=>i.createElement(n.div,{...s},e)))});Ne.displayName="TimeSlider";var yt=a(ue),He=i.forwardRef(({children:e,...r},o)=>i.createElement(yt,{...r},(t,s)=>i.createElement(n.div,{...t,ref:c(t.ref,o)},i.createElement(Ve,{instance:s},e))));He.displayName="SliderChapters";function Ve({instance:e,children:r}){let o=f(()=>e.cues,e),t=i.useRef([]),s=i.useRef(),{$chapters:m}=i.useContext(D);return s.current||(s.current=Le()),i.useEffect(()=>(m.set(e),()=>void m.set(null)),[e]),i.useEffect(()=>{e.setRefs(t.current)},[o]),r(o.length?o:[s.current],d=>{if(!d){t.current.length=0;return}t.current.push(d)})}Ve.displayName="SliderChapterTracks";var ke=i.forwardRef(({children:e,...r},o)=>{let{$chapters:t}=i.useContext(D),[s,m]=i.useState();return i.useEffect(()=>J(()=>{let d=t(),l=d?.activePointerCue||d?.activeCue;m(l?.text||"")}),[]),i.createElement(n.div,{...r,ref:o},s,e)});ke.displayName="SliderChapterTitle";var we=i.forwardRef((e,r)=>i.createElement(n.div,{...e,ref:r}));we.displayName="SliderProgress";var Bt=a(de),Oe=i.forwardRef(({children:e,...r},o)=>i.createElement(Bt,{...r},t=>i.createElement(n.div,{...t,ref:c(t.ref,o)},e)));Oe.displayName="SliderThumbnail";var xt={Root:Oe,Img:j},gt=a(fe,{events:["onCanPlay","onError"]}),Ae=i.forwardRef(({children:e,...r},o)=>i.createElement(gt,{...r},(t,s)=>i.createElement($e,{...t,instance:s,ref:c(t.ref,o)},e)));Ae.displayName="SliderVideo";var $e=i.forwardRef(({instance:e,children:r,...o},t)=>{let{canLoad:s}=O(Y),{src:m,video:d,crossOrigin:l}=e.$state,P=f(m),V=f(s),Je=f(l);return i.createElement(n.video,{style:{maxWidth:"unset"},...o,src:P||void 0,muted:!0,playsInline:!0,preload:V?"auto":"none",crossOrigin:Je||void 0,ref:c(d.set,t)},r)});$e.displayName="SliderVideoProvider";var It={};y(It,{Item:()=>q,Root:()=>U});import*as u from"react";var Et=a(Be,{events:["onChange"]}),U=u.forwardRef(({children:e,...r},o)=>u.createElement(Et,{...r,ref:o},t=>u.createElement(n.div,{...t},e)));U.displayName="RadioGroup";var Ct=a(xe,{events:["onChange","onSelect"]}),q=u.forwardRef(({children:e,...r},o)=>u.createElement(Ct,{...r},t=>u.createElement(n.div,{...t,ref:c(t.ref,o)},e)));q.displayName="RadioItem";var Ht={};y(Ht,{Button:()=>We,Content:()=>_e,Item:()=>je,Items:()=>_e,Portal:()=>Fe,Radio:()=>q,RadioGroup:()=>U,Root:()=>Ge});import*as R from"react";import{createPortal as Mt}from"react-dom";var St=a(Pe,{events:["onOpen","onClose"],domEventsRegex:/^onMedia/}),Ge=R.forwardRef(({children:e,...r},o)=>R.createElement(St,{...r,ref:o},(t,s)=>R.createElement(n.div,{...t,style:{display:s.isSubmenu?void 0:"contents",...t.style}},e)));Ge.displayName="Menu";var bt=a(Te,{events:["onSelect"]}),We=R.forwardRef(({children:e,...r},o)=>R.createElement(bt,{...r},t=>R.createElement(n.button,{...t,ref:c(t.ref,o)},e)));We.displayName="MenuButton";var Fe=R.forwardRef(({container:e=null,disabled:r=!1,children:o,...t},s)=>{let m=Ee("fullscreen"),d=r==="fullscreen"?!m:!r,l=R.useMemo(()=>null,[e]);return!l||!d?o:Mt(R.createElement(n.div,{...t,style:{display:"contents",...t.style},ref:s},o),l)});Fe.displayName="MenuPortal";var Lt=a(ve),_e=R.forwardRef(({children:e,...r},o)=>R.createElement(Lt,{...r},t=>R.createElement(n.div,{...t,ref:c(t.ref,o)},e)));_e.displayName="MenuItems";var Nt=a(ye),je=R.forwardRef(({children:e,...r},o)=>R.createElement(Nt,{...r},t=>R.createElement(n.div,{...t,ref:c(t.ref,o)},e)));je.displayName="MenuItem";import*as H from"react";var Vt=a(ge,{events:["onWillTrigger","onTrigger"]}),kt=H.forwardRef(({children:e,...r},o)=>H.createElement(Vt,{...r,ref:o},t=>H.createElement(n.div,{...t},e)));kt.displayName="Gesture";import*as v from"react";var wt=a(he),Ot=v.forwardRef(({children:e,...r},o)=>v.createElement(wt,{...r},(t,s)=>v.createElement(De,{...t,instance:s,ref:c(t.ref,o)},e)));Ot.displayName="Time";var De=v.forwardRef(({instance:e,children:r,...o},t)=>{let{timeText:s}=e.$state,m=f(s);return v.createElement(n.div,{...o,ref:t},m,r)});De.displayName="TimeText";function Ro(){return B()?.player||null}import*as qe from"react";function vo(){let e=B(),{audioTracks:r,audioTrack:o}=e.$state,t=f(r);return f(o),qe.useMemo(()=>{let s=t.map(m=>({track:m,label:m.label,value:Ue(m),get selected(){return o()===m},select(d){let l=r().indexOf(m);l>=0&&e.remote.changeAudioTrack(l,d)}}));return Object.defineProperty(s,"disabled",{get(){return s.length<=1}}),Object.defineProperty(s,"selectedTrack",{get(){return o()}}),Object.defineProperty(s,"selectedValue",{get(){let m=o();return m?Ue(m):void 0}}),s},[t])}function Ue(e){return e.label.toLowerCase()}import*as ze from"react";function Eo({off:e=!0}={}){let r=B(),{textTracks:o,textTrack:t}=r.$state,s=f(o);return f(t),ze.useMemo(()=>{let m=s.filter(X),d=m.map(l=>({track:l,label:l.label,value:Ke(l),get selected(){return t()===l},select(P){let V=o().indexOf(l);V>=0&&r.remote.changeTextTrackMode(V,"showing",P)}}));return e&&d.unshift({track:null,label:w(e)?e:"Off",value:"off",get selected(){return!t()},select(l){r.remote.toggleCaptions(l)}}),Object.defineProperty(d,"disabled",{get(){return!m.length}}),Object.defineProperty(d,"selectedTrack",{get(){return t()}}),Object.defineProperty(d,"selectedValue",{get(){let l=t();return l?Ke(l):"off"}}),d},[s])}function Ke(e){return e.id+":"+e.kind+"-"+e.label.toLowerCase()}export{B as a,Xe as b,Ze as c,tt as d,ot as e,at as f,st as g,mt as h,dt as i,x as j,Ie as k,$ as l,G as m,W as n,F as o,L as p,_ as q,Rt as r,Me as s,Pt as t,Se as u,j as v,be as w,Ne as x,He as y,ke as z,we as A,xt as B,ht as C,U as D,q as E,It as F,Ge as G,We as H,Fe as I,_e as J,Ht as K,kt as L,Ot as M,Ro as N,vo as O,Eo as P};
