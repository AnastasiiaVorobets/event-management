export const validateForm = (title: string, date: string, location: string, category: string, description: string): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!title.trim()) {
    errors.title = 'Title is required.';
  }

  if (!date) {
    errors.date = 'Date is required.';
  }

  if (!location.trim()) {
    errors.location = 'Location is required.';
  }

  if (!category.trim()) {
    errors.category = 'Category is required.';
  }

  if (!description.trim()) {
    errors.description = 'Description is required.';
  }

  return errors;
};
