import { useState } from 'react';
import NotificationSidebar from '../NotificationSidebar/NotificationSidebar';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        onClick={toggleSidebar}
      >
        <svg
          className="fill-current duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.4749 13.7249 2.39053 13.8937 2.3062 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.27803 16.2562 2.61553 16.2562H15.3562C15.6937 16.2562 16.0312 16.0874 16.1999 15.8343C16.3687 15.553 16.3687 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.68428 13.6405V7.79053C3.68428 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.6124C14.2312 13.9499 14.3437 14.2874 14.5124 14.5687L14.7093 14.9343H3.23428V14.9905Z"
            fill=""
          />
          <path
            d="M8.9999 16.8094C9.61865 16.8094 10.237 16.4446 10.4897 15.8822C10.574 15.7135 10.4897 15.5169 10.3209 15.4607C10.1522 15.3763 9.95522 15.4607 9.89897 15.6294C9.78647 15.9669 9.36553 16.1919 8.9999 16.1919C8.6624 16.1919 8.24147 15.9669 8.10085 15.6294C8.0446 15.4607 7.84772 15.3763 7.67897 15.4607C7.51022 15.5169 7.4259 15.7135 7.51022 15.8822C7.79147 16.4446 8.38178 16.8094 8.9999 16.8094Z"
            fill=""
          />
        </svg>
      </button>
      <NotificationSidebar isOpen={isOpen} onClose={toggleSidebar} />
    </li>
  )
}

export default Sidebar