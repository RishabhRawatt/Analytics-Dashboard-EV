import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Vehicle {
  "Clean Alternative Fuel Vehicle (CAFV) Eligibility": string;
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

const RADIAN = Math.PI / 180;

// Truncate helper
const truncate = (str: string, max = 22) =>
  str.length > max ? str.slice(0, max) + "…" : str;

// Custom label with truncation and hover tooltip
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.03) return null;

  const displayName = truncate(name);

  return (
    <text
      x={x}
      y={y}
      fill="#444"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{
        fontWeight: 500,
        fontSize: 13,
        userSelect: "none",
        pointerEvents: "auto",
      }}
    >
      <title>{name}</title>
      {`${displayName} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CafvEligibilityChart({ data }: { data: Vehicle[] }) {
  const cafvData = useMemo(() => {
    const counts: Record<string, number> = {};

    data.forEach((d) => {
      const status =
        d["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
    });

    const entries = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
    const total = entries.reduce((acc, cur) => acc + cur.value, 0);

    const majorSlices = entries.filter((e) => e.value / total >= 0.05);
    const othersCount = entries
      .filter((e) => e.value / total < 0.05)
      .reduce((acc, cur) => acc + cur.value, 0);

    if (othersCount > 0) {
      majorSlices.push({ name: "Others", value: othersCount });
    }

    return majorSlices;
  }, [data]);

  return (
    <div
      style={{
        padding: 0,
        borderRadius: 16,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
      }}
    >
      <h2
        style={{
          marginBottom: 24,
          fontWeight: 700,
          fontSize: 20,
          color: "#222",
        }}
      >
        CAFV Eligibility
      </h2>
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <defs>
            <radialGradient id="grad3d" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.9} />
            </radialGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                floodColor="#666"
                floodOpacity="0.25"
              />
            </filter>
          </defs>
          <Pie
            data={cafvData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            fill="url(#grad3d)"
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            stroke="#fff"
            strokeWidth={2}
            filter="url(#shadow)"
          >
            {cafvData.map((_, i) => (
              <Cell
                key={`cell-${i}`}
                fill={COLORS[i % COLORS.length]}
                style={{
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: "none",
              fontSize: 14,
              padding: "10px 14px",
              color: "#222",
            }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />
          <Legend
            content={({ payload }) => {
              if (!payload) return null;

              return (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    paddingTop: 16,
                    gap: "12px 16px",
                  }}
                >
                  {payload.map((entry, index) => {
                    const name = entry.value;
                    //@ts-ignore
                    const short = truncate(name, 20);
                    return (
                      <div
                        key={`legend-${index}`}
                        title={name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          maxWidth: 160,
                          fontSize: 13,
                          color: "#444",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: entry.color,
                            flexShrink: 0,
                          }}
                        />
                        <span>{short}</span>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
