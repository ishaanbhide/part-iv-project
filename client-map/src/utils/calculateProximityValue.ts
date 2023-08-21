export const calculateProximityValue = (zoom: number) => {
  // Adjust the following values based on your desired behavior
  const minZoom = 6;
  const maxZoom = 12;
  const minValue = 1;
  const maxValue = 10;

  if (zoom < 6) {
    return maxValue * 10;
  }

  // Ensure zoom is within the range
  const clampedZoom = Math.min(Math.max(zoom, minZoom), maxZoom);

  // Calculate proximity value using linear interpolation
  const proximityValue =
    minValue +
    (maxValue - minValue) * (1 - (clampedZoom - minZoom) / (maxZoom - minZoom));

  return proximityValue;
};
