import React from "react";

const DeleteIcon = ({ className }) => {
  return (
    <svg
      id="delete_svg"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.06,64l-.16-2.72L8.7,19.39h5.75L16.5,58.25h31l2-38.86H55.3L53,64H11.06ZM44.22,0V7.19H60v5.75H4V7.19H19.78V0ZM24.81,7.19H39.19V3.6H24.81Zm3.72,46.37L27.8,19.39h-5l.73,34.17Zm11.86,0,.73-34.17h-5l-.73,34.17Z"
        id="compound_Path"
      />
    </svg>
  );
};

export default DeleteIcon;
