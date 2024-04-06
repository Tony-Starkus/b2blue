export interface WarehouseData {
  id: number;
  name: string;
  actionsLog: Array<WarehouseActionLog>;
}

export interface WarehouseActionLog {
  id: number;
  message: string;
  createdAt: string;
  status: 'pending' | 'done';
}
