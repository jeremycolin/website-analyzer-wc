import "./style.css";
import "website-analyzer-wc";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Web Analyzer Web Component Demo with Vite + TS</h1>
    <website-analyzer />
  </div>
`;
