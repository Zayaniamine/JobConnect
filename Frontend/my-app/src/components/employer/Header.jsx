import {React} from "react";
import { Navbar } from "flowbite-react";
import logo from '../../assets/logo.webp';
import { PlusIcon} from '@heroicons/react/solid';
import { Link } from "react-router-dom";

function Header({ toggleSidebar}) {



  
 
  return (
    <Navbar  fluid rounded className="fixed top-0 z-50 w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <Navbar.Brand as={Link} to="/" >
     
        <img src={logo} height={200} width={200} className="absolute top-[-35px] " alt="" />
      </Navbar.Brand >
      <div className="flex md:order-2">
       <Link to="/Employer/create-job-offer" >
        <button
          type="button"
        
          className="inline-flex items-center gap-x-1.5 rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon  className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          New Job
        </button>
        </Link>
        <Navbar.Toggle onClick={toggleSidebar} />
      </div>
    </Navbar>
  );
}

export default Header;
