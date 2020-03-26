import { FormEvent } from 'react';

export const eventValueSelector = (
  handler: (any) => void,
  formatter: (string) => string = (val: string) => val
) =>
  (e: FormEvent<HTMLInputElement|HTMLTextAreaElement>) => handler(formatter(e.currentTarget.value));

export const eventCheckedSelector = (handler: (any) => void) =>
  (e: FormEvent<HTMLInputElement>) => handler(e.currentTarget.checked);
