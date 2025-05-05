import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const Payment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  // Form errors
  const [errors, setErrors] = useState({});

  // Define icon components
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const TicketIcon = getIcon('Ticket');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CreditCardIcon = getIcon('CreditCard');
  const LockIcon = getIcon('Lock');
  const PaypalIcon = getIcon('Paypal');
  const BankIcon = getIcon('Building');
  const WalletIcon = getIcon('Wallet');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');

  useEffect(() => {
    // Retrieve booking data from sessionStorage
    const storedBookingData = sessionStorage.getItem('bookingData');
    
    if (storedBookingData) {
      const parsedData = JSON.parse(storedBookingData);
      setBookingData(parsedData);
    } else {
      // If no booking data is found, redirect to home
      navigate('/');
    }
    
    setLoading(false);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Use format MM/YY';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmitPayment = () => {
    if (selectedPaymentMethod === 'creditCard' && !validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // 90% success rate for the demo
      const paymentSuccessful = Math.random() < 0.9;
      
      if (paymentSuccessful) {
        // Set payment status in booking data
        const updatedBookingData = {
          ...bookingData,
          paymentStatus: 'Paid',
          paymentDate: new Date(),
          paymentMethod: selectedPaymentMethod
        };
        
        // Update sessionStorage with the payment information
        sessionStorage.setItem('bookingData', JSON.stringify(updatedBookingData));
        
        // Navigate to confirmation page
        navigate('/booking/confirmation');
      } else {
        // Payment failed
        setProcessingPayment(false);
        toast.error('Payment failed. Please try again or use a different payment method.', {
          autoClose: 5000
        });
      }
    }, 2000);
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

  if (!bookingData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
        <p className="mb-6 text-surface-600 dark:text-surface-300">
          We couldn't find your booking information. Please try again.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary inline-flex items-center"
        >
          Explore Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={handleGoBack}
        className="mb-6 flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors"
        disabled={processingPayment}
      >
        <ArrowLeftIcon size={16} className="mr-2" />
        Back to Event Details
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div 
                onClick={() => handlePaymentMethodChange('creditCard')}
                className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'creditCard' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
              >
                <div className="mr-3 text-primary">
                  <CreditCardIcon size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Credit Card</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Visa, Mastercard, Amex</p>
                </div>
                {selectedPaymentMethod === 'creditCard' && (
                  <div className="ml-auto text-primary">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
              
              <div 
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'paypal' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
              >
                <div className="mr-3 text-primary">
                  <PaypalIcon size={24} />
                </div>
                <div>
                  <h3 className="font-medium">PayPal</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Pay with your PayPal account</p>
                </div>
                {selectedPaymentMethod === 'paypal' && (
                  <div className="ml-auto text-primary">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
            </div>
            
            {selectedPaymentMethod === 'creditCard' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.cardNumber 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-surface-200 dark:border-surface-700'
                    } bg-white dark:bg-surface-900`}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="John Smith"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.cardholderName 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-surface-200 dark:border-surface-700'
                    } bg-white dark:bg-surface-900`}
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.expiryDate 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-surface-200 dark:border-surface-700'
                      } bg-white dark:bg-surface-900`}
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.cvv 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-surface-200 dark:border-surface-700'
                      } bg-white dark:bg-surface-900`}
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="saveCard"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary border-surface-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="saveCard" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                    Save card for future purchases
                  </label>
                </div>
              </div>
            )}
            
            {selectedPaymentMethod === 'paypal' && (
              <div className="text-center p-6">
                <div className="mb-4 text-primary">
                  <PaypalIcon size={60} />
                </div>
                <p className="mb-4 text-surface-600 dark:text-surface-300">
                  Click "Complete Payment" to be redirected to PayPal to complete your purchase securely.
                </p>
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <button 
                onClick={handleSubmitPayment}
                disabled={processingPayment}
                className="btn-primary w-full md:w-auto px-8 py-3 flex items-center justify-center"
              >
                {processingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <LockIcon size={16} className="mr-2" />
                    Complete Payment (${bookingData.totalPrice.toFixed(2)})
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-center text-xs text-surface-500 dark:text-surface-400 flex items-center justify-center">
              <LockIcon size={12} className="mr-1" /> 
              Secure payment processed using encryption
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="mb-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <img 
                  src={bookingData.eventImage} 
                  alt={bookingData.eventTitle} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">{bookingData.eventTitle}</h3>
              <div className="flex items-center text-sm mt-1 text-surface-600 dark:text-surface-300">
                <CalendarIcon size={14} className="mr-1" />
                <span>{format(new Date(bookingData.eventDate), 'EEEE, MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center text-sm mt-1 text-surface-600 dark:text-surface-300">
                <MapPinIcon size={14} className="mr-1" />
                <span>{bookingData.eventLocation}</span>
              </div>
            </div>
            
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mb-4">
              <div className="flex items-center mb-2">
                <TicketIcon size={16} className="text-primary mr-2" />
                <span className="font-medium">Ticket Details</span>
              </div>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Type</span>
                  <span>{bookingData.ticketType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Quantity</span>
                  <span>{bookingData.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-300">Price per ticket</span>
                  <span>${bookingData.ticketPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${bookingData.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-surface-600 dark:text-surface-300">Service Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-surface-600 dark:text-surface-300">Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 border-t border-surface-200 dark:border-surface-700 pt-4">
                <span>Total</span>
                <span className="text-primary">${bookingData.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;