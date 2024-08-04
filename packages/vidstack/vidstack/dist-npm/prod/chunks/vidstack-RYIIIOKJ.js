import{Q as m,R as _,S,X as g,Y as y,e as d,n as $,q as b}from"./vidstack-XC7WIXLW.js";var A=t=>t===null?"":t+"",E=t=>t===null?null:t+"",T=t=>t===null?0:Number(t);var w=t=>t!==null,P=()=>null,C=t=>t===null?[]:JSON.parse(t),O=t=>t===null?{}:JSON.parse(t);function v(t){if(t===null)return E;switch(typeof t){case"undefined":return A;case"string":return A;case"boolean":return w;case"number":return T;case"function":return P;case"object":return b(t)?C:O;default:return A}}var u=Symbol("ATTRS"),k=Symbol("SETUP"),h=Symbol("SETUP_STATE"),f=Symbol("SETUP_CALLBACKS");function F(t,e){var c,p,o;class a extends t{constructor(...s){if(super(...s),this[p]=0,this[o]=null,this.keepAlive=!1,this.forwardKeepAlive=!0,this.$=d(()=>S(e),null),this.$.$$._addHooks(this),e.props){let r=this.$props,i=Object.getOwnPropertyDescriptors(this);for(let n of Object.keys(i))n in e.props&&(r[n].set(this[n]),delete this[n])}}static{this[c]=null}static get observedAttributes(){if(!this[u]&&e.props){let s=new Map;for(let r of Object.keys(e.props)){let i=this.attrs?.[r],n=$(i)?i:i&&i?.attr;n!==!1&&(n||(n=y(r)),s.set(n,{_prop:r,_converter:i&&!$(i)&&i?.converter||v(e.props[r])}))}this[u]=s}return this[u]?Array.from(this[u].keys()):[]}get scope(){return this.$.$$._scope}get attachScope(){return this.$.$$._attachScope}get connectScope(){return this.$.$$._connectScope}get $props(){return this.$.$$._props}get $state(){return this.$.$$._$state}get state(){return this.$.state}attributeChangedCallback(s,r,i){let n=this.constructor;if(!n[u]){super.attributeChangedCallback?.(s,r,i);return}let l=n[u].get(s);l&&(this[l._prop]=l._converter(i))}connectedCallback(){let s=this.$?.$$;if(!s||s._destroyed)return;if(this[h]!==2){U.call(this);return}if(!this.isConnected)return;this.hasAttribute("keep-alive")&&(this.keepAlive=!0),s._connect(),b(this[f])&&g(this[f],this),this[f]=null;let r=super.connectedCallback;r&&d(()=>r.call(this),this.connectScope)}disconnectedCallback(){let s=this.$?.$$;if(!s||s._destroyed)return;s._disconnect();let r=super.disconnectedCallback;r&&r.call(this),!this.keepAlive&&!this.hasAttribute("keep-alive")&&setTimeout(()=>{requestAnimationFrame(()=>{this.isConnected||s._destroy()})},0)}[(c=u,p=h,o=f,k)](){let s=this.$.$$,r=this.constructor;if(s._destroyed&&console.warn(`[maverick] attempted attaching to destroyed element \`${this.tagName}\``),s._destroyed)return;let i=r[u];if(i)for(let n of this.attributes){let l=i.get(n.name);l&&l._converter&&s._props[l._prop].set(l._converter(this.getAttribute(n.name)))}s._setup(),s._attach(this),this[h]=2,this.connectedCallback()}subscribe(s){return this.$.subscribe(s)}destroy(){this.disconnectedCallback(),this.$.destroy()}}return L(a,e),a}function L(t,e){let c=t.prototype,p=e.prototype;if(e.props)for(let o of Object.keys(e.props))Object.defineProperty(c,o,{enumerable:!0,configurable:!0,get(){return this.$props[o]()},set(a){this.$props[o].set(a)}});if(p[m])for(let o of p[m])Object.defineProperty(c,o,{enumerable:!0,configurable:!0,get(){return this.$[o]},set(a){this.$[o]=a}});if(p[_])for(let o of p[_])c[o]=function(...a){return this.$[o](...a)}}function U(){if(this[h]!==0)return;this[h]=1;let t=B(this),e=t&&window.customElements.get(t.localName),c=t&&t[h]===2;if(t&&(!e||!c)){R.call(this,t);return}N.call(this,t)}async function R(t){await window.customElements.whenDefined(t.localName),t[h]!==2&&await new Promise(e=>(t[f]??=[]).push(e)),N.call(this,t)}function N(t){if(this.isConnected){if(t){t.keepAlive&&t.forwardKeepAlive&&(this.keepAlive=!0,this.setAttribute("keep-alive",""));let e=this.$.$$._scope;e&&t.$.$$._attachScope.append(e)}this[k]()}}function B(t){let e=t.parentNode,c=t.localName.split("-",1)[0]+"-";for(;e;){if(e.nodeType===1&&e.localName.startsWith(c))return e;e=e.parentNode}return null}function H(t,e=!1){(e||!window.customElements.get(t.tagName))&&window.customElements.define(t.tagName,t)}export{w as a,F as b,H as c};