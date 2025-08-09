import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import StatsCard from '../components/dashboard/StatsCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import HomeworkList from '../components/homework/HomeworkList';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Here's your study overview. Stay on top of your studies with personalized insights and performance tracking.
        </p>

        {/* Go to LMS Button */}
        <div className="mb-10">
          <Link to="/lms">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Go to LMS
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <StatsCard />
          <PerformanceChart />
          <HomeworkList />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
