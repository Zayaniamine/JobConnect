import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, TextInput, Label, Datepicker, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

function CreateJob({ isOpen, onClose, onSave, initialData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [positions, setPositions] = useState([{ title: '', content: '', skills: [], jobType: 'in-office', tempSkill: '' }]);
    const [closingDate, setClosingDate] = useState(new Date());
    const [closingTime, setClosingTime] = useState('11:59');  // Default closing time
    const [alert, setAlert] = useState({ show: false, message: '' });
    const [IndustryField, setIndustryField] = useState('');

    const modalRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const IndustryFields = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing"];

    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.titre);
            setDescription(initialData.description);
            setPositions(initialData.positions || [{ title: '', content: '', skills: [], jobType: 'in-office', tempSkill: '' }]);
            const closing = new Date(initialData.clotureOffre);
            setClosingDate(closing);
            setClosingTime(`${closing.getHours().toString().padStart(2, '0')}:${closing.getMinutes().toString().padStart(2, '0')}`);
        } else {
            setTitle('');
            setDescription('');
            setPositions([{ title: '', content: '', skills: [], jobType: 'in-office', tempSkill: '' }]);
            setClosingDate(new Date());
            setClosingTime('17:00');
        }
    }, [initialData]);

    const handlePositionChange = (index, field, value) => {
        const newPositions = [...positions];
        newPositions[index][field] = value;
        setPositions(newPositions);
    };

    const handleAddPosition = () => {
        setPositions([...positions, { title: '', content: '', skills: [], jobType: 'In-office', tempSkill: '' }]);
    };

    const handleRemovePosition = (index) => {
        setPositions(positions.filter((_, i) => i !== index));
    };

    const handleAddSkill = (index) => {
        const newPositions = [...positions];
        const skill = newPositions[index].tempSkill.trim();
        if (skill && !newPositions[index].skills.includes(skill)) {
            newPositions[index].skills.push(skill);
            newPositions[index].tempSkill = '';
            setPositions(newPositions);
        }
    };

    const handleRemoveSkill = (positionIndex, skillIndex) => {
        const newPositions = [...positions];
        newPositions[positionIndex].skills.splice(skillIndex, 1);
        setPositions(newPositions);
    };

    const handleSkillInputChange = (index, value) => {
        const newPositions = [...positions];
        newPositions[index].tempSkill = value;
        setPositions(newPositions);
    };
    const handleSectorSelect = (selectedSector) => {
        setIndustryField( selectedSector)
        setIsDropdownOpen(false);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dateTime = new Date(`${closingDate.toISOString().split('T')[0]}T${closingTime}:00`);
        if (dateTime.getTime() <= new Date().getTime()) {
            console.error('Closing date and time must be in the future.');
            setAlert({ show: true, message: 'Closing date and time must be in the future.' });
            return;
        }

        const jobData = {
            titre: title,
            description: description,
            posts: positions.map(({ tempSkill, ...rest }) => ({
                ...rest,
                skills: [...rest.skills],
                clotureOffre: dateTime.toISOString(),
            })),
            clotureOffre: dateTime.toISOString(),
            disponibilite: true,
             employerId: sessionStorage.getItem('userId'),
             IndustryField:IndustryField
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
        window.location.reload();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[calc(100vh-4rem)] overflow-y-auto p-5" ref={modalRef}>
                {alert.show && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span>{alert.message}</span>
                    </Alert>
                )}
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{initialData ? 'Edit Job Offer' : 'Create New Job Offer'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label htmlFor="title" value="Job Title" />
                    <TextInput id="title" type="text" placeholder="Enter job title" required value={title} onChange={(e) => setTitle(e.target.value)} />

                    <Label htmlFor="description" value="Job Description" />
                    <TextInput id="description" type="text" placeholder="Enter job description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div>
                <label htmlFor="IndustryField" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry Field</label>
                <div className="relative">
                  <input type="text" value={IndustryField} readOnly className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                      {IndustryFields.map((IndustryField) => (
                        <li key={IndustryField} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"  onClick={() => handleSectorSelect(IndustryField)}>
                          {IndustryField}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
                    {positions.map((position, index) => (
                        <div key={index}>
                            <Label value={`Position ${index + 1} - Title`} />
                            <TextInput type="text" placeholder="Job Position Title" value={position.title}
                                onChange={(e) => handlePositionChange(index, 'title', e.target.value)} required />

                            <Label value={`Position ${index + 1} - Description`} />
                            <TextInput type="text" placeholder="Job Description" value={position.content}
                                onChange={(e) => handlePositionChange(index, 'content', e.target.value)} required />

                            <Label value={`Position ${index + 1} - Skills`} />
                            <div className="flex items-center">
                                <TextInput type="text" placeholder="Add skills" value={position.tempSkill}
                                    onChange={(e) => handleSkillInputChange(index, e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(index)} />
                                <Button onClick={() => handleAddSkill(index)}>Add</Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {position.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        {skill} <button onClick={() => handleRemoveSkill(index, skillIndex)} className="ml-2 text-red-500">×</button>
                                    </span>
                                ))}
                            </div>

                            <Label value={`Position ${index + 1} - Job Type`} />
                            <select value={position.jobType} onChange={(e) => handlePositionChange(index, 'jobType', e.target.value)} className="form-select mt-1 block w-full">
                                <option value="In-office">In-office</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>

                            <Button className='mt-3 bg-gray-400' onClick={() => handleRemovePosition(index)}>Remove Position</Button>
                        </div>
                    ))}

                    <Button onClick={handleAddPosition}>Add New Position</Button>

                    <Label htmlFor="closingDate" value="Closing Date" />
                    <Datepicker onSelectedDateChanged={setClosingDate} id="closingDate" date={closingDate} placeholder="Select closing date" />
                    <Label htmlFor="closingTime" value="Closing Time" />
                    <TextInput id="closingTime" type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} />

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
