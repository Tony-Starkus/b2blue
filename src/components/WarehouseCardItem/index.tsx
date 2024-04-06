import React, { useState } from 'react';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Card, CardContent, Paper, Slider, Stack, Typography } from '@mui/material';
import { WarehouseData } from '../../types';
import WarehouseActionsLogsTable from '../WarehouseActionsLogsTable';

interface ComponentProps {
  warehouseData: WarehouseData;
}

const WarehouseCardItem: React.FC<ComponentProps> = ({ warehouseData }) => {
  const [warehouseCapacity, setWarehouseCapacity] = useState(80);

  const handleOnSlideChange = (_: Event, newValue: number | number[]) => {
    setWarehouseCapacity(newValue as number);
  };

  const fetchUpdateWarehouseCapacity = () => {};

  return (
    <Card>
      <CardContent>
        <Stack flexDirection="row">
          <WarehouseIcon />
          <Typography variant="h6">{warehouseData.name}</Typography>
        </Stack>
        <Stack>
          <Typography variant="caption" textAlign="left">
            Capacidade de armazenamento
          </Typography>
        </Stack>
        <Stack flexDirection="row">
          <Slider
            value={warehouseCapacity}
            onChange={handleOnSlideChange}
            onChangeCommitted={fetchUpdateWarehouseCapacity}
          />
          <Stack width="60px" justifyContent="center" alignItems="center">
            <Typography>{warehouseCapacity} %</Typography>
          </Stack>
        </Stack>

        <Paper sx={{ width: '100%' }}>
          <WarehouseActionsLogsTable warehouseActionsLogs={warehouseData.actionsLog} />
        </Paper>
      </CardContent>
    </Card>
  );
};

export default WarehouseCardItem;
