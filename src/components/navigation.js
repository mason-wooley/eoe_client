import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from './authentication_button';
import AuthUser from '../contexts/auth_user.js';

function Navigation(props) {
  const [user] = useContext(AuthUser);

  const buildApplicationLink = () => {
    // If the user permissions exist and they include "view:applications"
    if (user.permissions != null && user.permissions.includes("view:applications")) {
      return <Link className="nav-link" to="/applications">Applications</Link>;
    }
    return null;
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1" to="/">Envy of Eden</span>

        <Link className="nav-link" to="/">Home</Link>

        <Link className="nav-link" to="/about">About</Link>

        <Link className="nav-link" to="/apply">Apply</Link>

        {buildApplicationLink()}

        <AuthenticationButton />
    </nav>
  );
}

export default Navigation;