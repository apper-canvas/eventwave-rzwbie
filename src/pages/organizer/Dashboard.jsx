import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../../utils/iconUtils';
import OrganizerNavigation from '../../components/organizer/OrganizerNavigation';
import StatCard from '../../components/organizer/StatCard';
import RevenueChart from '../../components/organizer/RevenueChart';

const Dashboard = () => {
  const [events, setEvents] = useState(5);
  const [totalSales, setTotalSales] = useState(5820);
  const [ticketsSold, setTicketsSold] = useState(89);
  const [upcomingEvents, setUpcomingEvents] = useState(3);
  
  // Define icon components
  const CalendarIcon = getIcon('Calendar');
  const TicketIcon = getIcon('Ticket');
  const DollarSignIcon = getIcon('DollarSign');
  const UsersIcon = getIcon('Users');
  const PlusIcon = getIcon('Plus');
  const BellIcon = getIcon('Bell');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  // Sample data for charts
  const revenueData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenueMonthly: [1200, 1800, 1650, 2100, 1850, 3200, 3800, 2900, 3500, 4200, 4800, 5820],
    revenueDaily: [820, 932, 901, 934, 1290, 1330, 1320],
    ticketsMonthly: [18, 24, 30, 35, 30, 48, 52, 38, 42, 58, 68, 89],
    ticketsDaily: [12, 17, 13, 9, 18, 14, 6]
  };
  
  // Sample recent bookings
  const recentBookings = [
    {
      id: 'BK12345678',
      eventName: 'Summer Music Festival',
      customerName: 'John Smith',
      date: '2023-05-15',
      amount: 149.99,
      status: 'Paid'
    },
    {
      id: 'BK12345679',
      eventName: 'Tech Conference 2023',
      customerName: 'Jane Doe',
      date: '2023-07-10',
      amount: 299.99,
      status: 'Paid'
    },
    {
      id: 'BK12345680',
      eventName: 'Food & Wine Festival',
      customerName: 'Michael Johnson',
      date: '2023-08-05',
      amount: 89.99,
      status: 'Pending'
    }
  ];
  
  // Sample notifications
  const notifications = [
    {
      id: 1,
      message: 'New booking for "Tech Conference 2023"',
      time: '10 minutes ago'
    },
    {
      id: 2,
      message: 'Tickets for "Summer Music Festival" are selling fast!',
      time: '1 hour ago'
    },
    {
      id: 3,
      message: 'Reminder: "Food & Wine Festival" starts in 7 days',
      time: '3 hours ago'
    }
  ];
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <OrganizerNavigation />
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Organizer Dashboard</h1>
            <p className="text-surface-500 dark:text-surface-400">
              Welcome back! Here's an overview of your events.
            </p>
          </div>
          
          <Link 
            to="/organizer/events/create"
            className="btn-primary py-2.5 px-4 flex items-center"
          >
            <PlusIcon size={18} className="mr-2" />
            Create New Event
          </Link>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Events" 
            value={events} 
            icon={<CalendarIcon size={20} className="text-primary" />} 
            change="20%" 
            trend="up" 
            bgColor="bg-primary/10"
          />
          
          <StatCard 
            title="Total Sales" 
            value={`$${totalSales.toLocaleString()}`} 
            icon={<DollarSignIcon size={20} className="text-green-500" />} 
            change="15%" 
            trend="up" 
            bgColor="bg-green-500/10"
          />
          
          <StatCard 
            title="Tickets Sold" 
            value={ticketsSold} 
            icon={<TicketIcon size={20} className="text-amber-500" />} 
            change="8%" 
            trend="up" 
            bgColor="bg-amber-500/10"
          />
          
          <StatCard 
            title="Upcoming Events" 
            value={upcomingEvents} 
            icon={<CalendarIcon size={20} className="text-blue-500" />} 
            bgColor="bg-blue-500/10"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={revenueData} type="revenue" />
          <RevenueChart data={revenueData} type="tickets" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <Link to="/organizer/events" className="text-primary text-sm hover:underline flex items-center">
                View All <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs text-surface-500 dark:text-surface-400">
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">Event</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
                  {recentBookings.map(booking => (
                    <tr key={booking.id} className="text-sm">
                      <td className="py-3 font-medium">{booking.id}</td>
                      <td className="py-3 truncate" style={{ maxWidth: '200px' }}>{booking.eventName}</td>
                      <td className="py-3">${booking.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'Paid' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <BellIcon size={18} className="mr-2 text-primary" />
                Notifications
              </h3>
            </div>
            
            <div className="space-y-4">
              {notifications.map(notification => (
                <motion.div 
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg"
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{notification.message}</p>
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    {notification.time}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-sm text-primary font-medium hover:underline">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;