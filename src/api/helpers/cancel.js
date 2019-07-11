import { CancelToken, isCancel } from 'axios';

export const createCancelToken = execute => (execute ? new CancelToken(execute) : CancelToken.source());

export const wasCancelled = isCancel;
