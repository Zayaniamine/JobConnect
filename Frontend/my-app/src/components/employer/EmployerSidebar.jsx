import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {   HiUserGroup, HiBriefcase, HiCog, HiLogin, HiClipboardList } from 'react-icons/hi';
import { Sidebar } from "flowbite-react";
import axios from 'axios'; // Correctly imported Axios for fetching data

const EmployerSidebar = () => {
  const [user, setUser] = useState({
    name: 'Loading...',
    imageUrl: 'https://via.placeholder.com/150',
    profilePath: '/profile'
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId'); // Using sessionStorage to get the userId
        const response = await axios.get(`http://localhost:4000/employer/profile/${userId}`);
        // Assuming response.data contains the expected fields
        setUser({
          name: response.data.companyName, // Setting company name
          imageUrl: `http://localhost:4000/uploads/${response.data.logoCompany.split('\\').pop()}`, // Correctly formatting the image URL
          profilePath: `/Employer/profile/${userId}` // Setting profile path
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser({
          name: 'User not found',
          imageUrl: 'https://via.placeholder.com/150',
          profilePath: '/profile'
        });
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');  // Assuming you store the token in localStorage

    try {
        // Optionally inform the server about the logout
        await axios.post('http://localhost:4000/auth/logout', { token, userId: sessionStorage.getItem('userId') });
        
        // Clear local storage or any other storage where the token is kept
        localStorage.removeItem('token');
        sessionStorage.clear(); // or sessionStorage.removeItem('userId') if you store other data in the session storage

        // Redirect or perform other actions like refreshing the page to ensure all user data is cleared
        window.location.href = '/login'; // or use your router's method if using react-router
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};

  return (
    <>
      <Sidebar className='fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-gray-50 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'>
        <Link to={user.profilePath} className="group block flex-shrink-0 pb-5">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={user.imageUrl}
                alt={user.name}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
            </div>
          </div>
        </Link>
        
        <hr />

        <Sidebar.Items className='flex pt-5'>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse icon={HiBriefcase} label="Job Offers">
              <Sidebar.Item as={Link} to="/employer/create-job-offer">Job Offer</Sidebar.Item>
              <Sidebar.Item as={Link} to="/Employer/ActiveJobs">Preview Job Offers</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item as={Link} to="/employer/Applications" icon={HiClipboardList}>Manage Applications</Sidebar.Item>
            <Sidebar.Item as={Link} to="/employer/Candidate" icon={HiUserGroup}>JobSeekers</Sidebar.Item>
            <Sidebar.Item as={Link} to="/employer/settings" icon={HiCog}>Settings</Sidebar.Item>
            <hr className='bottom-10' />
            <Sidebar.Item className="absolute bottom-5 ml-14" onClick={handleLogout}  as={Link} to="/" icon={HiLogin}>Log out</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default EmployerSidebar;
