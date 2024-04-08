export interface WarehouseData {
  id: number;
  name: string;
  currentCapacity: number;
  actionsLog: Array<WarehouseActionLog>;
}

export interface WarehouseActionLog {
  id: number;
  message: string;
  createdAt: string;
}
