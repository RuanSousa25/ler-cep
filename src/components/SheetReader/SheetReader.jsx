import { useContext, useState } from "react";
import { CepContext } from "../../Context/CepContext";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { useCepSheet } from "../../Hooks/useCepSheet";
import { useCepProcessor } from "../../Hooks/useCepProcessor";
import "./SheetReader.css";
import SheetView from "../SheetView/SheetView";
export default function SheetReader() {
  const { cepSheet, hierarchyCepSheet } = useContext(CepContext);
  const { compareCepBand } = useCepSheet(cepSheet, hierarchyCepSheet);
  const { isProcessorLoading, formatSheet } = useCepProcessor();
  const [regionData, setRegionData] = useState([]);
  const [sheetView, setSheetView] = useState(false);
  const [analyzeCorrespondence, setAnalyzeCorrespondence] = useState(false);

  async function handleButtonClick(file) {
    const sheetArray = await formatSheet(file);
    let dataArray = compareCepBand(sheetArray, analyzeCorrespondence);
    setRegionData(dataArray);
  }
  return (
    <>
      <div className="sheet-reader">
        <div className="tab-header">
          <span className="title-span">
            <h2>Ler Planilha</h2>

            {cepSheet === null && (
              <p className="warning">
                Você precisa adicionar uma base de CEPs para utilizar essa
                função
              </p>
            )}
          </span>
          <div className="config-reader">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={analyzeCorrespondence}
                onChange={(e) => setAnalyzeCorrespondence(e.target.checked)}
              />
              Analisar correspondência
            </label>
          </div>

          <span className="buttons-section">
            <button
              disabled={regionData.length === 0}
              className="button"
              onClick={() => setSheetView(true)}
            >
              Visualização de planilha
            </button>
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
              {isProcessorLoading ? (
                <p>Carregando...</p>
              ) : (
                regionData.neighbors && regionData.neighbors.join(", ")
              )}
            </span>
          </span>
          <span className="result-space">
            <span className="result-label">Cidades</span>
            <span className="result-list">
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
