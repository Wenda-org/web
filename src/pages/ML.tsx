import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Brain, Play, TrendingUp, Target } from "lucide-react";
import { StatCard } from "../components/StatCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import "../i18n/config";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import {
  useMlHealth,
  useRecommend,
  useModels,
  useJobs,
  useForecast,
  useSegments,
} from "../hooks/useMl";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { getMlJob } from "../api/ml";
import type { JobItem } from "../api/ml";
import Terminal from "../components/Terminal";

export function ML() {
  const { t } = useTranslation();

  const { data: health, loading: healthLoading } = useMlHealth();
  const {
    data: recData,
    loading: recLoading,
    error: recError,
    runRecommend,
  } = useRecommend();
  const {
    data: modelsData,
    loading: modelsLoading,
    error: modelsError,
  } = useModels();

  const current = new Date();
  const currentYear = current.getFullYear();
  const [province, setProvince] = useState<string>("Luanda");
  const [month, setMonth] = useState<number>(current.getMonth() + 1);
  const [year, setYear] = useState<number>(currentYear);
  const [forecastErrors, setForecastErrors] = useState<{
    province?: string;
    month?: string;
    year?: string;
  }>({});

  const {
    data: forecastData,
    loading: forecastLoading,
    error: forecastError,
    runForecast,
  } = useForecast();

  const [isForecastValid, setIsForecastValid] = useState<boolean>(true);

  useEffect(() => {
    const errs: { province?: string; month?: string; year?: string } = {};
    if (!province || !province.trim())
      errs.province = t("ml.forecast.errors.province") || "Required";
    if (!Number.isInteger(month) || month < 1 || month > 12)
      errs.month = t("ml.forecast.errors.month") || "Month must be 1-12";
    if (!Number.isInteger(year) || year < currentYear)
      errs.year =
        t("ml.forecast.errors.year") || `Year must be >= ${currentYear}`;
    setForecastErrors(errs);
    setIsForecastValid(Object.keys(errs).length === 0);
  }, [province, month, year, t]);
  // Jobs UI is rendered only if the ML health advertises the 'jobs' endpoint.
  // The actual jobs hook and state live inside JobsPanel to avoid calling
  // the hook when the feature isn't available.

  function JobsPanel() {
    const {
      data: jobsData,
      loading: jobsLoading,
      error: jobsError,
      refetch: refetchJobs,
      createJob,
    } = useJobs();

    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
      if (jobsData?.data?.length)
        setSelectedJobId((prev) => prev ?? jobsData.data[0].id);
    }, [jobsData]);

    const selectedJob =
      jobsData?.data?.find((j) => j.id === selectedJobId) || null;

    const [jobDetails, setJobDetails] = useState<JobItem | null>(null);
    const [jobDetailsLoading, setJobDetailsLoading] = useState(false);
    const [jobDetailsError, setJobDetailsError] = useState<string | null>(null);

    useEffect(() => {
      if (!selectedJobId) {
        setJobDetails(null);
        return;
      }
      let cancelled = false;
      setJobDetailsLoading(true);
      setJobDetailsError(null);
      getMlJob(selectedJobId)
        .then((res) => {
          if (!cancelled) setJobDetails(res);
        })
        .catch((err) => {
          if (!cancelled) setJobDetailsError(err?.message || String(err));
        })
        .finally(() => {
          if (!cancelled) setJobDetailsLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, [selectedJobId]);

    const handleCreateJob = async () => {
      try {
        await createJob({ type: "retrain" });
        // refresh list
        refetchJobs().catch(() => {});
      } catch (e) {
        // noop
      }
    };

    return (
      <>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>{t("ml.training_jobs")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {jobsLoading ? (
                <p className="text-muted-foreground">
                  {t("loading") || "A carregar..."}
                </p>
              ) : jobsError ? (
                <p className="text-destructive">{jobsError}</p>
              ) : jobsData?.data?.length ? (
                jobsData.data.map((job) => (
                  <div
                    key={job.id}
                    className={`space-y-2 p-2 rounded-md ${
                      selectedJobId === job.id
                        ? "ring-2 ring-offset-1 ring-primary/40"
                        : ""
                    } cursor-pointer`}
                    onClick={() => setSelectedJobId(job.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-[#136F63]" />
                        <div>
                          <p>{job.type || job.name || "Job"}</p>
                          <p className="text-muted-foreground">
                            {job.created_at || job.lastRun}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`rounded-lg ${
                          job.status === "finished"
                            ? "bg-[#06D6A0] hover:bg-[#06D6A0]/90"
                            : "bg-[#FFD166] text-[#050505] hover:bg-[#FFD166]/90"
                        }`}
                      >
                        {t(`ml.status.${job.status}`) || job.status}
                      </Badge>
                    </div>
                    <Progress value={job.progress ?? 0} className="h-2" />
                    {job.accuracy && (
                      <p className="text-muted-foreground">
                        Accuracy: {(job.accuracy * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No jobs available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Job Console</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">
                  {selectedJobId
                    ? `Selected job: ${selectedJobId}`
                    : "No job selected"}
                </div>
                <div>
                  <Button
                    onClick={handleCreateJob}
                    className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-md"
                  >
                    <Play className="w-4 h-4 mr-2" /> {t("ml.buttons.retrain")}
                  </Button>
                </div>
              </div>
              <Terminal lines={jobDetails?.logs || selectedJob?.logs || []} />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  useEffect(() => {
    // load sample recommendations on mount with a safe default
    runRecommend({ limit: 5 }).catch(() => {});
    // run a default forecast for the current month/province on mount if inputs valid
    if (isForecastValid) {
      runForecast({ province, month, year }).catch(() => {});
    }
  }, [runRecommend, runForecast, isForecastValid, province, month, year]);

  // load sample recommendations on mount with a safe default

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t("nav.ml")}</h1>
          <p className="text-muted-foreground mt-1">{t("ml.description")}</p>
        </div>
        <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
          <Play className="w-5 h-5 mr-2" />
          {t("ml.buttons.retrain")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t("ml.kpis.model_accuracy")}
          value="89.2%"
          icon={Target}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title={t("ml.kpis.recommendations_served")}
          value="42.3k"
          icon={TrendingUp}
          subtitle={t("dashboard.subtitles.last_7_days")}
        />
        <StatCard title={t("ml.kpis.active_models")} value="3" icon={Brain} />
      </div>

      {/* Forecast widget */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>{t("ml.forecast.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <Label>{t("ml.forecast.province")}</Label>
              <Input
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
              {forecastErrors.province && (
                <p className="text-destructive text-sm mt-1">
                  {forecastErrors.province}
                </p>
              )}
            </div>
            <div>
              <Label>{t("ml.forecast.month")}</Label>
              <Input
                value={String(month)}
                onChange={(e) => setMonth(Number(e.target.value) || 1)}
              />
              {forecastErrors.month && (
                <p className="text-destructive text-sm mt-1">
                  {forecastErrors.month}
                </p>
              )}
            </div>
            <div>
              <Label>{t("ml.forecast.year")}</Label>
              <Input
                value={String(year)}
                onChange={(e) =>
                  setYear(Number(e.target.value) || current.getFullYear())
                }
              />
              {forecastErrors.year && (
                <p className="text-destructive text-sm mt-1">
                  {forecastErrors.year}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
              <Button
                onClick={() => {
                  if (!isForecastValid) return;
                  runForecast({ province, month, year }).catch(() => {});
                }}
                disabled={!isForecastValid || forecastLoading}
                className="mt-2 bg-[#136F63] hover:bg-[#0F5A51] text-white"
              >
                {t("ml.forecast.get")}
              </Button>
            </div>
          </div>

          <div className="mt-4">
            {forecastLoading ? (
              <p className="text-muted-foreground">
                {t("loading") || "A carregar..."}
              </p>
            ) : forecastError ? (
              <p className="text-destructive">{String(forecastError)}</p>
            ) : forecastData ? (
              <div>
                <p className="font-medium">
                  {forecastData.province} — {forecastData.month}/
                  {forecastData.year}
                </p>
                <p className="text-2xl font-semibold">
                  Predicted visitors: {forecastData.predicted_visitors}
                </p>
                <p className="text-muted-foreground">
                  Confidence: {forecastData.confidence_interval?.lower} —{" "}
                  {forecastData.confidence_interval?.upper}
                </p>
                <p className="text-sm text-muted-foreground">
                  Model: {forecastData.model_version} · Generated:{" "}
                  {forecastData.generated_at}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {t("ml.forecast.no_data")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ML Health quick info */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>ML Health</CardTitle>
        </CardHeader>
        <CardContent>
          {healthLoading ? (
            <p className="text-muted-foreground">
              {t("loading") || "A carregar..."}
            </p>
          ) : health ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-muted-foreground">{health.status}</p>
                </div>
                <div>
                  <p className="font-medium">Trained models</p>
                  <p className="text-muted-foreground">
                    {health.trained_models ?? 0}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Model status</p>
                  <p className="text-muted-foreground">
                    {health.model_status ?? "unknown"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Module</p>
                  <p className="text-muted-foreground">
                    {health.module ?? "ml"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Timestamp</p>
                  <p className="text-muted-foreground">
                    {health.timestamp ?? "-"}
                  </p>
                </div>
              </div>
              {health.endpoints && (
                <div>
                  <p className="font-medium">Endpoints</p>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {health.endpoints.map((e: string) => (
                      <Badge key={e}>{e}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No health info</p>
          )}
        </CardContent>
      </Card>

      {/* Models panel */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Models</CardTitle>
        </CardHeader>
        <CardContent>
          {modelsLoading ? (
            <p className="text-muted-foreground">
              {t("loading") || "A carregar..."}
            </p>
          ) : modelsError ? (
            <p className="text-destructive">{modelsError}</p>
          ) : modelsData && modelsData.models.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelsData.models.map((m) => (
                <div
                  key={m.model_name + m.version}
                  className="p-3 rounded-md border border-border"
                >
                  <p className="font-medium">
                    {m.model_name}{" "}
                    <span className="text-muted-foreground">v{m.version}</span>
                  </p>
                  <p className="text-muted-foreground">
                    {m.algorithm} · {m.status}
                  </p>
                  {m.model_type && (
                    <p className="text-sm text-muted-foreground">
                      Type: {m.model_type}
                    </p>
                  )}
                  {m.trained_on && (
                    <p className="text-sm text-muted-foreground">
                      Trained: {m.trained_on}
                    </p>
                  )}
                  {m.metrics && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Metrics:{" "}
                      {Object.keys(m.metrics)
                        .map((k) => `${k}: ${m.metrics?.[k]}`)
                        .join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No models available</p>
          )}
        </CardContent>
      </Card>

      {health?.endpoints?.includes("jobs") && <JobsPanel />}

      {/* Segments panel */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Segments</CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const {
              data: segmentsData,
              loading: segmentsLoading,
              error: segmentsError,
            } = useSegments();
            if (segmentsLoading)
              return (
                <p className="text-muted-foreground">
                  {t("loading") || "A carregar..."}
                </p>
              );
            if (segmentsError)
              return <p className="text-destructive">{segmentsError}</p>;
            if (!segmentsData || !segmentsData.segments?.length)
              return (
                <p className="text-muted-foreground">No segments available</p>
              );
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {segmentsData.segments.map((s) => (
                  <div
                    key={s.segment_id}
                    className="p-3 rounded-md border border-border"
                  >
                    <p className="font-medium">
                      {s.name}{" "}
                      <span className="text-muted-foreground">
                        ({s.segment_id})
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {s.description}
                    </p>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Typical: {(s.typical_destinations || []).join(", ")}
                    </div>
                    <div className="mt-1 text-sm">
                      Budget: {s.avg_budget} ·{" "}
                      {typeof s.percentage === "number"
                        ? `${s.percentage}%`
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </CardContent>
      </Card>
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>{t("ml.sample_recommendations")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recLoading && (
              <p className="text-muted-foreground">
                {t("loading") || "A carregar..."}
              </p>
            )}
            {recError && <p className="text-destructive">{recError}</p>}
            {!recLoading &&
              !recError &&
              (recData?.recommendations?.length ? (
                recData!.recommendations.map((rec, index) => (
                  <div
                    key={`${rec.destination_id ?? index}`}
                    className="p-3 rounded-xl bg-muted"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">
                          {rec.name}{" "}
                          <span className="text-sm text-muted-foreground">
                            {rec.destination_id
                              ? `(${rec.destination_id})`
                              : ""}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {rec.province}
                          {rec.category ? ` · ${rec.category}` : ""}
                        </p>
                        {rec.description && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {rec.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          {typeof rec.rating_avg === "number" && (
                            <p className="text-sm">
                              ★ {rec.rating_avg.toFixed(1)}
                            </p>
                          )}
                          {rec.reason && (
                            <p className="text-sm text-muted-foreground">
                              {rec.reason}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-[#136F63] hover:bg-[#136F63]/90 rounded-lg">
                          {t("ml.confidence_label", {
                            percent: Math.round((rec.score || 0) * 100),
                          })}
                        </Badge>
                        {rec.destination_id && (
                          <Link
                            to={`/destinations/${rec.destination_id}`}
                            className="text-sm text-primary"
                          >
                            Ver destino
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  {t("no_data") || "Sem recomendações disponíveis"}
                </p>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
