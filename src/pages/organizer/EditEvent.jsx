import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrganizerNavigation from '../../components/organizer/OrganizerNavigation';
import EventForm from '../../components/organizer/EventForm';
import getIcon from '../../utils/iconUtils';

// Reuse the same event data from EventDetails.jsx
const EVENTS_DATA = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "Experience three days of amazing live performances from top artists across multiple stages.",
    date: "2023-06-15",
    startTime: "12:00",
    endTime: "23:00",
    location: "Central Park, New York",
    category: "Music",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    longDescription: "The Summer Music Festival is the ultimate celebration of music, bringing together artists from all genres for an unforgettable weekend. With multiple stages hosting simultaneous performances, you'll be able to craft your own perfect musical journey. The festival grounds also feature food vendors, art installations, and interactive experiences to enjoy between sets. Don't miss this year's incredible lineup featuring chart-topping headliners and exciting up-and-coming artists.",
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
    date: "2023-08-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    longDescription: "Tech Conference 2023 is where innovation meets opportunity. This two-day event brings together the brightest minds in technology to discuss emerging trends, breakthrough innovations, and the future of tech. Featuring keynote speeches, panel discussions, workshops, and networking opportunities, this conference is designed for professionals who want to stay ahead of the curve. Topics will cover AI, blockchain, cybersecurity, digital transformation, and more.",
    organizer: "FutureTech Inc.",
    availableTickets: 1000,
    ticketTypes: [
      { id: 1, name: "Standard Pass", price: 299.99, description: "Access to all sessions and exhibitions" },
      { id: 2, name: "Premium Pass", price: 499.99, description: "Standard access plus workshop participation and exclusive networking events" },
      { id: 3, name: "Executive Pass", price: 799.99, description: "All-inclusive access with private meetings with speakers and industry leaders" }
    ]
  }
];

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Define icon components
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  useEffect(() => {
    // Simulate API call to fetch event details
    setLoading(true);
    
    // Find the event in our sample data
    const foundEvent = EVENTS_DATA.find(e => e.id === parseInt(eventId));
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      toast.error("Event not found");
      navigate('/organizer/events');
    }
    
    setLoading(false);
  }, [eventId, navigate]);
  
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
        <div>
          <h1 className="text-2xl font-bold mb-1">Edit Event</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Update details for "{event.title}"
          </p>
        </div>
        
        <EventForm eventData={event} isEditing={true} />
      </div>
    </div>
  );
};

export default EditEvent;