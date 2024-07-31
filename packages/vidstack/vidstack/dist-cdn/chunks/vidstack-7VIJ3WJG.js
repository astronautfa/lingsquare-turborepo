import{f as n,g as xe,h as F,i as Te,j as Me}from"./vidstack-D47NV4F7.js";import{A as ue,B as de,C as me,I as ye,J as _e,K as fe,L as be,M as $e,N as ve,O as Pe,h as X,i as Y,j as Z,k as ee,l as te,m as re,n as oe,o as ae,t as ne,u as le,v as se,x as ie,y as pe}from"./vidstack-SESSUVBC.js";import{c as o,h as ge}from"./vidstack-IW3NNMLJ.js";import"./vidstack-2VHLSK4R.js";import{a as ce}from"./vidstack-ONXR3WS4.js";import{b as K,c as s,e as u}from"./vidstack-5WSKX3LK.js";import"./vidstack-IMNMJXWE.js";import"./vidstack-KCALJS55.js";import"./vidstack-YP5YT6OR.js";import"./vidstack-KPDKTTLZ.js";import{e as J}from"./vidstack-DHW3MMHQ.js";import"./vidstack-MZUA5TJ4.js";import{E as g,F as N,H as b,I as O,J as Q,K as j,U,Z as z,a as q,f as W,t as H,x as A,z as D}from"./vidstack-BQB2M2TQ.js";var I=O();function l(){return j(I)}var ke={clickToPlay:!0,clickToFullscreen:!0,controls:["play-large","play","progress","current-time","mute+volume","captions","settings","pip","airplay","fullscreen"],customIcons:!1,displayDuration:!1,download:null,markers:null,invertTime:!0,thumbnails:null,toggleTime:!0,translations:null,seekTime:10,speed:[.5,.75,1,1.25,1.5,1.75,2,4]};var M=class extends U{static props=ke;#e;onSetup(){this.#e=u(),Q(I,{...this.$props,previewTime:g(0)})}};function we(e,t){let{canAirPlay:r,canFullscreen:a,canPictureInPicture:p,controlsHidden:c,currentTime:f,fullscreen:y,hasCaptions:m,isAirPlayConnected:_,paused:$,pictureInPicture:x,playing:h,pointer:C,poster:E,textTrack:S,viewType:d,waiting:P}=t.$state;e.classList.add("plyr"),e.classList.add("plyr--full-ui");let V={"plyr--airplay-active":_,"plyr--airplay-supported":r,"plyr--fullscreen-active":y,"plyr--fullscreen-enabled":a,"plyr--hide-controls":c,"plyr--is-touch":()=>C()==="coarse","plyr--loading":P,"plyr--paused":$,"plyr--pip-active":x,"plyr--pip-enabled":p,"plyr--playing":h,"plyr__poster-enabled":E,"plyr--stopped":()=>$()&&f()===0,"plyr--captions-active":S,"plyr--captions-enabled":m},R=z();for(let v of Object.keys(V))R.add(b(()=>void e.classList.toggle(v,!!V[v]())));return R.add(b(()=>{let v=`plyr--${d()}`;return e.classList.add(v),()=>e.classList.remove(v)}),b(()=>{let{$provider:v}=t,B=v()?.type,G=`plyr--${Be(B)?"html5":B}`;return e.classList.toggle(G,!!B),()=>e.classList.remove(G)})),()=>R.empty()}function Be(e){return e==="audio"||e==="video"}var k=class extends Me{async loadIcons(){let t=(await import("./vidstack-235QJEHX.js")).icons,r={};for(let a of Object.keys(t))r[a]=Te({name:a,paths:t[a],viewBox:"0 0 18 18"});return r}};function T(e,t){return e()?.[t]??t}function he(){return Fe()}function Ce(){let e=u(),{load:t}=e.$props,{canLoad:r}=e.$state;return N(()=>t()==="play"&&!r())()?[Ee(),Le()]:[Ae(),De(),Le(),Ie(),Ye(),Ze()]}function Ee(){let e=u(),{translations:t}=l(),{title:r}=e.$state,a=n(()=>`${T(t,"Play")}, ${r()}`);return o`
    <media-play-button
      class="plyr__control plyr__control--overlaid"
      aria-label=${a}
      data-plyr="play"
    >
      <slot name="play-icon"></slot>
    </button>
  `}function Ae(){let{controls:e}=l();return n(()=>e().includes("play-large")?Ee():null)}function De(){let{thumbnails:e,previewTime:t}=l();return o`
    <media-thumbnail
      .src=${n(e)}
      class="plyr__preview-scrubbing"
      time=${n(()=>t())}
    ></media-thumbnail>
  `}function Le(){let e=u(),{poster:t}=e.$state,r=n(()=>`background-image: url("${t()}");`);return o`<div class="plyr__poster" style=${r}></div>`}function Fe(){let e=new Set(["captions","pip","airplay","fullscreen"]),{controls:t}=l(),r=n(()=>t().filter(a=>!e.has(a)).map(Se));return o`<div class="plyr__controls">${r}</div>`}function Ie(){let{controls:e}=l(),t=n(()=>e().map(Se));return o`<div class="plyr__controls">${t}</div>`}function Se(e){switch(e){case"airplay":return Ve();case"captions":return Ge();case"current-time":return Je();case"download":return Xe();case"duration":return Re();case"fast-forward":return je();case"fullscreen":return qe();case"mute":case"volume":case"mute+volume":return Ue(e);case"pip":return He();case"play":return Ne();case"progress":return Ke();case"restart":return Oe();case"rewind":return Qe();case"settings":return et();default:return null}}function Ve(){let{translations:e}=l();return o`
    <media-airplay-button class="plyr__controls__item plyr__control" data-plyr="airplay">
      <slot name="airplay-icon"></slot>
      <span class="plyr__tooltip">${i(e,"AirPlay")}</span>
    </media-airplay-button>
  `}function Ge(){let{translations:e}=l(),t=i(e,"Disable captions"),r=i(e,"Enable captions");return o`
    <media-caption-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="captions"
    >
      <slot name="captions-on-icon" data-class="icon--pressed"></slot>
      <slot name="captions-off-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${t}</span>
      <span class="label--not-pressed plyr__tooltip">${r}</span>
    </media-caption-button>
  `}function qe(){let{translations:e}=l(),t=i(e,"Enter Fullscreen"),r=i(e,"Exit Fullscreen");return o`
    <media-fullscreen-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="fullscreen"
    >
      <slot name="enter-fullscreen-icon" data-class="icon--pressed"></slot>
      <slot name="exit-fullscreen-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${r}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-fullscreen-button>
  `}function We(){let{translations:e}=l(),t=i(e,"Mute"),r=i(e,"Unmute");return o`
    <media-mute-button class="plyr__control" data-no-label data-plyr="mute">
      <slot name="muted-icon" data-class="icon--pressed"></slot>
      <slot name="volume-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${r}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-mute-button>
  `}function He(){let{translations:e}=l(),t=i(e,"Enter PiP"),r=i(e,"Exit PiP");return o`
    <media-pip-button class="plyr__controls__item plyr__control" data-no-label data-plyr="pip">
      <slot name="pip-icon"></slot>
      <slot name="enter-pip-icon" data-class="icon--pressed"></slot>
      <slot name="exit-pip-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${r}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-pip-button>
  `}function Ne(){let{translations:e}=l(),t=i(e,"Play"),r=i(e,"Pause");return o`
    <media-play-button class="plyr__controls__item plyr__control" data-no-label data-plyr="play">
      <slot name="pause-icon" data-class="icon--pressed"></slot>
      <slot name="play-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${r}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-play-button>
  `}function Oe(){let{translations:e}=l(),{remote:t}=u(),r=i(e,"Restart");function a(p){A(p)&&!D(p)||t.seek(0,p)}return o`
    <button
      type="button"
      class="plyr__control"
      data-plyr="restart"
      @pointerup=${a}
      @keydown=${a}
    >
      <slot name="restart-icon"></slot>
      <span class="plyr__tooltip">${r}</span>
    </button>
  `}function Qe(){let{translations:e,seekTime:t}=l(),r=n(()=>`${T(e,"Rewind")} ${t()}s`),a=n(()=>-1*t());return o`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${a}
      data-no-label
      data-plyr="rewind"
    >
      <slot name="rewind-icon"></slot>
      <span class="plyr__tooltip">${r}</span>
    </media-seek-button>
  `}function je(){let{translations:e,seekTime:t}=l(),r=n(()=>`${T(e,"Forward")} ${t()}s`),a=n(t);return o`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${a}
      data-no-label
      data-plyr="fast-forward"
    >
      <slot name="fast-forward-icon"></slot>
      <span class="plyr__tooltip">${r}</span>
    </media-seek-button>
  `}function Ke(){let e=u(),{duration:t,viewType:r}=e.$state,{translations:a,markers:p,thumbnails:c,seekTime:f,previewTime:y}=l(),m=i(a,"Seek"),_=g(null),$=n(()=>{let d=_();return d?o`<span class="plyr__progress__marker-label">${F(d.label)}<br /></span>`:null});function x(d){y.set(d.detail)}function h(){_.set(this)}function C(){_.set(null)}function E(){let d=c(),P=n(()=>r()==="audio");return d?o`
          <media-slider-preview class="plyr__slider__preview" ?no-clamp=${P}>
            <media-slider-thumbnail .src=${d} class="plyr__slider__preview__thumbnail">
              <span class="plyr__slider__preview__time-container">
                ${$}
                <media-slider-value class="plyr__slider__preview__time"></media-slider-value>
              </span>
            </media-slider-thumbnail>
          </media-slider-preview>
        `:o`
          <span class="plyr__tooltip">
            ${$}
            <media-slider-value></media-slider-value>
          </span>
        `}function S(){let d=t();return Number.isFinite(d)?p()?.map(P=>o`
        <span
          class="plyr__progress__marker"
          @mouseenter=${h.bind(P)}
          @mouseleave=${C}
          style=${`left: ${P.time/d*100}%;`}
        ></span>
      `):null}return o`
    <div class="plyr__controls__item plyr__progress__container">
      <div class="plyr__progress">
        <media-time-slider
          class="plyr__slider"
          data-plyr="seek"
          pause-while-dragging
          key-step=${n(f)}
          aria-label=${m}
          @media-seeking-request=${x}
        >
          <div class="plyr__slider__track"></div>
          <div class="plyr__slider__thumb"></div>
          <div class="plyr__slider__buffer"></div>
          ${n(E)}${n(S)}
        </media-time-slider>
      </div>
    </div>
  `}function Ue(e){return n(()=>{let t=e==="mute"||e==="mute+volume",r=e==="volume"||e==="mute+volume";return o`
      <div class="plyr__controls__item plyr__volume">
        ${[t?We():null,r?ze():null]}
      </div>
    `})}function ze(){let{translations:e}=l(),t=i(e,"Volume");return o`
    <media-volume-slider class="plyr__slider" data-plyr="volume" aria-label=${t}>
      <div class="plyr__slider__track"></div>
      <div class="plyr__slider__thumb"></div>
    </media-volume-slider>
  `}function Je(){let e=u(),{translations:t,invertTime:r,toggleTime:a,displayDuration:p}=l(),c=g(q(r));function f(m){!a()||p()||A(m)&&!D(m)||c.set(_=>!_)}function y(){return n(()=>p()?Re():null)}return n(()=>{let{streamType:m}=e.$state,_=i(t,"LIVE"),$=i(t,"Current time"),x=n(()=>!p()&&c());return m()==="live"||m()==="ll-live"?o`
          <media-live-button
            class="plyr__controls__item plyr__control plyr__live-button"
            data-plyr="live"
          >
            <span class="plyr__live-button__text">${_}</span>
          </media-live-button>
        `:o`
          <media-time
            type="current"
            class="plyr__controls__item plyr__time plyr__time--current"
            tabindex="0"
            role="timer"
            aria-label=${$}
            ?remainder=${x}
            @pointerup=${f}
            @keydown=${f}
          ></media-time>
          ${y()}
        `})}function Re(){let{translations:e}=l(),t=i(e,"Duration");return o`
    <media-time
      type="duration"
      class="plyr__controls__item plyr__time plyr__time--duration"
      role="timer"
      tabindex="0"
      aria-label=${t}
    ></media-time>
  `}function Xe(){return n(()=>{let e=u(),{translations:t,download:r}=l(),{title:a,source:p}=e.$state,c=p(),f=r(),y=J({title:a(),src:c,download:f}),m=i(t,"Download");return y?o`
          <a
            class="plyr__controls__item plyr__control"
            href=${y.url+`?download=${y.name}`}
            download=${y.name}
            target="_blank"
          >
            <slot name="download-icon" />
            <span class="plyr__tooltip">${m}</span>
          </a>
        `:null})}function Ye(){return n(()=>{let{clickToPlay:e,clickToFullscreen:t}=l();return[e()?o`
            <media-gesture
              class="plyr__gesture"
              event="pointerup"
              action="toggle:paused"
            ></media-gesture>
          `:null,t()?o`
            <media-gesture
              class="plyr__gesture"
              event="dblpointerup"
              action="toggle:fullscreen"
            ></media-gesture>
          `:null]})}function Ze(){let e=u(),t=g(void 0),r=n(()=>F(t()?.text));return b(()=>{let a=e.$state.textTrack();if(!a)return;function p(){t.set(a?.activeCues[0])}return p(),H(a,"cue-change",p)}),o`
    <div class="plyr__captions" dir="auto">
      <span class="plyr__caption">${r}</span>
    </div>
  `}function et(){let{translations:e}=l(),t=i(e,"Settings");return o`
    <div class="plyr__controls__item plyr__menu">
      <media-menu>
        <media-menu-button class="plyr__control" data-plyr="settings">
          <slot name="settings-icon" />
          <span class="plyr__tooltip">${t}</span>
        </media-menu-button>
        <media-menu-items class="plyr__menu__container" placement="top end">
          <div><div>${[rt(),lt(),it(),at()]}</div></div>
        </media-menu-items>
      </media-menu>
    </div>
  `}function w({label:e,children:t}){let r=g(!1);return o`
    <media-menu @open=${()=>r.set(!0)} @close=${()=>r.set(!1)}>
      ${tt({label:e,open:r})}
      <media-menu-items>${t}</media-menu-items>
    </media-menu>
  `}function tt({open:e,label:t}){let{translations:r}=l(),a=n(()=>`plyr__control plyr__control--${e()?"back":"forward"}`);function p(){let c=i(r,"Go back to previous menu");return n(()=>e()?o`<span class="plyr__sr-only">${c}</span>`:null)}return o`
    <media-menu-button class=${a} data-plyr="settings">
      <span class="plyr__menu__label" aria-hidden=${ut(e)}>
        ${i(r,t)}
      </span>
      <span class="plyr__menu__value" data-part="hint"></span>
      ${p()}
    </media-menu-button>
  `}function rt(){return w({label:"Audio",children:ot()})}function ot(){let{translations:e}=l();return o`
    <media-audio-radio-group empty-label=${i(e,"Default")}>
      <template>
        <media-radio class="plyr__control" data-plyr="audio">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-audio-radio-group>
  `}function at(){return w({label:"Speed",children:nt()})}function nt(){let{translations:e,speed:t}=l();return o`
    <media-speed-radio-group .rates=${t} normal-label=${i(e,"Normal")}>
      <template>
        <media-radio class="plyr__control" data-plyr="speed">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-speed-radio-group>
  `}function lt(){return w({label:"Captions",children:st()})}function st(){let{translations:e}=l();return o`
    <media-captions-radio-group off-label=${i(e,"Disabled")}>
      <template>
        <media-radio class="plyr__control" data-plyr="captions">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-captions-radio-group>
  `}function it(){return w({label:"Quality",children:pt()})}function pt(){let{translations:e}=l();return o`
    <media-quality-radio-group auto-label=${i(e,"Auto")}>
      <template>
        <media-radio class="plyr__control" data-plyr="quality">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-quality-radio-group>
  `}function ut(e){return n(()=>e()?"true":"false")}function i(e,t){return n(()=>T(e,t))}var L=class extends K(ge,M){static tagName="media-plyr-layout";#e;onSetup(){this.forwardKeepAlive=!1,this.#e=u()}onConnect(){this.#e.player.el?.setAttribute("data-layout","plyr"),W(()=>this.#e.player.el?.removeAttribute("data-layout")),we(this,this.#e),b(()=>{this.$props.customIcons()?new xe([this]).connect():new k([this]).connect()})}render(){return n(this.#t.bind(this))}#t(){let{viewType:t}=this.#e.$state;return t()==="audio"?he():t()==="video"?Ce():null}};s(L);s(ce);s(oe);s(te);s(Y);s(re);s(Z);s(ae);s(X);s(ee);s(ve);s($e);s(ye);s(fe);s(be);s(ie);s(se);s(ue);s(pe);s(ne);s(le);s(me);s(de);s(Pe);s(_e);
