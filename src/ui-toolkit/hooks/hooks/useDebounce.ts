import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // ... need to be able to change that dynamically. // You could also add the "delay" var to inputs array if you ... // Only re-call effect if value changes

  return debouncedValue;
}

// EXAMPLE usage
// let updatedTitle = useDebounce(title, 200);
// useEffect(() => {
//     props.onChange(updatedTitle);
// }, [updatedTitle])
