import { useContext, useState } from "react";
import { CepContext } from "../../Context/CepContext";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { useCepSheet } from "../../Hooks/useCepSheet";
import { useCepProcessor } from "../../Hooks/useCepProcessor";
import "./SheetReader.css";
export default function SheetReader() {
  const { cepSheet } = useContext(CepContext);
  const { compareCepBand } = useCepSheet(cepSheet);
  const { isProcessorLoading, parseExcelFile } = useCepProcessor();
  const [inputedSheet, setInputedSheet] = useState(null);
  const [regionData, setRegionData] = useState([]);

  async function handleButtonClick(file) {
    console.log(regionData);
    const sheetArray = await parseExcelFile(file);
    let dataArray = compareCepBand(sheetArray);
    setRegionData(dataArray);
  }
  return (
    <div className="sheet-reader">
      <h1>Ler Planilha</h1>
      <span className="file-input-span">
        <CustomFileInput onButtonClick={handleButtonClick} />
      </span>
      <div className="result">
        <span className="result-space">
          <span className="result-label">Bairros</span>
          <span className="result-list">
            {/* {regionData.neighbours.map((neighour) => (
              <p>{neighour}</p>
            ))} */}
            {regionData.neighbours && regionData.neighbours.join(", ")}
          </span>
        </span>
        <span className="result-space">
          <span className="result-label">Cidades</span>
          <span className="result-list">
            {/* {regionData.cities.map((city) => (
              <p>{city}</p>
            ))} */}
            {regionData.cities && regionData.cities.join(", ")}
          </span>
        </span>
        <span className="result-space">
          <span className="result-label">UFs</span>
          <span className="result-list">
            {/* {regionData.uf.map((state) => (
              <p>{state}</p>
            ))} */}
            {regionData.uf && regionData.uf.join(", ")}
          </span>
        </span>
      </div>
    </div>
  );
}
