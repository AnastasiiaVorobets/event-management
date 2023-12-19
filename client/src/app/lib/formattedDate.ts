export const formatToISOString = (dateString: string): string => {
  return new Date(dateString).toISOString().replace('T', ' ').slice(0, -8);
};
