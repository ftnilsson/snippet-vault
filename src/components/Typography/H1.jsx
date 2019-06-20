import React from "react";
import PropTypes from "prop-types";

const H1 = ({children, className, ...props}) => {
  return <h1 className={className}>{children}</h1>;
};

H1.propTypes = {  
  children: PropTypes.node,  
  className : PropTypes.string
};

H1.defaultProps = {  
  children: null,  
  className: ''
};

export default H1;
