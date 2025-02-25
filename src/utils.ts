export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function throttle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timer: undefined | number;
  return (...args: T) => {
    if (timer !== undefined) {
      return;
    }
    callback(...args);
    timer = setTimeout(() => {
      timer = undefined;
    }, delay);
  };
}
