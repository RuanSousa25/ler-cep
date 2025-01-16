import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import CustomFileInput from "./CustomFileInput/CustomFileInput";

export default function Config() {
  const [configActive, setConfigActive] = useState(false);
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
          <CustomFileInput></CustomFileInput>
        </div>
      </div>
    </>
  );
}
