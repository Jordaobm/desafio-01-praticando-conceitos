import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [state, setState] = useState(getLocalStorage(key, initialValue));

  function saveLocalStorage(value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    setState(getLocalStorage(key, initialValue));
  }

  return [state, saveLocalStorage];
}

function getLocalStorage(key: string, initialValue: any) {
  const localStorageValue = localStorage.getItem(key);

  if (localStorageValue) {
    return JSON.parse(localStorageValue);
  }

  return initialValue;
}
