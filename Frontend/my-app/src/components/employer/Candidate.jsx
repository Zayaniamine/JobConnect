import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
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

  const handleCall = (telephone) => {
    window.location.href = `tel:${telephone}`;
  };

  return (
    <ul  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {candidateProfiles.map((candidate) => (
        <li
          key={candidate._id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col   p-8">
          <button
                        onClick={() => handleViewProfile(candidate._id)}
                        className="block w-full px-3 py-1 text-sm leading-6 text-gray-900 text-left"
                        
                      >
                       
                     
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src={
                candidate.photo
                  ? `http://localhost:4000/uploads/${candidate.photo.split('\\').pop()}`
                  : "https://via.placeholder.com/64"
              }
              alt={candidate.firstName}
            />
            
            <h3 className="mt-6 text-sm  text-center font-medium text-gray-900">{`${candidate.prenom} ${candidate.nom}`}</h3>
            <p className="mt-1 text-sm text-center text-gray-500">{candidate.jobTitle}</p>
            </button>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button
                  onClick={() => handleSendEmail(candidate.email)}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Email
                </button>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <button
                  onClick={() => handleCall(candidate.PhoneNumber)}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
