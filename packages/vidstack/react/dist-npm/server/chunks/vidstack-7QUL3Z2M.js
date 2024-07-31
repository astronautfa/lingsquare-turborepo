import{da as v,ia as C,k as f}from"./vidstack-DK4Y24W7.js";var R=class{#e=null;#t=null;#o=null;#r=null;#i=v();constructor(){}setSrc(e){this.#e=e,this.setContainer(this.#r)}setContainer(e){}destroy(){this.#i.empty()}#n(e){if(!this.#t||!this.#e)return;let o=this.#s(this.#t,e?.[0]),t=this.#a(o),n=this.#l(o,t);Object.assign(this.#o.style,{width:this.#e.compositionWidth*t+"px",height:this.#e.compositionHeight*t+"px",display:"flex",flexDirection:"column",position:"absolute",left:n.centerX,top:n.centerY,overflow:"hidden"}),Object.assign(this.#r.style,{position:"absolute",width:this.#e.compositionWidth+"px",height:this.#e.compositionHeight+"px",display:"flex",transform:`scale(${t})`,marginLeft:n.x,marginTop:n.y,overflow:"hidden"})}#s(e,o){let t=e.getBoundingClientRect();if(!o)return t;let{contentRect:n,target:a}=o,s=a.getClientRects();if(!s?.[0])return t;let l=n.width===0?1:s[0].width/n.width,d=s[0].width*(1/l),c=s[0].height*(1/l);return{width:d,height:c,top:s[0].y,left:s[0].x}}#a(e){if(!this.#e)return 0;let o=e.height/this.#e.compositionHeight,t=e.width/this.#e.compositionWidth;return Math.min(o||0,t||0)}#l(e,o){if(!this.#e)return{};let t=0-(1-o)/2,n=t*this.#e.compositionWidth,a=t*this.#e.compositionHeight,s=this.#e.compositionWidth*o,l=this.#e.compositionHeight*o,d=e.width/2-s/2,c=e.height/2-l/2;return{x:n,y:a,centerX:d,centerY:c}}};import*as r from"react";import{Internals as i}from"remotion";var g="vds-remotion-provider";function S({src:{compositionWidth:h,compositionHeight:e,fps:o,durationInFrames:t,numberOfSharedAudioTags:n},component:a,timeline:s,mediaVolume:l,setMediaVolume:d,children:c,numberOfSharedAudioTags:y}){let P=r.useMemo(()=>({compositions:[{id:g,component:a,durationInFrames:t,width:h,height:e,fps:o,nonce:777,folderName:null,parentFolderName:null,schema:null,calculateMetadata:null}],folders:[],registerFolder:()=>{},unregisterFolder:()=>{},registerComposition:()=>{},unregisterComposition:()=>{},updateCompositionDefaultProps:f,currentCompositionMetadata:null,setCurrentCompositionMetadata:()=>{},canvasContent:{type:"composition",compositionId:g},setCanvasContent:()=>{}}),[a,h,e,o,t]),E=r.useMemo(()=>{let m=[];return{get sequences(){return m},registerSequence(p){m=[...m,p]},unregisterSequence(p){m=m.filter(M=>M.id!==p)}}},[]);return r.createElement(i.IsPlayerContextProvider,null,r.createElement(i.CanUseRemotionHooksProvider,null,r.createElement(i.Timeline.TimelineContext.Provider,{value:s},r.createElement(i.CompositionManager.Provider,{value:P},r.createElement(i.SequenceManager.Provider,{value:E},r.createElement(i.ResolveCompositionConfig,null,r.createElement(i.PrefetchProvider,null,r.createElement(i.DurationsContextProvider,null,r.createElement(i.MediaVolumeContext.Provider,{value:l},r.createElement(i.NativeLayersProvider,null,r.createElement(i.SetMediaVolumeContext.Provider,{value:d},r.createElement(i.SharedAudioContextProvider,{numberOfAudioTags:y??n,component:a},c))))))))))))}S.displayName="RemotionContextProvider";import*as u from"react";var b={},x=class extends u.Component{static displayName="ErrorBoundary";state={hasError:null};static getDerivedStateFromError(e){return{hasError:e}}componentDidCatch(e){this.props.onError?.(e)}render(){let e=this.state.hasError;return e?u.createElement("div",{style:b},this.props.fallback?.(e)??u.createElement("div",{style:{fontWeight:"bold"}},"An error has occurred, see console for more information.")):this.props.children}};export{R as a,g as b,S as c,x as d};
