import "./worldClocksSettings.component.css";

interface WorldClocksSettingsProps {
  locale: string;
  setLocale: (locale: string) => void;
  calendar: string;
  setCalendar: (calendar: string) => void;
  calendars: string[];
}

export default function WorldClocksSettings({
  locale,
  setLocale,
  calendar,
  setCalendar,
  calendars,
}: Readonly<WorldClocksSettingsProps>) {
  // Common locales for quick access
  const commonLocales = [
    "en-US",
    "en-GB",
    "fr-FR",
    "de-DE",
    "es-ES",
    "it-IT",
    "ja-JP",
    "zh-CN",
    "ar-SA",
    "ru-RU",
  ];

  return (
    <div className="world-clocks-settings">
      <div className="settings-card">
        <h3>Display Settings</h3>

        <div className="settings-group">
          <label htmlFor="locale-select">Locale:</label>
          <select
            id="locale-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="settings-select"
          >
            <optgroup label="Common Locales">
              {commonLocales.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </optgroup>
          </select>
          <p className="settings-hint">Current: {locale}</p>
        </div>

        <div className="settings-group">
          <label htmlFor="calendar-select">Calendar:</label>
          <select
            id="calendar-select"
            value={calendar}
            onChange={(e) => setCalendar(e.target.value)}
            className="settings-select"
          >
            <option value="iso8601">ISO 8601 (Default)</option>
            {calendars.map((cal) => (
              <option key={cal} value={cal}>
                {cal.charAt(0).toUpperCase() + cal.slice(1)}
              </option>
            ))}
          </select>
          <p className="settings-hint">Current: {calendar}</p>
        </div>
      </div>
    </div>
  );
}
