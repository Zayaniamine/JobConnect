import React, { useState } from 'react';
import Sidebar from '../components/employer/EmployerSidebar';
import { Route, Routes } from 'react-router-dom';
import Profile from '../components/employer/Profile';
import Header from '../components/employer/Header';
import Joboffers from '../components/employer/JobOffers';
import ActivJob from '../components/employer/ActivJob';
import Applications from '../components/employer/Applications';
import ProfileCard from '../components/employer/Profile/ProfileCard';
import ProfilePage from '../components/employer/Profile/ProfilePage';

function EmployerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle the sidebar state
  };

  return (
    <>
      <div className="flex ">
        <Header toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <Sidebar />} 
      </div>
      
      <div className={`ml-${!(isSidebarOpen) ? '64' : '0'} flex-1`}> 

        <div className="  ml-64 p-6 mt-10 overflow-auto">
          
          <Routes>
            <Route path="/settings" element={<Profile />} />
            <Route path="/profile" element={<ProfilePage />} />
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