import React from "react";
import { ArrowLeft } from "lucide-react";
import Wrapper from "../../components/Wrapper";
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";
import { useNavigate } from 'react-router-dom'

const UserDetails = () => {
  const propertyDetails = [
    {
      label: "Property Type",
      value: "Single Family Home",
    },
    {
      label: "Location",
      value: "123 Maple Street, Anytown, USA",
    },
    {
      label: "Bedrooms",
      value: "5",
    },
    {
      label: "Bathrooms",
      value: "2",
    },
    {
      label: "Square Footage",
      value: "1,850 sq ft",
    },
    {
      label: "Lot Size",
      value: "0.25 acres",
    },
    {
      label: "Year Built",
      value: "2005",
    },
    {
      label: "Parking",
      value: "2-Car Garage",
    },
  ];

  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className={`mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 ${fontFamily.main}`}>

        {/* Header */}
        <div className="mb-4">
            <div className="flex items-center gap-4">
                <div> <ArrowLeft size={15} className="cursor-pointer"
                    onClick={() => navigate(-1)}
                /></div>
                <div>
                    <h1 className="font-bold  text-[#171212]">George A. James</h1>
                </div>
            </div>

          <p className="mt-1 ml-5  text-gray-400">
            Joined on 10th September, 2025
          </p>
        </div>

        {/* Property Image */}
        <div className="overflow-hidden rounded-md">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Property"
            className="h-[230px] w-full object-cover sm:h-[300px] lg:h-[360px]"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="mb-2  font-bold text-gray-900">
            Description
          </h3>

          <p className="max-w-4xl  leading-5 text-gray-500">
            This charming single-family home features 3 bedrooms, 2 bathrooms,
            and a spacious living area. The property includes a modern kitchen,
            a large backyard, and a two-car garage. Located in a quiet
            neighborhood with easy access to local amenities and schools.
          </p>
        </div>

        {/* Property Details */}
        <div className="mt-5">
          <h3 className="mb-3  font-bold text-gray-900">
            Property Details
          </h3>

          <div className="border-t border-gray-100">
            {Array.from({ length: 4 }).map((_, rowIndex) => {
              const left = propertyDetails[rowIndex * 2];
              const right = propertyDetails[rowIndex * 2 + 1];

              return (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 border-b border-gray-100 sm:grid-cols-2"
                >
                  {/* Left */}
                  <div className="py-3 pr-6">
                    <p className="mb-1  text-gray-400">
                      {left.label}
                    </p>

                    <p className=" font-medium text-gray-700">
                      {left.value}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="py-3 sm:pl-6">
                    <p className="mb-1  text-gray-400">
                      {right.label}
                    </p>

                    <p className=" font-medium text-gray-700">
                      {right.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserDetails;