import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home({ activeTab, setActiveTab }) {
  // Current location state
  const [currentLocation, setCurrentLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Icon components
  const SearchIcon = getIcon('search');
  const MapPinIcon = getIcon('map-pin');
  const ChevronDownIcon = getIcon('chevron-down');
  const StarIcon = getIcon('star');
  const ClockIcon = getIcon('clock');
  const TruckIcon = getIcon('truck');
  const TagIcon = getIcon('tag');
  
  // Mock restaurant data
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    // Simulate loading restaurant data
    setTimeout(() => {
      setRestaurants([
        {
          id: 1,
          name: "Tasty Bites",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          cuisine: ["Italian", "Pizza"],
          rating: 4.5,
          deliveryTime: 25,
          priceRange: "$$",
          discount: "50% OFF up to $10",
          isPromoted: true
        },
        {
          id: 2,
          name: "Spice Junction",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          cuisine: ["Indian", "Curry"],
          rating: 4.2,
          deliveryTime: 35,
          priceRange: "$$",
          discount: "Free delivery",
          isPromoted: false
        },
        {
          id: 3,
          name: "Burger Empire",
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          cuisine: ["American", "Burgers"],
          rating: 4.0,
          deliveryTime: 20,
          priceRange: "$",
          discount: "Buy 1 Get 1 Free",
          isPromoted: true
        },
        {
          id: 4,
          name: "Sushi World",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          cuisine: ["Japanese", "Sushi"],
          rating: 4.7,
          deliveryTime: 40,
          priceRange: "$$$",
          discount: "20% OFF",
          isPromoted: false
        },
        {
          id: 5,
          name: "Taco Fiesta",
          image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          cuisine: ["Mexican", "Latin American"],
          rating: 4.3,
          deliveryTime: 30,
          priceRange: "$$",
          discount: "30% OFF on first order",
          isPromoted: true
        },
        {
          id: 6,
          name: "Noodle House",
          image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          cuisine: ["Chinese", "Noodles"],
          rating: 4.1,
          deliveryTime: 25,
          priceRange: "$",
          discount: "Free spring roll on orders above $20",
          isPromoted: false
        }
      ]);
      setIsLoading(false);
    }, 1500); // Simulate 1.5s loading time
  }, []);
  
  // Filter states
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  
  // Cuisines list
  const cuisines = ['All', 'Italian', 'Indian', 'American', 'Japanese', 'Mexican', 'Chinese'];
  
  // Handle location change
  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    
    // Sort restaurants based on selected option
    let sortedRestaurants = [...restaurants];
    
    switch(e.target.value) {
      case 'rating':
        sortedRestaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery-time':
        sortedRestaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'price-low':
        sortedRestaurants.sort((a, b) => a.priceRange.length - b.priceRange.length);
        break;
      case 'price-high':
        sortedRestaurants.sort((a, b) => b.priceRange.length - a.priceRange.length);
        break;
      default: // popularity (promoted first, then rating)
        sortedRestaurants.sort((a, b) => {
          if (a.isPromoted === b.isPromoted) {
            return b.rating - a.rating;
          }
          return a.isPromoted ? -1 : 1;
        });
    }
    
    setRestaurants(sortedRestaurants);
    toast.success(`Sorted by ${e.target.options[e.target.selectedIndex].text}`);
  };
  
  // Filter restaurants by cuisine
  const filteredRestaurants = selectedCuisine === 'All' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.cuisine.includes(selectedCuisine));
  
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div>
      <div className="mt-8 mb-20">
        <MainFeature activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-light to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white font-bold mb-4"
            >
              Food Delivery Made <span className="text-accent">Simple</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-lg mb-8"
            >
              Order from your favorite restaurants and get delicious meals delivered to your doorstep in minutes.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-surface-800 p-1 rounded-lg flex items-center shadow-lg max-w-lg"
            >
              <div className="flex-shrink-0 pl-3">
                <MapPinIcon className="h-5 w-5 text-primary" />
              </div>
              <input
                type="text"
                placeholder="Enter your delivery location"
                value={currentLocation}
                onChange={handleLocationChange}
                className="flex-grow px-3 py-2 bg-transparent focus:outline-none text-surface-800 dark:text-surface-200"
              />
              <button 
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => toast.info("Location service coming soon!")}
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                <span>Find Food</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section className="py-12 bg-surface-50 dark:bg-surface-900" id="main-feature">
      </section>
      
      {/* Restaurants Section */}
      <section className="py-12" id="restaurants">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Restaurants Near You</h2>
            <p className="text-surface-600 dark:text-surface-400">Discover restaurants that deliver to your location</p>
          </div>
          
          {/* Filters */}
          <div className="bg-white dark:bg-surface-800 p-4 rounded-lg shadow-soft mb-8">
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                {cuisines.map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedCuisine === cuisine
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-surface-600 dark:text-surface-400">Sort by:</label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-surface-100 dark:bg-surface-700 border-none rounded-md py-2 pl-4 pr-10 text-surface-800 dark:text-surface-200 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="delivery-time">Delivery Time</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <ChevronDownIcon className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Restaurant Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-soft animate-pulse">
                  <div className="w-full h-48 bg-surface-200 dark:bg-surface-700"></div>
                  <div className="p-4">
                    <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2 mb-2"></div>
                    <div className="flex justify-between mt-4">
                      <div className="h-5 bg-surface-200 dark:bg-surface-700 rounded w-24"></div>
                      <div className="h-5 bg-surface-200 dark:bg-surface-700 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRestaurants.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl mb-2">No restaurants found</h3>
                  <p className="text-surface-600 dark:text-surface-400">Try changing your filters or location</p>
                </div>
              ) : (
                filteredRestaurants.map(restaurant => (
                  <motion.div
                    key={restaurant.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      {restaurant.isPromoted && (
                        <div className="absolute top-3 left-3 bg-accent text-surface-800 text-xs font-bold px-2 py-1 rounded-md">
                          Promoted
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {restaurant.discount}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-2">
                        {restaurant.cuisine.join(", ")} • {restaurant.priceRange}
                      </p>
                      <div className="flex justify-between mt-3">
                        <div className="flex items-center text-sm">
                          <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                            <StarIcon className="h-3 w-3 mr-1" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          <span>{restaurant.deliveryTime} min</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                          <TruckIcon className="h-3 w-3 mr-1" />
                          <span>Free</span>
                        </div>
                      </div>
                      
                      <button 
                        className="w-full mt-4 py-2 bg-surface-100 dark:bg-surface-700 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-md transition-colors text-sm font-medium"
                        onClick={() => toast.success(`Viewing ${restaurant.name} menu`)}
                      >
                        View Menu
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
export default Home;