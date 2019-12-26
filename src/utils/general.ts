export const debounce = (cb: () => void, ms: number) => {
  let timeout = 0;

  return function(this: any, ...args: []) {
    const callback = () => cb.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(callback, ms);
  };
};
