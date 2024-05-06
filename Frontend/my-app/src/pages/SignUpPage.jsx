import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const roles = [
    { id: 'JobSeeker', title: 'JobSeeker' },
    { id: 'Employer', title: 'Employer' },
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({});

    // Client-side validation
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (!role) newErrors.role = 'Role is required.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = {
      email,
      password,
       role,
    };

    try {
      const response = await axios.post('http://localhost:4000/auth/register', user);
      if (response.data.success) {
        sessionStorage.setItem('userId', response.data.userId);
        navigate(role === 'JobSeeker' ? '/RegisterCandidateForm' : '/RegisterEmployerForm');
      } else {
        setErrors({ form: response.data.message || "Unknown error" });
      }
    } catch (error) {
      const responseError = error.response?.data || {};
      setErrors({ form: responseError.error || error.message || 'Unknown error', ...responseError });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img src={logo} width={200} height={250} alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Your Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
              </div>
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
                        checked={role === roleOption.title}
                        onChange={() => setRole(roleOption.title)}
                        className="h-4 w-4 text-black focus:ring-white border-gray-300"
                      />
                      <label htmlFor={roleOption.id} className="ml-3 block text-sm font-medium text-gray-900">
                        {roleOption.title}
                      </label>
                    </div> 
                  ))}
                </div>
              </div>
              {errors.form && <div  className="text-red-500  text-sm text-left">
                
                {errors.form}
               
                </div>}

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
