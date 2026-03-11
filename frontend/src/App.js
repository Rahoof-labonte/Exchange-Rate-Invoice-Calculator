import { useState } from "react";
import ConverterForm from "./components/ConverterForm";
import HistoryList from "./components/HistoryList";

function App() {
  
  const [activeTab, setActiveTab] = useState("form");
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Exchange Rate Invoice Calculator
      </h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")} >
            Converter
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")} >
            History
          </button>
        </li>

      </ul>
      <div className="card p-4">
        {activeTab === "form" && <ConverterForm />}
        {activeTab === "history" && <HistoryList />}
      </div>
    </div>
  );
}

export default App;