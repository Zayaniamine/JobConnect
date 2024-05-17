import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import { LocationMarkerIcon as MapPinIcon, MailIcon as EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/solid';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function ProfileCard() {
  const [jobSeeker, setJobSeeker] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    city: '',
    photo: '',
    profileTitle: '',
    profileDescription: '',
    skills: [],
    experiences: [],
    github: '',
    linkedin: ''
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`http://localhost:4000/jobSeeker/profile/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.resume) {
          setJobSeeker({
            firstName: data.prenom || '',
            lastName: data.nom || '',
            email: data.email || data.email,
            phoneNumber: data.resume.phoneNumber || data.PhoneNumber,
            address:  data.address,
            postalCode: data.resume.postalCode || data.postalCode,
            city: data.resume.city || data.city,
            photo: `http://localhost:4000/uploads/${data.photo ? data.photo.split('\\').pop() : 'default.png'}`,
            profileTitle: data.resume.profileTitle || '',
            profileDescription: data.resume.profileDescription || '',
            skills: data.resume.skills || [],
            experiences: data.resume.experiences || [],
            github: data.github || '',
            linkedin: data.linkedin || ''
          });
        } else {
          setJobSeeker({
            firstName: data.nom || '',
            lastName: data.prenom || '',
            email: data.email || '',
            phoneNumber: data.PhoneNumber || '',
            address: data.address || '',
            postalCode: data.postalCode || '',
            city: data.city || '',
            photo: `http://localhost:4000/uploads/${data.photo ? data.photo.split('\\').pop() : 'default.png'}`,
            profileTitle: '',
            profileDescription: '',
            skills: [],
            experiences: [],
            github: data.github || '',
            linkedin: data.linkedin || ''
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Card className='w-4/12' style={{ height: 'auto' }}>
      <div className="flex flex-col justify-between p-4 text-justify">
        <div className="flex space-x-4 mb-4">
          <img
            src={jobSeeker.photo}
            alt="User"
            className="rounded-full w-14 h-14"
          />
          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg">{`${jobSeeker.firstName} ${jobSeeker.lastName}`}</span>
            <span className="text-sm text-gray-500">{jobSeeker.github}</span>

            <div className="flex space-x-2 mt-2">
            {jobSeeker.github && (
  <a href={jobSeeker.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
    <FaGithub className="h-6 w-6 text-gray-900" />
  </a>
)}
{jobSeeker.linkedin && (
  <a href={jobSeeker.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <FaLinkedin className="h-6 w-6 text-blue-700" />
  </a>
)}
            </div>
          </div>
        </div>
        <div className="mb-2 text-sm font-normal">
          <MapPinIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Location:</span> {`${jobSeeker.address}, ${jobSeeker.city}, ${jobSeeker.postalCode}`}
        </div>
        <div className="mb-2 text-sm font-normal">
          <EnvelopeIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Email:</span> {jobSeeker.email}
        </div>
        <div className="mb-2 text-sm font-normal">
          <HomeIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Address:</span> {jobSeeker.address}
        </div>
        <div className="text-sm font-normal">
          <PhoneIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Phone:</span> {jobSeeker.phoneNumber}
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm break-words">{jobSeeker.profileDescription}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <ul className="list-disc pl-5">
            {jobSeeker.skills.length > 0 ? (
              jobSeeker.skills.map((skill, index) => (
                <li key={index} className="text-sm break-words">{`${skill.skillName} - ${skill.proficiency}`}</li>
              ))
            ) : (
              <li className="text-sm">No skills listed.</li>
            )}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Experience</h2>
          {jobSeeker.experiences.length > 0 ? (
            jobSeeker.experiences.map((exp, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-sm font-semibold">{exp.jobTitle} at {exp.employer}</h3>
                <p className="text-sm break-words">{exp.city}, {exp.country}</p>
                <p className="text-sm break-words">{new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}</p>
                <p className="text-sm break-words">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">No experience listed.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
