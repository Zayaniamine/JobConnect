import React, { useEffect, useState } from 'react';

export default function CompanyDetails({ userId }) {
  const [company, setCompany] = useState({
    name: '',
    description: '',
    email: '',
    address: '',
    phoneNumber: '',
    logoCompany: '',
    socialMediaURL: '',
    urlSiteWeb: '',
    industryField: ''
  });

  useEffect(() => {
    fetch(`http://localhost:4000/employer/profile/${userId}`)
      .then(response => response.json())
      .then(data => {
        setCompany({
          name: data.companyName,
          description: data.description,
          email: data.email,
          address: data.address,
          phoneNumber: data.PhoneNumber,
          socialMediaURL: data.socialMediaURL,
          urlSiteWeb: data.urlSiteWeb,
          industryField: data.IndustryField
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  return (
    <div className="relative overflow-hidden bg-white shadow sm:rounded-lg w-full">
      <div className="px-4 py-6 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">Company Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{company.description}</p>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {Object.entries(company).map(([key, value], index) => (
            <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 capitalize">{key.split(/(?=[A-Z])/).join('')}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
