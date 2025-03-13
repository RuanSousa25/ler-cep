import { useContext, useState } from "react";
import "./PolygonReader.css";
import { CepContext } from "../../Context/CepContext";
import { usePolygonCoordinates } from "../../Hooks/usePolygonCoordinates";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { useCepSheet } from "../../Hooks/useCepSheet";

export default function PolygonReader() {
  const { coordsSheet, rtree, cepSheet } = useContext(CepContext);
  const [inputedCoords, setInputedCoords] = useState("");
  const [regionData, setRegionData] = useState([]);
  const { findRegionDataInPolygon } = usePolygonCoordinates(coordsSheet);
  const { findCepRange, isProcessorLoading } = useCepSheet(cepSheet);

  async function handleClick() {
    console.log(JSON.parse(inputedCoords));
    let result = await findRegionDataInPolygon(
      JSON.parse(inputedCoords),
      rtree
    );
    setRegionData(findCepRange(result));
  }
  return (
    <div className="polygon-reader">
      <div className="tab-header">
        <span className="title-span">
          <h2>Ler Polígono</h2>
        </span>
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
      </div>
      <div className="result">
        <span className="result-space">
          <span className="result-label">Bairros</span>
          <span className="result-list">
            {/* {regionData.neighbors.map((neighour) => (
              <p>{neighour}</p>
            ))} */}
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
  );
}
