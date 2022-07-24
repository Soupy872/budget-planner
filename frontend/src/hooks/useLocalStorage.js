import { useState } from "react";

const useLocalStorage = (key, value) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const localValue = localStorage.getItem(key);

            return localValue ? JSON.parse(localValue) : value;
        } catch(e) {
            console.log(e);
            return value;
        }
    });

    const setValue = (value) => {
        try {
          const valueToStore =
            value instanceof Function ? value(storedValue) : value;
          setStoredValue(valueToStore);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (error) {
          console.log(error);
        }
      };

    return [storedValue, setValue];
}

export default useLocalStorage;