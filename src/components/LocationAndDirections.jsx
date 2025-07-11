// src/components/LocationAndDirections.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaMapSigns, FaRegCopy, FaExternalLinkAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet (important!)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Sample coordinates (can be replaced with dynamic later)
const buildingCoordinates = [23.7806365, 90.4193257]; // Example: Dhaka City Center

const LocationAndDirections = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const address = "TowerTrack Building, Road 10, Block B, Bashundhara, Dhaka 1212";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("📋 Address copied to clipboard!");
  };

  return (
    <section className="bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-20 transition-all duration-500">
      <div className="max-w-screen-lg mx-auto" data-aos="fade-up">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-800 dark:text-gray-200 mb-2 flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-lime-500" />
            Location & Directions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-inter text-base md:text-lg max-w-2xl mx-auto">
            Our building is conveniently located just 5 minutes from City Center Mall and easily accessible from major roads.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Left: Address and Info */}
          <div className="space-y-4 font-inter" data-aos="slide-right">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 font-poppins flex items-center gap-2">
              <FaMapSigns className="text-emerald-500" />
              Full Address
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{address}</p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition-all duration-300"
              >
                <FaRegCopy />
                Copy Address
              </button>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded transition-all duration-300"
              >
                <FaExternalLinkAlt />
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md" data-aos="slide-left">
            <MapContainer
              center={buildingCoordinates}
              zoom={15}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={buildingCoordinates}>
                <Popup>TowerTrack Apartment</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationAndDirections;
