import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stat() {
  const [jobPostings, setJobPostings] = useState(0);
  const [newCandidates, setNewCandidates] = useState(1200);  // Sample starting number
  const [totalEmployers, setTotalEmployers] = useState(300); // Sample starting number

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/jobs/count');
        setJobPostings(data.count); // assuming the endpoint returns an object with a count property
      } catch (error) {
        console.error('Failed to fetch job postings:', error);
      }
    };

    fetchJobPostings();
  }, []);

  const stats = [
    {
      id: 1,
      name: 'Total Job Postings',
      value: jobPostings,
      desc: 'As of today'
    },
    {
      id: 2,
      name: 'New Candidates',
      value: newCandidates,
      desc: `↗︎ ${Math.floor((newCandidates - 1000) / 1000 * 100)}%`
    },
    {
      id: 3,
      name: 'Total Employers',
      value: totalEmployers,
      desc: `↗︎ ${Math.floor((totalEmployers - 100) / 100 * 100)}%`
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Platform Statistics
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Overview of active engagement and participation
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-lg text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-50 p-8 shadow-md">
                <dt className="text-sm font-semibold text-gray-600">{stat.name}</dt>
                <dd className="order-first text-4xl font-extrabold text-gray-900">{stat.value}</dd>
                <dd className="mt-2 text-base text-gray-500">{stat.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Stat;
