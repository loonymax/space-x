export const getDate = (dateData: string) => {
  const date = new Date(dateData);

  const day = date.getDay().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const dateText = date.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
  const dateTime = `${year}-${month}-${day}`;

  return [dateText, dateTime, year];
};
