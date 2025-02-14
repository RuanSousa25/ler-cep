import { useContext, useState } from "react";
import "./PolygonReader.css";
import { CepContext } from "../../Context/CepContext";
import { usePolygonCoordinates } from "../../Hooks/usePolygonCoordinates";
import CustomFileInput from "../CustomFileInput/CustomFileInput";

export default function PolygonReader() {
  const { coordsSheet } = useContext(CepContext);
  const [inputedCoords, setInputedCoords] = useState("");
  const [regionData, setRegionData] = useState([]);
  const { findRegionDataInPolygon } = usePolygonCoordinates(coordsSheet);

  async function handleClick() {
    console.log(JSON.parse(inputedCoords));
    let result = await findRegionDataInPolygon(JSON.parse(inputedCoords));
    setRegionData(result);
  }
  return (
    <div className="polygon-reader">
      <h2>Ler Polígono</h2>
      <div className="input-space">
        <input
          disabled={coordsSheet === null}
          className="input-cep"
          type="text"
          value={inputedCoords}
          onChange={(e) => {
            setInputedCoords(e.target.value);
          }}
        ></input>
        <button
          disabled={coordsSheet === null}
          className="button"
          onClick={handleClick}
        >
          Enviar
        </button>
      </div>
      <div>
        {regionData.length !== 0
          ? regionData.forEach((cep) => <p>{cep}</p>)
          : ""}
      </div>
    </div>
  );
}
