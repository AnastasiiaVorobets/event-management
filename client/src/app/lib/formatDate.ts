export const formatDate = (dateString: string): string => {
  const formattedDate = new Date(dateString).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return formattedDate;
};