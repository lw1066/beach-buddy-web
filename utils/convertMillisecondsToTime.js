export const convertMillisecondsToTime = (milliseconds) => {
  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const time = `${hours} hrs and ${minutes} mins`;
  return time;
};
