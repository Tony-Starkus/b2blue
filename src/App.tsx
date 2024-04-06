import './App.css';
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
    </>
  );
}

export default App;
