/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$4=new WeakMap;let o$4 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$4.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$3),i$3=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$3)},S$1=(s,n)=>{e$3?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window,r$1=e$2.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$3=e$2.reactiveElementPolyfillSupport,n$3={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$3,reflect:!1,hasChanged:a$1};let d$1 = class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$3).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$3;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:d$1}),(null!==(s$2=e$2.reactiveElementVersions)&&void 0!==s$2?s$2:e$2.reactiveElementVersions=[]).push("1.5.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$2=window,s$1=i$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2=`lit$${(Math.random()+"").slice(9)}$`,n$2="?"+o$2,l$1=`<${n$2}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$1:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$2+y):s+o$2+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$1?e$1.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$2),i=t.length-1;if(i>0){l.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r());}}}else if(8===l.nodeType)if(l.data===n$2)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$2,t+1));)c.push({type:7,index:h}),t+=o$2.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r()),this.O(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$1?s$1.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=i$2.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$1=i$2.litHtmlVersions)&&void 0!==t$1?t$1:i$2.litHtmlVersions=[]).push("2.5.0");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o$1;class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$1(e,n)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return e({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i(i,n){return o({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}

const ID_STORAGE_KEY = 'lovelace-player-device-id';
function _deviceID() {
  if(!localStorage[ID_STORAGE_KEY])
  {
    const s4 = () => {
      return Math.floor((1+Math.random())*100000).toString(16).substring(1);
    };
    if(window['fully'] && typeof fully.getDeviceId === "function")
      localStorage[ID_STORAGE_KEY] = fully.getDeviceId();
    else
      localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY];
}
let deviceID = _deviceID();

const setDeviceID = (id) => {
  if(id === null) return;
  if(id === "clear") {
    localStorage.removeItem(ID_STORAGE_KEY);
  } else {
    localStorage[ID_STORAGE_KEY] = id;
  }
  deviceID = _deviceID();
};

const params = new URLSearchParams(window.location.search);
if(params.get('deviceID')) {
  setDeviceID(params.get('deviceID'));
}

function hasTemplate(str) {
  if(String(str).includes("{%"))
    return true;
  if(String(str).includes("{{"))
    return true;
}

window.cardMod_template_cache =
    window.cardMod_template_cache || {};
const cachedTemplates = window
    .cardMod_template_cache;
function template_updated(key, result) {
    const cache = cachedTemplates[key];
    if (!cache) {
        return;
    }
    cache.value = result.result;
    cache.callbacks.forEach((f) => f(result.result));
}
async function bind_template(callback, template, variables) {
    const connection = hass().connection;
    const cacheKey = JSON.stringify([template, variables]);
    let cache = cachedTemplates[cacheKey];
    if (!cache) {
        unbind_template(callback);
        callback("");
        variables = Object.assign({ user: hass().user.name, browser: deviceID, hash: location.hash.substr(1) || "" }, variables);
        cachedTemplates[cacheKey] = cache = {
            template,
            variables,
            value: "",
            callbacks: new Set([callback]),
            unsubscribe: connection.subscribeMessage((result) => template_updated(cacheKey, result), {
                type: "render_template",
                template,
                variables,
            }),
        };
    }
    else {
        if (!cache.callbacks.has(callback))
            unbind_template(callback);
        callback(cache.value);
        cache.callbacks.add(callback);
    }
}
async function unbind_template(callback) {
    let unsubscriber;
    for (const [key, cache] of Object.entries(cachedTemplates)) {
        if (cache.callbacks.has(callback)) {
            cache.callbacks.delete(callback);
            if (cache.callbacks.size == 0) {
                unsubscriber = cache.unsubscribe;
                delete cachedTemplates[key];
            }
            break;
        }
    }
    if (unsubscriber)
        await (await unsubscriber)();
}

var _a;
const loadHaForm = async () => {
    var _a, _b;
    if (customElements.get("ha-form"))
        return;
    const helpers = await ((_b = (_a = window).loadCardHelpers) === null || _b === void 0 ? void 0 : _b.call(_a));
    if (!helpers)
        return;
    const card = await helpers.createCardElement({ type: "entity" });
    if (!card)
        return;
    await card.getConfigElement();
};
const compare_deep = (a, b) => {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (!(a instanceof Object && b instanceof Object))
        return false;
    for (const x in a) {
        if (!a.hasOwnProperty(x))
            continue;
        if (!b.hasOwnProperty(x))
            return false;
        if (a[x] === b[x])
            continue;
        if (typeof a[x] !== "object")
            return false;
        if (!compare_deep(a[x], b[x]))
            return false;
    }
    for (const x in b) {
        if (!b.hasOwnProperty(x))
            continue;
        if (!a.hasOwnProperty(x))
            return false;
    }
    return true;
};
window.autoEntities_cache = (_a = window.autoEntities_cache) !== null && _a !== void 0 ? _a : {};
const cache = window.autoEntities_cache;
async function getAreas(hass) {
    var _a;
    cache.areas =
        (_a = cache.areas) !== null && _a !== void 0 ? _a : (await hass.callWS({ type: "config/area_registry/list" }));
    return cache.areas;
}
function cached_areas() {
    return cache.areas;
}
async function getDevices(hass) {
    var _a;
    cache.devices =
        (_a = cache.devices) !== null && _a !== void 0 ? _a : (await hass.callWS({ type: "config/device_registry/list" }));
    return cache.devices;
}
function cached_devices() {
    return cache.devices;
}
async function getEntities(hass) {
    var _a;
    cache.entities =
        (_a = cache.entities) !== null && _a !== void 0 ? _a : (await hass.callWS({ type: "config/entity_registry/list" }));
    return cache.entities;
}
function cached_entities() {
    return cache.entities;
}
// Debugging helper
// (window as any).AutoEntities = {
//   getAreas,
//   getDevices,
//   getEntities,
// };

const ago_suffix_regex = /([mhd])\s+ago\s*$/i;
const default_ago_suffix = "m ago";
function match(pattern, value) {
    if (typeof pattern === "string" && pattern.startsWith("$$")) {
        pattern = pattern.substring(2);
        value = JSON.stringify(value);
    }
    if (typeof value === "string" && typeof pattern === "string") {
        if ((pattern.startsWith("/") && pattern.endsWith("/")) ||
            pattern.indexOf("*") !== -1) {
            if (!pattern.startsWith("/")) {
                // Convert globs to regex
                pattern = pattern.replace(/\./g, ".").replace(/\*/g, ".*");
                pattern = `/^${pattern}$/`;
            }
            let regex = new RegExp(pattern.slice(1, -1));
            return regex.test(value);
        }
    }
    if (typeof pattern === "string") {
        const match = ago_suffix_regex.exec(pattern);
        if (match) {
            pattern = pattern.replace(match[0], "");
            const now = new Date().getTime();
            const updated = new Date(value).getTime();
            value = (now - updated) / 60000;
            const period = match[1];
            if (period === "h") {
                value = value / 60;
            }
            else if (period === "d") {
                value = value / 60 / 24;
            }
        }
    }
    if (typeof pattern === "string") {
        // Comparisons assume numerical values
        if (pattern.startsWith("<="))
            return parseFloat(value) <= parseFloat(pattern.substring(2));
        if (pattern.startsWith(">="))
            return parseFloat(value) >= parseFloat(pattern.substring(2));
        if (pattern.startsWith("<"))
            return parseFloat(value) < parseFloat(pattern.substring(1));
        if (pattern.startsWith(">"))
            return parseFloat(value) > parseFloat(pattern.substring(1));
        if (pattern.startsWith("!"))
            return parseFloat(value) != parseFloat(pattern.substring(1));
        if (pattern.startsWith("="))
            return parseFloat(value) == parseFloat(pattern.substring(1));
    }
    return pattern === value;
}
const FILTERS = {
    options: async () => true,
    sort: async () => true,
    domain: async (hass, value, entity) => {
        return match(value, entity.entity_id.split(".")[0]);
    },
    entity_id: async (hass, value, entity) => {
        return match(value, entity.entity_id);
    },
    state: async (hass, value, entity) => {
        return match(value, entity.state);
    },
    name: async (hass, value, entity) => {
        var _a;
        return match(value, (_a = entity.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name);
    },
    group: async (hass, value, entity) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = hass.states[value]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.entity_id) === null || _c === void 0 ? void 0 : _c.includes(entity.entity_id);
    },
    attributes: async (hass, value, entity) => {
        for (const [k, v] of Object.entries(value)) {
            let attr = k.split(" ")[0]; // Remove any suffixes
            let obj = entity.attributes;
            for (const step of attr.split(":")) {
                obj = obj ? obj[step] : undefined;
            }
            if (obj === undefined || !match(v, obj))
                return false;
        }
        return true;
    },
    not: async (hass, value, entity) => {
        return !(await filter_entity(hass, value, entity.entity_id));
    },
    and: async (hass, value, entity) => {
        for (const v of value) {
            if (!(await filter_entity(hass, v, entity.entity_id)))
                return false;
        }
        return true;
    },
    or: async (hass, value, entity) => {
        for (const v of value) {
            if (await filter_entity(hass, v, entity.entity_id))
                return true;
        }
        return false;
    },
    device: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
        if (!device)
            return false;
        return match(value, device.name_by_user) || match(value, device.name);
    },
    device_manufacturer: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
        if (!device)
            return false;
        return match(value, device.manufacturer);
    },
    device_model: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
        if (!device)
            return false;
        return match(value, device.model);
    },
    area: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        let area = (await getAreas(hass)).find((a) => a.area_id === ent.area_id);
        if (area)
            return match(value, area.name) || match(value, area.area_id);
        const device = (await getDevices(hass)).find((d) => d.id === ent.device_id);
        if (!device)
            return false;
        area = (await getAreas(hass)).find((a) => a.area_id === device.area_id);
        if (!area)
            return false;
        return match(value, area.name) || match(value, area.area_id);
    },
    entity_category: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        return match(value, ent.entity_category);
    },
    last_changed: async (hass, value, entity) => {
        if (!ago_suffix_regex.test(value))
            value = value + default_ago_suffix;
        return match(value, entity.last_changed);
    },
    last_updated: async (hass, value, entity) => {
        if (!ago_suffix_regex.test(value))
            value = value + default_ago_suffix;
        return match(value, entity.last_updated);
    },
    last_triggered: async (hass, value, entity) => {
        if (entity.attributes.last_triggered == null)
            return false;
        if (!ago_suffix_regex.test(value))
            value = value + default_ago_suffix;
        return match(value, entity.attributes.last_triggered);
    },
    integration: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        return match(value, ent.platform);
    },
    hidden_by: async (hass, value, entity) => {
        const ent = (await getEntities(hass)).find((e) => e.entity_id === entity.entity_id);
        if (!ent)
            return false;
        return match(value, ent.hidden_by);
    },
};
async function filter_entity(hass, filter, entity_id) {
    var _a;
    if (!hass.states[entity_id])
        return false;
    for (let [k, v] of Object.entries(filter)) {
        k = k.trim().split(" ")[0].trim();
        if (!(await ((_a = FILTERS[k]) === null || _a === void 0 ? void 0 : _a.call(FILTERS, hass, v, hass.states[entity_id]))))
            return false;
    }
    return true;
}

function compare(_a, _b, method) {
    var _c, _d, _e, _f;
    const [lt, gt] = method.reverse ? [-1, 1] : [1, -1];
    if (method.ignore_case) {
        _a = (_d = (_c = _a === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _c === void 0 ? void 0 : _c.call(_a)) !== null && _d !== void 0 ? _d : _a;
        _b = (_f = (_e = _b === null || _b === void 0 ? void 0 : _b.toLowerCase) === null || _e === void 0 ? void 0 : _e.call(_b)) !== null && _f !== void 0 ? _f : _b;
    }
    if (method.numeric) {
        if (!(isNaN(parseFloat(_a)) && isNaN(parseFloat(_b)))) {
            _a = isNaN(parseFloat(_a)) ? undefined : parseFloat(_a);
            _b = isNaN(parseFloat(_b)) ? undefined : parseFloat(_b);
        }
    }
    if (_a === undefined && _b === undefined)
        return 0;
    if (_a === undefined)
        return lt;
    if (_b === undefined)
        return gt;
    if (method.numeric) {
        if (_a === _b)
            return 0;
        return (method.reverse ? -1 : 1) * (_a < _b ? -1 : 1);
    }
    if (method.ip) {
        _a = _a.split(".");
        _b = _b.split(".");
        return ((method.reverse ? -1 : 1) *
            (compare(_a[0], _b[0], { method: "", numeric: true }) ||
                compare(_a[1], _b[1], { method: "", numeric: true }) ||
                compare(_a[2], _b[2], { method: "", numeric: true }) ||
                compare(_a[3], _b[3], { method: "", numeric: true })));
    }
    return ((method.reverse ? -1 : 1) *
        String(_a).localeCompare(String(_b), undefined, method));
}
const SORTERS = {
    none: () => {
        return 0;
    },
    domain: (a, b, method) => {
        var _c, _d;
        return compare((_c = a === null || a === void 0 ? void 0 : a.entity_id) === null || _c === void 0 ? void 0 : _c.split(".")[0], (_d = b === null || b === void 0 ? void 0 : b.entity_id) === null || _d === void 0 ? void 0 : _d.split(".")[0], method);
    },
    entity_id: (a, b, method) => {
        return compare(a === null || a === void 0 ? void 0 : a.entity_id, b === null || b === void 0 ? void 0 : b.entity_id, method);
    },
    friendly_name: (a, b, method) => {
        var _c, _d, _e, _f;
        return compare(((_c = a === null || a === void 0 ? void 0 : a.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name) || ((_d = a === null || a === void 0 ? void 0 : a.entity_id) === null || _d === void 0 ? void 0 : _d.split(".")[1]), ((_e = b === null || b === void 0 ? void 0 : b.attributes) === null || _e === void 0 ? void 0 : _e.friendly_name) || ((_f = b === null || b === void 0 ? void 0 : b.entity_id) === null || _f === void 0 ? void 0 : _f.split(".")[1]), method);
    },
    name: (a, b, method) => {
        var _c, _d, _e, _f;
        return compare(((_c = a === null || a === void 0 ? void 0 : a.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name) || ((_d = a === null || a === void 0 ? void 0 : a.entity_id) === null || _d === void 0 ? void 0 : _d.split(".")[1]), ((_e = b === null || b === void 0 ? void 0 : b.attributes) === null || _e === void 0 ? void 0 : _e.friendly_name) || ((_f = b === null || b === void 0 ? void 0 : b.entity_id) === null || _f === void 0 ? void 0 : _f.split(".")[1]), method);
    },
    device: (a, b, method) => {
        var _c, _d;
        const entity_a = cached_entities().find((e) => e.entity_id === a.entity_id);
        const entity_b = cached_entities().find((e) => e.entity_id === b.entity_id);
        if (!entity_a || !entity_b)
            return 0;
        const device_a = cached_devices().find((d) => d.id === entity_a.device_id);
        const device_b = cached_devices().find((d) => d.id === entity_b.device_id);
        if (!device_a || !device_b)
            return 0;
        return compare((_c = device_a.name_by_user) !== null && _c !== void 0 ? _c : device_a.name, (_d = device_b.name_by_user) !== null && _d !== void 0 ? _d : device_b.name, method);
    },
    area: (a, b, method) => {
        const entity_a = cached_entities().find((e) => e.entity_id === a.entity_id);
        const entity_b = cached_entities().find((e) => e.entity_id === b.entity_id);
        if (!entity_a || !entity_b)
            return 0;
        const device_a = cached_devices().find((d) => d.id === entity_a.device_id);
        const device_b = cached_devices().find((d) => d.id === entity_b.device_id);
        if (!device_a || !device_b)
            return 0;
        const area_a = cached_areas().find((a) => a.area_id === device_a.area_id);
        const area_b = cached_areas().find((a) => a.area_id === device_b.area_id);
        if (!area_a || !area_b)
            return 0;
        return compare(area_a.name, area_b.name, method);
    },
    state: (a, b, method) => {
        return compare(a === null || a === void 0 ? void 0 : a.state, b === null || b === void 0 ? void 0 : b.state, method);
    },
    attribute: (a, b, method) => {
        var _c;
        const [lt, gt] = (method === null || method === void 0 ? void 0 : method.reverse) ? [-1, 1] : [1, -1];
        let _a = a === null || a === void 0 ? void 0 : a.attributes;
        let _b = b === null || b === void 0 ? void 0 : b.attributes;
        for (const step of (_c = method === null || method === void 0 ? void 0 : method.attribute) === null || _c === void 0 ? void 0 : _c.split(":")) {
            if (_a === undefined && _b === undefined)
                return 0;
            if (_a === undefined)
                return lt;
            if (_b === undefined)
                return gt;
            [_a, _b] = [_a[step], _b[step]];
        }
        return compare(_a, _b, method);
    },
    last_changed: (a, b, method) => {
        const [lt, gt] = (method === null || method === void 0 ? void 0 : method.reverse) ? [-1, 1] : [1, -1];
        if ((a === null || a === void 0 ? void 0 : a.last_changed) == null && (b === null || b === void 0 ? void 0 : b.last_changed) == null)
            return 0;
        if ((a === null || a === void 0 ? void 0 : a.last_changed) == null)
            return lt;
        if ((b === null || b === void 0 ? void 0 : b.last_changed) == null)
            return gt;
        method.numeric = true;
        return compare(new Date(a === null || a === void 0 ? void 0 : a.last_changed).getTime(), new Date(b === null || b === void 0 ? void 0 : b.last_changed).getTime(), method);
    },
    last_updated: (a, b, method) => {
        const [lt, gt] = (method === null || method === void 0 ? void 0 : method.reverse) ? [-1, 1] : [1, -1];
        if ((a === null || a === void 0 ? void 0 : a.last_updated) == null && (b === null || b === void 0 ? void 0 : b.last_updated) == null)
            return 0;
        if ((a === null || a === void 0 ? void 0 : a.last_updated) == null)
            return lt;
        if ((b === null || b === void 0 ? void 0 : b.last_updated) == null)
            return gt;
        method.numeric = true;
        return compare(new Date(a === null || a === void 0 ? void 0 : a.last_updated).getTime(), new Date(b === null || b === void 0 ? void 0 : b.last_updated).getTime(), method);
    },
    last_triggered: (a, b, method) => {
        var _c, _d, _e, _f, _g, _h;
        const [lt, gt] = (method === null || method === void 0 ? void 0 : method.reverse) ? [-1, 1] : [1, -1];
        if (((_c = a === null || a === void 0 ? void 0 : a.attributes) === null || _c === void 0 ? void 0 : _c.last_triggered) == null &&
            ((_d = b === null || b === void 0 ? void 0 : b.attributes) === null || _d === void 0 ? void 0 : _d.last_triggered) == null)
            return 0;
        if (((_e = a === null || a === void 0 ? void 0 : a.attributes) === null || _e === void 0 ? void 0 : _e.last_triggered) == null)
            return lt;
        if (((_f = b === null || b === void 0 ? void 0 : b.attributes) === null || _f === void 0 ? void 0 : _f.last_triggered) == null)
            return gt;
        method.numeric = true;
        return compare(new Date((_g = a === null || a === void 0 ? void 0 : a.attributes) === null || _g === void 0 ? void 0 : _g.last_triggered).getTime(), new Date((_h = b === null || b === void 0 ? void 0 : b.attributes) === null || _h === void 0 ? void 0 : _h.last_triggered).getTime(), method);
    },
};
function get_sorter(hass, method) {
    return function (a, b) {
        var _c, _d;
        return ((_d = (_c = SORTERS[method.method]) === null || _c === void 0 ? void 0 : _c.call(SORTERS, hass.states[a.entity], hass.states[b.entity], method)) !== null && _d !== void 0 ? _d : 0);
    };
}

var name = "auto-entities";
var version = "1.11.1b";
var type = "module";
var description = "";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch",
	"update-card-tools": "npm uninstall card-tools && npm install thomasloven/lovelace-card-tools"
};
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
	"@babel/core": "^7.20.7",
	"@rollup/plugin-babel": "^6.0.3",
	"@rollup/plugin-json": "^6.0.0",
	"@rollup/plugin-node-resolve": "^15.0.1",
	"@rollup/plugin-terser": "^0.2.1",
	rollup: "^3.8.1",
	"rollup-plugin-typescript2": "^0.34.1",
	tslib: "^2.4.1",
	typescript: "^4.9.4"
};
var dependencies = {
	"card-tools": "github:thomasloven/lovelace-card-tools",
	lit: "^2.5.0"
};
var pjson = {
	name: name,
	"private": true,
	version: version,
	type: type,
	description: description,
	scripts: scripts,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

const GUI_EDITOR_FILTERS = [
    "none",
    "domain",
    "entity_id",
    "state",
    "name",
    "group",
    "area",
    "device",
    "device_manufacturer",
    "device_model",
    "attributes",
    "last_changed",
    "last_updated",
    "last_triggered",
    "entity_category",
    "integration",
    "hidden_by",
];
const filterKeySelector = {
    type: "select",
    options: [
        ["domain", "Entity Domain"],
        ["entity_id", "Entity ID"],
        ["state", "Entity State"],
        ["name", "Friendly Name"],
        ["group", "Member of Group"],
        ["area", "In area"],
        ["device", "Device"],
        ["device_manufacturer", "Device Manufacturer"],
        ["device_model", "Device Model"],
        ["attributes", "Attribute"],
        ["last_changed", "Last Change"],
        ["last_updated", "Last Update"],
        ["last_triggered", "Last Trigger"],
        ["entity_category", "Entity Category"],
        ["integration", "Governing integration"],
        ["hidden_by", "Hidden by"],
    ],
};
const filterSchema = ([key, value], idx) => {
    var _a;
    const filterValueSelector = {
        attributes: { object: {} },
    };
    if (!GUI_EDITOR_FILTERS.includes(key))
        return {
            type: "Constant",
            name: "Some filters are not shown",
            value: "Please switch to the CODE EDITOR to access all options.",
        };
    return {
        type: "grid",
        name: "",
        schema: [
            Object.assign(Object.assign({}, filterKeySelector), { name: `key_${idx}`, label: "Property" }),
            {
                name: `value_${idx}`,
                selector: (_a = filterValueSelector[key]) !== null && _a !== void 0 ? _a : { text: {} },
                label: "Value",
            },
        ],
    };
};
const filterGroupSchema = (group) => {
    const filters = Object.assign({}, group);
    delete filters.options;
    return [
        ...Object.entries(filters).map(filterSchema),
        Object.assign(Object.assign({}, filterKeySelector), { name: `key_new`, label: "Select property" }),
    ];
};
const filter2form = (group) => {
    const filters = Object.assign({}, group);
    delete filters.options;
    return Object.assign({}, ...Object.entries(filters).map(([key, value], idx) => ({
        [`key_${idx}`]: key,
        [`value_${idx}`]: value,
    })));
};
const form2filter = (config, filter) => {
    var _a;
    const data = {};
    for (let i = 0; i <= config.filter.include.length + 1; i++) {
        if (filter[`key_${i}`] !== undefined)
            data[filter[`key_${i}`]] = (_a = filter[`value_${i}`]) !== null && _a !== void 0 ? _a : "";
    }
    if (filter.key_new !== undefined) {
        data[filter.key_new] = "";
    }
    return data;
};
const filterGroupOptionsSchema = [
    {
        name: "options",
        selector: { object: {} },
    },
];
const specialGroupSchema = [
    {
        name: "data",
        selector: { object: {} },
    },
];
const sortSchema = [
    {
        name: "method",
        label: "Sort method",
        type: "select",
        options: [
            ["domain", "Entity Domain"],
            ["entity_id", "Entity ID"],
            ["friendly_name", "Friendly Name"],
            ["state", "Entity State"],
            ["last_changed", "Last Change"],
            ["last_updated", "Last Update"],
            ["last_triggered", "Last Trigger"],
        ],
    },
    {
        type: "constant",
        name: "Sorting options:",
        value: "",
    },
    {
        type: "grid",
        name: "",
        schema: [
            { name: "reverse", type: "boolean", label: "Reverse" },
            { name: "ignore_case", type: "boolean", label: "Ignore case" },
            { name: "numeric", type: "boolean", label: "Numeric sort" },
            { name: "ip", type: "boolean", label: "IP address short" },
        ],
    },
];
const cardOptionsSchema = [
    {
        type: "grid",
        name: "",
        schema: [
            {
                name: "show_empty",
                type: "boolean",
                label: "Show if empty",
            },
            {
                name: "card_param",
                type: "string",
                label: "Parameter to populate",
            },
        ],
    },
];

class AutoEntitiesEditor extends s {
    constructor() {
        super(...arguments);
        this._selectedTab = 0;
        this._cardGUIMode = true;
        this._cardGUIModeAvailable = true;
    }
    setConfig(config) {
        this._config = config;
    }
    connectedCallback() {
        super.connectedCallback();
        loadHaForm();
    }
    _handleSwitchTab(ev) {
        this._selectedTab = parseInt(ev.detail.index, 10);
    }
    _addFilterGroup() {
        var _a;
        if (!this._config)
            return;
        const include = [...(_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include];
        include.push({});
        const filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this._config = Object.assign(Object.assign({}, this._config), { filter });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _deleteFilterGroup(idx) {
        var _a;
        if (!this._config)
            return;
        const include = [...(_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include];
        include.splice(idx, 1);
        const filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this._config = Object.assign(Object.assign({}, this._config), { filter });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _moveFilterGroup(idx, pos) {
        var _a;
        if (!this._config)
            return;
        const include = [...(_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include];
        [include[idx], include[idx + pos]] = [include[idx + pos], include[idx]];
        const filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this._config = Object.assign(Object.assign({}, this._config), { filter });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _addSpecialEntry() {
        var _a;
        if (!this._config)
            return;
        const include = [...(_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include];
        include.push({ type: "" });
        const filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this._config = Object.assign(Object.assign({}, this._config), { filter });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    async _changeSpecialEntry(group, ev) {
        var _a, _b, _c, _d;
        if (!this._config)
            return;
        const data = (_b = Object.assign({}, (_a = ev.detail.value) === null || _a === void 0 ? void 0 : _a.data)) !== null && _b !== void 0 ? _b : { type: "" };
        data.type = (_c = data.type) !== null && _c !== void 0 ? _c : "";
        const include = [...(_d = this._config.filter) === null || _d === void 0 ? void 0 : _d.include];
        include[group] = data;
        const filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this._config = Object.assign(Object.assign({}, this._config), { filter });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    async _changeGroupOptions(group, ev) {
        var _a;
        if (!this._config)
            return;
        const data = ev.detail.value;
        const include = [...(_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include];
        include[group] = Object.assign({}, data);
        const filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this._config = Object.assign(Object.assign({}, this._config), { filter });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _changeFilter(group, ev) {
        var _a;
        if (!this._config)
            return;
        const data = form2filter(this._config, ev.detail.value);
        const include = [...(_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.include];
        include[group] = Object.assign(Object.assign({}, data), { options: include[group].options });
        this._config.filter = Object.assign(Object.assign({}, this._config.filter), { include });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _changeSortOptions(ev) {
        if (!this._config)
            return;
        const sort = ev.detail.value;
        this._config = Object.assign(Object.assign({}, this._config), { sort });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _changeCardOptions(ev) {
        if (!this._config)
            return;
        const data = ev.detail.value;
        this._config = Object.assign(Object.assign({}, this._config), data);
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _showEmptyToggle() {
        if (!this._config)
            return;
        const show_empty = this._config.show_empty === false;
        this._config = Object.assign(Object.assign({}, this._config), { show_empty });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _changeCardParam(ev) {
        if (!this._config)
            return;
        const card_param = ev.target.value === "" || ev.target.value === "entities"
            ? undefined
            : ev.target.value;
        this._config = Object.assign(Object.assign({}, this._config), { card_param });
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _getCardConfig() {
        const cfg = Object.assign({}, this._config.card);
        cfg[this._config.card_param || "entities"] = [];
        return cfg;
    }
    _handleCardConfigChanged(ev) {
        ev.stopPropagation();
        if (!this._config)
            return;
        const card = Object.assign({}, ev.detail.config);
        delete card[this._config.card_param || "entities"];
        this._config = Object.assign(Object.assign({}, this._config), { card });
        this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _deleteCard(ev) {
        if (!this._config)
            return;
        this._config = Object.assign({}, this._config);
        delete this._config.card;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    _toggleCardMode(ev) {
        var _a;
        (_a = this._cardEditorEl) === null || _a === void 0 ? void 0 : _a.toggleMode();
    }
    _cardGUIModeChanged(ev) {
        ev.stopPropagation();
        this._cardGUIMode = ev.detail.guiMode;
        this._cardGUIModeAvailable = ev.detail.guiModeAvailable;
    }
    render() {
        if (!this.hass || !this._config) {
            return y ``;
        }
        return y `
      <div class="card-config">
        <div class="toolbar">
          <mwc-tab-bar
            .activeIndex=${this._selectedTab}
            @MDCTabBar:activated=${this._handleSwitchTab}
          >
            <mwc-tab .label=${"Filters"}></mwc-tab>
            <mwc-tab .label=${"Sorting"}></mwc-tab>
            <mwc-tab .label=${"Card"}></mwc-tab>
            <mwc-tab .label=${"?"} style="flex: 0 1 min-content;"></mwc-tab>
          </mwc-tab-bar>
        </div>
        <div id="editor">
          ${[
            this._renderFilterEditor,
            this._renderSortEditor,
            this._renderCardEditor,
            this._renderHelp,
        ][this._selectedTab].bind(this)()}
        </div>
      </div>
    `;
    }
    _renderHelp() {
        return y `
      <div class="box">
        <p>Auto entities</p>
        <p>
          See
          <a
            href="https://github.com/thomasloven/lovelace-auto-entities"
            target="_blank"
            rel="noreferrer"
          >
            auto-entities on github
          </a>
          for usage instructions.
        </p>
        <p>Not all options are available in the GUI editor.</p>
      </div>
    `;
    }
    _renderFilterEditor() {
        var _a;
        if (((_a = this._config.filter) === null || _a === void 0 ? void 0 : _a.template) || this._config.entities)
            return y `
        <div class="box">
          <p>
            <b>Your filter method is not handled by the GUI editor.</b>
          </p>
          <p>Please switch to the CODE EDITOR to access all options.</p>
        </div>
      `;
        return y `
      ${this._config.filter.include.map((group, group_idx) => y `
          <div class="box">
            <div class="toolbar">
              <mwc-icon-button
                .disabled=${group_idx === 0}
                @click=${() => this._moveFilterGroup(group_idx, -1)}
              >
                <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
              </mwc-icon-button>
              <mwc-icon-button
                .disabled=${group_idx ===
            this._config.filter.include.length - 1}
                @click=${() => this._moveFilterGroup(group_idx, 1)}
              >
                <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
              </mwc-icon-button>
              <mwc-icon-button
                @click=${() => this._deleteFilterGroup(group_idx)}
              >
                <ha-icon .icon=${"mdi:close"}></ha-icon>
              </mwc-icon-button>
            </div>
            ${group.type === undefined
            ? y `
                  <ha-form
                    .hass=${this.hass}
                    .schema=${filterGroupSchema(group)}
                    .data=${filter2form(group)}
                    .computeLabel=${(s) => { var _a; return (_a = s.label) !== null && _a !== void 0 ? _a : s.name; }}
                    @value-changed=${(ev) => this._changeFilter(group_idx, ev)}
                  ></ha-form>
                  <p>Options:</p>
                  <ha-form
                    .hass=${this.hass}
                    .schema=${filterGroupOptionsSchema}
                    .data=${group}
                    @value-changed=${(ev) => this._changeGroupOptions(group_idx, ev)}
                  ></ha-form>
                `
            : y `
                  <ha-form
                    .hass=${this.hass}
                    .schema=${specialGroupSchema}
                    .data=${{ data: group }}
                    @value-changed=${(ev) => this._changeSpecialEntry(group_idx, ev)}
                  ></ha-form>
                `}
          </div>
        `)}
      <mwc-button @click=${this._addFilterGroup}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>Add filter group
      </mwc-button>
      <mwc-button @click=${this._addSpecialEntry}>
        <ha-icon .icon=${"mdi:plus"}></ha-icon>Add non-filter entry
      </mwc-button>
    `;
    }
    _renderSortEditor() {
        var _a;
        const data = (_a = this._config.sort) !== null && _a !== void 0 ? _a : { method: "none" };
        return y `
      <div class="box">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${sortSchema}
          .computeLabel=${(s) => { var _a; return (_a = s.label) !== null && _a !== void 0 ? _a : s.name; }}
          @value-changed=${this._changeSortOptions}
        ></ha-form>
      </div>
    `;
    }
    _renderCardEditor() {
        var _a;
        const data = Object.assign({}, this._config);
        data.show_empty = (_a = data.show_empty) !== null && _a !== void 0 ? _a : true;
        return y `
      <div class="box cards">
        <ha-form
          .hass=${this.hass}
          .schema=${cardOptionsSchema}
          .computeLabel=${(s) => { var _a; return (_a = s.label) !== null && _a !== void 0 ? _a : s.name; }}
          .data=${data}
          @value-changed=${this._changeCardOptions}
        ></ha-form>
        ${this._config.card
            ? y `
              <div>
                <mwc-button
                  @click=${this._toggleCardMode}
                  .disabled=${!this._cardGUIModeAvailable}
                  class="gui-mode-button"
                >
                  ${!this._cardEditorEl || this._cardGUIMode
                ? "Show code editor"
                : "Show Visual Editor"}
                </mwc-button>
                <mwc-button
                  .title=${"Change card type"}
                  @click=${this._deleteCard}
                >
                  Change card type
                </mwc-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${this._getCardConfig()}
                @config-changed=${this._handleCardConfigChanged}
                @GUImode-changed=${this._cardGUIModeChanged}
              ></hui-card-element-editor>
            `
            : y `
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardConfigChanged}
              ></hui-card-picker>
            `}
      </div>
    `;
    }
    static get styles() {
        return [
            i$3 `
        mwc-tab-bar {
          border-bottom: 1px solid var(--divider-color);
        }

        .box {
          margin-top: 8px;
          border: 1px solid var(--divider-color);
          padding: 12px;
        }
        .option {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .box .toolbar {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          gap: 8px;
        }
        .gui-mode-button {
          margin-right: auto;
        }
        a {
          color: var(--primary-color);
        }
      `,
        ];
    }
}
__decorate([
    t()
], AutoEntitiesEditor.prototype, "_config", void 0);
__decorate([
    e()
], AutoEntitiesEditor.prototype, "lovelace", void 0);
__decorate([
    e()
], AutoEntitiesEditor.prototype, "hass", void 0);
__decorate([
    t()
], AutoEntitiesEditor.prototype, "_selectedTab", void 0);
__decorate([
    t()
], AutoEntitiesEditor.prototype, "_cardGUIMode", void 0);
__decorate([
    t()
], AutoEntitiesEditor.prototype, "_cardGUIModeAvailable", void 0);
__decorate([
    i("hui-card-element-editor")
], AutoEntitiesEditor.prototype, "_cardEditorEl", void 0);
customElements.define("auto-entities-editor", AutoEntitiesEditor);
window.customCards = window.customCards || [];
window.customCards.push({
    type: "auto-entities",
    name: "Auto Entities",
    preview: false,
    description: "Entity Filter on Steroids. Auto Entities allows you to fill other cards with entities automatically, based on a number of attributes.",
});

window.queueMicrotask =
    window.queueMicrotask || ((handler) => window.setTimeout(handler, 1));
class AutoEntities extends s {
    constructor() {
        super(...arguments);
        this.empty = false;
        this._updateCooldown = { timer: undefined, rerun: false };
        this._renderer = (tpl) => {
            if (typeof tpl === "string") {
                this._template = tpl.split(/[\s,]+/);
            }
            else {
                this._template = tpl;
            }
        };
    }
    static getConfigElement() {
        return document.createElement("auto-entities-editor");
    }
    static getStubConfig() {
        return {
            card: {
                type: "entities",
            },
            filter: {
                include: [],
                exclude: [],
            },
        };
    }
    setConfig(config) {
        var _a, _b;
        if (!config) {
            throw new Error("No configuration.");
        }
        if (!((_a = config.card) === null || _a === void 0 ? void 0 : _a.type)) {
            throw new Error("No card type specified.");
        }
        if (!config.filter && !config.entities) {
            throw new Error("No filters specified.");
        }
        config = JSON.parse(JSON.stringify(config));
        this._config = config;
        if (((_b = this._config.filter) === null || _b === void 0 ? void 0 : _b.template) &&
            hasTemplate(this._config.filter.template)) {
            bind_template(this._renderer, this._config.filter.template, { config });
        }
        this._cardBuilt = new Promise((resolve) => (this._cardBuiltResolve = resolve));
        queueMicrotask(() => this.build_else());
        queueMicrotask(() => this.update_all());
    }
    connectedCallback() {
        var _a, _b;
        super.connectedCallback();
        if (((_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.template) &&
            hasTemplate(this._config.filter.template)) {
            bind_template(this._renderer, this._config.filter.template, {
                config: this._config,
            });
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        unbind_template(this._renderer);
    }
    async update_all() {
        if (this.card)
            this.card.hass = this.hass;
        if (this.else)
            this.else.hass = this.hass;
        if (this._updateCooldown.timer) {
            this._updateCooldown.rerun = true;
            return;
        }
        else {
            this._updateCooldown.rerun = false;
            this._updateCooldown.timer = window.setTimeout(() => {
                this._updateCooldown.timer = undefined;
                if (this._updateCooldown.rerun)
                    this.update_all();
            }, 500);
        }
        const entities = await this.update_entities();
        this.update_card(entities);
    }
    async build_else() {
        if (this._config.else === undefined)
            return;
        const helpers = await window.loadCardHelpers();
        this.else = await helpers.createCardElement(this._config.else);
        this.else.hass = this.hass;
    }
    async update_card(entities) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (this._entities &&
            compare_deep(entities, this._entities) &&
            compare_deep(this._cardConfig, this._config.card))
            return;
        const newType = ((_a = this._cardConfig) === null || _a === void 0 ? void 0 : _a.type) !== this._config.card.type;
        this._entities = entities;
        this._cardConfig = JSON.parse(JSON.stringify(this._config.card));
        const cardConfig = Object.assign({ [this._config.card_param || "entities"]: entities }, this._config.card);
        if (!this.card || newType) {
            const helpers = await window.loadCardHelpers();
            // Replace console.error in order to catch errors from cards which don't like to be given an empty entities list
            console.oldError = console.oldError || [];
            const _consoleError = console.error;
            console.oldError.push(_consoleError);
            console.error = (...args) => {
                var _a, _b, _c, _d, _e, _f;
                if (args.length === 3 && args[2].message) {
                    if (((_b = (_a = args[2].message).startsWith) === null || _b === void 0 ? void 0 : _b.call(_a, "Entities")) || // Logbook-card
                        ((_d = (_c = args[2].message).startsWith) === null || _d === void 0 ? void 0 : _d.call(_c, "Either entities")) || // Map card
                        ((_f = (_e = args[2].message).endsWith) === null || _f === void 0 ? void 0 : _f.call(_e, "entity")) // History-graph card
                    ) {
                        return;
                    }
                }
                _consoleError(...args);
            };
            try {
                this.card = await helpers.createCardElement(cardConfig);
                if (this.card.localName === "hui-error-card") {
                    const errorCard = this.card;
                    await customElements.whenDefined("hui-error-card");
                    let ctr = 10;
                    while (!errorCard._config && ctr) {
                        await new Promise((resolve) => window.setTimeout(resolve, 100));
                        ctr--;
                    }
                    if (((_d = (_c = (_b = errorCard._config) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.startsWith) === null || _d === void 0 ? void 0 : _d.call(_c, "Entities")) ||
                        ((_g = (_f = (_e = errorCard._config) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.startsWith) === null || _g === void 0 ? void 0 : _g.call(_f, "Either entities")) ||
                        ((_k = (_j = (_h = errorCard._config) === null || _h === void 0 ? void 0 : _h.error) === null || _j === void 0 ? void 0 : _j.endsWith) === null || _k === void 0 ? void 0 : _k.call(_j, "entity"))) {
                        this.card = undefined;
                        this._entities = undefined;
                        this._cardConfig = undefined;
                        (_l = this._cardBuiltResolve) === null || _l === void 0 ? void 0 : _l.call(this);
                        return;
                    }
                }
            }
            finally {
                console.error = console.oldError.pop();
            }
        }
        else {
            this.card.setConfig(cardConfig);
        }
        (_m = this._cardBuiltResolve) === null || _m === void 0 ? void 0 : _m.call(this);
        this.card.hass = this.hass;
        this.empty = entities.filter((e) => e.type === undefined).length === 0;
        const hide = this.empty &&
            this._config.show_empty === false &&
            this._config.else === undefined;
        this.style.display = hide ? "none" : null;
        this.style.margin = hide ? "0" : null;
        if (this.card.requestUpdate) {
            await this.updateComplete;
            this.card.requestUpdate();
        }
    }
    async update_entities() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const format = (entity) => {
            if (!entity)
                return null;
            return typeof entity === "string" ? { entity: entity.trim() } : entity;
        };
        let entities = [...(((_b = (_a = this._config) === null || _a === void 0 ? void 0 : _a.entities) === null || _b === void 0 ? void 0 : _b.map(format)) || [])];
        if (!this.hass) {
            return entities;
        }
        if (this._template) {
            entities = entities.concat(this._template.map(format));
        }
        entities = entities.filter(Boolean);
        if ((_c = this._config.filter) === null || _c === void 0 ? void 0 : _c.include) {
            const all_entities = Object.keys(this.hass.states).map(format);
            for (const filter of this._config.filter.include) {
                if (filter.type) {
                    entities.push(filter);
                    continue;
                }
                let add = [];
                for (const entity of all_entities) {
                    if (await filter_entity(this.hass, filter, entity.entity))
                        add.push(JSON.parse(JSON.stringify(Object.assign(Object.assign({}, entity), filter.options)).replace(/this.entity_id/g, entity.entity)));
                }
                if (filter.sort) {
                    await getEntities(this.hass);
                    await getDevices(this.hass);
                    await getAreas(this.hass);
                    add = add.sort(get_sorter(this.hass, filter.sort));
                    if ((_d = filter.sort.count) !== null && _d !== void 0 ? _d : filter.sort.first) {
                        const start = (_e = filter.sort.first) !== null && _e !== void 0 ? _e : 0;
                        add = add.slice(start, start + ((_f = filter.sort.count) !== null && _f !== void 0 ? _f : Infinity));
                    }
                }
                entities = entities.concat(add);
            }
        }
        // TODO: Add tests for exclusions
        if ((_g = this._config.filter) === null || _g === void 0 ? void 0 : _g.exclude) {
            for (const filter of this._config.filter.exclude) {
                const newEntities = [];
                for (const entity of entities) {
                    if (entity.entity === undefined ||
                        !(await filter_entity(this.hass, filter, entity.entity)))
                        newEntities.push(entity);
                }
                entities = newEntities;
            }
        }
        if (this._config.sort) {
            entities = entities.sort(get_sorter(this.hass, this._config.sort));
            if (this._config.sort.count) {
                const start = (_h = this._config.sort.first) !== null && _h !== void 0 ? _h : 0;
                entities = entities.slice(start, start + this._config.sort.count);
            }
        }
        if (this._config.unique) {
            let newEntities = [];
            for (const e of entities) {
                if (this._config.unique === "entity" &&
                    e.entity &&
                    newEntities.some((i) => i.entity === e.entity))
                    continue;
                if (newEntities.some((i) => compare_deep(i, e)))
                    continue;
                newEntities.push(e);
            }
            entities = newEntities;
        }
        return entities;
    }
    async updated(changedProperties) {
        if (changedProperties.has("_template") ||
            (changedProperties.has("hass") && this.hass)) {
            queueMicrotask(() => this.update_all());
        }
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return y `${this.empty &&
            (this._config.show_empty === false || this._config.else)
            ? this.else
            : this.card}`;
    }
    async getCardSize() {
        var _a, _b;
        let len = 0;
        await this._cardBuilt;
        if (this.card && this.card.getCardSize)
            len = await this.card.getCardSize();
        if (len === 1 && ((_a = this._entities) === null || _a === void 0 ? void 0 : _a.length))
            len = this._entities.length;
        if (len === 0 && ((_b = this._config.filter) === null || _b === void 0 ? void 0 : _b.include))
            len = Object.keys(this._config.filter.include).length;
        return len || 5;
    }
}
__decorate([
    e()
], AutoEntities.prototype, "_config", void 0);
__decorate([
    e()
], AutoEntities.prototype, "hass", void 0);
__decorate([
    e()
], AutoEntities.prototype, "card", void 0);
__decorate([
    e()
], AutoEntities.prototype, "else", void 0);
__decorate([
    e()
], AutoEntities.prototype, "_template", void 0);
__decorate([
    t()
], AutoEntities.prototype, "empty", void 0);
if (!customElements.get("auto-entities")) {
    customElements.define("auto-entities", AutoEntities);
    console.groupCollapsed(`%cAUTO-ENTITIES ${pjson.version} IS INSTALLED`, "color: green; font-weight: bold");
    console.log("Readme:", "https://github.com/thomasloven/lovelace-auto-entities");
    console.groupEnd();
}
