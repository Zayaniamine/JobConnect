import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon, EyeIcon } from '@heroicons/react/solid';
import JobPostsCard from './jobPostCard';
import { Link } from 'react-router-dom';
function JobOffers() {
    const [jobOffers, setJobOffers] = useState([]);
    const [selectedJobOffer, setSelectedJobOffer] = useState(null);

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    console.error('No user ID found in sessionStorage');
                    return;
                }

                // Fetch employer profile
                const user = await fetch(`http://localhost:4000/employer/profile/${userId}`);
                const profileData = await user.json();

                // Assuming employer's photo URL is stored similarly to logo
                const photoUrl = `http://localhost:4000/uploads/${profileData.logoCompany.split('\\').pop()}`;

                const response = await axios.get('http://localhost:4000/api/jobs');
                const jobOffersData = await Promise.all(response.data.map(async job => {
                    const postsResponse = await axios.get(`http://localhost:4000/api/jobs/${job._id}/posts`);
                    const today = new Date();
                    const createdOn = new Date(job.dateDeCreation);
                    const clotureOffre = new Date(job.clotureOffre);
                    return {
                        ...job,
                        title: job.titre || 'No Title Provided',
                        
                        contactEmail: profileData.email || 'info@company.com',
                        imageUrl: photoUrl, // Use employer's photo URL
                        jobType: job.jobType || 'Not specified',
                        createdOn: createdOn.toLocaleDateString(),
                        clotureOffre: clotureOffre.toLocaleDateString(),
                        disponibilite: today >= createdOn && today <= clotureOffre, // Determine if the offer is active
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
            <ul  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 ">
                {jobOffers.map((offer) => (
                    <li key={offer._id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{offer.title}</h3>
                                    <span className={`inline-flex flex-shrink-0 items-center  rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ${offer.disponibilite ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} ring-1 ring-inset ring-${offer.disponibilite ? 'green' : 'red'}-600/20`}>
                                        {offer.disponibilite ? 'Active' : 'Closed'}
                                    </span>
                                </div>
                                <p className="mt-1 text-wrap truncate text-sm text-gray-500">{offer.description}</p>
                                <div className="flex flex-wrap">
                                    {offer.posts.map(post => (
                                        <span key={post._id} className="m-1 inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-cyan-900">
                                            {post.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <img className="flex-shrink-0 rounded-full bg-gray-300" src={offer.imageUrl} width={80} height={100} alt="Employer" />
                        </div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <Link to="#" onClick={(e) => { e.preventDefault(); handleViewJobPosts(offer._id); }} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                    <UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Company profile
                                </Link>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900" onClick={() => handleViewJobPosts(offer._id)}>
                                    <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Details
                                </button>
                            </div>
                        </div>
                        <div className="p-4 text-xs text-gray-500">
                            Created on: {offer.createdOn} | Closing Date: {offer.clotureOffre}
                        </div>
                    </li>
                ))}
            </ul>
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
