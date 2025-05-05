import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const EVENT_TYPES = [
  { id: 'concert', name: 'Concert', icon: 'Music' },
  { id: 'conference', name: 'Conference', icon: 'Users' },
  { id: 'workshop', name: 'Workshop', icon: 'Lightbulb' },
  { id: 'exhibition', name: 'Exhibition', icon: 'Image' },
  { id: 'festival', name: 'Festival', icon: 'PartyPopper' },
  { id: 'sporting', name: 'Sporting Event', icon: 'Trophy' }
];

const TICKETS = [
  { id: 'standard', name: 'Standard', price: 49.99, description: 'General admission' },
  { id: 'vip', name: 'VIP', price: 129.99, description: 'Premium seating with exclusive perks' },
  { id: 'early', name: 'Early Bird', price: 39.99, description: 'Limited availability discount tickets' }
];

const MainFeature = () => {
  // Define all icon components at the beginning
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const UsersIcon = getIcon('Users');
  const InfoIcon = getIcon('Info');
  const ChevronRightIcon = getIcon('ChevronRight');
  const TicketIcon = getIcon('Ticket');
  const CheckIcon = getIcon('Check');
  const SearchIcon = getIcon('Search');
  const LoaderCircleIcon = getIcon('LoaderCircle');
  const FilterIcon = getIcon('Filter');
  
  // State for booking flow
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventType: '',
    location: '',
    date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    attendees: 1,
    ticketType: '',
    quantity: 1
  });
  
  // State for ticket selection
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Get event type object by id
  const getEventType = (id) => EVENT_TYPES.find(type => type.id === id);
  
  // Calculate total price
  const calculateTotal = () => {
    if (!selectedTicket) return 0;
    const ticket = TICKETS.find(t => t.id === selectedTicket);
    return ticket ? ticket.price * formData.quantity : 0;
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle ticket selection
  const handleTicketSelect = (ticketId) => {
    setSelectedTicket(ticketId);
    setFormData(prev => ({
      ...prev,
      ticketType: ticketId
    }));
  };
  
  // Handle quantity changes
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setFormData(prev => ({
        ...prev,
        quantity: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.eventType || !formData.location) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 800);
    } else if (step === 2) {
      if (!selectedTicket) {
        toast.error("Please select a ticket type");
        return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Success message
        toast.success("Booking confirmed! Check your email for details.");
        
        // Reset form
        setStep(1);
        setFormData({
          eventType: '',
          location: '',
          date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
          attendees: 1,
          ticketType: '',
          quantity: 1
        });
        setSelectedTicket(null);
      }, 1500);
    }
  };
  
  // Find event type icon
  const eventTypeIcon = formData.eventType ? 
    getIcon(getEventType(formData.eventType)?.icon || 'Calendar') : null;

  return (
    <section className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <TicketIcon className="mr-2 text-primary" />
            Quick Event Finder
          </h2>
          
          <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
            <InfoIcon size={16} className="mr-1" />
            <span>Find and book your tickets in minutes</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {EVENT_TYPES.map((type) => {
                        // Get the icon component for this event type
                        const TypeIcon = getIcon(type.icon);
                        
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({...formData, eventType: type.id})}
                            className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${
                              formData.eventType === type.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700"
                            }`}
                          >
                            <TypeIcon size={24} className="mb-2" />
                            <span className="text-sm">{type.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                      <div className="relative">
                        <input
                          id="location"
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="City or venue"
                          className="form-input pl-10"
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                          <MapPinIcon size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                        <div className="relative">
                          <input
                            id="date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="form-input pl-10"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                            <CalendarIcon size={18} />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="attendees" className="block text-sm font-medium mb-2">Attendees</label>
                        <div className="relative">
                          <input
                            id="attendees"
                            type="number"
                            name="attendees"
                            min="1"
                            max="10"
                            value={formData.attendees}
                            onChange={handleChange}
                            className="form-input pl-10"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                            <UsersIcon size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary py-3 px-6 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircleIcon size={20} className="animate-spin mr-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        Find Events
                        <ChevronRightIcon size={20} className="ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-xl mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  {eventTypeIcon && <div className="mr-3 text-primary">{eventTypeIcon}</div>}
                  <div>
                    <h3 className="font-semibold">{getEventType(formData.eventType)?.name || 'Event'}</h3>
                    <div className="text-sm text-surface-600 dark:text-surface-300 flex flex-wrap gap-x-4 mt-1">
                      <span className="flex items-center">
                        <MapPinIcon size={14} className="mr-1" />
                        {formData.location}
                      </span>
                      <span className="flex items-center">
                        <CalendarIcon size={14} className="mr-1" />
                        {format(new Date(formData.date), 'MMMM dd, yyyy')}
                      </span>
                      <span className="flex items-center">
                        <UsersIcon size={14} className="mr-1" />
                        {formData.attendees} {formData.attendees === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-primary hover:text-primary-dark flex items-center"
                >
                  <FilterIcon size={14} className="mr-1" />
                  Modify Search
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Select Ticket Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TICKETS.map((ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() => handleTicketSelect(ticket.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          selectedTicket === ticket.id
                            ? "border-primary bg-primary/10"
                            : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700"
                        }`}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{ticket.name}</span>
                          <span className="text-primary font-semibold">${ticket.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-surface-600 dark:text-surface-300">{ticket.description}</p>
                        {selectedTicket === ticket.id && (
                          <div className="mt-2 text-primary flex items-center text-sm">
                            <CheckIcon size={16} className="mr-1" />
                            Selected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium mb-2">Ticket Quantity</label>
                    <input
                      id="quantity"
                      type="number"
                      name="quantity"
                      min="1"
                      max="10"
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="md:col-span-2 bg-surface-50 dark:bg-surface-700 p-4 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="text-surface-600 dark:text-surface-300">Subtotal</span>
                      <span>${(calculateTotal()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-surface-600 dark:text-surface-300">Service Fee</span>
                      <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-surface-200 dark:border-surface-600 pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">${(calculateTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !selectedTicket}
                    className="btn-primary py-3 px-6 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircleIcon size={20} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Booking
                        <ChevronRightIcon size={20} className="ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MainFeature;