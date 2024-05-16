import { useState } from 'react';
import axios from 'axios';
import { FileInput, Label } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import Notification from '../UI/notification'

function CandidateForm() {
  const [preferencesRecherche, setPreferencesRecherche] = useState([]);
  const [tempPreference, setTempPreference] = useState('');
  const [candidateInfo, setCandidateInfo] = useState({
    nom: '',
    prenom: '',
    PhoneNumber: '',
    jobTitle: '',
    address: '',
    photo: null,
    github: '',
    linkedin: ''
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const navigate = useNavigate();

  const handleAddPreference = (e) => {
    e.preventDefault();
    if (tempPreference && !preferencesRecherche.includes(tempPreference)) {
      setPreferencesRecherche(prev => [...prev, tempPreference]);
      setTempPreference('');
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
    const file = event.target.files[0];
    if (file.type !== "image/png") {
      setShowNotification(true);
      setNotification({ type: 'error', message: 'Only PNG files are allowed!' });
      return;
    }
    setCandidateInfo(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', candidateInfo.nom);
    formData.append('prenom', candidateInfo.prenom);
    formData.append('PhoneNumber', candidateInfo.PhoneNumber);
    formData.append('jobTitle', candidateInfo.jobTitle);
    formData.append('address', candidateInfo.address);
    formData.append('photo', candidateInfo.photo);
    formData.append('github', candidateInfo.github);
    formData.append('linkedin', candidateInfo.linkedin);
    formData.append('preferencesRecherche', JSON.stringify(preferencesRecherche));

    const userId = sessionStorage.getItem('userId');
    if (userId) {
      formData.append('userId', userId);
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form submitted:', response.data);
      navigate('/JobSeeker');
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowNotification(true);
      setNotification({ type: 'error', message: 'Failed to submit the form. Please try again.' });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Complete Your Profile
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="nom" id="nom" value={candidateInfo.nom} onChange={handleChange} placeholder="John" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
              <input type="text" name="prenom" id="prenom" value={candidateInfo.prenom} onChange={handleChange} placeholder="Doe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
              <input type="text" name="PhoneNumber" id="PhoneNumber" value={candidateInfo.PhoneNumber} onChange={handleChange} placeholder="+216 12 345 678" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
              <input type="text" name="jobTitle" id="jobTitle" value={candidateInfo.jobTitle} onChange={handleChange} placeholder="Software Engineer" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input type="text" name="address" id="address" value={candidateInfo.address} onChange={handleChange} placeholder="123 Main St, City, Country" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
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
                  placeholder="e.g., Remote, Full-time"
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
              <Label htmlFor="github" value="GitHub Profile" />
              <input
                type="text"
                name="github"
                id="github"
                value={candidateInfo.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" value="LinkedIn Profile" />
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                value={candidateInfo.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="file-upload-helper-text" value="Upload Profile Picture" />
              <FileInput className='pt-4' type="file" id="file-upload-helper-text" name='photo' onChange={handleFileChange} helperText="PNG (MAX. 800x400px)." />
            </div>
            <div className='flex justify-center items-center'>
              <button type="submit" className="btn text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {showNotification && <Notification show={showNotification} message={notification.message} type={notification.type} onClose={() => setShowNotification(false)} />}
    </section>
  );
}

export default CandidateForm;
