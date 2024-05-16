import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditCandidate() {
  const [jobSeeker, setJobSeeker] = useState({
    prenom: '',
    nom: '',
    email: '',
    PhoneNumber: '',
    address: '',
    postalCode: '',
    city: '',
    jobTitle: '',
    
    photo: null,
    imageUrl: 'https://via.placeholder.com/150',
    preferencesRecherche: [],
    resume: null,
    linkedin: '',
    github: ''
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    axios.get(`http://localhost:4000/jobSeeker/profile/${userId}`)
      .then(response => {
        const { data } = response;
        setJobSeeker(prevState => ({
          ...prevState,
          ...data,
          imageUrl: data.photo ? `http://localhost:4000/uploads/${data.photo.split('\\').pop()}` : 'https://via.placeholder.com/150'
        }));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSeeker(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJobSeeker(prev => ({
        ...prev,
        photo: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(jobSeeker).forEach(key => {
      if (key === 'photo' && jobSeeker[key] instanceof File) {
        formData.append('photo', jobSeeker[key]);
      } else if (key !== 'photo' && key !== 'imageUrl') {
        formData.append(key, jobSeeker[key]);
      }
    });

    const userId = sessionStorage.getItem('userId');
    axios.put(`http://localhost:4000/jobSeeker/update-profile/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      alert('Profile updated successfully!');
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    });
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Job Seeker Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Update your profile information. Be careful what you share as this information can be public.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
                            <img
                                src={jobSeeker.imageUrl}
                                alt=""
                                className="h-24 w-24 flex-none rounded-lg  object-cover"
                            />
                            <div>
                                <input type="file" onChange={handleFileChange} className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"/>
                                <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF, or PNG. Max 1MB</p>
                            </div>
                        </div>
              <div className="sm:col-span-3">
                <label htmlFor="prenom" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <input type="text" name="prenom" id="prenom" value={jobSeeker.prenom} onChange={handleChange} placeholder="Enter your first name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <input type="text" name="nom" id="nom" value={jobSeeker.nom} onChange={handleChange} placeholder="Enter your last name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <input type="email" name="email" id="email" value={jobSeeker.email} onChange={handleChange} placeholder="Enter your email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="PhoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                <input type="text" name="PhoneNumber" id="PhoneNumber" value={jobSeeker.PhoneNumber} onChange={handleChange} placeholder="Enter your phone number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                <input type of="text" name="address" id="address" value={jobSeeker.address} onChange={handleChange} placeholder="Enter your address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="profileDescription" className="block text-sm font-medium leading-6 text-gray-900">jobTitle</label>
                <input id="jobTitle" name="jobTitle" rows={3} value={jobSeeker.jobTitle} onChange={handleChange} placeholder="jobTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" className="rounded-md bg-[#212e53] py-2 px-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#212e55]/90 focus:outline-none focus:ring-2 focus:ring-[#212e55]/50">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCandidate;
