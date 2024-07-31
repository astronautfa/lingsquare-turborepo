import{a as u,b as K,c as N,e as b,f as D,g as y,h as f,i as $,j as F,k as h,m as L,n as k,o as l,p as z,q as E,r as H,s as x,t as M,v as C,w,y as R}from"./vidstack-VGPDVNHE.js";import{a as r,b as W}from"./vidstack-I3NGMVWZ.js";import{a as V}from"./vidstack-2IDCNZ37.js";import{b as I}from"./vidstack-RYIIIOKJ.js";import{b as d,c as B}from"./vidstack-HDVJ2P4K.js";import{p as G}from"./vidstack-SKR3AJXQ.js";import{I as T,J as i,L as p,Y as A}from"./vidstack-XC7WIXLW.js";var v=class extends K{static props={...super.props,when:({viewType:o})=>o==="video",smallWhen:({width:o,height:e})=>o<576||e<380}};import{html as n}from"lit-html";import{html as U}from"lit-html";import{keyed as et}from"lit-html/directives/keyed.js";function P(){return r(()=>{let t=d(),{noKeyboardAnimations:o,userPrefersKeyboardAnimations:e}=u();if(i(()=>o()||!e())())return null;let s=T(!1),{lastKeyboardAction:g}=t.$state;p(()=>{s.set(!!g());let a=setTimeout(()=>s.set(!1),500);return()=>{s.set(!1),window.clearTimeout(a)}});let Y=i(()=>{let a=g()?.action;return a&&s()?A(a):null}),Z=i(()=>`vds-kb-action${s()?"":" hidden"}`),_=i(rt),tt=i(()=>{let a=nt();return a?G(a):null});function ot(){let a=tt();return a?U`
        <div class="vds-kb-bezel">
          <div class="vds-kb-icon">${a}</div>
        </div>
      `:null}return U`
      <div class=${r(Z)} data-action=${r(Y)}>
        <div class="vds-kb-text-wrapper">
          <div class="vds-kb-text">${r(_)}</div>
        </div>
        ${r(()=>et(g(),ot()))}
      </div>
    `})}function rt(){let{$state:t}=d(),o=t.lastKeyboardAction()?.action,e=t.audioGain()??1;switch(o){case"toggleMuted":return t.muted()?"0%":j(t.volume(),e);case"volumeUp":case"volumeDown":return j(t.volume(),e);default:return""}}function j(t,o){return`${Math.round(t*o*100)}%`}function nt(){let{$state:t}=d();switch(t.lastKeyboardAction()?.action){case"togglePaused":return t.paused()?"kb-pause-icon":"kb-play-icon";case"toggleMuted":return t.muted()||t.volume()===0?"kb-mute-icon":t.volume()>=.5?"kb-volume-up-icon":"kb-volume-down-icon";case"toggleFullscreen":return`kb-fs-${t.fullscreen()?"enter":"exit"}-icon`;case"togglePictureInPicture":return`kb-pip-${t.pictureInPicture()?"enter":"exit"}-icon`;case"toggleCaptions":return t.hasCaptions()?`kb-cc-${t.textTrack()?"on":"off"}-icon`:null;case"volumeUp":return"kb-volume-up-icon";case"volumeDown":return"kb-volume-down-icon";case"seekForward":return"kb-seek-forward-icon";case"seekBackward":return"kb-seek-backward-icon";default:return null}}function q(){return[b(),Q(),m(),P(),k(),n`<div class="vds-scrim"></div>`,n`
      <media-controls class="vds-controls">
        ${[at(),l(),n`<media-controls-group class="vds-controls-group"></media-controls-group>`,l(),n`
            <media-controls-group class="vds-controls-group">
              ${M()}
            </media-controls-group>
          `,n`
            <media-controls-group class="vds-controls-group">
              ${[f({tooltip:"top start"}),x({orientation:"horizontal",tooltip:"top"}),C(),w(),$({tooltip:"top"}),st(),D({tooltip:"top"}),y({tooltip:"top"}),L(),F(),h({tooltip:"top end"})]}
            </media-controls-group>
          `]}
      </media-controls>
    `]}function st(){return r(()=>{let{menuGroup:t}=u();return t()==="bottom"?S():null})}function at(){return n`
    <media-controls-group class="vds-controls-group">
      ${r(()=>{let{menuGroup:t}=u();return t()==="top"?[l(),S()]:null})}
    </media-controls-group>
  `}function J(){return[b(),Q(),m(),k(),P(),n`<div class="vds-scrim"></div>`,n`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[D({tooltip:"top start"}),y({tooltip:"bottom start"}),l(),$({tooltip:"bottom"}),L(),S(),x({orientation:"vertical",tooltip:"bottom end"})]}
        </media-controls-group>

        ${l()}

        <media-controls-group class="vds-controls-group" style="pointer-events: none;">
          ${[l(),f({tooltip:"top"}),l()]}
        </media-controls-group>

        ${l()}

        <media-controls-group class="vds-controls-group">
          ${[C(),w(),h({tooltip:"top end"})]}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${M()}
        </media-controls-group>
      </media-controls>
    `,it()]}function O(){return n`
    <div class="vds-load-container">
      ${[m(),f({tooltip:"top"})]}
    </div>
  `}function it(){return r(()=>{let{duration:t}=B();return t()===0?null:n`
      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    `})}function m(){return n`
    <div class="vds-buffering-indicator">
      <media-spinner class="vds-buffering-spinner"></media-spinner>
    </div>
  `}function S(){let{menuGroup:t,smallWhen:o}=u(),e=()=>t()==="top"||o()?"bottom":"top",c=i(()=>`${e()} ${t()==="top"?"end":"center"}`),s=i(()=>`${e()} end`);return[E({tooltip:c,placement:s,portal:!0}),H({tooltip:c,placement:s,portal:!0})]}function Q(){return r(()=>{let{noGestures:t}=u();return t()?null:n`
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
    `})}var X=class extends I(V,v){static tagName="media-video-layout";static attrs={smallWhen:{converter(o){return o!=="never"&&!!o}}};#t;onSetup(){this.forwardKeepAlive=!1,this.#t=d(),this.classList.add("vds-video-layout")}onConnect(){N("video",()=>this.isMatch),this.#o()}render(){return r(this.#e.bind(this))}#o(){let{menuPortal:o}=u();p(()=>{if(!this.isMatch)return;let e=z(this,this.menuContainer,"vds-video-layout",()=>this.isSmallLayout),c=e?[this,e]:[this];return(this.$props.customIcons()?new W(c):new R(c)).connect(),o.set(e),()=>{e.remove(),o.set(null)}})}#e(){let{load:o}=this.#t.$props,{canLoad:e,streamType:c,nativeControls:s}=this.#t.$state;return!s()&&this.isMatch?o()==="play"&&!e()?O():c()==="unknown"?m():this.isSmallLayout?J():q():null}};export{X as a};
