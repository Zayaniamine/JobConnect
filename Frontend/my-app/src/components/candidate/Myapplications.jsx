import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const userId = sessionStorage.getItem('userId');
    const statuses = {
        'in progress': 'text-blue-700 bg-blue-50 ring-blue-600/20',
        accepted: 'text-green-700 bg-green-50 ring-green-600/20',
        rejected: 'text-red-700 bg-red-50 ring-red-600/20',
    };

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

    return (
        <ul className="divide-y divide-gray-100">
            {applications.map((app) => (
                <li key={app._id} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{app.postDetails?.title || 'No title'}</p>
                            <p className={`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statuses[app.status]}`}>
                                {app.status}
                            </p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                            <p>Applied on <time dateTime={app.appliedOn}>{new Date(app.appliedOn).toLocaleDateString()}</time></p>
                        </div>
                    </div>
                    <Link to={`/JobSeeker/job-applications/application-details/${app._id}`}               
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
>View details</Link>
                </li>
            ))}
        </ul>
    );
}

export default MyApplications;
