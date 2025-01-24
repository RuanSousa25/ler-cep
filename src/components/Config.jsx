import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import CustomFileInput from "./CustomFileInput/CustomFileInput";
import { useCepContext } from "../Context/CepContext";
import { read, utils } from "xlsx";

export default function Config() {
  const { loadCepSheet } = useCepContext();
  const [configActive, setConfigActive] = useState(false);

  async function handleSheetUpload(file) {
    try {
      const data = await file.arrayBuffer();
      const workbook = read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(sheet);
      loadCepSheet(jsonData);
      console.log("planilha carregada", jsonData);
    } catch (error) {
      console.log("Não foi possível enviar a planilha", error);
    }
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
        <div className="config-content">
          <label>Inserir planilha de CEPs</label>
          <CustomFileInput onButtonClick={handleSheetUpload}></CustomFileInput>
        </div>
      </div>
    </>
  );
}
