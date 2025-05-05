import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import getIcon from '../../utils/iconUtils';
import OrganizerNavigation from '../../components/organizer/OrganizerNavigation';
import BookingStatusBadge from '../../components/organizer/BookingStatusBadge';

// Sample event data (reusing from previous files)
const EVENTS_DATA = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: new Date(2023, 5, 15),
    location: "Central Park, New York",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Tech Conference 2023",
    date: new Date(2023, 7, 10),
    location: "Convention Center, San Francisco",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  }
];

// Sample bookings data
const BOOKINGS_DATA = [
  {
    id: "BK12345678",
    eventId: 1,
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    ticketType: "General Admission",
    quantity: 2,
    totalAmount: 299.98,
    bookingDate: new Date(2023, 4, 20),
    status: "Paid",
    paymentMethod: "Credit Card"
  },
  {
    id: "BK12345679",
    eventId: 1,
    customerName: "Emily Johnson",
    customerEmail: "emily.j@example.com",
    ticketType: "VIP Pass",
    quantity: 1,
    totalAmount: 299.99,
    bookingDate: new Date(2023, 4, 22),
    status: "Paid",
    paymentMethod: "PayPal"
  },
  {
    id: "BK12345680",
    eventId: 1,
    customerName: "Michael Williams",
    customerEmail: "m.williams@example.com",
    ticketType: "Weekend Pass",
    quantity: 4,
    totalAmount: 1599.96,
    bookingDate: new Date(2023, 5, 1),
    status: "Paid",
    paymentMethod: "Credit Card"
  },
  {
    id: "BK12345681",
    eventId: 1,
    customerName: "Sarah Brown",
    customerEmail: "sarah.b@example.com",
    ticketType: "General Admission",
    quantity: 1,
    totalAmount: 149.99,
    bookingDate: new Date(2023, 5, 5),
    status: "Pending",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "BK12345682",
    eventId: 2,
    customerName: "David Jones",
    customerEmail: "david.j@example.com",
    ticketType: "Standard Pass",
    quantity: 3,
    totalAmount: 899.97,
    bookingDate: new Date(2023, 6, 15),
    status: "Paid",
    paymentMethod: "Credit Card"
  },
  {
    id: "BK12345683",
    eventId: 2,
    customerName: "Jennifer Miller",
    customerEmail: "jen.miller@example.com",
    ticketType: "Executive Pass",
    quantity: 1,
    totalAmount: 799.99,
    bookingDate: new Date(2023, 6, 18),
    status: "Cancelled",
    paymentMethod: "Credit Card"
  }
];

const EventBookings = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Define icon components
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const SearchIcon = getIcon('Search');
  const TicketIcon = getIcon('Ticket');
  const UsersIcon = getIcon('Users');
  const FilterIcon = getIcon('Filter');
  const DownloadIcon = getIcon('Download');
  const MailIcon = getIcon('Mail');
  const CheckCircleIcon = getIcon('CheckCircle');
  const BanIcon = getIcon('Ban');
  
  useEffect(() => {
    // Simulate API call to fetch event and bookings
    setLoading(true);
    
    // Find the event
    const foundEvent = EVENTS_DATA.find(e => e.id === parseInt(eventId));
    
    if (foundEvent) {
      setEvent(foundEvent);
      
      // Find associated bookings
      const eventBookings = BOOKINGS_DATA.filter(booking => booking.eventId === parseInt(eventId));
      setBookings(eventBookings);
      setFilteredBookings(eventBookings);
    } else {
      toast.error("Event not found");
      navigate('/organizer/events');
    }
    
    setLoading(false);
  }, [eventId, navigate]);
  
  // Filter bookings based on search term and status
  useEffect(() => {
    if (bookings.length > 0) {
      let filtered = bookings;
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(booking => 
          booking.customerName.toLowerCase().includes(term) ||
          booking.customerEmail.toLowerCase().includes(term) ||
          booking.id.toLowerCase().includes(term)
        );
      }
      
      if (statusFilter !== 'All') {
        filtered = filtered.filter(booking => booking.status === statusFilter);
      }
      
      setFilteredBookings(filtered);
    }
  }, [searchTerm, statusFilter, bookings]);
  
  const handleDownloadReport = () => {
    toast.success("Generating attendee report for download");
    // In a real implementation, this would generate a CSV/PDF report
  };
  
  const handleSendReminders = () => {
    toast.success("Reminder emails have been sent to all attendees");
    // In a real implementation, this would send emails
  };
  
  const handleStatusChange = (bookingId, newStatus) => {
    // Update booking status
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    
    setBookings(updatedBookings);
    toast.success(`Booking ${bookingId} marked as ${newStatus}`);
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <OrganizerNavigation />
        </div>
        <div className="col-span-12 lg:col-span-9 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <OrganizerNavigation />
        </div>
        <div className="col-span-12 lg:col-span-9 text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="mb-6 text-surface-600 dark:text-surface-300">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/organizer/events')}
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Events
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <OrganizerNavigation />
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/organizer/events')}
            className="text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary"
          >
            <ArrowLeftIcon size={20} />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold mb-1">{event.title} - Bookings</h1>
            <p className="text-surface-500 dark:text-surface-400">
              {format(event.date, 'MMMM dd, yyyy')} - {event.location}
            </p>
          </div>
        </div>
        
        {/* Event Summary */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <TicketIcon size={20} />
              </div>
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-400">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500/10 text-green-500 mr-4">
                <UsersIcon size={20} />
              </div>
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-400">Total Attendees</p>
                <p className="text-2xl font-bold">
                  {bookings.reduce((total, booking) => total + booking.quantity, 0)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 mr-4">
                <TicketIcon size={20} />
              </div>
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-400">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-500">
                  ${bookings.reduce((total, booking) => total + booking.totalAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Actions */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                  <SearchIcon size={18} />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select pl-10 w-full sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                  <FilterIcon size={18} />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                onClick={handleDownloadReport}
                className="btn-outline py-2 px-3 flex items-center justify-center text-sm"
              >
                <DownloadIcon size={16} className="mr-1.5" />
                Export CSV
              </button>
              
              <button
                onClick={handleSendReminders}
                className="btn-outline py-2 px-3 flex items-center justify-center text-sm"
              >
                <MailIcon size={16} className="mr-1.5" />
                Send Reminders
              </button>
            </div>
          </div>
          
          {/* Bookings Table */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No bookings found</h3>
              <p className="text-surface-500 dark:text-surface-400">
                Try adjusting your filters or search term
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead>
                  <tr className="text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Booking ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Ticket Type</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Booking Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                  {filteredBookings.map((booking) => (
                    <motion.tr 
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm"
                    >
                      <td className="px-4 py-4 font-medium">{booking.id}</td>
                      <td className="px-4 py-4">
                        <div>{booking.customerName}</div>
                        <div className="text-surface-500 dark:text-surface-400 text-xs">{booking.customerEmail}</div>
                      </td>
                      <td className="px-4 py-4">{booking.ticketType}</td>
                      <td className="px-4 py-4">{booking.quantity}</td>
                      <td className="px-4 py-4 font-medium">${booking.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-4">{format(booking.bookingDate, 'MMM dd, yyyy')}</td>
                      <td className="px-4 py-4">
                        <BookingStatusBadge status={booking.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          {booking.status !== 'Paid' && (
                            <button
                              onClick={() => handleStatusChange(booking.id, 'Paid')}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                              title="Mark as Paid"
                            >
                              <CheckCircleIcon size={18} />
                            </button>
                          )}
                          {booking.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                              title="Mark as Cancelled"
                            >
                              <BanIcon size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventBookings;