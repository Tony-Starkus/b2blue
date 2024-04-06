import React, { SyntheticEvent, useEffect, useState } from 'react';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Card, CardContent, Divider, Slider, Stack, Typography } from '@mui/material';
import { WarehouseData } from '../../types';
import WarehouseActionsLogsTable from '../WarehouseActionsLogsTable';
import { useDashboard } from '../../contexts/DashboardContext';

interface ComponentProps {
  warehouseData: WarehouseData;
}

const WarehouseCardItem: React.FC<ComponentProps> = ({ warehouseData }) => {
  const { updateWarehouseDataItem } = useDashboard();
  const [warehouseCapacity, setWarehouseCapacity] = useState(0);

  useEffect(() => {
    setWarehouseCapacity(warehouseData.currentCapacity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSlideChange = (_: Event, newValue: number | number[]) => {
    setWarehouseCapacity(newValue as number);
  };

  const fetchUpdateWarehouseCapacity = (_: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    const newValue = value as number;
    if (newValue >= 80) {
      const hasPendingGathering = warehouseData.actionsLog.some((log) => log.status === 'pending');

      if (!hasPendingGathering) {
        updateWarehouseDataItem({
          ...warehouseData,
          actionsLog: [
            {
              id: warehouseData.actionsLog.length,
              message: 'A estação atingiu o limite mínimo de 80% para coleta. Um pedido de coleta foi gerado.',
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
            ...warehouseData.actionsLog,
          ],
        });
      }
    }
  };

  const handleOnConfirmGathering = () => {
    setWarehouseCapacity(0);
    updateWarehouseDataItem({
      ...warehouseData,
      currentCapacity: 0,
      actionsLog: warehouseData.actionsLog.map((item) => ({ ...item, status: 'done' })),
    });
  };

  return (
    <Card>
      <CardContent>
        <Stack flexDirection="row">
          <WarehouseIcon fontSize="large" />
          <Typography variant="h6" fontWeight="bold">
            {warehouseData.name}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="caption" textAlign="left">
            Capacidade de armazenamento
          </Typography>
        </Stack>
        <Stack flexDirection="row" gap={1}>
          <Slider
            value={warehouseCapacity}
            onChange={handleOnSlideChange}
            onChangeCommitted={fetchUpdateWarehouseCapacity}
          />
          <Stack width="80px" justifyContent="center" alignItems="center">
            <Typography>{warehouseCapacity} %</Typography>
          </Stack>
        </Stack>

        <Divider style={{ margin: '1rem 0' }} />
        <Typography textAlign="left" variant="body1" fontWeight="bold" marginBottom={1}>
          Atividades
        </Typography>

        <WarehouseActionsLogsTable
          warehouseActionsLogs={warehouseData.actionsLog}
          handleOnConfirmGathering={handleOnConfirmGathering}
        />
      </CardContent>
    </Card>
  );
};

export default WarehouseCardItem;
