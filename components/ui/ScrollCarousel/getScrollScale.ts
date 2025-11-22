export function getScrollScale(
  length: number = 0,
  slidesToShow: number = 0,
  itemWidth: number = 0
): number[] {
  if (!length || !slidesToShow || !itemWidth) return [];
  return Array.from({ length: length - slidesToShow + 1 }).map(
    (_, i) => i * itemWidth
  );
}
