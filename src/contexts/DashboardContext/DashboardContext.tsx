import React, { createContext, PropsWithChildren, useState } from 'react';
import { WarehouseData } from '../../types';
import { APIResponseInterface } from '../../types/api';

interface DashboardContextInterface {
  warehouseData: APIResponseInterface<Array<WarehouseData>>;
  updateWarehouseDataState: (newValue: APIResponseInterface<Array<WarehouseData>>) => void;
  updateWarehouseDataItem: (newItemValue: WarehouseData) => void;
}

export const DashboardContext = createContext<DashboardContextInterface | undefined>(undefined);

const DashboardContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [warehouseData, setWarehouseData] = useState<APIResponseInterface<Array<WarehouseData>>>({
    status: 'idle',
    data: [],
  });

  /**
   * This function updates all warehouse data state
   *
   */
  const updateWarehouseDataState = (newValue: APIResponseInterface<Array<WarehouseData>>) => {
    setWarehouseData(newValue);
  };

  /**
   * This function updates one item on warehouse state
   */
  const updateWarehouseDataItem = (newItemValue: WarehouseData) => {
    const index = warehouseData.data.findIndex((item) => item.id === newItemValue.id);

    if (index !== -1) {
      const newData = { ...warehouseData };
      warehouseData.data[index] = newItemValue;
      updateWarehouseDataState(newData);
    }
  };

  return (
    <DashboardContext.Provider value={{ warehouseData, updateWarehouseDataState, updateWarehouseDataItem }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
