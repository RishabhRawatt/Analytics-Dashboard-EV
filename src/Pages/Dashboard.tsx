import { Typography, Box, Paper } from "@mui/material";
import Overview from "../components/Overview";
import BevVsPhevPie from "../components/Charts/BevVsPhevPie";
import Filters from "../components/Filter";
import { useFilters } from "../context/FilterContext";
import AdoptionTrendChart from "../components/Charts/AdoptionTrendChart";
import CafvEligibilityChart from "../components/Charts/CafvEligibilityChart";
import RangeHistogram from "../components/Charts/RangeHistogram";
import PriceRangeScatter from "../components/Charts/PriceRangeScatter";
import EVsByCityTopN from "../components/Charts/EVMap.tsx";

function Dashboard() {
  const { filteredData } = useFilters();

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: "#1976d2",
          marginBottom: "1rem",
        }}
      >
        EV Analytics Dashboard
      </Typography>

      {/* Filters */}
      <Box mb={4}>
        <Filters />
      </Box>

      {/* Overview */}
      <Box mb={4}>
        <Overview data={filteredData} />
      </Box>

      {/* Grid: 3 rows × 2 columns */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gridAutoRows: "auto",
          gap: 3,
        }}
      >
        {/* Row 1 */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <BevVsPhevPie data={filteredData} />
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <EVsByCityTopN data={filteredData} />
        </Paper>

        {/* Row 2 */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <AdoptionTrendChart data={filteredData} />
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <CafvEligibilityChart data={filteredData} />
        </Paper>

        {/* Row 3 */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <RangeHistogram data={filteredData} />
        </Paper>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <PriceRangeScatter data={filteredData} />
        </Paper>
      </Box>
      <footer>
        <p style={{ textAlign: "center" }}>Created by Rishabh</p>
      </footer>
    </Box>
  );
}

export default Dashboard;
