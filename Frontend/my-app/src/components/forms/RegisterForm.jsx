import React, { useState } from 'react';
import axios from 'axios';
import CompanyForm from './CompanyForm';
import CompanyDetails from './CompanyDetails';

function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onNext = () => setCurrentStep(currentStep + 1);
  const onBack = () => setCurrentStep(currentStep - 1);
  const onFormDataChange = (data) => setFormData({...formData, ...data});

 const onSubmit = () => {
  setLoading(true);
  const userId = sessionStorage.getItem('userId'); // Retrieve userId from session storage
  
  // Create an instance of FormData
  const finalFormData = new FormData();
  
  // Append each property from the formData state to the FormData instance
  for (const key in formData) {
    finalFormData.append(key, formData[key]);
  }
  for (const [key, value] of finalFormData.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  // Append userId to the FormData only if it exists
  if (userId) {
    finalFormData.append('userId', userId);
  }

  console.log('Final Form Data:', finalFormData);
  
  // Set up the Axios request with FormData
  axios.post('http://localhost:4000/auth/register', finalFormData, {
    headers: {
      'Content-Type': 'multipart/form-data', // This will let Axios set the boundary
    },
  })
  .then(response => {
    setLoading(false);
    setMessage('Registration successful');
    console.log('Registration successful', response.data);
    // Optionally handle redirection or other response actions here
  })
  .catch(error => {
    setLoading(false);
    setMessage('Registration failed: ' + error.message);
    console.error('Registration failed', error);
  });
};

  return (
    <div>
      <div className='flex justify-center items-center bg-gray-50'>
        <ul className="steps steps-vertical lg:steps-horizontal w-6/12 mt-20">
          <li className={`step ${currentStep >= 1 ? 'step-neutral' : ''}`}></li>
          <li className={`step ${currentStep >= 2 ? 'step-neutral' : ''}`}></li>
        </ul>
      </div>
      {currentStep === 1 && (
        <CompanyForm
          onNext={onNext}
          onFormDataChange={onFormDataChange}
        />
      )}
      {currentStep === 2 && (
        <CompanyDetails
          onBack={onBack}
          onSubmit={onSubmit}
          onFormDataChange={onFormDataChange}
        />
      )}
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
