import React from 'react';
import ProfileCard from './ProfileCard';
import CandidateDetails from './CandidateDetails';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { userId } = useParams();

  return (
    <div className='flex items-start space-x-4 ml-5 p-4'>
      <ProfileCard userId={userId} />
      <CandidateDetails userId={userId} />
    </div>
  );
}

export default ProfilePage;
