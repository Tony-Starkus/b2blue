import './App.css';
import DashboardTemplate from './containers/DashboardTemplate';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <DashboardTemplate>
        <MainPage />
      </DashboardTemplate>
    </>
  );
}

export default App;
