import React from 'react';
import { Link } from 'react-router-dom';
import NavB from '../components/UI/Navbar';
import Header from '../components/UI/Header';
import Stat from '../components/UI/stat';
import TimelineC from '../components/UI/Timeline';
import Quote from '../components/UI/Quote';
import Jobcard from '../components/UI/Jobcard';
import Trusted from '../components/UI/Trusted';

function Home() {
  // Define initial job data
  const jobOffers = [
    { id: 1, title: 'Frontend Developer', description: 'We are looking for a skilled frontend developer proficient in React.js and CSS to join our team.', link: '/frontend-developer' },
    { id: 2, title: 'Backend Engineer', description: 'Join our backend engineering team to work on scalable and robust backend systems using Node.js and MongoDB.', link: '/backend-engineer' },
    { id: 3, title: 'UI/UX Designer', description: 'Are you passionate about designing user interfaces and experiences? We have an exciting opportunity for a UI/UX Designer.', link: '/ui-ux-designer' },
    { id: 4, title: 'Data Scientist', description: 'Join our data science team to analyze large datasets and build predictive models using Python and TensorFlow.', link: '/data-scientist' },
  ];

  return (
    <div>
      <NavB />
      <Header />
      <Stat />
      <TimelineC />
      <Quote />
      <div className='flex  flex-wrap  justify-center items-center p-4'>
        {jobOffers.map((jobOffer) => (
          <Jobcard
            key={jobOffer.id}
            title={jobOffer.title}
            description={jobOffer.description}
            link={jobOffer.link}
          />
        ))}
        </div>
        <div className="flex justify-center mt-4">
        <Link to="/" className="btn">View More</Link>
        
      </div>
       <Trusted/>
    </div>
  );
}

export default Home;