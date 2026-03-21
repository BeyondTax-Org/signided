import { useState, useEffect, useRef } from "react";

export function useCountdown(expiresAt: number | null) {
  const [remaining, setRemaining] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const diff = Math.max(0, expiresAt - Date.now());
      setRemaining(diff);
      if (diff <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [expiresAt]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const isUrgent = remaining > 0 && remaining < 2 * 60 * 1000;
  const isExpired = expiresAt !== null && remaining <= 0;

  return { minutes, seconds, remaining, isUrgent, isExpired };
}
