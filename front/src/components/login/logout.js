import React from 'react';
//import { NavLink } from 'react-router-dom';
//import Navbar from '../Navbar';
//import Log from './index.log';

function Logout() {
  
  //console.log(localStorage);
  localStorage.clear();
  window.location = "/";
  console.log(localStorage);

  return (
    <li></li>
  );

}

export default Logout;
