!function(n){"use strict";const e={"input.placeholder":"Entrez l'URL de votre site","button.analyze":"Analyser","span.error":"Entrez une URL valdide","span.no-data":"Désolé, nous n'avons pas assez de données fiables sur les performances de cette URL","performance-bar.legend":"Valeurs pour les utilisateurs réels mesurés par Google Chrome au 75e percentile sur mobile","lcp.legend":"Est-ce que ça charge rapidement?","cls.legend":"Est-ce que c'est visuellement stable?","inp.legend":"Est-ce que c'est réactif?"};function t(n,e,t,r){return new(t||(t=Promise))((function(o,i){function a(n){try{s(r.next(n))}catch(n){i(n)}}function l(n){try{s(r.throw(n))}catch(n){i(n)}}function s(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(a,l)}s((r=r.apply(n,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const r=new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi),o=new RegExp(/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);const i=["lcp","cls","inp"],a={lcp:{fair:2500,poor:4e3,display:4e3},inp:{fair:200,poor:500,display:50},cls:{fair:.1,poor:.25,display:.2}},l=(n,e,t)=>{const r=((n,e)=>{switch(n){case"inp":return`${Math.round(e)}ms`;case"cls":return`${e.toFixed(3)}`;default:return`${(e/1e3).toFixed(2)}s`}})(e,n),{goodGrow:o,fairGrow:i,poorGrow:l,metricPos:s,markerAdjust:d}=(({fair:n,poor:e,value:t,displayEnd:r})=>{const o=t<n?"good":t<e?"fair":"poor";let i=r;return("poor"===o||t>.95*i)&&(i=1.14*t),{goodGrow:Math.min(n,i)/i,fairGrow:(Math.min(e,i)-Math.min(n,i))/i,poorGrow:(i-Math.min(e,i))/i,metricPos:Math.round(t/i*1e4+Number.EPSILON)/100,markerAdjust:"good"===o?4:2}})({fair:a[e].fair,poor:a[e].poor,displayEnd:a[e].display,value:n});return`<div id="performance-bar">\n  <div class="legend-metric-title">\n    ${t[`${e}.legend`]}\n    <a href="https://web.dev/${e}">${e.toUpperCase()}</a>\n  </div>\n  <div class="legend-metric" style="padding-left: calc(${s}% - ${d}px - ${4*r.length}px);">\n     ${r}\n  </div>\n  <div style="display: flex">\n    <span style="flex-grow: ${o}; margin-right: 1px;">\n        <div class="good bar"></div>\n    </span>\n    <span style="flex-grow: ${i}; margin-left: 1px; margin-right: 1px">\n        <div class="fair bar"></div>\n    </span>\n    <span style="flex-grow: ${l}; margin-left: 1px">\n        <div class="poor bar"></div>\n    </span>\n  </div>\n    <div class="marker" style="padding-left: calc(${s}% - ${d}px);"></div>\n</div>`},s=n=>n.getElementById("container"),d=n=>n.getElementById("input"),c=n=>n.getElementById("span-error");function p(n){const e=(n=>n.getElementById("loading-spinner"))(n);e&&s(n).removeChild(e)}class m extends HTMLElement{constructor(){super();const n=e;try{const a=this.attachShadow({mode:"open"}),m=document.createElement("template");m.innerHTML=`<style>#container {\n  display: flex;\n  flex-direction: column;\n  padding: 1rem;\n  padding-bottom: 0.5rem;\n  min-height: 27rem;\n  background-color: #ffffff;\n}\n\n#form {\n  display: flex;\n  height: 3rem;\n}\n\n#input {\n  flex: 1;\n  padding: 0 0.5rem;\n  margin-right: 1rem;\n  background-color: #ffffff;\n  color: #000000;\n  border: 2px solid #94a3b8;\n  border-radius: 4px;\n  outline: none;\n}\n\n#input:focus {\n  border: 2px solid #475569;\n}\n\n#input.error {\n  border-color: #d93025;\n  padding: 1rem 0.5rem;\n}\n\n#span-error {\n  color: #d93025;\n  padding: 0.5rem;\n}\n\nbutton {\n  cursor: pointer;\n  border: 0;\n  padding: 0 1rem;\n  background: #475569;\n  color: #ffffff;\n}\n\n#loading-spinner {\n  height: 4rem;\n  width: 4rem;\n  margin: auto;\n}\n\n#no-data {\n  color: #000000;\n  margin: auto;\n}\n\n#performance-bars-container-legend {\n  font-weight: 600;\n  margin-top: 2rem;\n  color: #000000;\n  text-align: left;\n}\n\n#performance-bar {\n  color: #000000;\n  height: 5rem;\n}\n\n.legend-metric-title {\n  text-align: left;\n  margin-top: 1.5rem;\n}\n\n.legend-metric {\n  font-weight: 500;\n  margin-top: 0.2rem;\n  margin-bottom: 0.5rem;\n}\n\n.bar {\n  width: 100%;\n  height: 1rem;\n}\n\n.marker {\n  display: inline-block;\n  border-right: 2px solid black;\n  height: 2rem;\n  position: relative;\n  top: -24px;\n}\n\n.good {\n  background-color: #0cce6a;\n}\n\n.fair {\n  background-color: #ffa400;\n}\n\n.poor {\n  background-color: #ff4e43;\n}\n\n#form,\n#input,\n#performance-bars-container-legend,\nbutton,\n.legend-metric-title,\n.legend-metric {\n  font-size: 1rem;\n}\n\n@media only screen and (max-width: 600px) {\n  #form,\n  #input,\n  #performance-bars-container-legend,\n  button,\n  .legend-metric-title,\n  .legend-metric {\n    font-size: 0.8rem;\n  }\n\n  .legend-metric-title {\n    margin-top: 0.6rem;\n  }\n\n  #performance-bars-container-legend {\n    margin-top: 1rem;\n  }\n\n  #container {\n    min-height: 25rem;\n  }\n}\n</style>\n<div id="container">\n  ${(n=>`<form id="form">\n  <input id="input" name="website" placeholder="${n["input.placeholder"]}"/>\n  <button>${n["button.analyze"]}</button>\n</form>`)(n)}\n</div>`,a.appendChild(m.content.cloneNode(!0));const f=s(a),u=(n=>n.getElementById("form"))(a),g=d(a);let h;function b(e){return t(this,void 0,void 0,(function*(){var m,u,b;e.preventDefault(),p(a),function(n){const e=(n=>n.getElementById("performance-bars-container"))(n);e&&s(n).removeChild(e);const t=(n=>n.getElementById("no-data"))(n);t&&s(n).removeChild(t)}(a),h&&h.abort(),h=new AbortController;const v=new FormData(e.target),{website:w}=Object.fromEntries(v),{isValid:y,httpUrl:E}=function(n){if(!n.startsWith("https://")&&!n.startsWith("http://"))return Boolean(n.match(o))?{isValid:!0,httpUrl:`https://${n}`}:{isValidUrl:!1,httpUrl:""};return{isValid:Boolean(n.match(r)),httpUrl:n}}(w);if(y){!function(n){const e=c(n);e&&s(n).removeChild(e);const t=d(n);t.classList.contains("error")&&t.classList.remove("error")}(a),function(n,e){const t=document.createElement("template");t.innerHTML=e,n.appendChild(t.content.cloneNode(!0))}(f,'<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" id="loading-spinner">\n  <path fill="#475569" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/>\n  <path fill="#475569" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">\n    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>\n  </path>\n</svg>\n');try{const e=yield function(n,e){return t(this,void 0,void 0,(function*(){return fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(n)}&category=PERFORMANCE&strategy=MOBILE`,{signal:e.signal,headers:{"Content-Type":"application/json"}}).then((n=>{if(!n.ok)throw"Unable to fetch data, status: response.status";return n.json()}))}))}(E,h);p(a),function(n,e,t){const r=document.createElement("div");r.id="performance-bars-container",s(e).appendChild(r),i.forEach((e=>{if(void 0===n[e])return;const o=document.createElement("template");o.innerHTML=l(n[e],e,t),r.appendChild(o.content.cloneNode(!0))}));const o=document.createElement("div");o.id="performance-bars-container-legend",o.innerHTML=t["performance-bar.legend"],r.appendChild(o)}({lcp:null===(m=e.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS)||void 0===m?void 0:m.percentile,inp:null===(u=e.originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT)||void 0===u?void 0:u.percentile,cls:null===(b=e.originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE)||void 0===b?void 0:b.percentile},a,n)}catch(e){console.error("Unable to fetch peformance data: ",e),p(a),function(n,e){const t=document.createElement("span");t.id="no-data",t.innerHTML=e["span.no-data"],n.appendChild(t)}(f,n)}}else!function(n){n.classList.contains("errror")||n.classList.add("error")}(g),function(n,e,t){if(!c(e)){const e=document.createElement("span");e.id="span-error",e.innerHTML=t["span.error"],n.appendChild(e)}}(f,a,n);return!1}))}u.addEventListener("submit",b)}catch(v){console.log(v)}}}customElements.define("website-analyzer",m),n.WebsiteAnalyzer=m}({});
