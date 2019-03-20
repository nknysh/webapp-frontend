import { equals, complement, anyPass, match, isEmpty, pipe } from 'ramda';

export const Status = Object.freeze({
  LOADING: 'LOADING',
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  SENDING: 'SENDING',
});

const matchStatus = status =>
  pipe(
    match(status),
    complement(isEmpty)
  );

export const isIdle = equals(Status.IDLE);
export const isLoading = matchStatus(Status.LOADING);
export const isError = matchStatus(Status.ERROR);
export const isSuccess = matchStatus(Status.SUCCESS);
export const isSending = matchStatus(Status.SENDING);

export const isActive = anyPass([isLoading, isSending]);
