import React from 'react'
import ProfileCard from './ProfileCard'
import CandidateDetails from './CandidateDetails'

function ProfilePage() {
  return (
    <div className='flex items-start space-x-4 ml-5 p-4'>
   <ProfileCard  /> 
   <CandidateDetails/>
   

    
    
    </div>
  )
}

export default ProfilePage