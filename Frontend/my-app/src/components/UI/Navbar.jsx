import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function NavBar() {
  return (
    <div className="navbar bg-base-100 h-1 sticky">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/companies">Companies</Link></li>
            <li><Link to="/news">News</Link></li>
          </ul>
        </div>
        <Link to="/">
          <img src={logo} width={170} height={200} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/companies">Companies</Link></li>
          <li><Link to="/NewsPage">News</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="btn mr-3" to="/Login">login</Link>
        <Link className="btn mr-3" to="/signup">Post job  |  find Job</Link>
      </div>
    </div>
  );
}

export default NavBar;
