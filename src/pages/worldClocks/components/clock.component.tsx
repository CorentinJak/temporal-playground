import { useEffect, useState } from "react";
import "./clock.component.css";

interface ClockProps {
  name: string;
  timezone: string;
  color: string;
  updateTrigger: number;
  locale: string;
  calendar: string;
}

export default function Clock({
  name,
  timezone,
  color,
  updateTrigger,
  locale,
  calendar,
}: Readonly<ClockProps>) {
  const [zdt, setZdt] = useState<Temporal.ZonedDateTime | null>(null);

  useEffect(() => {
    try {
      const now = Temporal.Now.zonedDateTimeISO(timezone);
      setZdt(now);
    } catch (error) {
      console.error(`Error creating ZonedDateTime for ${timezone}:`, error);
    }
  }, [timezone, updateTrigger, setZdt, calendar]);

  if (!zdt) {
    return <div className="clock-card">Loading...</div>;
  }

  const hours = zdt.hour.toString().padStart(2, "0");
  const minutes = zdt.minute.toString().padStart(2, "0");
  const seconds = zdt.second.toString().padStart(2, "0");
  const date = zdt.toLocaleString(locale, {
    dateStyle: "medium",
    calendar: calendar === "iso8601" ? undefined : calendar,
  });

  const secondsAngle = (zdt.second / 60) * 360;
  const minutesAngle = ((zdt.minute + zdt.second / 60) / 60) * 360;
  const hoursAngle = ((zdt.hour % 12) + zdt.minute / 60) * 30;

  return (
    <div className="clock-card">
      <div className="clock-header">
        <h3 style={{ color }}>{name}</h3>
        <p className="timezone-label">{timezone}</p>
      </div>

      <div className="clock-face" style={{ borderColor: color }}>
        <svg viewBox="0 0 200 200" className="clock-svg">
          {/* Marqueurs des heures */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 100 + 85 * Math.cos(angle);
            const y1 = 100 + 85 * Math.sin(angle);
            const x2 = 100 + 95 * Math.cos(angle);
            const y2 = 100 + 95 * Math.sin(angle);
            return (
              <line
                key={`hour-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="2"
              />
            );
          })}

          {/* Centre du cadran */}
          <circle cx="100" cy="100" r="5" fill={color} />

          {/* Aiguille des heures */}
          <line
            x1="100"
            y1="100"
            x2={100 + 50 * Math.sin((hoursAngle * Math.PI) / 180)}
            y2={100 - 50 * Math.cos((hoursAngle * Math.PI) / 180)}
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Aiguille des minutes */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.sin((minutesAngle * Math.PI) / 180)}
            y2={100 - 70 * Math.cos((minutesAngle * Math.PI) / 180)}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Aiguille des secondes */}
          <line
            x1="100"
            y1="100"
            x2={100 + 75 * Math.sin((secondsAngle * Math.PI) / 180)}
            y2={100 - 75 * Math.cos((secondsAngle * Math.PI) / 180)}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="clock-digital">
        <div className="time-display">{`${hours}:${minutes}:${seconds}`}</div>
        <div className="date-display">{date}</div>
      </div>

      <div className="clock-info">
        <div className="info-row">
          <span>UTC Offset:</span>
          <span className="offset" style={{ color }}>
            {zdt.offset}
          </span>
        </div>
        <div className="info-row">
          <span>Calendar:</span>
          <span>{zdt.calendarId}</span>
        </div>
      </div>
    </div>
  );
}
