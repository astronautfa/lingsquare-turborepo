import{N as a}from"./vidstack-N64GZPYM.js";import{B as o,da as u,ia as i,u as c}from"./vidstack-DK4Y24W7.js";import*as r from"react";function E(e,t){r.useEffect(()=>{if(!e||!t)return;let n=t.split(" ");for(let s of n)e.classList.add(s);return()=>{for(let s of n)e.classList.remove(s)}},[e,t])}function R(e,t){r.useEffect(()=>{if(!e)return;t();let n=new ResizeObserver(i(t));return n.observe(e),()=>n.disconnect()},[e,t])}function v(e){let[t,n]=r.useState(!1);return r.useEffect(()=>{if(!e)return;let s=u();return s.add(o(e,"transitionstart",()=>n(!0)),o(e,"transitionend",()=>n(!1))),()=>s.empty()},[e]),t}function l(e){let[t,n]=r.useState(!1);return r.useEffect(()=>{if(!e)return;let s=u();return s.add(o(e,"mouseenter",()=>n(!0)),o(e,"mouseleave",()=>n(!1))),()=>s.empty()},[e]),t}function m(e){let[t,n]=r.useState(!1);return r.useEffect(()=>{if(!e)return;let s=u();return s.add(o(e,"focusin",()=>n(!0)),o(e,"focusout",()=>n(!1))),()=>s.empty()},[e]),t}function h(e){let t=l(e),n=m(e),s=r.useRef(!1);return s.current&&!t?!1:(s.current=t,t||n)}function g(){let[e,t]=r.useState("dark");return r.useEffect(()=>{let n=window.matchMedia("(prefers-color-scheme: light)");function s(){t(n.matches?"light":"dark")}return s(),o(n,"change",s)},[]),e}import*as f from"react";function M(e){let t=a();f.useEffect(()=>{if(t)return c(()=>{let n=t.$el;return n?.setAttribute("data-layout",e),()=>n?.removeAttribute("data-layout")})},[t])}export{E as a,R as b,v as c,h as d,g as e,M as f};
