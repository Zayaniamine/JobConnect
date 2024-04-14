import React from 'react';
import CompanyForm from './CompanyForm';
import CompanyDetails from './CompanyDetails';

function RegisterForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({});

  const onNext = () => setCurrentStep(currentStep + 1);
  const onBack = () => setCurrentStep(currentStep - 1);
  const onFormDataChange = (data) => setFormData({...formData, ...data}); // Updated to merge new data with existing formData
  const onSubmit = () => {
    // Submit formData or navigate to confirmation step
    console.log('Form Data:', formData);
  };

  return (
    <div >
      <div className='flex justify-center items-center bg-gray-50 '>
      <ul className="steps  steps-vertical lg:steps-horizontal w-6/12 mt-20 ">
        <li className={`step ${currentStep >= 1 ? 'step-neutral' : ''}`}></li>
        <li  className={`step ${currentStep >= 2 ? 'step-neutral' : ''}`}></li>
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
          formData={formData}
        />
      )}
   
    </div>
  );
}

export default RegisterForm;
