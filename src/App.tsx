import { useState } from "react";
import "./App.css";
import InternationalHandlePage from "./pages/internationalHandle/internationalHandle.page";
import ManipulationPage from "./pages/manipulation/manipulation.page";
import IcsGeneratorPage from "./pages/icsGenerator/icsGenerator.page";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "international" | "manipulation" | "ics"
  >("international");

  return (
    <>
      <h1 style={{ margin: "1rem", display: "flex", justifyContent: "center" }}>
        Temporal Playground
      </h1>
      <div className="container">
        <nav className="menu">
          <button
            className={currentPage === "international" ? "active" : ""}
            onClick={() => setCurrentPage("international")}
          >
            International Handler
          </button>
          <button
            className={currentPage === "manipulation" ? "active" : ""}
            onClick={() => setCurrentPage("manipulation")}
          >
            Manipulation
          </button>
          <button
            className={currentPage === "ics" ? "active" : ""}
            onClick={() => setCurrentPage("ics")}
          >
            ICS Generator
          </button>
        </nav>

        {currentPage === "international" ? (
          <InternationalHandlePage />
        ) : currentPage === "manipulation" ? (
          <ManipulationPage />
        ) : (
          <IcsGeneratorPage />
        )}
      </div>
    </>
  );
}

export default App;
