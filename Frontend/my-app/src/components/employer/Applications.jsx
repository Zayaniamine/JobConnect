import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';

function Applications() {
    const [applications, setApplications] = useState([]);
    const employerId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/application/get-applications/employer/${employerId}`);
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        if (employerId) {
            fetchApplications();
        } else {
            console.error('Employer ID is missing, please log in again.');
        }
    }, [employerId]);

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await axios.put(`http://localhost:4000/application/${newStatus}/${applicationId}`);
            setApplications(applications.map(app =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            console.error(`Error updating application status to ${newStatus}:`, error);
        }
    };

    const handleReject = applicationId => handleStatusChange(applicationId, 'rejected');
    const handleAccept = applicationId => handleStatusChange(applicationId, 'accepted');
    const handleArchive = applicationId => handleStatusChange(applicationId, 'archived');

    return (
        <div className="space-y-8 h-screen">
            <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between pt-2">
                <h3 className="text-lg font-semibold text-gray-900">Manage Applications </h3>
            </div>
            <div className="space-y-6 ">
                {applications.map(application => (
                    <div key={application._id} className="md:flex md:items-center md:justify-between md:space-x-5 bg-white p-4 rounded-lg shadow">
                        <div className="flex items-start space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        className="h-16 w-16 rounded-full"
                                        src={`http://localhost:4000/uploads/${application.jobSeekerId.photo}`}
                                        alt="Applicant"
                                    />
                                    <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="pt-1.5">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    <Link to={`/employer/JobSeeker/profile-page/${application.jobSeekerId._id}`}>
                                        {application.firstName} {application.lastName}
                                    </Link>
                                </h1>
                                <p className="text-xs font-small text-gray-500">
                                    Applied for{' '}
                                    <span className="text-gray-900">
                                        {application.postDetails ? application.postDetails.title : 'Job title not specified'}
                                    </span>{' '}
                                    on <time dateTime={new Date(application.appliedOn).toISOString()}>{new Date(application.appliedOn).toLocaleDateString()}</time>
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <DotsVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleAccept(application._id)}
                                                    className={`${active ? 'bg-indigo-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
                                                >
                                                    Advance to Offer
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleReject(application._id)}
                                                    className={`${active ? 'bg-red-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
                                                >
                                                    Disqualify
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => handleArchive(application._id)}
                                                    className={`${active ? 'bg-yellow-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
                                                >
                                                    Archive
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { window.location.href = `/employer/Applications/application-details/${application._id}` }} // Adjust according to your routing setup
                                                    className={`${active ? 'bg-green-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
                                                >
                                                    View Details
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Applications;
