import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Import sample events data to reuse the same data from Home.jsx
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
    longDescription: "The Summer Music Festival is the ultimate celebration of music, bringing together artists from all genres for an unforgettable weekend. With multiple stages hosting simultaneous performances, you'll be able to craft your own perfect musical journey. The festival grounds also feature food vendors, art installations, and interactive experiences to enjoy between sets. Don't miss this year's incredible lineup featuring chart-topping headliners and exciting up-and-coming artists.",
    startTime: "12:00 PM",
    endTime: "11:00 PM",
    organizer: "Melody Productions",
    availableTickets: 2500,
    ticketTypes: [
      { id: 1, name: "General Admission", price: 149.99, description: "Access to all general venues and performances" },
      { id: 2, name: "VIP Pass", price: 299.99, description: "Premium viewing areas, exclusive lounges, and complimentary refreshments" },
      { id: 3, name: "Weekend Pass", price: 399.99, description: "Full weekend access with camping option included" }
    ]
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
    longDescription: "Tech Conference 2023 is where innovation meets opportunity. This two-day event brings together the brightest minds in technology to discuss emerging trends, breakthrough innovations, and the future of tech. Featuring keynote speeches, panel discussions, workshops, and networking opportunities, this conference is designed for professionals who want to stay ahead of the curve. Topics will cover AI, blockchain, cybersecurity, digital transformation, and more.",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    organizer: "FutureTech Inc.",
    availableTickets: 1000,
    ticketTypes: [
      { id: 1, name: "Standard Pass", price: 299.99, description: "Access to all sessions and exhibitions" },
      { id: 2, name: "Premium Pass", price: 499.99, description: "Standard access plus workshop participation and exclusive networking events" },
      { id: 3, name: "Executive Pass", price: 799.99, description: "All-inclusive access with private meetings with speakers and industry leaders" }
    ]
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
    longDescription: "The Food & Wine Festival celebrates the rich tapestry of global cuisine and fine wines in the stunning setting of Marina Bay. Indulge in culinary creations from Michelin-starred chefs and discover wines from prestigious vineyards across the world. The festival features cooking demonstrations, wine tasting sessions, food pairing workshops, and the opportunity to purchase specialty ingredients and wines. Come hungry and leave inspired by the innovative flavors and techniques showcased throughout the event.",
    startTime: "11:00 AM",
    endTime: "9:00 PM",
    organizer: "Global Culinary Arts",
    availableTickets: 1500,
    ticketTypes: [
      { id: 1, name: "Tasting Pass", price: 89.99, description: "Entry with 10 food and 5 wine tasting tokens" },
      { id: 2, name: "Gourmet Pass", price: 149.99, description: "Entry with 20 food and 10 wine tasting tokens plus exclusive tastings" },
      { id: 3, name: "Chef's Table Experience", price: 249.99, description: "Limited seating at special chef-hosted dining experiences plus full festival access" }
    ]
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
    longDescription: "Modern Perspectives brings together thought-provoking works from contemporary artists who challenge conventional artistic norms. This exhibition features installations, paintings, sculptures, and digital art that explore themes of identity, technology, environmental concerns, and social change. Audio guides provide insights into the artists' inspirations and techniques, while interactive elements invite visitors to engage with the art in new ways. The exhibition also includes scheduled talks by featured artists and curators throughout its run.",
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    organizer: "Contemporary Art Foundation",
    availableTickets: 800,
    ticketTypes: [
      { id: 1, name: "Standard Entry", price: 24.99, description: "Exhibition access with digital program" },
      { id: 2, name: "Premium Entry", price: 39.99, description: "Exhibition access with audio guide and exhibition catalog" },
      { id: 3, name: "Guided Tour", price: 49.99, description: "Exhibition access with expert-led tour in small groups" }
    ]
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
    longDescription: "The Marathon City Run is Chicago's premier running event, taking participants through 26.2 miles of the city's most iconic neighborhoods and landmarks. The course is designed to showcase the urban landscape while providing a challenging yet achievable route for runners of all levels. Spectators line the streets to cheer on participants, creating an electric atmosphere throughout the race. Hydration stations, medical support, and entertainment are provided along the route. All finishers receive a medal, with prizes awarded to top performers across different categories.",
    startTime: "7:00 AM",
    endTime: "2:00 PM",
    organizer: "Chicago Athletics Association",
    availableTickets: 5000,
    ticketTypes: [
      { id: 1, name: "Standard Entry", price: 75.00, description: "Race entry with timing chip, t-shirt, and finisher's medal" },
      { id: 2, name: "Premium Package", price: 120.00, description: "Race entry with premium gear pack and priority starting position" },
      { id: 3, name: "Charity Entry", price: 200.00, description: "Race entry with donation to local community programs and special recognition" }
    ]
  },
  {
    id: 6,
    title: "Comedy Night Special",
    description: "Laugh until your sides hurt with performances from top stand-up comedians.",
    date: new Date(2023, 11, 3),
    location: "Comedy Club, Los Angeles",
    category: "Entertainment",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1580809361436-42a7ec204889?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    longDescription: "Comedy Night Special brings together a lineup of hilarious performers for an evening of non-stop laughter. Featuring a mix of established comedians and rising stars, each performer brings their unique perspective and comedic style to the stage. The intimate venue creates the perfect atmosphere for comedy, allowing for interaction between performers and the audience. Arrive early to enjoy dinner and drinks before the show begins. Please note that content may include adult themes and language.",
    startTime: "8:00 PM",
    endTime: "11:00 PM",
    organizer: "Laugh Factory Productions",
    availableTickets: 200,
    ticketTypes: [
      { id: 1, name: "General Seating", price: 49.99, description: "Standard seating with one drink included" },
      { id: 2, name: "Premium Seating", price: 79.99, description: "Front section seating with two drinks included" },
      { id: 3, name: "VIP Experience", price: 129.99, description: "Best seats in the house, drink package, and meet & greet with performers" }
    ]
  }
];

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Define icon components
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const TagIcon = getIcon('Tag');
  const UserIcon = getIcon('User');
  const TicketIcon = getIcon('Ticket');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  const CheckIcon = getIcon('Check');

  useEffect(() => {
    // Simulate API call to fetch event details
    setLoading(true);
    
    // Find the event in our sample data
    const foundEvent = EVENTS_DATA.find(e => e.id === parseInt(eventId));
    
    if (foundEvent) {
      setEvent(foundEvent);
      // Pre-select the first ticket type
      if (foundEvent.ticketTypes && foundEvent.ticketTypes.length > 0) {
        setSelectedTicket(foundEvent.ticketTypes[0]);
      }
    }
    
    setLoading(false);
  }, [eventId]);

  const handleTicketSelection = (ticket) => {
    setSelectedTicket(ticket);
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBooking = () => {
    if (!selectedTicket) {
      toast.error("Please select a ticket type");
      return;
    }

    // Create booking data object
    const bookingData = {
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      eventImage: event.image,
      ticketType: selectedTicket.name,
      ticketPrice: selectedTicket.price,
      quantity: quantity,
      totalPrice: selectedTicket.price * quantity,
      bookingId: 'BK' + Date.now().toString().slice(-8),
      bookingDate: new Date(),
    };

    // In a real app, you would submit this to an API
    // For now, we'll save it to sessionStorage for the confirmation page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    // Navigate to confirmation page
    navigate(`/booking/confirmation`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="mb-6 text-surface-600 dark:text-surface-300">The event you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={handleGoBack}
          className="btn-primary inline-flex items-center"
        >
          <ArrowLeftIcon size={16} className="mr-2" />
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={handleGoBack}
        className="mb-6 flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        <ArrowLeftIcon size={16} className="mr-2" />
        Back to Events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-2 rounded-lg text-lg font-medium">
              ${event.price.toFixed(2)}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg flex flex-col">
              <div className="text-primary mb-1 flex items-center">
                <CalendarIcon size={18} className="mr-2" />
                <span className="font-medium">Date</span>
              </div>
              <span>{format(event.date, 'MMMM dd, yyyy')}</span>
            </div>
            
            <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg flex flex-col">
              <div className="text-primary mb-1 flex items-center">
                <ClockIcon size={18} className="mr-2" />
                <span className="font-medium">Time</span>
              </div>
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            
            <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg flex flex-col">
              <div className="text-primary mb-1 flex items-center">
                <TagIcon size={18} className="mr-2" />
                <span className="font-medium">Category</span>
              </div>
              <span>{event.category}</span>
            </div>
            
            <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg flex flex-col">
              <div className="text-primary mb-1 flex items-center">
                <UserIcon size={18} className="mr-2" />
                <span className="font-medium">Organizer</span>
              </div>
              <span>{event.organizer}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center text-lg font-semibold mb-3">
              <MapPinIcon size={18} className="mr-2 text-primary" />
              <h2>Location</h2>
            </div>
            <p className="text-surface-700 dark:text-surface-300 mb-4">{event.location}</p>
            <div className="bg-surface-100 dark:bg-surface-800 h-48 rounded-lg">
              {/* In a real app, you might embed a map here */}
              <div className="h-full flex items-center justify-center text-surface-500 dark:text-surface-400">
                Map of event location would be displayed here
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <div className="text-surface-700 dark:text-surface-300 space-y-4">
              <p>{event.longDescription || event.description}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TicketIcon size={20} className="mr-2 text-primary" />
              Book Tickets
            </h2>
            
            <div className="mb-6">
              <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">Select Ticket Type</p>
              <div className="space-y-3">
                {event.ticketTypes.map(ticket => (
                  <div 
                    key={ticket.id}
                    onClick={() => handleTicketSelection(ticket)}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedTicket && selectedTicket.id === ticket.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ticket.name}</h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">{ticket.description}</p>
                      </div>
                      <div className="font-semibold text-primary">${ticket.price.toFixed(2)}</div>
                    </div>
                    {selectedTicket && selectedTicket.id === ticket.id && (
                      <div className="mt-2 flex items-center text-primary text-sm">
                        <CheckIcon size={16} className="mr-1" />
                        Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">Ticket Quantity</p>
              <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-lg w-32">
                <button 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-surface-500 dark:text-surface-400 disabled:opacity-50"
                >
                  <MinusIcon size={16} />
                </button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button 
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                  className="w-10 h-10 flex items-center justify-center text-surface-500 dark:text-surface-400 disabled:opacity-50"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>
            
            <div className="border-t border-surface-200 dark:border-surface-700 py-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-surface-600 dark:text-surface-400">Price per ticket</span>
                <span>${selectedTicket ? selectedTicket.price.toFixed(2) : "0.00"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-surface-600 dark:text-surface-400">Quantity</span>
                <span>× {quantity}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span className="text-primary">
                  ${selectedTicket ? (selectedTicket.price * quantity).toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleBooking}
              className="w-full btn-primary py-3 text-center"
            >
              Complete Booking
            </button>
            
            <p className="text-xs text-surface-500 dark:text-surface-400 text-center mt-4">
              By proceeding, you agree to our terms and conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;