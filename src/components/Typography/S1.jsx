import React from "react";
import PropTypes from "prop-types";

const S1 = ({children, className, ...props}) => {
  return <p className={className}>{children}</p>;
};

S1.propTypes = {  
  children: PropTypes.node,  
  className : PropTypes.string
};

S1.defaultProps = {  
  children: null,  
  className: ''
};

export default S1;
