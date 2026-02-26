import { useState, useEffect } from "react";
import "./worldClocks.page.css";
import Clock from "./components/clock.component";
import WorldClocksSettings from "./components/worldClocksSettings.component";

interface TimeZoneClock {
  id: string;
  name: string;
  timezone: string;
  color: string;
}

const TIMEZONES: TimeZoneClock[] = [
  { id: "tokyo", name: "Tokyo", timezone: "Asia/Tokyo", color: "#FF6B6B" },
  {
    id: "hongkong",
    name: "Hong Kong",
    timezone: "Asia/Hong_Kong",
    color: "#4ECDC4",
  },
  { id: "dubai", name: "Dubai", timezone: "Asia/Dubai", color: "#FFE66D" },
  { id: "london", name: "London", timezone: "Europe/London", color: "#95E1D3" },
  { id: "paris", name: "Paris", timezone: "Europe/Paris", color: "#A8E6CF" },
  {
    id: "newyork",
    name: "New York",
    timezone: "America/New_York",
    color: "#FF8B94",
  },
  {
    id: "losangeles",
    name: "Los Angeles",
    timezone: "America/Los_Angeles",
    color: "#B4A7D6",
  },
  {
    id: "sydney",
    name: "Sydney",
    timezone: "Australia/Sydney",
    color: "#FFD3B6",
  },
];

export default function WorldClocksPage() {
  const [update, setUpdate] = useState(0);
  const [locale, setLocale] = useState("en-US");
  const [calendar, setCalendar] = useState("iso8601");
  const [calendars] = useState(() => Intl.supportedValuesOf("calendar"));

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="world-clocks-page">
      <WorldClocksSettings
        locale={locale}
        setLocale={setLocale}
        calendar={calendar}
        setCalendar={setCalendar}
        calendars={calendars}
      />

      <div className="world-clocks-container">
        <div className="world-clocks-header">
          <h2>World Clocks</h2>
          <p className="subtitle">
            Real-time clocks in different time zones using Temporal API
          </p>
        </div>

        <div className="clocks-grid">
          {TIMEZONES.map((tz) => (
            <Clock
              key={tz.id}
              name={tz.name}
              timezone={tz.timezone}
              color={tz.color}
              updateTrigger={update}
              locale={locale}
              calendar={calendar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
