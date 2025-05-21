import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Icon components
  const SearchIcon = getIcon('search');
  const ShoppingBagIcon = getIcon('shopping-bag');
  const TruckIcon = getIcon('truck');
  const PlusIcon = getIcon('plus');
  const MinusIcon = getIcon('minus');
  const TrashIcon = getIcon('trash');
  const MapPinIcon = getIcon('map-pin');
  const CreditCardIcon = getIcon('credit-card');
  const MoneyIcon = getIcon('dollar-sign');
  
  // Mock food items data
  const foodItems = [
    { id: 1, name: "Margherita Pizza", restaurant: "Tasty Bites", price: 12.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Italian", rating: 4.5 },
    { id: 2, name: "Chicken Biryani", restaurant: "Spice Junction", price: 14.99, image: "https://images.unsplash.com/photo-1633945274405-b6c8069a1e43?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Indian", rating: 4.2 },
    { id: 3, name: "Double Cheeseburger", restaurant: "Burger Empire", price: 9.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "American", rating: 4.0 },
    { id: 4, name: "Sushi Platter", restaurant: "Sushi World", price: 18.99, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Japanese", rating: 4.7 },
    { id: 5, name: "Beef Tacos", restaurant: "Taco Fiesta", price: 8.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Mexican", rating: 4.3 },
    { id: 6, name: "Pad Thai", restaurant: "Noodle House", price: 10.99, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Thai", rating: 4.1 },
    { id: 7, name: "Vegetable Pasta", restaurant: "Tasty Bites", price: 11.99, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Italian", rating: 4.4 },
    { id: 8, name: "Butter Chicken", restaurant: "Spice Junction", price: 13.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Indian", rating: 4.6 }
  ];
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = foodItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast.info("No items found matching your search");
      } else {
        toast.success(`Found ${results.length} items matching your search`);
      }
    }, 800);
  };
  
  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    toast.success(`Added ${item.name} to cart`);
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    toast.info("Item removed from cart");
  };
  
  // Update item quantity
  const updateQuantity = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity < 1) {
          return item; // Don't allow quantity below 1
        }
        
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
  };
  
  // Place order
  const placeOrder = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }
    
    const orderTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = orderTotal * 0.08; // 8% tax
    
    // Create order object
    const order = {
      id: Math.floor(Math.random() * 10000),
      items: cartItems,
      address,
      paymentMethod,
      subtotal: orderTotal,
      deliveryFee,
      tax,
      total: orderTotal + deliveryFee + tax,
      status: "confirmed",
      estimatedDelivery: new Date(Date.now() + 35 * 60000).toLocaleTimeString(), // 35 minutes from now
    };
    
    setCurrentOrder(order);
    setCartItems([]);
    setAddress('');
    setActiveTab('tracking');
    
    toast.success("Order placed successfully!");
  };
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Tab content components
  const SearchTab = () => (
    <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-soft">
      <h3 className="text-xl font-semibold mb-4">Search for Food</h3>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes, cuisines, or restaurants..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-surface-400" />
          </div>
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-md text-sm hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>
      </form>
      
      {isSearching ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-surface-100 dark:bg-surface-700 rounded-lg p-4 animate-pulse flex">
              <div className="w-20 h-20 bg-surface-200 dark:bg-surface-600 rounded-md"></div>
              <div className="ml-4 flex-1">
                <div className="h-5 bg-surface-200 dark:bg-surface-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-2">
                Showing {searchResults.length} results for "{searchQuery}"
              </p>
              
              {searchResults.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4 flex hover:shadow-md transition-shadow"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {item.restaurant} • {item.category}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-primary text-white p-1 rounded-full hover:bg-primary-dark transition-colors"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            searchQuery ? (
              <div className="text-center py-8">
                <p className="text-surface-500 dark:text-surface-400">No results found. Try a different search term.</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-surface-500 dark:text-surface-400">Search for your favorite food above.</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Pizza', 'Burger', 'Sushi', 'Indian', 'Dessert', 'Healthy'].map(category => (
                    <button 
                      key={category}
                      onClick={() => {
                        setSearchQuery(category);
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="bg-surface-100 dark:bg-surface-700 py-2 px-3 rounded-md text-sm hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
  
  const CartTab = () => (
    <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-soft">
      <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingBagIcon className="w-12 h-12 mx-auto text-surface-300 dark:text-surface-600 mb-4" />
          <h4 className="text-lg font-medium mb-2">Your cart is empty</h4>
          <p className="text-surface-500 dark:text-surface-400 mb-4">
            Add items from restaurants to start an order
          </p>
          <button 
            onClick={() => setActiveTab('search')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div>
          <div className="divide-y divide-surface-200 dark:divide-surface-700 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="py-4 flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{item.restaurant}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-surface-100 dark:bg-surface-700 p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-surface-100 dark:bg-surface-700 p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors ml-2"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-surface-600 dark:text-surface-400">Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-surface-600 dark:text-surface-400">Tax</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-3 text-lg">
              <span>Total</span>
              <span>${(cartTotal + 2.99 + cartTotal * 0.08).toFixed(2)}</span>
            </div>
          </div>
          
          <form onSubmit={placeOrder}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="address">
                Delivery Address
              </label>
              <div className="relative">
                <input 
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <MapPinIcon className="w-4 h-4 text-surface-400" />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-surface-200 dark:border-surface-700 rounded-lg cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                  <input 
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-2"
                  />
                  <CreditCardIcon className="w-5 h-5 mr-2 text-surface-600 dark:text-surface-400" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-3 border border-surface-200 dark:border-surface-700 rounded-lg cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                  <input 
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mr-2"
                  />
                  <MoneyIcon className="w-5 h-5 mr-2 text-surface-600 dark:text-surface-400" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
  
  const TrackingTab = () => (
    <div className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-soft">
      <h3 className="text-xl font-semibold mb-4">Order Tracking</h3>
      
      {currentOrder ? (
        <div>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg mb-6 flex items-start">
            <div className="mr-3 mt-0.5">✓</div>
            <div>
              <p className="font-medium">Order Confirmed</p>
              <p className="text-sm">Your order #{currentOrder.id} has been confirmed and is being prepared.</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Delivery Status</h4>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-200 dark:bg-surface-700"></div>
              
              <div className="relative z-10 flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm">1</span>
                </div>
                <div className="ml-4">
                  <h5 className="font-medium">Order Confirmed</h5>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    Your order has been received
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm">2</span>
                </div>
                <div className="ml-4">
                  <h5 className="font-medium">Preparing Your Food</h5>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    The restaurant is preparing your order
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-surface-300 dark:bg-surface-600 text-surface-700 dark:text-surface-300 flex items-center justify-center">
                  <span className="text-sm">3</span>
                </div>
                <div className="ml-4">
                  <h5 className="font-medium text-surface-500 dark:text-surface-400">Out for Delivery</h5>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    Your order will be on its way soon
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center">
                <div className="w-8 h-8 rounded-full bg-surface-300 dark:bg-surface-600 text-surface-700 dark:text-surface-300 flex items-center justify-center">
                  <span className="text-sm">4</span>
                </div>
                <div className="ml-4">
                  <h5 className="font-medium text-surface-500 dark:text-surface-400">Delivered</h5>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    Enjoy your meal!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-2">Estimated Delivery Time</h4>
            <p className="text-lg font-semibold text-primary">{currentOrder.estimatedDelivery}</p>
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mb-6">
            <h4 className="font-medium mb-3">Order Summary</h4>
            <div className="space-y-3 mb-4">
              {currentOrder.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                <span>${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Delivery Fee</span>
                <span>${currentOrder.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Tax</span>
                <span>${currentOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-surface-200 dark:border-surface-700">
                <span>Total</span>
                <span>${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('search')}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Place Another Order
          </button>
        </div>
      ) : (
        <div className="text-center py-10">
          <TruckIcon className="w-12 h-12 mx-auto text-surface-300 dark:text-surface-600 mb-4" />
          <h4 className="text-lg font-medium mb-2">No active orders</h4>
          <p className="text-surface-500 dark:text-surface-400 mb-4">
            You don't have any orders to track at the moment
          </p>
          <button 
            onClick={() => setActiveTab('search')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Start Ordering
          </button>
        </div>
      )}
    </div>
  );
  
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Order Food in 3 Easy Steps</h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-surface-200 dark:border-surface-700">
          <button 
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'search' 
                ? 'text-primary' 
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
            onClick={() => setActiveTab('search')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center mr-2">
                <SearchIcon className="w-4 h-4" />
              </div>
              <span>Search</span>
            </div>
            {activeTab === 'search' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          
          <button 
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'cart' 
                ? 'text-primary' 
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
            onClick={() => setActiveTab('cart')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center mr-2 relative">
                <ShoppingBagIcon className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </div>
            {activeTab === 'cart' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          
          <button 
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'tracking' 
                ? 'text-primary' 
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            }`}
            onClick={() => setActiveTab('tracking')}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center mr-2">
                <TruckIcon className="w-4 h-4" />
              </div>
              <span>Tracking</span>
            </div>
            {activeTab === 'tracking' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'search' && <SearchTab />}
            {activeTab === 'cart' && <CartTab />}
            {activeTab === 'tracking' && <TrackingTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;