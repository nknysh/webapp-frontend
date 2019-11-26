export interface BackendErrorMeta {
  keyword: string;
  dataPath: string;
  schemaPath: string;
  params: {
    additionalProperty?: string;
  };
  message: string;
}

export interface BackendError {
  id: string;
  status: string;
  title: string;
  meta: {
    errors: BackendErrorMeta[];
    stack: string;
  };
  detail: string;
}

export interface ErrorResponse {
  errors: BackendError[];
}
