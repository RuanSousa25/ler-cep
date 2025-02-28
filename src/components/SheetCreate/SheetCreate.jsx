import { useContext, useMemo, useState } from "react";
import { CepContext, useCepContext } from "../../Context/CepContext";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import "./SheetCreate.css";
import SheetView from "../SheetView/SheetView";
import { useCepProcessor } from "../../Hooks/useCepProcessor";

export default function SheetCreate() {
  const { parseToExcelFile } = useCepProcessor();
  const { cepSheet, hierarchyCepSheet } = useContext(CepContext);
  const [selectedUfs, setSelectedUfs] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedNeighbors, setSelectedNeighbors] = useState([]);

  const [sheetView, setSheetView] = useState(false);

  const selectedBands = useMemo(() => {
    if (selectedNeighbors.length === 0) return [];
    const bands = [];
    selectedNeighbors.forEach((neighbor) => {
      const match = neighbor.match(/^(.*?) - \((.*?)\/(.*?)\)$/);
      const [, bairro, cidade, uf] = match;
      hierarchyCepSheet[uf][cidade][bairro].forEach((band) => {
        bands.push(band);
      });
    });
    console.log(bands);
    return bands;
  }, [selectedNeighbors]);

  const availableCities = useMemo(() => {
    if (!hierarchyCepSheet) return;
    const cities = [];
    selectedUfs.forEach((uf) => {
      if (hierarchyCepSheet[uf]) {
        Object.keys(hierarchyCepSheet[uf]).forEach((city) => {
          cities.push(city);
        });
      }
    });
    return cities;
  }, [selectedUfs]);

  const availableNeighbors = useMemo(() => {
    if (!hierarchyCepSheet) return;
    const neighrbors = [];
    selectedCities.forEach((city) => {
      Object.entries(hierarchyCepSheet).forEach(([uf, cidades]) => {
        if (cidades[city]) {
          Object.keys(cidades[city]).forEach((b) => {
            neighrbors.push(`${b} - (${city}/${uf})`);
          });
        }
      });
    });
    return neighrbors;
  }, [selectedCities]);

  const availableUfs = useMemo(() => {
    if (!hierarchyCepSheet) return;

    return Object.keys(hierarchyCepSheet);
  }, [hierarchyCepSheet]);

  async function downloadSheet() {
    await parseToExcelFile(selectedBands);
  }
  return (
    <>
      <div className="sheet-create">
        <h2>Criar Planilha</h2>
        {selectedBands.length !== 0 && (
          <>
            <button className="button" onClick={() => setSheetView(true)}>
              Visualização de planilha
            </button>
            <button className="button" onClick={downloadSheet}>
              Salvar Planilha
            </button>
          </>
        )}
        <div className="filters">
          <DropdownFilter
            options={hierarchyCepSheet ? availableNeighbors : []}
            label={"Bairro"}
            selectedValues={selectedNeighbors}
            setSelectedValues={setSelectedNeighbors}
          />
          <DropdownFilter
            options={hierarchyCepSheet ? availableCities : []}
            label={"Cidade"}
            selectedValues={selectedCities}
            setSelectedValues={setSelectedCities}
          />
          <DropdownFilter
            options={hierarchyCepSheet ? availableUfs : []}
            label={"UF"}
            selectedValues={selectedUfs}
            setSelectedValues={setSelectedUfs}
          />
        </div>
        <div className="result">
          {selectedNeighbors.map((neighbor) => neighbor + ",")}
        </div>
      </div>

      <SheetView
        isSheetViewActive={sheetView}
        setIsSheetViewActive={setSheetView}
        ranges={selectedBands}
      />
    </>
  );
}
