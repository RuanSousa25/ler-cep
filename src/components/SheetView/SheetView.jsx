import { useMemo } from "react";
import "./SheetView.css";

export default function SheetView({
  isSheetViewActive,
  setIsSheetViewActive,
  ranges = [],
}) {
  const { keys, entries } = useMemo(() => {
    if (ranges.length == 0) return { keys: [], entries: [] };
    const keys = Object.entries(ranges[0]).map((entry) => entry[0]);
    const entries = ranges.map((range) =>
      Object.entries(range).map((entry) => entry[1])
    );

    return { keys, entries };
  }, [ranges]);

  console.log(keys);
  console.log(entries);
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
              {/* <th>CEP INICIAL</th>
              <th>CEP FINAL</th>
              <th>BAIRRO</th>
              <th>CIDADE</th>
              <th>UF</th> */}
              {keys.map((key) => (
                <th>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, rowIndex) => (
              <tr key={rowIndex}>
                {entry.map((el, colIndex) => {
                  console.log(typeof el);
                  return (
                    <td key={colIndex}>
                      {typeof el === "object" ? JSON.stringify(el) : el}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
