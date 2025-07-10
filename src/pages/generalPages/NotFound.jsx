import React from "react";
import { Link } from "react-router-dom";
import LottieAnimation from "../../utils/LottieAnimation";

const NotFound = () => {

  //Have used reuseable component. 
  
  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-[450px] flex flex-col items-center justify-center px-4 py-12 my-10 text-center transition-all duration-500">
      <LottieAnimation 
        src="/error-lime.json"
        width="800px"
        height="500px"
      />

      <Link
        to="/"
        className="bg-lime-500 text-white px-6 py-2 mt-6 rounded hover:bg-lime-600 transition-all duration-500"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
