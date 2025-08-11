import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "12am", l1: 8200,  l2: 4500, l3: 700  },
  { time: "2am",  l1: 9000,  l2: 3800, l3: 850  },
  { time: "4am",  l1: 9200,  l2: 3600, l3: 900  },
  { time: "6am",  l1: 9600,  l2: 3700, l3: 950  },
  { time: "8am",  l1: 9900,  l2: 3800, l3: 1000 },
  { time: "10am", l1: 10050, l2: 3850, l3: 1050 },
  { time: "12pm", l1: 10400, l2: 3900, l3: 1100 },
  { time: "2pm",  l1: 10800, l2: 3950, l3: 1150 },
  { time: "4pm",  l1: 10650, l2: 4000, l3: 1125 },
  { time: "6pm",  l1: 10950, l2: 4050, l3: 1100 },
  { time: "8pm",  l1: 10400, l2: 3950, l3: 1000 },
  { time: "10pm", l1: 10000, l2: 3850, l3: 950  },
];

export const PriceTrend = () => {
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm shadow-sm">

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800">Price Trend for ‘Cabling Kit’</h3>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Legend 1
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Legend 2
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Legend 3
            </span>
          </div>
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 40, left: 10, bottom: 0 }}
            >
              <CartesianGrid stroke="#E6E9ED" />
              <XAxis
                dataKey="time"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={46}
                domain={[0, 15000]}
                ticks={[1000, 5000, 10000, 15000]}
                tickFormatter={(v) => v.toLocaleString()}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={46}
                domain={[0, 1000]}
                ticks={[100, 500, 1000]}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 6,
                  fontSize: 12,
                  color: "#374151",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="l1"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="l2"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="l3"
                stroke="#facc15"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="mt-4">
        <h4 className="font-bold text-lg text-gray-800 mb-2">
          Insights from the Chart
        </h4>
        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
          <li>Price dipped slightly in Feb due to excess inventory.</li>
          <li>Steady increase from March to May shows rising demand.</li>
          <li>Slight drop in June, possibly due to supplier discounts.</li>
          <li>
            July hits a new high, suggesting increased cost of raw materials or
            supply constraints.
          </li>
        </ul>
      </div>
    </>
  );
};

