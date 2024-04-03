import React from 'react';

function Stat({ jobPostings=0, newCandidates=0, totalEmployers=0 }) {
  return (
    <div className='flex items-center justify-center  ' >*
      <div className=" stats stats-vertical lg:stats-horizontal shadow w-8/12 pt-5">
        <div className="stat">
          <div className="stat-title">Total Job Postings</div>
          <div className="stat-value">{jobPostings}</div>
          <div className="stat-desc">As of March 2024</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Candidates</div>
          <div className="stat-value">{newCandidates}</div>
          <div className="stat-desc">↗︎ {Math.floor((newCandidates - 1000) / 1000 * 100)}%</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Employers</div>
          <div className="stat-value">{totalEmployers}</div>
          <div className="stat-desc">↗︎ {Math.floor((totalEmployers - 100) / 100 * 100)}%</div>
        </div>
      </div>
    </div>
  );
}

export default Stat;
