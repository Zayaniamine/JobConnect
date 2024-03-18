import logo from '../../assets/logo.png'
import './navbar.css'

export default function NavB() {
 
  return (
    
<div className="navbar bg-base-100 h-1">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className=""> <img  src={logo} width={170} height={200}/></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>News</a></li>
      <li><a>Job Offers</a></li>
      <li><a>About</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
  <details className="dropdown mr-2.5 ">
  <summary className="m-1 btn"> Sign up as</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-">
    <li><a>Employer</a></li>
    <li><a>candidate</a></li>
  </ul>
</details>


    <a className="btn mr-3">Login</a>
   
   
    
   
    </div>
  
</div>
  
    )
}
