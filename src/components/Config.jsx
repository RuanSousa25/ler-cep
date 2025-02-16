import { useContext, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import CustomFileInput from "./CustomFileInput/CustomFileInput";
import { CepContext, useCepContext } from "../Context/CepContext";

import { useCepSheet } from "../Hooks/useCepSheet";
import { useCepProcessor } from "../Hooks/useCepProcessor";
import { usePolygonCoordinates } from "../Hooks/usePolygonCoordinates";

export default function Config() {
  const { loadCepSheet, loadHierarchyCepSheet, loadCoordsSheet, loadTree } =
    useContext(CepContext);
  const {
    isProcessorLoading,
    parseExcelFile,
    createHierarchyModel,
    formatSheet,
  } = useCepProcessor();
  const [configActive, setConfigActive] = useState(false);
  const { findRegionDataInPolygon, buildRTree } = usePolygonCoordinates();

  async function handleCepSheetUpload(file) {
    const sheetArray = await formatSheet(file);
    const hierarchySheet = await createHierarchyModel(sheetArray);
    loadCepSheet(sheetArray);
    loadHierarchyCepSheet(hierarchySheet);
  }
  async function handleCoordSheetUpload(file) {
    const coordArray = await parseExcelFile(file);
    console.log(coordArray);
    loadCoordsSheet(coordArray);
    loadTree(buildRTree(coordArray));
    return;
    let ceps = await findRegionDataInPolygon([
      [-46.604770034627784, -23.55031],
      [-46.604911752770356, -23.547665532038536],
      [-46.605335542374874, -23.545046531749158],
      [-46.60603732211579, -23.54247822153634],
      [-46.60701033347056, -23.539985335631407],
      [-46.60824520580794, -23.537591881888382],
      [-46.60973004663227, -23.535320910575205],
      [-46.61145055611472, -23.533194292387055],
      [-46.613390164808436, -23.531232507819617],
      [-46.61553019322141, -23.529454449930697],
      [-46.61785003171016, -23.527877242389742],
      [-46.6203273389619, -23.52651607456757],
      [-46.62293825715354, -23.525384055254396],
      [-46.625657641715634, -23.524492086415027],
      [-46.628459303488285, -23.52384875819699],
      [-46.631316260937076, -23.5234602662027],
      [-46.634201, -23.523330351822437],
      [-46.63708573906292, -23.5234602662027],
      [-46.63994269651171, -23.52384875819699],
      [-46.64274435828436, -23.524492086415027],
      [-46.64546374284645, -23.525384055254396],
      [-46.648074661038095, -23.52651607456757],
      [-46.65055196828983, -23.527877242389742],
      [-46.652871806778585, -23.529454449930697],
      [-46.65501183519156, -23.531232507819617],
      [-46.656951443885276, -23.533194292387055],
      [-46.65867195336772, -23.535320910575205],
      [-46.660156794192055, -23.537591881888382],
      [-46.66139166652943, -23.539985335631407],
      [-46.662364677884206, -23.54247822153634],
      [-46.66306645762512, -23.545046531749158],
      [-46.66349024722964, -23.547665532038536],
      [-46.66363196537221, -23.55031],
      [-46.66349024722964, -23.552954467961463],
      [-46.66306645762512, -23.55557346825084],
      [-46.662364677884206, -23.55814177846366],
      [-46.66139166652943, -23.560634664368592],
      [-46.660156794192055, -23.563028118111617],
      [-46.65867195336772, -23.565299089424794],
      [-46.656951443885276, -23.567425707612944],
      [-46.65501183519156, -23.569387492180383],
      [-46.652871806778585, -23.571165550069303],
      [-46.65055196828983, -23.572742757610257],
      [-46.648074661038095, -23.57410392543243],
      [-46.64546374284645, -23.575235944745604],
      [-46.64274435828436, -23.576127913584973],
      [-46.63994269651171, -23.57677124180301],
      [-46.63708573906292, -23.5771597337973],
      [-46.634201, -23.577289648177562],
      [-46.631316260937076, -23.5771597337973],
      [-46.628459303488285, -23.57677124180301],
      [-46.625657641715634, -23.576127913584973],
      [-46.62293825715354, -23.575235944745604],
      [-46.6203273389619, -23.57410392543243],
      [-46.61785003171016, -23.572742757610257],
      [-46.61553019322141, -23.571165550069303],
      [-46.613390164808436, -23.569387492180383],
      [-46.61145055611472, -23.567425707612944],
      [-46.60973004663227, -23.565299089424794],
      [-46.60824520580794, -23.563028118111617],
      [-46.60701033347056, -23.560634664368592],
      [-46.60603732211579, -23.55814177846366],
      [-46.605335542374874, -23.55557346825084],
      [-46.604911752770356, -23.552954467961463],
      [-46.604770034627784, -23.55031],
    ]);
    console.log(ceps);
  }

  return (
    <>
      <FaGear className="config-button" onClick={() => setConfigActive(true)} />
      <div
        className="config-div"
        style={{ display: configActive ? "flex" : "none" }}
      >
        <span className="config-header">
          <AiOutlineClose
            className="config-close-button"
            onClick={() => setConfigActive(false)}
          />
        </span>
        {isProcessorLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="config-content">
              <label>Inserir planilha de CEPs</label>
              <CustomFileInput
                onButtonClick={handleCepSheetUpload}
              ></CustomFileInput>
              <label>Inserir planilha de coordenadas</label>
              <CustomFileInput
                onButtonClick={handleCoordSheetUpload}
              ></CustomFileInput>
            </div>
          </>
        )}
      </div>
    </>
  );
}
