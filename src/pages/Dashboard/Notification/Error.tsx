import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ErrorProps {
  message: string;
  duration?: number;
}

const Error: React.FC<ErrorProps> = ({ message, duration = 3 }) => {
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
      <div className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-t-4 border-red-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] shrink-0 fill-red-500 inline mr-3" viewBox="0 0 32 32">
          <path
            d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm6.36 20L21 22.36l-5-4.95-4.95 4.95L9.64 21l4.95-5-4.95-4.95 1.41-1.41L16 14.59l5-4.95 1.41 1.41-5 4.95z"
            data-original="#ea2d3f"
          />
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

export const showError = (message: string, duration?: number) => {
  const containerElement = document.createElement('div');
  document.body.appendChild(containerElement);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(containerElement);
    containerElement.remove();
  };

  ReactDOM.render(
    <Error message={message} duration={duration} />,
    containerElement
  );

  setTimeout(handleClose, (duration || 3) * 1000);
};

export default Error;
