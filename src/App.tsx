import { useState } from "react";
import "./App.css";
import Page2 from "./Page2";

const AVAILABLE_LOCALES = [
  { code: "undefined", label: "🌐 Défaut du navigateur" },
  { code: "fr-FR", label: "🇫🇷 Français (France)" },
  { code: "en-US", label: "🇺🇸 English (US)" },
  { code: "en-GB", label: "🇬🇧 English (UK)" },
  { code: "de-DE", label: "🇩🇪 Allemand" },
  { code: "es-ES", label: "🇪🇸 Espagnol" },
  { code: "ja-JP", label: "🇯🇵 Japonais" },
  { code: "zh-CN", label: "🇨🇳 Chinois" },
  { code: "ar-EG", label: "🇪🇬 Arabe (Egypte)" },
  { code: "he-IL", label: "🇮🇱 Hébreu" },
];

function App() {
  const [currentPage, setCurrentPage] = useState<"page1" | "page2">("page1");
  const [timezones] = useState(() => Intl.supportedValuesOf("timeZone"));
  const [calendars] = useState(() => Intl.supportedValuesOf("calendar"));
  const [locale, setLocale] = useState("fr-FR");
  const [displayOptions, setDisplayOptions] =
    useState<Intl.DateTimeFormatOptions>({
      dateStyle: "full",
      timeStyle: "medium",
    });

  const [zdt, setZdt] = useState(() =>
    Temporal.Now.zonedDateTimeISO("Europe/Paris"),
  );

  const [options, setOptions] = useState<Temporal.ZonedDateTimeToStringOptions>(
    {
      fractionalSecondDigits: "auto",
      smallestUnit: "minute",
      roundingMode: "halfExpand",
      calendarName: "auto",
      timeZoneName: "never",
      offset: "never",
    },
  );

  const updateOption = (
    key: keyof Temporal.ZonedDateTimeToStringOptions,
    value: string | number | undefined,
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const updateDisplayOption = (
    key: keyof Intl.DateTimeFormatOptions,
    value: string | number | undefined,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      [key]: value === "none" ? undefined : value,
    }));
  };

  const formattingOptions = {
    calendar: zdt.calendarId,
    ...displayOptions,
  };

  const handleTimezoneChange = (newZone: string) => {
    setZdt((currentZdt) => currentZdt.withTimeZone(newZone));
  };

  const handleCalendarChange = (newCalendar: string) => {
    setZdt((prev) => prev.withCalendar(newCalendar));
  };

  // Si on est sur la page 2, afficher le contenu de la page 2
  if (currentPage === "page2") {
    return (
      <div className="container">
        <nav className="menu">
          <button
            className={currentPage === "page1" ? "active" : ""}
            onClick={() => setCurrentPage("page1")}
          >
            Page 1
          </button>
          <button
            className={currentPage === "page2" ? "active" : ""}
            onClick={() => setCurrentPage("page2")}
          >
            Page 2
          </button>
        </nav>
        <Page2 />
      </div>
    );
  }

  return (
    <div className="container">
      <nav className="menu">
        <button
          className={currentPage === "page1" ? "active" : ""}
          onClick={() => setCurrentPage("page1")}
        >
          Page 1
        </button>
        <button
          className={currentPage === "page2" ? "active" : ""}
          onClick={() => setCurrentPage("page2")}
        >
          Page 2
        </button>
      </nav>
      <h1>Temporal Playground</h1>

      <div className="split-view">
        {/* --- COLONNE GAUCHE : CONFIGURATION --- */}
        <div className="card controls">
          <h2>Paramètres</h2>

          <div className="control-group highlight-control timezone">
            <label style={{ color: "var(--color-timezone)" }}>
              📍 Localisation
            </label>
            <select
              value={zdt.timeZoneId}
              onChange={(e) => handleTimezoneChange(e.target.value)}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group highlight-control calendar">
            <label style={{ color: "var(--color-calendar)" }}>
              📅 Calendrier
            </label>
            <select
              value={zdt.calendarId}
              onChange={(e) => handleCalendarChange(e.target.value)}
            >
              {calendars.map((cal) => (
                <option key={cal} value={cal}>
                  {cal}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group highlight-control locale">
            <label style={{ color: "var(--color-locale)" }}>🗣️ Langue</label>
            <select value={locale} onChange={(e) => setLocale(e.target.value)}>
              {AVAILABLE_LOCALES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group highlight-control format">
            <label style={{ color: "var(--color-format)" }}>
              🎨 Format (Styles)
            </label>
            <div className="input-row">
              <div>
                <label>Date</label>
                <select
                  value={displayOptions.dateStyle || "none"}
                  onChange={(e) =>
                    updateDisplayOption("dateStyle", e.target.value)
                  }
                  style={{ width: "100%" }}
                >
                  <option value="full">full</option>
                  <option value="long">long</option>
                  <option value="medium">medium</option>
                  <option value="short">short</option>
                  <option value="none">none</option>
                </select>
              </div>

              <div>
                <label>Time</label>
                <select
                  value={displayOptions.timeStyle || "none"}
                  onChange={(e) =>
                    updateDisplayOption("timeStyle", e.target.value)
                  }
                  style={{ width: "100%" }}
                >
                  <option value="full">full</option>
                  <option value="long">long</option>
                  <option value="medium">medium</option>
                  <option value="short">short</option>
                  <option value="none">none</option>
                </select>
              </div>
            </div>
          </div>

          <hr />
          <h2>Options Techniques (ISO)</h2>

          <div className="control-group">
            <label>Offset</label>
            <select
              value={options.offset}
              onChange={(e) => updateOption("offset", e.target.value)}
            >
              <option value="auto">auto</option>
              <option value="never">never</option>
            </select>
          </div>

          <div className="control-group">
            <label>TimeZone Name</label>
            <select
              value={options.timeZoneName}
              onChange={(e) => updateOption("timeZoneName", e.target.value)}
            >
              <option value="auto">auto</option>
              <option value="never">never</option>
              <option value="critical">critical</option>
            </select>
          </div>

          <div className="control-group">
            <label>Smallest Unit</label>
            <select
              value={options.smallestUnit}
              onChange={(e) => updateOption("smallestUnit", e.target.value)}
            >
              <option value="minute">minute</option>
              <option value="second">second</option>
              <option value="millisecond">millisecond</option>
              <option value="microsecond">microsecond</option>
              <option value="nanosecond">nanosecond</option>
            </select>
          </div>

          <div className="control-group">
            <label>Fractional Digits</label>
            <select
              value={options.fractionalSecondDigits?.toString()}
              onChange={(e) => {
                const val = e.target.value;
                updateOption(
                  "fractionalSecondDigits",
                  val === "auto" ? "auto" : Number(val),
                );
              }}
            >
              <option value="auto">auto</option>
              <option value="0">0</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="9">9</option>
            </select>
          </div>
        </div>

        {/* --- COLONNE DROITE : RÉSULTATS --- */}
        <div className="card results">
          <h2>Résultats</h2>

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
              Langue:{" "}
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
            <h3>Serialisation API</h3>
            <h4>Configuration actuelle (JSON)</h4>
            <pre className="code-block">{JSON.stringify(options, null, 2)}</pre>
            <h4>Résultat toString(options)</h4>
            <p className="date-display">{zdt.toString(options)}</p>
          </div>
          <hr />
          <div className="result-block highlight-result">
            <h3>Pour l'utilisateur (toLocaleString)</h3>

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
              <span>Année : {zdt.year}</span>
              <span>Mois : {zdt.month}</span>
              <span>Jour : {zdt.day}</span>
              <span>Era : {zdt.era ?? "N/A"}</span>
            </div>
          </div>

          <hr />

          <div className="result-block highlight-result">
            <h3>Valeurs statiques</h3>
            <div style={{ marginBottom: "1rem" }}>
              <h4>ISO Standard (Défaut)</h4>
              <p className="code-block">{zdt.toString()}</p>
            </div>
            <div>
              <h4>UTC Instant</h4>
              <p className="code-block">{zdt.toInstant().toString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
