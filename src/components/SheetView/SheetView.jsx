import "./SheetView.css";

export default function SheetView({
  isSheetViewActive,
  setIsSheetViewActive,
  ranges,
}) {
  return (
    isSheetViewActive && (
      <div className="sheet-view">
        <button
          className="close-button"
          onClick={() => setIsSheetViewActive(false)}
        >
          Fechar
        </button>
        <table>
          <thead>
            <tr>
              <th>CEP INICIAL</th>
              <th>CEP FINAL</th>
              <th>BAIRRO</th>
              <th>CIDADE</th>
              <th>UF</th>
            </tr>
          </thead>
          <tbody>
            {ranges.map((range) => (
              <tr>
                <td>{range.cep_inicial}</td>
                <td>{range.cep_final}</td>
                <td>{range.bairro}</td>
                <td>{range.cidade}</td>
                <td>{range.uf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
