import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function EVsByCityTopN({ data, topN = 10 }) {
  const chartData = useMemo(() => {
    const counts = data.reduce((acc, d) => {
      const city = d.City || "Unknown";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    let sorted = Object.entries(counts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count);

    const top = sorted.slice(0, topN);

    const othersCount = sorted.slice(topN).reduce((acc, d) => acc + d.count, 0);

    if (othersCount > 0) {
      top.push({ city: "Others", count: othersCount });
    }

    return top;
  }, [data, topN]);

  return (
    <div
      style={{
        width: "90%",
        height: 430,
        paddingLeft: 0,
        paddingRight: 60,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3 style={{ marginBottom: 24, color: "#333", fontWeight: "600" }}>
        Top {topN} Cities by Number of EVs (Others grouped)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 0, bottom: 20 }}
          barSize={24}
          maxBarSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            type="number"
            tick={{ fill: "#666", fontSize: 14 }}
            axisLine={{ stroke: "#bbb" }}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            dataKey="city"
            type="category"
            interval={0}
            width={140}
            tick={{ fill: "#444", fontWeight: "500", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: 8,
              borderColor: "#ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              fontSize: 14,
              padding: "8px 12px",
            }}
            cursor={{ fill: "rgba(136, 132, 216, 0.1)" }}
          />
          <Bar dataKey="count" fill="#6c63ff" radius={[8, 8, 8, 8]}>
            <LabelList
              dataKey="count"
              position="right"
              fill="#333"
              fontWeight="600"
              fontSize={14}
              offset={8}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EVsByCityTopN;
