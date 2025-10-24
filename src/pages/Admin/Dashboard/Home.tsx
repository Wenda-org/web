import { useEffect, useState } from "react";
import axios from "axios";
import PageMeta from "../../../components/Admin/common/PageMeta";
import { AlertIcon, ArrowDownIcon, ArrowUpIcon, BoltIcon } from "../../../icons";
import Badge from "../../../components/Admin/ui/badge/Badge";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const apiUrl = import.meta.env.VITE_API_URL;

const defaultProvinces = [
  { name: "Luanda", image: "./images/country/luanda.svg", reports: 3200 },
  { name: "Benguela", image: "./images/country/benguela.svg", reports: 1780 },
  { name: "Huíla", image: "./images/country/huila.svg", reports: 950 },
  { name: "Huambo", image: "./images/country/huambo.svg", reports: 840 },
  { name: "Malanje", image: "./images/country/malanje.svg", reports: 580 },
];

interface Address {
  name: string;
  reports: number;
}

interface Report {
  status: "PENDING" | "CONFIRMED" | string;
  createdAt: string;
  address?: string;
}

export default function Home() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [totalReportsCount, setTotalReportsCount] = useState(0);
  const [monthlyCounts, setMonthlyCounts] = useState<number[]>(Array(12).fill(0));
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [topAreas, setTopAreas] = useState<Address[]>([]);
  const [totalAreasReports, setTotalAreasReports] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [resApp, resUSSD] = await Promise.all([
          axios.get(`${apiUrl}/report`),
          axios.get(`${apiUrl}/ussd-reports`)
        ]);

        const normalizeReport = (r: any): Report => ({
          status: r.status || r.estado || "PENDING",
          createdAt: r.createdAt || r.data_criacao || new Date().toISOString(),
          address: r.address || r.localizacao || "Endereço desconhecido",
        });

        const combined = [
          ...resApp.data.map(normalizeReport),
          ...resUSSD.data.map(normalizeReport)
        ];

        setReports(combined);
        processReportsData(combined);
      } catch (error) {
        console.error("Erro ao buscar relatórios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const processReportsData = (data: Report[]) => {
    const pending = data.filter(r => r.status === "PENDING").length;
    const resolved = data.filter(r => r.status === "CONFIRMED").length;
    setPendingCount(pending);
    setResolvedCount(resolved);
    setTotalReportsCount(data.length);

    const total = pending + resolved;
    const progress = total > 0 ? (resolved / total) * 100 : 0;
    setMonthlyProgress(Math.round(progress * 10) / 10);

    const counts = Array(12).fill(0);
    const year = new Date().getFullYear();
    data.forEach((r) => {
      const date = new Date(r.createdAt);
      if (date.getFullYear() === year) {
        counts[date.getMonth()]++;
      }
    });
    setMonthlyCounts(counts);

    const countByAddress: Record<string, number> = {};
    data.forEach((r) => {
      const address = r.address || "Endereço desconhecido";
      countByAddress[address] = (countByAddress[address] || 0) + 1;
    });

    const top = Object.entries(countByAddress)
      .map(([name, reports]) => ({ name, reports }))
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 10);

    setTopAreas(top);
    setTotalAreasReports(top.reduce((sum, area) => sum + area.reports, 0));
  };

  const seriesRadial = [monthlyProgress];
  const optionsRadial: ApexOptions = {
    chart: {
      type: "radialBar",
      fontFamily: "Outfit, sans-serif",
      height: 250,
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "70%" },
        dataLabels: {
          name: { offsetY: 15, fontSize: "14px", color: "#888" },
          value: {
            offsetY: -25,
            fontSize: "20px",
            fontWeight: 600,
            color: "#111827",
            formatter: val => `${val}%`
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#00A8FF"],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: { lineCap: "round" },
    labels: ["Progresso"],
  };

  const optionsBar: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    grid: { yaxis: { lines: { show: true } } },
    tooltip: {
      y: { formatter: (val: number) => `${val}` }
    },
  };

  const seriesBar = [{ name: "Casos", data: monthlyCounts }];

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <svg className="animate-spin h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="mt-2 text-gray-600 text-sm">Carregando dados...</span>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="MapaZZZ" description="" />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <MetricCard icon={<BoltIcon />} label="Todos os casos resolvidos" value={resolvedCount} badgeColor="success" />
            <MetricCard icon={<AlertIcon />} label="Todos os casos registrados" value={totalReportsCount} badgeColor="error" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Zonas de risco registradas mensalmente</h3>
            <Chart options={optionsBar} series={seriesBar} type="bar" height={180} />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 pt-5 pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-1">Este mês</h3>
              <p className="text-gray-500 text-theme-sm dark:text-gray-400 mb-4">Casos resolvidos em relação aos pendentes</p>
              <Chart options={optionsRadial} series={seriesRadial} type="radialBar" height={330} />
            </div>

            <div className="flex items-center justify-center gap-8 px-6 py-5">
              <Stat label="Pendentes" value={pendingCount} />
              <div className="w-px bg-gray-200 h-7 dark:bg-gray-800" />
              <Stat label="Resolvidos" value={resolvedCount} />
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <h3 className="text-lg mb-3 font-semibold text-gray-800 dark:text-white/90">
              Zonas com maiores números de reportes:
            </h3>
            <div className="space-y-5">
              {(topAreas.length > 0 ? topAreas : defaultProvinces).map((area, index) => {
                const total = topAreas.length > 0 ? totalAreasReports : defaultProvinces.reduce((sum, a) => sum + a.reports, 0);
                const percentage = ((area.reports / total) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">{area.name}</p>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{area.reports.toLocaleString()} reportes</span>
                    </div>
                    <div className="flex items-center gap-3 w-full max-w-[140px]">
                      <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                        <div className="absolute left-0 top-0 h-full rounded-sm bg-brand-500" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MetricCard({ icon, label, value, badgeColor }: { icon: React.ReactNode, label: string, value: number, badgeColor: "success" | "error" }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">{icon}</div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{value}</h4>
        </div>
        <Badge color={badgeColor}>{badgeColor === "success" ? <ArrowUpIcon /> : <ArrowDownIcon />}</Badge>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">{label}</p>
      <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
        {value}
      </p>
    </div>
  );
}
