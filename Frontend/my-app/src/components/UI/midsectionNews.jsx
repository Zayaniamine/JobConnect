import React, { useState } from 'react';
import LatestNews from './LatestNews.jsx'; // Assume you have this component
import JobTrends from './JobTrends'; // Assume you have this component
import CareerGrowth from './CareerGrowth'; // Assume you have this component

function MidsectionNews() {
  const [activeSection, setActiveSection] = useState('');

  const renderSection = () => {
    switch (activeSection) {
      case 'LatestNews':
        return <LatestNews />;
      case 'JobTrends':
        return <JobTrends />;
      case 'CareerGrowth':
        return <CareerGrowth />;
      default:
        return <div>Select a category to see more information</div>;
    }
  };

  return (
    <div className='flex flex-col items-center justify-center pt-5'>
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li onClick={() => setActiveSection('LatestNews')}><a>Latest News</a></li>
        <li onClick={() => setActiveSection('JobTrends')}><a>Job trends</a></li>
        <li onClick={() => setActiveSection('CareerGrowth')}><a>Career Growth</a></li>
      </ul>
      <div className="content mt-5">
        {renderSection()}
      </div>
    </div>
  );
}

export default MidsectionNews;
