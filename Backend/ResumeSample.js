module.exports = (data) => {
    // Check if 'resume' is provided, if not, handle it appropriately
    if (!data || !data.resume) {
        throw new Error("Resume data is required but was not provided.");
    }

    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        postalCode,
        city,
        profileTitle,
        profileDescription,
        experiences = [],
        education = [],
        skills = [],
        languages = [],
        interests = []
    } = data.resume;

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return `
        <style>
            body { font-family: Arial, sans-serif; }
            h1, h2 { color: navy; }
            hr { margin-top: 10px; margin-bottom: 10px; }
            div { margin-bottom: 10px; }
        </style>
        <h1>Resume of ${firstName || ''} ${lastName || ''}</h1>
        <hr>
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phoneNumber || 'N/A'}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}, ${city || 'N/A'}, ${postalCode || 'N/A'}</p>

        <h2>Profile</h2>
        <p>${profileDescription || 'No profile description provided.'}</p>

        <h2>Experience</h2>
        ${experiences.map(exp => `
            <div>
                <h3>${exp.jobTitle} at ${exp.employer}</h3>
                <p><strong>Duration:</strong> ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</p>
                <p><strong>Description:</strong> ${exp.description}</p>
                <p><strong>Location:</strong> ${exp.city}, ${exp.country}</p>
            </div>
            <hr>
        `).join('')}

        <h2>Education</h2>
        ${education.map(edu => `
            <div>
                <h3>${edu.institution}</h3>
                <p><strong>Degree:</strong> ${edu.degree}, <strong>Field of Study:</strong> ${edu.fieldOfStudy}</p>
                <p><strong>Duration:</strong> ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
                <p><strong>Description:</strong> ${edu.description}</p>
            </div>
            <hr>
        `).join('')}

        <h2>Skills</h2>
        <ul>
            ${skills.map(skill => `<li>${skill.skillName} - ${skill.proficiency}</li>`).join('')}
        </ul>

        <h2>Languages</h2>
        <ul>
            ${languages.map(lang => `<li>${lang.language} - ${lang.proficiency}</li>`).join('')}
        </ul>

        <h2>Interests</h2>
        <ul>
            ${interests.map(interest => `<li>${interest.interest}</li>`).join('')}
        </ul>
    `;
};
