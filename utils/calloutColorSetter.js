export const calloutColorSetter = (rating) => {
  let color = "#008A08";
  if (rating === "Good") color = "#1C7FCB";
  if (rating === "Sufficient") color = "#CB8F1C";
  if (rating === "Poor") color = "#603101";
  if (rating === "No rating available") color = "#676767";
  return color;
};
