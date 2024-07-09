export function calculateVisibility(target: HTMLCanvasElement) {
  const rect = target.getBoundingClientRect();
  const windowWidth = window.innerWidth;

  let visibilityPercentage = 0;
  const { x, width } = rect;

  if (x >= windowWidth) {
    visibilityPercentage = 0;
  } else if (rect.x <= width * -1) {
    visibilityPercentage = 100;
  } else {
    const totalDistance = windowWidth + width;
    const distanceFromRight = x + width;
    visibilityPercentage = (distanceFromRight / totalDistance) * 100;
  }

  return visibilityPercentage.toFixed(2);
}
