import { useState } from "react";
import "./App.css";
import InternationalHandlePage from "./pages/internationalHandle/internationalHandle.page";
import ManipulationPage from "./pages/manipulation/manipulation.page";
import IcsGeneratorPage from "./pages/icsGenerator/icsGenerator.page";
import WorldClocksPage from "./pages/worldClocks/worldClocks.page";

type PageType = "international" | "manipulation" | "ics" | "worldClocks";

interface PageConfig {
  id: PageType;
  label: string;
  component: React.FC;
}

const PAGES: PageConfig[] = [
  {
    id: "international",
    label: "International Handler",
    component: InternationalHandlePage,
  },
  {
    id: "manipulation",
    label: "Manipulation",
    component: ManipulationPage,
  },
  {
    id: "ics",
    label: "ICS Generator",
    component: IcsGeneratorPage,
  },
  {
    id: "worldClocks",
    label: "World Clocks",
    component: WorldClocksPage,
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("worldClocks");

  const currentPageConfig = PAGES.find((page) => page.id === currentPage);
  const CurrentPageComponent = currentPageConfig?.component;

  return (
    <>
      <h1 style={{ margin: "1rem", display: "flex", justifyContent: "center" }}>
        Temporal Playground
      </h1>
      <div className="container">
        <nav className="menu">
          {PAGES.map((page) => (
            <button
              key={page.id}
              className={currentPage === page.id ? "active" : ""}
              onClick={() => setCurrentPage(page.id)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        {CurrentPageComponent && <CurrentPageComponent />}
      </div>
    </>
  );
}

export default App;
