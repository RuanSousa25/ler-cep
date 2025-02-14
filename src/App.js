//Css
import "./App.css";
import "./globalstyle.css";

//Componentes
import Tab from "./components/Tabs/Tab";
import TabsController from "./components/Tabs/TabsController";
import Config from "./components/Config";

//Contexto
import CepProvider from "./Context/CepContext";

//Páginas
import CepIdentifier from "./components/CepIdentifier/CepIdentifier";
import SheetCreate from "./components/SheetCreate/SheetCreate";
import SheetReader from "./components/SheetReader/SheetReader";
import PolygonCreate from "./components/PolygonCreate/PolygonCreate";
import PolygonReader from "./components/PolygonReader/PolygonReader";

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
            "Ler Polígono",
          ]}
        >
          <Tab>
            <CepIdentifier />
          </Tab>
          <Tab>
            <SheetCreate />
          </Tab>
          <Tab>
            <SheetReader />
          </Tab>
          <Tab>
            <PolygonCreate />
          </Tab>
          <Tab>
            <PolygonReader />
          </Tab>
        </TabsController>
      </CepProvider>
    </div>
  );
}

export default App;
