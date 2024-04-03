import React from 'react';
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiUser, HiDocumentText, HiBriefcase } from "react-icons/hi";
import { Link } from 'react-router-dom';

function TimelineC() {
  return (
    <Timeline horizontal className='ml-5 mt-16'>
      <Timeline.Item>
        <Timeline.Point icon={HiUser}  />
       
        <Timeline.Content>
          <Timeline.Title>Create Your CV</Timeline.Title>
          <Timeline.Body>
            Build a professional CV tailored to your skills and experiences with our easy-to-use CV creator tool.
          </Timeline.Body>
          <Link to="/">
          <Button color="primary">
            Get Started
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button>
          </Link>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiDocumentText} className="text-black" />
        <Timeline.Content>
          <Timeline.Title>Start Applying for Jobs</Timeline.Title>
          <Timeline.Body>
            Browse through a wide range of job listings and apply directly through our platform to kickstart your career.
          </Timeline.Body>
          <Link to="/">
          <Button color="primary">
            Explore Jobs
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button>
          </Link>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiBriefcase} className="text-black" />
        <Timeline.Content>
          <Timeline.Title>Connect with Employers</Timeline.Title>
          <Timeline.Body>
            Network with industry professionals, recruiters, and potential employers to expand your opportunities.
          </Timeline.Body>
          <Link to="/">
            <Button color="primary">
              Start Networking
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}

export default TimelineC;
