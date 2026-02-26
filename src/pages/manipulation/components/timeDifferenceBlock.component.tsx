import { formatTimeDifference } from "./utils";

interface TimeDifferenceBlockProps {
  readonly baseZdt: Temporal.ZonedDateTime;
  readonly targetZdt: Temporal.ZonedDateTime;
  readonly setTargetZdt: React.Dispatch<
    React.SetStateAction<Temporal.ZonedDateTime>
  >;
  readonly largestUnit: Temporal.DateTimeUnit;
  readonly setLargestUnit: React.Dispatch<
    React.SetStateAction<Temporal.DateTimeUnit>
  >;
}

export default function TimeDifferenceBlock({
  baseZdt,
  targetZdt,
  setTargetZdt,
  largestUnit,
  setLargestUnit,
}: TimeDifferenceBlockProps) {
  const timeDifference = baseZdt.until(targetZdt, { largestUnit });

  return (
    <div className="test-block highlight-result">
      <div className="block-header">
        <h2>Test 3: Calcul de différence de temps</h2>
        <span className="block-label">
          Calculez le temps jusqu'à une date cible
        </span>
      </div>

      <div className="block-content">
        <div className="block-inputs">
          <div className="custom-date-input">
            <label htmlFor="target-date">Date cible:</label>
            <input
              id="target-date"
              type="date"
              value={targetZdt.toPlainDate().toString()}
              onChange={(e) => {
                try {
                  const newDate = Temporal.PlainDate.from(e.target.value);
                  const newZdt = newDate
                    .toPlainDateTime({
                      hour: targetZdt.hour,
                      minute: targetZdt.minute,
                      second: targetZdt.second,
                    })
                    .toZonedDateTime(targetZdt.timeZoneId);
                  setTargetZdt(newZdt);
                } catch {
                  // Invalid date input, ignore
                }
              }}
            />
          </div>

          <div className="custom-date-input">
            <label htmlFor="target-time">Heure cible:</label>
            <input
              id="target-time"
              type="time"
              value={`${String(targetZdt.hour).padStart(2, "0")}:${String(targetZdt.minute).padStart(2, "0")}`}
              onChange={(e) => {
                try {
                  const [hours, minutes] = e.target.value
                    .split(":")
                    .map(Number);
                  const newZdt = targetZdt.with({
                    hour: hours,
                    minute: minutes,
                  });
                  setTargetZdt(newZdt);
                } catch {
                  // Invalid time input, ignore
                }
              }}
            />
          </div>

          <div className="custom-date-input">
            <label htmlFor="largest-unit">Plus grande unité:</label>
            <select
              id="largest-unit"
              value={largestUnit}
              onChange={(e) =>
                setLargestUnit(e.target.value as Temporal.DateTimeUnit)
              }
            >
              <option value="year">Année</option>
              <option value="month">Mois</option>
              <option value="week">Semaine</option>
              <option value="day">Jour</option>
              <option value="hour">Heure</option>
              <option value="minute">Minute</option>
              <option value="second">Seconde</option>
            </select>
          </div>
        </div>

        <div className="block-results">
          <div className="result-section">
            <h4>Résultat:</h4>
            <p className="date-display">
              <strong>Date cible:</strong> {targetZdt.toString()}
            </p>
            <p className="date-display">
              <strong>Différence:</strong> {timeDifference.toString()}
            </p>
            <p
              className="date-display"
              style={{
                fontSize: "0.95em",
                color: "var(--color-manipulation)",
              }}
            >
              {formatTimeDifference(timeDifference)}
            </p>

            <div className="code-section">
              <h5>Code utilisé:</h5>
              <pre className="code-block">{`const target = Temporal.ZonedDateTime.from('${targetZdt.toString()}');
const now = Temporal.Now.zonedDateTimeISO();

const diff = now.until(target, { largestUnit: '${largestUnit}' });`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
