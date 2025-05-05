import OrganizerNavigation from '../../components/organizer/OrganizerNavigation';
import EventForm from '../../components/organizer/EventForm';

const CreateEvent = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <OrganizerNavigation />
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Create New Event</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Fill in the details below to create a new event
          </p>
        </div>
        
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEvent;