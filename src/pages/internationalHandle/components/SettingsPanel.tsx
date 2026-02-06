const AVAILABLE_LOCALES = [
  { code: "undefined", label: "🌐 Browser default" },
  { code: "fr-FR", label: "🇫🇷 French (France)" },
  { code: "en-US", label: "🇺🇸 English (US)" },
  { code: "en-GB", label: "🇬🇧 English (UK)" },
  { code: "de-DE", label: "🇩🇪 German" },
  { code: "es-ES", label: "🇪🇸 Spanish" },
  { code: "ja-JP", label: "🇯🇵 Japanese" },
  { code: "zh-CN", label: "🇨🇳 Chinese" },
  { code: "ar-EG", label: "🇪🇬 Arabic (Egypt)" },
  { code: "he-IL", label: "🇮🇱 Hebrew" },
];

interface SettingsPanelProps {
  readonly timezones: string[];
  readonly calendars: string[];
  readonly locale: string;
  readonly setLocale: (locale: string) => void;
  readonly displayOptions: Intl.DateTimeFormatOptions;
  readonly updateDisplayOption: (
    key: keyof Intl.DateTimeFormatOptions,
    value: string | number | undefined,
  ) => void;
  readonly zdt: Temporal.ZonedDateTime;
  readonly handleTimezoneChange: (newZone: string) => void;
  readonly handleCalendarChange: (newCalendar: string) => void;
  readonly options: Temporal.ZonedDateTimeToStringOptions;
  readonly updateOption: (
    key: keyof Temporal.ZonedDateTimeToStringOptions,
    value: string | number | undefined,
  ) => void;
}

export default function SettingsPanel({
  timezones,
  calendars,
  locale,
  setLocale,
  displayOptions,
  updateDisplayOption,
  zdt,
  handleTimezoneChange,
  handleCalendarChange,
  options,
  updateOption,
}: SettingsPanelProps) {
  return (
    <div className="card controls">
      <h2>Settings</h2>

      <div className="control-group highlight-control timezone">
        <label
          htmlFor="timezone-select"
          style={{ color: "var(--color-timezone)" }}
        >
          📍 Timezone
        </label>
        <select
          id="timezone-select"
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
        <label
          htmlFor="calendar-select"
          style={{ color: "var(--color-calendar)" }}
        >
          📅 Calendar
        </label>
        <select
          id="calendar-select"
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
        <label htmlFor="locale-select" style={{ color: "var(--color-locale)" }}>
          🗣️ Language
        </label>
        <select
          id="locale-select"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
        >
          {AVAILABLE_LOCALES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group highlight-control format">
        <label htmlFor="format-group" style={{ color: "var(--color-format)" }}>
          🎨 Format (Styles)
        </label>
        <div className="input-row" id="format-group">
          <div>
            <label htmlFor="date-style">Date</label>
            <select
              id="date-style"
              value={displayOptions.dateStyle || "none"}
              onChange={(e) => updateDisplayOption("dateStyle", e.target.value)}
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
            <label htmlFor="time-style">Time</label>
            <select
              id="time-style"
              value={displayOptions.timeStyle || "none"}
              onChange={(e) => updateDisplayOption("timeStyle", e.target.value)}
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
      <h2>Technical Options (ISO)</h2>

      <div className="control-group">
        <label htmlFor="offset-select">Offset</label>
        <select
          id="offset-select"
          value={options.offset}
          onChange={(e) => updateOption("offset", e.target.value)}
        >
          <option value="auto">auto</option>
          <option value="never">never</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="timezone-name-select">TimeZone Name</label>
        <select
          id="timezone-name-select"
          value={options.timeZoneName}
          onChange={(e) => updateOption("timeZoneName", e.target.value)}
        >
          <option value="auto">auto</option>
          <option value="never">never</option>
          <option value="critical">critical</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="smallest-unit-select">Smallest Unit</label>
        <select
          id="smallest-unit-select"
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
        <label htmlFor="fractional-digits-select">Fractional Digits</label>
        <select
          id="fractional-digits-select"
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
  );
}
