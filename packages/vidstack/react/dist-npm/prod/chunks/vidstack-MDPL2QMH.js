function o(n){return n instanceof Error?n:Error(typeof n=="string"?n:JSON.stringify(n))}function r(n,t){if(!n)throw Error(t||"Assertion failed.")}export{o as a,r as b};
