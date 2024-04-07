import { Container } from '@mui/material';
import { styled } from '@mui/material';

export const AdminMuiContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  '& main': {
    padding: `0px `,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
}));
