interface CustomDateBlockProps {
  readonly selectedZdt: Temporal.ZonedDateTime;
  readonly setSelectedZdt: React.Dispatch<
    React.SetStateAction<Temporal.ZonedDateTime>
  >;
}

export default function CustomDateBlock({
  selectedZdt,
  setSelectedZdt,
}: CustomDateBlockProps) {
  return (
    <div className="test-block highlight-result">
      <div className="block-header">
        <h2>Test 2: Date personnalisée</h2>
        <span className="block-label">Testez avec votre propre date</span>
      </div>

      <div className="block-content">
        <div className="block-inputs">
          <div className="custom-date-input">
            <label htmlFor="custom-date">Date:</label>
            <input
              id="custom-date"
              type="date"
              value={selectedZdt.toPlainDate().toString()}
              onChange={(e) => {
                try {
                  const newDate = Temporal.PlainDate.from(e.target.value);
                  const newZdt = newDate
                    .toPlainDateTime({
                      hour: selectedZdt.hour,
                      minute: selectedZdt.minute,
                      second: selectedZdt.second,
                    })
                    .toZonedDateTime(selectedZdt.timeZoneId);
                  setSelectedZdt(newZdt);
                } catch {
                  // Invalid date input, ignore
                }
              }}
            />
          </div>

          <div className="custom-date-input">
            <label htmlFor="custom-time">Heure:</label>
            <input
              id="custom-time"
              type="time"
              value={`${String(selectedZdt.hour).padStart(2, "0")}:${String(selectedZdt.minute).padStart(2, "0")}`}
              onChange={(e) => {
                try {
                  const [hours, minutes] = e.target.value
                    .split(":")
                    .map(Number);
                  const newZdt = selectedZdt.with({
                    hour: hours,
                    minute: minutes,
                  });
                  setSelectedZdt(newZdt);
                } catch {
                  // Invalid time input, ignore
                }
              }}
            />
          </div>
        </div>

        <div className="block-results">
          <div className="result-section">
            <h4>Date et heure sélectionnées:</h4>
            <p className="date-display">{selectedZdt.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
