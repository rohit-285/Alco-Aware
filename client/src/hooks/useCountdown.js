import { useEffect, useState } from 'react';

export const useCountdown = (hoursToSober = 0) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const seconds = Math.max(0, Math.round(Number(hoursToSober || 0) * 3600));
    setTimeLeft(seconds);
    if (!seconds) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [hoursToSober]);

  return {
    hours: Math.floor(timeLeft / 3600),
    minutes: Math.floor((timeLeft % 3600) / 60),
    seconds: timeLeft % 60,
    totalSeconds: timeLeft
  };
};
