import React from 'react';

export default function SubmissionSuccess() {
  return (
    <>
      {/* Ensure the HTML and body tags in your public/index.html are set like this for proper full-page styling:
        <html class="h-full">
        <body class="h-full">
      */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-cyan-800">Success</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Application Submitted Successfully!</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Thank you for submitting your application. We will review it and contact you shortly.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/JobSeeker/"
              className="rounded-md bg-cyan-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Go to Dashboard
            </a>
            
          </div>
        </div>
      </main>
    </>
  );
}
