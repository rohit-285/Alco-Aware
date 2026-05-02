import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export const useSmartNotifications = ({ currentBAC = 0, hoursToSober = 0, drinks = [], drinkLimit }) => {
  const lastDrinkCount = useRef(0);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const sendNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    toast(body, { duration: 5000 });
  };

  useEffect(() => {
    if (!currentBAC || !hoursToSober) return undefined;
    const soberInMs = Math.min(hoursToSober * 3600 * 1000, 2147483647);
    const timer = setTimeout(() => {
      sendNotification('AlcoAware', 'Your estimated BAC has reached 0.00%. Confirm with a certified breathalyzer before driving.');
    }, soberInMs);
    return () => clearTimeout(timer);
  }, [currentBAC, hoursToSober]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentBAC > 0.02) {
        sendNotification('Hydration reminder', 'Drink a glass of water and slow your pace.');
      }
    }, 30 * 60 * 1000);
    return () => clearInterval(timer);
  }, [currentBAC]);

  useEffect(() => {
    if (!drinkLimit || drinks.length === lastDrinkCount.current) return;
    lastDrinkCount.current = drinks.length;
    if (drinks.length >= drinkLimit) {
      sendNotification('Drink limit reached', 'You have reached your planned drink limit for tonight.');
    } else if (drinks.length >= drinkLimit * 0.8) {
      sendNotification('Approaching limit', 'You are near your planned drink limit.');
    }
  }, [drinks.length, drinkLimit]);

  const notifyBACUpdate = (bac, soberHours) => {
    sendNotification('BAC updated', `Current BAC: ${bac}%. Estimated sober in ${Number(soberHours || 0).toFixed(1)} hours.`);
  };

  return { notifyBACUpdate };
};
