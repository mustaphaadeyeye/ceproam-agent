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
      // Cache existing images/media URLs so media upload page can display them
      sessionStorage.setItem(
        "edit_existing_media",
        JSON.stringify({
          cover:
            existingProperty.coverImage || existingProperty.images?.[0] || null,
          images: existingProperty.images || [],
          videos: existingProperty.videos || [],
        }),
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
            <p className="text-xs mt-2 text-gray-500">Media Upload</p>
          </div>
          <div className="w-16 md:w-24 h-[2px] bg-gray-200 mx-2 mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#E8EEF9] text-[#182C7A] flex items-center justify-center text-sm">
              3
            </div>
            <p className="text-xs mt-2 text-gray-500">Review & Publish</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-semibold text-lg mb-8">
              {propertyId ? "Edit Property Details" : "Basic Information"}
            </h2>

            <div className="mb-6">
              <label className="text-sm font-medium block mb-2">
                Property Name
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. The Zenith Heights Luxury Penthouse"
                className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none text-sm cursor-pointer"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Listing Type
                </label>
                <div className="grid grid-cols-2 bg-[#F7F9FC] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({ ...p, listingType: "SALE" }))
                    }
                    className={`h-10 rounded-lg text-sm transition cursor-pointer ${
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
                      setForm((p) => ({ ...p, listingType: "RENT" }))
                    }
                    className={`h-10 rounded-lg text-sm transition cursor-pointer ${
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                  className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Bedrooms
                </label>
                <div className="bg-[#F7F9FC] rounded-lg h-12 flex justify-between items-center px-4">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        bedrooms: Math.max(1, p.bedrooms - 1),
                      }))
                    }
                    className="cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-sm font-medium">{form.bedrooms}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((p) => ({ ...p, bedrooms: p.bedrooms + 1 }))
                    }
                    className="cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm font-medium block mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of property"
                className="w-full bg-[#F7F9FC] rounded-lg p-4 outline-none resize-none text-sm"
              />
            </div>

            <h2 className="font-semibold text-lg mb-6">Location</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
                  className="w-full bg-[#F7F9FC] rounded-lg h-12 px-4 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl p-6 h-fit sticky top-6 shadow-sm">
            <h3 className="font-semibold text-center mb-5">Preview</h3>
            <div className="w-full h-56 rounded-lg bg-gray-200 overflow-hidden">
              <img
                src={checkersImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between mt-5 text-xs">
              <span className="text-[#182C7A] font-medium">
                ● For {form.listingType}
              </span>
              <span className="text-[#05062F]">Available</span>
            </div>

            <h3 className="font-semibold text-lg mt-3">
              {form.title || "Luxury Apartment"}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
              <MapPin size={15} />
              <span>{form.location || "Lagos, Nigeria"}</span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Price:</p>
              <h2 className="text-3xl font-bold text-[#182C7A]">
                ₦{Number(form.price || 0).toLocaleString()}
              </h2>
            </div>

            <button
              type="button"
              className="w-full h-12 rounded-lg bg-[#182C7A] text-white mt-8 cursor-pointer hover:bg-opacity-90 transition"
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
