import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPositionForm from '../forms/JobPost';  // Make sure this form component is correctly set up to handle creation and editing of job posts.

function JobPostsModal({ jobOfferId, onClose }) {
    const [posts, setPosts] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/jobs/${jobOfferId}/posts`);
                setPosts(response.data.map(post => ({
                    ...post,
                    dateDeCreation: new Date(post.dateDeCreation).toLocaleDateString(),
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

    const handleAdd = () => {
        setCurrentJob(null);
        setIsFormOpen(true);
    };

    const handleEdit = (job) => {
        setCurrentJob(job);
        setIsFormOpen(true);
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:4000/api/jobs/${jobOfferId}/posts/${postId}`);
            setPosts(prev => prev.filter(p => p._id !== postId));
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const handleSave = (job) => {
        setIsFormOpen(false);
        const updatedJob = {
            ...job,
            dateDeCreation: new Date(job.dateDeCreation).toLocaleDateString(),
            clotureOffre: new Date(job.clotureOffre).toLocaleDateString(),
            disponibilite: new Date(job.clotureOffre) >= new Date()
        };
        setPosts(prev => prev.map(p => p._id === job._id ? updatedJob : p));
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-lg max-w-1lg  overflow-auto p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Job Positions</h2>
                <button onClick={handleAdd} className="mb-4 absolute right-5 top-5 rounded-md bg-white ring-1 ring-cyan-700 hover:bg-gray- text-cyan-800 font-normal py-2 px-4">
                    Add Job Position
                </button>
                <table className="min-w-full  divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map(post => (
                            <tr key={post._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.content}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.skills.join(', ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.jobType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.dateDeCreation}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.clotureOffre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.disponibilite ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {post.disponibilite ? 'Active' : 'Closed'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(post)} className="text-cyan-800 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="rounded-md bg-white ring-1 ring-red-500 hover:bg-red-700 text-red-500 font-bold py-2 px-4">
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
