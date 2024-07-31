import{a as fe,b as pt,c as ve,d as ge,e as be,f as i,g as ct,i as ye,j as $e}from"./vidstack-D47NV4F7.js";import{a as pe,b as ce,c as a,e as Y,h as dt}from"./vidstack-IW3NNMLJ.js";import{p as le,q as ue,r as ut,s as me,t as de,u as mt}from"./vidstack-2VHLSK4R.js";import{b as st,c as kt,e as g,f as p}from"./vidstack-5WSKX3LK.js";import"./vidstack-KCALJS55.js";import{c as lt}from"./vidstack-KPDKTTLZ.js";import{e as se}from"./vidstack-DHW3MMHQ.js";import"./vidstack-MZUA5TJ4.js";import{$ as re,B as F,D as ee,E as v,F as f,H as D,I as oe,J as ne,K as ie,R as O,T as Mt,U as ae,X as V,a as qt,c as Ut,e as jt,f as Yt,h as Zt,k as Xt,n as L,o as Jt,p as G,q as P,t as rt,z as te}from"./vidstack-BQB2M2TQ.js";var Pt=oe();function s(){return ie(Pt)}var he={colorScheme:"system",download:null,customIcons:!1,disableTimeSlider:!1,menuContainer:null,menuGroup:"bottom",noAudioGain:!1,noGestures:!1,noKeyboardAnimations:!1,noModal:!1,noScrubGesture:!1,playbackRates:{min:0,max:2,step:.25},audioGains:{min:0,max:300,step:25},seekStep:10,sliderChaptersMinWidth:325,hideQualityBitrate:!1,smallWhen:!1,thumbnails:null,translations:null,when:!1};var W=class extends ae{static props=he;#t;#e=f(()=>{let t=this.$props.when();return this.#n(t)});#o=f(()=>{let t=this.$props.smallWhen();return this.#n(t)});get isMatch(){return this.#e()}get isSmallLayout(){return this.#o()}onSetup(){this.#t=g(),this.setAttributes({"data-match":this.#e,"data-sm":()=>this.#o()?"":null,"data-lg":()=>this.#o()?null:"","data-size":()=>this.#o()?"sm":"lg","data-no-scrub-gesture":this.$props.noScrubGesture});let t=this;ne(Pt,{...this.$props,when:this.#e,smallWhen:this.#o,userPrefersAnnouncements:v(!0),userPrefersKeyboardAnimations:v(!0),menuPortal:v(null)})}onAttach(t){mt(t,this.$props.colorScheme)}#n(t){return t!=="never"&&(Jt(t)?t:f(()=>t(this.#t.player.state))())}};var ft=class extends W{static props={...super.props,when:({viewType:t})=>t==="audio",smallWhen:({width:t})=>t<576}};function vt(e,t){D(()=>{let{player:o}=g(),n=o.el;return n&&F(n,"data-layout",t()&&e),()=>n?.removeAttribute("data-layout")})}var wt=new WeakMap,Lt=class extends ge{render(t){return Y}update(t,[o]){var n;let r=o!==this._ref;return r&&this._ref!==void 0&&this._updateRefValue(void 0),(r||this._lastElementForRef!==this._element)&&(this._ref=o,this._context=(n=t.options)===null||n===void 0?void 0:n.host,this._updateRefValue(this._element=t.element)),Y}_updateRefValue(t){var o;if(typeof this._ref=="function"){let n=(o=this._context)!==null&&o!==void 0?o:globalThis,r=wt.get(n);r===void 0&&(r=new WeakMap,wt.set(n,r)),r.get(this._ref)!==void 0&&this._ref.call(this._context,void 0),r.set(this._ref,t),t!==void 0&&this._ref.call(this._context,t)}else this._ref.value=t}get _lastElementForRef(){var t,o,n;return typeof this._ref=="function"?(o=wt.get((t=this._context)!==null&&t!==void 0?t:globalThis))===null||o===void 0?void 0:o.get(this._ref):(n=this._ref)===null||n===void 0?void 0:n.value}disconnected(){this._lastElementForRef===this._element&&this._updateRefValue(void 0)}reconnected(){this._updateRefValue(this._element)}},_=pt(Lt);function y(e,t){return e()?.[t]??t}function Z(){return i(()=>{let{translations:e,userPrefersAnnouncements:t}=s();return t()?a`<media-announcer .translations=${i(e)}></media-announcer>`:null})}function T(e,t=""){return a`<slot
    name=${`${e}-icon`}
    data-class=${`vds-icon vds-${e}-icon${t?` ${t}`:""}`}
  ></slot>`}function K(e){return e.map(t=>T(t))}function u(e,t){return i(()=>y(e,t))}function X({tooltip:e}){let{translations:t}=s(),{remotePlaybackState:o}=p(),n=i(()=>{let l=y(t,"AirPlay"),m=Mt(o());return`${l} ${m}`}),r=u(t,"AirPlay");return a`
    <media-tooltip class="vds-airplay-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-airplay-button class="vds-airplay-button vds-button" aria-label=${n}>
          ${T("airplay")}
        </media-airplay-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-airplay-tooltip-text">${r}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Ot({tooltip:e}){let{translations:t}=s(),{remotePlaybackState:o}=p(),n=i(()=>{let l=y(t,"Google Cast"),m=Mt(o());return`${l} ${m}`}),r=u(t,"Google Cast");return a`
    <media-tooltip class="vds-google-cast-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-google-cast-button class="vds-google-cast-button vds-button" aria-label=${n}>
          ${T("google-cast")}
        </media-google-cast-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-google-cast-tooltip-text">${r}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Q({tooltip:e}){let{translations:t}=s(),o=u(t,"Play"),n=u(t,"Pause");return a`
    <media-tooltip class="vds-play-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-play-button
          class="vds-play-button vds-button"
          aria-label=${u(t,"Play")}
        >
          ${K(["play","pause","replay"])}
        </media-play-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-play-tooltip-text">${o}</span>
        <span class="vds-pause-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function At({tooltip:e,ref:t=Zt}){let{translations:o}=s(),n=u(o,"Mute"),r=u(o,"Unmute");return a`
    <media-tooltip class="vds-mute-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-mute-button
          class="vds-mute-button vds-button"
          aria-label=${u(o,"Mute")}
          ${_(t)}
        >
          ${K(["mute","volume-low","volume-high"])}
        </media-mute-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-mute-tooltip-text">${r}</span>
        <span class="vds-unmute-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function J({tooltip:e}){let{translations:t}=s(),o=u(t,"Closed-Captions On"),n=u(t,"Closed-Captions Off");return a`
    <media-tooltip class="vds-caption-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-caption-button
          class="vds-caption-button vds-button"
          aria-label=${u(t,"Captions")}
        >
          ${K(["cc-on","cc-off"])}
        </media-caption-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-cc-on-tooltip-text">${n}</span>
        <span class="vds-cc-off-tooltip-text">${o}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function xe(){let{translations:e}=s(),t=u(e,"Enter PiP"),o=u(e,"Exit PiP");return a`
    <media-tooltip class="vds-pip-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-pip-button
          class="vds-pip-button vds-button"
          aria-label=${u(e,"PiP")}
        >
          ${K(["pip-enter","pip-exit"])}
        </media-pip-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content">
        <span class="vds-pip-enter-tooltip-text">${t}</span>
        <span class="vds-pip-exit-tooltip-text">${o}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function It({tooltip:e}){let{translations:t}=s(),o=u(t,"Enter Fullscreen"),n=u(t,"Exit Fullscreen");return a`
    <media-tooltip class="vds-fullscreen-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-fullscreen-button
          class="vds-fullscreen-button vds-button"
          aria-label=${u(t,"Fullscreen")}
        >
          ${K(["fs-enter","fs-exit"])}
        </media-fullscreen-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${e}>
        <span class="vds-fs-enter-tooltip-text">${o}</span>
        <span class="vds-fs-exit-tooltip-text">${n}</span>
      </media-tooltip-content>
    </media-tooltip>
  `}function Rt({backward:e,tooltip:t}){let{translations:o,seekStep:n}=s(),r=e?"Seek Backward":"Seek Forward",l=u(o,r);return a`
    <media-tooltip class="vds-seek-tooltip vds-tooltip">
      <media-tooltip-trigger>
        <media-seek-button
          class="vds-seek-button vds-button"
          seconds=${i(()=>(e?-1:1)*n())}
          aria-label=${l}
        >
          ${e?T("seek-backward"):T("seek-forward")}
        </media-seek-button>
      </media-tooltip-trigger>
      <media-tooltip-content class="vds-tooltip-content" placement=${t}>
        ${u(o,r)}
      </media-tooltip-content>
    </media-tooltip>
  `}function Ft(){let{translations:e}=s(),{live:t}=p(),o=u(e,"Skip To Live"),n=u(e,"LIVE");return t()?a`
        <media-live-button class="vds-live-button" aria-label=${o}>
          <span class="vds-live-button-text">${n}</span>
        </media-live-button>
      `:null}function tt(){return i(()=>{let{download:e,translations:t}=s(),o=e();if(Xt(o))return null;let{source:n,title:r}=p(),l=n(),m=se({title:r(),src:l,download:o});return m?a`
          <media-tooltip class="vds-download-tooltip vds-tooltip">
            <media-tooltip-trigger>
              <a
                role="button"
                class="vds-download-button vds-button"
                aria-label=${u(t,"Download")}
                href=${m.url+`?download=${m.name}`}
                download=${m.name}
                target="_blank"
              >
                <slot name="download-icon" data-class="vds-icon" />
              </a>
            </media-tooltip-trigger>
            <media-tooltip-content class="vds-tooltip-content" placement="top">
              ${u(t,"Download")}
            </media-tooltip-content>
          </media-tooltip>
        `:null})}function et(){let{translations:e}=s();return a`
    <media-captions
      class="vds-captions"
      .exampleText=${u(e,"Captions look like this")}
    ></media-captions>
  `}function w(){return a`<div class="vds-controls-spacer"></div>`}function gt(e,t){return a`
    <media-menu-portal .container=${i(e)} disabled="fullscreen">
      ${t}
    </media-menu-portal>
  `}function bt(e,t,o,n){let r=L(t)?document.querySelector(t):t;r||(r=e?.closest("dialog")),r||(r=document.body);let l=document.createElement("div");l.style.display="contents",l.classList.add(o),r.append(l),D(()=>{if(!l)return;let{viewType:c}=p(),d=n();F(l,"data-view-type",c()),F(l,"data-sm",d),F(l,"data-lg",!d),F(l,"data-size",d?"sm":"lg")});let{colorScheme:m}=s();return mt(l,m),l}function yt({placement:e,tooltip:t,portal:o}){let{textTracks:n}=g(),{viewType:r,clipStartTime:l,clipEndTime:m}=p(),{translations:c,thumbnails:d,menuPortal:$,noModal:M,menuGroup:b,smallWhen:h}=s();if(f(()=>{let Ue=l(),je=m()||1/0,Ht=v(null);return lt(n,"chapters",Ht.set),!Ht()?.cues.filter(zt=>zt.startTime<=je&&zt.endTime>=Ue)?.length})())return null;let S=f(()=>M()?V(e):h()?null:V(e)),q=f(()=>!h()&&b()==="bottom"&&r()==="video"?26:0),U=v(!1);function j(){U.set(!0)}function Ct(){U.set(!1)}let Qt=a`
    <media-menu-items
      class="vds-chapters-menu-items vds-menu-items"
      placement=${i(S)}
      offset=${i(q)}
    >
      ${i(()=>U()?a`
          <media-chapters-radio-group
            class="vds-chapters-radio-group vds-radio-group"
            .thumbnails=${i(d)}
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
  `;return a`
    <media-menu class="vds-chapters-menu vds-menu" @open=${j} @close=${Ct}>
      <media-tooltip class="vds-tooltip">
        <media-tooltip-trigger>
          <media-menu-button
            class="vds-menu-button vds-button"
            aria-label=${u(c,"Chapters")}
          >
            ${T("menu-chapters")}
          </media-menu-button>
        </media-tooltip-trigger>
        <media-tooltip-content
          class="vds-tooltip-content"
          placement=${G(t)?i(t):t}
        >
          ${u(c,"Chapters")}
        </media-tooltip-content>
      </media-tooltip>
      ${o?gt($,Qt):Qt}
    </media-menu>
  `}function $t(e){let{style:t}=new Option;return t.color=e,t.color.match(/\((.*?)\)/)[1].replace(/,/g," ")}var ht={type:"color"},Se={type:"radio",values:{"Monospaced Serif":"mono-serif","Proportional Serif":"pro-serif","Monospaced Sans-Serif":"mono-sans","Proportional Sans-Serif":"pro-sans",Casual:"casual",Cursive:"cursive","Small Capitals":"capitals"}},De={type:"slider",min:0,max:400,step:25,upIcon:null,downIcon:null},Te={type:"slider",min:0,max:100,step:5,upIcon:null,downIcon:null},Ce={type:"radio",values:["None","Drop Shadow","Raised","Depressed","Outline"]},ot={fontFamily:"pro-sans",fontSize:"100%",textColor:"#ffffff",textOpacity:"100%",textShadow:"none",textBg:"#000000",textBgOpacity:"100%",displayBg:"#000000",displayBgOpacity:"0%"},A=Object.keys(ot).reduce((e,t)=>({...e,[t]:v(ot[t])}),{});for(let e of Object.keys(A)){let t=localStorage.getItem(`vds-player:${O(e)}`);L(t)&&A[e].set(t)}function Me(){for(let e of Object.keys(A)){let t=ot[e];A[e].set(t)}}var ke=!1,_t=new Set;function Pe(){let{player:e}=g();_t.add(e),Yt(()=>_t.delete(e)),ke||(jt(()=>{for(let t of re(A)){let o=A[t],n=ot[t],r=`--media-user-${O(t)}`,l=`vds-player:${O(t)}`;D(()=>{let m=o(),c=m===n,d=c?null:Ye(e,t,m);for(let $ of _t)$.el?.style.setProperty(r,d);c?localStorage.removeItem(l):localStorage.setItem(l,m)})}},null),ke=!0)}function Ye(e,t,o){switch(t){case"fontFamily":let n=o==="capitals"?"small-caps":"";return e.el?.style.setProperty("--media-user-font-variant",n),Xe(o);case"fontSize":case"textOpacity":case"textBgOpacity":case"displayBgOpacity":return Ze(o);case"textColor":return`rgb(${$t(o)} / var(--media-user-text-opacity, 1))`;case"textShadow":return Je(o);case"textBg":return`rgb(${$t(o)} / var(--media-user-text-bg-opacity, 1))`;case"displayBg":return`rgb(${$t(o)} / var(--media-user-display-bg-opacity, 1))`}}function Ze(e){return(parseInt(e)/100).toString()}function Xe(e){switch(e){case"mono-serif":return'"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';case"mono-sans":return'"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';case"pro-sans":return'Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';case"casual":return'"Comic Sans MS", Impact, Handlee, fantasy';case"cursive":return'"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';case"capitals":return'"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif + font-variant=small-caps';default:return'"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif'}}function Je(e){switch(e){case"drop shadow":return"rgb(34, 34, 34) 1.86389px 1.86389px 2.79583px, rgb(34, 34, 34) 1.86389px 1.86389px 3.72778px, rgb(34, 34, 34) 1.86389px 1.86389px 4.65972px";case"raised":return"rgb(34, 34, 34) 1px 1px, rgb(34, 34, 34) 2px 2px";case"depressed":return"rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px";case"outline":return"rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px";default:return""}}var to=0;function C({label:e="",value:t="",children:o}){if(!e)return a`
      <div class="vds-menu-section">
        <div class="vds-menu-section-body">${o}</div>
      </div>
    `;let n=`vds-menu-section-${++to}`;return a`
    <section class="vds-menu-section" role="group" aria-labelledby=${n}>
      <div class="vds-menu-section-title">
        <header id=${n}>${e}</header>
        ${t?a`<div class="vds-menu-section-value">${t}</div>`:null}
      </div>
      <div class="vds-menu-section-body">${o}</div>
    </section>
  `}function R({label:e,children:t}){return a`
    <div class="vds-menu-item">
      <div class="vds-menu-item-label">${e}</div>
      ${t}
    </div>
  `}function k({label:e,icon:t,hint:o}){return a`
    <media-menu-button class="vds-menu-item">
      ${T("menu-arrow-left","vds-menu-close-icon")}
      ${t?T(t,"vds-menu-item-icon"):null}
      <span class="vds-menu-item-label">${i(e)}</span>
      <span class="vds-menu-item-hint" data-part="hint">${o?i(o):null} </span>
      ${T("menu-arrow-right","vds-menu-open-icon")}
    </media-menu-button>
  `}function we({value:e=null,options:t,hideLabel:o=!1,children:n=null,onChange:r=null}){function l(m){let{value:c,label:d}=m;return a`
      <media-radio class="vds-radio" value=${c}>
        ${T("menu-radio-check")}
        ${o?null:a`
              <span class="vds-radio-label" data-part="label">
                ${L(d)?d:i(d)}
              </span>
            `}
        ${G(n)?n(m):n}
      </media-radio>
    `}return a`
    <media-radio-group
      class="vds-radio-group"
      value=${L(e)?e:e?i(e):""}
      @change=${r}
    >
      ${P(t)?t.map(l):i(()=>t().map(l))}
    </media-radio-group>
  `}function Le(e){return P(e)?e.map(t=>({label:t,value:t.toLowerCase()})):Object.keys(e).map(t=>({label:t,value:e[t]}))}function B(){return a`
    <div class="vds-slider-track"></div>
    <div class="vds-slider-track-fill vds-slider-track"></div>
    <div class="vds-slider-thumb"></div>
  `}function E(){return a`
    <media-slider-steps class="vds-slider-steps">
      <template>
        <div class="vds-slider-step"></div>
      </template>
    </media-slider-steps>
  `}function N({label:e=null,value:t=null,upIcon:o="",downIcon:n="",children:r,isMin:l,isMax:m}){let c=e||t,d=[n?T(n,"down"):null,r,o?T(o,"up"):null];return a`
    <div
      class=${`vds-menu-item vds-menu-slider-item${c?" group":""}`}
      data-min=${i(()=>l()?"":null)}
      data-max=${i(()=>m()?"":null)}
    >
      ${c?a`
            <div class="vds-menu-slider-title">
              ${[e?a`<div>${e}</div>`:null,t?a`<div>${t}</div>`:null]}
            </div>
            <div class="vds-menu-slider-body">${d}</div>
          `:d}
    </div>
  `}var eo={...De,upIcon:"menu-opacity-up",downIcon:"menu-opacity-down"},Bt={...Te,upIcon:"menu-opacity-up",downIcon:"menu-opacity-down"};function Oe(){return i(()=>{let{hasCaptions:e}=p(),{translations:t}=s();return e()?a`
      <media-menu class="vds-font-menu vds-menu">
        ${k({label:()=>y(t,"Caption Styles")})}
        <media-menu-items class="vds-menu-items">
          ${[C({label:u(t,"Font"),children:[oo(),no()]}),C({label:u(t,"Text"),children:[io(),ro(),ao()]}),C({label:u(t,"Text Background"),children:[so(),lo()]}),C({label:u(t,"Display Background"),children:[uo(),mo()]}),C({children:[po()]})]}
        </media-menu-items>
      </media-menu>
    `:null})}function oo(){return I({label:"Family",option:Se,type:"fontFamily"})}function no(){return I({label:"Size",option:eo,type:"fontSize"})}function io(){return I({label:"Color",option:ht,type:"textColor"})}function ao(){return I({label:"Opacity",option:Bt,type:"textOpacity"})}function ro(){return I({label:"Shadow",option:Ce,type:"textShadow"})}function so(){return I({label:"Color",option:ht,type:"textBg"})}function lo(){return I({label:"Opacity",option:Bt,type:"textBgOpacity"})}function uo(){return I({label:"Color",option:ht,type:"displayBg"})}function mo(){return I({label:"Opacity",option:Bt,type:"displayBgOpacity"})}function po(){let{translations:e}=s();return a`
    <button class="vds-menu-item" role="menuitem" @click=${Me}>
      <span class="vds-menu-item-label">${i(()=>y(e,"Reset"))}</span>
    </button>
  `}function I({label:e,option:t,type:o}){let{player:n}=g(),{translations:r}=s(),l=A[o],m=()=>y(r,e);function c(){Ut(),n.dispatchEvent(new Event("vds-font-change"))}if(t.type==="color"){let h=function(x){l.set(x.target.value),c()};var M=h;return R({label:i(m),children:a`
        <input
          class="vds-color-picker"
          type="color"
          .value=${i(l)}
          @input=${h}
        />
      `})}if(t.type==="slider"){let j=function(Ct){l.set(Ct.detail+"%"),c()};var b=j;let{min:h,max:x,step:S,upIcon:q,downIcon:U}=t;return N({label:i(m),value:i(l),upIcon:q,downIcon:U,isMin:()=>l()===h+"%",isMax:()=>l()===x+"%",children:a`
        <media-slider
          class="vds-slider"
          min=${h}
          max=${x}
          step=${S}
          key-step=${S}
          .value=${i(()=>parseInt(l()))}
          aria-label=${i(m)}
          @value-change=${j}
          @drag-value-change=${j}
        >
          ${B()}${E()}
        </media-slider>
      `})}let d=Le(t.values),$=()=>{let h=l(),x=d.find(S=>S.value===h)?.label||"";return y(r,L(x)?x:x())};return a`
    <media-menu class=${`vds-${O(o)}-menu vds-menu`}>
      ${k({label:m,hint:$})}
      <media-menu-items class="vds-menu-items">
        ${we({value:l,options:d,onChange({detail:h}){l.set(h),c()}})}
      </media-menu-items>
    </media-menu>
  `}function H({label:e,checked:t,defaultChecked:o=!1,storageKey:n,onChange:r}){let{translations:l}=s(),m=n?localStorage.getItem(n):null,c=v(!!(m??o)),d=v(!1),$=i(pe(c)),M=u(l,e);n&&r(qt(c)),t&&D(()=>void c.set(t()));function b(S){S?.button!==1&&(c.set(q=>!q),n&&localStorage.setItem(n,c()?"1":""),r(c(),S),d.set(!1))}function h(S){te(S)&&b()}function x(S){S.button===0&&d.set(!0)}return a`
    <div
      class="vds-menu-checkbox"
      role="menuitemcheckbox"
      tabindex="0"
      aria-label=${M}
      aria-checked=${$}
      data-active=${i(()=>d()?"":null)}
      @pointerup=${b}
      @pointerdown=${x}
      @keydown=${h}
    ></div>
  `}function Ae(){return i(()=>{let{translations:e}=s();return a`
      <media-menu class="vds-accessibility-menu vds-menu">
        ${k({label:()=>y(e,"Accessibility"),icon:"menu-accessibility"})}
        <media-menu-items class="vds-menu-items">
          ${[C({children:[co(),fo()]}),C({children:[Oe()]})]}
        </media-menu-items>
      </media-menu>
    `})}function co(){let{userPrefersAnnouncements:e,translations:t}=s(),o="Announcements";return R({label:u(t,o),children:H({label:o,storageKey:"vds-player::announcements",onChange(n){e.set(n)}})})}function fo(){return i(()=>{let{translations:e,userPrefersKeyboardAnimations:t,noKeyboardAnimations:o}=s(),{viewType:n}=p();if(f(()=>n()!=="video"||o())())return null;let l="Keyboard Animations";return R({label:u(e,l),children:H({label:l,defaultChecked:!0,storageKey:"vds-player::keyboard-animations",onChange(m){t.set(m)}})})})}function Ie(){return i(()=>{let{noAudioGain:e,translations:t}=s(),{audioTracks:o,canSetAudioGain:n}=p();return f(()=>!(n()&&!e())&&o().length<=1)()?null:a`
      <media-menu class="vds-audio-menu vds-menu">
        ${k({label:()=>y(t,"Audio"),icon:"menu-audio"})}
        <media-menu-items class="vds-menu-items">
          ${[vo(),go()]}
        </media-menu-items>
      </media-menu>
    `})}function vo(){return i(()=>{let{translations:e}=s(),{audioTracks:t}=p(),o=u(e,"Default");return f(()=>t().length<=1)()?null:C({children:a`
        <media-menu class="vds-audio-tracks-menu vds-menu">
          ${k({label:()=>y(e,"Track")})}
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
      `})})}function go(){return i(()=>{let{noAudioGain:e,translations:t}=s(),{canSetAudioGain:o}=p();if(f(()=>!o()||e())())return null;let{audioGain:r}=p();return C({label:u(t,"Boost"),value:i(()=>Math.round(((r()??1)-1)*100)+"%"),children:[N({upIcon:"menu-audio-boost-up",downIcon:"menu-audio-boost-down",children:bo(),isMin:()=>((r()??1)-1)*100<=Re(),isMax:()=>((r()??1)-1)*100===Fe()})]})})}function bo(){let{translations:e}=s(),t=u(e,"Boost"),o=Re,n=Fe,r=yo;return a`
    <media-audio-gain-slider
      class="vds-audio-gain-slider vds-slider"
      aria-label=${t}
      min=${i(o)}
      max=${i(n)}
      step=${i(r)}
      key-step=${i(r)}
    >
      ${B()}${E()}
    </media-audio-gain-slider>
  `}function Re(){let{audioGains:e}=s(),t=e();return P(t)?t[0]??0:t.min}function Fe(){let{audioGains:e}=s(),t=e();return P(t)?t[t.length-1]??300:t.max}function yo(){let{audioGains:e}=s(),t=e();return P(t)?t[1]-t[0]||25:t.step}function _e(){return i(()=>{let{translations:e}=s(),{hasCaptions:t}=p(),o=u(e,"Off");return t()?a`
      <media-menu class="vds-captions-menu vds-menu">
        ${k({label:()=>y(e,"Captions"),icon:"menu-captions"})}
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
    `:null})}function Be(){return i(()=>{let{translations:e}=s();return a`
      <media-menu class="vds-playback-menu vds-menu">
        ${k({label:()=>y(e,"Playback"),icon:"menu-playback"})}
        <media-menu-items class="vds-menu-items">
          ${[C({children:$o()}),ho(),To()]}
        </media-menu-items>
      </media-menu>
    `})}function $o(){let{remote:e}=g(),{translations:t}=s(),o="Loop";return R({label:u(t,o),children:H({label:o,storageKey:"vds-player::user-loop",onChange(n,r){e.userPrefersLoopChange(n,r)}})})}function ho(){return i(()=>{let{translations:e}=s(),{canSetPlaybackRate:t,playbackRate:o}=p();return t()?C({label:u(e,"Speed"),value:i(()=>o()===1?y(e,"Normal"):o()+"x"),children:[N({upIcon:"menu-speed-up",downIcon:"menu-speed-down",children:So(),isMin:()=>o()===Ee(),isMax:()=>o()===Ne()})]}):null})}function Ee(){let{playbackRates:e}=s(),t=e();return P(t)?t[0]??0:t.min}function Ne(){let{playbackRates:e}=s(),t=e();return P(t)?t[t.length-1]??2:t.max}function xo(){let{playbackRates:e}=s(),t=e();return P(t)?t[1]-t[0]||.25:t.step}function So(){let{translations:e}=s(),t=u(e,"Speed"),o=Ee,n=Ne,r=xo;return a`
    <media-speed-slider
      class="vds-speed-slider vds-slider"
      aria-label=${t}
      min=${i(o)}
      max=${i(n)}
      step=${i(r)}
      key-step=${i(r)}
    >
      ${B()}${E()}
    </media-speed-slider>
  `}function Do(){let{remote:e,qualities:t}=g(),{autoQuality:o,canSetQuality:n,qualities:r}=p(),{translations:l}=s(),m="Auto";return f(()=>!n()||r().length<=1)()?null:R({label:u(l,m),children:H({label:m,checked:o,onChange(d,$){d?e.requestAutoQuality($):e.changeQuality(t.selectedIndex,$)}})})}function To(){return i(()=>{let{hideQualityBitrate:e,translations:t}=s(),{canSetQuality:o,qualities:n,quality:r}=p(),l=f(()=>!o()||n().length<=1),m=f(()=>ce(n()));return l()?null:C({label:u(t,"Quality"),value:i(()=>{let c=r()?.height,d=e()?null:r()?.bitrate,$=d&&d>0?`${(d/1e6).toFixed(2)} Mbps`:null,M=y(t,"Auto");return c?`${c}p${$?` (${$})`:""}`:M}),children:[N({upIcon:"menu-quality-up",downIcon:"menu-quality-down",children:Co(),isMin:()=>m()[0]===r(),isMax:()=>m().at(-1)===r()}),Do()]})})}function Co(){let{translations:e}=s(),t=u(e,"Quality");return a`
    <media-quality-slider class="vds-quality-slider vds-slider" aria-label=${t}>
      ${B()}${E()}
    </media-quality-slider>
  `}function xt({placement:e,portal:t,tooltip:o}){return i(()=>{let{viewType:n}=p(),{translations:r,menuPortal:l,noModal:m,menuGroup:c,smallWhen:d}=s(),$=f(()=>m()?V(e):d()?null:V(e)),M=f(()=>!d()&&c()==="bottom"&&n()==="video"?26:0),b=v(!1);Pe();function h(){b.set(!0)}function x(){b.set(!1)}let S=a`
      <media-menu-items
        class="vds-settings-menu-items vds-menu-items"
        placement=${i($)}
        offset=${i(M)}
      >
        ${i(()=>b()?[Be(),Ae(),Ie(),_e()]:null)}
      </media-menu-items>
    `;return a`
      <media-menu class="vds-settings-menu vds-menu" @open=${h} @close=${x}>
        <media-tooltip class="vds-tooltip">
          <media-tooltip-trigger>
            <media-menu-button
              class="vds-menu-button vds-button"
              aria-label=${u(r,"Settings")}
            >
              ${T("menu-settings","vds-rotate-icon")}
            </media-menu-button>
          </media-tooltip-trigger>
          <media-tooltip-content
            class="vds-tooltip-content"
            placement=${G(o)?i(o):o}
          >
            ${u(r,"Settings")}
          </media-tooltip-content>
        </media-tooltip>
        ${t?gt(l,S):S}
      </media-menu>
    `})}function nt({orientation:e,tooltip:t}){return i(()=>{let{pointer:o,muted:n,canSetVolume:r}=p();if(o()==="coarse"&&!n())return null;if(!r())return At({tooltip:t});let l=v(void 0),m=me(l);return a`
      <div class="vds-volume" ?data-active=${i(m)} ${_(l.set)}>
        ${At({tooltip:t})}
        <div class="vds-volume-popup">${Mo({orientation:e})}</div>
      </div>
    `})}function Mo({orientation:e}={}){let{translations:t}=s(),o=u(t,"Volume");return a`
    <media-volume-slider
      class="vds-volume-slider vds-slider"
      aria-label=${o}
      orientation=${be(e)}
    >
      <div class="vds-slider-track"></div>
      <div class="vds-slider-track-fill vds-slider-track"></div>
      <media-slider-preview class="vds-slider-preview" no-clamp>
        <media-slider-value class="vds-slider-value"></media-slider-value>
      </media-slider-preview>
      <div class="vds-slider-thumb"></div>
    </media-volume-slider>
  `}function it(){let e=v(void 0),t=v(0),{thumbnails:o,translations:n,sliderChaptersMinWidth:r,disableTimeSlider:l,seekStep:m,noScrubGesture:c}=s(),d=u(n,"Seek"),$=i(l),M=i(()=>t()<r()),b=i(o);return ut(e,()=>{let h=e();h&&t.set(h.clientWidth)}),a`
    <media-time-slider
      class="vds-time-slider vds-slider"
      aria-label=${d}
      key-step=${i(m)}
      ?disabled=${$}
      ?no-swipe-gesture=${i(c)}
      ${_(e.set)}
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
          .src=${b}
        ></media-slider-thumbnail>
        <div class="vds-slider-chapter-title" data-part="chapter-title"></div>
        <media-slider-value class="vds-slider-value"></media-slider-value>
      </media-slider-preview>
    </media-time-slider>
  `}function ko(){return a`
    <div class="vds-time-group">
      ${i(()=>{let{duration:e}=p();return e()?[a`<media-time class="vds-time" type="current"></media-time>`,a`<div class="vds-time-divider">/</div>`,a`<media-time class="vds-time" type="duration"></media-time>`]:null})}
    </div>
  `}function Ge(){return i(()=>{let{live:e,duration:t}=p();return e()?Ft():t()?a`<media-time class="vds-time" type="current" toggle remainder></media-time>`:null})}function Et(){return i(()=>{let{live:e}=p();return e()?Ft():ko()})}function Nt(){return i(()=>{let{textTracks:e}=g(),{title:t,started:o}=p(),n=v(null);return lt(e,"chapters",n.set),n()&&(o()||!t())?Gt():a`<media-title class="vds-chapter-title"></media-title>`})}function Gt(){return a`<media-chapter-title class="vds-chapter-title"></media-chapter-title>`}function Ve(){return[Z(),et(),a`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[Rt({backward:!0,tooltip:"top start"}),Q({tooltip:"top"}),Rt({tooltip:"top"}),Po(),it(),Ge(),nt({orientation:"vertical",tooltip:"top"}),J({tooltip:"top"}),tt(),X({tooltip:"top"}),wo()]}
        </media-controls-group>
      </media-controls>
    `]}function Po(){return i(()=>{let e=v(void 0),t=v(!1),o=g(),{title:n,started:r,currentTime:l,ended:m}=p(),{translations:c}=s(),d=ue(e),$=()=>r()||l()>0,M=()=>{let x=m()?"Replay":$()?"Continue":"Play";return`${y(c,x)}: ${n()}`};D(()=>{d()&&document.activeElement===document.body&&o.player.el?.focus({preventScroll:!0})});function b(){let x=e(),S=!!x&&!d()&&x.clientWidth<x.children[0].clientWidth;x&&ee(x,"vds-marquee",S),t.set(S)}function h(){return a`
        <span class="vds-title-text">
          ${i(M)}${i(()=>$()?Gt():null)}
        </span>
      `}return ut(e,b),n()?a`
          <span class="vds-title" title=${i(M)} ${_(e.set)}>
            ${[h(),i(()=>t()&&!d()?h():null)]}
          </span>
        `:w()})}function wo(){let e="top end";return[yt({tooltip:"top",placement:e,portal:!0}),xt({tooltip:"top end",placement:e,portal:!0})]}var z=class extends $e{async loadIcons(){let t=(await import("./vidstack-6DMNQFWR.js")).icons,o={};for(let n of Object.keys(t))o[n]=ye({name:n,paths:t[n]});return o}};var St=class extends st(dt,ft){static tagName="media-audio-layout";static attrs={smallWhen:{converter(t){return t!=="never"&&!!t}}};#t;#e=v(!1);onSetup(){this.forwardKeepAlive=!1,this.#t=g(),this.classList.add("vds-audio-layout"),this.#i()}onConnect(){vt("audio",()=>this.isMatch),this.#n()}render(){return i(this.#o.bind(this))}#o(){return this.isMatch?Ve():null}#n(){let{menuPortal:t}=s();D(()=>{if(!this.isMatch)return;let o=bt(this,this.menuContainer,"vds-audio-layout",()=>this.isSmallLayout),n=o?[this,o]:[this];return(this.$props.customIcons()?new ct(n):new z(n)).connect(),t.set(o),()=>{o.remove(),t.set(null)}})}#i(){let{pointer:t}=this.#t.$state;D(()=>{t()==="coarse"&&D(this.#a.bind(this))})}#a(){if(!this.#e()){rt(this,"pointerdown",this.#r.bind(this),{capture:!0});return}rt(this,"pointerdown",t=>t.stopPropagation()),rt(window,"pointerdown",this.#s.bind(this))}#r(t){let{target:o}=t;de(o)&&o.closest(".vds-time-slider")&&(t.stopImmediatePropagation(),this.setAttribute("data-scrubbing",""),this.#e.set(!0))}#s(){this.#e.set(!1),this.removeAttribute("data-scrubbing")}};var Dt=class extends W{static props={...super.props,when:({viewType:t})=>t==="video",smallWhen:({width:t,height:o})=>t<576||o<380}};var Vt=class extends ve{constructor(){super(...arguments),this.key=Y}render(t,o){return this.key=t,o}update(t,[o,n]){return o!==this.key&&(fe(t),this.key=o),n}},We=pt(Vt);function Wt(){return i(()=>{let e=g(),{noKeyboardAnimations:t,userPrefersKeyboardAnimations:o}=s();if(f(()=>t()||!o())())return null;let r=v(!1),{lastKeyboardAction:l}=e.$state;D(()=>{r.set(!!l());let b=setTimeout(()=>r.set(!1),500);return()=>{r.set(!1),window.clearTimeout(b)}});let m=f(()=>{let b=l()?.action;return b&&r()?O(b):null}),c=f(()=>`vds-kb-action${r()?"":" hidden"}`),d=f(Lo),$=f(()=>{let b=Oo();return b?le(b):null});function M(){let b=$();return b?a`
        <div class="vds-kb-bezel">
          <div class="vds-kb-icon">${b}</div>
        </div>
      `:null}return a`
      <div class=${i(c)} data-action=${i(m)}>
        <div class="vds-kb-text-wrapper">
          <div class="vds-kb-text">${i(d)}</div>
        </div>
        ${i(()=>We(l(),M()))}
      </div>
    `})}function Lo(){let{$state:e}=g(),t=e.lastKeyboardAction()?.action,o=e.audioGain()??1;switch(t){case"toggleMuted":return e.muted()?"0%":Ke(e.volume(),o);case"volumeUp":case"volumeDown":return Ke(e.volume(),o);default:return""}}function Ke(e,t){return`${Math.round(e*t*100)}%`}function Oo(){let{$state:e}=g();switch(e.lastKeyboardAction()?.action){case"togglePaused":return e.paused()?"kb-pause-icon":"kb-play-icon";case"toggleMuted":return e.muted()||e.volume()===0?"kb-mute-icon":e.volume()>=.5?"kb-volume-up-icon":"kb-volume-down-icon";case"toggleFullscreen":return`kb-fs-${e.fullscreen()?"enter":"exit"}-icon`;case"togglePictureInPicture":return`kb-pip-${e.pictureInPicture()?"enter":"exit"}-icon`;case"toggleCaptions":return e.hasCaptions()?`kb-cc-${e.textTrack()?"on":"off"}-icon`:null;case"volumeUp":return"kb-volume-up-icon";case"volumeDown":return"kb-volume-down-icon";case"seekForward":return"kb-seek-forward-icon";case"seekBackward":return"kb-seek-backward-icon";default:return null}}function Qe(){return[Z(),qe(),at(),Wt(),et(),a`<div class="vds-scrim"></div>`,a`
      <media-controls class="vds-controls">
        ${[Io(),w(),a`<media-controls-group class="vds-controls-group"></media-controls-group>`,w(),a`
            <media-controls-group class="vds-controls-group">
              ${it()}
            </media-controls-group>
          `,a`
            <media-controls-group class="vds-controls-group">
              ${[Q({tooltip:"top start"}),nt({orientation:"horizontal",tooltip:"top"}),Et(),Nt(),J({tooltip:"top"}),Ao(),X({tooltip:"top"}),Ot({tooltip:"top"}),tt(),xe(),It({tooltip:"top end"})]}
            </media-controls-group>
          `]}
      </media-controls>
    `]}function Ao(){return i(()=>{let{menuGroup:e}=s();return e()==="bottom"?Kt():null})}function Io(){return a`
    <media-controls-group class="vds-controls-group">
      ${i(()=>{let{menuGroup:e}=s();return e()==="top"?[w(),Kt()]:null})}
    </media-controls-group>
  `}function He(){return[Z(),qe(),at(),et(),Wt(),a`<div class="vds-scrim"></div>`,a`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[X({tooltip:"top start"}),Ot({tooltip:"bottom start"}),w(),J({tooltip:"bottom"}),tt(),Kt(),nt({orientation:"vertical",tooltip:"bottom end"})]}
        </media-controls-group>

        ${w()}

        <media-controls-group class="vds-controls-group" style="pointer-events: none;">
          ${[w(),Q({tooltip:"top"}),w()]}
        </media-controls-group>

        ${w()}

        <media-controls-group class="vds-controls-group">
          ${[Et(),Nt(),It({tooltip:"top end"})]}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${it()}
        </media-controls-group>
      </media-controls>
    `,Ro()]}function ze(){return a`
    <div class="vds-load-container">
      ${[at(),Q({tooltip:"top"})]}
    </div>
  `}function Ro(){return i(()=>{let{duration:e}=p();return e()===0?null:a`
      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    `})}function at(){return a`
    <div class="vds-buffering-indicator">
      <media-spinner class="vds-buffering-spinner"></media-spinner>
    </div>
  `}function Kt(){let{menuGroup:e,smallWhen:t}=s(),o=()=>e()==="top"||t()?"bottom":"top",n=f(()=>`${o()} ${e()==="top"?"end":"center"}`),r=f(()=>`${o()} end`);return[yt({tooltip:n,placement:r,portal:!0}),xt({tooltip:n,placement:r,portal:!0})]}function qe(){return i(()=>{let{noGestures:e}=s();return e()?null:a`
      <div class="vds-gestures">
        <media-gesture class="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="pointerup"
          action="toggle:controls"
        ></media-gesture>
        <media-gesture
          class="vds-gesture"
          event="dblpointerup"
          action="toggle:fullscreen"
        ></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
        <media-gesture class="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
      </div>
    `})}var Tt=class extends st(dt,Dt){static tagName="media-video-layout";static attrs={smallWhen:{converter(t){return t!=="never"&&!!t}}};#t;onSetup(){this.forwardKeepAlive=!1,this.#t=g(),this.classList.add("vds-video-layout")}onConnect(){vt("video",()=>this.isMatch),this.#e()}render(){return i(this.#o.bind(this))}#e(){let{menuPortal:t}=s();D(()=>{if(!this.isMatch)return;let o=bt(this,this.menuContainer,"vds-video-layout",()=>this.isSmallLayout),n=o?[this,o]:[this];return(this.$props.customIcons()?new ct(n):new z(n)).connect(),t.set(o),()=>{o.remove(),t.set(null)}})}#o(){let{load:t}=this.#t.$props,{canLoad:o,streamType:n,nativeControls:r}=this.#t.$state;return!r()&&this.isMatch?t()==="play"&&!o()?ze():n()==="unknown"?at():this.isSmallLayout?He():Qe():null}};kt(St);kt(Tt);
