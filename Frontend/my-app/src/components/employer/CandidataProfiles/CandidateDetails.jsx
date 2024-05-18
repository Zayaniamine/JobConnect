import React, { useEffect, useState } from 'react';

export default function CandidateDetails({ userId }) {
  const [jobSeeker, setJobSeeker] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    photo: '',
    profileTitle: '',
    profileDescription: '',
    skills: [],
    experiences: [],
    education: [],
    languages: [],
    interests: []
  });

  useEffect(() => {
    fetch(`http://localhost:4000/jobSeeker/profile/${userId}`)
      .then(response => response.json())
      .then(data => setJobSeeker({
        firstName: data.nom || data.firstName,
        lastName: data.prenom || data.lastName,
        email: data.email,
        phoneNumber: data.PhoneNumber,
        address: data.address,
        photo: `http://localhost:4000/uploads/${data.photo ? data.photo.split('\\').pop() : 'default.png'}`, // Assuming a default image
        profileTitle: data.resume ? data.resume.profileTitle : '',
        profileDescription: data.resume ? data.resume.profileDescription : '',
        skills: data.resume ? data.resume.skills || [] : [],
        experiences: data.resume ? data.resume.experiences || [] : [],
        education: data.resume ? data.resume.education || [] : [],
        languages: data.resume ? data.resume.languages || [] : [],
        interests: data.resume ? data.resume.interests || [] : []
      }))
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const viewPDF = () => {
    fetch(`http://localhost:4000/jobSeeker/fetch-pdf/${userId}`)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Resume-${userId}.pdf`); // Naming the file uniquely per user
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up after download
    })
      .catch(error => console.error('Error fetching PDF:', error));
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg w-[70%]">
      <div className="px-4 py-6 sm:px-6 flex justify-between items-center">
        <div className='w-[80%]'>
          <h3 className="text-base font-semibold leading-7 text-gray-900">Candidate Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 ">{jobSeeker.profileDescription}</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={viewPDF} 
            className="px-4 py-2 bg-white text-black  rounded-md   hover:bg-gray-100"
          >
            View CV as PDF
          </button>
         
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {Object.entries(jobSeeker).filter(([key]) => key !== 'photo').map(([key, value], index) => (
            <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {Array.isArray(value) ? (
                  <ul className="list-disc pl-5">
                    {value.map((item, i) => (
                      <li key={i} className="text-sm">
                        {Object.entries(item).map(([itemKey, itemValue]) => (
                          <div key={itemKey}>
                            <strong className="capitalize">{itemKey.replace(/([A-Z])/g, ' $1').trim()}:</strong> {itemValue}
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
