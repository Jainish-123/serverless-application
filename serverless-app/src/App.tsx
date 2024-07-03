import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/Navigation';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
