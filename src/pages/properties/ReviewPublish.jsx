import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { fontFamily } from "../../styles/theme";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { propertyUploadFiles } from "./MediaUpload";

const ReviewPublish = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("id"); // Check if we are editing an existing property
  const [isSubmitting, setIsSubmitting] = useState(false);

  const property = JSON.parse(
    sessionStorage.getItem("new_property_form") || "{}",
  );
  const media = JSON.parse(
    sessionStorage.getItem("new_property_media") ||
      '{"cover":null, "images":[]}',
  );

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("title", property.title || "Luxury Property");
      formData.append(
        "description",
        property.description || "No description provided",
      );
      formData.append("price", Number(property.price || 0));
      formData.append("location", property.location || "Lagos");
      formData.append("status", property.status || "ACTIVE");
      formData.append(
        "category",
        property.listingType === "RENT" ? "RENT" : "SALE",
      );
      formData.append("bedrooms", Number(property.bedrooms || 3));
      formData.append("bathrooms", Number(property.bathrooms || 2));
      formData.append("area", Number(property.area || 250));

      if (propertyUploadFiles.coverFile) {
        formData.append("coverImage", propertyUploadFiles.coverFile);
      }

      if (
        propertyUploadFiles.subFiles &&
        propertyUploadFiles.subFiles.length > 0
      ) {
        propertyUploadFiles.subFiles.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (
        propertyUploadFiles.videoFiles &&
        propertyUploadFiles.videoFiles.length > 0
      ) {
        propertyUploadFiles.videoFiles.forEach((file) => {
          formData.append("videos", file);
        });
      }

      if (propertyId) {
        // 🎯 EDIT MODE: Send PATCH request to update existing property
        await api.patch(`/properties/${propertyId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property updated successfully!");
      } else {
        // 🎯 CREATE MODE: Send POST request for new property
        await api.post("/properties", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Property published successfully!");
      }

      sessionStorage.removeItem("new_property_form");
      sessionStorage.removeItem("new_property_media");
      sessionStorage.removeItem("edit_existing_media");
      navigate("/app/properties");
    } catch (err) {
      console.error("Submission error:", err.response?.data);
      toast.error(
        err.response?.data?.message ||
          "Failed to save property. Please check inputs.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className={`py-8 ${fontFamily.main}`}>
        <div className="bg-white rounded-xl p-8 shadow-sm max-w-3xl mx-auto border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="cursor-pointer">
                <ArrowLeft size={20} />
              </button>
              <h2 className="font-semibold text-lg">
                Review & Publish Property
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/app/properties-details${propertyId ? `?id=${propertyId}` : ""}`,
                )
              }
              className="text-[#182C7A] text-xs font-semibold cursor-pointer hover:underline"
            >
              Edit Details
            </button>
          </div>

          <div className="w-full h-64 rounded-xl overflow-hidden mb-8 bg-gray-100">
            <img
              src={
                media.cover ||
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118b?w=900"
              }
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-semibold text-sm mb-2">
            {property.title || "Property Title"}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {property.description || "No description provided."}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm mb-8 bg-gray-50 p-4 rounded-lg">
            <div>
              <span className="text-gray-400">Location:</span>{" "}
              {property.location || "N/A"}
            </div>
            <div>
              <span className="text-gray-400">Price:</span> ₦
              {Number(property.price || 0).toLocaleString()}
            </div>
            <div>
              <span className="text-gray-400">Bedrooms:</span>{" "}
              {property.bedrooms || 3}
            </div>
            <div>
              <span className="text-gray-400">Bathrooms:</span>{" "}
              {property.bathrooms || 2}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePublish}
              className="bg-[#182C7A] hover:bg-opacity-90 text-white text-sm px-8 h-11 rounded-lg cursor-pointer transition disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : propertyId
                  ? "Save Changes"
                  : "Publish Property"}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReviewPublish;
