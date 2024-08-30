const PAGE_SPEED_INSIGHTS_API =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const category = "PERFORMANCE";
const strategy = "MOBILE";

export async function fetchPerformanceData(
  website: string,
  controller: AbortController
): Promise<{
  originLoadingExperience: {
    metrics: {
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile?: number };
      INTERACTION_TO_NEXT_PAINT?: { percentile?: number };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile?: number };
    };
  };
}> {
  return fetch(
    `${PAGE_SPEED_INSIGHTS_API}?url=${encodeURIComponent(
      website
    )}&category=${category}&strategy=${strategy}`,
    {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    if (!response.ok) {
      throw `Unable to fetch data, status: response.status`;
    }
    return response.json();
  });
}
