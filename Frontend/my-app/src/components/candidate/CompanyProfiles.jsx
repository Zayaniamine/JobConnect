import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { MenuAlt3Icon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EmployerProfiles() {
  const [employerProfiles, setEmployerProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployerProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/jobSeeker/employers');
        // Ensure each profile has all necessary fields
        const profiles = response.data.map((profile) => ({
          ...profile,
          companyName: profile.companyName || '',
          IndustryField: profile.IndustryField || ''
        }));
        setEmployerProfiles(profiles);
      } catch (error) {
        console.error('Error fetching employer profiles:', error);
      }
    };
  
    fetchEmployerProfiles();
  }, []);
  
  const handleViewProfile = (employerId) => {
    navigate(`/JobSeeker/Employer/profile-page/${employerId}`);
  };

  const filteredProfiles = employerProfiles.filter(
    (employer) =>
      (employer.companyName && employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employer.IndustryField && employer.IndustryField.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or industry..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <ul className="divide-y divide-gray-100">
        {filteredProfiles.map((employer) => (
          <li key={employer._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={employer.logoCompany ? `http://localhost:4000/uploads/${employer.logoCompany.split('\\').pop()}` : "https://via.placeholder.com/64"}
                alt={employer.companyName}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {employer.companyName}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {employer.IndustryField}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{employer.companyName}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">{employer.email}</p>
              </div>
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <MenuAlt3Icon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleViewProfile(employer._id)}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          View profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`mailto:${employer.email}`}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Email<span className="sr-only">, {employer.companyName}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
