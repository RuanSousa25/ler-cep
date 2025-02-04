import "./App.css";
import "./globalstyle.css";
import CepIdentifier from "./components/CepIdentifier/CepIdentifier";
import Tab from "./components/Tabs/Tab";
import TabsController from "./components/Tabs/TabsController";
import Config from "./components/Config";
import CepProvider from "./Context/CepContext";
import SheetCreate from "./components/SheetCreate/SheetCreate";
import SheetReader from "./components/SheetReader/SheetReader";
import PolygonCreate from "./components/PolygonCreate/PolygonCreate";
function App() {
  return (
    <div className="App">
      <CepProvider>
        <Config />
        <TabsController
          identifiers={[
            "Listar Bairro",
            "Criar Planilha",
            "Ler Planilha",
            "Criar Polígono",
          ]}
        >
          <Tab color={"#e0b138"}>
            <CepIdentifier />
          </Tab>
          <Tab color={"#e0b138"}>
            <SheetCreate />
          </Tab>
          <Tab color={"#e0b138"}>
            <SheetReader />
          </Tab>
          <Tab color={"#e0b138"}>
            <PolygonCreate />
          </Tab>
        </TabsController>
      </CepProvider>
    </div>
  );
}

export default App;
