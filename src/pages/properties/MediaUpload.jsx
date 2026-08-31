import { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import { UploadCloud, X } from "lucide-react";
import { fontFamily } from "../../styles/theme";
import BackgroundCard from "../../components/BackgroundCard";
import { useNavigate, useSearchParams } from "react-router-dom";

export const propertyUploadFiles = {
  coverFile: null,
  subFiles: [],
  videoFiles: [],
};

const MediaUpload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("id");

  const [coverPreview, setCoverPreview] = useState(null);
  const [subPreviews, setSubPreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  // Load existing media if editing
  useEffect(() => {
    const existingMedia = JSON.parse(
      sessionStorage.getItem("edit_existing_media") || "null",
    );
    if (existingMedia) {
      setCoverPreview(existingMedia.cover);
      setSubPreviews(existingMedia.images || []);
      setVideoPreviews(existingMedia.videos || []);
    }
  }, []);

  const handleCoverImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    propertyUploadFiles.coverFile = file;
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
  };

  const handleSubImages = (e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;

    propertyUploadFiles.subFiles = [...propertyUploadFiles.subFiles, ...files];
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setSubPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleVideos = (e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;

    propertyUploadFiles.videoFiles = [
      ...propertyUploadFiles.videoFiles,
      ...files,
    ];
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeSubImage = (index) => {
    setSubPreviews((prev) => prev.filter((_, i) => i !== index));
    if (propertyUploadFiles.subFiles.length > index) {
      propertyUploadFiles.subFiles = propertyUploadFiles.subFiles.filter(
        (_, i) => i !== index,
      );
    }
  };

  const removeVideo = (index) => {
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    if (propertyUploadFiles.videoFiles.length > index) {
      propertyUploadFiles.videoFiles = propertyUploadFiles.videoFiles.filter(
        (_, i) => i !== index,
      );
    }
  };

  const handleReview = () => {
    sessionStorage.setItem(
      "new_property_media",
      JSON.stringify({
        cover: coverPreview,
        images: subPreviews,
        videos: videoPreviews,
      }),
    );
    // Preserve propertyId query param when navigating to review-publish during edit mode
    navigate(`/app/review-publish${propertyId ? `?id=${propertyId}` : ""}`);
  };

  const savedForm = JSON.parse(
    sessionStorage.getItem("new_property_form") || "{}",
  );

  return (
    <Wrapper>
      <div
        className={`w-full py-4 sm:py-6 md:py-8 ${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}
      >
        {/* ================= STEPPER ================= */}
        <div className="w-full flex justify-center items-start mb-8 sm:mb-10 px-2">
          <div className="flex items-start w-full max-w-2xl">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
                ✓
              </div>
              <p className="text-[10px] sm:text-xs mt-2 text-gray-500 text-center whitespace-nowrap">
                Property Details
              </p>
            </div>

            {/* Line */}
            <div className="flex-1 h-[2px] bg-[#182C7A] mx-2 sm:mx-4 mt-4" />

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
                2
              </div>
              <p className="text-[10px] sm:text-xs mt-2 font-medium text-[#182C7A] text-center whitespace-nowrap">
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
          {/* ================= LEFT: UPLOAD PANELS ================= */}
          <div className="lg:col-span-2 min-w-0">
            <BackgroundCard
              rounded="xl"
              shadow="none"
              className="p-4 sm:p-6 md:p-8 border border-gray-100"
            >
              {/* Cover Image */}
              <h2 className="font-semibold text-base sm:text-lg mb-2">
                Main Cover Image
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Upload the primary display photo.
              </p>

              <label className="border-2 border-dashed rounded-xl h-40 sm:h-48 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition text-center px-4">
                <UploadCloud size={36} className="text-[#182C7A] sm:hidden" />
                <UploadCloud
                  size={40}
                  className="text-[#182C7A] hidden sm:block"
                />
                <p className="mt-3 font-medium text-xs sm:text-sm">
                  Drop cover image here or browse
                </p>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleCoverImage}
                />
              </label>

              {coverPreview && (
                <div className="mt-4 relative w-28 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={coverPreview}
                    className="w-full h-full object-cover"
                    alt="Cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverPreview(null);
                      propertyUploadFiles.coverFile = null;
                    }}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer shadow hover:bg-red-700"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              {/* Gallery Images */}
              <h2 className="font-semibold text-base sm:text-lg mt-8 sm:mt-10 mb-2">
                Gallery Images
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Upload additional photos.
              </p>

              <label className="border-2 border-dashed rounded-xl h-40 sm:h-48 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition text-center px-4">
                <UploadCloud size={36} className="text-[#182C7A] sm:hidden" />
                <UploadCloud
                  size={40}
                  className="text-[#182C7A] hidden sm:block"
                />
                <p className="mt-3 font-medium text-xs sm:text-sm">
                  Drop gallery images here or browse
                </p>
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleSubImages}
                />
              </label>

              <div className="flex gap-3 mt-4 overflow-auto flex-wrap">
                {subPreviews.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden border border-gray-200 group flex-shrink-0"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => removeSubImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer shadow hover:bg-red-700"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Videos */}
              <h2 className="font-semibold text-base sm:text-lg mt-8 sm:mt-10 mb-2">
                Property Videos
              </h2>

              <label className="border-2 border-dashed rounded-xl h-40 sm:h-48 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition text-center px-4">
                <UploadCloud size={36} className="text-[#182C7A] sm:hidden" />
                <UploadCloud
                  size={40}
                  className="text-[#182C7A] hidden sm:block"
                />
                <p className="mt-3 font-medium text-xs sm:text-sm">
                  Drop videos here or browse
                </p>
                <input
                  type="file"
                  multiple
                  hidden
                  accept="video/*"
                  onChange={handleVideos}
                />
              </label>

              <div className="flex gap-3 mt-4 overflow-auto flex-wrap">
                {videoPreviews.map((video, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0"
                  >
                    <video
                      src={video}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer shadow hover:bg-red-700"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </BackgroundCard>
          </div>

          {/* ================= PREVIEW SIDEBAR ================= */}
          <div className="bg-white rounded-xl p-4 sm:p-6 h-fit lg:sticky lg:top-6 shadow-sm min-w-0">
            <h3 className="font-semibold text-center mb-5">Preview</h3>
            <img
              src={
                coverPreview ||
                subPreviews[0] ||
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118b?w=900"
              }
              className="w-full h-48 sm:h-56 rounded-lg object-cover"
              alt=""
            />
            <button
              type="button"
              className="w-full h-11 sm:h-12 rounded-lg bg-[#182C7A] text-white mt-6 sm:mt-8 cursor-pointer hover:bg-opacity-90 transition"
              onClick={handleReview}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MediaUpload;