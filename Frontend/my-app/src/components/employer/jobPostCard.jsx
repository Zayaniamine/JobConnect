import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';

function JobPostsCard({ jobOfferId, onClose }) {
    const [posts, setPosts] = useState([]);

    // Function to fetch job posts
    const fetchJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/jobs/${jobOfferId}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch job posts:', error);
            setPosts([]); // Optionally handle errors differently
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchJobs();
    }, [jobOfferId]);
    const Availability = (clotureOffre) => {
        const now = new Date();
        const closing = new Date(clotureOffre);
        return closing > now;
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-lg max-w-2xl max-h-[calc(100vh-4rem)] overflow-auto p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Positions</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {posts.map(post => (
                        <Card key={post._id} className="max-w-sm">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900">
                                {post.title}
                            </h5>
                            <p className="font-normal text-gray-700">
                                {post.content}
                            </p>
                            <div className="flex items-center mt-4">
                                <span className="text-sm text-gray-500 mr-2">Job Type:</span>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${post.jobType === 'Full-time' ? 'bg-green-200 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {post.jobType}
                                </span>
                                <span className="ml-4 text-sm text-gray-500 mr-2">Status:</span>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${Availability ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {Availability ? 'Active' : 'Closed'}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-sm text-gray-500 mr-2">Closing Date:</span>
                                <span className="text-sm font-semibold">{new Date(post.clotureOffre).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-4">
                                <Button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold  rounded-lg" onClick={() => alert('Feature to apply for the job is not implemented')}>
                                    Apply
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded-lg">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default JobPostsCard;
