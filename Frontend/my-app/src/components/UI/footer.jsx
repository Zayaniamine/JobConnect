import React from 'react'
import { Footer } from 'flowbite-react';
import logo from '../../assets/logo.webp'
import { Link } from 'react-router-dom';
function footer() {
  const currentYear = new Date().getFullYear();
    return (
         <div className='mt-'>
        <Footer container className=' bottom-0' >

          <div className="w-full text-center mb-0  ">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        
            <Link to="/"  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img   src={logo} width={200} height={250}  alt="logo" />
                
              </Link>
         
              <Footer.LinkGroup>
  <Footer.Link to="/">Home</Footer.Link>
  <Footer.Link to="/about">About</Footer.Link>
  <Footer.Link to="/">Services</Footer.Link>
  <Footer.Link to="/">Products</Footer.Link>
  <Footer.Link to="/companies">Blog</Footer.Link>
  <Footer.Link href="/contact">Contact</Footer.Link>
</Footer.LinkGroup>

              
            </div>
            <Footer.Divider />
            <Footer.Copyright href="#" by="JobConnect" year={currentYear} />
          </div>
        </Footer>
        </div>
      );
  }
  
  export default footer;
  