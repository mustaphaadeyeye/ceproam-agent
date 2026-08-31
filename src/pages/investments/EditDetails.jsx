import { useRef, useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import { fontFamily } from "../../styles/theme";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { X, UploadCloud } from "lucide-react";

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
const roiOptions = ["10%", "22%", "40%", "50%"];

const EditDetails = () => {
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const investmentId = searchParams.get("id");

  const [investmentName, setInvestmentName] = useState("");
  const [category, setCategory] = useState("REAL_ESTATE");
  const [description, setDescription] = useState("");

  const [duration, setDuration] = useState("12 Months");
  const [roi, setRoi] = useState("22%");
  const [price, setPrice] = useState("");

  const [packages, setPackages] = useState([]);
  
  // Media states
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [subFiles, setSubFiles] = useState([]);
  const [subPreviews, setSubPreviews] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  // Fetch existing investment if editing
  const { data: existingInvestment } = useQuery({
    queryKey: ["investment-edit", investmentId],
    queryFn: async () => {
      if (!investmentId) return null;
      const res = await api.get(`/investments/${investmentId}`);
      return res?.data ?? res;
    },
    enabled: !!investmentId,
  });

  useEffect(() => {
    if (existingInvestment) {
      setInvestmentName(existingInvestment.name || "");
      setCategory(existingInvestment.category || "REAL_ESTATE");
      setDescription(existingInvestment.description || "");
      setCoverPreview(existingInvestment.coverImage || existingInvestment.images?.[0] || null);
      setSubPreviews(existingInvestment.images?.slice(1) || existingInvestment.images || []);
      setVideoPreviews(existingInvestment.videos || []);

      if (Array.isArray(existingInvestment.tiers)) {
        setPackages(
          existingInvestment.tiers.map((t, index) => ({
            id: index + 1,
            title: `Package ${index + 1}`,
            duration: `${t.durationMonths} Months`,
            roi: `${t.roi}%`,
            min: String(t.amount),
          }))
        );
      }
    }
  }, [existingInvestment]);

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
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubImages = (e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;
    setSubFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setSubPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleVideos = (e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;
    setVideoFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeSubImage = (index) => {
    setSubPreviews((prev) => prev.filter((_, i) => i !== index));
    if (subFiles.length > index) {
      setSubFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const removeVideo = (index) => {
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    if (videoFiles.length > index) {
      setVideoFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Submit mutation for creating or updating investment
  const { mutate: saveInvestment, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", investmentName);
      formData.append("description", description);
      formData.append("category", category.toUpperCase().replace(/\s+/g, "_"));
      formData.append("location", "Lagos");

      const formattedTiers = packages.map((pkg) => ({
        amount: Number(pkg.min.replace(/[^0-9.]/g, "")),
        durationMonths: parseInt(pkg.duration) || 12,
        roi: parseFloat(pkg.roi) || 10,
      }));
      formData.append("tiers", JSON.stringify(formattedTiers));

      if (coverFile) {
        formData.append("coverImage", coverFile);
      }

      subFiles.forEach((file) => {
        formData.append("images", file);
      });

      videoFiles.forEach((file) => {
        formData.append("videos", file);
      });

      if (investmentId) {
        await api.patch(`/investments/${investmentId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/investments", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSuccess: () => {
      toast.success(investmentId ? "Investment updated successfully!" : "Investment package created successfully!");
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to save investment package.");
    },
  });

  return (
    <div className={`${fontFamily.main} xl:mt-0 lg:mt-0 mt-12`}>
      <Wrapper>
        <div className="bg-white px-4 sm:px-5 lg:px-7 pt-6 pb-10 rounded-2xl shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          {/* Back */}
          <button
            className="flex items-center gap-2 text-gray-500 text-sm mb-6 hover:text-gray-700 transition-colors cursor-pointer"
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
                        className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-300 transition-colors pr-9 cursor-pointer"
                      >
                        <option value="REAL_ESTATE">Real Estate</option>
                        <option value="AGRICULTURE">Agriculture</option>
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
                    placeholder="Brief description of investment"
                    rows={3}
                    className="w-full resize-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300 transition-colors"
                  />
                </div>
              </div>

              {/* Packages Available */}
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 mb-4">
                  Packages Available (Sub-Packages / Tiers)
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-gray-500">Duration</label>
                    <div className="relative">
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-300 transition-colors pr-9 cursor-pointer"
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
                    <label className="text-[12px] text-gray-500">ROI (%)</label>
                    <div className="relative">
                      <select
                        value={roi}
                        onChange={(e) => setRoi(e.target.value)}
                        className="w-full appearance-none rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-gray-300 transition-colors pr-9 cursor-pointer"
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
                    <label className="text-[12px] text-gray-500">Minimum Amount (₦)</label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 50000"
                      className="w-full rounded-lg bg-gray-50 border border-gray-100 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300 transition-colors"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddPackage}
                    className="w-full sm:w-[224px] h-[50px] rounded-lg bg-[#92B2F8] py-2.5 text-[13px] font-semibold text-black cursor-pointer hover:bg-[#7fa4f7] transition"
                  >
                    Add Package Tier
                  </button>
                </div>
              </div>

              {/* Cover Photo */}
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 mb-4">
                  Cover Photo
                </h2>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/60 flex flex-col items-center justify-center text-center py-10 px-4 hover:border-gray-300 transition-colors overflow-hidden"
                >
                  {coverPreview ? (
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={coverPreview} className="w-full h-full object-cover" alt="Cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCoverPreview(null);
                          setCoverFile(null);
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer shadow hover:bg-red-700"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                        <UploadCloudIcon />
                      </div>
                      <p className="text-[13px] text-gray-500">
                        Drop cover image here or <span className="text-blue-600 font-medium">browse</span>
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Gallery Images (Sub Photos) */}
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 mb-2">Gallery Images (Sub Photos)</h2>
                <div
                  onClick={() => galleryInputRef.current?.click()}
                  className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/60 flex flex-col items-center justify-center text-center py-10 px-4 hover:border-gray-300 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <UploadCloudIcon />
                  </div>
                  <p className="text-[13px] text-gray-500">
                    Drop gallery images here or <span className="text-blue-600 font-medium">browse</span>
                  </p>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleSubImages}
                    className="hidden"
                  />
                </div>

                {subPreviews.length > 0 && (
                  <div className="flex gap-3 mt-4 overflow-auto flex-wrap">
                    {subPreviews.map((img, index) => (
                      <div key={index} className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={img} className="w-full h-full object-cover" alt="" />
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
                )}
              </div>

              {/* Property / Package Videos (Sub Videos) */}
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 mb-2">Package Videos (Sub Videos)</h2>
                <div
                  onClick={() => videoInputRef.current?.click()}
                  className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/60 flex flex-col items-center justify-center text-center py-10 px-4 hover:border-gray-300 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <UploadCloudIcon />
                  </div>
                  <p className="text-[13px] text-gray-500">
                    Drop videos here or <span className="text-blue-600 font-medium">browse</span>
                  </p>
                  <input
                    ref={videoInputRef}
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideos}
                    className="hidden"
                  />
                </div>

                {videoPreviews.length > 0 && (
                  <div className="flex gap-3 mt-4 overflow-auto flex-wrap">
                    {videoPreviews.map((video, index) => (
                      <div key={index} className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200">
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
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => saveInvestment()}
                  className="w-full max-w-[320px] rounded-xl bg-[#0B1533] hover:bg-[#141f4a] transition-colors py-3.5 text-[14px] font-semibold text-white cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Saving..." : investmentId ? "Update Investment" : "Upload Investment"}
                </button>
              </div>
            </div>

            {/* ----------------------------- Right column ----------------------------- */}
            <div className="flex flex-col gap-5">
              {/* Investment Packages */}
              <div className="rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(16,24,40,0.06)] p-4">
                <h3 className="text-[13px] font-bold text-gray-900 mb-3">
                  Investment Packages Added
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
                      className="flex items-center justify-between gap-2 rounded-xl bg-gray-50/70 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-semibold text-gray-900 truncate">
                          {pkg.title} - {pkg.duration}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-gray-400">
                          <span className="flex items-center gap-1">
                            <TrendUpIcon /> {pkg.roi} ROI
                          </span>
                          <span className="flex items-center gap-1">
                            <CoinIcon /> Min ₦{Number(pkg.min).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 shrink-0">
                        <button
                          type="button"
                          aria-label={`Delete ${pkg.title}`}
                          onClick={() => handleRemovePackage(pkg.id)}
                          className="hover:text-red-500 transition-colors cursor-pointer"
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
                    {price ? `₦${Number(price).toLocaleString()}` : "₦30,000"}
                  </p>
                </div>

                <p className="text-[11.5px] text-gray-400 leading-relaxed line-clamp-2 mb-2">
                  {description ||
                    "Sustainable living with solar-powered amenities and lush green surroundings..."}
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