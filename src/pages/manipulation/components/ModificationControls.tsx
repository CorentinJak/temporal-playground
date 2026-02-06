import type { Modification } from "./utils";

interface ModificationControlsProps {
  readonly mods: Modification;
  readonly onChange: (field: keyof Modification, value: number) => void;
}

// Composant extrait pour éviter la recréation à chaque render
export default function ModificationControls({
  mods,
  onChange,
}: ModificationControlsProps) {
  return (
    <div className="modifications-grid">
      <div className="modification-input">
        <label htmlFor="years">Années</label>
        <div className="input-with-buttons">
          <button
            onClick={() => onChange("years", mods.years - 1)}
            className="btn-sm"
          >
            −
          </button>
          <input
            id="years"
            type="number"
            value={mods.years}
            onChange={(e) => onChange("years", Number(e.target.value))}
          />
          <button
            onClick={() => onChange("years", mods.years + 1)}
            className="btn-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="modification-input">
        <label htmlFor="months">Mois</label>
        <div className="input-with-buttons">
          <button
            onClick={() => onChange("months", mods.months - 1)}
            className="btn-sm"
          >
            −
          </button>
          <input
            id="months"
            type="number"
            value={mods.months}
            onChange={(e) => onChange("months", Number(e.target.value))}
          />
          <button
            onClick={() => onChange("months", mods.months + 1)}
            className="btn-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="modification-input">
        <label htmlFor="days">Jours</label>
        <div className="input-with-buttons">
          <button
            onClick={() => onChange("days", mods.days - 1)}
            className="btn-sm"
          >
            −
          </button>
          <input
            id="days"
            type="number"
            value={mods.days}
            onChange={(e) => onChange("days", Number(e.target.value))}
          />
          <button
            onClick={() => onChange("days", mods.days + 1)}
            className="btn-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="modification-input">
        <label htmlFor="hours">Heures</label>
        <div className="input-with-buttons">
          <button
            onClick={() => onChange("hours", mods.hours - 1)}
            className="btn-sm"
          >
            −
          </button>
          <input
            id="hours"
            type="number"
            value={mods.hours}
            onChange={(e) => onChange("hours", Number(e.target.value))}
            min="-23"
            max="23"
          />
          <button
            onClick={() => onChange("hours", mods.hours + 1)}
            className="btn-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="modification-input">
        <label htmlFor="minutes">Minutes</label>
        <div className="input-with-buttons">
          <button
            onClick={() => onChange("minutes", mods.minutes - 1)}
            className="btn-sm"
          >
            −
          </button>
          <input
            id="minutes"
            type="number"
            value={mods.minutes}
            onChange={(e) => onChange("minutes", Number(e.target.value))}
            min="-59"
            max="59"
          />
          <button
            onClick={() => onChange("minutes", mods.minutes + 1)}
            className="btn-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="modification-input">
        <label htmlFor="seconds">Secondes</label>
        <div className="input-with-buttons">
          <button
            onClick={() => onChange("seconds", mods.seconds - 1)}
            className="btn-sm"
          >
            −
          </button>
          <input
            id="seconds"
            type="number"
            value={mods.seconds}
            onChange={(e) => onChange("seconds", Number(e.target.value))}
            min="-59"
            max="59"
          />
          <button
            onClick={() => onChange("seconds", mods.seconds + 1)}
            className="btn-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
