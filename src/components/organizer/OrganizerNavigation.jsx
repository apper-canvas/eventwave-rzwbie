import { Link, useLocation } from 'react-router-dom';
import getIcon from '../../utils/iconUtils';

const OrganizerNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define icon components
  const LayoutDashboardIcon = getIcon('LayoutDashboard');
  const CalendarIcon = getIcon('Calendar');
  const TicketIcon = getIcon('Ticket');
  const BarChart3Icon = getIcon('BarChart3');
  const LogOutIcon = getIcon('LogOut');

  const navItems = [
    {
      path: '/organizer/dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboardIcon size={20} />
    },
    {
      path: '/organizer/events',
      name: 'Events',
      icon: <CalendarIcon size={20} />
    },
    {
      path: '/organizer/revenue',
      name: 'Revenue',
      icon: <BarChart3Icon size={20} />
    }
  ];

  // Check if the path includes a specific base path
  const isActive = (path) => {
    if (path === '/organizer/dashboard') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 mb-6">
      <div className="flex items-center justify-between mb-6 px-2">
        <Link to="/" className="flex items-center">
          <TicketIcon size={24} className="text-primary mr-2" />
          <span className="font-bold text-lg">EventWave</span>
          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Organizer</span>
        </Link>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
        
        <Link 
          to="/"
          className="flex items-center px-4 py-3 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors mt-6"
        >
          <LogOutIcon size={20} className="mr-3" />
          <span>Back to Main Site</span>
        </Link>
      </nav>
    </div>
  );
};

export default OrganizerNavigation;