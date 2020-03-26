const removeExtraDecimalPoints = (value: string) => {
  const decimalSplit = value.split('.');

  return decimalSplit.length > 1
      ? `${decimalSplit[0]}.${decimalSplit.slice(1).join('')}`
      : value;
};

export const sanitizeDecimal = (value: string) => {
  const trimmed = value.trim();
  const negative = trimmed[0] === '-';

  const onlyAllowedChars = (negative ? trimmed.slice(1) : trimmed).replace(
      /[^0-9.]/g,
      ''
  );
  const onlyOneDecimalPoint = removeExtraDecimalPoints(onlyAllowedChars);
  const withLeadingZero = onlyOneDecimalPoint === '.' ? '0.' : onlyOneDecimalPoint;

  return `${negative ? '-' : ''}${withLeadingZero}`;
};
