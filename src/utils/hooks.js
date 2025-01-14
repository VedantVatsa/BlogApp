import { useState, useCallback } from "react";

export function useDebounce(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);

  return useCallback(
    (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeoutId(
        setTimeout(() => {
          callback(...args);
        }, delay)
      );
    },
    [callback, delay, timeoutId]
  );
}
