import { useRef, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { fontFamily } from "../../styles/theme";
import { useNavigate } from "react-router-dom";


const ArrowLeftIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PencilIcon = (props) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = (props) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7h10z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendUpIcon = (props) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4 16l6-6 4 4 6-7"
      stroke="#16A34A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CoinIcon = (props) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 8v8M9.5 10.5h4a1.5 1.5 0 1 1 0 3h-3a1.5 1.5 0 1 0 0 3h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const UploadCloudIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9H7z"
      stroke="#2F6FED"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M12 12v6m0-6l-2.2 2.2M12 12l2.2 2.2"
      stroke="#2F6FED"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const categoryOptions = ["Agriculture", "Residential", "Commercial", "Hospitality"];
const durationOptions = ["6 Months", "12 Months", "18 Months", "24 Months"];
const roiOptions = ["Residential", "10%", "22%", "40%"];



const initialPackages = [
  { id: 1, title: "Package 1", duration: "24 Months", roi: "40%", min: "$15,000" },
  { id: 2, title: "Package 2", duration: "12 Months", roi: "22%", min: "$5,000" },
];

const EditDetails = () => {
  const fileInputRef = useRef(null);

    const navigate = useNavigate();

  const [investmentName, setInvestmentName] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [description, setDescription] = useState("");

  const [duration, setDuration] = useState(durationOptions[3]);
  const [roi, setRoi] = useState(roiOptions[0]);
  const [price, setPrice] = useState("");

  const [packages, setPackages] = useState(initialPackages);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleAddPackage = () => {
    if (!price.trim()) return;
    setPackages((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `Package ${prev.length + 1}`,
        duration,
        roi,
        min: price,
      },
    ]);
    setPrice("");
  };

  const handleRemovePackage = (id) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        <div className="bg-white px-5 sm:px-7 pt-6 pb-10 rounded-2xl shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          {/* Back */}
          <button className="flex items-center gap-2 text-gray-500 text-sm mb-6 hover:text-gray-700 transition-colors"
          onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ----------------------------- Left column ----------------------------- */}
            <div className="lg:col-span-2 flex flex-col gap-7">
              {/* Investment Details */}
              <div>
                <h1 className="text-[15px] font-bold text-gray-900 mb-4">
                  Investment Details
                </h1>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-gray-500">
                      Investment Name
                    </label>
                    <input
                      value={investmentName}
                      onChange={(e) => setInvestmentName(e.target.value)}
                      placeholder="e.g. The Zenith Heights Luxury Penthouse"
                      className="w-full rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-gray-500">Category</label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-300 transition-colors pr-9"
                      >
                        {categoryOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] text-gray-500">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of property"
                    rows={3}
                    className="w-full resize-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300 transition-colors"
                  />
                </div>
              </div>

              {/* Packages Available */}
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 mb-4">
                  Packages Available
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-gray-500">Duration</label>
                    <div className="relative">
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-300 transition-colors pr-9"
                      >
                        {durationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-gray-500">ROI</label>
                    <div className="relative">
                      <select
                        value={roi}
                        onChange={(e) => setRoi(e.target.value)}
                        className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-300 transition-colors pr-9"
                      >
                        {roiOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 items-end">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-gray-500">Price</label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="N.O.O"
                      className="w-full rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300 transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleAddPackage}
                    className="w-[224px] h-[50px] rounded-lg bg-[#92B2F8]  py-2.5 text-[13px] font-semibold text-black cursor-pointer"
                  >
                    Add Package
                  </button>
                </div>
              </div>

              {/* Cover Photo */}
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 mb-4">
                  Cover Photo
                </h2>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/60 flex flex-col items-center justify-center text-center py-12 px-4 hover:border-gray-300 transition-colors overflow-hidden"
                >
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="max-h-40 rounded-lg object-cover"
                    />
                  ) : (
                    <>
                      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                        <UploadCloudIcon />
                      </div>
                      <p className="text-[13px] text-gray-500">
                        Drop images here or{" "}
                        <span className="text-blue-600 font-medium">browse</span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Supports JPG, PNG, WEBP (Minimum 1920x1080px)
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-1">
                <button className="w-full max-w-[320px] rounded-xl bg-[#0B1533] hover:bg-[#141f4a] transition-colors py-3.5 text-[14px] font-semibold text-white cursor-pointer">
                  Upload Investment
                </button>
              </div>
            </div>

            {/* ----------------------------- Right column ----------------------------- */}
            <div className="flex flex-col gap-5">
              {/* Investment Packages */}
              <div className="rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(16,24,40,0.06)] p-4">
                <h3 className="text-[13px] font-bold text-gray-900 mb-3">
                  Investment Packages
                </h3>
                <div className="flex flex-col gap-2">
                  {packages.length === 0 && (
                    <p className="text-[12px] text-gray-400">
                      No packages added yet.
                    </p>
                  )}
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="flex items-center justify-between rounded-xl bg-gray-50/70 px-3 py-2.5"
                    >
                      <div>
                        <p className="text-[12.5px] font-semibold text-gray-900">
                          {pkg.title} - {pkg.duration}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                          <span className="flex items-center gap-1">
                            <TrendUpIcon /> {pkg.roi} ROI
                          </span>
                          <span className="flex items-center gap-1">
                            <CoinIcon /> Min {pkg.min}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <button
                          aria-label={`Edit ${pkg.title}`}
                          className="hover:text-gray-600 transition-colors"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          aria-label={`Delete ${pkg.title}`}
                          onClick={() => handleRemovePackage(pkg.id)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Preview */}
              <div className="rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(16,24,40,0.06)] p-4">
                <h3 className="text-[13px] font-bold text-gray-900 mb-3">
                  Live Preview
                </h3>

                <div className="rounded-xl overflow-hidden bg-gray-100 h-32 mb-3 flex items-center justify-center">
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Investment preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[11px] text-gray-400">
                      Cover photo preview
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-[13px] font-semibold text-gray-900">
                    {investmentName || "Eco-Friendly Villas"}
                  </p>
                  <p className="text-[13px] font-semibold text-gray-900 whitespace-nowrap">
                    {price ? `N${price}` : "N30,000"}
                  </p>
                </div>

                <p className="text-[11.5px] text-gray-400 leading-relaxed line-clamp-2 mb-2">
                  {description ||
                    "Sustainable living with solar-powered amenities and lush green surroundings amenities and lush green surroundings..."}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {duration} &middot; {roi} ROI
                  </span>
                  <span className="text-[10.5px] font-medium text-green-700 bg-green-50 rounded-full px-2.5 py-0.5">
                    Ongoing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default EditDetails;
