import "./EventForm.css";

interface EventFormProps {
  eventData: {
    title: string;
    description: string;
    startDate: Temporal.PlainDate;
    startTime: string;
    endTime: string;
    location: string;
    timezone: string;
  };
  setEventData: (data: EventFormProps["eventData"]) => void;
}

function EventForm({ eventData, setEventData }: EventFormProps) {
  const handleChange = (field: string, value: string) => {
    if (field === "startDate") {
      setEventData({
        ...eventData,
        startDate: Temporal.PlainDate.from(value),
      });
    } else {
      setEventData({
        ...eventData,
        [field]: value,
      });
    }
  };

  return (
    <div className="event-form">
      <h2>Détails de l'événement</h2>

      <div className="form-group">
        <label>Titre</label>
        <input
          type="text"
          value={eventData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Titre de l'événement"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={eventData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description de l'événement"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Date de début</label>
        <input
          type="date"
          value={eventData.startDate.toString()}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Heure de début</label>
          <input
            type="time"
            value={eventData.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Heure de fin</label>
          <input
            type="time"
            value={eventData.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Lieu</label>
        <input
          type="text"
          value={eventData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Lieu de l'événement"
        />
      </div>

      <div className="form-group">
        <label>Fuseau horaire</label>
        <select
          value={eventData.timezone}
          onChange={(e) => handleChange("timezone", e.target.value)}
        >
          <option>Europe/Paris</option>
          <option>Europe/London</option>
          <option>America/New_York</option>
          <option>America/Los_Angeles</option>
          <option>Asia/Tokyo</option>
          <option>Australia/Sydney</option>
          <option>UTC</option>
        </select>
      </div>
    </div>
  );
}

export default EventForm;
