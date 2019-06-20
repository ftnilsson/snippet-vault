import React from "react";
import PropTypes from "prop-types";

const H4 = ({children, className, ...props}) => {
  return <h4 className={className}>{children}</h4>;
};

H4.propTypes = {  
  children: PropTypes.node,  
  className : PropTypes.string
};

H4.defaultProps = {  
  children: null,  
  className: ''
};

export default H4;
