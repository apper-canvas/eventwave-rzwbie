import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../../utils/iconUtils';
import OrganizerNavigation from '../../components/organizer/OrganizerNavigation';

// Import sample event data (reuse from the app)
const EVENTS_DATA = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "Experience three days of amazing live performances from top artists across multiple stages.",
    date: new Date(2023, 5, 15),
    location: "Central Park, New York",
    category: "Music",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bookingsCount: 120,
    revenue: 17998.80,
    status: "active"
  },
  {
    id: 2,
    title: "Tech Conference 2023",
    description: "Join industry leaders and innovators for a two-day conference on the future of technology.",
    date: new Date(2023, 7, 10),
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bookingsCount: 85,
    revenue: 25499.15,
    status: "active"
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    description: "Taste exceptional dishes and wines from renowned chefs and wineries around the world.",
    date: new Date(2023, 8, 5),
    location: "Marina Bay, Singapore",
    category: "Food",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bookingsCount: 200,
    revenue: 17998.00,
    status: "active"
  },
  {
    id: 4,
    title: "Art Exhibition: Modern Perspectives",
    description: "Explore contemporary works from emerging and established artists pushing boundaries.",
    date: new Date(2023, 9, 22),
    location: "National Gallery, London",
    category: "Art",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bookingsCount: 65,
    revenue: 1624.35,
    status: "active"
  },
  {
    id: 5,
    title: "Marathon City Run",
    description: "Join thousands of runners in this scenic marathon through the heart of the city.",
    date: new Date(2023, 10, 12),
    location: "Downtown, Chicago",
    category: "Sports",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    bookingsCount: 350,
    revenue: 26250.00,
    status: "active"
  }
];

const EventManagement = () => {
  const [events, setEvents] = useState(EVENTS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Define icons
  const PlusIcon = getIcon('Plus');
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const ArrowUpDownIcon = getIcon('ArrowUpDown');
  const EyeIcon = getIcon('Eye');
  const EditIcon = getIcon('Edit');
  const TrashIcon = getIcon('Trash');
  const CheckIcon = getIcon('Check');
  const CalendarIcon = getIcon('Calendar');
  const TagIcon = getIcon('Tag');
  const DollarSignIcon = getIcon('DollarSign');
  const UsersIcon = getIcon('Users');
  const XIcon = getIcon('X');
  
  // Categories for filtering (from existing app)
  const CATEGORIES = [
    "All", "Music", "Technology", "Food", "Art", "Sports", "Entertainment", "Business", "Education"
  ];
  
  // Filter and sort events
  const filteredEvents = events
    .filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      }
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortBy === 'bookings') {
        return sortOrder === 'asc'
          ? a.bookingsCount - b.bookingsCount
          : b.bookingsCount - a.bookingsCount;
      }
      if (sortBy === 'revenue') {
        return sortOrder === 'asc'
          ? a.revenue - b.revenue
          : b.revenue - a.revenue;
      }
      return 0;
    });
  
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const handleDeleteClick = (eventId) => {
    setConfirmDelete(eventId);
  };
  
  const confirmDeleteEvent = () => {
    if (confirmDelete) {
      // Filter out the deleted event
      const updatedEvents = events.filter(event => event.id !== confirmDelete);
      setEvents(updatedEvents);
      toast.success("Event deleted successfully");
      setConfirmDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setConfirmDelete(null);
  };
  
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
            <h1 className="text-2xl font-bold mb-1">Event Management</h1>
            <p className="text-surface-500 dark:text-surface-400">
              Create, edit, and manage your events
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
        
        {/* Filters and Search */}
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <SearchIcon size={18} />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="form-select pl-10 w-full sm:w-40"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                  <FilterIcon size={18} />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="form-select pl-10 w-full sm:w-40"
                >
                  <option value="date-asc">Date (Oldest)</option>
                  <option value="date-desc">Date (Newest)</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                  <option value="bookings-desc">Most Bookings</option>
                  <option value="bookings-asc">Least Bookings</option>
                  <option value="revenue-desc">Highest Revenue</option>
                  <option value="revenue-asc">Lowest Revenue</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                  <ArrowUpDownIcon size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-12 text-center">
              <h3 className="text-xl font-medium mb-4">No events found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Link 
                to="/organizer/events/create"
                className="btn-primary py-2.5 px-4 inline-flex items-center"
              >
                <PlusIcon size={18} className="mr-2" />
                Create New Event
              </Link>
            </div>
          ) : (
            filteredEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="md:col-span-1">
                    <div className="h-48 md:h-full relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center mr-3">
                            <TagIcon size={14} className="mr-1.5" />
                            {event.category}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {event.status === 'active' ? 'Active' : 'Draft'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Link 
                          to={`/events/${event.id}`}
                          className="btn-outline py-1.5 px-3 text-sm flex items-center"
                        >
                          <EyeIcon size={16} className="mr-1.5" />
                          Preview
                        </Link>
                        <Link 
                          to={`/organizer/events/${event.id}/bookings`}
                          className="btn-outline py-1.5 px-3 text-sm flex items-center"
                        >
                          <UsersIcon size={16} className="mr-1.5" />
                          Bookings
                        </Link>
                        <Link 
                          to={`/organizer/events/edit/${event.id}`}
                          className="btn-outline py-1.5 px-3 text-sm flex items-center"
                        >
                          <EditIcon size={16} className="mr-1.5" />
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(event.id)}
                          className="btn-outline py-1.5 px-3 text-sm flex items-center text-red-500 hover:text-red-700 border-red-300 hover:border-red-500"
                        >
                          <TrashIcon size={16} className="mr-1.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-surface-600 dark:text-surface-300 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <CalendarIcon size={16} className="mr-2 flex-shrink-0" />
                        <span>{format(event.date, 'MMM dd, yyyy')}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <UsersIcon size={16} className="mr-2 flex-shrink-0" />
                        <span>{event.bookingsCount} Bookings</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                        <DollarSignIcon size={16} className="mr-2 flex-shrink-0" />
                        <span>${event.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <button 
                onClick={cancelDelete}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                <XIcon size={20} />
              </button>
            </div>
            
            <p className="mb-6">
              Are you sure you want to delete this event? This action cannot be undone and will remove all associated bookings.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="btn-outline py-2 px-4"
              >
                Cancel
              </button>
              
              <button
                onClick={confirmDeleteEvent}
                className="btn-primary bg-red-600 hover:bg-red-700 py-2 px-4"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;