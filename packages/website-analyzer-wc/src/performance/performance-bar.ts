import { Translations } from "../translations";
import { recommendationMetricAlgo, THRESHOLDS, Vital } from "./data";

const formatMetric = (vital: Vital, value: number) => {
  switch (vital) {
    case "inp": {
      return `${Math.round(value)}ms`;
    }
    case "cls": {
      return `${value.toFixed(3)}`;
    }
    default: {
      return `${(value / 1000).toFixed(2)}s`;
    }
  }
};

export const performanceBar = (value: number, metric: Vital, translations: Translations) => {
  const formattedMetric = formatMetric(metric, value);

  const { goodGrow, fairGrow, poorGrow, metricPos, markerAdjust } = recommendationMetricAlgo({
    fair: THRESHOLDS[metric].fair,
    poor: THRESHOLDS[metric].poor,
    displayEnd: THRESHOLDS[metric].display,
    value,
  });

  return html`<div id="performance-bar">
    <div class="legend-metric-title">
      ${translations[`${metric}.legend`]}
      <a href="https://web.dev/${metric}">${metric.toUpperCase()}</a>
    </div>
    <div
      class="legend-metric"
      style="padding-left: calc(${metricPos}% - ${markerAdjust}px - ${formattedMetric.length * 4}px);"
    >
      ${formattedMetric}
    </div>
    <div style="display: flex">
      <span style="flex-grow: ${goodGrow}; margin-right: 1px;">
        <div class="good bar"></div>
      </span>
      <span style="flex-grow: ${fairGrow}; margin-left: 1px; margin-right: 1px">
        <div class="fair bar"></div>
      </span>
      <span style="flex-grow: ${poorGrow}; margin-left: 1px">
        <div class="poor bar"></div>
      </span>
    </div>
    <div class="marker" style="padding-left: calc(${metricPos}% - ${markerAdjust}px);"></div>
  </div>`;
};
