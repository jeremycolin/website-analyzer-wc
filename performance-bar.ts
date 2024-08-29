export const performanceBar = ({ value }: { value: number }) => {
  const formattedMetric = `${(value / 1000).toFixed(2)}s`;

  const { goodGrow, fairGrow, poorGrow, metricPos } = recommendationMetricAlgo({
    fair: 2500,
    poor: 4000,
    displayEnd: 4000,
    value,
  });

  return `<div id="performance-bar">
  <div class="legend legend-top">
    Page load time measured with <a href="https://web.dev/articles/lcp">LCP</a> at the 75th percentile on desktop
  </div>
  <div class="legend" style="padding-left: ${metricPos}%;">${formattedMetric}
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
    <div class="marker" style="padding-left: ${metricPos}%;"></div>
</div>`;
};

export interface Metric {
  fair: number;
  poor: number;
  displayEnd: number;
  value: number;
}

const recommendationMetricAlgo = ({
  fair,
  poor,
  value,
  displayEnd,
}: Metric) => {
  const range: "good" | "fair" | "poor" =
    value < fair ? "good" : value < poor ? "fair" : "poor";

  let end = displayEnd; // good number for LCP

  // by default, we will scale the bar with good and fair Google recommendations only
  const mustIncludePoor = range === "poor";
  if (mustIncludePoor || value > end * 0.95) {
    // when the metric is in the poor range, the metric will be on the far right with a small 10% buffer
    end = value * 1.14;
  }

  const goodGrow = Math.min(fair, end) / end;
  const fairGrow = (Math.min(poor, end) - Math.min(fair, end)) / end;
  const poorGrow = (end - Math.min(poor, end)) / end;
  const metricPos = Math.round((value / end) * 10000 + Number.EPSILON) / 100;

  return {
    goodGrow,
    fairGrow,
    poorGrow,
    metricPos,
  };
};

const middleMetricAlgo = ({ fair, poor, value }: Metric) => {
  const end = value * 2;
  const goodGrow = Math.min(fair, end) / end;
  const fairGrow = (Math.min(poor, end) - Math.min(fair, end)) / end;
  const poorGrow = (end - Math.min(poor, end)) / end;
  const metricPos = 50;
  return { goodGrow, fairGrow, poorGrow, metricPos };
};
