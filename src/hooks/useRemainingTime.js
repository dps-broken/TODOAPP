import { useState, useEffect } from 'react';

const calculateTimeLeft = (dueDate) => {
  const difference = +new Date(dueDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  }
  return timeLeft;
};

export const useRemainingTime = (dueDate) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dueDate));

  useEffect(() => {
    // No need to run timer if the task is overdue
    if (+new Date(dueDate) < +new Date()) {
      setTimeLeft({});
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(dueDate);
      if (newTimeLeft.total > 0) {
        setTimeLeft(newTimeLeft);
      } else {
        setTimeLeft({});
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dueDate]);
  
  return timeLeft;
};