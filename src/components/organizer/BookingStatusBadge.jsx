const BookingStatusBadge = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status.toLowerCase()) {
    case 'paid':
      bgColor = 'bg-green-100 dark:bg-green-900/30';
      textColor = 'text-green-800 dark:text-green-400';
      break;
    case 'pending':
      bgColor = 'bg-amber-100 dark:bg-amber-900/30';
      textColor = 'text-amber-800 dark:text-amber-400';
      break;
    case 'cancelled':
      bgColor = 'bg-red-100 dark:bg-red-900/30';
      textColor = 'text-red-800 dark:text-red-400';
      break;
    default:
      bgColor = 'bg-surface-100 dark:bg-surface-700';
      textColor = 'text-surface-800 dark:text-surface-300';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default BookingStatusBadge;