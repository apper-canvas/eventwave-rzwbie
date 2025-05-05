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
  
  // Form state for credit card
  const [cardFormData, setCardFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  // Form state for UPI
  const [upiFormData, setUpiFormData] = useState({
    upiId: ''
  });
  
  // Form state for net banking
  const [netBankingFormData, setNetBankingFormData] = useState({
    bank: ''
  });
  
  // Form state for wallets
  const [walletFormData, setWalletFormData] = useState({
    walletType: 'paytm',
    mobileNumber: ''
  });
  
  // Banks list for net banking
  const banks = [
    { id: 'sbi', name: 'State Bank of India' },
    { id: 'hdfc', name: 'HDFC Bank' },
    { id: 'icici', name: 'ICICI Bank' },
    { id: 'axis', name: 'Axis Bank' },
    { id: 'kotak', name: 'Kotak Mahindra Bank' },
    { id: 'pnb', name: 'Punjab National Bank' },
    { id: 'yes', name: 'Yes Bank' },
    { id: 'bob', name: 'Bank of Baroda' }
  ];
  
  // Form errors
  const [errors, setErrors] = useState({});

  // Define icon components
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const TicketIcon = getIcon('Ticket');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CreditCardIcon = getIcon('CreditCard');
  const LockIcon = getIcon('Lock');
  const BankIcon = getIcon('Building');
  const WalletIcon = getIcon('Wallet');
  const CheckIcon = getIcon('Check');
  const SmartphoneIcon = getIcon('Smartphone');
  const UserIcon = getIcon('User');
  const ShieldIcon = getIcon('Shield');
  const AlertCircleIcon = getIcon('AlertCircle');

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

  const handleCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardFormData({
      ...cardFormData,
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

  const handleUpiInputChange = (e) => {
    const { name, value } = e.target;
    setUpiFormData({
      ...upiFormData,
      [name]: value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleNetBankingInputChange = (e) => {
    const { name, value } = e.target;
    setNetBankingFormData({
      ...netBankingFormData,
      [name]: value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleWalletInputChange = (e) => {
    const { name, value } = e.target;
    setWalletFormData({
      ...walletFormData,
      [name]: value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateCardForm = () => {
    const newErrors = {};
    
    // Basic validation for credit card
    if (!cardFormData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardFormData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!cardFormData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!cardFormData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardFormData.expiryDate)) {
      newErrors.expiryDate = 'Use format MM/YY';
    }
    
    if (!cardFormData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardFormData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpiForm = () => {
    const newErrors = {};
    
    // UPI ID validation
    if (!upiFormData.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!/^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,}$/.test(upiFormData.upiId)) {
      newErrors.upiId = 'Invalid UPI ID format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNetBankingForm = () => {
    const newErrors = {};
    
    // Bank selection validation
    if (!netBankingFormData.bank) {
      newErrors.bank = 'Please select a bank';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateWalletForm = () => {
    const newErrors = {};
    
    // Mobile number validation for wallet
    if (!walletFormData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(walletFormData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setErrors({});
  };

  const handleBankSelection = (bankId) => {
    setNetBankingFormData({ ...netBankingFormData, bank: bankId });
    // Clear any bank selection errors
    if (errors.bank) {
      setErrors({
        ...errors,
        bank: null
      });
    }
  };

  const handleWalletTypeSelection = (walletType) => {
    setWalletFormData({ ...walletFormData, walletType });
    // Clear any wallet-related errors
    if (errors.walletType) {
      setErrors({
        ...errors,
        walletType: null
      });
    }
  };

  const handleSubmitPayment = () => {
    let isValid = false;
    
    // Validate form based on selected payment method
    switch (selectedPaymentMethod) {
      case 'creditCard':
        isValid = validateCardForm();
        break;
      case 'upi':
        isValid = validateUpiForm();
        break;
      case 'netBanking':
        isValid = validateNetBankingForm();
        break;
      case 'wallet':
        isValid = validateWalletForm();
        break;
      default:
        isValid = true;
    }
    
    if (!isValid) {
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
          paymentMethod: selectedPaymentMethod,
          paymentDetails: getPaymentDetails()
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
  
  const getPaymentDetails = () => {
    switch (selectedPaymentMethod) {
      case 'creditCard':
        return {
          type: 'Credit/Debit Card',
          last4: cardFormData.cardNumber.slice(-4),
          cardholderName: cardFormData.cardholderName
        };
      case 'upi':
        return {
          type: 'UPI',
          upiId: upiFormData.upiId
        };
      case 'netBanking':
        return {
          type: 'Net Banking',
          bankName: banks.find(bank => bank.id === netBankingFormData.bank)?.name || 'Selected Bank'
        };
      case 'wallet':
        return {
          type: 'Digital Wallet',
          walletName: getWalletName(walletFormData.walletType),
          mobileNumber: walletFormData.mobileNumber
        };
      default:
        return {
          type: 'Unknown Payment Method'
        };
    }
  };
  
  const getWalletName = (type) => {
    switch (type) {
      case 'paytm':
        return 'Paytm';
      case 'phonepe':
        return 'PhonePe';
      case 'googlepay':
        return 'Google Pay';
      default:
        return 'Digital Wallet';
    }
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
                  <h3 className="font-medium">Credit/Debit Card</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Visa, Mastercard, Amex</p>
                </div>
                {selectedPaymentMethod === 'creditCard' && (
                  <div className="ml-auto text-primary">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
              
              <div 
                onClick={() => handlePaymentMethodChange('upi')}
                className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'upi' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
              >
                <div className="mr-3 text-primary">
                  <SmartphoneIcon size={24} />
                </div>
                <div>
                  <h3 className="font-medium">UPI</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Google Pay, PhonePe, BHIM</p>
                </div>
                {selectedPaymentMethod === 'upi' && (
                  <div className="ml-auto text-primary">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
              
              <div 
                onClick={() => handlePaymentMethodChange('netBanking')}
                className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'netBanking' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
              >
                <div className="mr-3 text-primary">
                  <BankIcon size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Net Banking</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400">All major banks supported</p>
                </div>
                {selectedPaymentMethod === 'netBanking' && (
                  <div className="ml-auto text-primary">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
              
              <div 
                onClick={() => handlePaymentMethodChange('wallet')}
                className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
                  selectedPaymentMethod === 'wallet' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
              >
                <div className="mr-3 text-primary">
                  <WalletIcon size={24} />
                </div>
                <div>
                  <h3 className="font-medium">Digital Wallets</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Paytm, PhonePe, Google Pay</p>
                </div>
                {selectedPaymentMethod === 'wallet' && (
                  <div className="ml-auto text-primary">
                    <CheckIcon size={18} />
                  </div>
                )}
              </div>
            </div>
            
            {/* Credit/Debit Card Form */}
            {selectedPaymentMethod === 'creditCard' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.cardNumber 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-surface-200 dark:border-surface-700'
                      } bg-white dark:bg-surface-900 pl-10`}
                      value={cardFormData.cardNumber}
                      onChange={handleCardInputChange}
                      maxLength={19}
                    />
                    <CreditCardIcon size={16} className="absolute left-3 top-3 text-surface-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircleIcon size={12} className="mr-1" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      placeholder="John Smith"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.cardholderName 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-surface-200 dark:border-surface-700'
                      } bg-white dark:bg-surface-900 pl-10`}
                      value={cardFormData.cardholderName}
                      onChange={handleCardInputChange}
                    />
                    <UserIcon size={16} className="absolute left-3 top-3 text-surface-400" />
                  </div>
                  {errors.cardholderName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircleIcon size={12} className="mr-1" />
                      {errors.cardholderName}
                    </p>
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
                      value={cardFormData.expiryDate}
                      onChange={handleCardInputChange}
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircleIcon size={12} className="mr-1" />
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                    <div className="relative">
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
                        value={cardFormData.cvv}
                        onChange={handleCardInputChange}
                        maxLength={4}
                      />
                      <div className="absolute right-3 top-2 cursor-help group">
                        <ShieldIcon size={16} className="text-surface-400" />
                        <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 bg-surface-900 text-white text-xs p-2 rounded shadow-lg w-48">
                          The CVV is the 3 or 4 digit code on the back of your card
                        </div>
                      </div>
                    </div>
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircleIcon size={12} className="mr-1" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="saveCard"
                    name="saveCard"
                    checked={cardFormData.saveCard}
                    onChange={handleCardInputChange}
                    className="w-4 h-4 text-primary border-surface-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="saveCard" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                    Save card for future purchases
                  </label>
                </div>
              </div>
            )}
            
            {/* UPI Form */}
            {selectedPaymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="upiId" className="block text-sm font-medium mb-1">UPI ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      placeholder="yourname@upi"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.upiId 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-surface-200 dark:border-surface-700'
                      } bg-white dark:bg-surface-900 pl-10`}
                      value={upiFormData.upiId}
                      onChange={handleUpiInputChange}
                    />
                    <SmartphoneIcon size={16} className="absolute left-3 top-3 text-surface-400" />
                  </div>
                  {errors.upiId && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircleIcon size={12} className="mr-1" />
                      {errors.upiId}
                    </p>
                  )}
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    Enter your UPI ID (e.g., yourname@okbank, mobilenumber@upi)
                  </p>
                </div>
                
                <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg mt-4">
                  <div className="flex items-center mb-2">
                    <ShieldIcon size={16} className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">How UPI Payment Works</span>
                  </div>
                  <ol className="list-decimal list-inside text-xs text-surface-600 dark:text-surface-300 space-y-1 pl-5">
                    <li>Enter your UPI ID and click "Complete Payment"</li>
                    <li>You'll receive a payment request notification on your UPI app</li>
                    <li>Approve the payment in your UPI app</li>
                    <li>Return to this page to complete your booking</li>
                  </ol>
                </div>
              </div>
            )}
            
            {/* Net Banking Form */}
            {selectedPaymentMethod === 'netBanking' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="bank" className="block text-sm font-medium mb-1">Select Bank</label>
                  <select
                    id="bank"
                    name="bank"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.bank 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-surface-200 dark:border-surface-700'
                    } bg-white dark:bg-surface-900`}
                    value={netBankingFormData.bank}
                    onChange={handleNetBankingInputChange}
                  >
                    <option value="">Select your bank</option>
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                  {errors.bank && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircleIcon size={12} className="mr-1" />
                      {errors.bank}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {banks.slice(0, 4).map(bank => (
                    <div
                      key={bank.id}
                      onClick={() => handleBankSelection(bank.id)}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors text-center ${
                        netBankingFormData.bank === bank.id
                          ? 'border-primary bg-primary/5'
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                      }`}
                    >
                      <BankIcon size={20} className={`mb-1 ${netBankingFormData.bank === bank.id ? 'text-primary' : 'text-surface-600 dark:text-surface-400'}`} />
                      <p className={`text-xs font-medium ${netBankingFormData.bank === bank.id ? 'text-primary' : ''}`}>{bank.name.split(' ')[0]}</p>
                      {netBankingFormData.bank === bank.id && (
                        <div className="absolute top-1 right-1 text-primary">
                          <CheckIcon size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {banks.slice(4, 8).map(bank => (
                    <div
                      key={bank.id}
                      onClick={() => handleBankSelection(bank.id)}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors text-center ${
                        netBankingFormData.bank === bank.id
                          ? 'border-primary bg-primary/5'
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                      }`}
                    >
                      <BankIcon size={20} className={`mb-1 ${netBankingFormData.bank === bank.id ? 'text-primary' : 'text-surface-600 dark:text-surface-400'}`} />
                      <p className={`text-xs font-medium ${netBankingFormData.bank === bank.id ? 'text-primary' : ''}`}>{bank.name.split(' ')[0]}</p>
                      {netBankingFormData.bank === bank.id && (
                        <div className="absolute top-1 right-1 text-primary">
                          <CheckIcon size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg mt-4">
                  <div className="flex items-center mb-2">
                    <ShieldIcon size={16} className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">Secure Banking Process</span>
                  </div>
                  <p className="text-xs text-surface-600 dark:text-surface-300">
                    After clicking "Complete Payment", you'll be redirected to your bank's secure login page to authorize the payment.
                  </p>
                </div>
              </div>
            )}
            
            {/* Digital Wallet Form */}
            {selectedPaymentMethod === 'wallet' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Wallet</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div
                      onClick={() => handleWalletTypeSelection('paytm')}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors relative ${
                        walletFormData.walletType === 'paytm'
                          ? 'border-primary bg-primary/5'
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                      }`}
                    >
                      <WalletIcon size={24} className="mb-1 text-blue-500" />
                      <p className={`text-sm font-medium ${walletFormData.walletType === 'paytm' ? 'text-primary' : ''}`}>Paytm</p>
                      {walletFormData.walletType === 'paytm' && (
                        <div className="absolute top-1 right-1 text-primary">
                          <CheckIcon size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div
                      onClick={() => handleWalletTypeSelection('phonepe')}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors relative ${
                        walletFormData.walletType === 'phonepe'
                          ? 'border-primary bg-primary/5'
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                      }`}
                    >
                      <WalletIcon size={24} className="mb-1 text-purple-500" />
                      <p className={`text-sm font-medium ${walletFormData.walletType === 'phonepe' ? 'text-primary' : ''}`}>PhonePe</p>
                      {walletFormData.walletType === 'phonepe' && (
                        <div className="absolute top-1 right-1 text-primary">
                          <CheckIcon size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div
                      onClick={() => handleWalletTypeSelection('googlepay')}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-colors relative ${
                        walletFormData.walletType === 'googlepay'
                          ? 'border-primary bg-primary/5'
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                      }`}
                    >
                      <WalletIcon size={24} className="mb-1 text-green-500" />
                      <p className={`text-sm font-medium ${walletFormData.walletType === 'googlepay' ? 'text-primary' : ''}`}>Google Pay</p>
                      {walletFormData.walletType === 'googlepay' && (
                        <div className="absolute top-1 right-1 text-primary">
                          <CheckIcon size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium mb-1">Mobile Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.mobileNumber 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-surface-200 dark:border-surface-700'
                      } bg-white dark:bg-surface-900 pl-10`}
                      value={walletFormData.mobileNumber}
                      onChange={handleWalletInputChange}
                      maxLength={10}
                    />
                    <SmartphoneIcon size={16} className="absolute left-3 top-3 text-surface-400" />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircleIcon size={12} className="mr-1" />
                      {errors.mobileNumber}
                    </p>
                  )}
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    Enter the mobile number linked to your {getWalletName(walletFormData.walletType)} account
                  </p>
                </div>
                
                <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg mt-4">
                  <div className="flex items-center mb-2">
                    <ShieldIcon size={16} className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">Secure Wallet Process</span>
                  </div>
                  <p className="text-xs text-surface-600 dark:text-surface-300">
                    After clicking "Complete Payment", you'll receive a payment request notification on your wallet app. Approve the payment to complete your booking.
                  </p>
                </div>
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
            
            <div className="mt-4 flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center text-xs text-surface-500 dark:text-surface-400">
                <LockIcon size={12} className="mr-1" /> 
                Secure payment processed using 256-bit encryption
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-surface-200 dark:bg-surface-700 rounded"></div>
                <div className="w-8 h-5 bg-surface-200 dark:bg-surface-700 rounded"></div>
                <div className="w-8 h-5 bg-surface-200 dark:bg-surface-700 rounded"></div>
                <div className="w-8 h-5 bg-surface-200 dark:bg-surface-700 rounded"></div>
              </div>
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