import React from 'react';
import ReactDOM from 'react-dom';
import Successfully from '../Dashboard/Notification/Successfully'
import Error from '../Dashboard/Notification/Error'
import Check from '../Dashboard/Notification/Check'
import Warning from '../Dashboard/Notification/Warning'
import { showYesNoProduct } from './Notification/YesNoProduct';

function Test() {
  const createNotification = (NotificationComponent) => {
    const notificationRoot = document.createElement('div');
    document.body.appendChild(notificationRoot);
    ReactDOM.render(<NotificationComponent />, notificationRoot);

    // Remove the notification after it's no longer visible
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(notificationRoot);
      notificationRoot.remove();
    }, 3000); // Adjust this timeout to match your notification duration
  };

  const handleSuccessClick = () => createNotification(Successfully);
  const handleErrorClick = () => createNotification(Error);
  const handleCheckClick = () => createNotification(Check);
  const handleWarningClick = () => createNotification(Warning);

  const handleYesNoClick = () => {
    showYesNoProduct(
      "Do you want to proceed?",
      () => console.log("User clicked Yes"),
      () => console.log("User clicked No")
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSuccessClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Show Success
      </button>
      <button
        onClick={handleErrorClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Show Error
      </button>
      <button
        onClick={handleCheckClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Show Check
      </button>
      <button
        onClick={handleWarningClick}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Show Warning
      </button>
      <button
        onClick={handleYesNoClick}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Yes/No
      </button>
    </div>
  );
}

export default Test;
