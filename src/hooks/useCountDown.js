// "use client"
// import React, { useEffect, useState } from 'react'

// const useCountDown = () => {
//   const [currentTime, setCurrentTime] = useState({
//     currentDays: 0,
//     currentHours: 0,
//     currentMinutes: 0,
//     currentSeconds: 0
//   })
//   function updateTargetDate() {
//     const now = new Date();
//     now.setHours(11, 59, 59, 0);
//     const targetDate = now.getTime() + 10 * 24 * 60 * 60 * 1000;
//     return targetDate;
//   }

//   function updateCountdown() {
//     const targetDate = updateTargetDate();
//     const now = new Date().getTime();
//     const timeLeft = targetDate - now;

//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     setCurrentTime({
//       ...currentTime,
//       currentDays: days < 10 ? "0" + days : days,
//       currentHours: hours < 10 ? "0" + hours : hours,
//       currentMinutes: minutes < 10 ? "0" + minutes : minutes,
//       currentSeconds: seconds < 10 ? "0" + seconds : seconds
//     });

//   }

//   useEffect(() => {
//     updateCountdown();
//     setInterval(updateCountdown, 1000);

//   }, [])


//   return currentTime
// }

// export default useCountDown

"use client"
import { useEffect, useState } from "react";

const useCountDown = () => {
  const [currentTime, setCurrentTime] = useState({
    currentDays: "00",
    currentHours: "00",
    currentMinutes: "00",
    currentSeconds: "00"
  });

  function getTargetDate() {
    return new Date(2025, 4, 3, 12, 30, 0, 0).getTime(); // 3 de mayo de 2025 a las 12:30 PM
  }

  function updateCountdown() {
    const targetDate = getTargetDate();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      setCurrentTime({
        currentDays: "00",
        currentHours: "00",
        currentMinutes: "00",
        currentSeconds: "00"
      });
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    setCurrentTime({
      currentDays: days < 10 ? `0${days}` : `${days}`,
      currentHours: hours < 10 ? `0${hours}` : `${hours}`,
      currentMinutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      currentSeconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    });
  }

  useEffect(() => {
    updateCountdown(); // Llamar inmediatamente al montar
    const interval = setInterval(updateCountdown, 1000); // Actualizar cada segundo

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return currentTime;
};

export default useCountDown;
