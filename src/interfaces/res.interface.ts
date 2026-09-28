export interface ResType<T = any> {
  success: false;
  message: string;
  data: T;
}
