import React from 'react';
import PropTypes from 'prop-types';

function Navbar(props) {
   return (
      <div>
         <h1>{props.title}</h1>
      </div>
   );
}

Navbar.propTypes = {
   title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
   title: 'Default App'
};

export default Navbar;
