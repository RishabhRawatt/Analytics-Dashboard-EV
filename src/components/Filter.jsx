import {
  MenuItem,
  FormControl,
  Select,
  Grid,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useFilters } from "../context/FilterContext";

export default function Filters() {
  const {
    selectedCity,
    setSelectedCity,
    selectedYear,
    setSelectedYear,
    selectedType,
    setSelectedType,
    cities,
    years,
    types,
  } = useFilters();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 4, // margin on top
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: 800 }}>
        {/* City Searchable Dropdown */}
        <Grid>
          <Autocomplete
            value={selectedCity}
            onChange={(event, newValue) => setSelectedCity(newValue || "")}
            options={cities}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search City"
                variant="outlined"
                sx={{
                  width: "100%", // Ensure it takes up full width of the grid item
                  maxWidth: "400px", // Set max width to control the length
                  minWidth: "250px", // Set a minimum width to make it responsive
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "12px",
                  },
                  backgroundColor: "background.paper",
                }}
              />
            )}
            freeSolo // Allow users to type any city if it's not in the list
          />
        </Grid>

        {/* Year Dropdown */}
        <Grid>
          <FormControl fullWidth sx={{ borderRadius: "12px", boxShadow: 2 }}>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "12px",
                },
                backgroundColor: "background.paper",
              }}
            >
              <MenuItem value="">All Years</MenuItem>
              {years
                .sort((a, b) => b - a)
                .map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Type Dropdown */}
        <Grid>
          <FormControl fullWidth sx={{ borderRadius: "12px", boxShadow: 2 }}>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "12px",
                },
                backgroundColor: "background.paper",
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              {types.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
