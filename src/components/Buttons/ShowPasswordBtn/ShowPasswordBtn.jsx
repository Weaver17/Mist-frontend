import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./ShowPasswordBtn.css";

const ShowPasswordBtn = ({ showPassword, setShowPassword }) => {
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <button type="button" className="show-pass-btn">
      {showPassword ? (
        <FaEye onClick={togglePassword} />
      ) : (
        <FaEyeSlash onClick={togglePassword} />
      )}
    </button>
  );
};

export default ShowPasswordBtn;
