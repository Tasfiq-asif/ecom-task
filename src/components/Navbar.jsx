import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../providers/AuthProviders";


const Navbar = () => {

  const { user, logOut } = useContext(authContext);
  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
    return (
      <div><div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">All Items</Link></li>
              <li><Link to="/additem">Add Items</Link></li>
              <li><Link to="/myitems">My Items</Link></li>
      </ul>
    </div>
    <Link to={'/'} className="btn btn-ghost text-xl">Artsio</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/allitems">All Items</NavLink></li>
            <li><NavLink to="/additems">Add Items</NavLink></li>
            <li><NavLink to="/myitems">My Items</NavLink></li>
    </ul>
    
  </div>
 
   <div className="navbar-end">
    
   
    {user?<button onClick={()=>handleSignOut()} className="btn">Log out</button> : <div><Link className="btn" to={'/login'}>LogIn</Link> <Link className="btn" to={'/register'}>Register</Link></div> }
  </div>
  
</div></div>
  );
};

export default Navbar;