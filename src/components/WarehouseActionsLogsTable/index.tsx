import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { WarehouseActionLog } from '../../types';
import { formatISOStringDate } from '../../utils/date';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { dispatchToast } from '../../utils/toast';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface ComponentProps {
  warehouseActionsLogs: Array<WarehouseActionLog>;
  handleOnConfirmGathering: () => void;
}

const WarehouseActionsLogsTable: React.FC<ComponentProps> = ({ warehouseActionsLogs, handleOnConfirmGathering }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loadingButton, setLoadingButton] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - warehouseActionsLogs.length) : 0;

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (warehouseActionsLogs.length === 0) {
    return <Typography>Sem registros</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table
        // sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
      >
        <TableBody>
          {(rowsPerPage > 0
            ? warehouseActionsLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : warehouseActionsLogs
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Typography>{formatISOStringDate(row.createdAt)}</Typography>
                <Typography>{row.message}</Typography>
                {row.status === 'pending' ? (
                  <Button
                    variant="contained"
                    color="success"
                    disabled={loadingButton}
                    onClick={async () => {
                      setLoadingButton(true);
                      try {
                        await handleOnConfirmGathering();
                      } catch {
                        dispatchToast('Erro ao confirmar a coleta. Tente novamente.', { type: 'error' });
                      } finally {
                        setLoadingButton(false);
                      }
                    }}
                  >
                    {loadingButton ? <CircularProgress size={24} color="inherit" /> : 'Confirmar coleta'}
                  </Button>
                ) : (
                  <Typography textTransform="uppercase" color="green" fontWeight="bold">
                    COLETA CONFIRMADA
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={warehouseActionsLogs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default WarehouseActionsLogsTable;
