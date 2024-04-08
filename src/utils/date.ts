type DateTimeFormatOptions = {
  format: string;
};

/**
 * Humanize ISO String Date
 * @param value The ISO String Date
 * @param options Format options
 * @returns Formated string date or string message error
 */
export const formatISOStringDate = (value: string, options: DateTimeFormatOptions = { format: 'pt-br' }) => {
  try {
    return new Intl.DateTimeFormat(options.format).format(new Date(value));
  } catch {
    return 'Invalid Date format.';
  }
};

export const formatTimeFromISOStringDate = (value: string, options: DateTimeFormatOptions = { format: 'pt-br' }) => {
  try {
    return new Intl.DateTimeFormat(options.format, { hour: 'numeric', minute: 'numeric' }).format(new Date(value));
  } catch {
    return 'Invalid Date format.';
  }
};
