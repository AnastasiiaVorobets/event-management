import Event from '../lib/definitions';

interface EventSimilarity {
  event: Event;
  dateSimilarity: number;
  locationSimilarity: number;
  categorySimilarity: number;
  overallSimilarity: number;
}

export const recommendEventsAlgorithm = (baseEvent: Event, allEvents: Event[]): Event[] => {
  const similarityThreshold = 0.3;
  const maxDayDifference = 7;

  const calculateDateSimilarity = (eventDate: string) =>
    Math.abs(new Date(eventDate).getTime() - new Date(baseEvent.date).getTime()) <= maxDayDifference * 24 * 60 * 60 * 1000
      ? 1
      : 0;

  const eventSimilarities: EventSimilarity[] = allEvents.map((event) => ({
    event,
    dateSimilarity: calculateDateSimilarity(event.date),
    locationSimilarity: event.location === baseEvent.location ? 1 : 0,
    categorySimilarity: event.category === baseEvent.category ? 1 : 0,
    overallSimilarity: 0,
  }));

  eventSimilarities.forEach((similarity) => {
    similarity.overallSimilarity = (similarity.dateSimilarity + similarity.locationSimilarity + similarity.categorySimilarity) / 3;
  });

  const sortedSimilarities = eventSimilarities.sort((a, b) => {
    if (a.overallSimilarity !== b.overallSimilarity) {
      return b.overallSimilarity - a.overallSimilarity;
    }
    else if (a.event.category && b.event.category) {
      return a.event.category.localeCompare(b.event.category);
    }
    else {
      return (
        Math.abs(new Date(a.event.date).getTime() - new Date(baseEvent.date).getTime()) -
        Math.abs(new Date(b.event.date).getTime() - new Date(baseEvent.date).getTime())
      );
    }
  });
  

  const filteredSimilarities = sortedSimilarities.filter(
    (similarity) => similarity.event !== baseEvent && similarity.overallSimilarity >= similarityThreshold
  );

  const recommendedEvents = filteredSimilarities.slice(0, 3).map((similarity) => similarity.event);

  return recommendedEvents;
};
