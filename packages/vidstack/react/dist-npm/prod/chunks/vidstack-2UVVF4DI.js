import{$ as k,Ca as oe,Da as re,Ea as se,Fa as le,O as S,P as E,Q as C,R as h,S as M,T as v,U as N,V as b,W as V,X as _,Y as T,Z as w,_ as g,aa as A,b as x,ba as O,ca as $,da as j,fa as W,ha as H,ia as D,ja as F,ka as L,la as q,na as B,oa as Z,pa as z,qa as G,ra as J,sa as K,ta as Q,ua as U,va as X,wa as Y,xa as I,ya as ee,za as te}from"./vidstack-EWFRKCDB.js";import{$ as y,Z as u,_ as c,ia as P}from"./vidstack-7GZB5QIO.js";var d=class extends S{},ae=class extends E{},ie=class extends C{},ne=class extends h{},de=class extends M{},pe=class extends V{},ce=class extends g{},xe=class extends k{},me=class extends j{},Re=class extends A{},fe=class extends O{},ue=class extends w{},ye=class extends _{},Pe=class extends T{},Se=class extends ${},Ee=class extends v{},Ce=class extends N{},he=class extends b{},Me=class extends W{},ve=class extends J{},Ne=class extends B{},be=class extends Z{},Ve=class extends z{},_e=class extends G{},Te=class extends D{},we=class extends L{},ge=class extends F{},ke=class extends q{},Ae=class extends K{},Oe=class extends Q{},$e=class extends U{},je=class extends I{},We=class extends X{},He=class extends Y{},De=class extends ee{},Fe=class extends te{},Le=class extends re{},qe=class extends oe{},Be=class extends se{},Ze=class extends H{},ze=class extends le{};import*as p from"react";import*as t from"react";var R=t.forwardRef((e,o)=>{let{children:r,...s}=e,l=t.Children.toArray(r),a=l.find(Qe);if(a){let i=a.props.children,n=l.map(f=>f===a?t.Children.count(i)>1?t.Children.only(null):t.isValidElement(i)?i.props.children:null:f);return t.createElement(m,{...s,ref:o},t.isValidElement(i)?t.cloneElement(i,void 0,n):null)}return t.createElement(m,{...s,ref:o},r)});R.displayName="Slot";var m=t.forwardRef((e,o)=>{let{children:r,...s}=e;return t.isValidElement(r)?t.cloneElement(r,{...Ue(s,r.props),ref:o?u(o,r.ref):r.ref}):t.Children.count(r)>1?t.Children.only(null):null});m.displayName="SlotClone";var Ke=({children:e})=>t.createElement(t.Fragment,null,e);function Qe(e){return t.isValidElement(e)&&e.type===Ke}function Ue(e,o){let r={...o};for(let s in o){let l=e[s],a=o[s];/^on[A-Z]/.test(s)?l&&a?r[s]=(...n)=>{a(...n),l(...n)}:l&&(r[s]=l):s==="style"?r[s]={...l,...a}:s==="className"&&(r[s]=[l,a].filter(Boolean).join(" "))}return{...e,...r}}var Xe=["button","div","span","img","video","audio"],rt=Xe.reduce((e,o)=>{let r=p.forwardRef((s,l)=>{let{asChild:a,...i}=s;return p.createElement(a?R:o,{...i,ref:l})});return r.displayName=`Primitive.${o}`,{...e,[o]:r}},{});var Ge=d.state.record,Je=Object.keys(Ge).reduce((e,o)=>({...e,[o](){return Ge[o]}}),{});function nt(e,o){let r=c(x);return y((o?.current?.$state||r||Je)[e])}function dt(e){let o=c(x);return P(e?.current?e.current.$state:o||Je)}export{d as a,ae as b,ie as c,ne as d,de as e,pe as f,ce as g,xe as h,me as i,Re as j,fe as k,ue as l,ye as m,Pe as n,Se as o,Ee as p,Ce as q,he as r,Me as s,ve as t,Ne as u,be as v,Ve as w,_e as x,Te as y,we as z,ge as A,ke as B,Ae as C,Oe as D,$e as E,je as F,We as G,He as H,De as I,Fe as J,Le as K,qe as L,Be as M,Ze as N,ze as O,rt as P,nt as Q,dt as R};
