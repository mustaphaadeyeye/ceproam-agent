import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import {
  Minus,
  Plus,
  MapPin,
} from "lucide-react";
import { fontFamily } from "../../styles/theme";
import checkersImg from "../../assets/images/checkers.png";
import { useNavigate } from "react-router-dom";


const PropertyDetails = () => {
  const [listingType, setListingType] = useState("sale");
  const [units, setUnits] = useState(1);
    
 const navigate = useNavigate();
  const handleMediaUpload = () =>{
    navigate("/media-upload")
  }

  return (
    <Wrapper>
      <div className={`py-8 ${fontFamily.main}`}>

        {/* Stepper */}

        <div className="flex justify-center items-center mb-10">

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <p className="text-xs mt-2 font-medium text-[#182C7A]">
              Property Details
            </p>
          </div>

          <div className="w-16 md:w-24 h-[2px] bg-gray-200 mx-2 mb-6" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#E8EEF9] text-[#182C7A] flex items-center justify-center text-sm">
              2
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Media Upload
            </p>
          </div>

          <div className="w-16 md:w-24 h-[2px] bg-gray-200 mx-2 mb-6" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#E8EEF9] text-[#182C7A] flex items-center justify-center text-sm">
              3
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Review & Publish
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2 bg-white rounded-xl p-8">

            <h2 className="font-semibold text-lg mb-8">
              Basic Information
            </h2>

            {/* Property Name */}

            <div className="mb-6">

              <label className="text-sm font-medium block mb-2">
                Property Name
              </label>

              <input
                type="text"
                placeholder="e.g. The Zenith Heights Luxury Penthouse"
                className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none"
              />

            </div>

            {/* Category */}

            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>

                <label className="text-sm font-medium block mb-2">
                  Category
                </label>

                <select className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none">

                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Land</option>

                </select>

              </div>

              <div>

                <label className="text-sm font-medium block mb-2">
                  Status
                </label>

                <div className="grid grid-cols-2 bg-[#F7F9FC] rounded-lg p-1">

                  <button
                    onClick={() => setListingType("sale")}
                    className={`h-10 rounded-lg text-sm transition ${
                      listingType === "sale"
                        ? "bg-[#182C7A] text-white"
                        : "text-gray-500"
                    }`}
                  >
                    For Sale
                  </button>

                  <button
                    onClick={() => setListingType("rent")}
                    className={`h-10 rounded-lg text-sm transition ${
                      listingType === "rent"
                        ? "bg-[#182C7A] text-white"
                        : "text-gray-500"
                    }`}
                  >
                    For Rent
                  </button>

                </div>

              </div>

            </div>

            {/* Price */}

            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div>

                <label className="text-sm font-medium block mb-2">
                  Price
                </label>

                <input
                  placeholder="₦ 0.0"
                  className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none"
                />

              </div>

              <div>

                <label className="text-sm font-medium block mb-2">
                  Unit Available
                </label>

                <div className="bg-[#F7F9FC] rounded-lg h-12 flex justify-center items-center gap-8">

                  <button
                    onClick={() =>
                      setUnits((prev) => Math.max(1, prev - 1))
                    }
                  >
                    <Minus size={18} />
                  </button>

                  <span>{units}</span>

                  <button
                    onClick={() => setUnits((prev) => prev + 1)}
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </div>

            </div>

            {/* Description */}

            <div className="mb-8">

              <label className="text-sm font-medium block mb-2">
                Description
              </label>

              <textarea
                rows={4}
                placeholder="Brief description of property"
                className="w-full bg-[#F7F9FC] rounded-lg p-4 outline-none resize-none"
              />

            </div>

            <h2 className="font-semibold text-lg mb-6">
              Location
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="text-sm font-medium block mb-2">
                  Country
                </label>

                <input
                  className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none"
                />

              </div>

              <div>

                <label className="text-sm font-medium block mb-2">
                  State
                </label>

                <input
                  className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none"
                />

              </div>

            </div>

          </div>

          {/* Preview */}

          <div className="bg-white rounded-xl p-6 h-fit sticky top-6">

            <h3 className="font-semibold text-center mb-5">
              Preview
            </h3>

            <div className="w-full h-56 rounded-lg bg-gray-200 overflow-hidden">

              <img
                src={checkersImg}
                alt=""
                className="w-full h-full object-cover"
              />

            </div>

            <div className="flex justify-between mt-5 text-xs">

              <span className="text-[#182C7A] font-medium">
                ● For Sale
              </span>

              <span className="text-[#05062F]">
                Available
              </span>

            </div>

            <h3 className="font-semibold text-lg mt-3">
              Luxury 3-Bedroom Apartment
            </h3>

            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">

              <MapPin size={15} />

              <span>Ajah, Lagos Coastal Area</span>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              3 Bedrooms, 3 Bathrooms, 250 sqm,
              Parking Available
            </p>

            <div className="mt-6">

              <p className="text-sm text-gray-500">
                Price:
              </p>

              <h2 className="text-3xl font-bold text-[#182C7A]">
                N50,000
              </h2>

            </div>

            <button className="w-full h-12 rounded-lg bg-[#182C7A] text-white mt-8 cursor-pointer"
            onClick={handleMediaUpload}
            >
              Continue
            </button>

          </div>

        </div>

      </div>
    </Wrapper>
  );
};

export default PropertyDetails;
