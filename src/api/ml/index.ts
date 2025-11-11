export { forecastVisitors } from "./forecast";
export type { ForecastRequest, ForecastResponse } from "./forecast";
export { recommendDestinations } from "./recommend";
export type { RecommendRequest, RecommendResponse } from "./recommend";
export { getMlSegments } from "./segments";
export type { SegmentsResponse } from "./segments";
export { getMlHealth } from "./health";
export type { MlHealthResponse } from "./health";
export { mlApiBaseUrl } from "./config";
export { getMlModels } from "./models";
export type { ModelsResponse } from "./models";
export { listMlJobs, createMlJob, getMlJob, cancelMlJob } from "./jobs";
export type { JobItem, JobsResponse } from "./jobs";

import { forecastVisitors } from "./forecast";
import { recommendDestinations } from "./recommend";
import { getMlSegments } from "./segments";
import { getMlHealth } from "./health";
import { getMlModels } from "./models";
import { listMlJobs, createMlJob, getMlJob, cancelMlJob } from "./jobs";

const mlApi = {
  forecastVisitors,
  recommendDestinations,
  getMlSegments,
  getMlHealth,
  getMlModels,
  listMlJobs,
  createMlJob,
  getMlJob,
  cancelMlJob,
};

export default mlApi;
