import { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import { Minus, Plus, MapPin } from "lucide-react";
import { fontFamily } from "../../styles/theme";
import checkersImg from "../../assets/images/checkers.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("id");

  // Fetch existing property details if in edit mode
  const { data: existingProperty } = useQuery({
    queryKey: ["property-edit-details", propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const res = await api.get(`/properties/${propertyId}`);
      return res?.data ?? res;
    },
    enabled: !!propertyId,
  });

  const [form, setForm] = useState({
    title: "",
    category: "Residential",
    status: "ACTIVE",
    price: "",
    bedrooms: 3,
    bathrooms: 2,
    area: 250,
    description: "",
    location: "",
    listingType: "SALE",
  });

  // Populate form when existing property data loads
  useEffect(() => {
    if (existingProperty) {
      setForm({
        title: existingProperty.title || "",
        category: existingProperty.category || "Residential",
        status: existingProperty.status || "ACTIVE",
        price: existingProperty.price || "",
        bedrooms: existingProperty.bedrooms ?? 3,
        bathrooms: existingProperty.bathrooms ?? 2,
        area: existingProperty.area ?? 250,
        description: existingProperty.description || "",
        location: existingProperty.location || "",
        listingType: existingProperty.listingType || "SALE",
      });

      sessionStorage.setItem(
        "edit_existing_media",
        JSON.stringify({
          cover:
            existingProperty.coverImage ||
            existingProperty.images?.[0] ||
            null,
          images: existingProperty.images || [],
          videos: existingProperty.videos || [],
        })
      );
    }
  }, [existingProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaUpload = () => {
    sessionStorage.setItem("new_property_form", JSON.stringify(form));
    navigate(`/app/media-upload${propertyId ? `?id=${propertyId}` : ""}`);
  };

  return (
    <Wrapper>
      <div className={`w-full py-4 sm:py-6 md:py-8 ${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
        
        {/* ================= STEPPER ================= */}
        <div className="w-full flex justify-center items-start mb-8 sm:mb-10 px-2">
          <div className="flex items-start w-full max-w-2xl">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm font-semibold">
                1
              </div>

              <p className="text-[10px] sm:text-xs mt-2 font-medium text-[#182C7A] text-center whitespace-nowrap">
                Property Details
              </p>
            </div>

            {/* Line */}
            <div className="flex-1 h-[2px] bg-gray-200 mx-2 sm:mx-4 mt-4" />

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#E8EEF9] text-[#182C7A] flex items-center justify-center text-sm">
                2
              </div>

              <p className="text-[10px] sm:text-xs mt-2 text-gray-500 text-center whitespace-nowrap">
                Media Upload
              </p>
            </div>

            {/* Line */}
            <div className="flex-1 h-[2px] bg-gray-200 mx-2 sm:mx-4 mt-4" />

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#E8EEF9] text-[#182C7A] flex items-center justify-center text-sm">
                3
              </div>

              <p className="text-[10px] sm:text-xs mt-2 text-gray-500 text-center whitespace-nowrap">
                Review & Publish
              </p>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          
          {/* ================= LEFT FORM ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm min-w-0">
            
            <h2 className="font-semibold text-base sm:text-lg mb-6 sm:mb-8">
              {propertyId ? "Edit Property Details" : "Basic Information"}
            </h2>

            {/* Property Name */}
            <div className="mb-5 sm:mb-6">
              <label className="text-sm font-medium block mb-2">
                Property Name
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. The Zenith Heights Luxury Penthouse"
                className="w-full bg-[#F7F9FC] rounded-lg h-11 sm:h-12 px-4 outline-none text-sm"
              />
            </div>

            {/* Category + Listing Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
              
              {/* Category */}
              <div className="min-w-0">
                <label className="text-sm font-medium block mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-[#F7F9FC] rounded-lg h-11 sm:h-12 px-4 outline-none text-sm cursor-pointer"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              {/* Listing Type */}
              <div className="min-w-0">
                <label className="text-sm font-medium block mb-2">
                  Listing Type
                </label>

                <div className="grid grid-cols-2 bg-[#F7F9FC] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        listingType: "SALE",
                      }))
                    }
                    className={`h-9 sm:h-10 rounded-lg text-xs sm:text-sm transition cursor-pointer ${
                      form.listingType === "SALE"
                        ? "bg-[#182C7A] text-white"
                        : "text-gray-500"
                    }`}
                  >
                    For Sale
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        listingType: "RENT",
                      }))
                    }
                    className={`h-9 sm:h-10 rounded-lg text-xs sm:text-sm transition cursor-pointer ${
                      form.listingType === "RENT"
                        ? "bg-[#182C7A] text-white"
                        : "text-gray-500"
                    }`}
                  >
                    For Rent
                  </button>
                </div>
              </div>
            </div>

            {/* Price + Bedrooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
              
              {/* Price */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Price (₦)
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="50000000"
                  className="w-full bg-[#F7F9FC] rounded-lg h-11 sm:h-12 px-4 outline-none text-sm"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Bedrooms
                </label>

                <div className="bg-[#F7F9FC] rounded-lg h-11 sm:h-12 flex justify-between items-center px-4">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        bedrooms: Math.max(1, p.bedrooms - 1),
                      }))
                    }
                    className="cursor-pointer p-1"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="text-sm font-medium">
                    {form.bedrooms}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        bedrooms: p.bedrooms + 1,
                      }))
                    }
                    className="cursor-pointer p-1"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-7 sm:mb-8">
              <label className="text-sm font-medium block mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of property"
                className="w-full bg-[#F7F9FC] rounded-lg p-4 outline-none resize-none text-sm"
              />
            </div>

            {/* Location */}
            <h2 className="font-semibold text-base sm:text-lg mb-5 sm:mb-6">
              Location
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Full Address / Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Victoria Island, Lagos"
                  className="w-full bg-[#F7F9FC] rounded-lg h-11 sm:h-12 px-4 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* ================= PREVIEW ================= */}
          <div className="bg-white rounded-xl p-4 sm:p-6 h-fit lg:sticky lg:top-6 shadow-sm min-w-0">
            
            <h3 className="font-semibold text-center mb-5">
              Preview
            </h3>

            {/* Preview Image */}
            <div className="w-full h-48 sm:h-56 rounded-lg bg-gray-200 overflow-hidden">
              <img
                src={checkersImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Listing + Status */}
            <div className="flex justify-between items-center gap-3 mt-5 text-xs">
              <span className="text-[#182C7A] font-medium">
                ● For {form.listingType}
              </span>

              <span className="text-[#05062F]">
                Available
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mt-3 break-words">
              {form.title || "Luxury Apartment"}
            </h3>

            {/* Location */}
            <div className="flex items-start gap-1 text-sm text-gray-500 mt-2 min-w-0">
              <MapPin size={15} className="flex-shrink-0 mt-0.5" />

              <span className="break-words">
                {form.location || "Lagos, Nigeria"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 sm:mt-6">
              <p className="text-sm text-gray-500">
                Price:
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#182C7A] break-all">
                ₦{Number(form.price || 0).toLocaleString()}
              </h2>
            </div>

            {/* Continue */}
            <button
              type="button"
              className="w-full h-11 sm:h-12 rounded-lg bg-[#182C7A] text-white mt-6 sm:mt-8 cursor-pointer hover:bg-opacity-90 transition"
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