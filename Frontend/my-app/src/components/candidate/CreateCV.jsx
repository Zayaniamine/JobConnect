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
        if (!userId) {
            console.error('User ID is missing, please log in again.');
            return;
        }

        try {
            await axios.put(`http://localhost:4000/jobSeeker/update-resume/${userId}`, { resume });
            alert('Resume updated successfully!');
        } catch (error) {
            console.error('Error updating resume:', error);
            alert('Failed to update resume. Please try again.');
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
     // Resetting resume state after deletion
        } catch (error) {
            console.error('Error deleting resume:', error);
            alert('Failed to delete resume. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is missing, please log in again.');
            return;
        }

        try {
            await axios.post(`http://localhost:4000/jobSeeker/create-pdf/${userId}`, {
                userId,
                resume
            });
            fetchPDF(); // Assuming successful PDF creation, we proceed to fetch
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

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
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 relative rounded-lg shadow">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(resume)
                    .filter(key => typeof resume[key] === 'string' && key !== '_id' && key !== 'user')
                    .map(key => (
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
            <button type="submit" className="rounded hover:bg-rounded-md  right-40 bg-[#212e53] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800-800">
                Download Resume as PDF
            </button>
            <button type="button" 
            onClick={handleUpdate}
            className="mt-4 p-2 ml-5 absolute rounded-md  right-40 bg-[#212e53] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">
                Submit Resume
            </button>
            <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-md absolute right-3  bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                  >
                     Delete my Resume
                  </button>
               
        </form>
    );
}

export default ResumeForm;
