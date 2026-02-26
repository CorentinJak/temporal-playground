import { useState } from "react";
import "./internationalHandle.page.css";
import SettingsPanel from "./components/settingsPanel.component";
import ResultsPanel from "./components/resultsPanel.component";

function InternationalHandlePage() {
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

  const handleTimezoneChange = (newZone: string) => {
    setZdt((currentZdt) => currentZdt.withTimeZone(newZone));
  };

  const handleCalendarChange = (newCalendar: string) => {
    setZdt((prev) => prev.withCalendar(newCalendar));
  };

  return (
    <div className="internation-handle-content">
      <div className="split-view">
        <SettingsPanel
          timezones={timezones}
          calendars={calendars}
          locale={locale}
          setLocale={setLocale}
          displayOptions={displayOptions}
          updateDisplayOption={updateDisplayOption}
          zdt={zdt}
          handleTimezoneChange={handleTimezoneChange}
          handleCalendarChange={handleCalendarChange}
          options={options}
          updateOption={updateOption}
        />

        <ResultsPanel
          zdt={zdt}
          locale={locale}
          displayOptions={displayOptions}
          options={options}
        />
      </div>
    </div>
  );
}

export default InternationalHandlePage;
