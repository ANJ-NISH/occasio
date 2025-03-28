import React, { createContext, useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import './index.css'

import { Navbar } from './components/Navbar'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

import { store } from './redux/store';
import {Provider} from 'react-redux';


export const signContext= createContext();

export const searchContext=createContext();

function App() {

  let flag=false;
  if(localStorage.getItem("loginStatus"))
  {
    let value=JSON.parse(localStorage.getItem("loginStatus"));
    flag=value;
  }
  const [signstate, setSign]=useState(flag || false);

  const [searchtext, setSearch]=useState("");

  useEffect(()=>{
    localStorage.setItem('loginStatus',signstate);
  },[signstate])

  return (
    <>
    <Provider store={store}>
    <signContext.Provider value={{signstate, setSign}}>
    <searchContext.Provider value={{searchtext, setSearch}}>
    <BrowserRouter>
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </searchContext.Provider>
    </signContext.Provider>
    </Provider>
    </>
  )
}

export default App
