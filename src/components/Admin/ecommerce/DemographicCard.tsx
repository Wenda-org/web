import CountryMap from "./CountryMap";

export default function DemographicCard() {

  const provinces = [
    { name: "Luanda", image: "./images/country/luanda.svg", clients: 3200 },
    { name: "Benguela", image: "./images/country/benguela.svg", clients: 1780 },
    { name: "Huíla", image: "./images/country/huila.svg", clients: 950 },
    { name: "Huambo", image: "./images/country/huambo.svg", clients: 840 },
    { name: "Malanje", image: "./images/country/malanje.svg", clients: 580 },
  ];


  const totalClients = provinces.reduce((acc, curr) => acc + curr.clients, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Demografia de usuários em Angola
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Número de reportes por província
          </p>
        </div>
      </div>

      <div className="relative px-4 py-6 my-6 border border-gray-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="relative h-[500px] w-full"
        >
          <CountryMap />
        </div>
      </div>

      <div className="space-y-5">
        {provinces.map((province, index) => {
          const percentage = ((province.clients / totalClients) * 100).toFixed(1); // 1 casa decimal
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                    {province.name}
                  </p>
                  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {province.clients.toLocaleString()} reportes
                  </span>
                </div>
              </div>

              <div className="flex w-full max-w-[140px] items-center gap-3">
                <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                  <div
                    className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {percentage}%
                </p>
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}
