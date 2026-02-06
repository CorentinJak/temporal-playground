import React from "react";

interface ComparingAndSortingBlockProps {
  readonly baseZdt: Temporal.ZonedDateTime;
}

export default function ComparingAndSortingBlock({
  baseZdt,
}: ComparingAndSortingBlockProps) {
  const [date1, setDate1] = React.useState<Temporal.ZonedDateTime>(baseZdt);
  const [date2, setDate2] = React.useState<Temporal.ZonedDateTime>(
    baseZdt.add({ hours: 5 }),
  );

  const comparisonResult = Temporal.ZonedDateTime.compare(date1, date2);
  const isBefore = comparisonResult < 0;
  const isAfter = comparisonResult > 0;
  const isEqual = comparisonResult === 0;

  const sortedDates = [date2, date1].sort(Temporal.ZonedDateTime.compare);

  const handleDate1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = Temporal.PlainDate.from(e.target.value);
    setDate1(
      date1.with({
        year: newDate.year,
        month: newDate.month,
        day: newDate.day,
      }),
    );
  };

  const handleTime1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    setDate1(
      date1.with({
        hour: hours,
        minute: minutes,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
    );
  };

  const handleDate2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = Temporal.PlainDate.from(e.target.value);
    setDate2(
      date2.with({
        year: newDate.year,
        month: newDate.month,
        day: newDate.day,
      }),
    );
  };

  const handleTime2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    setDate2(
      date2.with({
        hour: hours,
        minute: minutes,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
    );
  };

  return (
    <div className="test-block highlight-result">
      <div className="block-header">
        <h2>Test 5: Comparaison et Tri</h2>
        <span className="block-label">
          Comparer et trier des dates avec Temporal
        </span>
      </div>

      <div className="block-content">
        <div className="block-inputs">
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Date 1</h4>
            <div className="custom-date-input">
              <label htmlFor="compare-date1" style={{ minWidth: "100px" }}>
                Date:
              </label>
              <input
                id="compare-date1"
                type="date"
                value={date1.toPlainDate().toString()}
                onChange={handleDate1Change}
              />
            </div>

            <div className="custom-date-input">
              <label htmlFor="compare-time1" style={{ minWidth: "100px" }}>
                Heure:
              </label>
              <input
                id="compare-time1"
                type="time"
                value={`${String(date1.hour).padStart(2, "0")}:${String(date1.minute).padStart(2, "0")}`}
                onChange={handleTime1Change}
              />
            </div>
          </div>

          <div
            style={{
              padding: "0.75rem",
              background:
                "var(--color-background-secondary, rgba(0, 0, 0, 0.05))",
              borderRadius: "4px",
              marginBottom: "1.5rem",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
            }}
          >
            vs
          </div>

          <div>
            <h4 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Date 2</h4>
            <div className="custom-date-input">
              <label htmlFor="compare-date2" style={{ minWidth: "100px" }}>
                Date:
              </label>
              <input
                id="compare-date2"
                type="date"
                value={date2.toPlainDate().toString()}
                onChange={handleDate2Change}
              />
            </div>

            <div className="custom-date-input">
              <label htmlFor="compare-time2" style={{ minWidth: "100px" }}>
                Heure:
              </label>
              <input
                id="compare-time2"
                type="time"
                value={`${String(date2.hour).padStart(2, "0")}:${String(date2.minute).padStart(2, "0")}`}
                onChange={handleTime2Change}
              />
            </div>
          </div>
        </div>

        <div className="block-results">
          <div className="result-section">
            <h4>Résultats de la comparaison:</h4>

            <div
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                background:
                  "var(--color-background-secondary, rgba(0, 0, 0, 0.05))",
                borderRadius: "4px",
              }}
            >
              <p style={{ margin: "0.25rem 0" }}>
                <strong>compare():</strong> {comparisonResult}
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Date 1 est avant Date 2:</strong>{" "}
                <span
                  style={{
                    color: isBefore ? "var(--color-success, green)" : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {isBefore ? "✓" : "✗"} {isBefore.toString()}
                </span>
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Date 1 est après Date 2:</strong>{" "}
                <span
                  style={{
                    color: isAfter ? "var(--color-success, green)" : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {isAfter ? "✓" : "✗"} {isAfter.toString()}
                </span>
              </p>
              <p style={{ margin: "0.25rem 0" }}>
                <strong>Dates égales:</strong>{" "}
                <span
                  style={{
                    color: isEqual ? "var(--color-success, green)" : "gray",
                    fontWeight: "bold",
                  }}
                >
                  {isEqual ? "✓" : "✗"} {isEqual.toString()}
                </span>
              </p>
            </div>

            <h5 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              Tri d'un tableau:
            </h5>
            <p
              className="date-display"
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              <strong>Avant:</strong> [
              {date2.toString({ timeZoneName: "never", offset: "never" })},{" "}
              {date1.toString({ timeZoneName: "never", offset: "never" })}]
            </p>
            <p
              className="date-display"
              style={{
                fontSize: "0.9rem",
              }}
            >
              <strong>Après:</strong> [
              {sortedDates[0].toString({
                timeZoneName: "never",
                offset: "never",
              })}
              ,{" "}
              {sortedDates[1].toString({
                timeZoneName: "never",
                offset: "never",
              })}
              ]
            </p>

            <div className="code-section">
              <h5>Code utilisé:</h5>
              <pre className="code-block">{`// Comparaison
const comparison = Temporal.ZonedDateTime.compare(date1, date2);
const isBefore = comparison < 0;
const isAfter = comparison > 0;
const isEqual = comparison === 0;

// Tri d'un tableau
const list = [date2, date1];
list.sort(Temporal.ZonedDateTime.compare);`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
