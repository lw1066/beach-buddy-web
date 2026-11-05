export default function infoDataFresh(storedDate) {
  const parsedDate = Date.parse(storedDate);
  const now = Date.now();
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;
  return parsedDate >= twoWeeksAgo;
}
