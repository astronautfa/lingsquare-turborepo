import{a as i}from"../chunks/vidstack-F6PR5Q7T.js";import{a as r}from"../chunks/vidstack-TGE5N6KV.js";import"../chunks/vidstack-KCALJS55.js";import"../chunks/vidstack-O27ZB45P.js";import"../chunks/vidstack-WJVXB6YB.js";import"../chunks/vidstack-MZUA5TJ4.js";import{e as t}from"../chunks/vidstack-BQB2M2TQ.js";var o=class extends r{$$PROVIDER_TYPE="AUDIO";get type(){return"audio"}airPlay;constructor(a,e){super(a,e),t(()=>{this.airPlay=new i(this.media,e)},this.scope)}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}};export{o as AudioProvider};
