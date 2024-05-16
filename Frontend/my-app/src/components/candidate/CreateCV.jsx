import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid';

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

function ResumeForm() {
    const [resume, setResume] = useState({
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

    useEffect(() => {
        // Fetch user's resume data when component mounts
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const userId = sessionStorage.getItem('userId');
            const response = await axios.get(`http://localhost:4000/jobSeeker/resume/${userId}`);
            setResume(response.data.resume);
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResume({
            ...resume,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            alert('User ID is missing, please login again.');
            return;
        }

        const data = {
            userId,
            resume: { ...resume }
        };

        console.log("Submitting the following data to the backend:", data);

        try {
            const updateResponse = await axios.put(`http://localhost:4000/jobSeeker/update-profile/${userId}`, data);
            console.log('Resume updated successfully!', updateResponse.data);
            generatePDF();
        } catch (error) {
            console.error('Error submitting resume:', error);
            alert('Failed to submit resume.');
        }
    };

    const generatePDF = async () => {
        try {
            const response = await axios.post('http://localhost:4000/jobSeeker/create-pdf', { resume });
            console.log('PDF generation response:', response.data);
            if (response.status === 200) {
                fetchPDF();
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF.');
        }
    };

    const fetchPDF = async () => {
        try {
            const response = await axios.get('http://localhost:4000/jobSeeker/fetch-pdf', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Resume.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error fetching PDF:', error);
            alert('Failed to download PDF.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(resume).filter(key => typeof resume[key] === 'string').map(key => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="mb-1 text-sm font-medium text-gray-700">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            value={resume[key]}
                            onChange={handleInputChange}
                            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                ))}
            </div>
            <DynamicSection
                title="Experiences"
                fields={[
                    { name: 'jobTitle', placeholder: 'Job Title' },
                    { name: 'employer', placeholder: 'Employer' },
                    { name: 'city', placeholder: 'City' },
                    { name: 'country', placeholder: 'Country' },
                    { name: 'startDate', placeholder: 'Start Date', type: 'date' },
                    { name: 'endDate', placeholder: 'End Date', type: 'date' },
                    { name: 'description', placeholder: 'Description' }
                ]}
                items={resume.experiences}
                setItems={(newItems) => setResume({ ...resume, experiences: newItems })}
            />
            <DynamicSection
                title="Education"
                fields={[
                    { name: 'institution', placeholder: 'Institution' },
                    { name: 'degree', placeholder: 'Degree' },
                    { name: 'fieldOfStudy', placeholder: 'Field of Study' },
                    { name: 'startDate', placeholder: 'Start Date', type: 'date' },
                    { name: 'endDate', placeholder: 'End Date', type: 'date' },
                    { name: 'description', placeholder: 'Description' }
                ]}
                items={resume.education}
                setItems={(newItems) => setResume({ ...resume, education: newItems })}
            />
            <DynamicSection
                title="Skills"
                fields={[
                    { name: 'skillName', placeholder: 'Skill Name' },
                    { name: 'proficiency', placeholder: 'Proficiency' }
                ]}
                items={resume.skills}
                setItems={(newItems) => setResume({ ...resume, skills: newItems })}
            />
            <DynamicSection
                title="Languages"
                fields={[
                    { name: 'language', placeholder: 'Language' },
                    { name: 'proficiency', placeholder: 'Proficiency' }
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
            <button type="submit" className="mt-4 p-2 bg-[#212e53] text-white rounded hover:bg-blue-800">
                Submit Resume
            </button>
        </form>
    );
}

export default ResumeForm;
