import React from "react";

interface RoundingState {
  readonly smallestUnit: "day" | "hour" | "minute" | "second";
  readonly roundingIncrement: number;
  readonly roundingMode: "ceil" | "floor" | "expand" | "trunc" | "halfExpand";
}

interface RoundingBlockProps {
  readonly baseZdt: Temporal.ZonedDateTime;
}

export default function RoundingBlock({ baseZdt }: RoundingBlockProps) {
  const [selectedZdt, setSelectedZdt] =
    React.useState<Temporal.ZonedDateTime>(baseZdt);
  const [rounding, setRounding] = React.useState<RoundingState>({
    smallestUnit: "minute",
    roundingIncrement: 15,
    roundingMode: "ceil",
  });
  const [roundingError, setRoundingError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      selectedZdt.round({
        smallestUnit: rounding.smallestUnit,
        roundingIncrement: rounding.roundingIncrement,
        roundingMode: rounding.roundingMode,
      });
      setRoundingError(null);
    } catch (error) {
      setRoundingError(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'arrondi avec cette configuration",
      );
    }
  }, [selectedZdt, rounding]);

  let rounded: Temporal.ZonedDateTime | null = null;
  if (!roundingError) {
    try {
      rounded = selectedZdt.round({
        smallestUnit: rounding.smallestUnit,
        roundingIncrement: rounding.roundingIncrement,
        roundingMode: rounding.roundingMode,
      });
    } catch {
      // Error already captured in useEffect
    }
  }

  const handleSmallestUnitChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRounding((prev) => ({
      ...prev,
      smallestUnit: e.target.value as RoundingState["smallestUnit"],
    }));
  };

  const handleRoundingModeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRounding((prev) => ({
      ...prev,
      roundingMode: e.target.value as RoundingState["roundingMode"],
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = Temporal.PlainDate.from(e.target.value);
    setSelectedZdt(
      selectedZdt.with({
        year: newDate.year,
        month: newDate.month,
        day: newDate.day,
      }),
    );
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    setSelectedZdt(
      selectedZdt.with({
        hour: hours,
        minute: minutes,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
      }),
    );
  };

  // Valider et adapter l'incrément selon l'unité
  const validIncrementOptions = React.useMemo(() => {
    if (
      rounding.smallestUnit === "minute" ||
      rounding.smallestUnit === "second"
    ) {
      return [1, 5, 10, 15, 30];
    }
    return [1]; // Pour "day" et "hour", seulement 1 est valide
  }, [rounding.smallestUnit]);

  // Réinitialiser l'incrément si la valeur n'est pas valide pour la nouvelle unité
  const shouldResetIncrement =
    rounding.roundingIncrement > 1 &&
    (rounding.smallestUnit === "day" || rounding.smallestUnit === "hour");

  if (shouldResetIncrement) {
    setRounding((prev) => ({
      ...prev,
      roundingIncrement: 1,
    }));
  }

  return (
    <div className="test-block highlight-result">
      <div className="block-header">
        <h2>Test 4: Arrondi</h2>
        <span className="block-label">
          Arrondir une date-heure avec différentes options
        </span>
      </div>

      <div className="block-content">
        <div className="block-inputs">
          <div className="current-value">
            <span>Date-heure à arrondir:</span>
            <p className="date-display">
              {selectedZdt.toString({
                timeZoneName: "never",
                offset: "never",
              })}
            </p>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div className="custom-date-input">
              <label htmlFor="rounding-date" style={{ minWidth: "100px" }}>
                Date à arrondir:
              </label>
              <input
                id="rounding-date"
                type="date"
                value={selectedZdt.toPlainDate().toString()}
                onChange={handleDateChange}
              />
            </div>

            <div className="custom-date-input">
              <label htmlFor="rounding-time" style={{ minWidth: "100px" }}>
                Heure à arrondir:
              </label>
              <input
                id="rounding-time"
                type="time"
                value={`${String(selectedZdt.hour).padStart(2, "0")}:${String(selectedZdt.minute).padStart(2, "0")}`}
                onChange={handleTimeChange}
              />
            </div>

            <hr style={{ margin: "1rem 0", opacity: 0.3 }} />

            <div className="control-group">
              <label htmlFor="smallest-unit">Plus petite unité</label>
              <select
                id="smallest-unit"
                value={rounding.smallestUnit}
                onChange={handleSmallestUnitChange}
                style={{ width: "100%" }}
              >
                <option value="day">Jour</option>
                <option value="hour">Heure</option>
                <option value="minute">Minute</option>
                <option value="second">Seconde</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="rounding-increment">Incrément d'arrondi</label>
              <select
                id="rounding-increment"
                value={rounding.roundingIncrement}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value, 10);
                  setRounding((prev) => ({
                    ...prev,
                    roundingIncrement: value,
                  }));
                }}
                style={{ width: "100%" }}
              >
                {validIncrementOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="rounding-mode">Mode d'arrondi</label>
              <select
                id="rounding-mode"
                value={rounding.roundingMode}
                onChange={handleRoundingModeChange}
                style={{ width: "100%" }}
              >
                <option value="ceil">Arrondi supérieur (ceil)</option>
                <option value="floor">Arrondi inférieur (floor)</option>
                <option value="trunc">Troncature (trunc)</option>
                <option value="halfExpand">
                  Arrondi demi-supérieur (halfExpand)
                </option>
                <option value="expand">Expansion (expand)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="block-results">
          {roundingError && (
            <div className="result-section">
              <h4 style={{ color: "var(--color-error, #e74c3c)" }}>
                ❌ Erreur
              </h4>
              <p style={{ color: "var(--color-error, #e74c3c)" }}>
                {roundingError}
              </p>
            </div>
          )}
          {!roundingError && rounded && (
            <div className="result-section">
              <h4>Résultat de l'arrondi:</h4>
              <p className="date-display">
                {rounded.toString({
                  timeZoneName: "never",
                  offset: "never",
                })}
              </p>

              <div className="code-section">
                <h5>Code utilisé:</h5>
                <pre className="code-block">{`selectedZdt.round({
  smallestUnit: '${rounding.smallestUnit}',
  roundingIncrement: ${rounding.roundingIncrement},
  roundingMode: '${rounding.roundingMode}'
})`}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
