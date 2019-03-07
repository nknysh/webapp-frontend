import { equals, anyPass } from 'ramda';

export const Status = Object.freeze({
  LOADING: 'LOADING',
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  SENDING: 'SENDING',
});

export const isIdle = equals(Status.IDLE);
export const isLoading = equals(Status.LOADING);
export const isError = equals(Status.ERROR);
export const isSuccess = equals(Status.SUCCESS);
export const isSending = equals(Status.SENDING);

export const isActive = anyPass([isLoading, isSending]);
