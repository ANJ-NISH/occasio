import React, { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { signContext } from '../App';

import { addEmail } from '../redux/signSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {

  const dispatch=useDispatch();
  const {signstate, setSign}=useContext(signContext); 
  
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here (e.g., form validation, API call)
    
    if(localStorage.getItem('signupArr')===null)
    {
        alert("user doesn't exist. Sign up.");
        return;
    }
    else
    {
        let signupArr=JSON.parse(localStorage.getItem('signupArr'));

        for(let detail of signupArr)
        {
            if(detail.email===formData.email && detail.password===formData.password)
            {
                
                setSign(true);
                localStorage.setItem('email',JSON.stringify(formData.email));
                dispatch(addEmail(formData.email));
                navigate('/dashboard');
                return;
            }
            else if(detail.email===formData.email && detail.password!==formData.password)
            {
                alert("User credential are wrong. Try Again.");
                return; 
            }
        }

        alert("You don't have an account. Sign up.");
        return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-2 border-purple-300">
        <h2 className="text-center text-3xl font-semibold text-purple-800">
          Sign In
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-lg text-gray-800 bg-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 text-lg text-gray-800 bg-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-lg font-semibold text-white bg-purple-800 rounded-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-500">
            Don't have an account?{' '}
            <Link to="/" className="text-yellow-300 hover:text-yellow-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
