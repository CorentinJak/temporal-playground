import { useState } from "react";
import "./icsGenerator.page.css";
import EventForm from "./components/eventForm.component";
import IcsPreview from "./components/icsPreview.component";

function IcsGeneratorPage() {
  const [eventData, setEventData] = useState({
    title: "Ma réunion",
    description: "Description de l'événement",
    startDate: Temporal.Now.plainDateISO(),
    startTime: "14:00",
    endTime: "15:00",
    location: "Bureau",
    timezone: "Europe/Paris",
  });

  const generateICS = () => {
    // Parse start and end times
    const [startHour, startMinute] = eventData.startTime.split(":").map(Number);
    const [endHour, endMinute] = eventData.endTime.split(":").map(Number);

    // Create PlainDateTime objects
    const startPlainDT = eventData.startDate.toPlainDateTime(
      new Temporal.PlainTime(startHour, startMinute),
    );
    const endPlainDT = eventData.startDate.toPlainDateTime(
      new Temporal.PlainTime(endHour, endMinute),
    );

    // Create ZonedDateTime objects
    const startZDT = startPlainDT.toZonedDateTime(eventData.timezone);
    const endZDT = endPlainDT.toZonedDateTime(eventData.timezone);

    // Format for ICS (UTC format: 20260220T140000Z)
    const startUTC =
      startZDT.toInstant().toString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endUTC =
      endZDT.toInstant().toString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // Get current timestamp for DTSTAMP
    const now = Temporal.Now.zonedDateTimeISO();
    const dtstamp =
      now.toInstant().toString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const uid = now.toInstant().epochNanoseconds.toString();

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Temporal Playground//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}@temporal-playground.local
DTSTAMP:${dtstamp}
DTSTART:${startUTC}
DTEND:${endUTC}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
TZID:${eventData.timezone}
END:VEVENT
END:VCALENDAR`;

    return icsContent;
  };

  const downloadICS = () => {
    const icsContent = generateICS();
    const element = document.createElement("a");
    element.href =
      "data:text/calendar;charset=utf-8," + encodeURIComponent(icsContent);
    element.download = `${eventData.title}.ics`;
    element.click();
  };

  return (
    <div className="ics-generator-content">
      <h1>Générateur d'invite ICS</h1>

      <div className="ics-container">
        <EventForm eventData={eventData} setEventData={setEventData} />
        <IcsPreview icsContent={generateICS()} onDownload={downloadICS} />
      </div>
    </div>
  );
}

export default IcsGeneratorPage;
