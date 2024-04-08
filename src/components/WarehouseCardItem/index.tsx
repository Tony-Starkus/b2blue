import React, { SyntheticEvent, useEffect, useState } from 'react';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  Divider,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import WarehouseActionsLogsTable from '../WarehouseActionsLogsTable';
import { useDashboard } from '../../contexts/DashboardContext';
import { fakeApi } from '../../services/api';
import { dispatchToast } from '../../utils/toast';
import { WarehouseData } from '../../types';
import Swal from 'sweetalert2';
import CONSTANTS from '../../constants';

interface ComponentProps {
  warehouseData: WarehouseData;
}

const WarehouseCardItem: React.FC<ComponentProps> = ({ warehouseData }) => {
  const { updateWarehouseDataItem } = useDashboard();
  const [warehouseCapacity, setWarehouseCapacity] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);

  // This state is used to save previous value to rollback if user cancel the update on confirm modal
  const [previousWarehouseCapacity, setPreviousWarehouseCapacity] = useState(0);

  useEffect(() => {
    setWarehouseCapacity(warehouseData.currentCapacity);
    setPreviousWarehouseCapacity(warehouseData.currentCapacity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSlideChange = (_: Event, newValue: number | number[]) => {
    setWarehouseCapacity(newValue as number);
  };

  /**
   * This function handle the logic to update warehouse capacity
   */
  const fetchUpdateWarehouseCapacity = (_: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    const newValue = value as number;
    Swal.fire({
      title: `Atualizar valor para: ${newValue}%`,
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#d32f2f',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newLogs = [
          {
            id: warehouseData.actionsLog.length,
            message: `O usuário João atualizou o volume de ocupação de ${previousWarehouseCapacity}% para ${newValue}%`,
            createdAt: new Date().toISOString(),
          },
        ];
        if (newValue >= CONSTANTS.WAREHOUSE_MINIMUM_CAPACITY_TO_COLLECT) {
          dispatchToast(`Pedido de coleta gerado para ${warehouseData.name}`, { type: 'info' });
          newLogs.unshift({
            id: warehouseData.actionsLog.length + 1,
            message: `A estação atingiu o limite mínimo de ${CONSTANTS.WAREHOUSE_MINIMUM_CAPACITY_TO_COLLECT}% para coleta. Um pedido de coleta foi gerado automaticamente.`,
            createdAt: new Date().toISOString(),
          });
        }
        updateWarehouseDataItem({
          ...warehouseData,
          actionsLog: [...newLogs, ...warehouseData.actionsLog],
        });
        setPreviousWarehouseCapacity(newValue);
      } else {
        setWarehouseCapacity(previousWarehouseCapacity);
      }
    });
  };

  /**
   * This function handle logic to confirm gathering
   */
  const handleOnConfirmGathering = async () => {
    setLoadingButton(true);
    try {
      await fakeApi();
      setWarehouseCapacity(0);
      setPreviousWarehouseCapacity(0);
      dispatchToast('Coleta confirmada!', { type: 'success' });

      updateWarehouseDataItem({
        ...warehouseData,
        currentCapacity: 0,
        actionsLog: [
          {
            id: warehouseData.actionsLog.length,
            message: 'A coleta foi confirmada pelo usuário João.',
            createdAt: new Date().toISOString(),
          },
          ...warehouseData.actionsLog,
        ],
      });
    } catch {
      dispatchToast('Erro ao confirmar coleta', { type: 'error' });
    } finally {
      setLoadingButton(false);
    }
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
          <Stack width="70px" justifyContent="center" alignItems="flex-end">
            <Typography>{warehouseCapacity} %</Typography>
          </Stack>
        </Stack>
        <Collapse in={previousWarehouseCapacity >= CONSTANTS.WAREHOUSE_MINIMUM_CAPACITY_TO_COLLECT}>
          <Alert
            variant="filled"
            severity="info"
            sx={({ breakpoints }) => ({
              '.MuiAlert-icon': {
                display: 'flex',
                alignItems: 'flex-start',
                [breakpoints.up('md')]: {
                  alignItems: 'center',
                },
              },
              '.MuiAlert-message': {
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                [breakpoints.up('md')]: {
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              },
            })}
          >
            A estação atingiu o limite mínimo de {CONSTANTS.WAREHOUSE_MINIMUM_CAPACITY_TO_COLLECT}% para coleta. Um
            pedido de coleta foi gerado.
            <Button variant="contained" color="success" disableElevation onClick={handleOnConfirmGathering}>
              {loadingButton ? <CircularProgress size={24} color="inherit" /> : 'Confirmar coleta'}
            </Button>
          </Alert>
        </Collapse>

        <Divider style={{ margin: '1rem 0' }} />
        <Typography textAlign="left" variant="body1" fontWeight="bold" marginBottom={1}>
          Atividades
        </Typography>

        <WarehouseActionsLogsTable warehouseActionsLogs={warehouseData.actionsLog} />
      </CardContent>
    </Card>
  );
};

export default WarehouseCardItem;
