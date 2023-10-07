export type BackendResponse<T> = {
  status: number;
} & T;

export type PaginationRequest = {
  page?: number;
  limit?: number;
};

export type PaginationResponse<T> = BackendResponse<T> & {
  meta: {
    totalPages: number;
    page: number;
    limit: number;
    count: number;
  };
};
