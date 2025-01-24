import "./App.css";
import CepIdentifier from "./components/CepIdentifier/CepIdentifier";
import Tab from "./components/Tabs/Tab";
import TabsController from "./components/Tabs/TabsController";
import Config from "./components/Config";
import CepProvider from "./Context/CepContext";
function App() {
  return (
    <div className="App">
      <CepProvider>
        <Config />
        <TabsController identifiers={["Listar Bairro", "Listar Polígono"]}>
          <Tab color={"#e0b138"}>
            <CepIdentifier />
          </Tab>
          <Tab color={"#596466"}>Listar Polígonos</Tab>
        </TabsController>
      </CepProvider>
    </div>
  );
}

export default App;
