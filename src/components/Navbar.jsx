import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { signContext } from "../App";

import { addEmail, removeEmail } from "../redux/signSlice";
import { useDispatch } from "react-redux";


export const Navbar=()=>
{
   
    const {signstate, setSign}= useContext(signContext);

    const dispatch=useDispatch();

    useEffect(()=>{
      if(localStorage.getItem("email")!==null)
      {
        const email=JSON.parse(localStorage.getItem("email"));
        dispatch(addEmail(email));
      }
    },[])

    const logoutFunc=()=>
    {
        localStorage.removeItem("email");
        setSign(false);
        dispatch(removeEmail());
        
    }

    return <>
    <header className="bg-purple-800 text-yellow-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* App Name */}
        <div className="text-2xl font-bold">
          Occasio
        </div>

        {/* Search Bar */}
       { signstate && <div className="hidden md:flex items-center w-full max-w-md mx-4">
          <input
            type="text"
            placeholder="Search events here"
            className="w-full px-4 py-2 rounded-lg text-purple-800 bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        }

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/signin" onClick={logoutFunc} className="hover:text-yellow-400 transition">
             {signstate? "Log out": "Log In"}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-yellow-300 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
    </>
}