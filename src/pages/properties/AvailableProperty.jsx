import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { fontFamily } from "../../styles/theme";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";

const AvailableProperty = () => {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("id");
  const navigate = useNavigate();

  // Fetch real property details from backend using the ID in the route query params
  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property-details", propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const res = await api.get(`/properties/${propertyId}`);
      return res?.data ?? res;
    },
    enabled: !!propertyId,
  });

  // Delete property mutation
  const { mutate: deleteProperty, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await api.delete(`/properties/${propertyId}`);
    },
    onSuccess: () => {
      toast.success("Property removed successfully");
      setIsConfirmDeleteOpen(false);
      navigate("/app/properties");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete property");
    },
  });

  const handleEdit = () => {
    // 🎯 Route back to property details form page with ID for editing
    navigate(`/app/properties-details?id=${propertyId}`);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <div className="py-24 text-center text-sm text-gray-400 animate-pulse">
          Loading property details...
        </div>
      </Wrapper>
    );
  }

  if (isError || !property) {
    return (
      <Wrapper>
        <div className="py-24 text-center">
          <p className="text-sm text-red-500 mb-4">
            Property not found or failed to load.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#182C7A] text-white text-xs px-4 py-2 rounded-lg cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </Wrapper>
    );
  }

  // 🎯 Prioritize explicit coverImage, else fallback to the first item in images array
  const coverImg =
    property.coverImage ||
    (Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : null) ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  return (
    <Wrapper>
      <div className={`${fontFamily.main}`}>
        <div className="bg-white rounded-xl py-8 px-6 sm:px-16 lg:px-40 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-start gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-black mt-1 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-gray-900">
                  {property.title}
                </h2>
                <span className="text-sm text-gray-400">
                  {property.category || "Property"}
                </span>
              </div>
            </div>

            <button
              className="bg-[#182C7A] text-white text-sm px-6 h-9 rounded-lg cursor-pointer hover:bg-opacity-90 transition"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>

          {/* Hero image (Cover Image) */}
          <div className="w-full h-64 rounded-xl overflow-hidden mb-8 bg-gray-100">
            <img
              src={coverImg}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <h3 className="font-semibold text-sm mb-2 text-gray-900">
            Description
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            {property.description || "No description provided."}
          </p>

          {/* Property Details */}
          <h3 className="font-semibold text-sm mb-4 text-gray-900">
            Property Details
          </h3>

          <div className="grid md:grid-cols-2 gap-x-10">
            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Category / Type</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  {property.category || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  {property.location || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Bedrooms</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  {property.bedrooms ?? "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Bathrooms</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  {property.bathrooms ?? "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Area</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  {property.area ? `${property.area} sqm` : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Status</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  {property.status || "Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <h3 className="font-semibold text-sm mt-6 mb-4 text-gray-900">
            Financial Information
          </h3>

          <div className="grid md:grid-cols-2 gap-x-10">
            <div className="flex justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Purchase Price</p>
                <p className="text-sm font-medium mt-1 text-gray-800">
                  ₦{Number(property.price || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Delete button */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 h-10 rounded-lg cursor-pointer transition"
              onClick={() => setIsConfirmDeleteOpen(true)}
            >
              Delete Property
            </button>
          </div>
        </div>
      </div>

      {/* 🛑 Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{property.title}"
              </span>
              ? This action is permanent and cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => deleteProperty()}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-xs font-semibold text-white hover:bg-red-700 cursor-pointer transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AvailableProperty;
