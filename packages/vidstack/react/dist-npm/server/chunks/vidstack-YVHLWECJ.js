import*as a from"react";var y=typeof document>"u",b=Symbol(0),L=!1,G=!1,g=null,R=null,$=null,d=0,O=[],ot={},Vt=()=>{},P=0,Ct=1,_=2,K=3;function Ht(){L=!0,queueMicrotask(xt)}function xt(){if(!O.length){L=!1;return}G=!0;for(let t=0;t<O.length;t++)O[t].$st!==P&&Wt(O[t]);O=[],L=!1,G=!1}function Wt(t){let e=[t];for(;t=t[b];)t.$e&&t.$st!==P&&e.push(t);for(let n=e.length-1;n>=0;n--)pt(e[n])}function Ut(t){let e=M();return j(e,t.length?t.bind(null,T.bind(e)):t,null)}function Ce(t){return j(g,t,null)}function Bt(t){return j(null,t,null)}function Qt(){G||xt()}function Nt(){return g}function E(t,e){try{return j(e,t,null)}catch(n){ut(e,n);return}}function ct(t,e=g){return e?.$cx[t]}function Jt(t,e,n=g){n&&(n.$cx={...n.$cx,[t]:e})}function z(t){if(!t||!g)return t||Vt;let e=g;return e.$d?Array.isArray(e.$d)?e.$d.push(t):e.$d=[e.$d,t]:e.$d=t,function(){e.$st!==K&&(t.call(null),V(e.$d)?e.$d=null:Array.isArray(e.$d)&&e.$d.splice(e.$d.indexOf(t),1))}}function T(t=!0){if(this.$st!==K){if(this.$h)if(Array.isArray(this.$h))for(let e=this.$h.length-1;e>=0;e--)T.call(this.$h[e]);else T.call(this.$h);if(t){let e=this[b];e&&(Array.isArray(e.$h)?e.$h.splice(e.$h.indexOf(this),1):e.$h=null),Gt(this)}}}function Gt(t){t.$st=K,t.$d&&Dt(t),t.$s&&Y(t,0),t[b]=null,t.$s=null,t.$o=null,t.$h=null,t.$cx=ot,t.$eh=null}function Dt(t){try{if(Array.isArray(t.$d))for(let e=t.$d.length-1;e>=0;e--){let n=t.$d[e];n.call(n)}else t.$d.call(t.$d);t.$d=null}catch(e){ut(t,e)}}function j(t,e,n){let r=g,s=R;g=t,R=n;try{return e.call(t)}finally{g=r,R=s}}function ut(t,e){if(!t||!t.$eh)throw e;let n=0,r=t.$eh.length,s=e;for(n=0;n<r;n++)try{t.$eh[n](s);break}catch(u){s=u}if(n===r)throw s}function at(){return this.$st===K?this.$v:(R&&!this.$e&&(!$&&R.$s&&R.$s[d]==this?d++:$?$.push(this):$=[this]),this.$c&&pt(this),this.$v)}function Zt(t){let e=V(t)?t(this.$v):t;if(this.$ch(this.$v,e)&&(this.$v=e,this.$o))for(let n=0;n<this.$o.length;n++)Lt(this.$o[n],_);return this.$v}var lt=function(){this[b]=null,this.$h=null,g&&g.append(this)},A=lt.prototype;A.$cx=ot;A.$eh=null;A.$c=null;A.$d=null;A.append=function(t){t[b]=this,this.$h?Array.isArray(this.$h)?this.$h.push(t):this.$h=[this.$h,t]:this.$h=t,t.$cx=t.$cx===ot?this.$cx:{...this.$cx,...t.$cx},this.$eh&&(t.$eh=t.$eh?[...t.$eh,...this.$eh]:this.$eh)};A.dispose=function(){T.call(this)};function M(){return new lt}var jt=function(e,n,r){lt.call(this),this.$st=n?_:P,this.$i=!1,this.$e=!1,this.$s=null,this.$o=null,this.$v=e,n&&(this.$c=n),r&&r.dirty&&(this.$ch=r.dirty)},ft=jt.prototype;Object.setPrototypeOf(ft,A);ft.$ch=Yt;ft.call=at;function ht(t,e,n){return new jt(t,e,n)}function Yt(t,e){return t!==e}function V(t){return typeof t=="function"}function pt(t){if(t.$st===Ct)for(let e=0;e<t.$s.length&&(pt(t.$s[e]),t.$st!==_);e++);t.$st===_?Ft(t):t.$st=P}function Xt(t){t.$h&&T.call(t,!1),t.$d&&Dt(t),t.$eh=t[b]?t[b].$eh:null}function Ft(t){let e=$,n=d;$=null,d=0;try{Xt(t);let r=j(t,t.$c,t);yt(t),!t.$e&&t.$i?Zt.call(t,r):(t.$v=r,t.$i=!0)}catch(r){yt(t),ut(t,r)}finally{$=e,d=n,t.$st=P}}function yt(t){if($){if(t.$s&&Y(t,d),t.$s&&d>0){t.$s.length=d+$.length;for(let n=0;n<$.length;n++)t.$s[d+n]=$[n]}else t.$s=$;let e;for(let n=d;n<t.$s.length;n++)e=t.$s[n],e.$o?e.$o.push(t):e.$o=[t]}else t.$s&&d<t.$s.length&&(Y(t,d),t.$s.length=d)}function Lt(t,e){if(!(t.$st>=e)&&(t.$e&&t.$st===P&&(O.push(t),L||Ht()),t.$st=e,t.$o))for(let n=0;n<t.$o.length;n++)Lt(t.$o[n],Ct)}function Y(t,e){let n,r;for(let s=e;s<t.$s.length;s++)n=t.$s[s],n.$o&&(r=n.$o.indexOf(t),n.$o[r]=n.$o[n.$o.length-1],n.$o.pop())}function H(t,e){let n=ht(t,null,e),r=at.bind(n);return r[b]=!0,r.set=Zt.bind(n),r}function te(t){return V(t)&&b in t}function ee(t,e){let n=ht(e?.initial,t,e),r=at.bind(n);return r[b]=!0,r}function dt(t,e){let n=ht(null,function(){let s=t();return V(s)&&z(s),null},void 0);return n.$e=!0,Ft(n),T.bind(n,!0)}function xe(t){return te(t)&&"set"in t}function S(...t){}function ne(t){return t===null}function C(t){return typeof t>"u"}function Ne(t){return ne(t)||C(t)}function De(t){return t?.constructor===Object}function Ze(t){return typeof t=="number"&&!Number.isNaN(t)}function je(t){return typeof t=="string"}function Fe(t){return typeof t=="boolean"}function Z(t){return typeof t=="function"}function bt(t){return Array.isArray(t)}var q=y?re:dt;function re(t,e){return typeof process<"u"&&process.env?.NODE_ENV==="test"?dt(t):S}var wt,ie=y?class{}:Event,_t=Symbol("DOM_EVENT"),I=class extends ie{constructor(e,...n){super(e,n[0]),this[wt]=!0,this.triggers=new X,this.detail=n[0]?.detail;let r=n[0]?.trigger;r&&this.triggers.add(r)}get trigger(){return this.triggers.source}get originEvent(){return this.triggers.origin}get isOriginTrusted(){return this.triggers.origin?.isTrusted??!1}};wt=_t;var X=class{constructor(){this.chain=[]}get source(){return this.chain[0]}get origin(){return this.chain[this.chain.length-1]}add(e){this.chain.push(e),$t(e)&&this.chain.push(...e.triggers)}remove(e){return this.chain.splice(this.chain.indexOf(e),1)[0]}has(e){return this.chain.some(n=>n===e)}hasType(e){return!!this.findType(e)}findType(e){return this.chain.find(n=>n.type===e)}walk(e){for(let n of this.chain){let r=e(n);if(r)return[n,r]}}[Symbol.iterator](){return this.chain.values()}};function $t(t){return!!t?.[_t]}function _e(t,e){if($t(t))return t.triggers.walk(e)}function se(t,e){return $t(t)?t.triggers.findType(e):void 0}function Me(t,e){return!!se(t,e)}function qe(t,e){e&&t.triggers.add(e)}var Et=class extends EventTarget{addEventListener(e,n,r){return super.addEventListener(e,n,r)}removeEventListener(e,n,r){return super.removeEventListener(e,n,r)}};function oe(t,e,n,r){return y?S:(t.addEventListener(e,n,r),z(()=>t.removeEventListener(e,n,r)))}function Ie(t){return!!t?.type.startsWith("pointer")}function Ke(t){return!!t?.type.startsWith("touch")}function ze(t){return/^(click|mouse)/.test(t?.type??"")}function Mt(t){return!!t?.type.startsWith("key")}function Ve(t){return Mt(t)&&t.key==="Enter"}function He(t){return Mt(t)&&(t.key==="Enter"||t.key===" ")}function We(t){return t instanceof Node}function B(t,e,n){if(t)if(!n&&n!==""&&n!==0)t.removeAttribute(e);else{let r=n===!0?"":n+"";t.getAttribute(e)!==r&&t.setAttribute(e,r)}else return}function Q(t,e,n){if(t)!n&&n!==0?t.style.removeProperty(e):t.style.setProperty(e,n+"");else return}function Ue(t,e,n){t.classList[n?"add":"remove"](e)}function vt(t){let e=t;for(;typeof e=="function";)e=e.call(this);return e}function Be(t){return{id:Symbol(),provide:t}}function qt(t,e,n=Nt()){let r=!C(e);Jt(t.id,r?e:t.provide?.(),n)}function ce(t){return ct(t.id)}function Qe(t){return!C(ct(t.id))}var W=Symbol(0),St,J={},tt=class{constructor(e,n,r){this[St]=null,this.$el=H(null),this.a=null,this.d=null,this.f=null,this.g=null,this.e=null,this.o=!1,this.i=J,this.b=null,this.c=null,this.l=[],this.m=[],this.j=[],this.n=[],this.d=n,r?.scope&&r.scope.append(n);let s=e.state,u=e.props;if(s&&(this.h=s.create(),this.k=new Proxy(this.h,{get:(c,o)=>this.h[o]()}),qt(s,this.h)),u&&(this.i=ue(u),r?.props))for(let c of Object.keys(r.props))this.i[c]?.set(r.props[c]);z(this.p.bind(this))}w(){E(()=>{for(let e of this.l)e()},this.d)}x(e){this.a||(this.a=e,this.$el.set(e),E(()=>{this.f=M(),E(()=>{for(let n of this.m)n(this.a);this.q(),this.r()},this.f)},this.d),e.dispatchEvent(new Event("attached")))}s(){this.f?.dispose(),this.f=null,this.g=null,this.a=null,this.$el.set(null)}y(){!this.a||!this.f||!this.j.length||E(()=>{this.g=M(),E(()=>{for(let e of this.j)e(this.a)},this.g)},this.f)}z(){this.g?.dispose(),this.g=null}p(){if(this.o)return;this.o=!0,E(()=>{for(let n of this.n)n(this.a)},this.d);let e=this.a;this.s(),this.d.dispose(),this.l.length=0,this.m.length=0,this.j.length=0,this.n.length=0,this.e=null,this.b=null,this.c=null,this.i=J,this.d=null,this.k=J,this.h=null,e&&delete e.$}t(e){e.onSetup&&this.l.push(e.onSetup.bind(e)),e.onAttach&&this.m.push(e.onAttach.bind(e)),e.onConnect&&this.j.push(e.onConnect.bind(e)),e.onDestroy&&this.n.push(e.onDestroy.bind(e))}q(){if(this.b)for(let e of Object.keys(this.b))y?B(this.a,e,vt.call(this.e,this.b[e])):Z(this.b[e])?q(this.u.bind(this,e)):B(this.a,e,this.b[e])}r(){if(this.c)for(let e of Object.keys(this.c))y?Q(this.a,e,vt.call(this.e,this.c[e])):Z(this.c[e])?q(this.v.bind(this,e)):Q(this.a,e,this.c[e])}u(e){B(this.a,e,this.b[e].call(this.e))}v(e){Q(this.a,e,this.c[e].call(this.e))}};St=W;function ue(t){let e={};for(let n of Object.keys(t)){let r=t[n];e[n]=H(r,r)}return e}var D={$$:null};function It(t,e){return Ut(()=>{D.$$=new tt(t,Nt(),e);let n=new t;return D.$$.e=n,D.$$=null,n})}var et=class extends EventTarget{constructor(){super(),D.$$&&this.attach(D)}get el(){return this.$$.a}get $el(){return this.$$.$el()}get scope(){return this.$$.d}get attachScope(){return this.$$.f}get connectScope(){return this.$$.g}get $props(){return this.$$.i}get $state(){return this.$$.h}get state(){return this.$$.k}attach({$$:e}){return this.$$=e,e.t(this),this}addEventListener(e,n,r){this.listen(e,n,r)}removeEventListener(e,n,r){this.el?.removeEventListener(e,n,r)}setAttributes(e){this.$$.b||(this.$$.b={}),Object.assign(this.$$.b,e)}setStyles(e){this.$$.c||(this.$$.c={}),Object.assign(this.$$.c,e)}setCSSVars(e){this.setStyles(e)}createEvent(e,...n){return new I(e,n[0])}dispatch(e,...n){if(y||!this.el)return!1;let r=e instanceof Event?e:new I(e,n[0]);return Object.defineProperty(r,"target",{get:()=>this.$$.e}),Bt(()=>(this.$$[W]?.(r),this.el.dispatchEvent(r)))}dispatchEvent(e){return this.dispatch(e)}listen(e,n,r){return y||!this.el?S:oe(this.el,e,n,r)}},At=class extends et{subscribe(e){return E(()=>q(()=>e(this.state)),this.$$.d)}destroy(){this.$$.p()}};var kt=class{constructor(e){this.id=Symbol(0),this.record=e,this.A=Object.getOwnPropertyDescriptors(e)}create(){let e={},n=new Proxy(e,{get:(r,s)=>e[s]()});for(let r of Object.keys(this.record)){let s=this.A[r].get;e[r]=s?ee(s.bind(n)):H(this.record[r])}return e}reset(e,n){for(let r of Object.keys(e))!this.A[r].get&&(!n||n(r))&&e[r].set(this.record[r])}};function Je(t){return ce(t)}function ae(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function le(t){return t.replace(/-./g,e=>e[1].toUpperCase())}function fe(t){return he(t).replace(/\s/g,"")}function he(t){return pe(t.replace(/-./g,e=>" "+e[1].toUpperCase()))}function pe(t){return t.charAt(0).toUpperCase()+t.slice(1)}var x=a.createContext({current:null});x.displayName="Scope";function mt(t,...e){return a.createElement(x.Provider,{value:t},...e)}function de(){return a.useContext(x).current}function $e(t){let e=de();return a.useMemo(()=>ct(t.id,e),[e])}var gt=class gt extends a.Component{constructor(e,n){super(e),this.d={current:M()},n&&n.append(this.d.current);let r=this.constructor;r.F&&qt(r.F,r.T?.(),this.d.current)}render(){return mt(this.d,this.props?.children)}};gt.contextType=x;var Ot=gt;function Kt(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function Ge(...t){return e=>t.forEach(n=>Kt(n,e))}function me(t,e){let n=a.forwardRef((r,s)=>{let u=a.useContext(x),c=a.useRef(null),o=a.useRef();if(!o.current){let i=ye(),p=Pt(t,i,r,u.current);i.e=p,o.current=i,c.current=p.scope}function l(){let i=o.current,p=u.current;if(window.cancelAnimationFrame(i.ea),i.ea=-1,i.e.$$.o){let w=Pt(t,i,r,p);i.e=w,i.Q=!1,i.da=!1,c.current=w.scope}return i.a&&Tt(i,i.a),i.da||(Kt(s,i.e),i.da=!0),()=>F(i)}function m(i){let p=o.current;if(!p.da){p.a=i;return}window.cancelAnimationFrame(p.K),p.K=window.requestAnimationFrame(()=>{let w=o.current;w.K=-1,w.a!==i&&(F(w),i&&Tt(w,i),w.a=i)})}a.useEffect(()=>{let i=o.current;return window.cancelAnimationFrame(i.ea),i.ea=-1,function(){Z(r.children)&&(window.cancelAnimationFrame(i.K),i.K=-1,window.cancelAnimationFrame(i.E),i.E=-1,window.cancelAnimationFrame(i.ea),i.ea=window.requestAnimationFrame(()=>{i.ea=-1,F(i),i.e.$$.p(),i.e.$$[W]=null,i.J={},i._={},c.current=null}))}},[]),a.useEffect(Qt);let f=o.current,{children:v,...h}=r,k={},N=f.aa,U=Object.keys(h);f.J={};for(let i of[...N,...U])if(e.props.has(i))f.e.$props[i].set(C(h[i])?t.props?.[i]:h[i]);else if(e.events?.has(i)||e.eventsRE?.test(i))f.J[i]=h[i];else if(e.domEvents?.has(i)||e.domEventsRE?.test(i)){let p=ae(i.slice(2));f._[p]=h[i],U.includes(i)?f.a&&!f.ca?.has(p)&&(f.ca||(f.ca=new Set),f.ca.add(p),f.a.addEventListener(p,f.ba)):(f.a?.removeEventListener(p,f.ba),f.ca?.delete(p))}else k[i]=h[i];return f.aa=U,mt(c,a.createElement(ge,{effect:l}),Z(v)?v?.({...k,suppressHydrationWarning:!0,ref:m},f.e):v)});return n.displayName=t.name+"Bridge",n}function ge({effect:t}){return a.useEffect(t,[]),null}var Rt=new Map;function ye(){let t={a:null,aa:[],J:{},_:{},K:-1,E:-1,ea:-1,Q:!1,da:!1,ca:null,ba(e){let n=C(e.detail)?[e]:[e.detail,e];t._[e.type]?.(...n)}};return t}function Tt(t,e){if(!(t.a===e&&t.Q)){if(t.Q&&F(t),t._){t.ca||(t.ca=new Set);for(let n of Object.keys(t._))t.ca.has(n)||(e.addEventListener(n,t.ba),t.ca.add(n))}t.e.$$.x(e),t.E=window.requestAnimationFrame(()=>{t.e.$$.y(),t.E=-1}),t.Q=!0}}function F(t){if(t.Q&&(window.cancelAnimationFrame(t.E),t.E=-1,t.e.$$.s(),t.Q=!1,t.a&&t.ca)){for(let e of t.ca)t.a.removeEventListener(e,t.ba);t.ca.clear()}}function be(t){let e=Rt.get(t.type),n=C(t.detail)?[t]:[t.detail,t];e||Rt.set(t.type,e=`on${fe(t.type)}`),this.J[e]?.(...n)}function Pt(t,e,n,r){let s=It(t,{props:n,scope:r});return s.$$[W]=be.bind(e),s.$$.w(),s}function zt(t,e=!1){let n=typeof t;if(n!=="string")return!e&&n==="function"?zt(t()):e&&n==="boolean"?t+"":t;let r=e?'"':"<",s=e?"&quot;":"&lt;",u=t.indexOf(r),c=t.indexOf("&");if(u<0&&c<0)return t;let o=0,l="";for(;u>=0&&c>=0;)u<c?(o<u&&(l+=t.substring(o,u)),l+=s,o=u+1,u=t.indexOf(r,o)):(o<c&&(l+=t.substring(o,c)),l+="&amp;",o=c+1,c=t.indexOf("&",o));if(u>=0)do o<u&&(l+=t.substring(o,u)),l+=s,o=u+1,u=t.indexOf(r,o);while(u>=0);else for(;c>=0;)o<c&&(l+=t.substring(o,c)),l+="&amp;",o=c+1,c=t.indexOf("&",o);return o<t.length?l+t.substring(o):l}var we=Symbol(0),Ee=/\s+/;function ve(t,e){let n=e.trim().split(Ee);for(let r of n)t.add(r)}var Se=/\s*:\s*/,Ae=/\s*;\s*/;function ke(t,e){let n=e.trim().split(Ae);for(let r=0;r<n.length;r++){if(n[r]==="")continue;let[s,u]=n[r].split(Se);t.set(s,u)}}var nt=class{constructor(e){this.keepAlive=!1,this.forwardKeepAlive=!0,this.attributes=new rt,this.style=new it,this.classList=new st,this.$=e}get $props(){return this.$.$$.i}get $state(){return this.$.$$.h}get state(){return this.$.state}setup(){let e=this.$.$$;E(()=>{this.hasAttribute("class")&&ve(this.classList.tokens,this.getAttribute("class")),this.hasAttribute("style")&&ke(this.style.tokens,this.getAttribute("style")),e.w(),e.x(this),this.classList.length>0&&this.setAttribute("class",this.classList.toString()),this.style.length>0&&this.setAttribute("style",this.style.toString()),this.keepAlive&&this.setAttribute("keep-alive","")},e.d)}getAttribute(e){return this.attributes.getAttribute(e)}setAttribute(e,n){this.attributes.setAttribute(e,n)}hasAttribute(e){return this.attributes.hasAttribute(e)}removeAttribute(e){return this.attributes.removeAttribute(e)}[we](){}addEventListener(){}removeEventListener(){}dispatchEvent(){return!1}subscribe(){return S}destroy(){this.$.destroy()}},rt=class{constructor(){this.Z=new Map}get length(){return this.Z.size}get tokens(){return this.Z}getAttribute(e){return this.Z.get(e)??null}hasAttribute(e){return this.Z.has(e)}setAttribute(e,n){this.Z.set(e,n+"")}removeAttribute(e){this.Z.delete(e)}toString(){if(this.Z.size===0)return"";let e="";for(let[n,r]of this.Z)e+=` ${n}="${zt(r,!0)}"`;return e}},it=class{constructor(){this.Z=new Map}get length(){return this.Z.size}get tokens(){return this.Z}getPropertyValue(e){return this.Z.get(e)??""}setProperty(e,n){this.Z.set(e,n??"")}removeProperty(e){let n=this.Z.get(e);return this.Z.delete(e),n??""}toString(){if(this.Z.size===0)return"";let e="";for(let[n,r]of this.Z)e+=`${n}: ${r};`;return e}},st=class{constructor(){this.Z=new Set}get length(){return this.Z.size}get tokens(){return this.Z}add(...e){for(let n of e)this.Z.add(n)}contains(e){return this.Z.has(e)}remove(e){this.Z.delete(e)}replace(e,n){return this.Z.has(e)?(this.Z.delete(e),this.Z.add(n),!0):!1}toggle(e,n){return n!==!0&&(this.Z.has(e)||n===!1)?(this.Z.delete(e),!1):(this.Z.add(e),!0)}toString(){return Array.from(this.Z).join(" ")}},Oe={acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",allowfullscreen:"allowFullScreen",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",cellpadding:"cellPadding",cellspacing:"cellSpacing",charset:"charSet",class:"className",classid:"classID",classname:"className",colspan:"colSpan",contenteditable:"contentEditable",contextmenu:"contextMenu",controlslist:"controlsList",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",datetime:"dateTime",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",enctype:"encType",enterkeyhint:"enterKeyHint",fetchpriority:"fetchPriority",for:"htmlFor",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",innerhtml:"innerHTML",inputmode:"inputMode",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",marginwidth:"marginWidth",marginheight:"marginHeight",maxlength:"maxLength",mediagroup:"mediaGroup",minlength:"minLength",nomodule:"noModule",novalidate:"noValidate",playsinline:"playsInline",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rowspan:"rowSpan",spellcheck:"spellCheck",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",tabindex:"tabIndex",usemap:"useMap"};function Re(t,e){function n(r){let s=a.useContext(x),u=It(t,{props:r,scope:s.current}),c=new nt(u),o={},{style:l={},children:m,forwardRef:f,...v}=r;if(e.props.size)for(let h of Object.keys(v))e.props.has(h)||(o[h]=v[h]);else o=v;if(c.setup(),c.hasAttribute("style")){for(let[h,k]of c.style.tokens)l[h.startsWith("--")?h:le(h)]=k;c.removeAttribute("style")}for(let[h,k]of c.attributes.tokens){let N=Oe[h];N&&(N in o||(o[N]=k),c.removeAttribute(h))}return mt({current:u.$$.d},Z(m)?m?.({...Object.fromEntries(c.attributes.tokens),...o,style:l},u):m,a.createElement(()=>(c.destroy(),null)))}return n.displayName=t.name+"Bridge",n}function Ye(t){return $e(t)}function Xe(t,e){let[,n]=a.useState();return a.useEffect(()=>dt(()=>{t(),n({})}),[e??t]),t()}function tn(t){return t?"true":"false"}function Te(){let t=new Set;return{add(...e){for(let n of e)t.add(n)},empty(){for(let e of t)e();t.clear()}}}function en(){let t=Te();return z(t.empty),t}function nn(t){return Object.keys(t)}function rn(){let t,e;return{promise:new Promise((r,s)=>{t=r,e=s}),resolve:t,reject:e}}function sn(t){return new Promise(e=>setTimeout(e,t))}function on(t){if(y)return S;let e=-1,n;function r(...s){n=s,!(e>=0)&&(e=window.requestAnimationFrame(()=>{t.apply(this,n),e=-1,n=void 0}))}return r}var Pe=y?S:typeof window<"u"?"requestIdleCallback"in window?window.requestIdleCallback:t=>window.setTimeout(t,1):S;function cn(t,e){return y?Promise.resolve():new Promise(n=>{Pe(r=>{t?.(r),n()},e)})}function un(t){let[,e]=a.useState(),n=a.useRef(null);return n.current==null&&(n.current={state:{},$update:H({}),props:new Set}),a.useEffect(()=>{let{state:r,$update:s,props:u}=n.current;return q(()=>{for(let c of u){let o=t[c]();r[c]=bt(o)?[...o]:o}s(),e({})})},[t]),a.useMemo(()=>{let{state:r,$update:s,props:u}=n.current,c=!1;return u.clear(),new Proxy(r,{get(o,l){if(!u.has(l)&&l in t){u.add(l);let m=t[l]();r[l]=bt(m)?[...m]:m,c||(s.set({}),c=!0,queueMicrotask(()=>c=!1))}return r[l]},set(o,l,m){return l in t||(r[l]=m),!0}})},[t])}function an(t,e){return y?Re(t,{props:new Set(Object.keys(t.props||{}))}):me(t,{props:new Set(Object.keys(t.props||{})),events:new Set(e?.events),eventsRE:e?.eventsRegex,domEvents:e?.domEvents,domEventsRE:e?.domEventsRegex})}export{Ce as a,Bt as b,Qt as c,Nt as d,E as e,z as f,M as g,H as h,ee as i,xe as j,S as k,ne as l,C as m,Ne as n,De as o,Ze as p,je as q,Fe as r,Z as s,bt as t,q as u,I as v,_e as w,se as x,Me as y,qe as z,Et as A,oe as B,Ie as C,Ke as D,ze as E,Mt as F,Ve as G,He as H,We as I,B as J,Q as K,Ue as L,Be as M,qt as N,ce as O,Qe as P,et as Q,At as R,kt as S,Je as T,ae as U,le as V,pe as W,de as X,$e as Y,Ge as Z,Ye as _,Xe as $,tn as aa,Te as ba,en as ca,nn as da,rn as ea,sn as fa,on as ga,cn as ha,un as ia,an as ja};
