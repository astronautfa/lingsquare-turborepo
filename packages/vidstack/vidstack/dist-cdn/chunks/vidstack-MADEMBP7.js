import{j as m,q as u}from"./vidstack-6254FMD7.js";var o=class{#e;get length(){return this.#e.length}constructor(e,t){u(e)?this.#e=e:!m(e)&&!m(t)?this.#e=[[e,t]]:this.#e=[]}start(e){return this.#e[e][0]??1/0}end(e){return this.#e[e][1]??1/0}};function l(n){if(!n.length)return null;let e=n.start(0);for(let t=1;t<n.length;t++){let r=n.start(t);r<e&&(e=r)}return e}function _(n){if(!n.length)return null;let e=n.end(0);for(let t=1;t<n.length;t++){let r=n.end(t);r>e&&(e=r)}return e}function s(n){if(n.length<=1)return n;n.sort((r,i)=>r[0]-i[0]);let e=[],t=n[0];for(let r=1;r<n.length;r++){let i=n[r];t[1]>=i[0]-1?t=[t[0],Math.max(t[1],i[1])]:(e.push(t),t=i)}return e.push(t),e}function g(n,e,t){let r=e[0],i=e[1];return t<r?[t,-1]:t===r?e:r===-1?(e[0]=t,e):(t>r&&(e[1]=t,i===-1&&n.push(e)),s(n),e)}export{o as a,l as b,_ as c,s as d,g as e};
