import{a as c}from"./vidstack-GIOYWYZF.js";import{B as r,a as i,h as a,q as n,u as o}from"./vidstack-DK4Y24W7.js";var g=class{#t;src=a("");referrerPolicy=null;get iframe(){return this.#t}constructor(t){this.#t=t,t.setAttribute("frameBorder","0"),t.setAttribute("aria-hidden","true"),t.setAttribute("allow","autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"),this.referrerPolicy!==null&&t.setAttribute("referrerpolicy",this.referrerPolicy)}setup(){r(window,"message",this.#s.bind(this)),r(this.#t,"load",this.onLoad.bind(this)),o(this.#e.bind(this))}#e(){let t=this.src();if(!t.length){this.#t.setAttribute("src","");return}let e=i(()=>this.buildParams());this.#t.setAttribute("src",c(t,e))}postMessage(t,e){}#s(t){let e=this.getOrigin();if((t.source===null||t.source===this.#t?.contentWindow)&&(!n(e)||e===t.origin)){try{let s=JSON.parse(t.data);s&&this.onMessage(s,t);return}catch{}t.data&&this.onMessage(t.data,t)}}};export{g as a};