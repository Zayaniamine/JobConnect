import React, { useState } from 'react';

function CompanyForm({ onNext, onFormDataChange }) {
  const [formData, setFormData] = useState({
    companyName: '',
    IndustryField: '',
    // Assuming you'll want to handle the file separately from the text data
  });
 const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]); // Set the first selected file
};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const IndustryFields = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onFormDataChange(updatedFormData); // Pass updated form data to parent
  };

  const handleSectorSelect = (selectedSector) => {
    const updatedFormData = { ...formData, IndustryField: selectedSector };
    setFormData(updatedFormData);
    onFormDataChange(updatedFormData);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const NewformData = new FormData();
    // Append text fields
    for (const key in formData) {
      NewformData.append(key, formData[key]);
    }
    
    // Append the file, if selected
    if (selectedFile) {
      NewformData.append("image", selectedFile);
    }
    console.log('Form Data:', NewformData);
  
    /*axios.post('http://localhost:5000/api/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Success:', response.data);
      // Handle success
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });
  };*/

    onNext(); // Navigate to the next step
  };

  return (
    <section className="bg-gray-50  ">
      {/* Form Container */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-44 ">
          <div className="p-6 space-y-4 md:space-y-6 ">
            {/* Form Title */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Complete Your Profile
            </h1>
            {/* Form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Company Name Input */}
              <div>
                <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company Name" required />
              </div>
              {/* Sector of Activity Input */}
              <div>
                <label htmlFor="Industry Field" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry Field</label>
                <div className="relative">
                  <input type="text" value={formData.IndustryField} readOnly className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Industry Field" required />
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
              {/* File Input */}
              <div>
                <input type="file"    onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
              </div>
              {/* Submission Button */}
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
