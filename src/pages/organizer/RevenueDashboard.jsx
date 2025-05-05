import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../../utils/iconUtils';
import OrganizerNavigation from '../../components/organizer/OrganizerNavigation';
import StatCard from '../../components/organizer/StatCard';
import RevenueChart from '../../components/organizer/RevenueChart';

const RevenueDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [dateRange, setDateRange] = useState('all-time');
  
  // Define icon components
  const DollarSignIcon = getIcon('DollarSign');
  const TrendingUpIcon = getIcon('TrendingUp');
  const PercentIcon = getIcon('Percent');
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const TicketIcon = getIcon('Ticket');
  const ArrowUpRightIcon = getIcon('ArrowUpRight');
  const PieChartIcon = getIcon('PieChart');
  
  // Sample revenue data
  const revenueData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenueMonthly: [1200, 1800, 1650, 2100, 1850, 3200, 3800, 2900, 3500, 4200, 4800, 5820],
    revenueDaily: [820, 932, 901, 934, 1290, 1330, 1320],
    ticketsMonthly: [18, 24, 30, 35, 30, 48, 52, 38, 42, 58, 68, 89],
    ticketsDaily: [12, 17, 13, 9, 18, 14, 6]
  };
  
  // Sample event data for dropdown
  const events = [
    { id: 'all', name: 'All Events' },
    { id: '1', name: 'Summer Music Festival' },
    { id: '2', name: 'Tech Conference 2023' },
    { id: '3', name: 'Food & Wine Festival' },
    { id: '4', name: 'Art Exhibition: Modern Perspectives' },
    { id: '5', name: 'Marathon City Run' }
  ];
  
  // Sample ticket type data
  const ticketTypeData = [
    { name: 'General Admission', revenue: 24998, percentage: 35, color: 'bg-primary' },
    { name: 'VIP Pass', revenue: 17999, percentage: 25, color: 'bg-amber-500' },
    { name: 'Weekend Pass', revenue: 20000, percentage: 28, color: 'bg-green-500' },
    { name: 'Premium Pass', revenue: 8999, percentage: 12, color: 'bg-indigo-500' }
  ];
  
  // Total revenue
  const totalRevenue = 71996;
  const totalTickets = 532;
  const conversionRate = 68;
  const avgTicketPrice = 135.33;
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <OrganizerNavigation />
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Revenue Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Track your sales, revenue, and ticket performance
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="event-filter" className="block text-sm font-medium mb-2">
              Filter by Event
            </label>
            <select
              id="event-filter"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="form-select w-full"
            >
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date-range" className="block text-sm font-medium mb-2">
              Date Range
            </label>
            <select
              id="date-range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-select w-full"
            >
              <option value="all-time">All Time</option>
              <option value="this-year">This Year</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
            </select>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Revenue" 
            value={`$${totalRevenue.toLocaleString()}`} 
            icon={<DollarSignIcon size={20} className="text-green-500" />} 
            change="15%" 
            trend="up" 
            bgColor="bg-green-500/10"
          />
          
          <StatCard 
            title="Total Tickets Sold" 
            value={totalTickets} 
            icon={<TicketIcon size={20} className="text-amber-500" />} 
            change="8%" 
            trend="up" 
            bgColor="bg-amber-500/10"
          />
          
          <StatCard 
            title="Conversion Rate" 
            value={`${conversionRate}%`} 
            icon={<PercentIcon size={20} className="text-blue-500" />} 
            change="3%" 
            trend="up" 
            bgColor="bg-blue-500/10"
          />
          
          <StatCard 
            title="Avg. Ticket Price" 
            value={`$${avgTicketPrice.toFixed(2)}`} 
            icon={<TrendingUpIcon size={20} className="text-purple-500" />} 
            change="5%" 
            trend="up" 
            bgColor="bg-purple-500/10"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={revenueData} type="revenue" />
          <RevenueChart data={revenueData} type="tickets" />
        </div>
        
        {/* Ticket Types Revenue */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
          <div className="flex items-center mb-6">
            <PieChartIcon size={20} className="text-primary mr-2" />
            <h3 className="text-lg font-semibold">Revenue by Ticket Type</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {ticketTypeData.map((ticket, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{ticket.name}</span>
                    <span className="text-sm font-medium">${ticket.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${ticket.color}`}
                      style={{ width: `${ticket.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-surface-500 dark:text-surface-400">{ticket.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-surface-50 dark:bg-surface-700 p-6 rounded-xl">
              <h4 className="font-medium mb-4">Revenue Insights</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm font-medium mb-1">
                    <ArrowUpRightIcon size={16} className="text-green-500 mr-1.5" />
                    Top Performing Ticket
                  </div>
                  <p className="text-surface-600 dark:text-surface-300 text-sm">
                    <span className="font-medium">General Admission</span> makes up the largest portion of your revenue at <span className="text-green-500 font-medium">35%</span>.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium mb-1">
                    <TrendingUpIcon size={16} className="text-amber-500 mr-1.5" />
                    Revenue Growth
                  </div>
                  <p className="text-surface-600 dark:text-surface-300 text-sm">
                    Your revenue has increased by <span className="text-green-500 font-medium">15%</span> compared to the previous period.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium mb-1">
                    <CalendarIcon size={16} className="text-blue-500 mr-1.5" />
                    Event Performance
                  </div>
                  <p className="text-surface-600 dark:text-surface-300 text-sm">
                    <span className="font-medium">Marathon City Run</span> is your highest grossing event with <span className="text-green-500 font-medium">$26,250</span> in revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;