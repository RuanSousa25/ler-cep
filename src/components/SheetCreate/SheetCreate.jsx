import { useContext } from "react";
import { CepContext, useCepContext } from "../../Context/CepContext";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import "./SheetCreate.css";

export default function SheetCreate() {
  const { cepSheet, hierarchyCepSheet } = useContext(CepContext);

  return (
    <div className="sheet-create">
      <h2>Criar Planilha</h2>
      <div className="filters">
        <DropdownFilter
          options={Object.entries(hierarchyCepSheet).map((value) => value[0])}
          label={"Bairro"}
        />
        <DropdownFilter
          options={Object.entries(hierarchyCepSheet).map((value) => value[0])}
          label={"Cidade"}
        />
        <DropdownFilter
          options={Object.entries(hierarchyCepSheet).map((value) => value[0])}
          label={"UF"}
        />
      </div>
    </div>
  );
}
