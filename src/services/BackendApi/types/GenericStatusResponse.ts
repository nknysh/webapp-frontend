export enum EGenericStatusValue {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface IGenericStatus<T> {
  status: EGenericStatusValue;
  createdAt: string,
  data?: T | null;
}

export interface IGenericStatusResponse<T> {
  meta: any;
  data: IGenericStatus<T>;
}
