import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, XCircleIcon, UserIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/UI/loading';
function DynamicSection({ title, fields, items, setItems }) {
    const addItem = () => {
        const newItem = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
        setItems([...items, newItem]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleChange = (value, index, field) => {
        const newItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
        setItems(newItems);
    };
 

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">{field.placeholder}</label>
                            <input
                                type={field.type || 'text'}
                                value={item[field.name]}
                                onChange={(e) => handleChange(e.target.value, index, field.name)}
                                placeholder={field.placeholder}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => removeItem(index)} className="text-red-500 mt-6">
                        <XCircleIcon className="h-6 w-6" />
                    </button>
                </div>
            ))}
            <button type="button" onClick={addItem} className="flex items-center text-[#212e53]">
                <PlusIcon className="h-5 w-5 mr-2 " /> Add another {title.slice(0, -1)}
            </button>
        </div>
    );
}

function CreateResume() {
    const [resume, setResume] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email:'',
        address: '',
        postalCode: '',
        city: '',
        profileTitle: '',
        profileDescription: '',
        experiences: [],
        education: [],
        skills: [],
        languages: [],
        interests: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const Navigate=useNavigate()
    const userId = sessionStorage.getItem('userId');
    useEffect(() => {
        const fetchResume = async () => {
            if (!userId) {
                console.error('User ID is missing, please log in again.');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:4000/jobSeeker/resume/${userId}`);
                setResume({ ...response.data.resume });
            } catch (error) {
                console.error('Error fetching resume:', error);
            }
        };
        fetchResume();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResume({
            ...resume,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!userId) {
            console.error('User ID is missing, please log in again.');
            return;
        }

        try {
            await axios.put(`http://localhost:4000/jobSeeker/update-resume/${userId}`, { resume });
            alert('Resume updated successfully!');
            setTimeout(() => {
                Navigate('/JobSeeker/'); // Redirect after a delay
            }, 4000); // 4000 milliseconds = 4 seconds delay
        } catch (error) {
       
            console.error('Error updating resume:', error);
            alert('Failed to update resume. Please try again.');
            setIsSubmitting(false);
        }
     
    };

    const handleDelete = async () => {
        if (!userId) {
            console.error('User ID is missing, please log in again.');
            return;
        }

        try {
            await axios.delete(`http://localhost:4000/jobSeeker/delete-resume/${userId}`);
            alert('Resume deleted successfully!');
            setResume({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                postalCode: '',
                city: '',
                profileTitle: '',
                profileDescription: '',
                experiences: [],
                education: [],
                skills: [],
                languages: [],
                interests: []
            });
        } catch (error) {
            console.error('Error deleting resume:', error);
            alert('Failed to delete resume. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!userId) {
            console.error('User ID is missing, please log in again.');
            return;
        }
        try {
            await axios.put(`http://localhost:4000/jobSeeker/update-resume/${userId}`, { resume });
            alert('Resume updated successfully!');
            setTimeout(() => {
                Navigate('/JobSeeker/'); // Redirect after a delay
            }, 4000); // 4000 milliseconds = 4 seconds delay
        } catch (error) {
       
            console.error('Error updating resume:', error);
            alert('Failed to update resume. Please try again.');
            setIsSubmitting(false);
        }
     
        try {
            await axios.post(`http://localhost:4000/jobSeeker/create-pdf/${userId}`, {
                userId,
                resume
            });
            fetchPDF(); 
            setTimeout(() => {
                Navigate('/JobSeeker/'); // Redirect after a delay
            }, 4000); // 4000 milliseconds = 4 seconds delay// Assuming successful PDF creation, we proceed to fetch
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };
    if ( isSubmitting) {
        return <LoadingSpinner />;
    }

    const fetchPDF = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/jobSeeker/fetch-pdf/${userId}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Resume-${userId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error fetching PDF:', error);
            alert('Failed to download PDF.');
        }
    };

    return (
        <>
        <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl ml-7 mt-10 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
         Complete Your profile 
        </h2>
        </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-12 bg-white p-8 relative rounded-lg shadow">
           

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                    </p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                    <div className="sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            E-mail
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.email}
                                onChange={handleInputChange} 
                                required
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Address
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.address}
                                onChange={handleInputChange} 
                                required
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                autoComplete="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={resume.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <di className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                    

                    <div className="col-span-full">
                        <label htmlFor="Description" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="Description"
                                name="profileDescription"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Write a few sentences about yourself."
                                value={resume.profileDescription}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="profileTitle" className="block text-sm font-medium leading-6 text-gray-900">
                        profile Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="profileTitle"
                                name="profileTitle"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Write a few sentences about yourself."
                                value={resume.profileTitle}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>


              

                   
                </div>
            </di>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Resume Details</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Please fill out your professional experiences, education, and skills.
                    </p>
                </div>

                <div className="md:col-span-2">
                    <DynamicSection
                        title="Experiences"
                        fields={[
                            { name: 'company', placeholder: 'Company' },
                            { name: 'title', placeholder: 'Title' },
                            { name: 'startDate', placeholder: 'Start Date', type: 'date' },
                            { name: 'endDate', placeholder: 'End Date', type: 'date' }
                        ]}
                        items={resume.experiences}
                        setItems={(newItems) => setResume({ ...resume, experiences: newItems })}
                        
                    />

                    <DynamicSection
                        title="Education"
                        fields={[
                            { name: 'school', placeholder: 'School' },
                            { name: 'degree', placeholder: 'Degree' },
                            { name: 'startDate', placeholder: 'Start Date', type: 'date' },
                            { name: 'endDate', placeholder: 'End Date', type: 'date' }
                        ]}
                        items={resume.education}
                        setItems={(newItems) => setResume({ ...resume, education: newItems })}
                    />

                    <DynamicSection
                        title="Skills"
                        fields={[
                            { name: 'skill', placeholder: 'Skill' }
                        ]}
                        items={resume.skills}
                        setItems={(newItems) => setResume({ ...resume, skills: newItems })}
                    />

                    <DynamicSection
                        title="Languages"
                        fields={[
                            { name: 'language', placeholder: 'Language' }
                        ]}
                        items={resume.languages}
                        setItems={(newItems) => setResume({ ...resume, languages: newItems })}
                    />

                    <DynamicSection
                        title="Interests"
                        fields={[
                            { name: 'interest', placeholder: 'Interest' }
                        ]}
                        items={resume.interests}
                        setItems={(newItems) => setResume({ ...resume, interests: newItems })}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-x-6">
            
                <button
                    type="submit"
               
                    className="rounded-md bg-[#212e53] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
             
            </div>
        </form>
        </>
    );
};

export default CreateResume;
