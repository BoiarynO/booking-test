export function throttle<A extends unknown[]>(
  func: (...args: A) => void,
  limit: number
): (...args: A) => void {
  let inThrottle = false;

  return (...args: A) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
