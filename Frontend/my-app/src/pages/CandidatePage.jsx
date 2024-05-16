import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/candidate/SideBar'; // Ensure this is the correct import
import Header from '../components/candidate/Header'; // Should be a candidate-specific header if needed
import ViewJobOffers from '../components/candidate/JobOffers'; // Correct component to view job offers
import CreateCV from '../components/candidate/CreateCV'; // Component for creating CVs
import MyApplications from '../components/candidate/Myapplications'; // Component to view applications
import CompanyProfiles from '../components/candidate/CompanyProfiles'; // Component to view company profiles
import ProfilePage from '../components/candidate/Profile/ProfilePage'; // Ensure this is for the candidate
import EditCandidate from '../components/candidate/Profile/EditCandidate';
import EmployerProfiles from '../components/candidate/EmployerProfile/ProfilePage';
import JobPostsCard from '../components/candidate/jobPostCard';
function CandidatePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const userId = sessionStorage.getItem('userId');

  return (
    <>
      <div className="flex">
        <Header toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <Sidebar />} 
      </div>
      
      <div className='flex-1'> 
        <div className={`ml-${isSidebarOpen ? '64' : '0'}  p-6 mt-10 overflow-auto`}>
          <Routes>
            <Route path={`/profile/${userId}`} element={<ProfilePage />} />
            <Route path="/view-job-offers" element={<ViewJobOffers />} />
            <Route path="/create-cv" element={<CreateCV />} />
            <Route path="/job-applications" element={<MyApplications />} />
            <Route path="/company-profiles" element={<CompanyProfiles />} />
            <Route path="/settings" element={<EditCandidate/>} />
            <Route path="/Employer/profile-page/:userId" element={<EmployerProfiles />} />
            <Route path="/view-job-offers/job-posts/:jobOfferId" element={<JobPostsCard/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default CandidatePage;
