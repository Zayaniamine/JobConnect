import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiTemplate, HiSearchCircle, HiUserCircle, HiDocumentReport, HiLogin,HiCog } from 'react-icons/hi';
import { Sidebar } from "flowbite-react";
import axios from 'axios';

const CandidateSidebar = () => {
  const [user, setUser] = useState({
    name: 'Loading...',
    imageUrl: 'https://via.placeholder.com/150',
    profilePath: '/JobSeeker/profile'
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    axios.get(`http://localhost:4000/JobSeeker/profile/${userId}`)
      .then(response => setUser({
        name: (response.data.prenom +" "+ response.data.nom),
        imageUrl: `http://localhost:4000/uploads/${response.data.photo.split('\\').pop()}`,
        profilePath: `/JobSeeker/profile/${userId}`
      }))
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUser({ name: 'User not found', imageUrl: 'https://via.placeholder.com/150', profilePath: '/JobSeeker/profile' });
      });
  }, []);

  const handleLogout = () => {
    // Assuming logout clears the local session and redirects to login
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Sidebar className='fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-gray-50 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'>
      <Link to={user.profilePath} className="group block flex-shrink-0 pb-5">
        <div className="flex items-center">
          <img className="inline-block h-9 w-9 rounded-full" src={user.imageUrl} alt={user.name} />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
          </div>
        </div>
      </Link>
      
      <hr />

      <Sidebar.Items className='flex pt-5'>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/JobSeeker/view-job-offers" icon={HiSearchCircle}>View Job Offers</Sidebar.Item>
          <Sidebar.Item as={Link} to="/JobSeeker/create-cv" icon={HiTemplate}>Create CV</Sidebar.Item>
          <Sidebar.Item as={Link} to="/JobSeeker/job-applications" icon={HiDocumentReport}>My Applications</Sidebar.Item>
          <Sidebar.Item as={Link} to="/JobSeeker/company-profiles" icon={HiUserCircle}>Company Profiles</Sidebar.Item>
          <Sidebar.Item as={Link} to="/JobSeeker/settings" icon={HiCog}>Settings</Sidebar.Item>

          <hr className='bottom-10' />
          
          <Sidebar.Item className="absolute bottom-5 ml-14" as={Link} to="/login" onClick={handleLogout} icon={HiLogin}>Log out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CandidateSidebar;
