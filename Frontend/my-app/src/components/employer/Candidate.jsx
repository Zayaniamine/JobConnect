import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { MenuAlt3Icon} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CandidateProfiles() {
  const [candidateProfiles, setCandidateProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidateProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Employer/JobSeekers');
        setCandidateProfiles(response.data);
      } catch (error) {
        console.error('Error fetching candidate profiles:', error);
      }
    };

    fetchCandidateProfiles();
  }, []);

  const handleViewProfile = (candidateId) => {
    navigate(`/employer/JobSeeker/profile-page/${candidateId}`);
  };

  const handleSendEmail = (email) => {
    const subject = encodeURIComponent('Job Opportunity');
    const body = encodeURIComponent('Hello,\n\nI would like to discuss a job opportunity with you.');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <ul  className="divide-y divide-gray-100">
      {candidateProfiles.map((candidate) => (
        <li key={candidate._id} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={candidate.photo ? `http://localhost:4000/uploads/${candidate.photo.split('\\').pop()}` : "https://via.placeholder.com/64"}
              alt={candidate.firstName}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                
                  {`${candidate.prenom} ${candidate.nom}`}
            
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${candidate.email}`} className="truncate hover:underline">
                  {candidate.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{candidate.jobTitle}</p>
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
                        onClick={() => handleViewProfile(candidate._id)}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block w-full px-3 py-1 text-sm leading-6 text-gray-900 text-left'
                        )}
                      >
                        View profile<span className="sr-only">, {candidate.nom}</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleSendEmail(candidate.email)}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block w-full px-3 py-1 text-sm leading-6 text-gray-900 text-left'
                        )}
                      >
                        Message<span className="sr-only">, {candidate.nom}</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
