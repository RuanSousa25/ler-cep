import { useContext, useState } from "react";
import { CepContext } from "../../Context/CepContext";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCepSheet } from "../../Hooks/useCepSheet";
import { useCepProcessor } from "../../Hooks/useCepProcessor";
import "./SheetReader.css";
import SheetView from "../SheetView/SheetView";
export default function SheetReader() {
  const { cepSheet } = useContext(CepContext);
  const { compareCepBand } = useCepSheet(cepSheet);
  const { isProcessorLoading, parseExcelFile, formatSheet } = useCepProcessor();
  const [inputedSheet, setInputedSheet] = useState(null);
  const [regionData, setRegionData] = useState([]);
  const [sheetView, setSheetView] = useState(false);

  async function handleButtonClick(file) {
    console.log(regionData);
    const sheetArray = await formatSheet(file);
    console.log(sheetArray);
    let dataArray = compareCepBand(sheetArray);
    setRegionData(dataArray);
  }
  return (
    <>
      <div className="sheet-reader">
        <div className="tab-header">
          <span>
            <h2>Ler Planilha</h2>
            {cepSheet === null && (
              <p>
                Você precisa adicionar uma base de CEPs para utilizar essa
                função
              </p>
            )}
            {regionData.length !== 0 && (
              <button className="button" onClick={() => setSheetView(true)}>
                Visualização de planilha
              </button>
            )}
          </span>
          <span className="file-input-span">
            <CustomFileInput
              onButtonClick={handleButtonClick}
              buttonClassName="button"
              inputClassName=""
              disabled={cepSheet === null && true}
            />
          </span>
        </div>
        <div className="result">
          <span className="result-space">
            <span className="result-label">Bairros</span>
            <span className="result-list">
              {/* {regionData.neighbours.map((neighour) => (
              <p>{neighour}</p>
            ))} */}
              {isProcessorLoading ? (
                <p>Carregando...</p>
              ) : (
                regionData.neighbours && regionData.neighbours.join(", ")
              )}
            </span>
          </span>
          <span className="result-space">
            <span className="result-label">Cidades</span>
            <span className="result-list">
              {/* {regionData.cities.map((city) => (
              <p>{city}</p>
            ))} */}
              {isProcessorLoading ? (
                <p>Carregando...</p>
              ) : (
                regionData.cities && regionData.cities.join(", ")
              )}
            </span>
          </span>
          <span className="result-space">
            <span className="result-label">UFs</span>
            <span className="result-list">
              {/* {regionData.uf.map((state) => (
              <p>{state}</p>
            ))} */}
              {isProcessorLoading ? (
                <p>Carregando...</p>
              ) : (
                regionData.uf && regionData.uf.join(", ")
              )}
            </span>
          </span>
        </div>
      </div>
      <SheetView
        isSheetViewActive={sheetView}
        setIsSheetViewActive={setSheetView}
        ranges={regionData.ranges}
      />
    </>
  );
}
