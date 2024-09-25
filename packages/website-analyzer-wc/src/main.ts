import style from "./style.css";
import { formHtml } from "./templates/form";
import spinnerHtml from "./templates/spinner.html";
import { isValidUrl } from "./url-check";
import {
  getContainer,
  getForm,
  getInput,
  cleanLoading,
  cleanResult,
  cleanErrors,
  addErrorToInput,
  addErrorSpan,
  addLoadingSpinner,
  addPerformanceBars,
  addNoDataSpan,
} from "./dom-utils";
import { fetchPerformanceData } from "./performance/apis/pagespeed-insights";
import { Translations } from "./translations";

export interface Configuration {
  "background-color"?: string;
  "text-color"?: string;
  "button-color"?: string;
  "button-text-color"?: string;
  "spinner-color"?: string;
  "font-size"?: string;
  "form-height"?: string;
  "min-container-height"?: string;
  "legend-link-color"?: string;
}

const configuration: Array<keyof Configuration> = [
  "background-color",
  "text-color",
  "button-color",
  "button-text-color",
  "spinner-color",
  "font-size",
  "form-height",
  "min-container-height",
  "legend-link-color",
];

export class WebsiteAnalyzer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const translations = TRANSLATIONS as Translations;

    try {
      const shadowRoot = this.attachShadow({
        mode: "open",
      });
      const template = document.createElement("template");
      template.innerHTML = html`<style>
          ${style}
        </style>
        <div id="container">${formHtml(translations)}</div>`;

      shadowRoot.appendChild(template.content.cloneNode(true));

      const container = getContainer(shadowRoot);

      // apply configuration styles
      configuration.forEach((key) => {
        if (this.hasAttribute(key)) {
          container.style.setProperty(`--wa-wc-${key}`, this.getAttribute(key));
        }
      });

      const form = getForm(shadowRoot);
      const input = getInput(shadowRoot);

      let controller: AbortController;

      async function logSubmit(event: Event) {
        event.preventDefault();
        cleanLoading(shadowRoot);
        cleanResult(shadowRoot);

        if (controller) {
          controller.abort(); // abort previous fetch request
        }
        controller = new AbortController();

        const formData = new FormData(event.target as HTMLFormElement);
        const { website } = Object.fromEntries(formData) as {
          website: string;
        };
        const { isValid, httpUrl } = isValidUrl(website);
        if (!isValid) {
          addErrorToInput(input);
          addErrorSpan(container, shadowRoot, translations);
        } else {
          cleanErrors(shadowRoot);
          addLoadingSpinner(container, spinnerHtml);

          try {
            const data = await fetchPerformanceData(httpUrl, controller);
            cleanLoading(shadowRoot);
            addPerformanceBars(data, shadowRoot, translations);
          } catch (error) {
            console.error("Unable to fetch peformance data: ", error);
            cleanLoading(shadowRoot);
            addNoDataSpan(container, translations);
          }
        }
        return false;
      }
      form.addEventListener("submit", logSubmit);
    } catch (error) {
      console.log(error);
    }
  }
}

customElements.define("website-analyzer", WebsiteAnalyzer);
