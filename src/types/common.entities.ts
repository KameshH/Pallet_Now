export type Country = {
  name: string;
  dialCode: string;
  flag: string;
  isoCode: string;
  mobileNumberLength: number;
  example: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export type ApiError = {
  statusCode: number;
  message: string;
};

export type FetchSuccess<T> = {
  data: T;
  appCode?: number;
  statusCode?: number;
  status?: string;
  message?: string;
};

export type SuccessMessage = {message: string};
