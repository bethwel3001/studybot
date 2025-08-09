import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const mathScores = [65, 59, 80, 81, 56, 72];
    const scienceScores = [28, 48, 40, 19, 86, 27];
    const englishScores = [45, 25, 60, 36, 90, 50];

    setChartData({
      labels,
      datasets: [
        {
          label: 'Math',
          data: mathScores,
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.5)',
          tension: 0.3,
        },
        {
          label: 'Science',
          data: scienceScores,
          borderColor: 'rgb(139, 92, 246)',
          backgroundColor: 'rgba(139, 92, 246, 0.5)',
          tension: 0.3,
        },
        {
          label: 'English',
          data: englishScores,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          tension: 0.3,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6b7280',
        },
      },
      title: {
        display: true,
        text: 'Performance Over Time',
        color: '#6b7280',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(209, 213, 219, 0.2)', 
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)', 
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
};

export default PerformanceChart;