import React from "react";
import BannerSlider from './BannerSlider'
import AboutTheBuilding from "./AboutTheBuilding";



const Home = () => {
 
  return (
    <>

      <div className="my-5">
        <BannerSlider />
      </div>
      <div className="mt-20 mb-32">
        <AboutTheBuilding />
      </div>
      
    </>
  );
};

export default Home;
