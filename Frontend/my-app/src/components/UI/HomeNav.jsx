import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';

function HomeNav() {
 



  return (
    <div className={`navbar bg-white text-black sticky w-full z-50 top-0`}>
      <div className="navbar-start">
        <Link to="/" className="  text-xl absolute top-[-29px] left-0">
        <img  src={logo} width={200} height={250} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/companies">Companies</Link></li>
          <li><Link to="/NewsPage">News</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="mr-10" to="/Login">login</Link>
        <Link className=" mr-3" to="/signup">Post job  |  find Job</Link>
      </div>
    </div>
  );
}

export default HomeNav;
