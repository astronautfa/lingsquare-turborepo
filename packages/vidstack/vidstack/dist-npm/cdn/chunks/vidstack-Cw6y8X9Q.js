import{m as r}from"./vidstack-BM8ET1ww.js";function o(){return"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"}function i(){return!!window.cast?.framework}function c(){return!!window.chrome?.cast?.isAvailable}function u(){return e().getCastState()===cast.framework.CastState.CONNECTED}function e(){return window.cast.framework.CastContext.getInstance()}function a(){return e().getCurrentSession()}function s(){return a()?.getSessionObj().media[0]}function C(t){return s()?.media.contentId===t?.src}function d(){return{language:"en-US",autoJoinPolicy:chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,receiverApplicationId:chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,resumeSavedSession:!0,androidReceiverCompatible:!0}}function m(t){return`Google Cast Error Code: ${t}`}function f(t,n){return r(e(),t,n)}export{e as a,a as b,m as c,i as d,c as e,d as f,s as g,C as h,u as i,o as j,f as l};
