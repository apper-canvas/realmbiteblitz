import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const HomeIcon = getIcon('home');
  const AlertCircleIcon = getIcon('alert-circle');
  
  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/20 dark:bg-primary/10 rounded-full animate-ping"></div>
            <div className="relative bg-white dark:bg-surface-800 p-4 rounded-full shadow-soft">
              <AlertCircleIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          You'll be redirected to the home page in a few seconds.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors inline-flex items-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Go Home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;