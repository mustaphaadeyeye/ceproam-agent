import Wrapper from "../../components/Wrapper";
import { fontFamily } from "../../styles/theme";
import checkersImg from "../../assets/images/checkers.png";

const ReviewPublish = () => {
  const property = {
    title: "Luxury Apartment",
    subtitle: "Single family Home",
    image: checkersImg,
    description:
      "This charming single-family home features 4 bedrooms, 2 bathrooms, and a spacious living area. The property includes a modern kitchen, a large backyard, and a two-car garage. Located in a quiet neighborhood with easy access to local amenities and schools.",
    propertyType: "Single Family Home",
    location: "123 Maple Street, Anytown, USA",
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: "1,800 sqft",
    lotSize: "0.25 acres",
    yearBuilt: 2005,
    parking: "2-Car Garage",
    purchasePrice: "$350,000",
    propertyTaxes: "$3,500",
  };

  return (
    <Wrapper>
      <div className={`py-8 ${fontFamily.main}`}>

        {/* Stepper */}

        <div className="flex justify-center items-center mb-10">

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
              ✓
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Property Details
            </p>
          </div>

          <div className="w-16 md:w-24 h-[2px] bg-[#182C7A] mx-2 mb-6" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
              ✓
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Media Upload
            </p>
          </div>

          <div className="w-16 md:w-24 h-[2px] bg-[#182C7A] mx-2 mb-6" />

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
              ✓
            </div>
            <p className="text-xs mt-2 font-medium text-[#182C7A]">
              Review & Publish
            </p>
          </div>

        </div>

        {/* Card */}

        <div className="bg-white rounded-xl p-8">

          {/* Header */}

          <div className="flex justify-between items-start mb-6">

            <div>
              <h2 className="font-semibold text-lg">
                {property.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {property.subtitle}
              </p>
            </div>

            <button className="bg-[#182C7A] text-white text-sm px-6 h-9 rounded-lg">
              Upload
            </button>

          </div>

          {/* Hero image */}

          <div className="w-full h-64 rounded-xl overflow-hidden mb-8">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}

          <h3 className="font-semibold text-sm mb-2">
            Description
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            {property.description}
          </p>

          {/* Property Details */}

          <h3 className="font-semibold text-sm mb-4">
            Property Details
          </h3>

          <div className="grid md:grid-cols-2 gap-x-10">

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Property Type</p>
                <p className="text-sm font-medium mt-1">{property.propertyType}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-sm font-medium mt-1">{property.location}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Bedrooms</p>
                <p className="text-sm font-medium mt-1">{property.bedrooms}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Bathrooms</p>
                <p className="text-sm font-medium mt-1">{property.bathrooms}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Square Footage</p>
                <p className="text-sm font-medium mt-1">{property.squareFootage}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Lot Size</p>
                <p className="text-sm font-medium mt-1">{property.lotSize}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Year Built</p>
                <p className="text-sm font-medium mt-1">{property.yearBuilt}</p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Parking</p>
                <p className="text-sm font-medium mt-1">{property.parking}</p>
              </div>
            </div>

          </div>

          {/* Financial Information */}

          <h3 className="font-semibold text-sm mt-6 mb-4">
            Financial Information
          </h3>

          <div className="grid md:grid-cols-2 gap-x-10">

            <div className="flex justify-between py-4">
              <div>
                <p className="text-xs text-gray-400">Purchase Price</p>
                <p className="text-sm font-medium mt-1">{property.purchasePrice}</p>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <div>
                <p className="text-xs text-gray-400">Property Taxes (Annual)</p>
                <p className="text-sm font-medium mt-1">{property.propertyTaxes}</p>
              </div>
            </div>

          </div>

          {/* Delete button */}

          <div className="flex justify-end mt-6">
            <button className="bg-red-500 text-white text-sm px-6 h-10 rounded-lg">
              Delete Property
            </button>
          </div>

        </div>

      </div>
    </Wrapper>
  );
};

export default ReviewPublish;
