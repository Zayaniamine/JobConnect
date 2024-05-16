import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import HomeNav from './Nav';
import {Typography} from '@material-tailwind/react'
export function FeaturedCompanies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/jobSeeker/employers');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching company profiles:', error);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div>
      <HomeNav />
      <div className="my-8 text-center">
        <Typography variant="h3" color="blue-gray" className="mb-4">
          Explore Featured Companies
        </Typography>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search companies"
              required
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-cyan-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <ul  className="grid grid-cols-1  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <li
              key={index}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={company.logoCompany ? `http://localhost:4000/uploads/${company.logoCompany.split('\\').pop()}` : "https://via.placeholder.com/64"}
                  alt={company.companyName}
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">{company.companyName}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Description</dt>
                  <dd className="text-sm text-gray-500">{company.description}</dd>
                  <dt className="sr-only">Industry</dt>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {company.IndustryField}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${company.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${company.PhoneNumber}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <Typography color="gray" className="text-center col-span-full">
            No companies found.
          </Typography>
        )}
      </ul>
    </div>
  );
}

export default FeaturedCompanies;
