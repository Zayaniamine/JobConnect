import React, { useState, useEffect,useRef } from 'react';
import { Button, TextInput, Label, Datepicker } from 'flowbite-react';
import axios from 'axios';
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function CreateJob({ isOpen, onClose, onSave, initialData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState([]);
    const [tempRequirement, setTempRequirement] = useState('');
    const [closingDate, setClosingDate] = useState(null);
    const [jobTypeList] = useState([
        { id: 'in-office', title: 'In-office' },
        { id: 'remote', title: 'Remote' },
        { id: 'hybrid', title: 'Hybrid' },
    ]);
    const [selectedJobType, setSelectedJobType] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '' });
    const modalRef = useRef(null);
    useEffect(() => {
        if (isOpen && modalRef.current) {
            // Scrolls to the top of the modal when it opens
            modalRef.current.scrollTop = 0;
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.titre);
            setDescription(initialData.description);
            setRequirements(initialData.skills || []);
            setClosingDate(new Date(initialData.clotureOffre));
            setSelectedJobType(initialData.jobType || '');
        } else {
            setTitle('');
            setDescription('');
            setRequirements([]);
            setClosingDate(null);
            setSelectedJobType('');
        }
    }, [initialData]);

    const handleAddRequirement = (e) => {
        e.preventDefault();
        if (tempRequirement && !requirements.includes(tempRequirement)) {
            setRequirements([...requirements, tempRequirement]);
            setTempRequirement('');
        }
    };

    const handleRemoveRequirement = (requirementToRemove) => {
        setRequirements(requirements.filter(requirement => requirement !== requirementToRemove));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!closingDate) {
            console.error('Closing date is required.');
            return;
        }

        const jobData = {
            titre: title,
            description: description,
            skills: requirements,
            jobType: selectedJobType,
            clotureOffre: closingDate.toISOString(),
            disponibilite: new Date(closingDate) >= new Date(),
        };

        const url = initialData ? `http://localhost:4000/api/jobs/update-joboffer/${initialData._id}` : 'http://localhost:4000/api/jobs/create-job';
        const method = initialData ? 'put' : 'post';

        try {
            const response = await axios[method](url, jobData);
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Error saving job:', error);
            setAlert({
                show: true,
                message: 'Failed to save job. Please check your entries and try submitting again.'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[calc(100vh-4rem)] overflow-y-auto p-5 " ref={modalRef}>                {alert.show && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span>{alert.message}</span>
                    </Alert>
                )}
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{initialData ? 'Edit Job Position' : 'Create New Job Position'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                    {/* Job Title */}
                    <Label htmlFor="title" value="Job Title" />
                    <TextInput id="title" type="text" placeholder="Enter job title" required value={title} onChange={(e) => setTitle(e.target.value)} />

                    {/* Job Description */}
                    <Label htmlFor="description" value="Job Description" />
                    <TextInput id="description" type="text" placeholder="Enter job description" required value={description} onChange={(e) => setDescription(e.target.value)} />

                    {/* Job Requirements */}
                    <Label value="Job Requirements" />
                    <div className="flex items-center">
                        <TextInput type="text" placeholder="Add requirements" value={tempRequirement} onChange={(e) => setTempRequirement(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddRequirement(e)} />
                        <Button onClick={handleAddRequirement}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {requirements.map((req, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                                {req} <button onClick={() => handleRemoveRequirement(req)} className="ml-2 text-red-500">×</button>
                            </span>
                        ))}
                    </div>

                    {/* Job Type */}
                    <Label htmlFor="jobType" value="Job Type" />
                    <div className="mt-4">
                        {jobTypeList.map((type) => (
                            <div key={type.id} className="flex items-center">
                                <input id={type.id} name="jobType" type="radio" checked={selectedJobType === type.id} onChange={() => setSelectedJobType(type.id)} className="h-4 w-4 border-gray-300 text-cyan-900 focus:ring-cyan-900" />
                                <label htmlFor={type.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">{type.title}</label>
                            </div>
                        ))}
                    </div>

                    {/* Closing Date */}
                    <Label htmlFor="closingDate" value="Closing Date" />
                    <Datepicker onSelectedDateChanged={setClosingDate} id="closingDate" date={closingDate} placeholder="Select closing date" />

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end space-x-2">
                        <Button color="gray" onClick={onClose}>Cancel</Button>
                        <Button type="submit">{initialData ? 'Update Job' : 'Save Job'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateJob;
