import{B as r,D as E,H as g,I as h,J as o,K as b,d,e as m,s as p}from"./vidstack-DK4Y24W7.js";import{autoUpdate as L,computePosition as R,flip as C,shift as H}from"@floating-ui/dom";function N(e,t,n){if(e)return r(e,t,n)}function j(e,t){let n=t.composedPath()[0];return h(n)&&e.contains(n)}var x=new Set;function _(e){return x.add(e),()=>x.delete(e)}function q(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n)}function B(e,t){if(e.hasAttribute("aria-label")||e.hasAttribute("data-no-label"))return;if(!p(t)){o(e,"aria-label",t);return}function n(){o(e,"aria-label",t())}n()}function A(e){let t=getComputedStyle(e);return t.display!=="none"&&parseInt(t.opacity)>0}function k(e){return!!e&&("checkVisibility"in e?e.checkVisibility({checkOpacity:!0,checkVisibilityCSS:!0}):A(e))}function K(e,t){return _(()=>t(k(e)))}function X(e,t,n){for(;t;){if(t===e)return!0;if(n?.(t))break;t=t.parentElement}return!1}function Y(e,t){r(e,"pointerup",n=>{n.button===0&&!n.defaultPrevented&&t(n)}),r(e,"keydown",n=>{g(n)&&t(n)})}function z(e){return E(e)&&(e.touches.length>1||e.changedTouches.length>1)}function U(e){return e()}function W(e,t,n,{offsetVarName:s,xOffset:l,yOffset:a,...u}){if(!e)return;let T=n.replace(" ","-").replace("-center","");if(b(e,"visibility",t?null:"hidden"),!t)return;let c=n.includes("top"),v=i=>n.includes("left")?`calc(-1 * ${i})`:i,y=i=>c?`calc(-1 * ${i})`:i;return L(t,e,()=>{R(t,e,{placement:T,middleware:[...u.middleware??[],C({fallbackAxisSideDirection:"start",crossAxis:!1}),H()],...u}).then(({x:i,y:S,middlewareData:M})=>{let f=!!M.flip?.index;c=n.includes(f?"bottom":"top"),e.setAttribute("data-placement",f?n.startsWith("top")?n.replace("top","bottom"):n.replace("bottom","top"):n),Object.assign(e.style,{top:`calc(${S+"px"} + ${y(a?a+"px":`var(--${s}-y-offset, 0px)`)})`,left:`calc(${i+"px"} + ${v(l?l+"px":`var(--${s}-x-offset, 0px)`)})`})})})}function G(e){return getComputedStyle(e).animationName!=="none"}function Q(e){return e instanceof HTMLElement}export{N as a,j as b,q as c,B as d,A as e,K as f,X as g,Y as h,z as i,U as j,W as k,G as l,Q as m};
