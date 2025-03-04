import { useContext, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import CustomFileInput from "./CustomFileInput/CustomFileInput";
import { CepContext, useCepContext } from "../Context/CepContext";

import { useCepSheet } from "../Hooks/useCepSheet";
import { useCepProcessor } from "../Hooks/useCepProcessor";
import { usePolygonCoordinates } from "../Hooks/usePolygonCoordinates";

export default function Config() {
  const { loadCepSheet, loadHierarchyCepSheet, loadCoordsSheet, loadTree } =
    useContext(CepContext);
  const {
    isProcessorLoading,
    parseExcelFile,
    createHierarchyModel,
    formatSheet,
  } = useCepProcessor();
  const [configActive, setConfigActive] = useState(false);
  const { findRegionDataInPolygon, buildRTree } = usePolygonCoordinates();

  async function handleCepSheetUpload(file) {
    const sheetArray = await formatSheet(file);
    const hierarchySheet = await createHierarchyModel(sheetArray);
    loadCepSheet(sheetArray);
    loadHierarchyCepSheet(hierarchySheet);
  }
  async function handleCoordSheetUpload(file) {
    const coordArray = await parseExcelFile(file);
    loadCoordsSheet(coordArray);
    loadTree(buildRTree(coordArray));
    return;
  }

  return (
    <>
      <FaGear className="config-button" onClick={() => setConfigActive(true)} />
      <div
        className="config-div"
        style={{ display: configActive ? "flex" : "none" }}
      >
        <span className="config-header">
          <AiOutlineClose
            className="config-close-button"
            onClick={() => setConfigActive(false)}
          />
        </span>
        {isProcessorLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="config-content">
              <label>Inserir planilha de CEPs</label>
              <CustomFileInput
                onButtonClick={handleCepSheetUpload}
              ></CustomFileInput>
              <label>Inserir planilha de coordenadas</label>
              <CustomFileInput
                onButtonClick={handleCoordSheetUpload}
              ></CustomFileInput>
            </div>
          </>
        )}
      </div>
    </>
  );
}
