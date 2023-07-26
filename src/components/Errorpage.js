import React from 'react';
import {NavLink} from 'react-router-dom';
const Errorpage = () => {
  return (
    <>
      <div id="notfound">
        <h2>404: Sorry! Page Not Found</h2>
      </div>
      <NavLink to="/">Home Page</NavLink>
    </>
  )
}

export default Errorpage
