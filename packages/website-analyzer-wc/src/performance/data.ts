export type Vital = "lcp" | "inp" | "cls";
export const VITALS: Array<Vital> = ["lcp", "cls", "inp"];
export type Range = "good" | "fair" | "poor";

export const THRESHOLDS = {
  lcp: { fair: 2500, poor: 4000, display: 4000 },
  inp: { fair: 200, poor: 500, display: 50 },
  cls: { fair: 0.1, poor: 0.25, display: 0.2 },
};

export interface Metric {
  fair: number;
  poor: number;
  displayEnd: number;
  value: number;
}

export const recommendationMetricAlgo = ({
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
    markerAdjust: range === "good" ? 4 : 2,
  };
};
