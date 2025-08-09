import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-gray-900 whitespace-nowrap
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  };

  const variants = {
    primary: `
      bg-indigo-600 text-white hover:bg-indigo-700
      focus:ring-indigo-500 shadow-sm hover:shadow-md
      dark:bg-indigo-500 dark:hover:bg-indigo-400
    `,
    secondary: `
      bg-emerald-600 text-white hover:bg-emerald-700
      focus:ring-emerald-500 shadow-sm hover:shadow-md
      dark:bg-emerald-500 dark:hover:bg-emerald-400
    `,
    outline: `
      border border-indigo-600 text-indigo-600 
      hover:bg-indigo-50 focus:ring-indigo-500
      dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-white/5
    `,
    ghost: `
      text-gray-700 hover:bg-gray-100 focus:ring-gray-500
      dark:text-gray-300 dark:hover:bg-gray-800
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700 
      focus:ring-red-500 shadow-sm hover:shadow-md
      dark:bg-red-700 dark:hover:bg-red-600
    `,
    gradient: `
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white
      hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 
      focus:ring-pink-400
      shadow-md hover:shadow-lg
    `,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {icon && React.isValidElement(icon) && (
        <span className="mr-2 flex-shrink-0">{icon}</span>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
