export default function findNearestItemInArray<T>(
  sortedArray: T[],
  arrayParameter: (item: T) => number,
  parameter: number
): T | undefined {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = arrayParameter(sortedArray[mid]);

    if (value === parameter) {
      return sortedArray[mid];
    }

    if (value < parameter) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  const candidates: Array<{ index: number; diff: number }> = [];

  if (right >= 0) {
    candidates.push({
      index: right,
      diff: Math.abs(parameter - arrayParameter(sortedArray[right])),
    });
  }

  if (left < sortedArray.length) {
    candidates.push({
      index: left,
      diff: Math.abs(parameter - arrayParameter(sortedArray[left])),
    });
  }

  if (candidates.length === 0) return undefined;

  candidates.sort((a, b) => a.diff - b.diff);

  return sortedArray[candidates[0].index];
}
