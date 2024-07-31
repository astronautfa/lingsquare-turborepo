import{a,c as Ft,d as At}from"./vidstack-I3NGMVWZ.js";import{a as It,b as Rt}from"./vidstack-5IDZ3MKZ.js";import{b as h,c as m}from"./vidstack-HDVJ2P4K.js";import{r as Ot,s as wt,u as Z}from"./vidstack-SKR3AJXQ.js";import{c as Y}from"./vidstack-CRUGUF5W.js";import{e as Pt}from"./vidstack-BQBKKLOB.js";import{$ as G,D as St,F as A,I as v,J as c,L as I,M as Tt,N as Dt,O as Ct,U as Mt,Y as L,_ as ot,a as vt,c as bt,da as kt,e as yt,f as $t,h as gt,k as xt,n as P,o as ht,p as E,q as C}from"./vidstack-XC7WIXLW.js";var at=Tt();function l(){return Ct(at)}function eo(e,t){I(()=>{let{player:o}=h(),n=o.el;return n&&A(n,"data-layout",t()&&e),()=>n?.removeAttribute("data-layout")})}import{html as se}from"lit-html";function X(e,t){return se`
    <media-menu-portal .container=${a(e)} disabled="fullscreen">
      ${t}
    </media-menu-portal>
  `}function mo(e,t,o,n){let i=P(t)?document.querySelector(t):t;i||(i=e?.closest("dialog")),i||(i=document.body);let s=document.createElement("div");s.style.display="contents",s.classList.add(o),i.append(s),I(()=>{if(!s)return;let{viewType:p}=m(),d=n();A(s,"data-view-type",p()),A(s,"data-sm",d),A(s,"data-lg",!d),A(s,"data-size",d?"sm":"lg")});let{colorScheme:u}=l();return Z(s,u),s}var Lt=class extends At{async loadIcons(){let t=(await import("./vidstack-4PHWNLLP.js")).icons,o={};for(let n of Object.keys(t))o[n]=Ft({name:n,paths:t[n]});return o}};var Bt={colorScheme:"system",download:null,customIcons:!1,disableTimeSlider:!1,menuContainer:null,menuGroup:"bottom",noAudioGain:!1,noGestures:!1,noKeyboardAnimations:!1,noModal:!1,noScrubGesture:!1,playbackRates:{min:0,max:2,step:.25},audioGains:{min:0,max:300,step:25},seekStep:10,sliderChaptersMinWidth:325,hideQualityBitrate:!1,smallWhen:!1,thumbnails:null,translations:null,when:!1};var Nt=class extends Mt{static props=Bt;#o;#e=c(()=>{let t=this.$props.when();return this.#a(t)});#t=c(()=>{let t=this.$props.smallWhen();return this.#a(t)});get isMatch(){return this.#e()}get isSmallLayout(){return this.#t()}onSetup(){this.#o=h(),this.setAttributes({"data-match":this.#e,"data-sm":()=>this.#t()?"":null,"data-lg":()=>this.#t()?null:"","data-size":()=>this.#t()?"sm":"lg","data-no-scrub-gesture":this.$props.noScrubGesture});let t=this;Dt(at,{...this.$props,when:this.#e,smallWhen:this.#t,userPrefersAnnouncements:v(!0),userPrefersKeyboardAnimations:v(!0),menuPortal:v(null)})}onAttach(t){Z(t,this.$props.colorScheme)}#a(t){return t!=="never"&&(ht(t)?t:c(()=>t(this.#o.player.state))())}};function f(e,t){return e()?.[t]??t}import{html as le}from"lit-html";function Oo(){return a(()=>{let{translations:e,userPrefersAnnouncements:t}=l();return t()?le`<media-announcer .translations=${a(e)}></media-announcer>`:null})}import{html as k}from"lit-html";import{ref as me}from"lit-html/directives/ref.js";import{html as ue}from"lit-html";function y(e,t=""){return ue`<slot
    name=${`${e}-icon`}
    data-class=${`vds-icon vds-${e}-icon${t?` ${t}`:""}`}
  ></slot>`}function W(e){return e.map(t=>y(t))}function r(e,t){return a(()=>f(e,t))}function zo({tooltip:e}){let{translations:t}=l(),{remotePlaybackState:o}=m(),n=a(()=>{let s=f(t,"AirPlay"),u=ot(o());return`${s} ${u}`}),i=r(t,"AirPlay");return k`
    <media-tooltip class="vds-airplay-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-airplay-button class="vds-airplay-button vds-button" aria-label=${n}>
          ${y("airplay")}
        </media-airplay-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-airplay-tooltip-text">${i}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function qo({tooltip:e}){let{translations:t}=l(),{remotePlaybackState:o}=m(),n=a(()=>{let s=f(t,"Google Cast"),u=ot(o());return`${s} ${u}`}),i=r(t,"Google Cast");return k`
    <media-tooltip class="vds-google-cast-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-google-cast-button class="vds-google-cast-button vds-button" aria-label=${n}>
          ${y("google-cast")}
        </media-google-cast-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-google-cast-tooltip-text">${i}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Uo({tooltip:e}){let{translations:t}=l(),o=r(t,"Play"),n=r(t,"Pause");return k`
    <media-tooltip class="vds-play-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-play-button
          class="vds-play-button vds-button"
          aria-label=${r(t,"Play")}
        >
          ${W(["play","pause","replay"])}
        </media-play-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-play-tooltip-text">${o}</span>
        <span class="vds-pause-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function nt({tooltip:e,ref:t=gt}){let{translations:o}=l(),n=r(o,"Mute"),i=r(o,"Unmute");return k`
    <media-tooltip class="vds-mute-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-mute-button
          class="vds-mute-button vds-button"
          aria-label=${r(o,"Mute")}
          ${me(t)}
        >
          ${W(["mute","volume-low","volume-high"])}
        </media-mute-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-mute-tooltip-text">${i}</span>
        <span class="vds-unmute-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function jo({tooltip:e}){let{translations:t}=l(),o=r(t,"Closed-Captions On"),n=r(t,"Closed-Captions Off");return k`
    <media-tooltip class="vds-caption-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-caption-button
          class="vds-caption-button vds-button"
          aria-label=${r(t,"Captions")}
        >
          ${W(["cc-on","cc-off"])}
        </media-caption-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-cc-on-tooltip-text">${n}</span>
        <span class="vds-cc-off-tooltip-text">${o}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Yo(){let{translations:e}=l(),t=r(e,"Enter PiP"),o=r(e,"Exit PiP");return k`
    <media-tooltip class="vds-pip-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-pip-button
          class="vds-pip-button vds-button"
          aria-label=${r(e,"PiP")}
        >
          ${W(["pip-enter","pip-exit"])}
        </media-pip-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content">
        <span class="vds-pip-enter-tooltip-text">${t}</span>
        <span class="vds-pip-exit-tooltip-text">${o}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Zo({tooltip:e}){let{translations:t}=l(),o=r(t,"Enter Fullscreen"),n=r(t,"Exit Fullscreen");return k`
    <media-tooltip class="vds-fullscreen-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-fullscreen-button
          class="vds-fullscreen-button vds-button"
          aria-label=${r(t,"Fullscreen")}
        >
          ${W(["fs-enter","fs-exit"])}
        </media-fullscreen-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-fs-enter-tooltip-text">${o}</span>
        <span class="vds-fs-exit-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Xo({backward:e,tooltip:t}){let{translations:o,seekStep:n}=l(),i=e?"Seek Backward":"Seek Forward",s=r(o,i);return k`
    <media-tooltip class="vds-seek-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-seek-button
          class="vds-seek-button vds-button"
          seconds=${a(()=>(e?-1:1)*n())}
          aria-label=${s}
        >
          ${e?y("seek-backward"):y("seek-forward")}
        </media-seek-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        ${r(o,i)}
      </media-tooltip-content>
    </media-tooltip>
  `}function it(){let{translations:e}=l(),{live:t}=m(),o=r(e,"Skip To Live"),n=r(e,"LIVE");return t()?k`
        <media-live-button class="vds-live-button" aria-label=${o}>
          <span class="vds-live-button-text">${n}</span>
        </media-live-button>
      `:null}function Jo(){return a(()=>{let{download:e,translations:t}=l(),o=e();if(xt(o))return null;let{source:n,title:i}=m(),s=n(),u=Pt({title:i(),src:s,download:o});return u?k`
          <media-tooltip class="vds-download-tooltip vds-tooltip">
            <media-tooltip-trigger>
              <a
                role="button"
                class="vds-download-button vds-button"
                aria-label=${r(t,"Download")}
                href=${u.url+`?download=${u.name}`}
                download=${u.name}
                target="_blank"
              >
                <slot name="download-icon" data-class="vds-icon" />
              </a>
            </media-tooltip-trigger>
            <media-tooltip-content class="vds-tooltip-content" placement="top">
              ${r(t,"Download")}
            </media-tooltip-content>
          </media-tooltip>
        `:null})}import{html as de}from"lit-html";function na(){let{translations:e}=l();return de`
    <media-captions
      class="vds-captions"
      .exampleText=${r(e,"Captions look like this")}
    ></media-captions>
  `}import{html as pe}from"lit-html";function sa(){return pe`<div class="vds-controls-spacer"></div>`}import{html as rt}from"lit-html";function ga({placement:e,tooltip:t,portal:o}){let{textTracks:n}=h(),{viewType:i,clipStartTime:s,clipEndTime:u}=m(),{translations:p,thumbnails:d,menuPortal:$,noModal:M,menuGroup:D,smallWhen:b}=l();if(c(()=>{let ie=s(),re=u()||1/0,ct=v(null);return Y(n,"chapters",ct.set),!ct()?.cues.filter(ft=>ft.startTime<=re&&ft.endTime>=ie)?.length})())return null;let g=c(()=>M()?G(e):b()?null:G(e)),K=c(()=>!b()&&D()==="bottom"&&i()==="video"?26:0),H=v(!1);function z(){H.set(!0)}function et(){H.set(!1)}let pt=rt`
    <media-menu-items
      class="vds-chapters-menu-items vds-menu-items"
      placement=${a(g)}
      offset=${a(K)}
    >
      ${a(()=>H()?rt`
          <media-chapters-radio-group
            class="vds-chapters-radio-group vds-radio-group"
            .thumbnails=${a(d)}
          >
            <template>
              <media-radio class="vds-chapter-radio vds-radio">
                <media-thumbnail class="vds-thumbnail"></media-thumbnail>
                <div class="vds-chapter-radio-content">
                  <span class="vds-chapter-radio-label" data-part="label"></span>
                  <span class="vds-chapter-radio-start-time" data-part="start-time"></span>
                  <span class="vds-chapter-radio-duration" data-part="duration"></span>
                </div>
              </media-radio>
            </template>
          </media-chapters-radio-group>
        `:null)}
    </media-menu-items>
  `;return rt`
    <media-menu class="vds-chapters-menu vds-menu" @open=${z} @close=${et}>
      <media-tooltip class="vds-tooltip">
        <media-tooltip-trigger>
          <media-menu-button
            class="vds-menu-button vds-button"
            aria-label=${r(p,"Chapters")}
          >
            ${y("menu-chapters")}
          </media-menu-button>
        </media-tooltip-trigger>
        <media-tooltip-content
          class="vds-tooltip-content"
          placement=${E(t)?a(t):t}
        >
          ${r(p,"Chapters")}
        </media-tooltip-content>
      </media-tooltip>
      ${o?X($,pt):pt}
    </media-menu>
  `}import{html as oe}from"lit-html";function J(e){let{style:t}=new Option;return t.color=e,t.color.match(/\((.*?)\)/)[1].replace(/,/g," ")}var tt={type:"color"},_t={type:"radio",values:{"Monospaced Serif":"mono-serif","Proportional Serif":"pro-serif","Monospaced Sans-Serif":"mono-sans","Proportional Sans-Serif":"pro-sans",Casual:"casual",Cursive:"cursive","Small Capitals":"capitals"}},Et={type:"slider",min:0,max:400,step:25,upIcon:null,downIcon:null},Gt={type:"slider",min:0,max:100,step:5,upIcon:null,downIcon:null},Wt={type:"radio",values:["None","Drop Shadow","Raised","Depressed","Outline"]},q={fontFamily:"pro-sans",fontSize:"100%",textColor:"#ffffff",textOpacity:"100%",textShadow:"none",textBg:"#000000",textBgOpacity:"100%",displayBg:"#000000",displayBgOpacity:"0%"},O=Object.keys(q).reduce((e,t)=>({...e,[t]:v(q[t])}),{});for(let e of Object.keys(O)){let t=localStorage.getItem(`vds-player:${L(e)}`);P(t)&&O[e].set(t)}function Vt(){for(let e of Object.keys(O)){let t=q[e];O[e].set(t)}}var Qt=!1,st=new Set;function Kt(){let{player:e}=h();st.add(e),$t(()=>st.delete(e)),Qt||(yt(()=>{for(let t of kt(O)){let o=O[t],n=q[t],i=`--media-user-${L(t)}`,s=`vds-player:${L(t)}`;I(()=>{let u=o(),p=u===n,d=p?null:ce(e,t,u);for(let $ of st)$.el?.style.setProperty(i,d);p?localStorage.removeItem(s):localStorage.setItem(s,u)})}},null),Qt=!0)}function ce(e,t,o){switch(t){case"fontFamily":let n=o==="capitals"?"small-caps":"";return e.el?.style.setProperty("--media-user-font-variant",n),ve(o);case"fontSize":case"textOpacity":case"textBgOpacity":case"displayBgOpacity":return fe(o);case"textColor":return`rgb(${J(o)} / var(--media-user-text-opacity, 1))`;case"textShadow":return be(o);case"textBg":return`rgb(${J(o)} / var(--media-user-text-bg-opacity, 1))`;case"displayBg":return`rgb(${J(o)} / var(--media-user-display-bg-opacity, 1))`}}function fe(e){return(parseInt(e)/100).toString()}function ve(e){switch(e){case"mono-serif":return'"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';case"mono-sans":return'"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';case"pro-sans":return'Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';case"casual":return'"Comic Sans MS", Impact, Handlee, fantasy';case"cursive":return'"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';case"capitals":return'"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif + font-variant=small-caps';default:return'"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif'}}function be(e){switch(e){case"drop shadow":return"rgb(34, 34, 34) 1.86389px 1.86389px 2.79583px, rgb(34, 34, 34) 1.86389px 1.86389px 3.72778px, rgb(34, 34, 34) 1.86389px 1.86389px 4.65972px";case"raised":return"rgb(34, 34, 34) 1px 1px, rgb(34, 34, 34) 2px 2px";case"depressed":return"rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px";case"outline":return"rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px";default:return""}}import{html as we}from"lit-html";import{html as U}from"lit-html";import{html as R}from"lit-html";var ye=0;function x({label:e="",value:t="",children:o}){if(!e)return R`
      <div class="vds-menu-section">
        <div class="vds-menu-section-body">${o}</div>
      </div>
    `;let n=`vds-menu-section-${++ye}`;return R`
    <section class="vds-menu-section" role="group" aria-labelledby=${n}>
      <div class="vds-menu-section-title">
        <header id=${n}>${e}</header>
        ${t?R`<div class="vds-menu-section-value">${t}</div>`:null}
      </div>
      <div class="vds-menu-section-body">${o}</div>
    </section>
  `}function F({label:e,children:t}){return R`
    <div class="vds-menu-item">
      <div class="vds-menu-item-label">${e}</div>
      ${t}
    </div>
  `}function T({label:e,icon:t,hint:o}){return R`
    <media-menu-button class="vds-menu-item">
      ${y("menu-arrow-left","vds-menu-close-icon")}
      ${t?y(t,"vds-menu-item-icon"):null}
      <span class="vds-menu-item-label">${a(e)}</span>
      <span class="vds-menu-item-hint" data-part="hint">${o?a(o):null} </span>
      ${y("menu-arrow-right","vds-menu-open-icon")}
    </media-menu-button>
  `}function Ht({value:e=null,options:t,hideLabel:o=!1,children:n=null,onChange:i=null}){function s(u){let{value:p,label:d}=u;return R`
      <media-radio class="vds-radio" value=${p}>
        ${y("menu-radio-check")}
        ${o?null:R`
              <span class="vds-radio-label" data-part="label">
                ${P(d)?d:a(d)}
              </span>
            `}
        ${E(n)?n(u):n}
      </media-radio>
    `}return R`
    <media-radio-group
      class="vds-radio-group"
      value=${P(e)?e:e?a(e):""}
      @change=${i}
    >
      ${C(t)?t.map(s):a(()=>t().map(s))}
    </media-radio-group>
  `}function zt(e){return C(e)?e.map(t=>({label:t,value:t.toLowerCase()})):Object.keys(e).map(t=>({label:t,value:e[t]}))}import{html as V}from"lit-html";function B(){return V`
    <div class="vds-slider-track"></div>
    <div class="vds-slider-track-fill vds-slider-track"></div>
    <div class="vds-slider-thumb"></div>
  `}function N(){return V`
    <media-slider-steps class="vds-slider-steps">
      <template>
        <div class="vds-slider-step"></div>
      </template>
    </media-slider-steps>
  `}function _({label:e=null,value:t=null,upIcon:o="",downIcon:n="",children:i,isMin:s,isMax:u}){let p=e||t,d=[n?y(n,"down"):null,i,o?y(o,"up"):null];return V`
    <div
      class=${`vds-menu-item vds-menu-slider-item${p?" group":""}`}
      data-min=${a(()=>s()?"":null)}
      data-max=${a(()=>u()?"":null)}
    >
      ${p?V`
            <div class="vds-menu-slider-title">
              ${[e?V`<div>${e}</div>`:null,t?V`<div>${t}</div>`:null]}
            </div>
            <div class="vds-menu-slider-body">${d}</div>
          `:d}
    </div>
  `}var $e={...Et,upIcon:"menu-opacity-up",downIcon:"menu-opacity-down"},lt={...Gt,upIcon:"menu-opacity-up",downIcon:"menu-opacity-down"};function qt(){return a(()=>{let{hasCaptions:e}=m(),{translations:t}=l();return e()?U`
      <media-menu class="vds-font-menu vds-menu">
        ${T({label:()=>f(t,"Caption Styles")})}
        <media-menu-items class="vds-menu-items">
          ${[x({label:r(t,"Font"),children:[ge(),xe()]}),x({label:r(t,"Text"),children:[he(),Te(),Se()]}),x({label:r(t,"Text Background"),children:[De(),Ce()]}),x({label:r(t,"Display Background"),children:[Me(),ke()]}),x({children:[Pe()]})]}
        </media-menu-items>
      </media-menu>
    `:null})}function ge(){return w({label:"Family",option:_t,type:"fontFamily"})}function xe(){return w({label:"Size",option:$e,type:"fontSize"})}function he(){return w({label:"Color",option:tt,type:"textColor"})}function Se(){return w({label:"Opacity",option:lt,type:"textOpacity"})}function Te(){return w({label:"Shadow",option:Wt,type:"textShadow"})}function De(){return w({label:"Color",option:tt,type:"textBg"})}function Ce(){return w({label:"Opacity",option:lt,type:"textBgOpacity"})}function Me(){return w({label:"Color",option:tt,type:"displayBg"})}function ke(){return w({label:"Opacity",option:lt,type:"displayBgOpacity"})}function Pe(){let{translations:e}=l();return U`
    <button class="vds-menu-item" role="menuitem" @click=${Vt}>
      <span class="vds-menu-item-label">${a(()=>f(e,"Reset"))}</span>
    </button>
  `}function w({label:e,option:t,type:o}){let{player:n}=h(),{translations:i}=l(),s=O[o],u=()=>f(i,e);function p(){bt(),n.dispatchEvent(new Event("vds-font-change"))}if(t.type==="color"){let b=function(S){s.set(S.target.value),p()};var M=b;return F({label:a(u),children:U`
        <input
          class="vds-color-picker"
          type="color"
          .value=${a(s)}
          @input=${b}
        />
      `})}if(t.type==="slider"){let z=function(et){s.set(et.detail+"%"),p()};var D=z;let{min:b,max:S,step:g,upIcon:K,downIcon:H}=t;return _({label:a(u),value:a(s),upIcon:K,downIcon:H,isMin:()=>s()===b+"%",isMax:()=>s()===S+"%",children:U`
        <media-slider
          class="vds-slider"
          min=${b}
          max=${S}
          step=${g}
          key-step=${g}
          .value=${a(()=>parseInt(s()))}
          aria-label=${a(u)}
          @value-change=${z}
          @drag-value-change=${z}
        >
          ${B()}${N()}
        </media-slider>
      `})}let d=zt(t.values),$=()=>{let b=s(),S=d.find(g=>g.value===b)?.label||"";return f(i,P(S)?S:S())};return U`
    <media-menu class=${`vds-${L(o)}-menu vds-menu`}>
      ${T({label:u,hint:$})}
      <media-menu-items class="vds-menu-items">
        ${Ht({value:s,options:d,onChange({detail:b}){s.set(b),p()}})}
      </media-menu-items>
    </media-menu>
  `}import{html as Oe}from"lit-html";function Q({label:e,checked:t,defaultChecked:o=!1,storageKey:n,onChange:i}){let{translations:s}=l(),u=n?localStorage.getItem(n):null,p=v(!!(u??o)),d=v(!1),$=a(Rt(p)),M=r(s,e);n&&i(vt(p)),t&&I(()=>void p.set(t()));function D(g){g?.button!==1&&(p.set(K=>!K),n&&localStorage.setItem(n,p()?"1":""),i(p(),g),d.set(!1))}function b(g){St(g)&&D()}function S(g){g.button===0&&d.set(!0)}return Oe`
    <div
      class="vds-menu-checkbox"
      role="menuitemcheckbox"
      tabindex="0"
      aria-label=${M}
      aria-checked=${$}
      data-active=${a(()=>d()?"":null)}
      @pointerup=${D}
      @pointerdown=${S}
      @keydown=${b}
    ></div>
  `}function Ut(){return a(()=>{let{translations:e}=l();return we`
      <media-menu class="vds-accessibility-menu vds-menu">
        ${T({label:()=>f(e,"Accessibility"),icon:"menu-accessibility"})}
        <media-menu-items class="vds-menu-items">
          ${[x({children:[Ie(),Re()]}),x({children:[qt()]})]}
        </media-menu-items>
      </media-menu>
    `})}function Ie(){let{userPrefersAnnouncements:e,translations:t}=l(),o="Announcements";return F({label:r(t,o),children:Q({label:o,storageKey:"vds-player::announcements",onChange(n){e.set(n)}})})}function Re(){return a(()=>{let{translations:e,userPrefersKeyboardAnimations:t,noKeyboardAnimations:o}=l(),{viewType:n}=m();if(c(()=>n()!=="video"||o())())return null;let s="Keyboard Animations";return F({label:r(e,s),children:Q({label:s,defaultChecked:!0,storageKey:"vds-player::keyboard-animations",onChange(u){t.set(u)}})})})}import{html as ut}from"lit-html";function jt(){return a(()=>{let{noAudioGain:e,translations:t}=l(),{audioTracks:o,canSetAudioGain:n}=m();return c(()=>!(n()&&!e())&&o().length<=1)()?null:ut`
      <media-menu class="vds-audio-menu vds-menu">
        ${T({label:()=>f(t,"Audio"),icon:"menu-audio"})}
        <media-menu-items class="vds-menu-items">
          ${[Fe(),Ae()]}
        </media-menu-items>
      </media-menu>
    `})}function Fe(){return a(()=>{let{translations:e}=l(),{audioTracks:t}=m(),o=r(e,"Default");return c(()=>t().length<=1)()?null:x({children:ut`
        <media-menu class="vds-audio-tracks-menu vds-menu">
          ${T({label:()=>f(e,"Track")})}
          <media-menu-items class="vds-menu-items">
            <media-audio-radio-group
              class="vds-audio-track-radio-group vds-radio-group"
              empty-label=${o}
            >
              <template>
                <media-radio class="vds-audio-track-radio vds-radio">
                  <slot name="menu-radio-check-icon" data-class="vds-icon"></slot>
                  <span class="vds-radio-label" data-part="label"></span>
                </media-radio>
              </template>
            </media-audio-radio-group>
          </media-menu-items>
        </media-menu>
      `})})}function Ae(){return a(()=>{let{noAudioGain:e,translations:t}=l(),{canSetAudioGain:o}=m();if(c(()=>!o()||e())())return null;let{audioGain:i}=m();return x({label:r(t,"Boost"),value:a(()=>Math.round(((i()??1)-1)*100)+"%"),children:[_({upIcon:"menu-audio-boost-up",downIcon:"menu-audio-boost-down",children:Le(),isMin:()=>((i()??1)-1)*100<=Yt(),isMax:()=>((i()??1)-1)*100===Zt()})]})})}function Le(){let{translations:e}=l(),t=r(e,"Boost"),o=Yt,n=Zt,i=Be;return ut`
    <media-audio-gain-slider
      class="vds-audio-gain-slider vds-slider"
      aria-label=${t}
      min=${a(o)}
      max=${a(n)}
      step=${a(i)}
      key-step=${a(i)}
    >
      ${B()}${N()}
    </media-audio-gain-slider>
  `}function Yt(){let{audioGains:e}=l(),t=e();return C(t)?t[0]??0:t.min}function Zt(){let{audioGains:e}=l(),t=e();return C(t)?t[t.length-1]??300:t.max}function Be(){let{audioGains:e}=l(),t=e();return C(t)?t[1]-t[0]||25:t.step}import{html as Ne}from"lit-html";function Xt(){return a(()=>{let{translations:e}=l(),{hasCaptions:t}=m(),o=r(e,"Off");return t()?Ne`
      <media-menu class="vds-captions-menu vds-menu">
        ${T({label:()=>f(e,"Captions"),icon:"menu-captions"})}
        <media-menu-items class="vds-menu-items">
          <media-captions-radio-group
            class="vds-captions-radio-group vds-radio-group"
            off-label=${o}
          >
            <template>
              <media-radio class="vds-caption-radio vds-radio">
                <slot name="menu-radio-check-icon" data-class="vds-icon"></slot>
                <span class="vds-radio-label" data-part="label"></span>
              </media-radio>
            </template>
          </media-captions-radio-group>
        </media-menu-items>
      </media-menu>
    `:null})}import{html as mt}from"lit-html";function Jt(){return a(()=>{let{translations:e}=l();return mt`
      <media-menu class="vds-playback-menu vds-menu">
        ${T({label:()=>f(e,"Playback"),icon:"menu-playback"})}
        <media-menu-items class="vds-menu-items">
          ${[x({children:_e()}),Ee(),Qe()]}
        </media-menu-items>
      </media-menu>
    `})}function _e(){let{remote:e}=h(),{translations:t}=l(),o="Loop";return F({label:r(t,o),children:Q({label:o,storageKey:"vds-player::user-loop",onChange(n,i){e.userPrefersLoopChange(n,i)}})})}function Ee(){return a(()=>{let{translations:e}=l(),{canSetPlaybackRate:t,playbackRate:o}=m();return t()?x({label:r(e,"Speed"),value:a(()=>o()===1?f(e,"Normal"):o()+"x"),children:[_({upIcon:"menu-speed-up",downIcon:"menu-speed-down",children:We(),isMin:()=>o()===te(),isMax:()=>o()===ee()})]}):null})}function te(){let{playbackRates:e}=l(),t=e();return C(t)?t[0]??0:t.min}function ee(){let{playbackRates:e}=l(),t=e();return C(t)?t[t.length-1]??2:t.max}function Ge(){let{playbackRates:e}=l(),t=e();return C(t)?t[1]-t[0]||.25:t.step}function We(){let{translations:e}=l(),t=r(e,"Speed"),o=te,n=ee,i=Ge;return mt`
    <media-speed-slider
      class="vds-speed-slider vds-slider"
      aria-label=${t}
      min=${a(o)}
      max=${a(n)}
      step=${a(i)}
      key-step=${a(i)}
    >
      ${B()}${N()}
    </media-speed-slider>
  `}function Ve(){let{remote:e,qualities:t}=h(),{autoQuality:o,canSetQuality:n,qualities:i}=m(),{translations:s}=l(),u="Auto";return c(()=>!n()||i().length<=1)()?null:F({label:r(s,u),children:Q({label:u,checked:o,onChange(d,$){d?e.requestAutoQuality($):e.changeQuality(t.selectedIndex,$)}})})}function Qe(){return a(()=>{let{hideQualityBitrate:e,translations:t}=l(),{canSetQuality:o,qualities:n,quality:i}=m(),s=c(()=>!o()||n().length<=1),u=c(()=>It(n()));return s()?null:x({label:r(t,"Quality"),value:a(()=>{let p=i()?.height,d=e()?null:i()?.bitrate,$=d&&d>0?`${(d/1e6).toFixed(2)} Mbps`:null,M=f(t,"Auto");return p?`${p}p${$?` (${$})`:""}`:M}),children:[_({upIcon:"menu-quality-up",downIcon:"menu-quality-down",children:Ke(),isMin:()=>u()[0]===i(),isMax:()=>u().at(-1)===i()}),Ve()]})})}function Ke(){let{translations:e}=l(),t=r(e,"Quality");return mt`
    <media-quality-slider class="vds-quality-slider vds-slider" aria-label=${t}>
      ${B()}${N()}
    </media-quality-slider>
  `}function mi({placement:e,portal:t,tooltip:o}){return a(()=>{let{viewType:n}=m(),{translations:i,menuPortal:s,noModal:u,menuGroup:p,smallWhen:d}=l(),$=c(()=>u()?G(e):d()?null:G(e)),M=c(()=>!d()&&p()==="bottom"&&n()==="video"?26:0),D=v(!1);Kt();function b(){D.set(!0)}function S(){D.set(!1)}let g=oe`
      <media-menu-items
        class="vds-settings-menu-items vds-menu-items"
        placement=${a($)}
        offset=${a(M)}
      >
        ${a(()=>D()?[Jt(),Ut(),jt(),Xt()]:null)}
      </media-menu-items>
    `;return oe`
      <media-menu class="vds-settings-menu vds-menu" @open=${b} @close=${S}>
        <media-tooltip class="vds-tooltip">
          <media-tooltip-trigger>
            <media-menu-button
              class="vds-menu-button vds-button"
              aria-label=${r(i,"Settings")}
            >
              ${y("menu-settings","vds-rotate-icon")}
            </media-menu-button>
          </media-tooltip-trigger>
          <media-tooltip-content
            class="vds-tooltip-content"
            placement=${E(o)?a(o):o}
          >
            ${r(i,"Settings")}
          </media-tooltip-content>
        </media-tooltip>
        ${t?X(s,g):g}
      </media-menu>
    `})}import{html as dt}from"lit-html";import{ifDefined as He}from"lit-html/directives/if-defined.js";import{ref as ae}from"lit-html/directives/ref.js";function Si({orientation:e,tooltip:t}){return a(()=>{let{pointer:o,muted:n,canSetVolume:i}=m();if(o()==="coarse"&&!n())return null;if(!i())return nt({tooltip:t});let s=v(void 0),u=wt(s);return dt`
      <div class="vds-volume" ?data-active=${a(u)} ${ae(s.set)}>
        ${nt({tooltip:t})}
        <div class="vds-volume-popup">${ze({orientation:e})}</div>
      </div>
    `})}function ze({orientation:e}={}){let{translations:t}=l(),o=r(t,"Volume");return dt`
    <media-volume-slider
      class="vds-volume-slider vds-slider"
      aria-label=${o}
      orientation=${He(e)}
    >
      <div class="vds-slider-track"></div>
      <div class="vds-slider-track-fill vds-slider-track"></div>
      <media-slider-preview class="vds-slider-preview" no-clamp>
        <media-slider-value class="vds-slider-value"></media-slider-value>
      </media-slider-preview>
      <div class="vds-slider-thumb"></div>
    </media-volume-slider>
  `}function Ti(){let e=v(void 0),t=v(0),{thumbnails:o,translations:n,sliderChaptersMinWidth:i,disableTimeSlider:s,seekStep:u,noScrubGesture:p}=l(),d=r(n,"Seek"),$=a(s),M=a(()=>t()<i()),D=a(o);return Ot(e,()=>{let b=e();b&&t.set(b.clientWidth)}),dt`
    <media-time-slider
      class="vds-time-slider vds-slider"
      aria-label=${d}
      key-step=${a(u)}
      ?disabled=${$}
      ?no-swipe-gesture=${a(p)}
      ${ae(e.set)}
    >
      <media-slider-chapters class="vds-slider-chapters" ?disabled=${M}>
        <template>
          <div class="vds-slider-chapter">
            <div class="vds-slider-track"></div>
            <div class="vds-slider-track-fill vds-slider-track"></div>
            <div class="vds-slider-progress vds-slider-track"></div>
          </div>
        </template>
      </media-slider-chapters>
      <div class="vds-slider-thumb"></div>
      <media-slider-preview class="vds-slider-preview">
        <media-slider-thumbnail
          class="vds-slider-thumbnail vds-thumbnail"
          .src=${D}
        ></media-slider-thumbnail>
        <div class="vds-slider-chapter-title" data-part="chapter-title"></div>
        <media-slider-value class="vds-slider-value"></media-slider-value>
      </media-slider-preview>
    </media-time-slider>
  `}import{html as j}from"lit-html";function qe(){return j`
    <div class="vds-time-group">
      ${a(()=>{let{duration:e}=m();return e()?[j`<media-time class="vds-time" type="current"></media-time>`,j`<div class="vds-time-divider">/</div>`,j`<media-time class="vds-time" type="duration"></media-time>`]:null})}
    </div>
  `}function Oi(){return a(()=>{let{live:e,duration:t}=m();return e()?it():t()?j`<media-time class="vds-time" type="current" toggle remainder></media-time>`:null})}function wi(){return a(()=>{let{live:e}=m();return e()?it():qe()})}import{html as ne}from"lit-html";function Ni(){return a(()=>{let{textTracks:e}=h(),{title:t,started:o}=m(),n=v(null);return Y(e,"chapters",n.set),n()&&(o()||!t())?Ue():ne`<media-title class="vds-chapter-title"></media-title>`})}function Ue(){return ne`<media-chapter-title class="vds-chapter-title"></media-chapter-title>`}export{l as a,Nt as b,eo as c,f as d,Oo as e,zo as f,qo as g,Uo as h,jo as i,Yo as j,Zo as k,Xo as l,Jo as m,na as n,sa as o,mo as p,ga as q,mi as r,Si as s,Ti as t,Oi as u,wi as v,Ni as w,Ue as x,Lt as y};
