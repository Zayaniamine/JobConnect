import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Footer from './components/UI/footer'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FeaturedCompanies from './components/UI/Companies';
import NewsPage from './pages/NewsPage'; 
import Contact from './pages/contact';
function App() {
  return (
   <div>
    
   

      <Routes>
      
        <Route path="/"  exact element={<Home />} />

        <Route path="/Login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/companies" element={<FeaturedCompanies />} />
        <Route path="/NewsPage" element={<NewsPage />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
      
       <Footer/>
      </div>
     );
}

export default App;
