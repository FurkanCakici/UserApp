import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Navbar(props) {
   const { title } = props;
   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a href="/" className="navbar-brand"><h3>{title}</h3></a>
         <ul className="nav m-auto" >
            <li className="nav-item">
               <Link to="/" className="nav-link"> <h4> HOME </h4></Link>
            </li>
            <li className="nav-item">
               <Link to="/add" className="nav-link"> <h4>ADD USER </h4></Link>
            </li>
         </ul>
      </nav>
   );
}

Navbar.propTypes = {
   title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
   title: 'Default App'
};

export default Navbar;
