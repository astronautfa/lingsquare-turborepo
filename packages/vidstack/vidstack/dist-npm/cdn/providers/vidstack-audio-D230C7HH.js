import{B as i}from"../chunks/vidstack-BXJ6Ukt4.js";import{HTMLMediaProvider as e}from"./vidstack-html-CTMFzkLk.js";import{H as o}from"../chunks/vidstack-BEpIqzIr.js";import"../chunks/vidstack-5owkE6Ab.js";import"../chunks/vidstack-BgPBA5eU.js";import"../chunks/vidstack-CAGwJbQ6.js";import"../chunks/vidstack-ClIUVQwo.js";class s extends e{constructor(r,t){super(r,t),this.$$PROVIDER_TYPE="AUDIO",i(()=>{this.airPlay=new o(this.media,t)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.b.delegate.c("provider-setup",this)}get audio(){return this.a}}export{s as AudioProvider};