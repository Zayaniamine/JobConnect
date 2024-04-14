import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/UI/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FeaturedCompanies from './components/UI/Companies';
import NewsPage from './pages/NewsPage'; 
import Contact from './pages/contact';
import RegisterForm from './components/forms/RegisterForm';
import CandidateForm from './components/forms/CandidateForm';
import EmployerPage from './pages/EmployerPage';

function App() {
  const location = useLocation();
  
  // Paths where the footer should not be displayed
  const pathsWithoutFooter = ["/Login", "/signup", "/Employer/*","/employer/*"]; // Adjust as needed
  
  // Check if the current path is one of the paths where we don't want the footer
  const showFooter = !pathsWithoutFooter.some(path => 
    path === location.pathname || (path.includes("*") && location.pathname.startsWith(path.replace("/*", "")))
  );

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/companies" element={<FeaturedCompanies />} />
        <Route path="/NewsPage" element={<NewsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/RegisterEmployerForm" element={<RegisterForm />} />
        <Route path="/RegisterCandidateForm" element={<CandidateForm />} />
        <Route path="/Employer/*" element={<EmployerPage/>} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
