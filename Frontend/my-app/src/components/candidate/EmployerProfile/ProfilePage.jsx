import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import CompanyDetails from './CompanyDetails';

function ProfilePage() {
  const { userId } = useParams();

  return (
    <div className='flex items-start space-x-4 ml-5 p-4'>
      <ProfileCard userId={userId} />
      <CompanyDetails userId={userId} />
    </div>
  );
}

export default ProfilePage;
