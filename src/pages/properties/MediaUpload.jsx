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
    // 🎯 Preserve propertyId query param when navigating to review-publish during edit mode
    navigate(`/app/review-publish${propertyId ? `?id=${propertyId}` : ""}`);
  };

  const savedForm = JSON.parse(
    sessionStorage.getItem("new_property_form") || "{}",
  );

  return (
    <Wrapper>
      <div className={`py-8 ${fontFamily.main}`}>
        {/* Stepper */}
        <div className="flex justify-center items-center mb-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
              ✓
            </div>
            <p className="text-xs mt-2 text-gray-500">Property Details</p>
          </div>
          <div className="w-16 md:w-24 h-[2px] bg-[#182C7A] mx-2 mb-6" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#182C7A] text-white flex items-center justify-center text-sm">
              2
            </div>
            <p className="text-xs mt-2 font-medium text-[#182C7A]">
              Media Upload
            </p>
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
          <div className="lg:col-span-2">
            <BackgroundCard
              width="100%"
              height="auto"
              rounded="xl"
              shadow="none"
              className="p-8"
            >
              {/* Cover Image */}
              <h2 className="font-semibold text-lg mb-2">Main Cover Image</h2>
              <p className="text-sm text-gray-500 mb-4">
                Upload the primary display photo.
              </p>

              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition">
                <UploadCloud size={40} className="text-[#182C7A]" />
                <p className="mt-3 font-medium text-sm">
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
                <div className="mt-4 relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200">
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
              <h2 className="font-semibold text-lg mt-10 mb-2">
                Gallery Images
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Upload additional photos.
              </p>

              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition">
                <UploadCloud size={40} className="text-[#182C7A]" />
                <p className="mt-3 font-medium text-sm">
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
                    className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200 group"
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
              <h2 className="font-semibold text-lg mt-10 mb-2">
                Property Videos
              </h2>
              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition">
                <UploadCloud size={40} className="text-[#182C7A]" />
                <p className="mt-3 font-medium text-sm">
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
                    className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <video src={video} className="w-full h-full object-cover" />
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

          {/* Preview Sidebar */}
          <div className="bg-white rounded-xl p-6 h-fit sticky top-6 shadow-sm">
            <h3 className="font-semibold text-center mb-5">Preview</h3>
            <img
              src={
                coverPreview ||
                subPreviews[0] ||
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118b?w=900"
              }
              className="w-full h-56 rounded-lg object-cover"
              alt=""
            />
            <button
              type="button"
              className="w-full h-12 rounded-lg bg-[#182C7A] text-white mt-8 cursor-pointer hover:bg-opacity-90 transition"
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
