// LoadingSpinner.js
import React from 'react';

function LoadingSpinner() {
    return (
        <div role="status" className='absolute top-[50%] left-[50%]'>
           <span className="loading loading-ring loading-lg"></span>
        </div>
    );
}

export default LoadingSpinner;
