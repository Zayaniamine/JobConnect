import React, { useState } from 'react';
import ApplicantsDetails from '../candidate/Applicantsdetails'; // Ensure this component is set up to handle an `applicant` prop

function Applications() {
    const [applications, setApplications] = useState([
        {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            department: 'Optimization',
            email: 'lindsay.walton@example.com',
            role: 'Applicant',
            status: 'Pending',
            image:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        // More applications...
    ]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleAccept = email => {
        const updatedApplications = applications.map(app =>
            app.email === email ? { ...app, status: 'Accepted' } : app
        );
        setApplications(updatedApplications);
    };

    const handleReject = email => {
        const updatedApplications = applications.map(app =>
            app.email === email ? { ...app, status: 'Rejected' } : app
        );
        setApplications(updatedApplications);
    };

    const toggleDetails = applicant => {
        if (showDetails && selectedApplicant === applicant) {
            setShowDetails(false); // Hide details if currently showing for the same applicant
        } else {
            setSelectedApplicant(applicant); // Set or switch the selected applicant
            setShowDetails(true); // Show details
        }
    };

    return (
        <div>
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between pt-2">
        <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
         </div>
            <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Role
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {applications.map((application) => (
                                    <tr key={application.email}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11 rounded-full" src={application.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{application.name}</div>
                                                    <div className="mt-1 text-gray-500">{application.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">{application.title}</div>
                                            <div className="mt-1 text-gray-500">{application.department}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Active
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{application.role}</td>
                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <a href="#" className="text-cyan-700 hover:text-cyan-900">
                                                Edit<span className="sr-only">, {application.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showDetails && selectedApplicant && (
                <ApplicantsDetails applicant={selectedApplicant} />
            )}
        </div>
        </div>
    );
}

export default Applications;
