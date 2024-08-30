import { VITALS } from "./performance/data";
import { performanceBar } from "./performance/performance-bar";
import { Translations } from "./translations";

export const getContainer = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("container") as HTMLDivElement;

export const getForm = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("form") as HTMLFormElement;

export const getInput = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("input") as HTMLFormElement;

export const getSpanError = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("span-error") as HTMLSpanElement | null;

export const getLoadingSpinner = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("loading-spinner") as HTMLElement | null;

export const getResults = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById(
    "performance-bars-container"
  ) as HTMLDivElement | null;

export const getNoData = (shadowRoot: ShadowRoot) =>
  shadowRoot.getElementById("no-data") as HTMLSpanElement | null;

export function addErrorToInput(input: HTMLFormElement) {
  if (!input.classList.contains("errror")) {
    input.classList.add("error");
  }
}

export function addErrorSpan(
  container: HTMLDivElement,
  shadowRoot: ShadowRoot,
  translations: Translations
) {
  if (!getSpanError(shadowRoot)) {
    const spanError = document.createElement("span");
    spanError.id = "span-error";
    spanError.innerHTML = translations["span.error"];
    container.appendChild(spanError);
  }
}

export function cleanLoading(shadowRoot: ShadowRoot) {
  const loadingSpinner = getLoadingSpinner(shadowRoot);
  if (loadingSpinner) {
    getContainer(shadowRoot).removeChild(loadingSpinner);
  }
}

export function cleanResult(shadowRoot: ShadowRoot) {
  const results = getResults(shadowRoot);
  if (results) {
    getContainer(shadowRoot).removeChild(results);
  }
  const noDataSpan = getNoData(shadowRoot);
  if (noDataSpan) {
    getContainer(shadowRoot).removeChild(noDataSpan);
  }
}

export function cleanErrors(shadowRoot: ShadowRoot) {
  const spanError = getSpanError(shadowRoot);
  if (spanError) {
    getContainer(shadowRoot).removeChild(spanError);
  }
  const input = getInput(shadowRoot);
  if (input.classList.contains("error")) {
    input.classList.remove("error");
  }
}

export function addLoadingSpinner(
  container: HTMLDivElement,
  spinnerHtml: string
) {
  const spinnerSvg = document.createElement("template");
  spinnerSvg.innerHTML = spinnerHtml;
  container.appendChild(spinnerSvg.content.cloneNode(true));
}

export function addNoDataSpan(
  container: HTMLDivElement,
  translations: Translations
) {
  const noDataSpan = document.createElement("span");
  noDataSpan.id = "no-data";
  noDataSpan.innerHTML = translations["span.no-data"];
  container.appendChild(noDataSpan);
}

export function addPerformanceBars(
  data: { lcp?: number; inp?: number; cls?: number },
  shadowRoot: ShadowRoot,
  translations: Translations
) {
  const performanceBarsContainer = document.createElement("div");
  performanceBarsContainer.id = "performance-bars-container";

  getContainer(shadowRoot).appendChild(performanceBarsContainer);
  VITALS.forEach((metric) => {
    if (typeof data[metric] === "undefined") {
      return;
    }
    const performanceBarTemplate = document.createElement("template");
    performanceBarTemplate.innerHTML = performanceBar(
      data[metric],
      metric,
      translations
    );
    performanceBarsContainer.appendChild(
      performanceBarTemplate.content.cloneNode(true)
    );
  });

  const legend = document.createElement("div");
  legend.id = "performance-bars-container-legend";
  legend.innerHTML = translations["performance-bar.legend"];
  performanceBarsContainer.appendChild(legend);
}
