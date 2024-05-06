import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavB from '../components/UI/Navbar';
import Header from '../components/UI/Header';
import Stat from '../components/UI/stat';
import TimelineC from '../components/UI/Timeline';
import Jobcard from '../components/UI/Jobcard';
import Trusted from '../components/UI/Trusted';
import NewsLetter from '../components/UI/NewsLetter';

function Home() {
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/jobs');
        setJobOffers(response.data);
        console.log(response.data) 
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };

    fetchJobOffers();
  }, []);

  return (
    <>
      <NavB />
      <Header />
      
      <TimelineC />
      <Stat />
      
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              Discover Job Oportunities
            </h2>
      <div className='  flex justify-center gap-10 '>
     
        {jobOffers.slice(0, 3).map((jobOffer) => (
          <Jobcard
            key={jobOffer.id}
            title={jobOffer.titre}
            description={jobOffer.description}
            skills={jobOffer.skills}
            clotureOffre={jobOffer.clotureOffre}
            disponibilite={jobOffer.disponibilite}

            link={jobOffer.link} // Ensure the 'link' prop is correctly assigned
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/jobs" className="btn">View More</Link> {/* Update the Link to route to the correct path */}
      </div>
      <Trusted />
      <NewsLetter/>
   
    </>
  );
}

export default Home;
