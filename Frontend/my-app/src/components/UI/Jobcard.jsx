import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function Jobcard({ title, description, link }) {
  return (
    <div className="pt-16 pl-10" style={{ width: '350px', height: '400px' }}>
      <div className="max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        {/* Replace <a> tag with Link component */}
        <Link to={link}>
          <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </Link>
        <div className="p-5">
          {/* Replace <a> tag with Link component */} 
          <Link to={link}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
          {/* Replace <a> tag with Link component */}
          <Link to={link} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Apply
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Jobcard;
