// Import du modèle JobOffer
const JobOffer = require('../models/Job_Offers_Management');
// Import du modèle Post
const Post = require('../models/Posts');

const createJobOffer = async (req, res) => {
    try {
        const { title, description, company, location, published_by, posts, date_debut, date_fin } = req.body;

        // Validation du corps de la requête
        if (!title || !company || !location || !published_by || !posts) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        if (date_fin  <= date_debut) {
            return res.status(400).json({ message: 'La date de fin doit être postérieure à la date de début' });
        }
        // Création de l'offre d'emploi
        const jobOffer = new JobOffer({
            title,
            description,
            company,
            location,
            published_by,
            date_debut,
            date_fin,
            posts: [],
        });
        

        // Sauvegarde de l'offre d'emploi dans la base de données
        await jobOffer.save();

        // Création et sauvegarde des posts
        for (const post of posts) {
            const newPost = new Post({
                post_name: post.post_name,
                skills: post.skills,
                jobOfferId: jobOffer._id,
            });

            await newPost.save();
            jobOffer.posts.push(newPost);
        }

        // Mise à jour de l'offre d'emploi avec les posts
        await jobOffer.save();

        res.status(201).json({ message: 'Offre d\'emploi créée avec succès', jobOffer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
const deletePost = async (req, res) => {
    try {
        const { jobId, postId } = req.params;

        // Vérifier si l'offre d'emploi existe
        const jobOffer = await JobOffer.findById(jobId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
        }

        // Vérifier si le post existe dans l'offre d'emploi
        const postIndex = jobOffer.posts.findIndex(post => post._id.toString() === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post non trouvé dans l\'offre d\'emploi' });
        }

        // Supprimer le post de l'offre d'emploi
        jobOffer.posts.splice(postIndex, 1);
        await jobOffer.save();

        res.status(200).json({ message: 'Post supprimé avec succès', jobOffer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

const deleteJobOffer = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Supprimer l'offre d'emploi
        const jobOffer = await JobOffer.findByIdAndDelete(jobId);

        if (!jobOffer) {
            return res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
        }

        res.status(200).json({ message: 'Offre d\'emploi supprimée avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
const updateJobOffer = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { title, description, company, location, posts } = req.body;

        // Vérifier si l'offre d'emploi existe
        let jobOffer = await JobOffer.findById(jobId);
        if (!jobOffer) {
            return res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
        }

        // Mettre à jour les champs de l'offre d'emploi
        if (title) jobOffer.title = title;
        if (description) jobOffer.description = description;
        if (company) jobOffer.company = company;
        if (location) jobOffer.location = location;

        // Mettre à jour les posts associés (s'il y en a)
        if (posts) {
            jobOffer.posts = []; // Supprimer les anciens posts
            for (const post of posts) {
                const newPost = new Post({
                    post_name: post.post_name,
                    skills: post.skills,
                    jobOfferId: jobOffer._id,
                });

                await newPost.save();
                jobOffer.posts.push(newPost);
            }
        }

        // Sauvegarder les modifications de l'offre d'emploi
        await jobOffer.save();

        res.status(200).json({ message: 'Offre d\'emploi mise à jour avec succès', jobOffer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
const getJobOffersByPost = async (req, res) => {
    try {
        const { postName } = req.params;

        // Rechercher les offres d'emploi qui ont le poste spécifié
        const jobOffers = await JobOffer.find({ 'posts.post_name': postName }).populate('posts');

        res.status(200).json({ jobOffers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};




module.exports = {
    createJobOffer,
    deletePost,
    deleteJobOffer,
    updateJobOffer,
    getJobOffersByPost,
};