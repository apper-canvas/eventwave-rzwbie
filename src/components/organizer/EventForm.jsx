import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getIcon from '../../utils/iconUtils';

const EventForm = ({ eventData, isEditing = false }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Define icons
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const TagIcon = getIcon('Tag');
  const DollarSignIcon = getIcon('DollarSign');
  const ImageIcon = getIcon('Image');
  const UserIcon = getIcon('User');
  const TicketIcon = getIcon('Ticket');
  const InfoIcon = getIcon('Info');
  const LoaderCircleIcon = getIcon('LoaderCircle');
  const CheckIcon = getIcon('Check');
  const PlusIcon = getIcon('Plus');
  const TrashIcon = getIcon('Trash');
  
  // Default form data if creating new event
  const defaultFormData = {
    title: '',
    description: '',
    longDescription: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: '',
    price: '',
    image: '',
    organizer: 'Your Organization',
    availableTickets: 100,
    ticketTypes: [
      { id: 1, name: 'Standard', price: 0, description: 'Basic admission' }
    ]
  };
  
  // Initialize form with existing data or defaults
  const [formData, setFormData] = useState(eventData || defaultFormData);
  
  // Available categories to select from
  const CATEGORIES = [
    "Music", "Technology", "Food", "Art", "Sports", "Entertainment", "Business", "Education"
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle price specifically as a number
    if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle ticket type changes
  const handleTicketChange = (index, field, value) => {
    const updatedTicketTypes = [...formData.ticketTypes];
    
    // Handle price as a number
    if (field === 'price') {
      updatedTicketTypes[index][field] = parseFloat(value) || 0;
    } else {
      updatedTicketTypes[index][field] = value;
    }
    
    setFormData({
      ...formData,
      ticketTypes: updatedTicketTypes
    });
  };
  
  // Add a new ticket type
  const addTicketType = () => {
    const newTicketType = {
      id: formData.ticketTypes.length + 1,
      name: '',
      price: 0,
      description: ''
    };
    
    setFormData({
      ...formData,
      ticketTypes: [...formData.ticketTypes, newTicketType]
    });
  };
  
  // Remove a ticket type
  const removeTicketType = (index) => {
    if (formData.ticketTypes.length <= 1) {
      toast.error("Event must have at least one ticket type");
      return;
    }
    
    const updatedTicketTypes = formData.ticketTypes.filter((_, i) => i !== index);
    
    setFormData({
      ...formData,
      ticketTypes: updatedTicketTypes
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.date || !formData.location || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Validate ticket types
    const ticketValidation = formData.ticketTypes.every(ticket => 
      ticket.name && ticket.price >= 0 && ticket.description
    );
    
    if (!ticketValidation) {
      toast.error("Please complete all ticket type information");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to save the data
    setTimeout(() => {
      setIsLoading(false);
      
      if (isEditing) {
        toast.success("Event updated successfully");
      } else {
        toast.success("Event created successfully");
      }
      
      // Navigate back to events list
      navigate('/organizer/events');
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="form-input w-full"
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select pl-10 w-full"
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <TagIcon size={18} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="form-textarea w-full"
            placeholder="Brief description for event listings"
            required
          ></textarea>
        </div>
        
        <div className="mt-6">
          <label htmlFor="longDescription" className="block text-sm font-medium mb-2">
            Full Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="4"
            className="form-textarea w-full"
            placeholder="Detailed description of your event"
            required
          ></textarea>
        </div>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold mb-6">Date, Time & Location</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Event Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input pl-10 w-full"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <CalendarIcon size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium mb-2">
              Start Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                className="form-input pl-10 w-full"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <ClockIcon size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium mb-2">
              End Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                className="form-input pl-10 w-full"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <ClockIcon size={18} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="form-input pl-10 w-full"
              placeholder="Venue name and address"
              required
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
              <MapPinIcon size={18} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold mb-6">Tickets & Pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="organizer" className="block text-sm font-medium mb-2">
              Organizer Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="organizer"
                name="organizer"
                type="text"
                value={formData.organizer}
                onChange={handleChange}
                className="form-input pl-10 w-full"
                placeholder="Organization name"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <UserIcon size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="availableTickets" className="block text-sm font-medium mb-2">
              Total Available Tickets <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="availableTickets"
                name="availableTickets"
                type="number"
                min="1"
                value={formData.availableTickets}
                onChange={handleChange}
                className="form-input pl-10 w-full"
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                <TicketIcon size={18} />
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="font-medium flex items-center mt-8 mb-4">
          <InfoIcon size={16} className="mr-2 text-primary" />
          Ticket Types
        </h3>
        
        <div className="space-y-4">
          {formData.ticketTypes.map((ticket, index) => (
            <div key={index} className="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Ticket Type #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeTicketType(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                    className="form-input w-full"
                    placeholder="e.g. General Admission, VIP, etc."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      className="form-input pl-10 w-full"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                      <DollarSignIcon size={18} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ticket.description}
                  onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                  className="form-input w-full"
                  placeholder="What's included with this ticket"
                  required
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addTicketType}
            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <PlusIcon size={18} className="mr-2" />
            Add Another Ticket Type
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold mb-6">Event Image</h2>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image URL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              className="form-input pl-10 w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
              <ImageIcon size={18} />
            </div>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
            Enter a valid image URL. For production, we would implement file uploads.
          </p>
        </div>
        
        {formData.image && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="relative h-48 bg-surface-100 dark:bg-surface-700 rounded-lg overflow-hidden">
              <img
                src={formData.image}
                alt="Event preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/organizer/events')}
          className="btn-outline py-2.5 px-4"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary py-2.5 px-6 flex items-center"
        >
          {isLoading ? (
            <>
              <LoaderCircleIcon size={20} className="animate-spin mr-2" />
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <CheckIcon size={20} className="mr-2" />
              {isEditing ? 'Update Event' : 'Create Event'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EventForm;