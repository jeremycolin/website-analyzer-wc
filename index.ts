import style from "./style.css?inline";
import formHtml from "./form.html?raw";
import spinnerHtml from "./spinner.html?raw";
import { performanceBar } from "./performance-bar";
import { isValidUrl } from "./url-check";

const getContainer = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("container") as HTMLDivElement;
const getForm = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("form") as HTMLFormElement;
const getInput = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("input") as HTMLFormElement;
const getSpanError = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("span-error") as HTMLSpanElement;
const getLoadingSpinner = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("loading-spinner");
const getPeformanceBar = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("performance-bar") as HTMLDivElement;

customElements.define(
  "website-analyzer",
  class extends HTMLElement {
    constructor() {
      super();

      try {
        const shadowRoot = this.attachShadow({
          mode: "open",
        });
        const template = document.createElement("template");
        template.innerHTML = `<style>${style}</style>
<div id="container">
    ${formHtml}
</div>`;

        shadowRoot.appendChild(template.content.cloneNode(true));

        const form = getForm(shadowRoot);
        const input = getInput(shadowRoot);

        function cleanLoading() {
          const loadingSpinner = getLoadingSpinner(shadowRoot);
          if (loadingSpinner) {
            getContainer(shadowRoot)!.removeChild(loadingSpinner);
          }
        }

        function cleanResult() {
          const performanceBar = getPeformanceBar(shadowRoot);
          if (performanceBar) {
            getContainer(shadowRoot)!.removeChild(performanceBar);
          }
        }

        function cleanErrors() {
          const spanError = getSpanError(shadowRoot);
          if (spanError) {
            input.classList.remove("error");
            getContainer(shadowRoot)!.removeChild(spanError);
          }
        }

        let controller: AbortController;

        function logSubmit(event: any) {
          event.preventDefault();
          cleanLoading();
          cleanResult();

          if (controller) {
            controller.abort();
            console.log("Fetch aborted");
          }
          controller = new AbortController();

          const formData = new FormData(event.target);
          const { website } = Object.fromEntries(formData) as {
            website: string;
          };
          const valid = isValidUrl(website);
          // checking if website is valid
          if (!valid) {
            // adding error border to input if not existing
            if (!input.classList.contains("errror")) {
              input.classList.add("error");
            }
            // adding error span if not existing
            if (!getSpanError(shadowRoot)) {
              const spanError = document.createElement("span");
              spanError.id = "span-error";
              spanError.innerHTML = "Enter a valid URL";
              getContainer(shadowRoot)!.appendChild(spanError);
            }
          } else {
            cleanErrors();
            const spinnerSvg = document.createElement("template");
            spinnerSvg.innerHTML = spinnerHtml;
            getContainer(shadowRoot)!.appendChild(
              spinnerSvg.content.cloneNode(true)
            );

            fetch(
              `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
                website
              )}
            &category=PERFORMANCE&strategy=DESKTOP`,
              {
                signal: controller.signal,
              }
            )
              .then((response) => response.json())
              .then((json) => {
                cleanLoading();

                const value =
                  json.originLoadingExperience.metrics
                    .LARGEST_CONTENTFUL_PAINT_MS.percentile;

                const performanceBarTemplate =
                  document.createElement("template");
                performanceBarTemplate.innerHTML = performanceBar({ value });
                getContainer(shadowRoot)!.appendChild(
                  performanceBarTemplate.content.cloneNode(true)
                );
              });
          }

          return false;
        }
        form.addEventListener("submit", logSubmit);
      } catch (error) {
        console.log(error);
      }
    }
    // connectedCallback() {
    //   console.log("Custom element added to the page");
    // }
    // disconnectedCallback() {
    //   console.log("Custom element removed from page.");
    // }
    // adoptedCallback() {
    //   console.log("Custom element moved to new page.");
    // }
    // attributeChangedCallback(name: string) {
    //   console.log(`Attribute ${name} has changed.`);
    // }
  }
);
