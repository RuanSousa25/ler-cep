import { useContext, useState } from "react";
import { CepContext, useCepContext } from "../../Context/CepContext";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import "./SheetCreate.css";

export default function SheetCreate() {
  const { cepSheet, hierarchyCepSheet } = useContext(CepContext);
  const [selectedUfs, setSelectedUfs] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedNeighbours, setSelectedNeighbours] = useState([]);

  function getUfs() {
    return [...Object.entries(hierarchyCepSheet).map((value) => value[0])];
  }
  function getCities() {
    let cities = [];
    Object.entries(hierarchyCepSheet).forEach((uf) =>
      Object.entries(uf[1]).forEach((city) => cities.push(city[0]))
    );
    return cities;
  }
  function getNeighbours() {
    let neighbours = [];
    Object.entries(hierarchyCepSheet).forEach((uf) =>
      Object.entries(uf[1]).forEach((city) =>
        Object.entries(city[1]).forEach((neighbour) => {
          neighbours.push(neighbour[0]);
        })
      )
    );
    return neighbours;
  }

  return (
    <div className="sheet-create">
      <h2>Criar Planilha</h2>
      <div className="filters">
        <DropdownFilter
          options={hierarchyCepSheet ? getNeighbours() : []}
          label={"Bairro"}
        />
        <DropdownFilter
          options={hierarchyCepSheet ? getCities() : []}
          label={"Cidade"}
        />
        <DropdownFilter
          options={hierarchyCepSheet ? getUfs() : []}
          label={"UF"}
        />
      </div>
    </div>
  );
}
