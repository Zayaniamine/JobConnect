import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.webp';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Job Seeker');  // Default role is "Job Seeker"
  const navigate = useNavigate();

  const roles = [
    { id: 'Job Seeker', title: 'Job Seeker' },
    { id: 'Employer', title: 'Employer' },
  ];

  const handleSignup = async (e) => {
    e.preventDefault();

    /*if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        email,
        password,
        role,
      });

      if (response.data.success) {*/
        if (role === 'Job Seeker') {
          navigate('/RegisterCandidateForm');
        } else if (role === 'Employer') {
          navigate('/registerEmployerForm');
        }
        /*
      } else {
        alert('Signup failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || 'An error occurred');
      alert('An error occurred: ' + (error.response?.data?.message || 'Unknown error'));
    }*/
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src={logo} alt="logo" width={200} height={250} />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Your Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              {/* Role Selection */}
              <div>
                <label className="text-base font-semibold text-gray-900">User Role</label>
                <p className="text-sm text-gray-500">Are you a:</p>
                <div className="mt-4 flex space-x-4">
                  {roles.map((roleOption) => (
                    <div key={roleOption.id} className="flex items-center">
                      <input
                        id={roleOption.id}
                        name="role"
                        type="radio"
                        checked={role === roleOption.id}
                        onChange={() => setRole(roleOption.id)}
                        className="h-4 w-4 text-black focus:ring-white border-gray-300"
                      />
                      <label htmlFor={roleOption.id} className="ml-3 block text-sm font-medium text-gray-900">
                        {roleOption.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Submit Button */}
              <button type="submit" className="w-full text-white bg-slate-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
