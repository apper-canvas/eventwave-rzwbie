import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-white pt-4 md:pt-8 pb-20">
        <div className="container px-4 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking/confirmation" element={<BookingConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;