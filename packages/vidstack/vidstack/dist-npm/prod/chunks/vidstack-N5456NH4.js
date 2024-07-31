import{G as j,H as R,b as mt,c as U,d as ft,e as D,n as k,p as gt,q as y,r as vt,y as Ct,z as A}from"./vidstack-RBFWGAHH.js";import{a as pt}from"./vidstack-ZYQSM73U.js";import{a as Q,b as ut,c as $}from"./vidstack-EV5FVEL6.js";import{c as ot}from"./vidstack-4QJFXBXL.js";import{a as ct,b}from"./vidstack-5IDZ3MKZ.js";import{b as m}from"./vidstack-HDVJ2P4K.js";import{c as C,d as at,h as lt,i as dt,j as w,n as ht}from"./vidstack-SKR3AJXQ.js";import{b as nt,c as N}from"./vidstack-CRUGUF5W.js";import{a as E}from"./vidstack-KCALJS55.js";import{A as tt,F as v,G as P,I as g,J as G,L as r,M as et,N as I,O as x,P as V,U as o,V as F,W as B,Z as it,a as c,ba as st,c as z,e as H,f as S,g as X,ga as rt,i as Y,m as _,n as J,r as Z,x as u,y as W,z as q}from"./vidstack-XC7WIXLW.js";var xt=class extends o{static props={translations:null};static state=new F({label:null,busy:!1});#t;#e=!1;onSetup(){this.#t=m()}onAttach(t){t.style.display="contents"}onConnect(t){t.setAttribute("data-media-announcer",""),C(t,"role","status"),C(t,"aria-live","polite");let{busy:e}=this.$state;this.setAttributes({"aria-busy":()=>e()?"true":null}),this.#e=!0,r(this.#i.bind(this)),r(this.#n.bind(this)),r(this.#a.bind(this)),r(this.#s.bind(this)),r(this.#r.bind(this)),r(this.#d.bind(this)),r(this.#c.bind(this)),z(),this.#e=!1}#i(){let{paused:t}=this.#t.$state;this.#p(t()?"Pause":"Play")}#s(){let{fullscreen:t}=this.#t.$state;this.#p(t()?"Enter Fullscreen":"Exit Fullscreen")}#r(){let{pictureInPicture:t}=this.#t.$state;this.#p(t()?"Enter PiP":"Exit PiP")}#a(){let{textTrack:t}=this.#t.$state;this.#p(t()?"Closed-Captions On":"Closed-Captions Off")}#n(){let{muted:t,volume:e,audioGain:i}=this.#t.$state;this.#p(t()||e()===0?"Mute":`${Math.round(e()*(i()??1)*100)}% ${this.#h("Volume")}`)}#o=-1;#l=-1;#d(){let{seeking:t,currentTime:e}=this.#t.$state,i=t();this.#o>0?(window.clearTimeout(this.#l),this.#l=window.setTimeout(()=>{if(!this.scope)return;let s=c(e),n=Math.abs(s-this.#o);if(n>=1){let a=s>=this.#o,p=U(n);this.#p(`${this.#h(a?"Seek Forward":"Seek Backward")} ${p}`)}this.#o=-1,this.#l=-1},300)):i&&(this.#o=c(e))}#h(t){let{translations:e}=this.$props;return e?.()?.[t||""]??t}#c(){let{label:t,busy:e}=this.$state,i=this.#h(t());if(this.#e)return;e.set(!0);let s=window.setTimeout(()=>void e.set(!1),150);return this.el&&v(this.el,"aria-label",i),J(i)&&this.dispatch("change",{detail:i}),()=>window.clearTimeout(s)}#p(t){let{label:e}=this.$state;e.set(t)}};var bt=class extends o{static props={hideDelay:2e3,hideOnMouseLeave:!1};#t;onSetup(){this.#t=m(),r(this.#i.bind(this))}onAttach(t){let{pictureInPicture:e,fullscreen:i}=this.#t.$state;P(t,"pointer-events","none"),C(t,"role","group"),this.setAttributes({"data-visible":this.#s.bind(this),"data-fullscreen":i,"data-pip":e}),r(()=>{this.dispatch("change",{detail:this.#s()})}),r(this.#e.bind(this)),r(()=>{let s=i();for(let n of["top","right","bottom","left"])P(t,`padding-${n}`,s&&`env(safe-area-inset-${n})`)})}#e(){if(!this.el)return;let{nativeControls:t}=this.#t.$state,e=t();v(this.el,"aria-hidden",e?"true":null),P(this.el,"display",e?"none":null)}#i(){let{controls:t}=this.#t.player,{hideDelay:e,hideOnMouseLeave:i}=this.$props;t.defaultDelay=e()===2e3?this.#t.$props.controlsDelay():e(),t.hideOnMouseLeave=i()}#s(){let{controlsVisible:t}=this.#t.$state;return t()}};var Tt=class extends o{onAttach(t){t.style.pointerEvents||P(t,"pointer-events","auto")}};var M=et();var qt=0,St=class extends o{static props={showDelay:700};#t=`media-tooltip-${++qt}`;#e=g(null);#i=g(null);constructor(){super(),new $;let{showDelay:t}=this.$props;new ft({trigger:this.#e,content:this.#i,showDelay:t,listen(e,i,s){u(e,"touchstart",n=>n.preventDefault(),{passive:!1}),r(()=>{ut()&&u(e,"focus",i),u(e,"blur",s)}),u(e,"mouseenter",i),u(e,"mouseleave",s)},onChange:this.#o.bind(this)})}onAttach(t){t.style.setProperty("display","contents")}onSetup(){I(M,{trigger:this.#e,content:this.#i,attachTrigger:this.#s.bind(this),detachTrigger:this.#r.bind(this),attachContent:this.#a.bind(this),detachContent:this.#n.bind(this)})}#s(t){this.#e.set(t);let e=t.getAttribute("data-media-tooltip");e&&this.el?.setAttribute(`data-media-${e}-tooltip`,""),v(t,"data-describedby",this.#t)}#r(t){t.removeAttribute("data-describedby"),t.removeAttribute("aria-describedby"),this.#e.set(null)}#a(t){t.setAttribute("id",this.#t),t.style.display="none",C(t,"role","tooltip"),this.#i.set(t)}#n(t){t.removeAttribute("id"),t.removeAttribute("role"),this.#i.set(null)}#o(t){let e=this.#e(),i=this.#i();e&&v(e,"aria-describedby",t?this.#t:null);for(let s of[this.el,e,i])s&&v(s,"data-visible",t)}};var Et=class extends o{constructor(){super(),new $}onConnect(t){S(w(()=>{if(!this.connectScope)return;this.#t();let e=x(M);S(()=>{let i=this.#e();i&&e.detachTrigger(i)})}))}#t(){let t=this.#e(),e=x(M);t&&e.attachTrigger(t)}#e(){let t=this.el.firstElementChild;return t?.localName==="button"||t?.getAttribute("role")==="button"?t:this.el}};var yt=class extends o{static props={placement:"top center",offset:0,alignOffset:0};constructor(){super(),new $;let{placement:t}=this.$props;this.setAttributes({"data-placement":t})}onAttach(t){this.#t(t),Object.assign(t.style,{position:"absolute",top:0,left:0,width:"max-content"})}onConnect(t){this.#t(t);let e=x(M);S(()=>e.detachContent(t)),S(w(()=>{this.connectScope&&r(this.#e.bind(this))}))}#t(t){x(M).attachContent(t)}#e(){let{placement:t,offset:e,alignOffset:i}=this.$props;return ht(this.el,this.#i(),t(),{offsetVarName:"media-tooltip",xOffset:i(),yOffset:e()})}#i(){return x(M).trigger()}};var Mt=class extends o{static props={disabled:!1,defaultPressed:!1};#t=g(!1);get pressed(){return this.#t()}constructor(){super(),new D({isPresssed:this.#t})}};var Pt=class extends o{static props=D.props;#t;constructor(){super(),new D({isPresssed:this.#i.bind(this),onPress:this.#e.bind(this)})}onSetup(){this.#t=m();let{canGoogleCast:t,isGoogleCastConnected:e}=this.#t.$state;this.setAttributes({"data-active":e,"data-supported":t,"data-state":this.#s.bind(this),"aria-hidden":b(()=>!t())})}onAttach(t){t.setAttribute("data-media-tooltip","google-cast"),at(t,this.#r.bind(this))}#e(t){this.#t.remote.requestGoogleCast(t)}#i(){let{remotePlaybackType:t,remotePlaybackState:e}=this.#t.$state;return t()==="google-cast"&&e()!=="disconnected"}#s(){let{remotePlaybackType:t,remotePlaybackState:e}=this.#t.$state;return t()==="google-cast"&&e()}#r(){let{remotePlaybackState:t}=this.#t.$state;return`Google Cast ${t()}`}};var $t=class extends o{static props={src:null,crossOrigin:null};static state=new F({video:null,src:null,crossOrigin:null,canPlay:!1,error:null,hidden:!1});#t;#e;get video(){return this.$state.video()}onSetup(){this.#t=m(),this.#e=B(vt.state),this.#r(),this.setAttributes({"data-loading":this.#a.bind(this),"data-hidden":this.$state.hidden,"data-error":this.#n.bind(this),"aria-hidden":b(this.$state.hidden)})}onAttach(t){r(this.#i.bind(this)),r(this.#s.bind(this)),r(this.#r.bind(this)),r(this.#o.bind(this)),r(this.#l.bind(this)),r(this.#c.bind(this))}#i(){let t=this.$state.video();t&&(t.readyState>=2&&this.#d(),u(t,"canplay",this.#d.bind(this)),u(t,"error",this.#h.bind(this)))}#s(){let{src:t}=this.$state,{canLoad:e}=this.#t.$state;t.set(e()?this.$props.src():null)}#r(){let{crossOrigin:t}=this.$props,{crossOrigin:e}=this.$state,{crossOrigin:i}=this.#t.$state,s=t()!==null?t():i();e.set(s===!0?"anonymous":s)}#a(){let{canPlay:t,hidden:e}=this.$state;return!t()&&!e()}#n(){let{error:t}=this.$state;return!Y(t)}#o(){let{src:t,hidden:e}=this.$state,{canLoad:i,duration:s}=this.#t.$state;e.set(i()&&(!t()||this.#n()||!Number.isFinite(s())))}#l(){let{src:t,canPlay:e,error:i}=this.$state;t(),e.set(!1),i.set(null)}#d(t){let{canPlay:e,error:i}=this.$state;e.set(!0),i.set(null),this.dispatch("can-play",{trigger:t})}#h(t){let{canPlay:e,error:i}=this.$state;e.set(!1),i.set(t),this.dispatch("error",{trigger:t})}#c(){let{video:t,canPlay:e}=this.$state,{duration:i}=this.#t.$state,{pointerRate:s}=this.#e,n=t();e()&&n&&Number.isFinite(i())&&Number.isFinite(s())&&(n.currentTime=s()*i())}};var At=class extends o{static props={...y.props,step:25,keyStep:25,shiftKeyMultiplier:2,min:0,max:300};static state=k;#t;onSetup(){this.#t=m(),I(gt,{default:"percent",percent:(t,e)=>E(this.$state.value(),e)+"%"}),new y({getStep:this.$props.step,getKeyStep:this.$props.keyStep,roundValue:Math.round,isDisabled:this.#a.bind(this),aria:{valueNow:this.#e.bind(this),valueText:this.#i.bind(this)},onDragValueChange:this.#l.bind(this),onValueChange:this.#o.bind(this)}).attach(this),r(this.#s.bind(this)),r(this.#r.bind(this))}onAttach(t){t.setAttribute("data-media-audio-gain-slider",""),C(t,"aria-label","Audio Boost");let{canSetAudioGain:e}=this.#t.$state;this.setAttributes({"data-supported":e,"aria-hidden":b(()=>!e())})}#e(){let{value:t}=this.$state;return Math.round(t())}#i(){let{value:t}=this.$state;return t()+"%"}#s(){let{min:t,max:e}=this.$props;this.$state.min.set(t()),this.$state.max.set(e())}#r(){let{audioGain:t}=this.#t.$state,e=((t()??1)-1)*100;this.$state.value.set(e),this.dispatch("value-change",{detail:e})}#a(){let{disabled:t}=this.$props,{canSetAudioGain:e}=this.#t.$state;return t()||!e()}#n(t){if(!t.trigger)return;let e=E(1+t.detail/100,2);this.#t.remote.changeAudioGain(e,t)}#o(t){this.#n(t)}#l(t){this.#n(t)}};var Vt=class extends o{static props={...y.props,step:.25,keyStep:.25,shiftKeyMultiplier:2,min:0,max:2};static state=k;#t;onSetup(){this.#t=m(),new y({getStep:this.$props.step,getKeyStep:this.$props.keyStep,roundValue:this.#a,isDisabled:this.#n.bind(this),aria:{valueNow:this.#e.bind(this),valueText:this.#i.bind(this)},onDragValueChange:this.#h.bind(this),onValueChange:this.#d.bind(this)}).attach(this),r(this.#s.bind(this)),r(this.#r.bind(this))}onAttach(t){t.setAttribute("data-media-speed-slider",""),C(t,"aria-label","Speed");let{canSetPlaybackRate:e}=this.#t.$state;this.setAttributes({"data-supported":e,"aria-hidden":b(()=>!e())})}#e(){let{value:t}=this.$state;return t()}#i(){let{value:t}=this.$state;return t()+"x"}#s(){let{min:t,max:e}=this.$props;this.$state.min.set(t()),this.$state.max.set(e())}#r(){let{playbackRate:t}=this.#t.$state,e=t();this.$state.value.set(e),this.dispatch("value-change",{detail:e})}#a(t){return E(t,2)}#n(){let{disabled:t}=this.$props,{canSetPlaybackRate:e}=this.#t.$state;return t()||!e()}#o=Q(this.#l.bind(this),25);#l(t){if(!t.trigger)return;let e=t.detail;this.#t.remote.changePlaybackRate(e,t)}#d(t){this.#o(t)}#h(t){this.#o(t)}};var wt=class extends o{static props={...y.props,step:1,keyStep:1,shiftKeyMultiplier:1};static state=k;#t;#e=G(()=>{let{qualities:t}=this.#t.$state;return ct(t())});onSetup(){this.#t=m(),new y({getStep:this.$props.step,getKeyStep:this.$props.keyStep,roundValue:Math.round,isDisabled:this.#n.bind(this),aria:{valueNow:this.#i.bind(this),valueText:this.#s.bind(this)},onDragValueChange:this.#h.bind(this),onValueChange:this.#d.bind(this)}).attach(this),r(this.#r.bind(this)),r(this.#a.bind(this))}onAttach(t){t.setAttribute("data-media-quality-slider",""),C(t,"aria-label","Video Quality");let{qualities:e,canSetQuality:i}=this.#t.$state,s=G(()=>i()&&e().length>0);this.setAttributes({"data-supported":s,"aria-hidden":b(()=>!s())})}#i(){let{value:t}=this.$state;return t()}#s(){let{quality:t}=this.#t.$state;if(!t())return"";let{height:e,bitrate:i}=t(),s=i&&i>0?`${(i/1e6).toFixed(2)} Mbps`:null;return e?`${e}p${s?` (${s})`:""}`:"Auto"}#r(){let t=this.#e();this.$state.max.set(Math.max(0,t.length-1))}#a(){let{quality:t}=this.#t.$state,e=this.#e(),i=Math.max(0,e.indexOf(t()));this.$state.value.set(i),this.dispatch("value-change",{detail:i})}#n(){let{disabled:t}=this.$props,{canSetQuality:e,qualities:i}=this.#t.$state;return t()||i().length<=1||!e()}#o=Q(this.#l.bind(this),25);#l(t){if(!t.trigger)return;let{qualities:e}=this.#t,i=c(this.#e)[t.detail];this.#t.remote.changeQuality(e.indexOf(i),t)}#d(t){this.#o(t)}#h(t){this.#o(t)}};var kt=class extends o{static props={disabled:!1};#t;#e;#i;#s=null;#r=[];#a=g(null);#n=g([]);#o=g(-1);#l=g(-1);#d=0;get cues(){return this.#n()}get activeCue(){return this.#n()[this.#o()]||null}get activePointerCue(){return this.#n()[this.#l()]||null}onSetup(){this.#t=m(),this.#e=B(Ct.state)}onAttach(t){N(this.#t.textTracks,"chapters",this.#h.bind(this)),r(this.#A.bind(this))}onConnect(){S(()=>this.#c.bind(this))}onDestroy(){this.#h(null)}setRefs(t){if(this.#r=t,this.#i?.dispose(),this.#r.length===1){let e=this.#r[0];e.style.width="100%",e.style.setProperty("--chapter-fill","var(--slider-fill)"),e.style.setProperty("--chapter-progress","var(--slider-progress)")}else this.#r.length>0&&H(()=>this.#p(),this.#i=X())}#h(t){c(this.#a)!==t&&(this.#c(),this.#a.set(t))}#c(){this.#r=[],this.#n.set([]),this.#o.set(-1),this.#l.set(-1),this.#d=0,this.#i?.dispose()}#p(){this.#r.length&&r(this.#u.bind(this))}#u(){let{hidden:t}=this.#e;t()||(r(this.#g.bind(this)),r(this.#f.bind(this)),r(this.#v.bind(this)),r(this.#E.bind(this)))}#g(){let t=this.#n();if(!t.length)return;let e,{clipStartTime:i,clipEndTime:s}=this.#t.$state,n=i(),a=s()||t[t.length-1].endTime,p=a-n,l=100;for(let f=0;f<t.length;f++)if(e=t[f],this.#r[f]){let d=f===t.length-1?l:E((e.endTime-Math.max(n,e.startTime))/p*100,3);this.#r[f].style.width=d+"%",l-=d}}#f(){let{liveEdge:t,clipStartTime:e,duration:i}=this.#t.$state,{fillPercent:s,value:n}=this.#e,a=this.#n(),p=t(),l=c(this.#o),f=a[l],d=p?this.#n.length-1:this.#T(f&&f.startTime/i()*100<=c(n)?l:0,s());p||!f?this.#m(0,a.length,100):d>l?this.#m(l,d,100):d<l&&this.#m(d+1,l+1,0);let T=p?100:this.#x(a[d],s(),e(),this.#C(a));this.#b(this.#r[d],T),this.#o.set(d)}#v(){let{pointing:t,pointerPercent:e}=this.#e;if(!t()){this.#l.set(-1);return}let i=this.#T(0,e());this.#l.set(i)}#m(t,e,i){for(let s=t;s<e;s++)this.#b(this.#r[s],i)}#b(t,e){t&&(t.style.setProperty("--chapter-fill",e+"%"),v(t,"data-active",e>0&&e<100),v(t,"data-ended",e===100))}#T(t,e){let i=0,s=this.#n();if(e===0)return 0;if(e===100)return s.length-1;let{clipStartTime:n}=this.#t.$state,a=n(),p=this.#C(s);for(let l=t;l<s.length;l++)if(i=this.#x(s[l],e,a,p),i>=0&&i<100)return l;return 0}#E(){this.#y(this.#M())}#y=rt(t=>{let e,i=this.#n(),{clipStartTime:s}=this.#t.$state,n=s(),a=this.#C(i);for(let p=this.#d;p<this.#r.length;p++)if(e=this.#x(i[p],t,n,a),this.#r[p]?.style.setProperty("--chapter-progress",e+"%"),e<100){this.#d=p;break}});#M=G(this.#P.bind(this));#P(){let{bufferedEnd:t,duration:e}=this.#t.$state;return E(Math.min(t()/Math.max(e(),1),1),3)*100}#C(t){let{clipEndTime:e}=this.#t.$state,i=e();return i>0?i:t[t.length-1]?.endTime||0}#x(t,e,i,s){if(this.#n().length===0)return 0;let a=s-i,p=Math.max(0,t.startTime-i),l=Math.min(s,t.endTime)-i,f=p/a,d=f*100,T=Math.min(1,f+(l-p)/a)*100;return Math.max(0,E(e>=T?100:(e-d)/(T-d)*100,3))}#$(t){let e=[],{clipStartTime:i,clipEndTime:s,duration:n}=this.#t.$state,a=i(),p=s()||1/0;t=t.filter(d=>d.startTime<=p&&d.endTime>=a);let l=t[0];l&&l.startTime>a&&e.push(new window.VTTCue(a,l.startTime,""));for(let d=0;d<t.length-1;d++){let T=t[d],L=t[d+1];if(e.push(T),L){let O=L.startTime-T.endTime;O>0&&e.push(new window.VTTCue(T.endTime,T.endTime+O,""))}}let f=t[t.length-1];if(f){e.push(f);let d=n();d>=0&&d-f.endTime>1&&e.push(new window.VTTCue(f.endTime,n(),""))}return e}#A(){let{source:t}=this.#t.$state;t(),this.#V()}#V(){if(!this.scope)return;let{disabled:t}=this.$props;if(t()){this.#n.set([]),this.#o.set(0),this.#d=0;return}let e=this.#a();if(e){let i=this.#S.bind(this);i(),S(u(e,"add-cue",i)),S(u(e,"remove-cue",i)),r(this.#w.bind(this))}return this.#s=this.#G(),this.#s&&r(this.#k.bind(this)),()=>{this.#s&&(this.#s.textContent="",this.#s=null)}}#w(){this.#t.$state.duration(),this.#S()}#S=pt(()=>{let t=c(this.#a);!this.scope||!t||!t.cues.length||(this.#n.set(this.#$(t.cues)),this.#o.set(0),this.#d=0)},150,!0);#k(){let t=this.activePointerCue||this.activeCue;this.#s&&(this.#s.textContent=t?.text||"")}#R(){let t=this.el;for(;t&&t.getAttribute("role")!=="slider";)t=t.parentElement;return t}#G(){let t=this.#R();return t?t.querySelector('[data-part="chapter-title"]'):null}};var Rt=class extends o{static props={value:""};#t;get values(){return this.#t.values}get value(){return this.#t.value}set value(t){this.#t.value=t}constructor(){super(),this.#t=new R,this.#t.onValueChange=this.#i.bind(this)}onSetup(){r(this.#e.bind(this))}#e(){this.#t.value=this.$props.value()}#i(t,e){let i=this.createEvent("change",{detail:t,trigger:e});this.dispatch(i)}};var Gt=class extends o{static props={value:""};#t=g(!1);#e={value:this.$props.value,check:this.#n.bind(this),onCheck:null};get checked(){return this.#t()}constructor(){super(),new $}onSetup(){this.setAttributes({value:this.$props.value,"data-checked":this.#t,"aria-checked":b(this.#t)})}onAttach(t){let e=V(A);C(t,"tabindex",e?"-1":"0"),C(t,"role",e?"menuitemradio":"radio"),r(this.#r.bind(this))}onConnect(t){this.#s(),lt(t,this.#a.bind(this)),S(this.#i.bind(this))}#i(){H(()=>{x(j).remove(this.#e)},this.connectScope)}#s(){x(j).add(this.#e)}#r(){let{value:t}=this.$props,e=t();c(this.#t)&&this.#e.onCheck?.(e)}#a(t){c(this.#t)||(this.#o(!0,t),this.#l(t),this.#e.onCheck?.(c(this.$props.value),t))}#n(t,e){c(this.#t)!==t&&this.#o(t,e)}#o(t,e){this.#t.set(t),this.dispatch("change",{detail:t,trigger:e})}#l(t){this.dispatch("select",{trigger:t})}};var Dt=class extends o{static props={thumbnails:null};#t;#e;#i;#s=g(null);#r=g([]);get value(){return this.#i.value}get disabled(){return!this.#r()?.length}constructor(){super(),this.#i=new R,this.#i.onValueChange=this.#h.bind(this)}onSetup(){this.#t=m(),V(A)&&(this.#e=x(A));let{thumbnails:t}=this.$props;this.setAttributes({"data-thumbnails":()=>!!t()})}onAttach(t){this.#e?.attachObserver({onOpen:this.#a.bind(this)})}getOptions(){let{clipStartTime:t,clipEndTime:e}=this.#t.$state,i=t(),s=e()||1/0;return this.#r().map((n,a)=>({cue:n,value:a.toString(),label:n.text,startTime:mt(Math.max(0,n.startTime-i)),duration:U(Math.min(s,n.endTime)-Math.max(i,n.startTime))}))}#a(){c(()=>this.#l())}onConnect(t){r(this.#l.bind(this)),r(this.#d.bind(this)),r(this.#n.bind(this)),N(this.#t.textTracks,"chapters",this.#s.set)}#n(){let t=this.#s();if(!t)return;let e=this.#o.bind(this,t);return e(),u(t,"add-cue",e),u(t,"remove-cue",e),()=>{this.#r.set([])}}#o(t){let{clipStartTime:e,clipEndTime:i}=this.#t.$state,s=e(),n=i()||1/0;this.#r.set([...t.cues].filter(a=>a.startTime<=n&&a.endTime>=s))}#l(){if(!this.#e?.expanded())return;if(!this.#s()){this.#i.value="-1";return}let{realCurrentTime:e,clipStartTime:i,clipEndTime:s}=this.#t.$state,n=i(),a=s()||1/0,p=e(),l=this.#r().findIndex(f=>nt(f,p));this.#i.value=l.toString(),l>=0&&w(()=>{if(!this.connectScope)return;let f=this.#r()[l],d=this.el.querySelector("[aria-checked='true']"),T=Math.max(n,f.startTime),L=Math.min(a,f.endTime)-T,O=Math.max(0,p-T)/L*100;d&&P(d,"--progress",E(O,3)+"%")})}#d(){this.#e?.disable(this.disabled)}#h(t,e){if(this.disabled||!e)return;let i=+t,s=this.#r(),{clipStartTime:n}=this.#t.$state;_(i)&&s?.[i]&&(this.#i.value=i.toString(),this.#t.remote.seek(s[i].startTime-n(),e),this.dispatch("change",{detail:s[i],trigger:e}))}};var It=[1,1.25,1.5,1.75,2,2.5,3,4],Lt=class extends o{static props={normalLabel:"Disabled",gains:It};#t;#e;#i;get value(){return this.#i.value}get disabled(){let{gains:t}=this.$props,{canSetAudioGain:e}=this.#t.$state;return!e()||t().length===0}constructor(){super(),this.#i=new R,this.#i.onValueChange=this.#o.bind(this)}onSetup(){this.#t=m(),V(A)&&(this.#e=x(A))}onConnect(t){r(this.#s.bind(this)),r(this.#r.bind(this)),r(this.#a.bind(this))}getOptions(){let{gains:t,normalLabel:e}=this.$props;return t().map(i=>({label:i===1||i===null?e:String(i*100)+"%",value:i.toString()}))}#s(){this.#i.value=this.#n()}#r(){let{normalLabel:t}=this.$props,{audioGain:e}=this.#t.$state,i=e();this.#e?.hint.set(i===1||i==null?t():String(i*100)+"%")}#a(){this.#e?.disable(this.disabled)}#n(){let{audioGain:t}=this.#t.$state;return t()?.toString()??"1"}#o(t,e){if(this.disabled)return;let i=+t;this.#t.remote.changeAudioGain(i,e),this.dispatch("change",{detail:i,trigger:e})}};var Ot=class extends o{static props={disabled:!1,event:void 0,action:void 0};#t;#e=null;onSetup(){this.#t=m();let{event:t,action:e}=this.$props;this.setAttributes({event:t,action:e})}onAttach(t){t.setAttribute("data-media-gesture",""),t.style.setProperty("pointer-events","none")}onConnect(t){this.#e=this.#t.player.el?.querySelector("[data-media-provider]"),r(this.#i.bind(this))}#i(){let t=this.$props.event(),e=this.$props.disabled();!this.#e||!t||e||(/^dbl/.test(t)&&(t=t.split(/^dbl/)[1]),(t==="pointerup"||t==="pointerdown")&&this.#t.$state.pointer()==="coarse"&&(t=t==="pointerup"?"touchend":"touchstart"),u(this.#e,t,this.#a.bind(this),{passive:!1}))}#s=0;#r=-1;#a(t){if(this.$props.disabled()||W(t)&&(t.button!==0||this.#t.activeMenu)||q(t)&&this.#t.activeMenu||dt(t)||!this.#o(t))return;if(t.MEDIA_GESTURE=!0,t.preventDefault(),!c(this.$props.event)?.startsWith("dbl"))this.#s===0&&setTimeout(()=>{this.#s===1&&this.#n(t)},250);else if(this.#s===1){queueMicrotask(()=>this.#n(t)),clearTimeout(this.#r),this.#s=0;return}this.#s===0&&(this.#r=window.setTimeout(()=>{this.#s=0},275)),this.#s++}#n(t){this.el.setAttribute("data-triggered",""),requestAnimationFrame(()=>{this.#l()&&this.#d(c(this.$props.action),t),requestAnimationFrame(()=>{this.el.removeAttribute("data-triggered")})})}#o(t){if(!this.el)return!1;if(W(t)||tt(t)||q(t)){let e=q(t)?t.changedTouches[0]??t.touches[0]:void 0,i=e?.clientX??t.clientX,s=e?.clientY??t.clientY,n=this.el.getBoundingClientRect(),a=s>=n.top&&s<=n.bottom&&i>=n.left&&i<=n.right;return t.type.includes("leave")?!a:a}return!0}#l(){let t=this.#t.player.el.querySelectorAll("[data-media-gesture][data-triggered]");return Array.from(t).sort((e,i)=>+getComputedStyle(i).zIndex-+getComputedStyle(e).zIndex)[0]===this.el}#d(t,e){if(!t)return;let i=new Z("will-trigger",{detail:t,cancelable:!0,trigger:e});if(this.dispatchEvent(i),i.defaultPrevented)return;let[s,n]=t.replace(/:([a-z])/,"-$1").split(":");t.includes(":fullscreen")?this.#t.remote.toggleFullscreen("prefer-media",e):t.includes("seek:")?this.#t.remote.seek(c(this.#t.$state.currentTime)+(+n||0),e):this.#t.remote[it(s)](e),this.dispatch("trigger",{detail:t,trigger:e})}};var K=class{priority=10;#t=null;#e=st();#i;constructor(t){this.#i=t}attach(){}canRender(){return!0}detach(){this.#e.empty(),this.#i.reset(),this.#t=null}changeTrack(t){!t||this.#t===t||(this.#e.empty(),t.readyState<2?(this.#i.reset(),this.#e.add(u(t,"load",()=>this.#s(t),{once:!0}))):this.#s(t),this.#e.add(u(t,"add-cue",e=>{this.#i.addCue(e.detail)}),u(t,"remove-cue",e=>{this.#i.removeCue(e.detail)})),this.#t=t)}#s(t){this.#i.changeTrack({cues:[...t.cues],regions:[...t.regions]})}};var Ht=class h extends o{static props={textDir:"ltr",exampleText:"Captions look like this."};#t;static lib=g(null);onSetup(){this.#t=m(),this.setAttributes({"aria-hidden":b(this.#e.bind(this))})}onAttach(t){t.style.setProperty("pointer-events","none")}onConnect(t){h.lib()||import("media-captions").then(e=>h.lib.set(e)),r(this.#i.bind(this))}#e(){let{textTrack:t,remotePlaybackState:e,iOSControls:i}=this.#t.$state,s=t();return i()||e()==="connected"||!s||!ot(s)}#i(){if(!h.lib())return;let{viewType:t}=this.#t.$state;return t()==="audio"?this.#s():this.#o()}#s(){return r(this.#r.bind(this)),this.#h(null),()=>{this.el.textContent=""}}#r(){if(this.#e())return;this.#a();let{textTrack:t}=this.#t.$state;u(t(),"cue-change",this.#a.bind(this)),r(this.#n.bind(this))}#a(){this.el.textContent="",this.#u>=0&&this.#f();let{realCurrentTime:t,textTrack:e}=this.#t.$state,{renderVTTCueString:i}=h.lib(),s=c(t),n=c(e).activeCues;for(let a of n){let p=this.#v(),l=this.#m();l.innerHTML=i(a,s),p.append(l),this.el.append(l)}}#n(){let{realCurrentTime:t}=this.#t.$state,{updateTimedVTTCueNodes:e}=h.lib();e(this.el,t())}#o(){let{CaptionsRenderer:t}=h.lib(),e=new t(this.el),i=new K(e);return this.#t.textRenderers.add(i),r(this.#l.bind(this,e)),r(this.#d.bind(this,e)),this.#h(e),()=>{this.el.textContent="",this.#t.textRenderers.remove(i),e.destroy()}}#l(t){t.dir=this.$props.textDir()}#d(t){if(this.#e())return;let{realCurrentTime:e,textTrack:i}=this.#t.$state;t.currentTime=e(),this.#u>=0&&i()?.activeCues[0]&&this.#f()}#h(t){let e=this.#t.player;if(!e)return;let i=this.#c.bind(this,t);u(e,"vds-font-change",i)}#c(t){if(this.#u>=0){this.#g();return}let{textTrack:e}=this.#t.$state;e()?.activeCues[0]?t?.update(!0):this.#p()}#p(){let t=this.#v();v(t,"data-example","");let e=this.#m();v(e,"data-example",""),e.textContent=this.$props.exampleText(),t?.append(e),this.el?.append(t),this.el?.setAttribute("data-example",""),this.#g()}#u=-1;#g(){window.clearTimeout(this.#u),this.#u=window.setTimeout(this.#f.bind(this),2500)}#f(){this.el?.removeAttribute("data-example"),this.el?.querySelector("[data-example]")&&(this.el.textContent=""),this.#u=-1}#v(){let t=document.createElement("div");return v(t,"data-part","cue-display"),t}#m(){let t=document.createElement("div");return v(t,"data-part","cue"),t}};export{xt as a,bt as b,Tt as c,St as d,Et as e,yt as f,Mt as g,Pt as h,$t as i,At as j,Vt as k,wt as l,kt as m,Rt as n,Gt as o,Dt as p,It as q,Lt as r,Ot as s,Ht as t};
