import { useState } from "react";
import "./datepicker.page.css";

const DatePickerPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    Temporal.Now.plainDateISO().toString()
  );
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [submittedDateTime, setSubmittedDateTime] = useState<string | null>(null);

  const handleSend = () => {
    const dateTime = `${selectedDate}T${selectedTime}`;
    setSubmittedDateTime(dateTime);
    console.log("DateTime sent to server (mock):", dateTime);
  };

  return (
    <div className="datepicker-content">
      <h1>Date & Time Picker</h1>
      <div className="datepicker-container">
        <div className="datepicker-card">
          <h2>Détails de la sélection</h2>
          
          <div className="form-group">
            <label htmlFor="date-input">Choisir une date</label>
            <input
              id="date-input"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="time-input">Choisir une heure</label>
            <input
              id="time-input"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <button className="send-button" onClick={handleSend}>
            Envoyer
          </button>

          {submittedDateTime && (
            <div className="result-message">
              <strong>Succès !</strong> Envoyé : {submittedDateTime.replace('T', ' ')} 
              <br />
              <small>(Format Temporal : {Temporal.PlainDateTime.from(submittedDateTime).toLocaleString()})</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerPage;
