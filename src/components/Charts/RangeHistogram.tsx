// "use client";

// import { useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// interface Vehicle {
//   "Electric Range": string;
// }

// export default function RangeHistogram({ data }: { data: Vehicle[] }) {
//   // Prepare histogram buckets
//   const histogramData = useMemo(() => {
//     const buckets: Record<string, number> = {};

//     data.forEach((d) => {
//       const rangeStr = d["Electric Range"];
//       const range = Number(rangeStr);

//       if (!isNaN(range) && range > 0) {
//         // Group ranges into bins of 50
//         const bucket = `${Math.floor(range / 50) * 50}-${Math.floor(range / 50) * 50 + 49}`;
//         buckets[bucket] = (buckets[bucket] || 0) + 1;
//       }
//     });

//     return Object.entries(buckets)
//       .map(([bucket, count]) => ({ bucket, count }))
//       .sort((a, b) =>
//         Number(a.bucket.split("-")[0]) - Number(b.bucket.split("-")[0])
//       );
//   }, [data]);

//   return (
//     <div className="p-4 bg-white rounded-2xl shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Electric Range Distribution</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={histogramData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="bucket" label={{ value: "Range (miles)", position: "insideBottom", offset: -5 }} />
//           <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
//           <Tooltip />
//           <Bar dataKey="count" fill="#10b981" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Vehicle {
  "Electric Range": string;
}

export default function RangeHistogram({ data }: { data: Vehicle[] }) {
  // Create histogram buckets
  const histogramData = useMemo(() => {
    const buckets: Record<string, number> = {};

    data.forEach((d) => {
      const rangeStr = d["Electric Range"];
      const range = Number(rangeStr);

      if (!isNaN(range) && range > 0) {
        const start = Math.floor(range / 50) * 50;
        const end = start + 49;
        const bucket = `${start}-${end}`;
        buckets[bucket] = (buckets[bucket] || 0) + 1;
      }
    });

    return Object.entries(buckets)
      .map(([bucket, count]) => ({ bucket, count }))
      .sort((a, b) =>
        Number(a.bucket.split("-")[0]) - Number(b.bucket.split("-")[0])
      );
  }, [data]);

  return (
    <div
      className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Electric Range Distribution
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={histogramData} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="bucket"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Range (miles)",
              position: "insideBottom",
              offset: -30,
              style: { fill: "#374151", fontSize: 13, fontWeight: 500 },
            }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Count",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fill: "#374151", fontSize: 13, fontWeight: 500 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "10px 14px",
              fontSize: 14,
              color: "#111",
            }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />
          <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
