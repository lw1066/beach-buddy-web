export default function getTidesForToday(tides) {
  const targetDate = new Date();
  targetDate.setHours(1, 0, 0, 0);

  const tideData = tides.filter((tideEvent) => {
    return (
      new Date(tideEvent.Date).getFullYear() === targetDate.getFullYear() &&
      new Date(tideEvent.Date).getMonth() === targetDate.getMonth() &&
      new Date(tideEvent.Date).getDate() === targetDate.getDate()
    );
  });

  return tideData;
}
