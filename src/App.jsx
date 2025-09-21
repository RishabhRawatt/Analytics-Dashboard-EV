import { useState, useEffect } from "react";
import "./App.css";
import Papa from "papaparse";
import Dashboard from "./Pages/Dashboard";
import { FilterProvider } from "./context/FilterContext";
import Loading from "./Pages/Loading";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  return data.length > 0 ? (
    <FilterProvider data={data}>
      <Dashboard />
    </FilterProvider>
  ) : (
    <Loading/>
    // <div>Loading...</div>
  );
}

export default App;
