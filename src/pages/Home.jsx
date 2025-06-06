import { useState, useEffect } from 'react';
                      className="w-full btn bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 py-2.5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center"
                      className="w-full btn bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 py-2.5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center"
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Sample events data
const EVENTS_DATA = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "Experience three days of amazing live performances from top artists across multiple stages.",
    date: new Date(2023, 5, 15),
    location: "Central Park, New York",
    category: "Music",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Tech Conference 2023",
    description: "Join industry leaders and innovators for a two-day conference on the future of technology.",
    date: new Date(2023, 7, 10),
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    description: "Taste exceptional dishes and wines from renowned chefs and wineries around the world.",
    date: new Date(2023, 8, 5),
    location: "Marina Bay, Singapore",
    category: "Food",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Art Exhibition: Modern Perspectives",
    description: "Explore contemporary works from emerging and established artists pushing boundaries.",
    date: new Date(2023, 9, 22),
    location: "National Gallery, London",
    category: "Art",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Marathon City Run",
    description: "Join thousands of runners in this scenic marathon through the heart of the city.",
    date: new Date(2023, 10, 12),
    location: "Downtown, Chicago",
    category: "Sports",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Comedy Night Special",
    description: "Laugh until your sides hurt with performances from top stand-up comedians.",
    date: new Date(2023, 11, 3),
    location: "Comedy Club, Los Angeles",
    category: "Entertainment",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1580809361436-42a7ec204889?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

// Categories for filtering
const CATEGORIES = [
  "All", "Music", "Technology", "Food", "Art", "Sports", "Entertainment", "Business", "Education"
];

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(EVENTS_DATA);
  const [filteredEvents, setFilteredEvents] = useState(EVENTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Define icon components before using them in JSX
  const SearchIcon = getIcon('Search');
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const TagIcon = getIcon('Tag');
  const FilterIcon = getIcon('Filter');
  const DollarSignIcon = getIcon('DollarSign');
  const TicketIcon = getIcon('Ticket');
  
  // Filter events based on category and search term
  useEffect(() => {
    let result = events;
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchLower) || 
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredEvents(result);
  }, [selectedCategory, searchTerm, events]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleBookNow = (event) => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="space-y-8">
      <section className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="relative z-10 px-6 py-12 md:px-12 md:py-20 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover Incredible Events
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
            From concerts to workshops, find and book tickets to the most exciting events happening around you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search events, venues, or cities..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 pl-10 text-surface-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <SearchIcon size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <MainFeature />
      
      <section className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide whitespace-nowrap">
            <div className="text-surface-600 dark:text-surface-300 mr-2 flex items-center">
              <FilterIcon size={16} className="mr-1" />
              <span className="text-sm">Filter:</span>
            </div>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-surface-100 dark:bg-surface-800 rounded-xl">
            <h3 className="text-xl font-medium text-surface-600 dark:text-surface-300">No events found</h3>
            <p className="mt-2 text-surface-500 dark:text-surface-400">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="event-card group h-full flex flex-col"
              >
                <div className="relative h-52 overflow-hidden rounded-t-xl">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center mb-3">
                    <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center">
                      <TagIcon size={14} className="mr-1.5" />
                      {event.category}
                    </span>
                    <span className="ml-auto text-primary font-semibold flex items-center">
                      <DollarSignIcon size={16} className="mr-1" />
                      {event.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {event.title}
                  </h3>
                  
                  <p className="text-surface-600 dark:text-surface-300 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <CalendarIcon size={15} className="mr-2 flex-shrink-0 text-surface-400" />
                        <span>{format(event.date, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <MapPinIcon size={15} className="mr-2 flex-shrink-0 text-surface-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBookNow(event)}
                      className="w-full btn-primary py-2.5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center"
                    >
                      <TicketIcon size={18} className="mr-1.5" />
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;