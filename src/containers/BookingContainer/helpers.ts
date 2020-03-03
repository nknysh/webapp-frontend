export const validHoldHours = (value: string): boolean => {
  const parsedValue = parseInt(value, 10);
  return value === '' || (/^\d+$/.test(value) && isFinite(parsedValue) && parsedValue >= 1);
};
