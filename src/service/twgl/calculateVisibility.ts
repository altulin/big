export function calculateVisibility(target: HTMLCanvasElement) {
  const rect = target.getBoundingClientRect();
  const windowWidth = window.innerWidth;

  let visibilityPercentage = 0;

  // console.log(rect.x >= windowWidth);

  //   if (rect.x < rect.width * -1) {
  //     visibilityPercentage = 100;
  //     // console.log(0);
  //   } else if (rect.x >= windowWidth) {
  //     visibilityPercentage = 0;
  //     // console.log(100);
  //   } else {
  //     visibilityPercentage = 50;
  //   }

  //   if (rect.x >= windowHeight) {
  //     visibilityPercentage = 0;
  //   } else if (rect.bottom <= 0) {
  //     visibilityPercentage = 100;
  //   } else {
  //     const distanceFromBottom = windowHeight - rect.top;
  //     const totalDistance = windowHeight + rect.height;
  //     visibilityPercentage = (distanceFromBottom / totalDistance) * 100;
  //   }
  //   console.log(visibilityPercentage);
  return visibilityPercentage.toFixed(2);
}
