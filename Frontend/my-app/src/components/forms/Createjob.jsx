import React, { useState } from 'react';
import { Button, TextInput, Label, Datepicker } from 'flowbite-react';

function CreateJob({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [closingDate, setClosingDate] = useState('0');  // Initialize with null for no selected date

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure the date is formatted correctly for saving
  

    onSave({
      title,
      description,
      requirements: requirements.split(','),
      closingDate
    });
    
    console.log({
      title,
      description,
      requirements: requirements.split(','),
      closingDate
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Job Position</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title" value="Job Title" />
            <TextInput
              id="title"
              type="text"
              placeholder="Enter job title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description" value="Job Description" />
            <TextInput
              id="description"
              type="text"
              placeholder="Enter job description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="requirements" value="Job Requirements" />
            <TextInput
              id="requirements"
              type="text"
              placeholder="Enter requirements (comma-separated)"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="closingDate" value="Closing Date" />
            <Datepicker
             
              onSelectedDateChanged={(e) =>setClosingDate(e)} //
              id="closingDate"
             
              date={closingDate}
              placeholder="Select closing date"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
