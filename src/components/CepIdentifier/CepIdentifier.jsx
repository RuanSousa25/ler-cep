import { useContext, useState } from "react";

import { useCep } from "../../Hooks/useCep";
import { CepContext } from "../../Context/CepContext";
import "./CepIdentifier.css";

export default function CepIdentifier() {
  const [regionData, setRegionData] = useState({
    uf: [],
    neighbours: [],
    cities: [],
    lastingCeps: [],
    ranges: [],
  });
  const { cepSheet } = useContext(CepContext);
  const { findCepRange } = useCep(cepSheet);
  const [inputedCeps, setInputedCeps] = useState("");

  function handleClick() {
    setRegionData(findCepRange(inputedCeps.split(",")));
  }
  return (
    <div className="cep-identifier">
      <h1>Busca CEP</h1>
      <div className="input-space">
        <input
          className="input-cep"
          type="text"
          value={inputedCeps}
          onChange={(e) => {
            setInputedCeps(e.target.value);
          }}
        ></input>
        <button className="button" onClick={handleClick}>
          Enviar
        </button>
      </div>

      <div className="result">
        <span className="result-space">
          <span className="result-label">Bairros</span>
          <span className="result-list">
            {/* {regionData.neighbours.map((neighour) => (
              <p>{neighour}</p>
            ))} */}
            {regionData.neighbours.join(", ")}
          </span>
        </span>
        <span className="result-space">
          <span className="result-label">Cidades</span>
          <span className="result-list">
            {/* {regionData.cities.map((city) => (
              <p>{city}</p>
            ))} */}
            {regionData.cities.join(", ")}
          </span>
        </span>
        <span className="result-space">
          <span className="result-label">UFs</span>
          <span className="result-list">
            {/* {regionData.uf.map((state) => (
              <p>{state}</p>
            ))} */}
            {regionData.uf.join(", ")}
          </span>
        </span>
      </div>
      {/* <ul>
        {regionData.neighbours.map((neighour) => (
          <li>{neighour}</li>
        ))}
      </ul>
      <ul>
        {regionData.cities.map((neighour) => (
          <li>{neighour}</li>
        ))}
      </ul>
      <ul>
        {regionData.uf.map((neighour) => (
        ))}
      </ul>
      <ul>
        {regionData.lastingCeps.map((neighour) => (
          <li>{neighour}</li>
        ))}
      </ul>     <li>{neighour}</li>
      */}
    </div>
  );
}
