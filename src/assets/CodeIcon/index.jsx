import React from "react";

const CodeIcon = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      {/* <defs>
        <style>.cls-1{fill:none;stroke:#000;stroke-linejoin:round;stroke-width:2px;}</style>
        </defs>
        <title/> */}
        <g data-name="139-Code" id="_139-Code">
          <polyline points="10 7 1 16 10 25"/>
          <polyline points="22 25 31 16 22 7"/>
          <circle  cx="16" cy="16" r="1"/>
          <circle cx="22" cy="16" r="1"/>
          <circle cx="10" cy="16" r="1"/>
        </g>
    </svg>
  );
};

export default CodeIcon;
