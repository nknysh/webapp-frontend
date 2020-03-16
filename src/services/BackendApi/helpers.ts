import { omit } from 'ramda';

interface IGeneralModel {
  uuid: string;
}

interface IGeneralPayload<T> {
  data: {
    id?: string;
    type?: string;
    attributes: Partial<T>;
  };
}

export function transformPut<T extends IGeneralModel>(
  payload: T,
  type: string,
  omitKeys: Array<keyof T> = []
): IGeneralPayload<T> {
  return {
    data: {
      id: payload.uuid,
      type,
      attributes: omit(omitKeys as string[], payload) as T,
    },
  };
}

export function transformPost<T extends IGeneralModel>(
  payload: T,
  type: string,
  omitKeys: Array<keyof T> = []
): IGeneralPayload<T> {
  return {
    data: {
      type,
      attributes: omit([...(omitKeys as string[])], payload) as T,
    },
  };
}
