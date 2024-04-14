import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiChartPie, HiViewBoards,  HiUserGroup, HiBriefcase, HiCog, HiLogin, HiClipboardList } from 'react-icons/hi';
import { Sidebar } from "flowbite-react";

const EmployerSidebar = () => {


  const [user, setUser] = useState({
    name: 'Loading...',
    imageUrl: 'https://via.placeholder.com/150',
    profilePath: '/profile'
  });



  useEffect(() => {
    // Simulate fetching user data from a database
    const fetchUserData = async () => {
      // Here you would replace this with an actual API call
      // For example: const response = await fetch('/api/user');
      // const data = await response.json();
      const data = {
        name: 'Tom Cook',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        profilePath: '/Employer/profile'
      };
      setUser(data);
    };

    fetchUserData();
  }, []);
  return (
    <>
  
    <Sidebar  className='fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-gray-50 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'>
    <Link to={user.profilePath} className="group block flex-shrink-0 pb-5 m">
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
        
    <hr></hr>
      
      
      <Sidebar.Items className='flex pt-5'>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/employer/settings" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          
          
          <Sidebar.Collapse icon={HiBriefcase} label="Job Offers">
        <Sidebar.Item as={Link} to="/employer/create-job-offer">
          Create Job Offer
        </Sidebar.Item>
        <Sidebar.Item as={Link} to="/job-offers/active">
          Active Offers
        </Sidebar.Item>
      
        <Sidebar.Item as={Link} to="/job-offers/stats">
          Job Offer list
        </Sidebar.Item>
      </Sidebar.Collapse>
         
          <Sidebar.Item as={Link} to="/employer/settings" icon={HiClipboardList}>
            Manage Applications
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/employer/settings" icon={HiUserGroup} >
            Candidate Selection
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/employer/settings" icon={HiViewBoards}>
            Analytics
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/employer/settings" icon={HiCog}>
            Settings
          </Sidebar.Item>
          <hr className=' bottom-10' />
          <Sidebar.Item  className="absolute bottom-5 ml-14" as={Link} to="" icon={HiLogin}> 
          
            Log out
          </Sidebar.Item>
      
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </>
  );
};

export default EmployerSidebar;
