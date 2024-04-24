
import React from 'react';
import { PaperClipIcon } from '@heroicons/react/solid'

export default function Example() {
  // Company information structure
  const company = {
    name: 'Jese Leos',
    sector: 'Technology',
    location: 'San Francisco, USA',
    email: 'yourname@flowbite.com',
    address: '92 Miles Drive, Newark, NJ 07103, California, United States of America',
    phone: '+00 123 456 789 / +12 345 678',
    about: 'At Jese Leos, we are at the forefront of technological innovation. Our team is dedicated to pushing the boundaries of what is possible, striving to provide cutting-edge solutions for our clients. We are passionate about technology and its potential to change the world.',
    // You can add any attachments if necessary, like company reports or policy documents
    attachments: [
      { name: 'Company_Report_2024.pdf', size: '1.5MB' },
      { name: 'Technology_Innovation_Policy.pdf', size: '3.2MB' }
    ]
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Company Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{company.about}</p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Repeat the structure below for each piece of information you want to include */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Company Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{company.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Company Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{company.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Company Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{company.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Company Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{company.name}</dd>
          </div>
          {/* ... more details like sector, location, email, address, and phone */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {company.attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <span className="ml-4 flex min-w-0 flex-1 gap-2 truncate font-medium">{attachment.name}</span>
                      <span className="flex-shrink-0 text-gray-400">{attachment.size}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
