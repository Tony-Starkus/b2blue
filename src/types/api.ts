export interface APIResponseInterface<T> {
  status: 'idle' | 'pending' | 'completed';
  data: T;
}
