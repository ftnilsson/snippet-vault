import React from "react";
import PropTypes from "prop-types";

const H2 = ({children, className, ...props}) => { 
  return <h2 className={className}>{children}</h2>;
};

H2.propTypes = {  
  children: PropTypes.node,  
  className : PropTypes.string
};

H2.defaultProps = {  
  children: null,  
  className: ''
};

export default H2;
