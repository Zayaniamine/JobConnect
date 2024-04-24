import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon, EyeIcon } from '@heroicons/react/solid'

import JobPostsCard from './jobPostCard';

function JobOffers() {
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedJobOffer, setSelectedJobOffer] = useState(null);

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/jobs');
                const jobOffersData = await Promise.all(response.data.map(async job => {
                    const postsResponse = await axios.get(`http://localhost:4000/api/jobs/${job._id}/posts`);
                    return {
                        ...job,
                        title: job.titre || 'No Title Provided',
                        role: job.role || 'No Role Provided',
                        contactEmail: job.contactEmail || 'info@company.com',
                        imageUrl: job.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdgh5eRjKNuYygD_THH147G3V3yJYnVwUJkWKupfDpQ&s',
                        jobType: job.jobType || 'Not specified',
                        createdOn: new Date(job.createdOn || Date.now()).toLocaleDateString(),
                        clotureOffre: new Date(job.clotureOffre || Date.now()).toLocaleDateString(),
                        disponibilite: job.disponibilite !== undefined ? job.disponibilite : 'Unknown',
                        posts: postsResponse.data || []
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

    const handleViewJobPosts = (jobOfferId) => {
        setSelectedJobOffer(jobOfferId);
    };

    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {jobOffers.map((offer) => (
                    <li key={offer._id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        {/* Job Offer Card Content */}
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{offer.title}</h3>
                                    <span className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${offer.disponibilite ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} ring-1 ring-inset ring-${offer.disponibilite ? 'green' : 'red'}-600/20`}>
                                        {offer.disponibilite ? 'Active' : 'Closed'}
                                    </span>
                                  
                                </div>
                                <p className="mt-1 truncate text-sm text-gray-500">{offer.description}</p>
                                <div className="flex flex-wrap">
                                    {offer.posts.map(post => (
                                        <span key={post._id} className="m-1 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-cyan-900">
                                            {post.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <img className=" flex-shrink-0 rounded-full bg-gray-300"  src={offer.imageUrl} width={80} height={100} alt="" />
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <a
                                        
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Company profile
                                    </a>
                                </div>
                                <div className="-ml-px flex w-0 flex-1">
                                    <button
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        onClick={() => handleViewJobPosts(offer._id)} // Open modal when clicked
                                    >
                                        <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Details
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 text-xs text-gray-500">
                                Created on: {offer.createdOn} | Closing Date: {offer.clotureOffre}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Render JobPostsModal if a job offer is selected */}
            {selectedJobOffer && (
                <JobPostsCard
                    jobOfferId={selectedJobOffer}
                    onClose={() => setSelectedJobOffer(null)}
                />
            )}
        </>
    );
}

export default JobOffers;
