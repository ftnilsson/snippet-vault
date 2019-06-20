import React from "react";
import PropTypes from "prop-types";

const S2 = ({children, className, ...props}) => {
  return <p className={className}>{children}</p>;
};

S2.propTypes = {  
  children: PropTypes.node,  
  className : PropTypes.string
};

S2.defaultProps = {  
  children: null,  
  className: ''
};

export default S2;
