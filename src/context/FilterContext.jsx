import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children, data }) => {
  const states = [...new Set(data.map((d) => d.State).filter(Boolean))];
  const cities = [...new Set(data.map((d) => d.City).filter(Boolean))];
  const years = [...new Set(data.map((d) => d["Model Year"]).filter(Boolean))];
  const types = [
    ...new Set(data.map((d) => d["Electric Vehicle Type"]).filter(Boolean)),
  ];

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredData = data.filter(
    (d) =>
      (selectedState ? d.State === selectedState : true) &&
      (selectedCity ? d.City === selectedCity : true) &&
      (selectedYear ? d["Model Year"] === parseInt(selectedYear) : true) &&
      (selectedType ? d["Electric Vehicle Type"] === selectedType : true)
  );
  return (
    <FilterContext.Provider
      value={{
        selectedState,
        setSelectedState,
        selectedCity,
        setSelectedCity,
        selectedYear,
        setSelectedYear,
        selectedType,
        setSelectedType,
        states,
        cities,
        years,
        types,
        filteredData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
