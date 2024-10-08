import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SuccessfullyProps {
  message: string;
  duration?: number;
}

const Successfully: React.FC<SuccessfullyProps> = ({ message, duration = 3 }) => {
  const [countdown, setCountdown] = useState(duration);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-[100px] right-5 z-50">
      <div className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-t-4 border-green-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] shrink-0 fill-green-500 inline mr-3" viewBox="0 0 512 512">
          <ellipse cx="246" cy="246" data-original="#000" rx="246" ry="246" />
          <path className="fill-white"
            d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
            data-original="#000" />
        </svg>
        <span className="text-sm font-semibold tracking-wide">{message}</span>
        <span className="ml-2 text-xs text-gray-500">({countdown}s)</span>
        <button onClick={() => setVisible(false)} className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const showSuccessfully = (message: string, duration?: number) => {
  const containerElement = document.createElement('div');
  document.body.appendChild(containerElement);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(containerElement);
    containerElement.remove();
  };

  ReactDOM.render(
    <Successfully message={message} duration={duration} />,
    containerElement
  );

  setTimeout(handleClose, (duration || 3) * 1000);
};

export default Successfully;
