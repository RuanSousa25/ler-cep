import { useState } from "react";
import "./Tabs.css";

export default function TabsController({ children, identifiers }) {
  const [activeTab, setActiveTab] = useState(0);

  function handleActiveTab(index) {
    console.log(children);
    setActiveTab(index);
  }
  return (
    <div className="tab-controller">
      <nav>
        {identifiers.map((identifier, index) => (
          <button
            className="identifier-button"
            key={identifier}
            style={{ backgroundColor: children[index].props.color }}
            onClick={() => handleActiveTab(index)}
          >
            {identifier}
          </button>
        ))}
      </nav>
      <div className="tabs">
        {children.map((child, index) => (index === activeTab ? child : null))}
      </div>
    </div>
  );
}
