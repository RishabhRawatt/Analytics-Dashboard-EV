import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Typography, useTheme } from "@mui/material";

const COLORS = ["#1976d2", "#ff7043"]; // MUI blue & orange

function BevVsPhevPie({ data }) {
  const theme = useTheme();

  const bevCount = data.filter((d) =>
    d["Electric Vehicle Type"]?.includes("BEV")
  ).length;

  const phevCount = data.filter((d) =>
    d["Electric Vehicle Type"]?.includes("PHEV")
  ).length;

  const chartData = [
    { name: "BEV", value: bevCount },
    { name: "PHEV", value: phevCount },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 1,
            borderRadius: 1,
            boxShadow: 3,
            minWidth: 100,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Count: {value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 380, mx: "auto", mt: 3 }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        sx={{ color: theme.palette.text.primary }}
      >
        BEV vs PHEV Distribution
      </Typography>

      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={110}
          dataKey="value"
          stroke="none"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
          fill={COLORS[0]}
        >
          {chartData.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: 13, color: theme.palette.text.secondary }}
        />
      </PieChart>
    </Box>
  );
}

export default BevVsPhevPie;
