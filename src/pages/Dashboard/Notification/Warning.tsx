import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface WarningProps {
  message: string;
  duration?: number;
}

const Warning: React.FC<WarningProps> = ({ message, duration = 3 }) => {
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
      <div className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-t-4 border-yellow-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] shrink-0 fill-yellow-500 inline mr-3" viewBox="0 0 128 128">
          <path
            d="M56.463 14.337 6.9 106.644C4.1 111.861 8.173 118 14.437 118h99.126c6.264 0 10.338-6.139 7.537-11.356L71.537 14.337c-3.106-5.783-11.968-5.783-15.074 0z" />
          <g className="fill-white">
            <path
              d="M64 31.726a5.418 5.418 0 0 0-5.5 5.45l1.017 44.289A4.422 4.422 0 0 0 64 85.726a4.422 4.422 0 0 0 4.482-4.261L69.5 37.176a5.418 5.418 0 0 0-5.5-5.45z"
              data-original="#fff" />
            <circle cx="64" cy="100.222" r="6" data-original="#fff" />
          </g>
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

export const showWarning = (message: string, duration?: number) => {
  const containerElement = document.createElement('div');
  document.body.appendChild(containerElement);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(containerElement);
    containerElement.remove();
  };

  ReactDOM.render(
    <Warning message={message} duration={duration} />,
    containerElement
  );

  setTimeout(handleClose, (duration || 3) * 1000);
};

export default Warning;
