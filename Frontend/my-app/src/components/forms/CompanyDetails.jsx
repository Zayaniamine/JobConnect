import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CompanyDetails({onSubmit,onBack}) {
  const [formData, setFormData] = useState({
    TIN: '',
    description: '',
    address: '',
    urlSiteWeb: '',
    socialMediaURL: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form Data:', formData);
    onSubmit(formData); 
    
  // Assuming onSubmit expects the form data as an argument
  navigate('/employer');
 
};

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Additional Details
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Inputs */}
              <div>
                <label htmlFor="TIN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TIN</label>
                <input type="text" name="TIN" id="TIN" value={formData.TIN} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tax Identification Number" required />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
              </div>

              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
              </div>

              <div>
                <label htmlFor="urlSiteWeb" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                <input type="url" name="urlSiteWeb" id="urlSiteWeb" value={formData.urlSiteWeb} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com" required />
              </div>

              <div>
                <label htmlFor="socialMediaURL" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LinkedIn URL</label>
                <input type="url" name="socialMediaURL" id="socialMediaURL" value={formData.socialMediaURL} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://LinkedIn.com/example" required />
              </div>

              {/* Submission Button */}
             
              <div className='flex justify-center items-center gap-4 '>
              <button type="button" onClick={onBack} className="btn text-black bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Back
                </button>
                <button type="submit"  onSubmit={handleSubmit} className="btn text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Submit
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyDetails;
