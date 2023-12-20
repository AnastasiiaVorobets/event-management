import Event from './definitions';

export const updateEvents = (events: Event[], submittedEvent: Event, editEvent: Event | null) => {
  return editEvent
    ? events.map((e) => (e.id === submittedEvent.id ? submittedEvent : e))
    : [...events, submittedEvent];
};
