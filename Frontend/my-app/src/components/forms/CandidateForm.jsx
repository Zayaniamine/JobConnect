import React, { useState } from 'react';

function CandidateForm() {
  const [preferencesRecherche, setPreferencesRecherche] = useState([]);
  const [tempPreference, setTempPreference] = useState('');
  const [candidateInfo, setCandidateInfo] = useState({
    nom: '',
    prenom: '',
    photo: '',
    preferencesRecherche: ''
  });




  const handleAddPreference = (e) => {
    e.preventDefault(); // Prevent form submission on Enter
    if (tempPreference && !preferencesRecherche.includes(tempPreference)) {
      setPreferencesRecherche([...preferencesRecherche, tempPreference]);
      setTempPreference(''); // Clear input after adding
    }
  };

  const handleRemovePreference = (preferenceToRemove) => {
    setPreferencesRecherche(preferencesRecherche.filter(preference => preference !== preferenceToRemove));
  };
  
  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Complete Your Profile
            </h1>
            <form className="space-y-4 md:space-y-6 onSubmit={handleSubmit}">
            <div>
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="nom" id="nom" placeholder='Your name' value={candidateInfo.nom} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
                <input type="text" name="prenom" id="prenom" placeholder='Surname' value={candidateInfo.prenom} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
            
            

              <div>
                <label htmlFor="preferencesRecherche" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Search Preferences</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="preferencesRecherche"
                    id="preferencesRecherche"
                    value={tempPreference}
                    onChange={(e) => setTempPreference(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPreference(e)}
                    placeholder="Add preferences"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button onClick={handleAddPreference} className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">Add</button>
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

              <input type="file" className="file-input file-input-bordered w-full max-w-xs " />   

              </div>
              <div className='flex justify-center items-center'>

              <button type="submit" className="btn  flex-items  text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>

              </div>
          


             
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CandidateForm;
