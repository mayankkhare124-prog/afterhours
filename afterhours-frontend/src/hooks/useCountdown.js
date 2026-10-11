import { useEffect, useState } from 'react';

export default function useCountdown(targetIso, enabled = true) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled || !targetIso) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetIso, enabled]);

  if (!enabled || !targetIso) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false, inactive: true };
  }

  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    ended: diff <= 0,
    inactive: false,
  };
}
