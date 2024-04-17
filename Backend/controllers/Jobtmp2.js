// Import du modèle JobOffer
const JobOffer = require('../models/JobTemp2');

const createJobOffer2 = async (req, res) => {
    try {
        const { title, description, skills, date_debut, date_fin } = req.body;

        // Validation du corps de la requête
        if (!title || !description || !date_fin || !skills) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        if (date_fin  <= date_debut) {
            return res.status(400).json({ message: 'La date de fin doit être postérieure à la date de début' });
        }

        // Remplissage automatique des valeurs de company et location à partir de req.user
        const { company, location } = req.user;

        // Remplissage automatique de disponibilite en fonction de date_fin
        const currentDate = new Date();
        const disponibilite = date_fin <= currentDate;

        // Création de l'offre d'emploi
        const jobOffer = new JobOffer({
            title,
            description,
            company,
            location,
            date_debut,
            date_fin,
            disponibilite,
            skills: [],
        });

        // Sauvegarde de l'offre d'emploi dans la base de données
        await jobOffer.save();

        // Création et sauvegarde des skills
        for (const skill of skills) {
            const newSkill = {
                skill,
            };

            jobOffer.skills.push(newSkill);
        }

        // Mise à jour de l'offre d'emploi avec les skills
        await jobOffer.save();

        res.status(201).json({ message: 'Offre d\'emploi créée avec succès', jobOffer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};





module.exports = {
    createJobOffer2,
    
};