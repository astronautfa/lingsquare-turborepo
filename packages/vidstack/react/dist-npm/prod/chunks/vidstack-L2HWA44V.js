import{m as i,p as t}from"./vidstack-7GZB5QIO.js";var s=class{#i;#t;constructor(n){this.#t=n}start(){i(this.#i)&&this.#s()}stop(){t(this.#i)&&window.cancelAnimationFrame(this.#i),this.#i=void 0}#s(){this.#i=window.requestAnimationFrame(()=>{i(this.#i)||(this.#t(),this.#s())})}};export{s as a};
