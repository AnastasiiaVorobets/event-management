import Event from '../lib/definitions';

export const filterEvents = (events: Event[], filterText: string): Event[] => {
  return events.filter((event) => event.title.toLowerCase().includes(filterText.toLowerCase()));
};
