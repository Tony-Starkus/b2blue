import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import DashboardTemplate from './containers/DashboardTemplate';
import DashboardContextProvider from './contexts/DashboardContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <DashboardContextProvider>
        <DashboardTemplate>
          <MainPage />
        </DashboardTemplate>
      </DashboardContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
