import{a as p,b as T,c as x,d as P,e as E,f as B,h as R,i as W,l as d,m as I,n as H,o as N,p as O,q as k,r as z,s as q,t as K,u as V,x as j,y as F}from"./vidstack-VGPDVNHE.js";import{a as r,b as A}from"./vidstack-I3NGMVWZ.js";import{a as w}from"./vidstack-2IDCNZ37.js";import{b as $}from"./vidstack-RYIIIOKJ.js";import{b as l,c as L}from"./vidstack-HDVJ2P4K.js";import{q as M,r as C,t as S}from"./vidstack-SKR3AJXQ.js";import{H as v,I as a,L as s,x as u}from"./vidstack-XC7WIXLW.js";var m=class extends T{static props={...super.props,when:({viewType:t})=>t==="audio",smallWhen:({width:t})=>t<576}};import{html as c}from"lit-html";import{ref as Z}from"lit-html/directives/ref.js";function G(){return[E(),H(),c`
      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          ${[d({backward:!0,tooltip:"top start"}),R({tooltip:"top"}),d({tooltip:"top"}),_(),K(),V(),q({orientation:"vertical",tooltip:"top"}),W({tooltip:"top"}),I(),B({tooltip:"top"}),tt()]}
        </media-controls-group>
      </media-controls>
    `]}function _(){return r(()=>{let e=a(void 0),t=a(!1),o=l(),{title:n,started:h,currentTime:Q,ended:U}=L(),{translations:X}=p(),f=M(e),y=()=>h()||Q()>0,g=()=>{let i=U()?"Replay":y()?"Continue":"Play";return`${P(X,i)}: ${n()}`};s(()=>{f()&&document.activeElement===document.body&&o.player.el?.focus({preventScroll:!0})});function Y(){let i=e(),b=!!i&&!f()&&i.clientWidth<i.children[0].clientWidth;i&&v(i,"vds-marquee",b),t.set(b)}function D(){return c`
        <span class="vds-title-text">
          ${r(g)}${r(()=>y()?j():null)}
        </span>
      `}return C(e,Y),n()?c`
          <span class="vds-title" title=${r(g)} ${Z(e.set)}>
            ${[D(),r(()=>t()&&!f()?D():null)]}
          </span>
        `:N()})}function tt(){let e="top end";return[k({tooltip:"top",placement:e,portal:!0}),z({tooltip:"top end",placement:e,portal:!0})]}var J=class extends $(w,m){static tagName="media-audio-layout";static attrs={smallWhen:{converter(t){return t!=="never"&&!!t}}};#e;#t=a(!1);onSetup(){this.forwardKeepAlive=!1,this.#e=l(),this.classList.add("vds-audio-layout"),this.#i()}onConnect(){x("audio",()=>this.isMatch),this.#r()}render(){return r(this.#o.bind(this))}#o(){return this.isMatch?G():null}#r(){let{menuPortal:t}=p();s(()=>{if(!this.isMatch)return;let o=O(this,this.menuContainer,"vds-audio-layout",()=>this.isSmallLayout),n=o?[this,o]:[this];return(this.$props.customIcons()?new A(n):new F(n)).connect(),t.set(o),()=>{o.remove(),t.set(null)}})}#i(){let{pointer:t}=this.#e.$state;s(()=>{t()==="coarse"&&s(this.#n.bind(this))})}#n(){if(!this.#t()){u(this,"pointerdown",this.#s.bind(this),{capture:!0});return}u(this,"pointerdown",t=>t.stopPropagation()),u(window,"pointerdown",this.#a.bind(this))}#s(t){let{target:o}=t;S(o)&&o.closest(".vds-time-slider")&&(t.stopImmediatePropagation(),this.setAttribute("data-scrubbing",""),this.#t.set(!0))}#a(){this.#t.set(!1),this.removeAttribute("data-scrubbing")}};export{J as a};
