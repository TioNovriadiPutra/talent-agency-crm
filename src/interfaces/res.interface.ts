export interface ResType<T = any> {
  success: false;
  message: string;
  data: T;
}

export interface PaginationType {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
export interface MetaResType<T = any> {
  items: T;
  pagination: PaginationType;
}
