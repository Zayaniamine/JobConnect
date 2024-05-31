import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircleIcon, EyeIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

function JobOffers() {
    const [jobOffers, setJobOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('all');
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [filters] = useState({
        companyName: '',
        title: '',
        address: '',
    });

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const jobSeekerId = sessionStorage.getItem('userId');
                const userResponse = await axios.get(`http://localhost:4000/JobSeeker/profile/${jobSeekerId}`);
                const userIndustryField = userResponse.data.IndustryField;

                const response = await axios.get(`http://localhost:4000/api/jobs`);
                const jobOffersData = await Promise.all(response.data.map(async job => {
                    const userId = job.employerId;
                    const employerResponse = await axios.get(`http://localhost:4000/JobSeeker/employers/${userId}`);
                    const employerData = employerResponse.data;
                    const photoUrl = employerData.logoCompany
                        ? `http://localhost:4000/uploads/${employerData.logoCompany.split('\\').pop()}`
                        : "https://via.placeholder.com/64";
                    const address = employerData.address;
                    const employer = employerData.companyName;

                    const matchingScoreResponse = await axios.post(`http://localhost:4000/JobSeeker/matching-score/${job._id}/${jobSeekerId}`);
                    const matchingScore = matchingScoreResponse.data.overallMatchingScore;

                    return {
                        ...job,
                        title: job.titre || 'No Title Provided',
                        imageUrl: photoUrl,
                        employerId: job.employerId,
                        address: address,
                        companyName: employer,
                        matchingScore: matchingScore,
                        industryField: job.IndustryField
                    };
                }));

                const matchingIndustryOffers = jobOffersData.filter(job => job.industryField === userIndustryField);
                const otherOffers = jobOffersData.filter(job => job.industryField !== userIndustryField);

                const sortedOffers = [...matchingIndustryOffers, ...otherOffers].sort((a, b) => b.matchingScore - a.matchingScore);
                setJobOffers(sortedOffers);
                setFilteredOffers(sortedOffers);
            } catch (error) {
                console.error('Failed to fetch job offers:', error);
                setJobOffers([]);
                setFilteredOffers([]);
            }
        };
        fetchJobOffers();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let updatedOffers = jobOffers;

            if (searchTerm) {
                updatedOffers = updatedOffers.filter(offer =>
                    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    offer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (filters.companyName) {
                updatedOffers = updatedOffers.filter(offer =>
                    offer.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
                );
            }

            if (filters.title) {
                updatedOffers = updatedOffers.filter(offer =>
                    offer.title.toLowerCase().includes(filters.title.toLowerCase())
                );
            }

            if (filters.address) {
                updatedOffers = updatedOffers.filter(offer =>
                    offer.address.toLowerCase().includes(filters.address.toLowerCase())
                );
            }

            setFilteredOffers(updatedOffers);
        };

        applyFilters();
    }, [searchTerm, filters, jobOffers]);

    const handleSelectFieldChange = (e) => {
        setSelectedField(e.target.value);
    };

    return (
        <>
            <div className="p-4">
                <div className="relative flex space-x-4">
                    <select
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        value={selectedField}
                        onChange={handleSelectFieldChange}
                    >
                        <option value="all">All fields</option>
                        <option value="companyName">Company Name</option>
                        <option value="title">Job Title</option>
                        <option value="address">Address</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Search by ${selectedField === 'all' ? 'All fields' : selectedField}`}
                        className="border-0 rounded p-2 w-full bg-gray-100 border-gray-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {filteredOffers.map((offer) => (
                    <li key={offer._id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="p-4 text-xs text-gray-500">
                            <div className="flex gap-4 justify-center mb-1">
                                <span className="text-xs font-medium text-[#314476] dark:text-white">Profile matching</span>
                                <span className="text-xs font-medium text-[#314476] dark:text-white">{offer.matchingScore}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-1 dark:bg-gray-700 w-4/12 items-center mx-auto">
                                <div className="bg-[#314476] h-1 rounded-full" style={{ width: `${offer.matchingScore}%` }}></div>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <h2 className="truncate text-l font-semibold text-gray-900">{offer.companyName}</h2>
                                <h3 className="truncate text-sm font-normal text-gray-900">{offer.title}</h3>
                                <p className="mt-1 text-sm text-gray-500">{offer.description}</p>
                            </div>
                            <img className="flex-shrink-0 rounded-full bg-gray-300" src={offer.imageUrl} width={80} height={100} alt="Employer" />
                        </div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <Link to={`/JobSeeker/Employer/profile-page/${offer.employerId}`} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                    <UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Company profile
                                </Link>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <Link to={`/JobSeeker/view-job-offers/job-posts/${offer._id}`} className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                    <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Details
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 text-xs text-gray-500 flex items-center">
                            <span> Created on: {new Date(offer.dateDeCreation).toLocaleDateString()}</span> |
                            <span className='pr-12'> Closing Date: {new Date(offer.clotureOffre).toLocaleDateString()}</span>
                            <LocationMarkerIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>{offer.address} </span>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default JobOffers;
