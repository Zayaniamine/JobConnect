import React, { useState } from 'react';
import axios from 'axios';
import { FileInput, Label } from "flowbite-react";

function CandidateForm() {
  const [preferencesRecherche, setPreferencesRecherche] = useState([]);
  const [tempPreference, setTempPreference] = useState('');
  const [candidateInfo, setCandidateInfo] = useState({
    nom: '',
    prenom: '',
    PhoneNumber:'',
    photo: null,  // Assuming photo is a resume or profile photo
  });

  const handleAddPreference = (e) => {
    e.preventDefault(); // Prevent form submission on enter
    if (tempPreference && !preferencesRecherche.includes(tempPreference)) {
      setPreferencesRecherche(prev => [...prev, tempPreference]);
      setTempPreference(''); // Clear input after adding
    }
  };

  const handleRemovePreference = (preferenceToRemove) => {
    setPreferencesRecherche(prev => prev.filter(preference => preference !== preferenceToRemove));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setCandidateInfo(prev => ({
      ...prev,
      photo: event.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', candidateInfo.nom);
    formData.append('prenom', candidateInfo.prenom);
    formData.append('PhoneNumber', candidateInfo.PhoneNumber);
    formData.append('photo', candidateInfo.photo);
    formData.append('preferencesRecherche', JSON.stringify(preferencesRecherche));
   
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      formData.append('userId', userId);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
      console.log('Form submitted:', response.data);
      // Handle redirection or further actions here
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Complete Your Profile
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="nom" id="nom" value={candidateInfo.nom} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
              </div>
              <div>
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
                <input type="text" name="prenom" id="prenom" value={candidateInfo.prenom} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
              </div>

              <div>
                <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PhoneNumber</label>
                <input type="text" name="PhoneNumber" id="PhoneNumber" value={candidateInfo.PhoneNumber} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
              </div>
    
            
              <div>
                <label htmlFor="preferencesRecherche" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Search Preferences</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="tempPreference"
                    value={tempPreference}
                    onChange={(e) => setTempPreference(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPreference(e)}
                    placeholder="Add preferences"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                  <button type="button" onClick={handleAddPreference} className="px-4 py-2 bg-cyan-700 text-white rounded-r-lg">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {preferencesRecherche.map((preference, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 flex items-center">
                      {preference}
                      <button onClick={() => handleRemovePreference(preference)} className="ml-2 text-blue-500 font-bold">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
      <div>
        <Label htmlFor="file-upload-helper-text" value="Upload Profile Picture" />
      </div>
      <FileInput className='pt-4' type="file" id="file-upload-helper-text" name='photo'  onChange={handleFileChange} helperText="PNG (MAX. 800x400px)." />
    </div>
              <div className='flex justify-center items-center'>
                <button type="submit" className="btn text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CandidateForm;
