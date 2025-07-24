export interface IPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  IsSuccess: boolean;
  Message: string | null;
  Data: T | null;
}
