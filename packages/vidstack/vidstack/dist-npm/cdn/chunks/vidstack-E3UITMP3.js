var l=Symbol("SCOPE"),C=!1,I=!1,c=null,p=null,o=null,i=0,_=[],H={},Et=()=>{},g=0,rt=1,$=2,O=3;function St(){C=!0,queueMicrotask(nt)}function nt(){if(!_.length){C=!1;return}I=!0;for(let t=0;t<_.length;t++)_[t]._state!==g&&Ct(_[t]);_=[],C=!1,I=!1}function Ct(t){let e=[t];for(;t=t[l];)t._effect&&t._state!==g&&e.push(t);for(let s=e.length-1;s>=0;s--)G(e[s])}function W(t){let e=y();return b(e,t.length?t.bind(null,u.bind(e)):t,null)}function $t(t){return b(c,t,null)}function U(t){return b(null,t,null)}function wt(){I||nt()}function k(){return c}function a(t,e){try{return b(e,t,null)}catch(s){V(e,s);return}}function B(t,e=c){return e?._context[t]}function it(t,e,s=c){s&&(s._context={...s._context,[t]:e})}function h(t){if(!t||!c)return t||Et;let e=c;return e._disposal?Array.isArray(e._disposal)?e._disposal.push(t):e._disposal=[e._disposal,t]:e._disposal=t,function(){e._state!==O&&(t.call(null),v(e._disposal)?e._disposal=null:Array.isArray(e._disposal)&&e._disposal.splice(e._disposal.indexOf(t),1))}}function u(t=!0){if(this._state!==O){if(this._children)if(Array.isArray(this._children))for(let e=this._children.length-1;e>=0;e--)u.call(this._children[e]);else u.call(this._children);if(t){let e=this[l];e&&(Array.isArray(e._children)?e._children.splice(e._children.indexOf(this),1):e._children=null),Ot(this)}}}function Ot(t){t._state=O,t._disposal&&ot(t),t._sources&&K(t,0),t[l]=null,t._sources=null,t._observers=null,t._children=null,t._context=H,t._handlers=null}function ot(t){try{if(Array.isArray(t._disposal))for(let e=t._disposal.length-1;e>=0;e--){let s=t._disposal[e];s.call(s)}else t._disposal.call(t._disposal);t._disposal=null}catch(e){V(t,e)}}function b(t,e,s){let r=c,n=p;c=t,p=s;try{return e.call(t)}finally{c=r,p=n}}function V(t,e){if(!t||!t._handlers)throw e;let s=0,r=t._handlers.length,n=e;for(s=0;s<r;s++)try{t._handlers[s](n);break}catch(S){n=S}if(s===r)throw n}function T(){return this._state===O?this._value:(p&&!this._effect&&(!o&&p._sources&&p._sources[i]==this?i++:o?o.push(this):o=[this]),this._compute&&G(this),this._value)}function Y(t){let e=v(t)?t(this._value):t;if(this._changed(this._value,e)&&(this._value=e,this._observers))for(let s=0;s<this._observers.length;s++)lt(this._observers[s],$);return this._value}var Z=function(){this[l]=null,this._children=null,c&&c.append(this)},f=Z.prototype;f._context=H;f._handlers=null;f._compute=null;f._disposal=null;f.append=function(t){t[l]=this,this._children?Array.isArray(this._children)?this._children.push(t):this._children=[this._children,t]:this._children=t,t._context=t._context===H?this._context:{...this._context,...t._context},this._handlers&&(t._handlers=t._handlers?[...t._handlers,...this._handlers]:this._handlers)};f.dispose=function(){u.call(this)};function y(){return new Z}var ct=function(e,s,r){Z.call(this),this._state=s?$:g,this._init=!1,this._effect=!1,this._sources=null,this._observers=null,this._value=e,this.id=r?.id??(this._compute?"computed":"signal"),s&&(this._compute=s),r&&r.dirty&&(this._changed=r.dirty)},z=ct.prototype;Object.setPrototypeOf(z,f);z._changed=kt;z.call=T;function P(t,e,s){return new ct(t,e,s)}function kt(t,e){return t!==e}function v(t){return typeof t=="function"}function G(t){if(t._state===rt)for(let e=0;e<t._sources.length&&(G(t._sources[e]),t._state!==$);e++);t._state===$?J(t):t._state=g}function Tt(t){t._children&&u.call(t,!1),t._disposal&&ot(t),t._handlers=t[l]?t[l]._handlers:null}function J(t){let e=o,s=i;o=null,i=0;try{Tt(t);let r=b(t,t._compute,t);et(t),!t._effect&&t._init?Y.call(t,r):(t._value=r,t._init=!0)}catch(r){!t._init&&typeof t._value>"u"&&console.error(`computed \`${t.id}\` threw error during first run, this can be fatal.

Solutions:

1. Set the \`initial\` option to silence this error`,"\n2. Or, use an `effect` if the return value is not being used",`

`,r),et(t),V(t,r)}finally{o=e,i=s,t._state=g}}function et(t){if(o){if(t._sources&&K(t,i),t._sources&&i>0){t._sources.length=i+o.length;for(let s=0;s<o.length;s++)t._sources[i+s]=o[s]}else t._sources=o;let e;for(let s=i;s<t._sources.length;s++)e=t._sources[s],e._observers?e._observers.push(t):e._observers=[t]}else t._sources&&i<t._sources.length&&(K(t,i),t._sources.length=i)}function lt(t,e){if(!(t._state>=e)&&(t._effect&&t._state===g&&(_.push(t),C||St()),t._state=e,t._observers))for(let s=0;s<t._observers.length;s++)lt(t._observers[s],rt)}function K(t,e){let s,r;for(let n=e;n<t._sources.length;n++)s=t._sources[n],s._observers&&(r=s._observers.indexOf(t),s._observers[r]=s._observers[s._observers.length-1],s._observers.pop())}function A(...t){}function at(t){return t===null}function m(t){return typeof t>"u"}function Pt(t){return at(t)||m(t)}function At(t){return t?.constructor===Object}function xt(t){return typeof t=="number"&&!Number.isNaN(t)}function Dt(t){return typeof t=="string"}function Nt(t){return typeof t=="boolean"}function x(t){return typeof t=="function"}function Mt(t){return Array.isArray(t)}var st,Ft=Event,ut=Symbol("DOM_EVENT"),d=class extends Ft{constructor(e,...s){super(e,s[0]),this[st]=!0,this.triggers=new w,this.detail=s[0]?.detail;let r=s[0]?.trigger;r&&this.triggers.add(r)}get trigger(){return this.triggers.source}get originEvent(){return this.triggers.origin}get isOriginTrusted(){return this.triggers.origin?.isTrusted??!1}};st=ut;var w=class{constructor(){this.chain=[]}get source(){return this.chain[0]}get origin(){return this.chain[this.chain.length-1]}add(e){this.chain.push(e),ht(e)&&this.chain.push(...e.triggers)}remove(e){return this.chain.splice(this.chain.indexOf(e),1)[0]}has(e){return this.chain.some(s=>s===e)}hasType(e){return!!this.findType(e)}findType(e){return this.chain.find(s=>s.type===e)}walk(e){for(let s of this.chain){let r=e(s);if(r)return[s,r]}}[Symbol.iterator](){return this.chain.values()}};function ht(t){return!!t?.[ut]}var q=class extends EventTarget{addEventListener(e,s,r){return super.addEventListener(e,s,r)}removeEventListener(e,s,r){return super.removeEventListener(e,s,r)}};function Q(t,e,s,r){return t.addEventListener(e,s,r),h(()=>t.removeEventListener(e,s,r))}function jt(t){return!!t?.type.startsWith("pointer")}function Lt(t){return!!t?.type.startsWith("touch")}function Rt(t){return/^(click|mouse)/.test(t?.type??"")}function X(t){return!!t?.type.startsWith("key")}function It(t){return X(t)&&t.key==="Enter"}function Kt(t){return X(t)&&(t.key==="Enter"||t.key===" ")}function qt(t){return t instanceof Node}function D(t,e,s){if(t)if(!s&&s!==""&&s!==0)t.removeAttribute(e);else{let r=s===!0?"":s+"";t.getAttribute(e)!==r&&t.setAttribute(e,r)}else return}function N(t,e,s){if(t)!s&&s!==0?t.style.removeProperty(e):t.style.setProperty(e,s+"");else return}function L(t,e){let s=P(t,null,e),r=T.bind(s);return r.node=s,r[l]=!0,r.set=Y.bind(s),r}function _t(t){return v(t)&&l in t}function pt(t,e){let s=P(e?.initial,t,e),r=T.bind(s);return r[l]=!0,r.node=s,r}function Ht(t,e){let s=P(null,function(){let n=t();return v(n)&&h(n),null},{id:e?.id??"effect"});return s._effect=!0,J(s),function(){u.call(s,!0)}}function Wt(t){return _t(t)&&"set"in t}var M=Ht;function Ut(t){return{id:Symbol(),provide:t}}function dt(t,e,s=k()){if(!s)throw Error("[maverick] attempting to provide context outside root");let r=!m(e);if(!r&&!t.provide)throw Error("[maverick] context can not be provided without a value or `provide` function");it(t.id,r?e:t.provide?.(),s)}function gt(t){let e=B(t.id);if(m(e))throw Error("[maverick] attempting to use context without providing first");return e}function Bt(t){return!m(B(t.id))}var Vt=Symbol("PROPS"),Yt=Symbol("METHODS"),mt=Symbol("ON_DISPATCH"),ft,tt={},F=class{constructor(e,s,r){this[ft]=null,this.$el=L(null),this._el=null,this._scope=null,this._attachScope=null,this._connectScope=null,this._component=null,this._destroyed=!1,this._props=tt,this._attrs=null,this._styles=null,this._setupCallbacks=[],this._attachCallbacks=[],this._connectCallbacks=[],this._destroyCallbacks=[],this._scope=s,r?.scope&&r.scope.append(s);let n=e.state,S=e.props;if(n&&(this._$state=n.create(),this._state=new Proxy(this._$state,{get:(R,vt)=>this._$state[vt]()}),dt(n,this._$state)),S&&(this._props=Zt(S),r?.props))for(let R of Object.keys(r.props))this._props[R]?.set(r.props[R]);h(this._destroy.bind(this))}_setup(){a(()=>{for(let e of this._setupCallbacks)e()},this._scope)}_attach(e){this._el||(this._el=e,this.$el.set(e),e.$$COMPONENT_NAME=this._component?.constructor.name,a(()=>{this._attachScope=y(),a(()=>{for(let s of this._attachCallbacks)s(this._el);this._attachAttrs(),this._attachStyles()},this._attachScope)},this._scope),e.dispatchEvent(new Event("attached")))}_detach(){this._attachScope?.dispose(),this._attachScope=null,this._connectScope=null,this._el&&(this._el.$$COMPONENT_NAME=null),this._el=null,this.$el.set(null)}_connect(){!this._el||!this._attachScope||!this._connectCallbacks.length||a(()=>{this._connectScope=y(),a(()=>{for(let e of this._connectCallbacks)e(this._el)},this._connectScope)},this._attachScope)}_disconnect(){this._connectScope?.dispose(),this._connectScope=null}_destroy(){if(this._destroyed)return;this._destroyed=!0,a(()=>{for(let s of this._destroyCallbacks)s(this._el)},this._scope);let e=this._el;this._detach(),this._scope.dispose(),this._setupCallbacks.length=0,this._attachCallbacks.length=0,this._connectCallbacks.length=0,this._destroyCallbacks.length=0,this._component=null,this._attrs=null,this._styles=null,this._props=tt,this._scope=null,this._state=tt,this._$state=null,e&&delete e.$}_addHooks(e){e.onSetup&&this._setupCallbacks.push(e.onSetup.bind(e)),e.onAttach&&this._attachCallbacks.push(e.onAttach.bind(e)),e.onConnect&&this._connectCallbacks.push(e.onConnect.bind(e)),e.onDestroy&&this._destroyCallbacks.push(e.onDestroy.bind(e))}_attachAttrs(){if(this._attrs)for(let e of Object.keys(this._attrs))x(this._attrs[e])?M(this._setAttr.bind(this,e)):D(this._el,e,this._attrs[e])}_attachStyles(){if(this._styles)for(let e of Object.keys(this._styles))x(this._styles[e])?M(this._setStyle.bind(this,e)):N(this._el,e,this._styles[e])}_setAttr(e){D(this._el,e,this._attrs[e].call(this._component))}_setStyle(e){N(this._el,e,this._styles[e].call(this._component))}};ft=mt;function Zt(t){let e={};for(let s of Object.keys(t)){let r=t[s];e[s]=L(r,r)}return e}var E={$$:null};function zt(t,e){return W(()=>{E.$$=new F(t,k(),e);let s=new t;return E.$$._component=s,E.$$=null,s})}var j=class extends EventTarget{constructor(){super(),E.$$&&this.attach(E)}get el(){return this.$$._el}get $el(){return this.$$.$el()}get scope(){return this.$$._scope}get attachScope(){return this.$$._attachScope}get connectScope(){return this.$$._connectScope}get $props(){return this.$$._props}get $state(){return this.$$._$state}get state(){return this.$$._state}attach({$$:e}){return this.$$=e,e._addHooks(this),this}addEventListener(e,s,r){if(!this.el){let n=this.constructor.name;console.warn(`[maverick] adding event listener to \`${n}\` before element is attached`)}this.listen(e,s,r)}removeEventListener(e,s,r){this.el?.removeEventListener(e,s,r)}setAttributes(e){this.$$._attrs||(this.$$._attrs={}),Object.assign(this.$$._attrs,e)}setStyles(e){this.$$._styles||(this.$$._styles={}),Object.assign(this.$$._styles,e)}setCSSVars(e){this.setStyles(e)}createEvent(e,...s){return new d(e,s[0])}dispatch(e,...s){if(!this.el)return!1;let r=e instanceof Event?e:new d(e,s[0]);return Object.defineProperty(r,"target",{get:()=>this.$$._component}),U(()=>(this.$$[mt]?.(r),this.el.dispatchEvent(r)))}dispatchEvent(e){return this.dispatch(e)}listen(e,s,r){return this.el?Q(this.el,e,s,r):A}};var bt=class extends j{subscribe(e){if(!this.state){let s=this.constructor.name;throw Error(`[maverick] component \`${s}\` can not be subscribed to because it has no internal state`)}return a(()=>M(()=>e(this.state)),this.$$._scope)}destroy(){this.$$._destroy()}};var yt=class{constructor(e){this.id=Symbol("STATE"),this.record=e,this._descriptors=Object.getOwnPropertyDescriptors(e)}create(){let e={},s=new Proxy(e,{get:(r,n)=>e[n]()});for(let r of Object.keys(this.record)){let n=this._descriptors[r].get;e[r]=n?pt(n.bind(s)):L(this.record[r])}return e}reset(e,s){for(let r of Object.keys(e))!this._descriptors[r].get&&(!s||s(r))&&e[r].set(this.record[r])}};function le(t){return gt(t)}function fe(t,e){for(let s of t)s(e)}function Gt(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function Jt(t){return t.replace(/-./g,e=>e[1].toUpperCase())}function Qt(t){return t.charAt(0).toUpperCase()+t.slice(1)}function je(t){return t?"true":"false"}function Xt(){let t=new Set;return{add(...e){for(let s of e)t.add(s)},empty(){for(let e of t)e();t.clear()}}}function Le(){let t=Xt();return h(t.empty),t}function Re(t){return Object.keys(t)}function Ie(){let t,e;return{promise:new Promise((r,n)=>{t=r,e=n}),resolve:t,reject:e}}function Ke(t){return new Promise(e=>setTimeout(e,t))}function qe(t){let e=-1,s;function r(...n){s=n,!(e>=0)&&(e=window.requestAnimationFrame(()=>{t.apply(this,s),e=-1,s=void 0}))}return r}var te=typeof window<"u"?"requestIdleCallback"in window?window.requestIdleCallback:t=>window.setTimeout(t,1):A;function He(t,e){return new Promise(s=>{te(r=>{t?.(r),s()},e)})}export{$t as a,U as b,wt as c,k as d,a as e,h as f,y as g,A as h,at as i,m as j,Pt as k,At as l,xt as m,Dt as n,Nt as o,x as p,Mt as q,d as r,q as s,Q as t,jt as u,Lt as v,Rt as w,X as x,It as y,Kt as z,qt as A,D as B,N as C,L as D,pt as E,Wt as F,M as G,Ut as H,dt as I,gt as J,Bt as K,Vt as L,Yt as M,zt as N,j as O,fe as P,Gt as Q,Jt as R,Qt as S,bt as T,yt as U,le as V,je as W,Xt as X,Le as Y,Re as Z,Ie as _,Ke as $,qe as aa,He as ba};