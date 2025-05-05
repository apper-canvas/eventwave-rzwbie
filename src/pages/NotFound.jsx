import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Define icon components before using them in JSX
  const HomeIcon = getIcon('Home');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="mb-8 text-secondary">
        <AlertCircleIcon size={80} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404 - Page Not Found</h1>
      
      <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-lg mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        <HomeIcon size={18} className="mr-2" />
        Return to Home
      </Link>
      
      <div className="mt-12 p-6 bg-surface-100 dark:bg-surface-800 rounded-xl max-w-md">
        <h2 className="text-xl font-semibold mb-4">Looking for events?</h2>
        <p className="text-surface-600 dark:text-surface-300 mb-4">
          Discover amazing concerts, workshops, and gatherings happening near you.
        </p>
        <Link 
          to="/" 
          className="text-primary hover:text-primary-dark font-medium"
        >
          Browse all events →
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;