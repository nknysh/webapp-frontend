export enum EGenericStatusValue {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface IGenericStatus<T> {
  status: EGenericStatusValue;
  createdAt: string,
  data?: T; 
}

export interface IGenericStatusResponse<T> {
  meta: any;
  data: IGenericStatus<T>;
}
