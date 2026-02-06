import { type Modification, getModifiedZdt, updateModification } from "./utils";
import ModificationControls from "./ModificationControls.tsx";

interface ZonedDateTimeBlockProps {
  readonly baseZdt: Temporal.ZonedDateTime;
  readonly zdtModifications: Modification;
  readonly setZdtModifications: React.Dispatch<
    React.SetStateAction<Modification>
  >;
}

export default function ZonedDateTimeBlock({
  baseZdt,
  zdtModifications,
  setZdtModifications,
}: ZonedDateTimeBlockProps) {
  const modifiedZdt = getModifiedZdt(baseZdt, zdtModifications);

  return (
    <div className="test-block highlight-result">
      <div className="block-header">
        <h2>Test 1: ZonedDateTime</h2>
        <span className="block-label">
          Date, heure, et fuseau horaire ({baseZdt.timeZoneId})
        </span>
      </div>

      <div className="block-content">
        <div className="block-inputs">
          <div className="current-value">
            <span>Date-heure actuelle:</span>
            <p className="date-display">
              {baseZdt.toString({
                timeZoneName: "never",
                offset: "never",
              })}
            </p>
          </div>

          <ModificationControls
            mods={zdtModifications}
            onChange={(field: keyof Modification, value: number) =>
              updateModification(setZdtModifications, field, value)
            }
          />
        </div>

        <div className="block-results">
          <div className="result-section">
            <h4>Résultat de la modification:</h4>
            <p className="date-display">
              {modifiedZdt.toString({
                timeZoneName: "never",
                offset: "never",
              })}
            </p>

            <div className="code-section">
              <h5>Code utilisé:</h5>
              <pre className="code-block">{`baseZdt.add({
  years: ${zdtModifications.years},
  months: ${zdtModifications.months},
  days: ${zdtModifications.days},
  hours: ${zdtModifications.hours},
  minutes: ${zdtModifications.minutes},
  seconds: ${zdtModifications.seconds}
})`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
