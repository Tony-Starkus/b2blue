import React, { SyntheticEvent, useState } from 'react';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Card, CardContent, Paper, Slider, Stack, Typography } from '@mui/material';
import { WarehouseData } from '../../types';
import WarehouseActionsLogsTable from '../WarehouseActionsLogsTable';
import { useDashboard } from '../../contexts/DashboardContext';

interface ComponentProps {
  warehouseData: WarehouseData;
}

const WarehouseCardItem: React.FC<ComponentProps> = ({ warehouseData }) => {
  const { updateWarehouseDataItem } = useDashboard();
  const [warehouseCapacity, setWarehouseCapacity] = useState(80);

  const handleOnSlideChange = (_: Event, newValue: number | number[]) => {
    setWarehouseCapacity(newValue as number);
  };

  const fetchUpdateWarehouseCapacity = (_: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    console.log(value);
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

  return (
    <Card>
      <CardContent>
        <Stack flexDirection="row">
          <WarehouseIcon fontSize="large" />
          <Typography variant="h6">{warehouseData.name}</Typography>
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

        <Paper sx={{ width: '100%' }}>
          <WarehouseActionsLogsTable
            warehouseActionsLogs={warehouseData.actionsLog}
            handleOnConfirmGathering={() => {
              updateWarehouseDataItem({
                ...warehouseData,
                actionsLog: warehouseData.actionsLog.map((item) => ({ ...item, status: 'done' })),
              });
            }}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};

export default WarehouseCardItem;
