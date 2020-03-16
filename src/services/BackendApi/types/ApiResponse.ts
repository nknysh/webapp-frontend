import { AxiosResponse, AxiosError } from 'axios';
export interface IAPIRepsonse<R, E> {
  response?: AxiosResponse<R>;
  error?: AxiosResponse<E>;
}
