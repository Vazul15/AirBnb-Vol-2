import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="flex-1">
      <Link to="/" className="flex items-center ">
        <img
          src="/src/assets/restmates.svg"
          alt="RESTMates Logo"
          className="w-16 h-16 mr-2 animate-fade animate-duration-[5000ms]"
        />
        <span className="text-xl normal-case animate-fade animate-duration-[5000ms]">
          RESTMates
        </span>
      </Link>
    </div>
  );
};

export default Logo;
