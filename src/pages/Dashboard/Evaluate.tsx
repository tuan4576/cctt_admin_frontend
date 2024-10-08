
import React from 'react';

const Evaluate: React.FC = () => {
  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-700 whitespace-nowrap">
          <tr>
            <th className="pl-4 w-8">
              <input id="checkbox" type="checkbox" className="hidden peer" />
              <label htmlFor="checkbox"
                className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              STT
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              User Image
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Name
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Email
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Product Image
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Product
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Rating
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Evaluation Date
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Comment
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Reply
            </th>
            <th className="p-4 text-left text-sm font-medium text-black">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          <tr className="even:bg-blue-50">
            <td className="pl-4 w-8">
              <input id="checkbox1" type="checkbox" className="hidden peer" />
              <label htmlFor="checkbox1"
                className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </td>
            <td className="p-4 text-sm text-black">
              1
            </td>
            <td className="p-4">
              <img src="https://example.com/user-image.jpg" alt="John Doe" className="w-10 h-10 rounded-full" />
            </td>
            <td className="p-4 text-sm text-black">
              John Doe
            </td>
            <td className="p-4 text-sm text-black">
              john@example.com
            </td>
            <td className="p-4">
              <img src="https://example.com/product-a-image.jpg" alt="Product A" className="w-10 h-10 rounded-full" />
            </td>
            <td className="p-4 text-sm text-black">
              Product A
            </td>
            <td className="p-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                    fill={star <= 4 ? "#facc15" : "#CED5D8"} />
                </svg>
              ))}
            </td>
            <td className="p-4 text-sm text-black">
              2023-06-15
            </td>
            <td className="p-4 text-sm text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-blue-500" viewBox="0 0 24 24">
                <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a1 1 0 0 0 0-.8ZM12 18c-3.17 0-6.17-2.29-7.9-6C5.83 8.29 8.83 6 12 6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6Zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"/>
              </svg>
            </td>
            <td className="p-4 text-sm text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-blue-500" viewBox="0 0 24 24">
                <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a1 1 0 0 0 0-.8ZM12 18c-3.17 0-6.17-2.29-7.9-6C5.83 8.29 8.83 6 12 6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6Zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"/>
              </svg>
            </td>
            <td className="p-4">
              <button className="mr-2" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                  <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
                </svg>
              </button>
              <button className="mr-2" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                  <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
                  <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
                </svg>
              </button>
              <button title="View">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 24 24">
                  <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a1 1 0 0 0 0-.8ZM12 18c-3.17 0-6.17-2.29-7.9-6C5.83 8.29 8.83 6 12 6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6Zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"/>
                </svg>
              </button>
            </td>
          </tr>
          {/* End of row block */}
        </tbody>
      </table>
      <div className="md:flex m-4">
    <p className="text-sm text-gray-500 flex-1">Showind 1 to 5 of 100 entries</p>
    <div className="flex items-center max-md:mt-4">
      <p className="text-sm text-gray-500">Display</p>
      <select className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none">
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
      <ul className="flex space-x-1 ml-2">
        <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
            <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" data-original="#000000" />
          </svg>
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
          1
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded">
          2
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
          3
        </li>
        <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
          4
        </li>
        <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
            <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" data-original="#000000" />
          </svg>
        </li>
      </ul>
    </div>
  </div>
    </div>
    
  );
};

export default Evaluate;

