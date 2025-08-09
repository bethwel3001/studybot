import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
      whileHover={{ y: -5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;