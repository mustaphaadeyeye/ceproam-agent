import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { UploadCloud, MapPin } from "lucide-react";
import { fontFamily } from "../../styles/theme";
import BackgroundCard from "../../components/BackgroundCard";
import { useNavigate } from "react-router-dom";


const MediaUpload = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);


   const navigate = useNavigate();
    const handleReview = () =>{
      navigate("/review-publish")
    }

  const handleImages = (e) => {
    const files = [...e.target.files];
    setImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleVideos = (e) => {
    const files = [...e.target.files];
    setVideos(files.map((file) => URL.createObjectURL(file)));
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
            <p className="text-xs mt-2 text-gray-500">
              Review & Publish
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2">
            <BackgroundCard
              width="100%"
              height="auto"
              rounded="xl"
              shadow="none"
              className="p-8"
            >

              {/* Images */}

              <h2 className="font-semibold text-lg mb-2">
                Images
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Upload high-resolution photos of the interior and exterior.
              </p>

              <label className="border-2 border-dashed rounded-xl h-56 flex flex-col justify-center items-center cursor-pointer">

                <UploadCloud size={45} className="text-[#182C7A]" />

                <p className="mt-4 font-medium">
                  Drop images here or browse
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  JPG, PNG, WEBP (1920×1080)
                </p>

                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleImages}
                />

              </label>

              <div className="flex gap-3 mt-5 overflow-auto">

                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="w-24 h-20 rounded-lg object-cover"
                    alt=""
                  />
                ))}

              </div>

              {/* Videos */}

              <h2 className="font-semibold text-lg mt-10 mb-2">
                Videos
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Upload high-resolution videos.
              </p>

              <label className="border-2 border-dashed rounded-xl h-56 flex flex-col justify-center items-center cursor-pointer">

                <UploadCloud size={45} className="text-[#182C7A]" />

                <p className="mt-4 font-medium">
                  Drop videos here or browse
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  MP4, MOV
                </p>

                <input
                  type="file"
                  multiple
                  hidden
                  accept="video/*"
                  onChange={handleVideos}
                />

              </label>

              <div className="flex gap-3 mt-5 overflow-auto">

                {videos.map((video, index) => (
                  <video
                    key={index}
                    src={video}
                    className="w-24 h-20 rounded-lg object-cover"
                  />
                ))}

              </div>

            </BackgroundCard>
          </div>

          {/* Preview */}

          <div className="bg-white rounded-xl p-6 h-fit sticky top-6">

            <h3 className="font-semibold text-center mb-5">
              Preview
            </h3>

            <img
              src={
                images.length
                  ? images[0]
                  : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118b?w=900"
              }
              className="w-full h-56 rounded-lg object-cover"
              alt=""
            />

            <div className="flex justify-between mt-5 text-xs">
              <span className="text-[#182C7A] font-medium">
                ● For Sale
              </span>

              <span className="text-green-500">
                Available
              </span>
            </div>

            <h3 className="font-semibold text-lg mt-3">
              Luxury 3-Bedroom Apartment
            </h3>

            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
              <MapPin size={15} />
              Ajah, Lagos Coastal Area
            </div>

            <p className="text-sm text-gray-500 mt-2">
              3 Bedrooms, 3 Bathrooms, 250 sqm, Parking Available
            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Price:</p>

              <h2 className="text-3xl font-bold text-[#182C7A]">
                N50,000
              </h2>
            </div>

            <button className="w-full h-12 rounded-lg bg-[#182C7A] text-white mt-8"
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
