import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform validation if needed
    // Submit login request to backend
    // Upon successful login, redirect user to appropriate dashboard based on their role

    // Example redirection based on role (replace with your actual logic)
    const userRole = 'candidate'; // Replace with actual role fetched from backend
    switch (userRole) {
      case 'candidate':
        navigate('/candidate/dashboard');
        break;
      case 'employer':
        navigate('/employer/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/');
        break;
    }
  };

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

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className='pb-20'>
      <div className="flex flex-col items-center justify-center pb-20 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img src={logo} width={200} height={250} alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ready to take the next step?
            </h1>
            <h1 className='text-lg font-semibold'>Create an account or sign in.</h1>
            <p className='text-black text-xs '>By creating an account or signing in, you understand and agree to Indeed's <span className='font-bold underline'>Terms</span>. You also acknowledge our <span className='font-bold underline'>Cookie</span> and <span className='font-bold underline'>Privacy</span> policies.</p>
            <div className=' flex  items-center justify-center ' >
            <div className="google-login-wrapper rounded-full overflow-hidden">
            <GoogleLogin
             clientId="YOUR_GOOGLE_CLIENT_ID"
             buttonText="Login with Google"
             onSuccess={responseGoogle}
             onFailure={onFailure}
             cookiePolicy={'single_host_origin'}
             className='w-full font-medium rounded-full text-sm px-5 py-2.5 text-center my-2'
           />
           </div>
             
              </div>
              <h1 className=' flex text-xs font-semibold justify-center'>OR</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            <button type="submit" className="w-full text-black bg-primary-600 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Sign in</button>
                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to="/signup"  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                      </p> 
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
