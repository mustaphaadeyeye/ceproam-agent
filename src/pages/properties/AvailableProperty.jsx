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
    navigate(`/app/properties-details?id=${propertyId}`);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <div className="py-20 sm:py-24 text-center text-sm text-gray-400 animate-pulse">
          Loading property details...
        </div>
      </Wrapper>
    );
  }

  if (isError || !property) {
    return (
      <Wrapper>
        <div className="py-20 sm:py-24 px-4 text-center">
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

  const coverImg =
    property.coverImage ||
    (Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : null) ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  return (
    <Wrapper>
      <div className={`${fontFamily.main} w-full`}>
        <div className="bg-white rounded-xl py-5 px-4 sm:py-7 sm:px-6 md:py-8 md:px-10 lg:px-20 xl:px-32 shadow-sm border border-gray-100 w-full xl:mt-0 lg:mt-0 mt-12">
          
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="text-black mt-1 cursor-pointer flex-shrink-0"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="flex flex-col min-w-0">
                <h2 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
                  {property.title}
                </h2>

                <span className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {property.category || "Property"}
                </span>
              </div>
            </div>

            <button
              className="bg-[#182C7A] text-white text-sm px-6 h-9 rounded-lg cursor-pointer hover:bg-opacity-90 transition w-full sm:w-auto flex-shrink-0"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>

          {/* Hero Image */}
          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden mb-6 sm:mb-8 bg-gray-100">
            <img
              src={coverImg}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="mb-7 sm:mb-8">
            <h3 className="font-semibold text-sm mb-2 text-gray-900">
              Description
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed break-words">
              {property.description || "No description provided."}
            </p>
          </div>

          {/* Property Details */}
          <h3 className="font-semibold text-sm mb-4 text-gray-900">
            Property Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10">
            
            {/* Category */}
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Category / Type
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800 break-words">
                {property.category || "N/A"}
              </p>
            </div>

            {/* Location */}
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Location
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800 break-words">
                {property.location || "N/A"}
              </p>
            </div>

            {/* Bedrooms */}
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Bedrooms
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800">
                {property.bedrooms ?? "N/A"}
              </p>
            </div>

            {/* Bathrooms */}
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Bathrooms
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800">
                {property.bathrooms ?? "N/A"}
              </p>
            </div>

            {/* Area */}
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Area
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800">
                {property.area ? `${property.area} sqm` : "N/A"}
              </p>
            </div>

            {/* Status */}
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Status
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800">
                {property.status || "Available"}
              </p>
            </div>
          </div>

          {/* Financial Information */}
          <h3 className="font-semibold text-sm mt-6 mb-4 text-gray-900">
            Financial Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10">
            <div className="py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Purchase Price
              </p>

              <p className="text-sm font-medium mt-1 text-gray-800">
                ₦{Number(property.price || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex justify-end mt-6 sm:mt-8">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 h-10 rounded-lg cursor-pointer transition w-full sm:w-auto"
              onClick={() => setIsConfirmDeleteOpen(true)}
            >
              Delete Property
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6 break-words">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{property.title}"
              </span>
              ? This action is permanent and cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => deleteProperty()}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-xs font-semibold text-white hover:bg-red-700 cursor-pointer transition disabled:opacity-50 w-full sm:w-auto"
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