import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { MailIcon, } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

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
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProfiles.map((employer) => (
          <li
            key={employer._id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={employer.logoCompany ? `http://localhost:4000/uploads/${employer.logoCompany.split('\\').pop()}` : "https://via.placeholder.com/64"}
                alt={employer.companyName}
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{employer.companyName}</h3>
              <p className="mt-1 text-sm text-gray-500">{employer.IndustryField}</p>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    onClick={() => handleViewProfile(employer._id)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <MenuAlt3Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    View Profile
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`mailto:${employer.email}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
