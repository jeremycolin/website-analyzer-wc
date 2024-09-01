const PAGE_SPEED_INSIGHTS_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const category = "PERFORMANCE";
const strategy = "MOBILE";

export async function fetchPerformanceData(
  website: string,
  controller: AbortController
): Promise<{
  lcp?: number;
  cls?: number;
  inp?: number;
}> {
  return fetch(
    `${PAGE_SPEED_INSIGHTS_API}?url=${encodeURIComponent(website)}&category=${category}&strategy=${strategy}`,
    {
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw `Unable to fetch data, status: response.status`;
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        return Promise.reject(data);
      }
      return {
        lcp: data.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
        inp: data.originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT?.percentile,
        cls: data.originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,
      };
    });
}
