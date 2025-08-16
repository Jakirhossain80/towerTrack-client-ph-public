import React from "react";
import BannerSlider from './BannerSlider'
import AboutTheBuilding from "./AboutTheBuilding";
import Coupons from "./Coupons";
import LocationAndDirections from "./LocationAndDirections";
import KeyFeatures from "./KeyFeatures";
import ResidentBenefits from "./ResidentBenefits";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Newsletter from "./Newsletter";



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
      <div className="mb-5">
        <KeyFeatures />
      </div>
      <div className="mb-5">
        <Pricing />
      </div>
      <div className="mb-5">
        <ResidentBenefits />
      </div>
      <div className="mb-5">
        <Testimonials />
      </div>
      <div className="mb-5">
        <Newsletter />
      </div>
      
    </>
  );
};

export default Home;
