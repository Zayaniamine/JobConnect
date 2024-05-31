import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CandidateDetails() {
  const [jobSeeker, setJobSeeker] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    IndustryField:'',
    photo: '',
    jobTitle: '',
    profileDescription: '',
    skills: [],
    experiences: [],
    education: [],
    languages: [],
    interests: []
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`http://localhost:4000/jobSeeker/profile/${userId}`)
      .then(response => response.json())
      .then(data => setJobSeeker({
        firstName: data.nom || data.firstName,
        lastName: data.prenom || data.lastName,
        email: data.email,
        phoneNumber: data.PhoneNumber,
        address: data.address,
        IndustryField:data.IndustryField,
        photo: `http://localhost:4000/uploads/${data.photo ? data.photo.split('\\').pop() : 'default.png'}`, // Assuming a default image
        jobTitle: data.jobTitle ? data.jobTitle : data.resume.profileTitle,
        profileDescription: data.resume ? data.resume.profileDescription : '',
        skills: data.resume ? data.resume.skills || [] : [],
        experiences: data.resume ? data.resume.experiences || [] : [],
        education: data.resume ? data.resume.education || [] : [],
        languages: data.resume ? data.resume.languages || [] : [],
        interests: data.resume ? data.resume.interests || [] : []
      }))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const viewPDF = () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        console.error("User ID not found in session storage.");
        return;
    }

    fetch(`http://localhost:4000/jobSeeker/fetch-pdf/${userId}`, {
        responseType: 'blob'
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Resume-${userId}.pdf`); // Naming the file uniquely per user
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url); // Clean up static resources
    })
    .catch(error => console.error('Error fetching PDF:', error));
};
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg w-[70%]">
      <div className="px-4 py-6 sm:px-6 flex justify-between items-center">
        <div >
          <h3 className="text-base font-semibold leading-7 text-gray-900">Candidate Information</h3>
        </div>
        <div className="flex space-x-4 ">
          <button 
            onClick={viewPDF} 
            className="px-4 py-2 bg-white text-black  rounded-md  hover:bg-gray-100"
          >
            View CV as PDF
          </button>
          <Link 
            to="/JobSeeker/settings" 
            className="px-4 py-2 bg-[#212e53] text-white rounded ring-2 ring-[#212e53] hover:bg-gray-800"
          >
            Edit Profile
          </Link>
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
