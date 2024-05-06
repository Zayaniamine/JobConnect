import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card} from 'flowbite-react';

function JobPostsCard({ jobOfferId, onClose }) {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-lg max-w-2xl max-h-[calc(100vh-4rem)] overflow-auto p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Positions</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {posts.map(post => (
                        <Card key={post._id} className="max-w-sm">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900">{post.title}</h5>
                            <p className="font-normal text-gray-700">{post.content}</p>
                            <div className="mt-4">
                                <button className="mt-3 inline-flex items-center rounded-md text-cyan-700 bg-white ring-1 ring-cyan-800 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-gray-50 "onClick={() => alert('Feature to apply for the job is not implemented')}>
                                    Apply
                                </button>
                            </div>
                            <div className="flex items-center mt-4">
                                <span className="text-sm text-gray-500 mr-2">Job Type:</span>
                                <span className='px-2 py-1 rounded-md text-xs font-semibold  bg-white text-blue-800'>
                                    {post.jobType}
                                </span>
                                <span className="ml-4 text-sm text-gray-500 mr-2">Status:</span>
                                <span className={` rounded-md  px-2 py-1 text-xs font-medium    ${post.disponibilite ? 'bg-white text-green-800' : 'bg-white text-red-800'}`}>
                                    {post.disponibilite ? 'Active' : 'Closed'}
                                </span>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">Closing Date:</span>
                                <span className="text-sm text-gray-900">{post.clotureOffre}</span>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-white ring-1 ring-red-500 hover:bg-gray-50 text-red-500 font-semibold py-2 px-4 rounded-lg">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobPostsCard;
