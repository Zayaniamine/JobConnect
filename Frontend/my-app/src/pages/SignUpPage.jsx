import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { GoogleLogin } from 'react-google-login';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // Default role is candidate
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    // Extract token and user information from response
    // Perform your backend authentication here
    // Navigate user based on role similar to handleLogin
  };

  const onFailure = (error) => {
    console.log(error);
    // Handle errors or failed login attempts here
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here
    // Include 'role' in the signup request to differentiate between candidate and employer
    console.log('Signup details:', { email, password, role });
    // Redirect after successful signup
    navigate('/dashboard');
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/"  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img   src={logo} width={200} height={250}  alt="logo" />
                
              </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create an account
                  </h1>
                  <div className=' flex  items-center justify-center ' >
            <div className="google-login-wrapper rounded-full overflow-hidden">
            <GoogleLogin
             clientId="YOUR_GOOGLE_CLIENT_ID"
             buttonText="sign up with Google"
             onSuccess={responseGoogle}
             onFailure={onFailure}
             cookiePolicy={'single_host_origin'}
             className='w-full font-medium rounded-full text-sm px-5 py-2.5 text-center my-2'
           />
           </div>
             
              </div>
              <h1 className=' flex text-xs font-semibold justify-center'>OR</h1>

                  <form className="space-y-4 md:space-y-6 pt5" onSubmit={handleSignup}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <div className='pb-5'>
                          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                          <select name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " value={role} onChange={(e) => setRole(e.target.value)} required>
                              <option value="candidate">Candidate</option>
                              <option value="employer">Employer</option>
                          </select>
                      </div>
                      <Link to="/signup">
                      <button type="submit" className="w-full black bg-primary-600 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Sign up</button>

                      </Link>
                    
                  </form>

              </div>
          </div>
      </div>
    </section>
  );
};

export default SignUpPage;