import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-05-15T19:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="gold-border gold-glow rounded-lg bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[90px]">
        <span className="font-display text-3xl sm:text-5xl font-bold gold-gradient-text tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs sm:text-sm font-body uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      <Digit value={time.days} label="Days" />
      <Digit value={time.hours} label="Hours" />
      <Digit value={time.minutes} label="Minutes" />
      <Digit value={time.seconds} label="Seconds" />
    </div>
  );
}
