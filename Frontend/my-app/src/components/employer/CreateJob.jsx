import React, { useState } from 'react';
import CreateJob from '../forms/Createjob'; // Ensure this is the path to your modal component

function Joboffers() {
  const [jobOffers, setJobOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addJobOffer = (jobOffer) => {
    setJobOffers([...jobOffers, jobOffer]);
  };

  const removeJobOffer = (index) => {
    const updatedOffers = [...jobOffers];
    updatedOffers.splice(index, 1);
    setJobOffers(updatedOffers);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
        <button
          onClick={toggleModal}
          className="mt-3 inline-flex items-center rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800"
        >
          Create New Job Position
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {jobOffers.map((offer, index) => (
          <div key={index} className={`mt-3 relative border p-4 rounded-lg shadow ${new Date(offer.closingDate) >= new Date() ? 'bg-green-100' : 'bg-red-100'}`}>
            <h5 className="text-xl font-bold">{offer.title}</h5>
            <p>{offer.description}</p>
            <ul>
              {offer.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
            </ul>
            <p>Closing date: {new Date(offer.closingDate).toLocaleDateString()}</p>
            {/* Badge indicating active or closed status */}
            <span className={`absolute top-2 right-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium  ${new Date(offer.closingDate) >= new Date() ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'}`}>
              {new Date(offer.closingDate) >= new Date() ? 'Active' : 'Closed'}
            </span>
            <button
              onClick={() => removeJobOffer(index)}
              className="px-2 py-2 mt-2 bg-red-500 text-white text-sm rounded-full hover:bg-red-700"
            >
              Remove Job
            </button>
          </div>
        ))}
      </div>
      <CreateJob isOpen={isModalOpen} onClose={toggleModal} onSave={addJobOffer} />
    </div>
  );
}

export default Joboffers;
