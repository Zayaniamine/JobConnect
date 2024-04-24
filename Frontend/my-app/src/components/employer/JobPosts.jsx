import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPositionForm from '../forms/JobPost';

function JobPostsModal({ jobOfferId, onClose }) {
    const [posts, setPosts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);

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
    
        // Initial fetch and fetch after every operation
        useEffect(() => {
            fetchJobs();
        }, [jobOfferId]);

    const handleAdd = async() => {
        setCurrentJob(null);
        setIsFormOpen(true);
        await fetchJobs();
    };

    const handleEdit = async(job) => {
        setCurrentJob(job);
        setIsFormOpen(true);
        await fetchJobs();
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:4000/api/jobs/${jobOfferId}/posts/${postId}`);
            setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
        } catch (error) {
            console.error('Failed to delete post:', error);
            // Optionally handle UI feedback on failure
        }
    };

    const handleSave = async (job) => {
        setIsFormOpen(false);
        if (currentJob) {
            setPosts(prevPosts => prevPosts.map(p => p._id === job._id ? job : p));
        } else {
            setPosts(prevPosts => [...prevPosts, job]);
        }
        await fetchJobs();
    };

    if (!jobOfferId) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-lg max-w-1lg  overflow-auto p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Job Positions</h2>
                <button onClick={handleAdd} className="mb-4 absolute right-5 top-5 bg-cyan-700 rounded-lg hover:bg-cyan-800 text-white font-bold py-2 px-4">
                    Add Job Position
                </button>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">jobType</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map(post => (
                            <tr key={post._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.content}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.skills.join(',')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.jobType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.dateDeCreation).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.clotureOffre).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(post)} className="text-cyan-700 hover:text-cyan-800 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-900 ">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                        Close
                    </button>
                </div>
                {isFormOpen && (
                    <JobPositionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} jobPosition={currentJob} jobOfferId={jobOfferId} />
                )}
            </div>
        </div>
    );
}

export default JobPostsModal;
