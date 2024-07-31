import{a as r,b as D,c as F,d as V}from"./vidstack-I3NGMVWZ.js";import{a as o,b as R,c as E}from"./vidstack-OWZU7SXQ.js";import{a as B}from"./vidstack-2IDCNZ37.js";import{b as A}from"./vidstack-RYIIIOKJ.js";import{b as p}from"./vidstack-HDVJ2P4K.js";import{e as S}from"./vidstack-BQBKKLOB.js";import{B as T,D as k,I as f,J as M,L as g,a as h,f as C,x as L}from"./vidstack-XC7WIXLW.js";var P=class extends V{async loadIcons(){let t=(await import("./vidstack-235QJEHX.js")).icons,a={};for(let l of Object.keys(t))a[l]=F({name:l,paths:t[l],viewBox:"0 0 18 18"});return a}};import{html as n}from"lit-html";import{unsafeHTML as G}from"lit-html/directives/unsafe-html.js";function $(e,t){return e()?.[t]??t}function I(){return Y()}function N(){let e=p(),{load:t}=e.$props,{canLoad:a}=e.$state;return M(()=>t()==="play"&&!a())()?[W(),q()]:[J(),X(),q(),Z(),_e(),ye()]}function W(){let e=p(),{translations:t}=o(),{title:a}=e.$state,l=r(()=>`${$(t,"Play")}, ${a()}`);return n`
    <media-play-button
      class="plyr__control plyr__control--overlaid"
      aria-label=${l}
      data-plyr="play"
    >
      <slot name="play-icon"></slot>
    </button>
  `}function J(){let{controls:e}=o();return r(()=>e().includes("play-large")?W():null)}function X(){let{thumbnails:e,previewTime:t}=o();return n`
    <media-thumbnail
      .src=${r(e)}
      class="plyr__preview-scrubbing"
      time=${r(()=>t())}
    ></media-thumbnail>
  `}function q(){let e=p(),{poster:t}=e.$state,a=r(()=>`background-image: url("${t()}");`);return n`<div class="plyr__poster" style=${a}></div>`}function Y(){let e=new Set(["captions","pip","airplay","fullscreen"]),{controls:t}=o(),a=r(()=>t().filter(l=>!e.has(l)).map(O));return n`<div class="plyr__controls">${a}</div>`}function Z(){let{controls:e}=o(),t=r(()=>e().map(O));return n`<div class="plyr__controls">${t}</div>`}function O(e){switch(e){case"airplay":return ee();case"captions":return te();case"current-time":return de();case"download":return me();case"duration":return Q();case"fast-forward":return ie();case"fullscreen":return ae();case"mute":case"volume":case"mute+volume":return ue(e);case"pip":return re();case"play":return le();case"progress":return pe();case"restart":return oe();case"rewind":return se();case"settings":return fe();default:return null}}function ee(){let{translations:e}=o();return n`
    <media-airplay-button class="plyr__controls__item plyr__control" data-plyr="airplay">
      <slot name="airplay-icon"></slot>
      <span class="plyr__tooltip">${s(e,"AirPlay")}</span>
    </media-airplay-button>
  `}function te(){let{translations:e}=o(),t=s(e,"Disable captions"),a=s(e,"Enable captions");return n`
    <media-caption-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="captions"
    >
      <slot name="captions-on-icon" data-class="icon--pressed"></slot>
      <slot name="captions-off-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${t}</span>
      <span class="label--not-pressed plyr__tooltip">${a}</span>
    </media-caption-button>
  `}function ae(){let{translations:e}=o(),t=s(e,"Enter Fullscreen"),a=s(e,"Exit Fullscreen");return n`
    <media-fullscreen-button
      class="plyr__controls__item plyr__control"
      data-no-label
      data-plyr="fullscreen"
    >
      <slot name="enter-fullscreen-icon" data-class="icon--pressed"></slot>
      <slot name="exit-fullscreen-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${a}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-fullscreen-button>
  `}function ne(){let{translations:e}=o(),t=s(e,"Mute"),a=s(e,"Unmute");return n`
    <media-mute-button class="plyr__control" data-no-label data-plyr="mute">
      <slot name="muted-icon" data-class="icon--pressed"></slot>
      <slot name="volume-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${a}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-mute-button>
  `}function re(){let{translations:e}=o(),t=s(e,"Enter PiP"),a=s(e,"Exit PiP");return n`
    <media-pip-button class="plyr__controls__item plyr__control" data-no-label data-plyr="pip">
      <slot name="pip-icon"></slot>
      <slot name="enter-pip-icon" data-class="icon--pressed"></slot>
      <slot name="exit-pip-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${a}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-pip-button>
  `}function le(){let{translations:e}=o(),t=s(e,"Play"),a=s(e,"Pause");return n`
    <media-play-button class="plyr__controls__item plyr__control" data-no-label data-plyr="play">
      <slot name="pause-icon" data-class="icon--pressed"></slot>
      <slot name="play-icon" data-class="icon--not-pressed"></slot>
      <span class="label--pressed plyr__tooltip">${a}</span>
      <span class="label--not-pressed plyr__tooltip">${t}</span>
    </media-play-button>
  `}function oe(){let{translations:e}=o(),{remote:t}=p(),a=s(e,"Restart");function l(i){T(i)&&!k(i)||t.seek(0,i)}return n`
    <button
      type="button"
      class="plyr__control"
      data-plyr="restart"
      @pointerup=${l}
      @keydown=${l}
    >
      <slot name="restart-icon"></slot>
      <span class="plyr__tooltip">${a}</span>
    </button>
  `}function se(){let{translations:e,seekTime:t}=o(),a=r(()=>`${$(e,"Rewind")} ${t()}s`),l=r(()=>-1*t());return n`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${l}
      data-no-label
      data-plyr="rewind"
    >
      <slot name="rewind-icon"></slot>
      <span class="plyr__tooltip">${a}</span>
    </media-seek-button>
  `}function ie(){let{translations:e,seekTime:t}=o(),a=r(()=>`${$(e,"Forward")} ${t()}s`),l=r(t);return n`
    <media-seek-button
      class="plyr__controls__item plyr__control"
      seconds=${l}
      data-no-label
      data-plyr="fast-forward"
    >
      <slot name="fast-forward-icon"></slot>
      <span class="plyr__tooltip">${a}</span>
    </media-seek-button>
  `}function pe(){let e=p(),{duration:t,viewType:a}=e.$state,{translations:l,markers:i,thumbnails:d,seekTime:y,previewTime:m}=o(),c=s(l,"Seek"),_=f(null),b=r(()=>{let u=_();return u?n`<span class="plyr__progress__marker-label">${G(u.label)}<br /></span>`:null});function w(u){m.set(u.detail)}function K(){_.set(this)}function j(){_.set(null)}function U(){let u=d(),v=r(()=>a()==="audio");return u?n`
          <media-slider-preview class="plyr__slider__preview" ?no-clamp=${v}>
            <media-slider-thumbnail .src=${u} class="plyr__slider__preview__thumbnail">
              <span class="plyr__slider__preview__time-container">
                ${b}
                <media-slider-value class="plyr__slider__preview__time"></media-slider-value>
              </span>
            </media-slider-thumbnail>
          </media-slider-preview>
        `:n`
          <span class="plyr__tooltip">
            ${b}
            <media-slider-value></media-slider-value>
          </span>
        `}function z(){let u=t();return Number.isFinite(u)?i()?.map(v=>n`
        <span
          class="plyr__progress__marker"
          @mouseenter=${K.bind(v)}
          @mouseleave=${j}
          style=${`left: ${v.time/u*100}%;`}
        ></span>
      `):null}return n`
    <div class="plyr__controls__item plyr__progress__container">
      <div class="plyr__progress">
        <media-time-slider
          class="plyr__slider"
          data-plyr="seek"
          pause-while-dragging
          key-step=${r(y)}
          aria-label=${c}
          @media-seeking-request=${w}
        >
          <div class="plyr__slider__track"></div>
          <div class="plyr__slider__thumb"></div>
          <div class="plyr__slider__buffer"></div>
          ${r(U)}${r(z)}
        </media-time-slider>
      </div>
    </div>
  `}function ue(e){return r(()=>{let t=e==="mute"||e==="mute+volume",a=e==="volume"||e==="mute+volume";return n`
      <div class="plyr__controls__item plyr__volume">
        ${[t?ne():null,a?ce():null]}
      </div>
    `})}function ce(){let{translations:e}=o(),t=s(e,"Volume");return n`
    <media-volume-slider class="plyr__slider" data-plyr="volume" aria-label=${t}>
      <div class="plyr__slider__track"></div>
      <div class="plyr__slider__thumb"></div>
    </media-volume-slider>
  `}function de(){let e=p(),{translations:t,invertTime:a,toggleTime:l,displayDuration:i}=o(),d=f(h(a));function y(c){!l()||i()||T(c)&&!k(c)||d.set(_=>!_)}function m(){return r(()=>i()?Q():null)}return r(()=>{let{streamType:c}=e.$state,_=s(t,"LIVE"),b=s(t,"Current time"),w=r(()=>!i()&&d());return c()==="live"||c()==="ll-live"?n`
          <media-live-button
            class="plyr__controls__item plyr__control plyr__live-button"
            data-plyr="live"
          >
            <span class="plyr__live-button__text">${_}</span>
          </media-live-button>
        `:n`
          <media-time
            type="current"
            class="plyr__controls__item plyr__time plyr__time--current"
            tabindex="0"
            role="timer"
            aria-label=${b}
            ?remainder=${w}
            @pointerup=${y}
            @keydown=${y}
          ></media-time>
          ${m()}
        `})}function Q(){let{translations:e}=o(),t=s(e,"Duration");return n`
    <media-time
      type="duration"
      class="plyr__controls__item plyr__time plyr__time--duration"
      role="timer"
      tabindex="0"
      aria-label=${t}
    ></media-time>
  `}function me(){return r(()=>{let e=p(),{translations:t,download:a}=o(),{title:l,source:i}=e.$state,d=i(),y=a(),m=S({title:l(),src:d,download:y}),c=s(t,"Download");return m?n`
          <a
            class="plyr__controls__item plyr__control"
            href=${m.url+`?download=${m.name}`}
            download=${m.name}
            target="_blank"
          >
            <slot name="download-icon" />
            <span class="plyr__tooltip">${c}</span>
          </a>
        `:null})}function _e(){return r(()=>{let{clickToPlay:e,clickToFullscreen:t}=o();return[e()?n`
            <media-gesture
              class="plyr__gesture"
              event="pointerup"
              action="toggle:paused"
            ></media-gesture>
          `:null,t()?n`
            <media-gesture
              class="plyr__gesture"
              event="dblpointerup"
              action="toggle:fullscreen"
            ></media-gesture>
          `:null]})}function ye(){let e=p(),t=f(void 0),a=r(()=>G(t()?.text));return g(()=>{let l=e.$state.textTrack();if(!l)return;function i(){t.set(l?.activeCues[0])}return i(),L(l,"cue-change",i)}),n`
    <div class="plyr__captions" dir="auto">
      <span class="plyr__caption">${a}</span>
    </div>
  `}function fe(){let{translations:e}=o(),t=s(e,"Settings");return n`
    <div class="plyr__controls__item plyr__menu">
      <media-menu>
        <media-menu-button class="plyr__control" data-plyr="settings">
          <slot name="settings-icon" />
          <span class="plyr__tooltip">${t}</span>
        </media-menu-button>
        <media-menu-items class="plyr__menu__container" placement="top end">
          <div><div>${[be(),xe(),Te(),ge()]}</div></div>
        </media-menu-items>
      </media-menu>
    </div>
  `}function x({label:e,children:t}){let a=f(!1);return n`
    <media-menu @open=${()=>a.set(!0)} @close=${()=>a.set(!1)}>
      ${$e({label:e,open:a})}
      <media-menu-items>${t}</media-menu-items>
    </media-menu>
  `}function $e({open:e,label:t}){let{translations:a}=o(),l=r(()=>`plyr__control plyr__control--${e()?"back":"forward"}`);function i(){let d=s(a,"Go back to previous menu");return r(()=>e()?n`<span class="plyr__sr-only">${d}</span>`:null)}return n`
    <media-menu-button class=${l} data-plyr="settings">
      <span class="plyr__menu__label" aria-hidden=${he(e)}>
        ${s(a,t)}
      </span>
      <span class="plyr__menu__value" data-part="hint"></span>
      ${i()}
    </media-menu-button>
  `}function be(){return x({label:"Audio",children:ve()})}function ve(){let{translations:e}=o();return n`
    <media-audio-radio-group empty-label=${s(e,"Default")}>
      <template>
        <media-radio class="plyr__control" data-plyr="audio">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-audio-radio-group>
  `}function ge(){return x({label:"Speed",children:Pe()})}function Pe(){let{translations:e,speed:t}=o();return n`
    <media-speed-radio-group .rates=${t} normal-label=${s(e,"Normal")}>
      <template>
        <media-radio class="plyr__control" data-plyr="speed">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-speed-radio-group>
  `}function xe(){return x({label:"Captions",children:we()})}function we(){let{translations:e}=o();return n`
    <media-captions-radio-group off-label=${s(e,"Disabled")}>
      <template>
        <media-radio class="plyr__control" data-plyr="captions">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-captions-radio-group>
  `}function Te(){return x({label:"Quality",children:ke()})}function ke(){let{translations:e}=o();return n`
    <media-quality-radio-group auto-label=${s(e,"Auto")}>
      <template>
        <media-radio class="plyr__control" data-plyr="quality">
          <span data-part="label"></span>
        </media-radio>
      </template>
    </media-quality-radio-group>
  `}function he(e){return r(()=>e()?"true":"false")}function s(e,t){return r(()=>$(e,t))}var H=class extends A(B,R){static tagName="media-plyr-layout";#e;onSetup(){this.forwardKeepAlive=!1,this.#e=p()}onConnect(){this.#e.player.el?.setAttribute("data-layout","plyr"),C(()=>this.#e.player.el?.removeAttribute("data-layout")),E(this,this.#e),g(()=>{this.$props.customIcons()?new D([this]).connect():new P([this]).connect()})}render(){return r(this.#t.bind(this))}#t(){let{viewType:t}=this.#e.$state;return t()==="audio"?I():t()==="video"?N():null}};export{H as a};
