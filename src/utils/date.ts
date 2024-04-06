type DateTimeFormatOptions = {
  format: string;
};

export const formatISOStringDate = (value: string, options: DateTimeFormatOptions = { format: 'pt-br' }) => {
  try {
    return new Intl.DateTimeFormat(options.format).format(new Date(value));
  } catch {
    return 'Invalid Date format.';
  }
};
