import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextInput, Label, Datepicker } from 'flowbite-react';

function JobPositionForm({ isOpen, onClose, onSave, jobPosition, jobOfferId }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [skills, setSkills] = useState([]);
    const [jobType, setJobType] = useState('in-office');
    const [closingDate, setClosingDate] = useState(new Date());
    const [closingTime, setClosingTime] = useState('17:00'); // Default time or loaded from jobPosition

    useEffect(() => {
        if (jobPosition) {
            setTitle(jobPosition.title || '');
            setContent(jobPosition.content || '');
            setSkills(jobPosition.skills || []);
            setJobType(jobPosition.jobType || 'in-office');
            const date = new Date(jobPosition.clotureOffre || new Date());
            setClosingDate(date);
            setClosingTime(`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
        } else {
            resetForm();
        }
    }, [jobPosition]);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setSkills([]);
        setJobType('in-office');
        setClosingDate(new Date());
        setClosingTime('17:00'); // Reset to default time
    };

 const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both date and time are valid
    if (!closingDate || !closingTime) {
        console.error('Invalid date or time');
        return;  // Exit the function if date or time is invalid
    }

    // Properly construct the dateTime object
    try {
        const dateParts = closingDate.toISOString().split('T')[0];
        const dateTime = new Date(`${dateParts}T${closingTime}:00Z`);  // Append 'Z' to indicate UTC time

        // Validate dateTime is valid
        if (isNaN(dateTime.getTime())) {
            throw new Error('Invalid date constructed');
        }

        const formData = {
            title,
            content,
            skills,
            jobType,
            clotureOffre: dateTime.toISOString()
        };

        let response;
        if (jobPosition) {
            response = await axios.put(`http://localhost:4000/api/jobs/${jobOfferId}/posts/${jobPosition._id}`, formData);
        } else {
            response = await axios.post(`http://localhost:4000/api/jobs/${jobOfferId}/posts`, formData);
        }
        onSave(response.data);
        onClose();
    } catch (error) {
        console.error('Failed to save the job position:', error.response || error.message);
    }
};

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <form className="bg-white rounded-lg shadow-lg max-w-md w-full p-5" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{jobPosition ? 'Edit Job Position' : 'Add Job Position'}</h2>
                <Label htmlFor="title">Title</Label>
                <TextInput id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <Label htmlFor="content">Content</Label>
                <TextInput id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <Label htmlFor="skills">Skills</Label>
                <TextInput id="skills" value={skills.join(',')} onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))} />
                <Label htmlFor="jobType">Job Type</Label>
                <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="form-select mt-1 block w-full">
                    <option value="in-office">In-office</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <Label htmlFor="closingDate">Closing Date</Label>
                <Datepicker date={closingDate} onSelectedDateChanged={setClosingDate} />
                <Label htmlFor="closingTime">Closing Time</Label>
                <TextInput id="closingTime" type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} />
                <div className="mt-4 flex space-x-2">
                    <Button color="gray" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
}

export default JobPositionForm;