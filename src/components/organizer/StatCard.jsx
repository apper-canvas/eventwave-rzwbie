import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, change, trend, bgColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 ${bgColor}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-surface-500 dark:text-surface-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${bgColor || 'bg-primary/10'}`}>
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="flex items-center">
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
          <span className="text-surface-500 dark:text-surface-400 text-sm ml-2">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;