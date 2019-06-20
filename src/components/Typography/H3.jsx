import React from "react";
import PropTypes from "prop-types";

const H3 = ({children, className, ...props}) => {
  return <h3 className={className}>{children}</h3>;
};

H3.propTypes = {  
  children: PropTypes.node, 
  className : PropTypes.string 
};

H3.defaultProps = {  
  children: null,  
  className: ''
};

export default H3;
