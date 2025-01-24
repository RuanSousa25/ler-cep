import React, { createContext, useState, useContext } from "react";

export const CepContext = createContext();

export const useCepContext = () => useContext(CepContext);

export default function CepProvider({ children }) {
  const [cepSheet, setCepSheet] = useState(null);

  function loadCepSheet(sheetData) {
    setCepSheet(sheetData);
  }
  return (
    <CepContext.Provider value={{ cepSheet, loadCepSheet }}>
      {children}
    </CepContext.Provider>
  );
}
