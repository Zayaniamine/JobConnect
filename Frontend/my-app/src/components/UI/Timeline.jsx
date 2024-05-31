import React from 'react';
import { DocumentTextIcon, BriefcaseIcon, UsersIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function Features() {
  const features = [
    {
      name: 'Create Your CV',
      description: 'Build a professional CV tailored to your skills and experiences with our easy-to-use CV creator tool.',
      href: '/login',  // Adjust link based on your routing
      icon: DocumentTextIcon,
    },
    {
      name: 'Start Applying for Jobs',
      description: 'Browse through a wide range of job listings and apply directly through our platform to kickstart your career.',
      href: '/login',  // Adjust link based on your routing
      icon: BriefcaseIcon,
    },
    {
      name: 'Connect with Employers',
      description: 'Network with industry professionals, recruiters, and potential employers to expand your opportunities.',
      href: '/login',  // Adjust link based on your routing
      icon: UsersIcon,
    },
  ];

  return (
    <div className="bg-white   pt-[600px] ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-700">Enhance Your Career</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to advance your career
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From creating your CV to landing your dream job, explore how JobConnect can support your journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-6 w-6 flex-none text-cyan-700" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <Link to={feature.href} className="mt-6 text-sm font-semibold leading-6text-cyan-700">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Features;
