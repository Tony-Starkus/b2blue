import React, { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { LinearProgress, Stack, Typography } from '@mui/material';
import WarehouseCardItem from '../../components/WarehouseCardItem';
import { WarehouseData } from '../../types';
import { fakeApi } from '../../services/api';
import { useDashboard } from '../../contexts/DashboardContext';

const mockData: WarehouseData[] = [
  {
    id: 0,
    name: 'Estação 1',
    actionsLog: [
      {
        id: 0,
        message: 'A estação atingiu o limite mínimo de 80% para coleta. Um pedido de coleta foi gerado.',
        status: 'pending',
        createdAt: '2024-04-05T22:33:55.836Z',
      },
      {
        id: 1,
        message: 'A estação atingiu o limite mínimo de 80% para coleta. Um pedido de coleta foi gerado.',
        status: 'done',
        createdAt: '2024-04-05T22:33:55.836Z',
      },
    ],
  },
  {
    id: 1,
    name: 'Estação 2',
    actionsLog: [
      {
        id: 0,
        message: 'A estação atingiu o limite mínimo de 80% para coleta. Um pedido de coleta foi gerado.',
        status: 'pending',
        createdAt: '2024-04-05T22:33:55.836Z',
      },
    ],
  },
  {
    id: 3,
    name: 'Estação 3',
    actionsLog: [
      {
        id: 0,
        message: 'A estação atingiu o limite mínimo de 80% para coleta. Um pedido de coleta foi gerado.',
        status: 'pending',
        createdAt: '2024-04-05T22:33:55.836Z',
      },
    ],
  },
];

const MainPage: React.FC = () => {
  const { warehouseData, updateWarehouseDataState } = useDashboard();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This function fetch warehouses data
   */
  const fetchData = async () => {
    updateWarehouseDataState({ status: 'pending', data: [] });
    await fakeApi();
    updateWarehouseDataState({ status: 'completed', data: mockData });
  };

  return (
    <Grid container spacing={1}>
      <Grid xs={12}>
        <Typography variant="h4" textAlign="left" marginTop={2}>
          ESTAÇÕES DE COLETA
        </Typography>
      </Grid>

      {warehouseData.status === 'pending' && (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="primary" />
        </Stack>
      )}

      {warehouseData.data.map((item) => (
        <Grid key={item.id} xs={12}>
          <WarehouseCardItem warehouseData={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MainPage;
