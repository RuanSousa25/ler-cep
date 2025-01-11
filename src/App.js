import "./App.css";
import NeighbourIdentifier from "./components/NeighbourIdentifier/NeighbourIdentifier";
import Tab from "./components/Tabs/Tab";
import TabsController from "./components/Tabs/TabsController";

function App() {
  return (
    <div className="App">
      <TabsController identifiers={["Listar Bairro", "Listar Polígono"]}>
        <Tab color={"#E6D555"}>
          <NeighbourIdentifier />
        </Tab>
        <Tab color={"#596466"}>Listar Polígonos</Tab>
      </TabsController>
    </div>
  );
}

export default App;
