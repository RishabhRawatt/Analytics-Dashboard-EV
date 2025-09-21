import { Grid, Paper, Typography, Box } from "@mui/material";

function Overview({ data }) {
  const totalEVs = data.length;

  const validRanges = data.map((d) => d["Electric Range"]).filter((n) => n > 0);
  const avgRange =
    validRanges.reduce((sum, n) => sum + n, 0) / (validRanges.length || 1);

  const validMSRP = data.map((d) => d["Base MSRP"]).filter((n) => n > 0);
  const avgMSRP =
    validMSRP.reduce((sum, n) => sum + n, 0) / (validMSRP.length || 1);

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {/* Total EVs */}
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Total EVs
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {totalEVs}
          </Typography>
        </Paper>
      </Grid>

      {/* Avg Electric Range */}
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Avg Electric Range
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {avgRange.toFixed(1)} mi
          </Typography>
        </Paper>
      </Grid>

      {/* Avg MSRP */}
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Avg MSRP
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            ${avgMSRP.toFixed(0)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Overview;
