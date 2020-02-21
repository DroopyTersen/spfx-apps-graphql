import { useState, useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let intervalId = null;
    if (delay > 0) {
      intervalId = setInterval(tick, delay);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, [delay]);
}
