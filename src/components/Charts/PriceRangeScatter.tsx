import { useMemo, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Vehicle {
  "Base MSRP": string;
  "Electric Range": string;
  Make: string;
  Model: string;
  "Model Year": string;
}

export default function PriceRangeScatter({ data }: { data: Vehicle[] }) {
  const [selectedMake, setSelectedMake] = useState<string>("All");

  const filteredData = useMemo(() => {
    return data
      .filter((v) => {
        const msrp = Number(v["Base MSRP"]);
        const range = Number(v["Electric Range"]);
        return !isNaN(msrp) && msrp > 0 && !isNaN(range) && range > 0;
      })
      .filter((v) => selectedMake === "All" || v.Make === selectedMake)
      .map((v, index) => ({
        id: `${v.Make}-${v.Model}-${v["Model Year"]}-${index}`,
        x: Number(v["Base MSRP"]),
        y: Number(v["Electric Range"]),
        name: `${v.Make} ${v.Model} (${v["Model Year"]})`,
      }));
  }, [data, selectedMake]);

  const makes = useMemo(() => {
    const set = new Set(data.map((v) => v.Make));
    return ["All", ...Array.from(set)];
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Price vs Electric Range
        </h2>
        <select
          style={{
            fontSize: "0.875rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.375rem",
            padding: "0.375rem 0.75rem",
            backgroundColor: "#ffffff",
            color: "#1F2937",
            outline: "none",
            boxShadow: "none",
          }}
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3B82F6")}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        >
          {makes.map((make,key) => (
            <option key={key} value={make}>
              {make === "All" ? "All Makes" : make}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="x"
            name="Price"
            unit="$"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Base MSRP",
              position: "insideBottom",
              offset: -30,
              style: { fill: "#374151", fontSize: 13, fontWeight: 500 },
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Range"
            unit=" mi"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Electric Range",
              angle: -90,
              position: "insideLeft",
              offset: 5,
              style: { fill: "#374151", fontSize: 13, fontWeight: 500 },
            }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded-md shadow border border-gray-200 text-xs text-gray-700">
                    <div className="font-medium text-sm mb-1">{p.name}</div>
                    <div>Price: ${p.x.toLocaleString()}</div>
                    <div>Range: {p.y} mi</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              fontSize: 12,
              color: "#555",
            }}
          />
          <Scatter name="EVs" data={filteredData} fill="#3b82f6" dataKey="id" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
