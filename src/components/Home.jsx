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
      <div className="my-10">
        <AboutTheBuilding />
      </div>
      <div className="mb-10">
        <Coupons />
      </div>
      <div className="mb-10">
        <LocationAndDirections />
      </div>
      
    </>
  );
};

export default Home;
