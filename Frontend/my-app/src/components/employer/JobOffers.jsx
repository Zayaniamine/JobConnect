import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon as EllipsisVerticalIcon } from '@heroicons/react/solid';
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import CreateJobForm from '../forms/Createjob';
import JobPostsModal from './JobPosts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function JobOffers() {
  const [jobOffers, setJobOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [jobPostsModalVisible, setJobPostsModalVisible] = useState(false);
  const [selectedJobOfferId, setSelectedJobOfferId] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/jobs');
        const today = new Date();
        setJobOffers(response.data.map(job => ({
          ...job,
          clotureOffre: new Date(job.clotureOffre).toLocaleDateString(),
          dateDeCreation: new Date(job.dateDeCreation).toLocaleDateString(),
          disponibilite: new Date(job.clotureOffre) >= today && new Date(job.dateDeCreation) <= today,
        })));
      } catch (error) {
        console.error('Failed to fetch job offers:', error);
        setJobOffers([]);
      }
    };
    fetchJobOffers();
  }, []);

  const toggleForm = (index = null) => {
    setIsModalOpen(!isModalOpen);
    setEditIndex(index);
  };

  const addJobOffer = (jobOffer) => {
    const formattedJobOffer = {
      ...jobOffer,
      clotureOffre: new Date(jobOffer.clotureOffre).toLocaleDateString(),
      dateDeCreation: new Date(jobOffer.dateDeCreation).toLocaleDateString(),
      disponibilite: new Date(jobOffer.clotureOffre) >= new Date() && new Date(jobOffer.dateDeCreation) <= new Date(),
    };
    const updatedOffers = [...jobOffers];
    if (editIndex !== null) {
      updatedOffers[editIndex] = formattedJobOffer;
    } else {
      updatedOffers.push(formattedJobOffer);
    }
    setJobOffers(updatedOffers);
    toggleForm();
    displayToast(editIndex !== null ? 'Job offer updated successfully.' : 'Job offer added successfully.', 'success');
  };

  const removeJobOffer = async (index) => {
    const job = jobOffers[index];
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${job._id}`);
      const updatedOffers = [...jobOffers];
      updatedOffers.splice(index, 1);
      setJobOffers(updatedOffers);
      displayToast('Job offer deleted successfully.', 'success');
    } catch (error) {
      console.error('Failed to delete job offer:', error);
      displayToast('Failed to delete job offer.', 'error');
    }
  };

  const displayToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const showPostsModal = (jobOffer) => {
    setSelectedJobOfferId(jobOffer._id);
    setSelectedPosts(jobOffer.posts);
    setJobPostsModalVisible(true);
  };

  const closePostsModal = () => {
    setJobPostsModalVisible(false);
  };

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Job Postings</h3>
        <button onClick={() => toggleForm()} className="mt-3 inline-flex items-center rounded-md text-cyan-700 bg-white ring-1 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-gray-50">
          Create New Job Offer
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {jobOffers.map((offer, index) => (
          <li key={offer._id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{offer.titre}</p>
                <p className={`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${offer.disponibilite ? 'text-green-700 bg-green-50 ring-green-600/20' : 'text-red-700 bg-red-50 ring-red-600/20'}`}>
                  {offer.disponibilite ? 'Active' : 'Closed'}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  Created on <time dateTime={offer.dateDeCreation}>{offer.dateDeCreation}</time>
                </p>
                <p className="whitespace-nowrap">
                  Closing date: <time dateTime={offer.clotureOffre}>{offer.clotureOffre}</time>
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={() => showPostsModal(offer)}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View Posts
              </button>
              <Menu as="div" className="relative">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/10 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => toggleForm(index)}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => removeJobOffer(index)}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
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
      {toast.show && (
        <Toast className='fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toast.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
            {toast.type === 'success' ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
          </div>
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
          <Toast.Toggle />
        </Toast>
      )}
      {isModalOpen && (
        <CreateJobForm
          isOpen={isModalOpen}
          onClose={() => toggleForm()}
          onSave={addJobOffer}
          initialData={editIndex !== null ? jobOffers[editIndex] : undefined}
        />
      )}
      {jobPostsModalVisible && (
        <JobPostsModal
          post={selectedPosts}
          onClose={closePostsModal}
          jobOfferId={selectedJobOfferId}
        />
      )}
    </div>

  );
}

export default JobOffers;
