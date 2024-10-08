import React, { useEffect, useRef } from 'react';

const notifications = [
  { id: 1, title: 'New project "KWD Dashboard" created', time: '9h ago', description: 'Looks like there might be a new theme soon' },
  { id: 2, title: 'KWD Dashboard v0.0.2 was released', time: '2d ago', description: 'Successful new version was released' },
  // Thêm nhiều thông báo tùy ý...
];

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={sidebarRef} className={`fixed inset-y-0 left-0 bg-white dark:bg-boxdark w-80 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ top: '80px', bottom: '0' }}>
      <div className="flex justify-between items-center p-4 bg-white dark:bg-boxdark border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-black dark:text-white">Notifications</h2>
        <button onClick={onClose} className="text-xl text-black dark:text-white">&times;</button>
      </div>
      <div className="p-4 bg-white dark:bg-boxdark overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
        {notifications.map(notification => (
          <div key={notification.id} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-200 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01M12 12h.01M12 12h.01M21 12h.01M21 12h.01M3 12h.01M3 12h.01M15 16h.01M15 16h.01M6 16h.01M6 16h.01M6 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-black dark:text-white">{notification.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSidebar;
