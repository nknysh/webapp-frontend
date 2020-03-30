const ensureDecimalFormat = (maxDigits: number, value: string) => {
  const decimalSplit = value.split('.');

  return decimalSplit.length > 1
      ? `${decimalSplit[0]}.${decimalSplit.slice(1).join('').slice(0, maxDigits)}`
      : value;
};

export const sanitizeDecimal = (maxDigits: number) => (value: string) => {
  const trimmed = value.trim();
  const negative = trimmed[0] === '-';

  const onlyAllowedChars = (negative ? trimmed.slice(1) : trimmed).replace(
      /[^0-9.]/g,
      ''
  );
  const decimalFormat = ensureDecimalFormat(maxDigits, onlyAllowedChars);
  const withLeadingZero = decimalFormat === '.' ? '0.' : decimalFormat;

  return `${negative ? '-' : ''}${withLeadingZero}`;
};
