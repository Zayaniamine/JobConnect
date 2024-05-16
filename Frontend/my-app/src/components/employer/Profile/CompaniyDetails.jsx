import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Example() {
  const [company, setCompany] = useState({
    name: '',
    description: '',
    email: '',
    address: '',
    PhoneNumber: '',
    logoCompany: '',
    socialMediaURL: '',
    urlSiteWeb: '',
    IndustryField: '',
    attachments: [] // Assuming there might be attachments to handle
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`http://localhost:4000/employer/profile/${userId}`)
      .then(response => response.json())
      .then(data => setCompany({
        name: data.companyName,
        description: data.description,
        sector: data.IndustryField,
        email: data.email,
        address: data.address,
        PhoneNumber: data.PhoneNumber,
       
        socialMediaURL: data.socialMediaURL,
        urlSiteWeb: data.urlSiteWeb,
      }))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="relative overflow-hidden bg-white shadow sm:rounded-lg w-[100%]">
      <div className="px-4 py-6 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">Company Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{company.description}</p>
        </div>
        <Link 
          to="/employer/settings" 
          className="px-4 py-2 bg-[#212e53] text-white rounded ring-2 ring-[#212e53] hover:bg-gray-800"
        >
          Edit Profile
        </Link>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {Object.entries(company).filter(([key, value]) => key !== 'attachments').map(([key, value], index) => (
            <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 capitalize">{key}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
