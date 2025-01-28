import "./App.css";
import CepIdentifier from "./components/CepIdentifier/CepIdentifier";
import Tab from "./components/Tabs/Tab";
import TabsController from "./components/Tabs/TabsController";
import Config from "./components/Config";
import CepProvider from "./Context/CepContext";
import SheetCreate from "./components/SheetCreate/SheetCreate";
import SheetReader from "./components/SheetReader/SheetReader";
function App() {
  return (
    <div className="App">
      <CepProvider>
        <Config />
        <TabsController
          identifiers={[
            "Listar Bairro",
            "Listar Polígono",
            // "Criar Planilha",
            "Ler Planilha",
          ]}
        >
          <Tab color={"#e0b138"}>
            <CepIdentifier />
          </Tab>
          <Tab color={"#596466"}>Listar Polígonos</Tab>
          {/* <Tab color={"#e0b138"}>
            <SheetCreate />
          </Tab> */}
          <Tab color={"#e0b138"}>
            <SheetReader />
          </Tab>
        </TabsController>
      </CepProvider>
    </div>
  );
}

export default App;
