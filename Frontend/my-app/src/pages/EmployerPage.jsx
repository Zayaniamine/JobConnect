import React, { useState } from 'react';
import Sidebar from '../components/employer/EmployerSidebar';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/employer/Header';
import Joboffers from '../components/employer/JobOffers';
import ActivJob from '../components/employer/ActivJob';
import Applications from '../components/employer/Applications';
import ProfilePage from '../components/employer/Profile/ProfilePage';
import EditCompanyProfile from '../components/employer/Profile/EditCompanyProfile';

function EmployerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle the sidebar state
  };
  const userId = sessionStorage.getItem('userId');

  return (
    <>
      <div className="flex ">
        <Header toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <Sidebar />} 
      </div>
      
      <div className={`ml-${(isSidebarOpen) ? '64' : '0'} flex-1`}> 

        <div className="   p-6 mt-10 overflow-auto">
          
          <Routes>
            <Route path="/settings" element={<EditCompanyProfile/>} />
            <Route path={`/profile/${userId}`} element={<ProfilePage />} />
            <Route path="/create-job-offer" element={<Joboffers />} />
            <Route path="/ActiveJobs" element={<ActivJob />} />
            <Route path="/Applications" element={<Applications />} />
            {/* Define other nested routes for employer section */}
          </Routes>
        </div>
        </div>
      
    </>
  );
}

export default EmployerPage;