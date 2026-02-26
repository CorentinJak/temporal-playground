import { useState } from "react";
import "./manipulation.page.css";
import type { Modification } from "./components/utils";
import ZonedDateTimeBlock from "./components/zonedDateTimeBlock.component";
import CustomDateBlock from "./components/customDateBlock.component";
import TimeDifferenceBlock from "./components/timeDifferenceBlock.component";
import RoundingBlock from "./components/roundingBlock.component";
import ComparingAndSortingBlock from "./components/comparingAndSortingBlock.component";

function ManipulationPage() {
  const [baseDate] = useState(() => Temporal.Now.plainDateISO());
  const [baseZdt] = useState(() => Temporal.Now.zonedDateTimeISO());

  // État pour les 3 blocs de test
  const [zdtModifications, setZdtModifications] = useState<Modification>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [selectedZdt, setSelectedZdt] =
    useState<Temporal.ZonedDateTime>(baseZdt);

  // État pour le bloc 3 (calcul de différence de temps)
  const [targetZdt, setTargetZdt] = useState<Temporal.ZonedDateTime>(
    baseZdt.add({ days: 30 }),
  );
  const [largestUnit, setLargestUnit] = useState<Temporal.DateTimeUnit>("day");

  return (
    <div className="manipulation-content">
      <h1>Tests de manipulation Temporal</h1>

      <div className="info-bar">
        <span>
          Aujourd'hui:{" "}
          <strong style={{ color: "var(--color-dates)" }}>
            {baseDate.toString()}
          </strong>
        </span>
        <span className="separator">|</span>
        <span>
          Maintenant:{" "}
          <strong style={{ color: "var(--color-dates)" }}>
            {baseZdt.toString({ timeZoneName: "never", offset: "never" })}
          </strong>
        </span>
      </div>

      <ZonedDateTimeBlock
        baseZdt={baseZdt}
        zdtModifications={zdtModifications}
        setZdtModifications={setZdtModifications}
      />

      <CustomDateBlock
        selectedZdt={selectedZdt}
        setSelectedZdt={setSelectedZdt}
      />

      <TimeDifferenceBlock
        baseZdt={baseZdt}
        targetZdt={targetZdt}
        setTargetZdt={setTargetZdt}
        largestUnit={largestUnit}
        setLargestUnit={setLargestUnit}
      />

      <RoundingBlock baseZdt={baseZdt} />

      <ComparingAndSortingBlock baseZdt={baseZdt} />
    </div>
  );
}

export default ManipulationPage;
