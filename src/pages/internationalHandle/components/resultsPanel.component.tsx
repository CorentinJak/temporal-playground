interface ResultsPanelProps {
  readonly zdt: Temporal.ZonedDateTime;
  readonly locale: string;
  readonly displayOptions: Intl.DateTimeFormatOptions;
  readonly options: Temporal.ZonedDateTimeToStringOptions;
}

export default function ResultsPanel({
  zdt,
  locale,
  displayOptions,
  options,
}: ResultsPanelProps) {
  const formattingOptions = {
    calendar: zdt.calendarId,
    ...displayOptions,
  };

  return (
    <div className="card results">
      <h2>Results</h2>

      <div className="info-bar">
        <span>
          Zone:{" "}
          <strong style={{ color: "var(--color-timezone)" }}>
            {zdt.timeZoneId}
          </strong>
        </span>
        <span className="separator">|</span>
        <span>
          Cal:{" "}
          <strong style={{ color: "var(--color-calendar)" }}>
            {zdt.calendarId}
          </strong>
        </span>
        <span className="separator">|</span>
        <span>
          Language:{" "}
          <strong style={{ color: "var(--color-locale)" }}>
            {locale === "undefined" ? "Auto" : locale}
          </strong>
        </span>
        <span className="separator">|</span>
        <span>
          Style:{" "}
          <strong style={{ color: "var(--color-format)" }}>
            {displayOptions.dateStyle || "-"} /{" "}
            {displayOptions.timeStyle || "-"}
          </strong>
        </span>
      </div>

      <div className="result-block highlight-result">
        <h3>Serialization API</h3>
        <h4>Current configuration (JSON)</h4>
        <pre className="code-block">{JSON.stringify(options, null, 2)}</pre>
        <h4>toString(options) result</h4>
        <p className="date-display">{zdt.toString(options)}</p>
      </div>
      <hr />
      <div className="result-block highlight-result">
        <h3>For the user (toLocaleString)</h3>

        <pre className="code-block">
          {`zdt.toLocaleString(
              locale === "undefined" ? undefined : "${locale}",
              ${JSON.stringify(formattingOptions, null, 2)}
            )`}
        </pre>

        <p className="date-display">
          {zdt.toLocaleString(
            locale === "undefined" ? undefined : locale,
            formattingOptions,
          )}
        </p>

        <div className="code-grid">
          <span>Year: {zdt.year}</span>
          <span>Month: {zdt.month}</span>
          <span>Day: {zdt.day}</span>
          <span>Era: {zdt.era ?? "N/A"}</span>
        </div>
      </div>

      <hr />

      <div className="result-block highlight-result">
        <h3>Static values</h3>
        <div style={{ marginBottom: "1rem" }}>
          <h4>ISO Standard (Default)</h4>
          <p className="code-block">{zdt.toString()}</p>
        </div>
        <div>
          <h4>UTC Instant</h4>
          <p className="code-block">{zdt.toInstant().toString()}</p>
        </div>
      </div>
    </div>
  );
}
