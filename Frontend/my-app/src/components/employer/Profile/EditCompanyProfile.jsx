import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IndustryFields = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing"];

function EditCompanyProfile() {
  const [company, setCompany] = useState({
    email: '',
    password: '',
    companyName: '',
    address: '',
    phoneNumber: '',
    companySize: '',
    description: '',
    logoCompany: null,
    imageUrl: 'https://via.placeholder.com/150',
    socialMediaURL: '',
    urlSiteWeb: '',
    industryField: ''
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    axios.get(`http://localhost:4000/employer/profile/${userId}`, { headers: { 'Cache-Control': 'no-cache' }})
      .then(response => {
        setCompany({ ...response.data, imageUrl: `http://localhost:4000/uploads/${response.data.logoCompany.split('\\').pop()}` });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompany(prev => ({
        ...prev,
        logoCompany: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(company).forEach(key => {
      if (key === 'logoCompany' && company.logoCompany) {
        formData.append(key, company.logoCompany);
      } else {
        formData.append(key, company[key]);
      }
    });

    const userId = sessionStorage.getItem('userId');
    axios.put(`http://localhost:4000/employer/update-profile/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      console.log('Update successful', response.data);
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Company Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Update your company information. Be careful what you share as this information can be public.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
                            <img
                                src={company.imageUrl}
                                alt=""
                                className="h-24 w-24 flex-none rounded-lg  object-cover"
                            />
                            <div>
                                <input type="file" onChange={handleFileChange} className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"/>
                                <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF, or PNG. Max 1MB</p>
                            </div>
                        </div>
              <div className="sm:col-span-6">
                <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
                <input type="text" name="companyName" id="companyName" value={company.companyName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <input type="email" name="email" id="email" value={company.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" value={company.phoneNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                <input type="text" name="address" id="address" value={company.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="companySize" className="block text-sm font-medium leading-6 text-gray-900">Company Size</label>
                <input type="number" name="companySize" id="companySize" value={company.companySize} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <textarea id="description" name="description" rows={3} value={company.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="socialMediaURL" className="block text-sm font-medium leading-6 text-gray-900">Social Media URL</label>
                <input type="url" name="socialMediaURL" id="socialMediaURL" value={company.socialMediaURL} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="urlSiteWeb" className="block text-sm font-medium leading-6 text-gray-900">Website URL</label>
                <input type="url" name="urlSiteWeb" id="urlSiteWeb" value={company.urlSiteWeb} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="industryField" className="block text-sm font-medium leading-6 text-gray-900">Industry Field</label>
                <select 
                  name="industryField" 
                  id="industryField" 
                  value={company.industryField} 
                  onChange={handleChange} 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Industry</option>
                  {IndustryFields.map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

            
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" className="rounded-md bg-[#212e53] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCompanyProfile;
