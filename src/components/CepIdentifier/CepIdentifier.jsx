import { useEffect, useState } from "react";
import { utils, read } from "xlsx";
import { useCep } from "../../Hooks/useCep";

import "./CepIdentifier.css";

export default function CepIdentifier() {
  const [sheet, setSheet] = useState([]);
  const [regionData, setRegionData] = useState({
    uf: [],
    neighbours: [],
    cities: [],
    lastingCeps: [],
    ranges: [],
  });
  const { findCepRange } = useCep(sheet);
  const [inputedCeps, setInputedCeps] = useState("");

  useEffect(() => {
    (async () => {
      const sheetFile = await fetch("/Ceps_Bairros_Faixa.xls");
      const sheetArray = await sheetFile.arrayBuffer();
      const objectArray = read(sheetArray);
      setSheet(
        utils.sheet_to_json(objectArray.Sheets[objectArray.SheetNames[0]])
      );
    })();
  }, []);

  function handleClick() {
    setRegionData(findCepRange(inputedCeps.split(",")));
  }
  return (
    <div>
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
            {regionData.neighbours.map((neighour) => (
              <p>{neighour}</p>
            ))}
          </span>
        </span>
        <span className="result-space">
          <span className="result-label">Cidades</span>
          <span className="result-list">
            {regionData.cities.map((city) => (
              <p>{city}</p>
            ))}
          </span>
        </span>
        <span className="result-space">
          <span className="result-label">UFs</span>
          <span className="result-list">
            {regionData.uf.map((state) => (
              <p>{state}</p>
            ))}
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
