import {React ,useEffect,useState}from 'react'
import axios from 'axios';
import { Card, } from "flowbite-react";

function ActivJob() {
    const [jobOffers,setJobOffers]=useState([])

    useEffect(() => {
        const fetchJobOffers = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/jobs');
            if (response.data && Array.isArray(response.data)) {
              setJobOffers(response.data.map(job => ({
                ...job,
                clotureOffre: new Date(job.clotureOffre).toLocaleDateString(),
              })));
            } else {
              setJobOffers([]); // Ensure it's always an array
            }
          } catch (error) {
            console.error('Failed to fetch job offers:', error);
            setJobOffers([]); // Set to empty array on error
          }
        };
        fetchJobOffers();
      }, []);



  return (
    <>
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between  ">
    <h3 className="text-lg font-semibold text-gray-900">Active Offers</h3>
    
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 pt-5">
    {jobOffers.length > 0 ? jobOffers.map((offer, index) => (
      <Card key={offer._id} className="relative hover:shadow-lg ">
        <span className={`absolute top-2 right-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${offer.disponibilite ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'}`}>
          {offer.disponibilite ? 'Active' : 'Closed'}
        </span>
        <span className='absolute top-2 right-14 mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue- text-blue-700 ring-1 ring-inset ring-blue-600/20'>
              {offer.jobType}
            </span>
        <div className="p-5">
          <h5 className="text-xl font-bold tracking-tight text-gray-900">
            {offer.titre}
          </h5>
          <p className="font-normal text-gray-700 my-2">
            {offer.description}
          </p>
          <div className="mt-3">
            {offer.skills && offer.skills.map((skills, idx) => (
              <span key={idx} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {skills}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Closing date: {offer.clotureOffre}
          </p>
        </div>
       
      </Card>
    )) : <p>No Job Offers Available</p>}
  </div>
  </>
  )
}

export default ActivJob