import React, { useState } from 'react';

import { FileInput, Label } from "flowbite-react";

function CompanyForm({ onNext, onFormDataChange }) {
  const [formData, setFormData] = useState({
    companyName: '',
    IndustryField: '',
    PhoneNumber:'',
    logoCompany: null // Integrated logoCompany into the main formData state
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const IndustryFields = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing"];

  // Handle all form data changes including files
  const handleFormDataChange = (name, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    onFormDataChange({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    handleFormDataChange('logoCompany', event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormDataChange(name, value);
  };

  const handleSectorSelect = (selectedSector) => {
    handleFormDataChange('IndustryField', selectedSector);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onFormDataChange(formData); // Ensures latest formData is used
    console.log(formData)
    onNext(); // Proceed to the next step in the UI if necessary
  };


  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-44">
          <div className="p-6 space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Complete Your Profile
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PhoneNumber </label>
                <input type="number" name="PhoneNumber" id="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="IndustryField" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry Field</label>
                <div className="relative">
                  <input type="text" value={formData.IndustryField} readOnly className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                      {IndustryFields.map((IndustryField) => (
                        <li key={IndustryField} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSectorSelect(IndustryField)}>
                          {IndustryField}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
      <div>
        <Label htmlFor="file-upload-helper-text" value="Upload Profile Picture" />
      </div>
      <FileInput className='pt-4' id="file-upload-helper-text" name='logoCompany'  onChange={handleFileChange} helperText="PNG (MAX. 800x400px)." />
    </div>
              <div className='flex justify-center items-center'>
                <button type="submit" className="btn text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyForm;
