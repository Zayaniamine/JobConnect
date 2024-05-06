import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import { LocationMarkerIcon as MapPinIcon, MailIcon as EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/solid';

function ProfileCard() {
  const [company, setCompany] = useState({
    name: '',
    sector: '',
    location: '',
    email: '',
    address: '',
    phone: '',
    logoUrl: ''
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    fetch(`http://localhost:4000/employer/profile/${userId}`)
      .then(response => response.json())
      .then(data => setCompany({
        name: data.companyName,
        sector: data.IndustryField,
        description: data.description,
        location: data.address,
        email: data.email,
        address: data.address,
        phone: data.PhoneNumber,
        logoUrl: `http://localhost:4000/uploads/${data.logoCompany.split('\\').pop()}` // Assuming Windows path in logoCompany
      }))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Card className='w-4/12' style={{ height: 'auto' }}>
      <div className="flex flex-col justify-between p-4">
        <div className="flex space-x-4 mb-4">
          <img
            src={company.logoUrl}
            alt="Company logo"
            className="rounded-full w-14 h-14"
          />
          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg">{company.name}</span>
            <span className="text-sm text-gray-500">{company.sector}</span>
          </div>
        </div>
        <div className="mb-2 text-sm font-normal">
          <MapPinIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Location:</span> {company.location}
        </div>
        <div className="mb-2 text-sm font-normal">
          <EnvelopeIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Email:</span> {company.email}
        </div>
        <div className="mb-2 text-sm font-normal">
          <HomeIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Address:</span> {company.address}
        </div>
        <div className="text-sm font-normal">
          <PhoneIcon className="h-5 w-5 inline mr-2" aria-hidden="true" />
          <span className="font-semibold">Phone:</span> {company.phone}
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
