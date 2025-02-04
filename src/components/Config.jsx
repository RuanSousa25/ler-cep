import { useContext, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import CustomFileInput from "./CustomFileInput/CustomFileInput";
import { CepContext, useCepContext } from "../Context/CepContext";

import { useCepSheet } from "../Hooks/useCepSheet";
import { useCepProcessor } from "../Hooks/useCepProcessor";

export default function Config() {
  const { loadCepSheet, loadHierarchyCepSheet } = useContext(CepContext);
  const { isProcessorLoading, parseExcelFile, createHierarchyModel } =
    useCepProcessor();
  const [configActive, setConfigActive] = useState(false);

  async function handleSheetUpload(file) {
    const sheetArray = await parseExcelFile(file);
    const hierarchySheet = await createHierarchyModel(sheetArray);
    loadCepSheet(sheetArray);
    loadHierarchyCepSheet(hierarchySheet);
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
                onButtonClick={handleSheetUpload}
              ></CustomFileInput>
            </div>
          </>
        )}
      </div>
    </>
  );
}
