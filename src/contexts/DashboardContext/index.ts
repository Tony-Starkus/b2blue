import { useContext } from 'react';
import DashboardContextProvider, { DashboardContext } from './DashboardContext';

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('useDashboard must be used inside DashboardContextProvider');
  }

  return context;
};

export default DashboardContextProvider;
