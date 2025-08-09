import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import Homework from './pages/Homework';
import Pricing from './pages/Pricing';
import AICompanion from './pages/AICompanion';
import Navbar from './components/common/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/dashboard" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dashboard />
              </motion.div>
            } />
            <Route path="/homework" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Homework />
              </motion.div>
            } />
            <Route path="/pricing" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Pricing />
              </motion.div>
            } />
            <Route path="/ai-companion" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AICompanion />
              </motion.div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;