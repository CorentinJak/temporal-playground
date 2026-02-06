export interface Modification {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const getModifiedZdt = (
  zdt: Temporal.ZonedDateTime,
  mods: Modification,
): Temporal.ZonedDateTime => {
  return zdt.add({
    years: mods.years,
    months: mods.months,
    days: mods.days,
    hours: mods.hours,
    minutes: mods.minutes,
    seconds: mods.seconds,
  });
};

export const formatTimeDifference = (duration: Temporal.Duration): string => {
  const units: Array<[keyof Temporal.Duration, string, string]> = [
    ["years", "an", "ans"],
    ["months", "mois", "mois"],
    ["weeks", "semaine", "semaines"],
    ["days", "jour", "jours"],
    ["hours", "heure", "heures"],
    ["minutes", "minute", "minutes"],
    ["seconds", "seconde", "secondes"],
    ["milliseconds", "ms", "ms"],
    ["microseconds", "µs", "µs"],
    ["nanoseconds", "ns", "ns"],
  ];

  const parts = units
    .filter(([key]) => duration[key] !== 0)
    .map(([key, singular, plural]) => {
      const value = Math.abs(duration[key] as number);
      const label = value > 1 ? plural : singular;
      return `${value} ${label}`;
    });

  return parts.length === 0 ? "0 seconde" : parts.join(", ");
};

export const updateModification = (
  setter: React.Dispatch<React.SetStateAction<Modification>>,
  field: keyof Modification,
  value: number,
) => {
  setter((prev: Modification) => ({ ...prev, [field]: value }));
};
