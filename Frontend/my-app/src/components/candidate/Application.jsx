import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DocumentTextIcon, PaperClipIcon } from '@heroicons/react/solid';
import { useParams, useNavigate } from 'react-router-dom';

function ApplicationForm() {
    const { jobOfferId, postId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobOfferId: '',
        postId: '',
        firstName: '',
        lastName: '',
        email: '',
        salaryExpectations: '',
        coverLetter: '',
        motivationLetterFile: null,
        resumeFile: null
    });

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:4000/jobSeeker/profile/${userId}`)
                .then(response => {
                    const { data } = response;
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        jobOfferId, // setting jobOfferId from URL parameters
                        postId,  // setting jobPostId from URL parameters
                        firstName: data.prenom || '',
                        lastName: data.nom || '',
                        email: data.email || '',
                        jobSeekerId: userId // Adding jobSeekerId from session storage
                    }));
                })
                .catch(error => console.error('Failed to fetch data:', error));
        }
    }, [jobOfferId, postId]);

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setFormData(prevFormData => ({ ...prevFormData, [name]: files[0] }));
        } else {
            setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const applicationData = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] != null) {
                applicationData.append(key, formData[key]);
            }
            for (let key of applicationData.keys()) {
                console.log(key, applicationData.get(key));
            }
        });

        try {
            const response = await axios.post('http://localhost:4000/application/create-application', applicationData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Submission result:', response.data);
            alert('Application submitted successfully!');
            navigate('/JobSeeker/success-page'); // Redirect after successful submission
        } catch (error) {
            console.error('Failed to submit application:', error);
            alert('Failed to submit application.');
        }
    };
    return (
        <form className="space-y-8 divide-y divide-gray-300" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-300 sm:space-y-5">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Job Application</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Please fill in the information to apply for the job.
                    </p>
                </div>
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            First name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Last name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Email
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="salary-expectations" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Salary Expectations
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="salary-expectations"
                                name="salaryExpectations"
                                type="text"
                                autoComplete="salary"
                                value={formData.salaryExpectations}
                                onChange={handleInputChange}
                                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Cover Letter
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                id="cover-letter"
                                name="coverLetter"
                                rows={3}
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            />
                            <p className="mt-2 text-sm text-gray-500">Write a brief cover letter explaining why you are a good fit for this job.</p>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="motivationLetterFile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Motivation Letter (optional)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input
                                        id="motivationLetterFile"
                                        name="motivationLetterFile"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleInputChange}
                                    />
                                    <PaperClipIcon className="h-5 w-5 text-gray-400" />
                                </label>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Attach your motivation letter. (PDF, DOCX up to 10MB)</p>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Resume
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="resumeFile"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PDF, DOCX up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#212e53] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ApplicationForm;
