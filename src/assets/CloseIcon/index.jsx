import React from "react";

const CloseIcon = ({ className, ...props }) => {

  const {onClick} = props;
  return (
    <svg  onClick={onClick} className={className} 
      viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="11" x2="11" y2="1" />
      <line x1="1" y1="1" x2="11" y2="11" />
    </svg>
  );
};

export default CloseIcon;
