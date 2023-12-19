import Event from '../lib/definitions';

export const sortEvents = (events: Event[], sortField: 'date' | 'category' | 'title', sortOrder: 'asc' | 'desc'): Event[] => {
  return [...events].sort((a, b) => {
    let compareResult;

    switch (sortField) {
      case 'date':
        compareResult = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'category':
        compareResult = a.category.localeCompare(b.category);
        break;
      case 'title':
        compareResult = a.title.localeCompare(b.title);
        break;
      default:
        compareResult = 0;
    }

    return sortOrder === 'asc' ? compareResult : -compareResult;
  });
};
