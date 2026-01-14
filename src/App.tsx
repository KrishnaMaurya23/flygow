import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import GlobalAlert from './components/alert/GlobalAlert';
import ErrorBoundary from "./components/ErrorBoundary";
// import EncryptionTest from './components/EncryptionTest';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <GlobalAlert />
      {/* <div style={{ padding: 20 }}> */}
      {/* verification component - remove after testing */}
      {/* @ts-ignore */}
      {/* <EncryptionTest /> */}
      {/* </div> */}
    </ErrorBoundary>
  );
}

export default App
