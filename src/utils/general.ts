import { useState, useEffect } from 'react';

export const debounce = (cb: any, ms: number) => {
  let timeout = 0;

  return function(this: any, ...args: []) {
    const callback = () => cb.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(callback, ms);
  };
};


export const DebounceHook = (value: string, ms: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
}
export default DebounceHook;