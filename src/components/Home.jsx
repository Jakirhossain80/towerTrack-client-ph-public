import React from "react";
import BannerSlider from './BannerSlider'
import AboutTheBuilding from "./AboutTheBuilding";
import Coupons from "./Coupons";
import LocationAndDirections from "./LocationAndDirections";



const Home = () => {
 
  return (
    <>

      <div className="my-5">
        <BannerSlider />
      </div>
      <div className="mb-5">
        <AboutTheBuilding />
      </div>
      <div className="mb-5">
        <Coupons />
      </div>
      <div className="mb-5">
        <LocationAndDirections />
      </div>
      
    </>
  );
};

export default Home;
