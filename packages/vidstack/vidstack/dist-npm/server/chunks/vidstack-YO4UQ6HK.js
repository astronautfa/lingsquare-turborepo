import{a as r,b as i}from"./vidstack-CTSWBMS3.js";import"./vidstack-SQMJEYQM.js";import"./vidstack-WJVXB6YB.js";import"./vidstack-B33PLL6T.js";import"./vidstack-KCALJS55.js";import{e as t}from"./vidstack-SHDDQIF4.js";import"./vidstack-MEEMBG7T.js";var o=class extends r{$$PROVIDER_TYPE="AUDIO";get type(){return"audio"}airPlay;constructor(a,e){super(a,e),t(()=>{this.airPlay=new i(this.media,e)},this.scope)}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}};export{o as AudioProvider};