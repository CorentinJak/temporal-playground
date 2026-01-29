import { useState } from "react";
import "./App.css";
import InternationalHandlePage from "./pages/internationalHandle/internationalHandle.page";
import ManipulationPage from "./pages/manipulation/manipulation.page";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "international" | "manipulation"
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
        </nav>

        {currentPage === "international" ? (
          <InternationalHandlePage />
        ) : (
          <ManipulationPage />
        )}
      </div>
    </>
  );
}

export default App;
