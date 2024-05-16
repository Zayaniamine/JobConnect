import React from 'react';
import { Card, Button } from "flowbite-react";
import { Link } from 'react-router-dom'; // Ensure you have routing setup

function JobCard({ id, title, description, skills, clotureOffre, disponibilite, link }) {
  return (
    
    <Card className="max-w-sm mb-4 relative hover:shadow-lg mt-20 ">
      <div className=" ">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white pb-5 ">
          {title || 'No Title'}
          
        </h5>
        <Button>
          <Link to={'/login'} className="inline-flex items-center pt">
            Apply
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </Link>
        </Button>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
       
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description || 'No Description Available'}
        </p>
      
        <p className="text-sm text-gray-600">
          Closing date: {clotureOffre ? new Date(clotureOffre).toLocaleDateString() : 'No Closing Date'}
        </p>
       
      </div>
      <div className={`absolute top-2 right-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${disponibilite ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'}`}>
        {disponibilite ? 'Active' : 'Closed'}
      </div>
    </Card>
  );
}

export default JobCard;
