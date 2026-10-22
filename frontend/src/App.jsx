import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DashboardHome from './pages/DashboardHome';
import MenuManagement from './pages/MenuManagement';
import CategoryManagement from './pages/CategoryManagement';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderManagement from './pages/OrderManagement';
import BookingManagement from './pages/BookingManagement';
import EnquiryManagement from './pages/EnquiryManagement';
import MyOrders from './pages/MyOrders';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import LiveChatWidget from './components/LiveChatWidget';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';



import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes (No Navbar/Footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="bookings" element={<BookingManagement />} />
              <Route path="enquiries" element={<EnquiryManagement />} />
            </Route>

            {/* Public Routes */}
            <Route path="*" element={
              <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#1e2a1e] font-sans">
                <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
                <CartDrawer />
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
                <LiveChatWidget />

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-orders" element={<Dashboard />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
