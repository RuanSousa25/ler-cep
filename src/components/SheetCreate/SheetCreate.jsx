import { useContext } from "react";
import { CepContext, useCepContext } from "../../Context/CepContext";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import "./SheetCreate.css";

export default function SheetCreate() {
  const { cepSheet } = useContext(CepContext);

  return (
    <div className="sheet-create">
      <h1>Criar Planilha</h1>
      <span>
        <DropdownFilter label={"Bairo"} />
      </span>
    </div>
  );
}
