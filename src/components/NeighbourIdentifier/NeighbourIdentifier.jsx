import { useEffect, useState } from "react";
import { utils, read } from "xlsx";
import { useCep } from "../../Hooks/useCep";

import "./NeighbourIdentifier.css";

export default function NeighbourIdentifier() {
  const [sheet, setSheet] = useState([]);
  const [regionData, setRegionData] = useState({
    uf: [],
    neighbours: [],
    cities: [],
    lastingCeps: [],
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
      console.log(regionData);
    })();
  }, []);
  useEffect(() => {
    console.log(regionData);
  }, [regionData]);

  function handleClick() {
    setRegionData(findCepRange(inputedCeps.split(",")));
  }
  return (
    <div>
      <h1>NeighbourIdentifier</h1>
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
      <ul>
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
          <li>{neighour}</li>
        ))}
      </ul>
      <ul>
        {regionData.lastingCeps.map((neighour) => (
          <li>{neighour}</li>
        ))}
      </ul>
    </div>
  );
}
