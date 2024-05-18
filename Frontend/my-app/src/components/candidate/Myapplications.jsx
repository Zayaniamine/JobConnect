import React, { useState, Fragment,useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { ExclamationIcon, MenuAlt3Icon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentApplicationId, setCurrentApplicationId] = useState(null);
    const cancelButtonRef = useRef(null);
    const userId = sessionStorage.getItem('userId');
    const statuses = {
        'in progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
        accepted: 'text-green-700 bg-green-50 ring-green-600/20',
        rejected: 'text-red-700 bg-red-50 ring-red-600/20',
        archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    };
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/application/get-applications/jobSeeker/${userId}`);
                setApplications(data);
            } catch (error) {
                console.error('Failed to fetch applications:', error);
            }
        };
        fetchApplications();
    }, [userId]);

    const deleteApplication = async (appId) => {
        try {
            await axios.delete(`http://localhost:4000/application/delete-applications/${appId}`);
            setApplications(prev => prev.filter(app => app._id !== appId));
            setOpen(false);  // Close the confirmation dialog
           /* alert('Application deleted successfully!');*/
        } catch (error) {
            console.error('Failed to delete application:', error);
            alert('Failed to delete application.');
        }
    };

    const openDeleteDialog = (appId) => {
        setCurrentApplicationId(appId);
        setOpen(true);
    };
    const handleEdit = (jobOfferId, postId) => {
        
        navigate(`/JobSeeker/view-job-offers/job-posts/${jobOfferId}/apply/${postId}`);
    };

    return (
        <>
           <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
            <ul className="divide-y divide-gray-100 h-screen">
                {applications.map((app) => (
                    <li key={app._id} className="flex items-center justify-between px-6 py-5">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-x-3">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{app.postDetails ? app.postDetails.title : 'Job title not specified'}</p>
                                <p className={`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statuses[app.status]}`}>
                                    {app.status}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <p>Applied on <time dateTime={app.appliedOn}>{new Date(app.appliedOn).toLocaleDateString()}</time></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <Link to={`/JobSeeker/job-applications/application-details/${app._id}`} className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                                View details
                            </Link>
                            <Menu as="div" className="relative">
                                <Menu.Button className="p-2 text-gray-500 hover:text-gray-900">
                                    <MenuAlt3Icon className="h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={() => handleEdit(app.jobOfferId._id, app.postId)} className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                                Edit
                                            </button>
                                        )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button onClick={() => openDeleteDialog(app._id)} className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                                    Delete
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Confirmation dialog */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Delete Application
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete this application? This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => deleteApplication(currentApplicationId)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                            ref={cancelButtonRef}
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default MyApplications;
