import{I as a,L as s,x as o}from"./vidstack-XC7WIXLW.js";var r=class{#t;#i;#o;#e=a(!1);get supported(){return this.#e()}constructor(e,t){this.#t=e,this.#i=t,this.#r()}#r(){!this.#t?.remote||!this.canPrompt||(this.#t.remote.watchAvailability(e=>{this.#e.set(e)}).catch(()=>{this.#e.set(!1)}),s(this.#a.bind(this)))}#a(){if(!this.#e())return;let e=["connecting","connect","disconnect"],t=this.#s.bind(this);t(),o(this.#t,"playing",t);for(let i of e)o(this.#t.remote,i,t)}async prompt(){if(!this.supported)throw Error("Not supported on this platform.");return this.type==="airplay"&&this.#t.webkitShowPlaybackTargetPicker?this.#t.webkitShowPlaybackTargetPicker():this.#t.remote.prompt()}#s(e){let t=this.#t.remote.state;if(t===this.#o)return;let i={type:this.type,state:t};this.#i.notify("remote-playback-change",i,e),this.#o=t}},n=class extends r{type="airplay";get canPrompt(){return"WebKitPlaybackTargetAvailabilityEvent"in window}};export{n as a};
