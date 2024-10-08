import React from 'react';
import ReactDOM from 'react-dom';

interface YesNoProductProps {
  message: string;
  onYes: () => void;
  onNo: () => void;
}

const YesNoProduct: React.FC<YesNoProductProps> = ({ message, onYes, onNo }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full transform transition-all duration-300 ease-in-out hover:scale-105">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{message}</h3>
        <div className="flex justify-center space-x-6">
          <button
            onClick={onNo}
            className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform transition-all duration-200 ease-in-out hover:-translate-y-1 shadow-md"
          >
            Không
          </button>
          <button
            onClick={onYes}
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transform transition-all duration-200 ease-in-out hover:-translate-y-1 shadow-md"
          >
            Có
          </button>
        </div>
      </div>
    </div>
  );
};

export const showYesNoProduct = (message: string, onYes: () => void, onNo: () => void) => {
  const containerElement = document.createElement('div');
  document.body.appendChild(containerElement);

  const handleYes = () => {
    onYes();
    ReactDOM.unmountComponentAtNode(containerElement);
    containerElement.remove();
  };

  const handleNo = () => {
    onNo();
    ReactDOM.unmountComponentAtNode(containerElement);
    containerElement.remove();
  };

  ReactDOM.render(
    <YesNoProduct message={message} onYes={handleYes} onNo={handleNo} />,
    containerElement
  );
};

export default YesNoProduct;



