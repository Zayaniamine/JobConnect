import React from 'react';
import { Card } from "flowbite-react";
import { UserIcon, LocationMarkerIcon as MapPinIcon, MailIcon as EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/solid';

function ProfileCard() {
  // Assuming company information structure
  const company = {
    name: 'Jese Leos',
    sector: 'Technology', // Changed 'Sector' to 'sector' to match JavaScript naming conventions
    location: 'San Francisco, USA',
    email: 'yourname@flowbite.com',
    address: '92 Miles Drive, Newark, NJ 07103, California, United States of America',
    phone: '+00 123 456 789 / +12 345 678',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdgh5eRjKNuYygD_THH147G3V3yJYnVwUJkWKupfDpQ&s', // Place your actual logo path here
  };

  return (
    <Card className='w-4/12' style={{ height: 'auto' }}> {/* Changed fixed height to 'auto' for dynamic height */}
      <div className="flex flex-col justify-between p-4">
        <div className="flex space-x-4 mb-4"> {/* Added mb-4 for spacing */}
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
