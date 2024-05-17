import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {  CheckCircleIcon, XCircleIcon, BriefcaseIcon, CalendarIcon,ZoomInIcon,OfficeBuildingIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function JobPostsCard() {
    const { jobOfferId } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/jobs/${jobOfferId}/posts`);
                setPosts(response.data.map(post => ({
                    ...post,
                    clotureOffre: new Date(post.clotureOffre).toLocaleDateString(),
                    disponibilite: new Date(post.clotureOffre) >= new Date()
                })));
            } catch (error) {
                console.error('Failed to fetch job posts:', error);
                setPosts([]);
            }
        };
        fetchJobs();
    }, [jobOfferId]);
    const handleApply = (postId) => {
        navigate(`/JobSeeker/view-job-offers/job-posts/${ jobOfferId }/apply/${postId}`);
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-6">
                {posts.map(post => (
                    <div key={post._id} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 relative">
                        <div className="flex justify-between items-center px-4 py-5 sm:px-6 border-b">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{post.title}</h3>
                            <button onClick={() => handleApply(post._id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#212e53] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Apply
                            </button>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-1.5" aria-hidden="true" />
                                Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post.content}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <ZoomInIcon className="h-5 w-5 text-gray-400 mr-1.5" aria-hidden="true" />
                                Skills 
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post.skills}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <OfficeBuildingIcon className="h-5 w-5 text-gray-400 mr-1.5" aria-hidden="true" />
                                JobType
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post.jobType}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-1.5" aria-hidden="true" />
                                Status
                            </dt>
                            <dd className={`mt-1 text-sm ${post.disponibilite ? 'text-green-800' : 'text-red-800'} sm:col-span-2 flex items-center`}>
                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${post.disponibilite ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {post.disponibilite ? 'Active' : 'Closed'}
                                </span>
                                {post.disponibilite ? <CheckCircleIcon className="ml-2 h-5 w-5 text-green-500" /> : <XCircleIcon className="ml-2 h-5 w-5 text-red-500" />}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                <CalendarIcon className="h-5 w-5 text-gray-400 mr-1.5" aria-hidden="true" />
                                Closing Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post.clotureOffre}</dd>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobPostsCard;
