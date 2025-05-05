import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
// Organizer Panel Pages
import OrganizerDashboard from './pages/organizer/Dashboard';
import EventManagement from './pages/organizer/EventManagement';
import CreateEvent from './pages/organizer/CreateEvent';
import EditEvent from './pages/organizer/EditEvent';
import EventBookings from './pages/organizer/EventBookings';
import RevenueDashboard from './pages/organizer/RevenueDashboard';

function App() {
  return (
    <>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-white pt-4 md:pt-8 pb-20">
        <div className="container px-4 mx-auto">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking/confirmation" element={<BookingConfirmation />} />
            
            {/* Organizer Panel Routes */}
            <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer/events" element={<EventManagement />} />
            <Route path="/organizer/events/create" element={<CreateEvent />} />
            <Route path="/organizer/events/edit/:eventId" element={<EditEvent />} />
            <Route path="/organizer/events/:eventId/bookings" element={<EventBookings />} />
            <Route path="/organizer/revenue" element={<RevenueDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;