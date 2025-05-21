import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [activeFeatureTab, setActiveFeatureTab] = useState('search');
  const [darkMode, setDarkMode] = useState(() => {
    
    // Check for saved theme preference or use system preference
    if (localStorage.getItem('darkMode') !== null) {
      return localStorage.getItem('darkMode') === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle for dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Header component with dark mode toggle
  const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const MoonIcon = getIcon('moon');
    const SunIcon = getIcon('sun');
    const ShoppingCartIcon = getIcon('shopping-cart');
    const MenuIcon = getIcon('menu');
    const XIcon = getIcon('x');
    
    return (
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/90 backdrop-blur-sm border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <h1 className="text-xl font-bold text-primary">BiteBlitz</h1>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">Home</a>
            <a href="#restaurants" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">Restaurants</a>
            <a href="#offers" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">Offers</a>
            <a href="#help" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">Help</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-surface-700" />}
            </button>
            
            <a href="#cart" className="relative p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              <ShoppingCartIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">0</span>
            </a>
            
            <button 
              className="md:hidden p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-surface-200 dark:border-surface-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                <a href="/" className="py-2 text-surface-700 dark:text-surface-300 hover:text-primary">Home</a>
                <a href="#restaurants" className="py-2 text-surface-700 dark:text-surface-300 hover:text-primary">Restaurants</a>
                <a href="#offers" className="py-2 text-surface-700 dark:text-surface-300 hover:text-primary">Offers</a>
                <a href="#help" className="py-2 text-surface-700 dark:text-surface-300 hover:text-primary">Help</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  };

  // Footer component
  const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-surface-100 dark:bg-surface-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">BiteBlitz</h4>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Order delicious food from your favorite restaurants and get it delivered to your doorstep.
              </p>
            </div>
            
            <div>
              <h5 className="text-md font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-surface-600 dark:text-surface-400 hover:text-primary">About Us</a></li>
                <li><a href="#careers" className="text-surface-600 dark:text-surface-400 hover:text-primary">Careers</a></li>
                <li><a href="#blog" className="text-surface-600 dark:text-surface-400 hover:text-primary">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-md font-semibold mb-4">For Users</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#code" className="text-surface-600 dark:text-surface-400 hover:text-primary">Code of Conduct</a></li>
                <li><a href="#community" className="text-surface-600 dark:text-surface-400 hover:text-primary">Community</a></li>
                <li><a href="#testimonials" className="text-surface-600 dark:text-surface-400 hover:text-primary">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-md font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#terms" className="text-surface-600 dark:text-surface-400 hover:text-primary">Terms & Conditions</a></li>
                <li><a href="#privacy" className="text-surface-600 dark:text-surface-400 hover:text-primary">Privacy Policy</a></li>
                <li><a href="#cookies" className="text-surface-600 dark:text-surface-400 hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-surface-600 dark:text-surface-400">
              © {currentYear} BiteBlitz. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#facebook" className="text-surface-600 dark:text-surface-400 hover:text-primary">Facebook</a>
              <a href="#twitter" className="text-surface-600 dark:text-surface-400 hover:text-primary">Twitter</a>
              <a href="#instagram" className="text-surface-600 dark:text-surface-400 hover:text-primary">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  // Bottom Navigation component
  const BottomNavigation = () => {
    const SearchIcon = getIcon('search');
    const ShoppingBagIcon = getIcon('shopping-bag');
    const TruckIcon = getIcon('truck');
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-2">
            <button 
              className={`flex flex-col items-center justify-center px-5 py-2 rounded-lg transition-colors ${
                activeFeatureTab === 'search' 
                  ? 'text-primary bg-surface-100 dark:bg-surface-800' 
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              onClick={() => setActiveFeatureTab('search')}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <SearchIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Search</span>
            </button>
            
            <button 
              className={`flex flex-col items-center justify-center px-5 py-2 rounded-lg transition-colors mx-4 ${
                activeFeatureTab === 'cart' 
                  ? 'text-primary bg-surface-100 dark:bg-surface-800' 
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              onClick={() => setActiveFeatureTab('cart')}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1 relative">
                <ShoppingBagIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Cart</span>
            </button>
            
            <button 
              className={`flex flex-col items-center justify-center px-5 py-2 rounded-lg transition-colors ${
                activeFeatureTab === 'tracking' 
                  ? 'text-primary bg-surface-100 dark:bg-surface-800' 
                  : 'text-surface-600 dark:text-surface-400'
              }`}
              onClick={() => setActiveFeatureTab('tracking')}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <TruckIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Tracking</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pb-16">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home activeTab={activeFeatureTab} setActiveTab={setActiveFeatureTab} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg"
      />
      <BottomNavigation />
    </div>
  );
}

export default App;