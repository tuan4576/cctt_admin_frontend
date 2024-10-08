import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface CheckProps {
  message: string;
  duration?: number;
}

const Check: React.FC<CheckProps> = ({ message, duration = 3 }) => {
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
      <div className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-t-4 border-blue-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] shrink-0 fill-blue-500 inline mr-3" viewBox="0 0 23.625 23.625">
          <path
            d="M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548a3.838 3.838 0 0 1-1.262.189c-.736 0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 .147-.759l.761-2.688c.067-.258.125-.503.171-.731.046-.23.068-.441.068-.633 0-.342-.071-.582-.212-.717-.143-.135-.412-.201-.813-.201-.196 0-.398.029-.605.09-.205.063-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521a4.225 4.225 0 0 1 1.29-.218c.731 0 1.295.178 1.692.53.395.353.594.812.594 1.376 0 .117-.014.323-.041.617a4.129 4.129 0 0 1-.152.811l-.757 2.68a7.582 7.582 0 0 0-.167.736 3.892 3.892 0 0 0-.073.626c0 .356.079.599.239.728.158.129.435.194.827.194.185 0 .392-.033.626-.097.232-.064.4-.121.506-.17l-.203.827zm-.134-10.878a1.807 1.807 0 0 1-1.275.492c-.496 0-.924-.164-1.28-.492a1.57 1.57 0 0 1-.533-1.193c0-.465.18-.865.533-1.196a1.812 1.812 0 0 1 1.28-.497c.497 0 .923.165 1.275.497.353.331.53.731.53 1.196 0 .467-.177.865-.53 1.193z"
            data-original="#030104"
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

export const showCheck = (message: string, duration?: number) => {
  const containerElement = document.createElement('div');
  document.body.appendChild(containerElement);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(containerElement);
    containerElement.remove();
  };

  ReactDOM.render(
    <Check message={message} duration={duration} />,
    containerElement
  );

  setTimeout(handleClose, (duration || 3) * 1000);
};

export default Check;
