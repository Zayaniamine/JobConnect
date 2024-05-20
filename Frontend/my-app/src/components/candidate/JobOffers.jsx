import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon, EyeIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

function JobOffers() {
    const [jobOffers, setJobOffers] = useState([]);

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/jobs`);
                const jobOffersData = await Promise.all(response.data.map(async job => {
                    const userId = job.employerId;
                    const employerResponse = await axios.get(`http://localhost:4000/JobSeeker/employers/${userId}`);
                    const employerData = employerResponse.data;
                    const photoUrl = employerData.logoCompany ?
                        `http://localhost:4000/uploads/${employerData.logoCompany.split('\\').pop()}` :
                        "https://via.placeholder.com/64";
                    const address = employerData.address;
                    const employer = employerData.companyName;

                    // Retrieve job seeker ID from session storage
                    const jobSeekerId = sessionStorage.getItem('userId');

                    // Calculate matching score
                    const matchingScoreResponse = await axios.post(`http://localhost:4000/JobSeeker/matching-score/${ job._id}/${jobSeekerId}`);
                        
                       
                   

                    return {
                        ...job,
                        title: job.titre || 'No Title Provided',
                        imageUrl: photoUrl,
                        employerId: job.employerId,
                        address: address,
                        companyName: employer,
                        matchingScore: matchingScoreResponse.data.matchingScore // Update to correctly access the matchingScore value
                    };
                }));
                setJobOffers(jobOffersData);
            } catch (error) {
                console.error('Failed to fetch job offers:', error);
                setJobOffers([]);
            }
        };
        fetchJobOffers();
    }, []);

    return (
        <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {jobOffers.map((offer) => (
                    <li key={offer._id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                         <div className="p-4 text-xs text-gray-500">
   

                    <div class="flex gap-4 justify-center mb-1  ">
  <span className="text-xs  font-medium text-[#314476] dark:text-white">Profile matching</span>
  <span className="text-xs  font-medium text-[#314476] dark:text-white">{offer.matchingScore}%</span>
</div>
<div className=" bg-gray-200 rounded-full h-1 dark:bg-gray-700 w-4/12 items-center mx-auto">
  <div className={` bg-[#314476] w-${offer.matchingScore }%]  h-1 rounded-full `} style={{ "width": `${offer.matchingScore}%`}} ></div>
</div>
</div>
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            
                            <div className="flex-1 truncate">
                                
                                <h2 className="truncate text-l font-semibold text-gray-900">{offer.companyName}</h2>
                                <h3 className="truncate text-sm font-normal text-gray-900">{offer.title}</h3>
                                <p className="mt-1 text-sm text-gray-500">{offer.description}</p>
                            </div>
                            <img className="flex-shrink-0 rounded-full bg-gray-300" src={offer.imageUrl} width={80} height={100} alt="Employer" />
                        </div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <Link to={`/JobSeeker/Employer/profile-page/${offer.employerId}`} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                    <UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Company profile
                                </Link>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <Link to={`/JobSeeker/view-job-offers/job-posts/${offer._id}`} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                    <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Details
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 text-xs text-gray-500 flex items-center">
                            <span> Created on: {new Date(offer.dateDeCreation).toLocaleDateString()}</span> |
                            <span className='pr-12'> Closing Date: {new Date(offer.clotureOffre).toLocaleDateString()}</span>
                            <LocationMarkerIcon className="h-5  w-5 text-gray-400 " aria-hidden="true" />
                            <span >{offer.address} </span>
                        </div>
                       
                    </li>
                ))}
            </ul>
        </>
    );
}

export default JobOffers;
