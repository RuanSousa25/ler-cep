import React, { createContext, useState, useContext } from "react";

export const CepContext = createContext();

export const useCepContext = () => useContext(CepContext);

export default function CepProvider({ children }) {
  const [cepSheet, setCepSheet] = useState(null);
  const [coordsSheet, setCoordsSheet] = useState(null);
  const [hierarchyCepSheet, setHierarchyCepSheet] = useState(null);
  function loadCepSheet(sheetData) {
    setCepSheet(sheetData);
  }
  function loadCoordsSheet(sheetData) {
    setCoordsSheet(sheetData);
  }
  function loadHierarchyCepSheet(sheetData) {
    setHierarchyCepSheet(sheetData);
  }
  return (
    <CepContext.Provider
      value={{
        cepSheet,
        loadCepSheet,
        coordsSheet,
        loadCoordsSheet,
        hierarchyCepSheet,
        loadHierarchyCepSheet,
      }}
    >
      {children}
    </CepContext.Provider>
  );
}
