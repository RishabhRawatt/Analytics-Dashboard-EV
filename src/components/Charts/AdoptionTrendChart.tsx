// "use client";

// import { useMemo } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// interface Vehicle {
//   "Model Year": string;
// }

// export default function AdoptionTrendChart({ data }: { data: Vehicle[] }) {
//   // Aggregate by model year
//   const yearlyData = useMemo(() => {
//     const counts: Record<string, number> = {};

//     data.forEach((d) => {
//       const year = d["Model Year"];
//       if (year) {
//         counts[year] = (counts[year] || 0) + 1;
//       }
//     });

//     return Object.entries(counts)
//       .map(([year, count]) => ({ year, count }))
//       .sort((a, b) => Number(a.year) - Number(b.year));
//   }, [data]);

//   return (
//     <div className="p-4 bg-white rounded-2xl shadow-md">
//       <h2 className="text-lg font-semibold mb-4">EV Adoption Trend by Year</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={yearlyData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="year" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="count"
//             stroke="#2563eb"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }



"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Vehicle {
  "Model Year": string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "8px 12px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: 14,
          color: "#333",
          minWidth: 120,
        }}
      >
        <p style={{ margin: 0, fontWeight: "600" }}>Year: {label}</p>
        <p style={{ margin: 0 }}>EVs: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default function AdoptionTrendChart({ data }: { data: Vehicle[] }) {
  // Aggregate by model year
  const yearlyData = useMemo(() => {
    const counts: Record<string, number> = {};

    data.forEach((d) => {
      const year = d["Model Year"];
      if (year) {
        counts[year] = (counts[year] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => Number(a.year) - Number(b.year));
  }, [data]);

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: 24,
          fontWeight: 700,
          fontSize: 22,
          color: "#222",
          userSelect: "none",
        }}
      >
        EV Adoption Trend by Year
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={yearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#666", fontSize: 14, fontWeight: 600 }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 14, fontWeight: 600 }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
            allowDecimals={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2563eb", strokeWidth: 2, opacity: 0.2 }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="url(#colorUv)"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#2563eb", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7 }}
            animationDuration={800}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
