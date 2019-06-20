import React from "react";

const BackArrowIcon = ({ className, ...props}) => {
  const {onClick} = props
  return (
    <svg onClick={onClick}
      className={className}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
    </svg>
  );
};

export default BackArrowIcon;
