var p=s;function s(a,t,o){var n=null,u=null,e=function(){n&&(clearTimeout(n),u=null,n=null)},i=function(){var r=u;e(),r&&r()},l=function(){if(!t)return a.apply(this,arguments);var r=this,f=arguments,c=o&&!n;if(e(),u=function(){a.apply(r,f)},n=setTimeout(function(){if(n=null,!c){var v=u;return u=null,v()}},t),c)return u()};return l.cancel=e,l.flush=i,l}export{p as a};