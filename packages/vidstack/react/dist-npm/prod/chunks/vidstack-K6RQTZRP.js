import{B as r,D as x,H as T,I as v,J as s,K as b,d as p,e as E,ka as o,s as g,u as h}from"./vidstack-7GZB5QIO.js";import{autoUpdate as H,computePosition as R,flip as _,shift as A}from"@floating-ui/dom";function K(e,t,n){if(e)return r(e,t,n)}function X(e,t){let n=t.composedPath()[0];return v(n)&&e.contains(n)}var l=new Set;if(!o){let e=function(){for(let t of l)try{t()}catch{}window.requestAnimationFrame(e)};$=e,e()}var $;function k(e){return l.add(e),()=>l.delete(e)}function Y(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}function z(e,t){if(e.hasAttribute("aria-label")||e.hasAttribute("data-no-label"))return;if(!g(t)){s(e,"aria-label",t);return}function n(){s(e,"aria-label",t())}o?n():h(n)}function P(e){let t=getComputedStyle(e);return t.display!=="none"&&parseInt(t.opacity)>0}function w(e){return!!e&&("checkVisibility"in e?e.checkVisibility({checkOpacity:!0,checkVisibilityCSS:!0}):P(e))}function J(e,t){return k(()=>t(w(e)))}function U(e,t,n){for(;t;){if(t===e)return!0;if(n?.(t))break;t=t.parentElement}return!1}function W(e,t){r(e,"pointerup",n=>{n.button===0&&!n.defaultPrevented&&t(n)}),r(e,"keydown",n=>{T(n)&&t(n)})}function G(e){return x(e)&&(e.touches.length>1||e.changedTouches.length>1)}function Q(e){if(o)return e();let t=p(),n=window.requestAnimationFrame(()=>{E(e,t),n=-1});return()=>void window.cancelAnimationFrame(n)}function Z(e,t,n,{offsetVarName:a,xOffset:u,yOffset:c,...f}){if(!e)return;let y=n.replace(" ","-").replace("-center","");if(b(e,"visibility",t?null:"hidden"),!t)return;let m=n.includes("top"),S=i=>n.includes("left")?`calc(-1 * ${i})`:i,M=i=>m?`calc(-1 * ${i})`:i;return H(t,e,()=>{R(t,e,{placement:y,middleware:[...f.middleware??[],_({fallbackAxisSideDirection:"start",crossAxis:!1}),A()],...f}).then(({x:i,y:L,middlewareData:C})=>{let d=!!C.flip?.index;m=n.includes(d?"bottom":"top"),e.setAttribute("data-placement",d?n.startsWith("top")?n.replace("top","bottom"):n.replace("bottom","top"):n),Object.assign(e.style,{top:`calc(${L+"px"} + ${M(c?c+"px":`var(--${a}-y-offset, 0px)`)})`,left:`calc(${i+"px"} + ${S(u?u+"px":`var(--${a}-x-offset, 0px)`)})`})})})}function ee(e){return getComputedStyle(e).animationName!=="none"}function te(e){return e instanceof HTMLElement}export{K as a,X as b,Y as c,z as d,P as e,J as f,U as g,W as h,G as i,Q as j,Z as k,ee as l,te as m};