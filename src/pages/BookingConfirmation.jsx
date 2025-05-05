import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  
  // Define icon components
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const TicketIcon = getIcon('Ticket');
  const CheckCircleIcon = getIcon('CheckCircle');
  const DownloadIcon = getIcon('Download');
  const ShareIcon = getIcon('Share');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const PrinterIcon = getIcon('Printer');
  const QrCodeIcon = getIcon('QrCode');

  useEffect(() => {
    // Retrieve booking data from sessionStorage
    const storedBookingData = sessionStorage.getItem('bookingData');
    
    if (storedBookingData) {
      const parsedData = JSON.parse(storedBookingData);
      setBookingData(parsedData);
      
      // Show success toast notification only now, after the booking is confirmed
      toast.success("Booking successful! Your tickets are confirmed.");
    } else {
      // If no booking data is found, redirect to home
      navigate('/');
    }
    
    // Cleanup function to clear the booking data from sessionStorage
    // when the component unmounts (optional)
    return () => {
      // sessionStorage.removeItem('bookingData');
    };
  }, [navigate]);

  const handleDownloadTicket = () => {
    toast.info("Download functionality would be implemented here");
  };

  const handleShareTicket = () => {
    toast.info("Share functionality would be implemented here");
  };

  const handlePrintTicket = () => {
    toast.info("Print functionality would be implemented here");
  };

  const handleBackToEvents = () => {
    navigate('/');
  };

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircleIcon size={32} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-surface-600 dark:text-surface-300">
          Your tickets have been successfully booked. Your booking ID is <span className="font-semibold">{bookingData.bookingId}</span>.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden"
          >
            <div className="relative h-48 md:h-56">
              <img 
                src={bookingData.eventImage} 
                alt={bookingData.eventTitle} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h2 className="text-xl font-bold mb-1">{bookingData.eventTitle}</h2>
                  <div className="flex items-center text-sm">
                    <CalendarIcon size={14} className="mr-1" />
                    <span>{format(new Date(bookingData.eventDate), 'EEEE, MMMM dd, yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <MapPinIcon size={16} className="text-primary mr-2" />
                  <span className="font-medium">{bookingData.eventLocation}</span>
                </div>
              </div>

              <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <TicketIcon size={16} className="text-primary mr-2" />
                  Ticket Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Ticket Type</span>
                    <span className="font-medium">{bookingData.ticketType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Quantity</span>
                    <span className="font-medium">{bookingData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Price per ticket</span>
                    <span className="font-medium">${bookingData.ticketPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${bookingData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4"
          >
            <h3 className="font-semibold mb-4 flex items-center">
              <QrCodeIcon size={16} className="text-primary mr-2" />
              Ticket QR Code
            </h3>

            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-lg">
                <div className="w-48 h-48 bg-surface-50 flex items-center justify-center border">
                  {/* This would be a real QR code in production */}
                  <div className="text-center p-4">
                    <QrCodeIcon size={100} className="mx-auto mb-2" />
                    <div className="text-xs text-surface-700">
                      {bookingData.bookingId}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-surface-600 dark:text-surface-300 text-center mb-6">
              Present this QR code at the venue entrance for check-in.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={handleDownloadTicket}
                className="flex flex-col items-center justify-center bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg p-3 transition-colors"
              >
                <DownloadIcon size={18} className="mb-1" />
                <span className="text-xs">Download</span>
              </button>
              <button 
                onClick={handleShareTicket}
                className="flex flex-col items-center justify-center bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg p-3 transition-colors"
              >
                <ShareIcon size={18} className="mb-1" />
                <span className="text-xs">Share</span>
              </button>
              <button 
                onClick={handlePrintTicket}
                className="flex flex-col items-center justify-center bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg p-3 transition-colors"
              >
                <PrinterIcon size={18} className="mb-1" />
                <span className="text-xs">Print</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-8"
      >
        <button 
          onClick={handleBackToEvents}
          className="btn-primary inline-flex items-center"
        >
          <ArrowLeftIcon size={16} className="mr-2" />
          Explore More Events
        </button>

        <p className="mt-4 text-sm text-surface-500 dark:text-surface-400">
          A confirmation email has been sent to your registered email address.
        </p>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;