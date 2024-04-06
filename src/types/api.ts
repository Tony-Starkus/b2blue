export interface APIResponseInterface<T> {
  status: 'idle' | 'pending' | 'completed' | 'error';
  data: T;
}
