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
          {`zdt.toLocaleString(\n${locale},\n${JSON.stringify(formattingOptions, null, 2)}\n)`}
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
        <div>
          <h4>ISO Standard (Default)</h4>
          <p className="code-block">zonedDateTime.toString()</p>
          <p className="code-block">{zdt.toString()}</p>
        </div>
        <div>
          <h4>UTC Instant</h4>
          <p className="code-block">zonedDateTime.toInstant().toString()</p>
          <p className="code-block">{zdt.toInstant().toString()}</p>
        </div>
        <div>
          <h4>PlainDate</h4>
          <p className="code-block">zonedDateTime.toPlainDate().toString()</p>
          <p className="code-block">{zdt.toPlainDate().toString()}</p>
        </div>
        <div>
          <h4>PlainTime</h4>
          <p className="code-block">zonedDateTime.toPlainTime().toString()</p>
          <p className="code-block">{zdt.toPlainTime().toString()}</p>
        </div>
        <div>
          <h4>PlainDateTime</h4>
          <p className="code-block">
            zonedDateTime.toPlainDateTime().toString()
          </p>
          <p className="code-block">{zdt.toPlainDateTime().toString()}</p>
        </div>
        <div>
          <h4>PlainYearMonth</h4>
          <p className="code-block">
            zonedDateTime.toPlainDate().toPlainYearMonth().toString()
          </p>
          <p className="code-block">
            {zdt.toPlainDate().toPlainYearMonth().toString()}
          </p>
        </div>
        <div>
          <h4>PlainMonthDay</h4>
          <p className="code-block">
            zonedDateTime.toPlainDate().toPlainMonthDay().toString()
          </p>
          <p className="code-block">
            {zdt.toPlainDate().toPlainMonthDay().toString()}
          </p>
        </div>
      </div>
    </div>
  );
}
