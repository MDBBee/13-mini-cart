import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalConetext } from './context';

function App() {
  const { isLoading } = useGlobalConetext();

  if (isLoading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: '40vh' }}></div>
      </main>
    );
  }

  return (
    <main>
      <ToastContainer position="top-center" />
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
